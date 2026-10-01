/* Clínica Especializada Dra. Franciela Costa
   Comportamento da página: linhas de junção, luz sobre a pele, prancha da
   camada basal, medidor de profundidade e horário ao vivo. */
(() => {
  'use strict';

  const raiz = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const consultaReduzida = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduz = () => consultaReduzida.matches;
  const TAU = Math.PI * 2;

  /* ---------- utilitários ---------- */

  // Aleatório com semente: a arte sai igual a cada visita.
  function semente(a) {
    return () => {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function ruido1(s) {
    const r = semente(s);
    const v = Float32Array.from({ length: 256 }, () => r() * 2 - 1);
    return (x) => {
      const i = Math.floor(x);
      const f = x - i;
      const u = f * f * (3 - 2 * f);
      const a = v[i & 255];
      return a + (v[(i + 1) & 255] - a) * u;
    };
  }

  function ruido2(s) {
    const r = semente(s);
    const N = 64;
    const v = Float32Array.from({ length: N * N }, () => r());
    const em = (i, j) => v[(j & (N - 1)) * N + (i & (N - 1))];
    return (x, y) => {
      const i = Math.floor(x);
      const j = Math.floor(y);
      const fx = x - i;
      const fy = y - j;
      const ux = fx * fx * (3 - 2 * fx);
      const uy = fy * fy * (3 - 2 * fy);
      const a = em(i, j);
      const b = em(i + 1, j);
      const c = em(i, j + 1);
      const d = em(i + 1, j + 1);
      return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
    };
  }

  function bezier(x0, y0, cx, cy, x1, y1, t) {
    const u = 1 - t;
    return [u * u * x0 + 2 * u * t * cx + t * t * x1, u * u * y0 + 2 * u * t * cy + t * t * y1];
  }

  // Traço que afina da base à ponta (dendritos).
  function afunilado(g, x0, y0, cx, cy, x1, y1, w0, w1) {
    const N = 16;
    const esq = [];
    const dir = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const [px, py] = bezier(x0, y0, cx, cy, x1, y1, t);
      const u = 1 - t;
      const tx = 2 * u * (cx - x0) + 2 * t * (x1 - cx);
      const ty = 2 * u * (cy - y0) + 2 * t * (y1 - cy);
      const l = Math.hypot(tx, ty) || 1;
      const w = (w0 + (w1 - w0) * t) / 2;
      esq.push([px - (ty / l) * w, py + (tx / l) * w]);
      dir.push([px + (ty / l) * w, py - (tx / l) * w]);
    }
    g.beginPath();
    g.moveTo(esq[0][0], esq[0][1]);
    for (const p of esq) g.lineTo(p[0], p[1]);
    for (let i = dir.length - 1; i >= 0; i--) g.lineTo(dir[i][0], dir[i][1]);
    g.closePath();
    g.fill();
  }

  // Mantém o lado do polígono mais perto de p do que de q (bissetriz).
  function recortar(poli, p, q) {
    const mx = (p[0] + q[0]) / 2;
    const my = (p[1] + q[1]) / 2;
    const nx = q[0] - p[0];
    const ny = q[1] - p[1];
    const lado = (v) => (v[0] - mx) * nx + (v[1] - my) * ny;
    const saida = [];
    for (let k = 0; k < poli.length; k++) {
      const a = poli[k];
      const b = poli[(k + 1) % poli.length];
      const la = lado(a);
      const lb = lado(b);
      if (la <= 0) saida.push(a);
      if ((la < 0 && lb > 0) || (la > 0 && lb < 0)) {
        const t = la / (la - lb);
        saida.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
      }
    }
    return saida;
  }

  // Células orgânicas: pontos em grade com tremor, recortados como num tecido.
  function mosaico(W, H, passo, r, desenhar) {
    const cols = Math.ceil(W / passo) + 4;
    const linhas = Math.ceil(H / passo) + 4;
    const pts = [];
    for (let j = 0; j < linhas; j++) {
      for (let i = 0; i < cols; i++) {
        pts.push([(i - 2 + 0.5 + (r() - 0.5) * 0.85) * passo, (j - 2 + 0.5 + (r() - 0.5) * 0.85) * passo]);
      }
    }
    const R = passo * 2;
    for (let j = 1; j < linhas - 1; j++) {
      for (let i = 1; i < cols - 1; i++) {
        const p = pts[j * cols + i];
        let poli = [[p[0] - R, p[1] - R], [p[0] + R, p[1] - R], [p[0] + R, p[1] + R], [p[0] - R, p[1] + R]];
        for (let dj = -2; dj <= 2 && poli.length; dj++) {
          for (let di = -2; di <= 2 && poli.length; di++) {
            if (!di && !dj) continue;
            const ii = i + di;
            const jj = j + dj;
            if (ii < 0 || jj < 0 || ii >= cols || jj >= linhas) continue;
            poli = recortar(poli, p, pts[jj * cols + ii]);
          }
        }
        if (poli.length > 2) desenhar(poli, p);
      }
    }
  }

  // Contorno arredondado da célula, um pouco recolhido para mostrar a parede.
  function celula(g, poli, recolhe) {
    let cx = 0;
    let cy = 0;
    for (const v of poli) {
      cx += v[0];
      cy += v[1];
    }
    cx /= poli.length;
    cy /= poli.length;
    const vs = poli.map((v) => [cx + (v[0] - cx) * recolhe, cy + (v[1] - cy) * recolhe]);
    const n = vs.length;
    const meio = (k) => [(vs[k][0] + vs[(k + 1) % n][0]) / 2, (vs[k][1] + vs[(k + 1) % n][1]) / 2];
    const ini = meio(n - 1);
    g.beginPath();
    g.moveTo(ini[0], ini[1]);
    for (let k = 0; k < n; k++) {
      const m = meio(k);
      g.quadraticCurveTo(vs[k][0], vs[k][1], m[0], m[1]);
    }
    g.closePath();
    return [cx, cy];
  }

  function novaTela(W, H, dpr) {
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(W * dpr));
    c.height = Math.max(1, Math.round(H * dpr));
    const g = c.getContext('2d');
    g.scale(dpr, dpr);
    return [c, g];
  }

  function grao() {
    const t = document.createElement('canvas');
    t.width = t.height = 128;
    const g = t.getContext('2d');
    const img = g.createImageData(128, 128);
    const r = semente(99);
    for (let i = 0; i < img.data.length; i += 4) {
      const claro = r() > 0.5;
      img.data[i] = claro ? 255 : 70;
      img.data[i + 1] = claro ? 236 : 34;
      img.data[i + 2] = claro ? 220 : 20;
      img.data[i + 3] = r() * 18;
    }
    g.putImageData(img, 0, 0);
    return t;
  }

  /* ---------- linhas de junção entre camadas ---------- */

  const JUNCOES = {
    // superfície → epiderme: o corte da pele, com sulcos finos
    superficie: {
      h: 96,
      sobre: 'superficie',
      pontos(W, H) {
        const n = ruido1(3);
        const r = semente(21);
        const sulcos = [];
        for (let x = 40 + r() * 60; x < W; x += 70 + r() * 90) sulcos.push([x, 4 + r() * 5, 5 + r() * 5]);
        const pts = [];
        for (let x = 0; x <= W + 6; x += 6) {
          let y = H * 0.55 + 7 * Math.sin(x / 83 + 0.7) + 4 * Math.sin(x / 29 + 2) + 5 * n(x / 140);
          for (const [sx, d, w] of sulcos) {
            const k = (x - sx) / w;
            y += d * Math.exp(-k * k);
          }
          pts.push([x, y]);
        }
        return { pts };
      },
    },
    // epiderme → camada basal: cristas epidérmicas
    rete: {
      h: 120,
      pontos(W, H) {
        const n = ruido1(8);
        const pts = [];
        let fase = 0.6;
        for (let x = 0; x <= W + 6; x += 6) {
          fase += (6 / (124 + 40 * n(x / 300))) * TAU;
          const crista = Math.pow((1 - Math.cos(fase)) / 2, 1.6);
          const amp = 30 + 16 * (n(x / 170 + 9) * 0.5 + 0.5);
          pts.push([x, H * 0.3 + crista * amp + 3 * n(x / 20)]);
        }
        return { pts, graos: true };
      },
    },
    // camada basal → derme: papilas dérmicas com alças de capilar
    papila: {
      h: 120,
      pontos(W, H) {
        const n = ruido1(14);
        const pts = [];
        const picos = [];
        let fase = 2.1;
        let antes = 0;
        for (let x = 0; x <= W + 6; x += 6) {
          fase += (6 / (132 + 36 * n(x / 260))) * TAU;
          const papila = Math.pow((1 - Math.cos(fase)) / 2, 1.8);
          const amp = 34 + 14 * (n(x / 150 + 4) * 0.5 + 0.5);
          const y = H * 0.8 - papila * amp + 2.5 * n(x / 18);
          if (papila > 0.985 && antes <= 0.985) picos.push([x, y]);
          antes = papila;
          pts.push([x, y]);
        }
        return { pts, picos };
      },
    },
    // derme → hipoderme: lóbulos de gordura
    lobulo: {
      h: 130,
      sobre: 'derme',
      pontos(W, H) {
        const r = semente(33);
        const arcos = [];
        for (let x0 = -30; x0 < W + 60; ) {
          const w = 90 + r() * 120;
          arcos.push([x0, w, w * (0.22 + r() * 0.1)]);
          x0 += w;
        }
        const pts = [];
        let k = 0;
        for (let x = 0; x <= W + 4; x += 4) {
          while (k < arcos.length - 1 && x >= arcos[k][0] + arcos[k][1]) k++;
          const [s, w, h] = arcos[k];
          const t = ((x - s) / w) * 2 - 1;
          pts.push([x, H * 0.86 - h * Math.sqrt(Math.max(0, 1 - t * t))]);
        }
        return { pts };
      },
    },
    // hipoderme → rodapé
    rodape: {
      h: 64,
      pontos(W, H) {
        const pts = [];
        for (let x = 0; x <= W + 6; x += 6) pts.push([x, H * 0.55 + 9 * Math.sin(x / 97) + 5 * Math.sin(x / 41 + 1)]);
        return { pts };
      },
    },
  };

  const f1 = (v) => Math.round(v * 10) / 10;

  function caminho(pts) {
    let d = `M${f1(pts[0][0])} ${f1(pts[0][1])}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const [x, y] = pts[i];
      const [nx, ny] = pts[i + 1];
      d += `Q${f1(x)} ${f1(y)} ${f1((x + nx) / 2)} ${f1((y + ny) / 2)}`;
    }
    const u = pts[pts.length - 1];
    return `${d}L${f1(u[0])} ${f1(u[1])}`;
  }

  function desenharJuncoes() {
    $$('.juncao').forEach((svg) => {
      const tipo = JUNCOES[svg.dataset.juncao];
      if (!tipo) return;
      const caixa = svg.getBoundingClientRect();
      const W = Math.max(320, Math.round(caixa.width));
      if (svg.dataset.largura === String(W)) return;
      svg.dataset.largura = W;
      const H = tipo.h;
      const { pts, graos, picos } = tipo.pontos(W, H);
      const linha = caminho(pts);
      let html = `<path class="j-fill" d="${linha}L${W} ${H}L0 ${H}Z"/>`;

      if (picos) {
        // alças de capilar dentro das papilas: ida arterial, volta venosa
        for (const [x, y] of picos) {
          html += `<path class="j-vaso" stroke="#B8342B" stroke-opacity=".6" d="M${f1(x - 5)} ${H} Q${f1(x - 7)} ${f1(y + 16)} ${f1(x)} ${f1(y + 11)}"/>`;
          html += `<path class="j-vaso" stroke="#3F5AA6" stroke-opacity=".55" d="M${f1(x)} ${f1(y + 11)} Q${f1(x + 7)} ${f1(y + 16)} ${f1(x + 5)} ${H}"/>`;
        }
      }
      if (graos) {
        // fileira de grânulos de melanina logo abaixo da linha
        const r = semente(W);
        let g = '';
        for (let i = 2; i < pts.length; i += 2) {
          const [x, y] = pts[i];
          g += `<circle cx="${f1(x + (r() - 0.5) * 4)}" cy="${f1(y + 8 + r() * 7)}" r="${f1(1.3 + r() * 1.3)}"/>`;
        }
        html += `<g class="j-grao">${g}</g>`;
      }
      if (tipo.sobre) {
        // a tinta de cima avança um pouco sobre a de baixo
        html += `<path class="j-sobre" style="stroke: var(--${tipo.sobre})" transform="translate(0 4)" d="${linha}"/>`;
      }
      html += `<path class="j-linha" pathLength="1" d="${linha}"/>`;

      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      svg.style.height = `${H}px`;
      svg.innerHTML = html;

      // pousa o rótulo da camada exatamente sobre a linha
      const rotulo = $('.rotulo-camada', svg.parentElement);
      if (rotulo) {
        const rc = rotulo.getBoundingClientRect();
        const cx = rc.left + rc.width / 2 - caixa.left;
        let melhor = pts[0];
        for (const p of pts) if (Math.abs(p[0] - cx) < Math.abs(melhor[0] - cx)) melhor = p;
        rotulo.style.setProperty('--rotulo-y', `${f1(melhor[1] - H + 1)}px`);
      }
    });
  }

  /* ---------- a luz sobre a pele (primeira dobra) ---------- */

  function iniciarLente() {
    const secao = $('#superficie');
    const tela = secao && $('.lente', secao);
    if (!tela || !tela.getContext) return;
    const ctx = tela.getContext('2d');
    const texto = $('.superficie__texto', secao);
    const rotulo = $('.lente__rotulo', secao);
    const buf = document.createElement('canvas');
    const bctx = buf.getContext('2d');

    let W = 0;
    let H = 0;
    let dpr = 1;
    let sup = null;
    let fundo = null;
    let caixaTexto = null;
    let modo = 'varredura';
    let inicio = 0;
    let visivel = true;
    let quadro = 0;
    let sujo = null;
    let medidorW = 0;
    let larguraRotulo = 0;
    let alturaRotulo = 0;
    const luz = { x: 0, y: 0, r: 180 };
    const alvo = { x: 0, y: 0 };
    const repouso = { x: 0, y: 0 };

    function pintarSuperficie() {
      const [c, g] = novaTela(W, H, dpr);
      const r = semente(7);
      g.fillStyle = getComputedStyle(raiz).getPropertyValue('--superficie').trim() || '#D9A27E';
      g.fillRect(0, 0, W, H);

      // variação de tom por baixo da superfície
      for (let i = 0; i < 16; i++) {
        const x = r() * W;
        const y = r() * H;
        const rad = 160 + r() * 420;
        const gr = g.createRadialGradient(x, y, 0, x, y, rad);
        gr.addColorStop(0, r() > 0.45 ? 'rgba(244, 204, 172, 0.2)' : 'rgba(186, 116, 82, 0.13)');
        gr.addColorStop(1, 'rgba(217, 162, 126, 0)');
        g.fillStyle = gr;
        g.fillRect(0, 0, W, H);
      }

      // microrrelevo: sulcos que se cruzam em losangos, com borda iluminada
      const n = ruido1(12);
      const diag = Math.hypot(W, H);
      g.lineCap = 'round';
      g.lineJoin = 'round';
      for (const [ang, passo, alfa] of [[0.62, 30, 0.09], [-0.58, 36, 0.08], [1.52, 74, 0.05]]) {
        const dx = Math.cos(ang);
        const dy = Math.sin(ang);
        for (let o = -diag / 2; o < diag / 2; o += passo * (0.7 + r() * 0.6)) {
          const cx = W / 2 - dy * o;
          const cy = H / 2 + dx * o;
          let ativo = r() > 0.3;
          g.beginPath();
          for (let s = -diag / 2; s < diag / 2; s += 10) {
            const wob = 4 * n(s / 90 + o * 0.013);
            const x = cx + dx * s - dy * wob;
            const y = cy + dy * s + dx * wob;
            if (r() < 0.035) ativo = !ativo;
            if (ativo) g.lineTo(x, y);
            else g.moveTo(x, y);
          }
          g.strokeStyle = `rgba(118, 58, 36, ${alfa})`;
          g.lineWidth = 1;
          g.stroke();
          g.save();
          g.translate(0.8, 0.8);
          g.strokeStyle = `rgba(255, 236, 218, ${alfa * 0.9})`;
          g.lineWidth = 0.8;
          g.stroke();
          g.restore();
        }
      }

      // poros
      const poros = Math.round((W * H) / 2600);
      for (let i = 0; i < poros; i++) {
        const x = r() * W;
        const y = r() * H;
        const rr = 0.6 + r() * 1.1;
        g.fillStyle = 'rgba(112, 52, 30, 0.16)';
        g.beginPath();
        g.arc(x, y, rr, 0, TAU);
        g.fill();
        g.fillStyle = 'rgba(255, 238, 222, 0.18)';
        g.beginPath();
        g.arc(x + 0.7, y + 0.7, rr * 0.7, 0, TAU);
        g.fill();
      }

      g.globalAlpha = 0.6;
      g.fillStyle = g.createPattern(grao(), 'repeat');
      g.fillRect(0, 0, W, H);
      g.globalAlpha = 1;
      return c;
    }

    // O que a luz revela: a camada basal vista de cima, com melanócitos.
    function pintarFundo() {
      const [c, g] = novaTela(W, H, dpr);
      const r = semente(41);
      const manchas = ruido2(5);
      g.fillStyle = '#CC8762';
      g.fillRect(0, 0, W, H);

      // mosaico de queratinócitos: células orgânicas, paredes impressas por cima
      g.lineWidth = 0.9;
      mosaico(W, H, 27, r, (poli) => {
        const [cx, cy] = celula(g, poli, 0.92);
        g.globalCompositeOperation = 'source-over';
        g.fillStyle = 'rgba(245, 206, 176, 0.13)';
        g.fill();
        g.globalCompositeOperation = 'multiply';
        g.strokeStyle = 'rgba(120, 58, 34, 0.32)';
        g.stroke();
        g.fillStyle = 'rgba(122, 96, 170, 0.42)';
        g.beginPath();
        g.ellipse(cx, cy, 3.3, 2.7, r() * Math.PI, 0, TAU);
        g.fill();
      });
      g.globalCompositeOperation = 'multiply';

      // manchas: lavagens de pigmento onde o ruído sobe
      for (let i = 0; i < 70; i++) {
        const x = r() * W;
        const y = r() * H;
        const m = manchas(x / 260, y / 260);
        if (m < 0.55) continue;
        const rad = 60 + r() * 120;
        const gr = g.createRadialGradient(x, y, 0, x, y, rad);
        gr.addColorStop(0, `rgba(92, 42, 24, ${0.3 * (m - 0.4)})`);
        gr.addColorStop(1, 'rgba(92, 42, 24, 0)');
        g.fillStyle = gr;
        g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
      }

      // melanócitos, mais ativos dentro das manchas; onde os traços se cruzam, escurece
      const passo = 84;
      for (let y = passo * 0.5; y < H + passo; y += passo) {
        for (let x = passo * 0.5; x < W + passo; x += passo) {
          const mx = x + (r() - 0.5) * passo * 0.7;
          const my = y + (r() - 0.5) * passo * 0.7;
          const ativo = 0.7 + manchas(mx / 260, my / 260) * 0.9;
          const ramos = 4 + Math.floor(r() * 3 + ativo);
          for (let i = 0; i < ramos; i++) {
            const a = (i / ramos) * TAU + r() * 0.8;
            const comp = (26 + r() * 30) * ativo;
            const ex = mx + Math.cos(a) * comp;
            const ey = my + Math.sin(a) * comp;
            const desvio = (r() - 0.5) * 1.1;
            const cx = mx + Math.cos(a + desvio) * comp * 0.55;
            const cy = my + Math.sin(a + desvio) * comp * 0.55;
            g.fillStyle = 'rgba(62, 31, 22, 0.88)';
            afunilado(g, mx, my, cx, cy, ex, ey, 3.2, 0.5);
            const k = Math.round(3 + ativo * 5);
            for (let j = 0; j < k; j++) {
              const [px, py] = bezier(mx, my, cx, cy, ex, ey, Math.min(1, 0.45 + r() * 0.75));
              g.fillStyle = `rgba(42, 18, 11, ${0.55 + r() * 0.35})`;
              g.beginPath();
              g.arc(px + (r() - 0.5) * 9, py + (r() - 0.5) * 9, 0.7 + r() * 1.1, 0, TAU);
              g.fill();
            }
          }
          g.fillStyle = '#3E1F16';
          g.beginPath();
          g.ellipse(mx, my, 6.5, 5.5, r() * Math.PI, 0, TAU);
          g.fill();
          g.globalCompositeOperation = 'source-over';
          g.fillStyle = 'rgba(201, 182, 240, 0.55)';
          g.beginPath();
          g.arc(mx + 0.5, my - 0.5, 2.2, 0, TAU);
          g.fill();
          g.globalCompositeOperation = 'multiply';
        }
      }
      g.globalCompositeOperation = 'source-over';
      return c;
    }

    function medir() {
      const b = tela.getBoundingClientRect();
      const t = texto.getBoundingClientRect();
      caixaTexto = { l: t.left - b.left, t: t.top - b.top, r: t.right - b.left, b: t.bottom - b.top };
      const largo = W >= 900;
      medidorW = parseFloat(getComputedStyle(raiz).getPropertyValue('--medidor-w')) || 0;
      larguraRotulo = rotulo ? rotulo.offsetWidth : 0;
      alturaRotulo = rotulo ? rotulo.offsetHeight : 0;
      luz.r = largo ? Math.max(150, Math.min(230, W * 0.125)) : Math.min(118, W * 0.3);
      if (largo) {
        const direita = W - medidorW;
        repouso.x = Math.min(direita - luz.r - 24, Math.max(caixaTexto.r + luz.r * 0.75, (caixaTexto.r + direita) / 2));
        repouso.y = H * 0.46;
      } else {
        repouso.x = W * 0.62;
        repouso.y = caixaTexto.b + Math.max(luz.r * 0.8, (H - caixaTexto.b) * 0.45);
      }
    }

    function construir() {
      const b = tela.getBoundingClientRect();
      const nW = Math.round(b.width);
      const nH = Math.round(b.height);
      const mudou = nW !== W || Math.abs(nH - H) > 100;
      W = nW;
      H = nH;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      medir();
      if (!mudou && sup) return;
      tela.width = Math.round(W * dpr);
      tela.height = Math.round(H * dpr);
      sup = pintarSuperficie();
      fundo = pintarFundo();
      sujo = null;
      if (modo !== 'varredura') {
        luz.x = repouso.x;
        luz.y = repouso.y;
      }
      compor();
    }

    function longeDoTexto(x, y) {
      const m = luz.r * 0.55;
      const c = caixaTexto;
      if (c && x > c.l - m && x < c.r + m && y > c.t - m && y < c.b + m) {
        if (W >= 900) x = c.r + m;
        else y = c.b + m;
      }
      // não invade o medidor nem o topo com o telefone e o botão
      const largo = W >= 900;
      const maxX = largo ? W - medidorW - luz.r * 0.35 : W - luz.r * 0.3;
      const minY = largo ? 96 + luz.r * 0.25 : luz.r * 0.3;
      return [Math.min(maxX, Math.max(luz.r * 0.3, x)), Math.min(H - luz.r * 0.3, Math.max(minY, y))];
    }

    function compor() {
      if (!sup) return;
      const { x, y, r } = luz;
      const R = r * 1.7;
      const atual = [x - R, y - R, x + R, y + R];
      const area = sujo
        ? [Math.min(sujo[0], atual[0]), Math.min(sujo[1], atual[1]), Math.max(sujo[2], atual[2]), Math.max(sujo[3], atual[3])]
        : [0, 0, W, H];
      sujo = atual;

      // recompõe só a região que a luz tocou
      const sx = Math.max(0, Math.floor(area[0] * dpr));
      const sy = Math.max(0, Math.floor(area[1] * dpr));
      const sw = Math.min(tela.width, Math.ceil(area[2] * dpr)) - sx;
      const sh = Math.min(tela.height, Math.ceil(area[3] * dpr)) - sy;
      if (sw <= 0 || sh <= 0) return;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(sup, sx, sy, sw, sh, sx, sy, sw, sh);

      ctx.save();
      ctx.beginPath();
      ctx.rect(sx, sy, sw, sh);
      ctx.clip();

      // halo quente da luz sobre a superfície
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const h = ctx.createRadialGradient(x, y, r * 0.7, x, y, R);
      h.addColorStop(0, 'rgba(255, 238, 220, 0.2)');
      h.addColorStop(1, 'rgba(255, 238, 220, 0)');
      ctx.fillStyle = h;
      ctx.fillRect(x - R, y - R, R * 2, R * 2);

      // a camada de baixo, levemente ampliada, com borda macia
      const lado = Math.ceil((2 * r + 4) * dpr);
      if (buf.width !== lado) buf.width = buf.height = lado;
      const zoom = 1.12;
      bctx.globalCompositeOperation = 'source-over';
      bctx.setTransform(1, 0, 0, 1, 0, 0);
      bctx.clearRect(0, 0, lado, lado);
      bctx.setTransform(zoom, 0, 0, zoom, lado / 2 - x * dpr * zoom, lado / 2 - y * dpr * zoom);
      bctx.drawImage(fundo, 0, 0);
      bctx.setTransform(1, 0, 0, 1, 0, 0);
      bctx.globalCompositeOperation = 'destination-in';
      const m = bctx.createRadialGradient(lado / 2, lado / 2, r * dpr * 0.5, lado / 2, lado / 2, r * dpr);
      m.addColorStop(0, 'rgba(0, 0, 0, 1)');
      m.addColorStop(0.72, 'rgba(0, 0, 0, 0.8)');
      m.addColorStop(1, 'rgba(0, 0, 0, 0)');
      bctx.fillStyle = m;
      bctx.fillRect(0, 0, lado, lado);
      bctx.globalCompositeOperation = 'source-over';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.drawImage(buf, Math.round(x * dpr - lado / 2), Math.round(y * dpr - lado / 2));

      // anel fino e quatro marcas, como num instrumento de exame
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.strokeStyle = 'rgba(62, 31, 22, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, r * 0.94, 0, TAU);
      ctx.stroke();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(62, 31, 22, 0.55)';
      for (let k = 0; k < 4; k++) {
        const a = (k * Math.PI) / 2 + Math.PI / 4;
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(a) * r * 0.9, y + Math.sin(a) * r * 0.9);
        ctx.lineTo(x + Math.cos(a) * r * 0.99, y + Math.sin(a) * r * 0.99);
        ctx.stroke();
      }
      ctx.restore();

      if (rotulo && larguraRotulo) {
        // o rótulo vira para o outro lado quando encostaria no medidor
        const limite = W - medidorW - 16;
        const esquerda = x + r * 0.8 + larguraRotulo > limite;
        rotulo.classList.toggle('is-esquerda', esquerda);
        const rx = esquerda ? x - r * 0.8 - larguraRotulo : x + r * 0.8;
        rotulo.style.transform = `translate3d(${Math.round(rx)}px, ${Math.round(y - r * 0.76 - alturaRotulo / 2)}px, 0)`;
      }
    }

    function passo(agora) {
      quadro = 0;
      if (!visivel) return;
      if (modo === 'varredura') {
        if (!inicio) inicio = agora;
        const p = Math.min(1, (agora - inicio) / 2800);
        const e = 1 - Math.pow(1 - p, 3.2);
        const [px, py] = bezier(repouso.x - W * 0.18, H + luz.r * 0.5, repouso.x + W * 0.12, H * 0.78, repouso.x, repouso.y, e);
        luz.x = px;
        luz.y = py;
        if (p >= 1) {
          modo = 'deriva';
          rotulo?.classList.add('is-visivel');
        }
      } else {
        let tx = alvo.x;
        let ty = alvo.y;
        if (modo === 'deriva') {
          tx = repouso.x + Math.sin(agora / 2300) * 34;
          ty = repouso.y + Math.sin(agora / 1700 + 1) * 22;
        }
        luz.x += (tx - luz.x) * 0.085;
        luz.y += (ty - luz.y) * 0.085;
      }
      compor();
      if (!reduz()) quadro = requestAnimationFrame(passo);
    }

    function pedir() {
      if (!quadro && visivel) quadro = requestAnimationFrame(passo);
    }

    function mover(e) {
      const b = tela.getBoundingClientRect();
      const [x, y] = longeDoTexto(e.clientX - b.left, e.clientY - b.top);
      alvo.x = x;
      alvo.y = y;
      modo = 'segue';
      rotulo?.classList.add('is-visivel');
      if (reduz()) {
        luz.x = x;
        luz.y = y;
        compor();
      } else {
        pedir();
      }
    }

    secao.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'touch') mover(e);
    });
    secao.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch' && !e.target.closest('a, button')) mover(e);
    });
    secao.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'touch' && modo === 'segue') {
        modo = 'deriva';
        pedir();
      }
    });

    let naTela = true;
    const reavaliar = () => {
      visivel = naTela && !document.hidden;
      if (visivel && !reduz()) pedir();
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => {
        naTela = e.isIntersecting;
        reavaliar();
      }).observe(secao);
    }
    document.addEventListener('visibilitychange', reavaliar);

    construir();
    if (reduz()) {
      modo = 'deriva';
      luz.x = repouso.x;
      luz.y = repouso.y;
      rotulo?.classList.add('is-visivel');
      compor();
    } else {
      pedir();
    }

    return construir;
  }

  /* ---------- prancha da camada basal ---------- */

  function iniciarPrancha() {
    const fig = $('.prancha');
    if (!fig) return;
    const palco = $('.prancha__palco', fig);
    const tela = $('.prancha__tela', fig);
    const camadaRotulos = $('.prancha__rotulos', fig);
    const ctx = tela.getContext('2d');

    let W = 0;
    let H = 0;
    let dpr = 1;
    let estatico = null;
    let dendritos = [];
    let visivel = false;
    let quadro = 0;

    function construir() {
      const nW = Math.round(palco.clientWidth);
      if (nW === W && estatico) return;
      W = nW;
      H = W < 720 ? 320 : Math.round(Math.min(460, Math.max(360, W * 0.3)));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      tela.style.height = `${H}px`;
      tela.width = Math.round(W * dpr);
      tela.height = Math.round(H * dpr);

      const r = semente(11);
      const n = ruido1(19);
      const base = H * 0.72;
      const membrana = (x) => base + 13 * Math.sin(x / 58 + 0.4) + 6 * Math.sin(x / 19 + 1.3) + 5 * n(x / 80);
      const [c, g] = novaTela(W, H, dpr);
      estatico = c;
      dendritos = [];

      // derme logo abaixo: fibras de colágeno e alças de capilar
      g.lineCap = 'round';
      for (let i = 0; i < 22; i++) {
        const y0 = base + 22 + r() * (H - base - 26);
        g.strokeStyle = `rgba(228, 130, 111, ${0.16 + r() * 0.16})`;
        g.lineWidth = 1 + r() * 1.4;
        g.beginPath();
        for (let x = -20; x <= W + 20; x += 12) {
          const y = y0 + 6 * Math.sin(x / (40 + i * 3) + i) + 3 * n(x / 30 + i * 7);
          if (x === -20) g.moveTo(x, y);
          else g.lineTo(x, y);
        }
        g.stroke();
      }

      // membrana basal
      g.strokeStyle = 'rgba(249, 227, 210, 0.6)';
      g.lineWidth = 1.5;
      g.beginPath();
      for (let x = 0; x <= W; x += 4) {
        if (x === 0) g.moveTo(x, membrana(x));
        else g.lineTo(x, membrana(x));
      }
      g.stroke();

      // melanócitos pousados na membrana
      const melanocitos = [];
      for (let x = 70 + r() * 50; x < W - 40; x += 170 + r() * 70) melanocitos.push({ x, y: membrana(x) - 13 });

      // células: fileira basal, camadas espinhosas e, no alto, o estrato córneo sem núcleo
      const celulas = [];
      for (let x = 6; x < W; x += 19 + r() * 3) {
        if (melanocitos.some((m) => Math.abs(m.x - x) < 16)) continue;
        const inc = Math.atan2(membrana(x + 2) - membrana(x - 2), 4);
        celulas.push({ x, y: membrana(x) - 16, rx: 8.5, ry: 15, rot: inc, fileira: 0 });
      }
      let topo = base - 34;
      for (let k = 1; topo > 12; k++) {
        const altura = Math.max(7, 30 - k * 3.2);
        const largura = 34 + k * 6;
        const desloc = k % 2 ? largura / 2 : 0;
        for (let x = desloc - largura; x < W + largura; x += largura + r() * 4) {
          const onda = (membrana(x) - base) * Math.max(0, 1 - k * 0.28);
          celulas.push({
            x: x + r() * 6,
            y: topo - altura / 2 + onda,
            rx: largura / 2 - 3,
            ry: altura / 2 - 1.5,
            rot: (r() - 0.5) * 0.12,
            fileira: k,
            cornea: altura <= 8,
          });
        }
        topo -= altura + 5;
      }

      // dendritos: sobem entre as células a partir de cada melanócito
      for (const m of melanocitos) {
        const ramos = 4 + Math.floor(r() * 3);
        for (let i = 0; i < ramos; i++) {
          const a = -Math.PI + 0.35 + (i / (ramos - 1)) * (Math.PI - 0.7) + (r() - 0.5) * 0.3;
          const comp = 60 + r() * 70;
          const ex = m.x + Math.cos(a) * comp;
          const ey = m.y + Math.sin(a) * comp * 0.9;
          const cx = m.x + Math.cos(a + (r() - 0.5) * 0.9) * comp * 0.5;
          const cy = m.y + Math.sin(a) * comp * 0.5;
          dendritos.push({ x0: m.x, y0: m.y, cx, cy, x1: ex, y1: ey, v: 0.07 + r() * 0.05, fase: r() });
        }
      }

      // quanto mais perto de uma ponta de dendrito, mais melanina no "guarda-sol"
      const pontas = dendritos.map((d) => [d.x1, d.y1]);
      for (const cel of celulas) {
        g.save();
        g.translate(cel.x, cel.y);
        g.rotate(cel.rot);
        g.beginPath();
        g.ellipse(0, 0, cel.rx, cel.ry, 0, 0, TAU);
        g.fillStyle = cel.cornea ? 'rgba(249, 227, 210, 0.09)' : 'rgba(249, 227, 210, 0.05)';
        g.fill();
        g.strokeStyle = 'rgba(249, 227, 210, 0.3)';
        g.lineWidth = 1;
        g.stroke();
        if (!cel.cornea) {
          const nr = Math.min(cel.rx, cel.ry) * 0.42 + 1.2;
          g.fillStyle = 'rgba(201, 182, 240, 0.5)';
          g.beginPath();
          g.ellipse(0, 1, nr * 1.15, nr, 0, 0, TAU);
          g.fill();
          let perto = 0;
          for (const [px, py] of pontas) perto = Math.max(perto, 1 - Math.hypot(px - cel.x, py - cel.y) / 110);
          const graos = Math.round(3 + perto * 13 + (cel.fileira === 0 ? 4 : 0));
          for (let j = 0; j < graos; j++) {
            const a = -Math.PI * (0.18 + 0.64 * (j / Math.max(1, graos - 1))) + (r() - 0.5) * 0.2;
            const d = nr * 1.15 + 1.5 + r() * 2.2;
            g.fillStyle = `rgba(233, 165, 91, ${0.55 + r() * 0.4})`;
            g.beginPath();
            g.arc(Math.cos(a) * d * 1.1, 1 + Math.sin(a) * d, 0.9 + r() * 0.8, 0, TAU);
            g.fill();
          }
        }
        g.restore();
      }

      // melanócitos por cima das células
      g.fillStyle = 'rgba(249, 227, 210, 0.88)';
      for (const d of dendritos) afunilado(g, d.x0, d.y0, d.cx, d.cy, d.x1, d.y1, 4.2, 0.8);
      for (const m of melanocitos) {
        g.fillStyle = 'rgba(249, 227, 210, 0.95)';
        g.beginPath();
        g.ellipse(m.x, m.y, 11, 9, 0, 0, TAU);
        g.fill();
        g.fillStyle = 'rgba(91, 63, 140, 0.85)';
        g.beginPath();
        g.ellipse(m.x, m.y + 1, 4.6, 4, 0, 0, TAU);
        g.fill();
      }

      // rótulos com linhas-guia
      const largo = W >= 720;
      const perto = (x0, filtro) =>
        celulas.filter(filtro).reduce((a, b) => (Math.abs(b.x - x0) < Math.abs(a.x - x0) ? b : a));
      const mel = melanocitos[Math.min(melanocitos.length - 1, largo ? 2 : 1)] || melanocitos[0];
      const ramo = dendritos.find((d) => d.x0 === mel.x && d.x1 < mel.x) || dendritos[0];
      const capa = perto(ramo.x1, (c0) => !c0.cornea && c0.fileira > 0);
      const itens = [];
      if (largo) {
        const cor = perto(W * 0.1, (c0) => c0.cornea);
        const quer = perto(W * 0.74, (c0) => c0.fileira === 3);
        itens.push({ t: 'estrato córneo', ax: cor.x, ay: cor.y, lx: cor.x + 44, ly: Math.max(12, cor.y - 4), lado: 1 });
        itens.push({ t: 'queratinócito', ax: quer.x, ay: quer.y, lx: quer.x + 64, ly: quer.y - 58, lado: 1 });
      }
      itens.push({ t: 'melanina sobre o núcleo', ax: capa.x, ay: capa.y - 8, lx: capa.x - 36, ly: Math.max(14, capa.y - 70), lado: -1 });
      itens.push({ t: 'melanócito', ax: mel.x, ay: mel.y, lx: mel.x + 48, ly: Math.min(H - 16, mel.y + 58), lado: 1 });
      const bx = largo ? W * 0.84 : W * 0.22;
      itens.push({ t: 'camada basal', ax: bx, ay: membrana(bx), lx: bx + (largo ? -40 : 30), ly: Math.min(H - 16, membrana(bx) + (largo ? 64 : 40)), lado: largo ? -1 : 1 });
      if (largo) itens.push({ t: 'derme', ax: W * 0.16, ay: H - 30, lx: W * 0.16 + 40, ly: H - 18, lado: 1 });

      camadaRotulos.textContent = '';
      for (const it of itens) {
        const el = document.createElement('span');
        el.className = 'prancha__rotulo';
        el.textContent = it.t;
        camadaRotulos.append(el);
        const w = el.offsetWidth;
        let left = it.lado > 0 ? it.lx : it.lx - w;
        left = Math.max(6, Math.min(W - w - 6, left));
        el.style.transform = `translate(${Math.round(left)}px, ${Math.round(it.ly - el.offsetHeight / 2)}px)`;
        const px = it.lado > 0 ? left : left + w;
        g.strokeStyle = 'rgba(249, 227, 210, 0.75)';
        g.lineWidth = 1;
        g.beginPath();
        g.moveTo(it.ax, it.ay);
        g.lineTo(px, it.ly);
        g.stroke();
        g.fillStyle = '#F9E3D2';
        g.beginPath();
        g.arc(it.ax, it.ay, 2.6, 0, TAU);
        g.fill();
      }

      desenhar(performance.now());
    }

    // grânulos de melanina subindo pelos dendritos
    function desenhar(agora) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, tela.width, tela.height);
      ctx.drawImage(estatico, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'screen';
      const s = reduz() ? 0 : agora / 1000;
      for (const d of dendritos) {
        for (let k = 0; k < 3; k++) {
          const t = (d.fase + k / 3 + s * d.v) % 1;
          const [x, y] = bezier(d.x0, d.y0, d.cx, d.cy, d.x1, d.y1, t);
          const alfa = Math.min(1, t * 6, (1 - t) * 5);
          ctx.fillStyle = `rgba(233, 165, 91, ${0.22 * alfa})`;
          ctx.beginPath();
          ctx.arc(x, y, 4.2, 0, TAU);
          ctx.fill();
          ctx.fillStyle = `rgba(244, 190, 120, ${alfa})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.9, 0, TAU);
          ctx.fill();
        }
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    function passo(agora) {
      quadro = 0;
      if (!visivel || reduz()) return;
      desenhar(agora);
      quadro = requestAnimationFrame(passo);
    }

    let naTela = false;
    const reavaliar = () => {
      visivel = naTela && !document.hidden;
      if (visivel && !quadro && !reduz()) quadro = requestAnimationFrame(passo);
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => {
        naTela = e.isIntersecting;
        reavaliar();
      }, { rootMargin: '80px 0px' }).observe(palco);
    }
    document.addEventListener('visibilitychange', reavaliar);

    construir();
    return construir;
  }

  /* ---------- revelações ao rolar ---------- */

  function iniciarRevelacoes() {
    $$('.fototipo__corte').forEach((el, i) => el.style.setProperty('--i', i));
    $$('.palavras__legenda li').forEach((el, i) => el.style.setProperty('--i', i));
    const juncoes = $$('.juncao');
    const blocos = [$('.fototipos__lista'), $('.palavras')].filter(Boolean);
    const marcar = (el) => el.classList.add(el.classList.contains('juncao') ? 'is-desenhada' : 'is-visivel');
    if (!('IntersectionObserver' in window)) {
      [...juncoes, ...blocos].forEach(marcar);
      return;
    }
    const observar = (alvos, opcoes) => {
      const io = new IntersectionObserver((entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          marcar(e.target);
          io.unobserve(e.target);
        }
      }, opcoes);
      alvos.forEach((a) => io.observe(a));
    };
    // a linha começa a ser traçada assim que aparece, inclusive na primeira dobra
    observar(juncoes, { threshold: 0 });
    observar(blocos, { rootMargin: '0px 0px -10% 0px', threshold: 0.2 });
  }

  /* ---------- medidor de profundidade e barra do celular ---------- */

  function iniciarMedidor() {
    const secoes = $$('main .camada');
    const rodape = $('.rodape');
    const links = $$('.medidor a[data-alvo]');
    const barra = $('[data-barra]');
    const anat = $('[data-barra-anat]');
    const tema = $('[data-barra-tema]');
    const acoesTopo = $('.superficie__acoes');
    const NOMES = {
      superficie: ['Superfície', 'Início'],
      epiderme: ['Epiderme', 'A consulta'],
      basal: ['Camada basal', 'Melasma'],
      derme: ['Derme', 'Avaliações'],
      hipoderme: ['Hipoderme', 'Como chegar'],
    };
    // tinta e chão de cada camada, lidos dos tokens do CSS
    const token = (nome) => getComputedStyle(raiz).getPropertyValue(`--${nome}`).trim();
    const CORES = {
      superficie: [token('melanina'), token('superficie')],
      epiderme: [token('melanina'), token('epiderme')],
      basal: [token('claro'), token('melanina')],
      derme: [token('melanina-funda'), token('derme')],
      hipoderme: [token('melanina'), token('hipoderme')],
      rodape: [token('claro'), token('melanina')],
    };

    $$('.medidor li').forEach((li, i, todos) => li.style.setProperty('--pos', i / (todos.length - 1)));

    let topos = [];
    let fimRodape = 0;
    let atual = '';
    let fundo = '';
    let pedido = false;

    function medir() {
      topos = secoes.map((s) => s.getBoundingClientRect().top + window.scrollY);
      fimRodape = rodape ? rodape.getBoundingClientRect().top + window.scrollY : Infinity;
      atualizar();
    }

    function atualizar() {
      pedido = false;
      const vh = window.innerHeight;
      const y = window.scrollY + vh * 0.42;
      let i = 0;
      while (i < secoes.length - 1 && y >= topos[i + 1]) i++;
      const fim = i < secoes.length - 1 ? topos[i + 1] : raiz.scrollHeight - vh * 0.58;
      const p = Math.max(0, Math.min(1, (y - topos[i]) / Math.max(1, fim - topos[i])));
      raiz.style.setProperty('--prog', ((i + p) / (secoes.length - 1)).toFixed(4));

      const id = secoes[i].id;
      if (id !== atual) {
        atual = id;
        links.forEach((a) => (a.dataset.alvo === id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
        if (anat) anat.textContent = NOMES[id][0];
        if (tema) tema.textContent = NOMES[id][1];
      }

      const meio = window.scrollY + vh * 0.5;
      let chao = 'superficie';
      if (meio >= fimRodape) chao = 'rodape';
      else for (let k = 0; k < secoes.length; k++) if (meio >= topos[k]) chao = secoes[k].id;
      if (chao !== fundo) {
        fundo = chao;
        raiz.style.setProperty('--medidor-tinta', CORES[chao][0]);
        raiz.style.setProperty('--medidor-chao', CORES[chao][1]);
      }
    }

    window.addEventListener(
      'scroll',
      () => {
        if (!pedido) {
          pedido = true;
          requestAnimationFrame(atualizar);
        }
      },
      { passive: true }
    );

    // barra do celular e botão do medidor só aparecem depois do botão da primeira dobra
    const flutuantes = [barra, $('.medidor__wa')].filter(Boolean);
    if (acoesTopo && 'IntersectionObserver' in window) {
      new IntersectionObserver(([e]) => {
        const passou = !e.isIntersecting && e.boundingClientRect.top < 0;
        flutuantes.forEach((el) => el.classList.toggle('is-visivel', passou));
      }).observe(acoesTopo);
    } else {
      flutuantes.forEach((el) => el.classList.add('is-visivel'));
    }

    medir();
    return medir;
  }

  /* ---------- horário ao vivo (horário de Brasília) ---------- */

  function iniciarHorario() {
    const HORARIO = { 0: null, 1: [8, 18], 2: [8, 18], 3: [8, 18], 4: [8, 18], 5: [8, 18], 6: [8, 11] };
    const DIAS = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    const SEMANA = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let fmt;
    try {
      fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' });
    } catch (erro) {
      return;
    }

    function situacao() {
      const partes = fmt.formatToParts(new Date());
      const v = (tipo) => partes.find((p) => p.type === tipo).value;
      const dia = SEMANA.indexOf(v('weekday'));
      const min = (Number(v('hour')) % 24) * 60 + Number(v('minute'));
      const hoje = HORARIO[dia];
      if (hoje && min >= hoje[0] * 60 && min < hoje[1] * 60) return { dia, aberto: true, texto: `Aberto agora · fecha às ${hoje[1]}h` };
      if (hoje && min < hoje[0] * 60) return { dia, aberto: false, texto: `Fechado agora · abre hoje às ${hoje[0]}h` };
      for (let k = 1; k <= 7; k++) {
        const d = (dia + k) % 7;
        if (HORARIO[d]) return { dia, aberto: false, texto: `Fechado agora · abre ${k === 1 ? 'amanhã' : DIAS[d]} às ${HORARIO[d][0]}h` };
      }
      return null;
    }

    function aplicar() {
      const s = situacao();
      if (!s) return;
      $$('[data-status]').forEach((el) => {
        el.dataset.aberto = String(s.aberto);
        ($('[data-status-texto]', el) || el).textContent = s.texto;
        el.hidden = false;
      });
      $$('.horarios tr[data-dias]').forEach((tr) => tr.classList.toggle('is-hoje', tr.dataset.dias.split(' ').includes(String(s.dia))));
    }

    aplicar();
    setInterval(aplicar, 60000);
  }

  /* ---------- partida ---------- */

  desenharJuncoes();
  iniciarRevelacoes();
  const refazerLente = iniciarLente();
  const refazerPrancha = iniciarPrancha();
  const remedir = iniciarMedidor();
  iniciarHorario();

  let espera = 0;
  window.addEventListener('resize', () => {
    clearTimeout(espera);
    espera = setTimeout(() => {
      desenharJuncoes();
      refazerLente?.();
      refazerPrancha?.();
      remedir?.();
    }, 160);
  });

  const depoisDasFontes = () => {
    $$('.juncao').forEach((s) => delete s.dataset.largura);
    desenharJuncoes();
    refazerLente?.();
    remedir?.();
  };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(depoisDasFontes);
  window.addEventListener('load', () => remedir?.());
})();
