# Landing page · Clínica Especializada Dra. Franciela Costa

Página estática (HTML, CSS e JS, sem etapa de build). A página é um corte da pele: cada seção é uma camada (superfície, epiderme, camada basal, derme e hipoderme).

## Arquivos que vão para o ar

```
index.html
styles.css
main.js
assets/favicon.svg
assets/og.jpg        ← imagem que aparece ao compartilhar o link no WhatsApp
assets/texturas/     ← texturas das camadas (células e colágeno)
```

As pastas `.impeccable/` e `.claude/` são só de desenvolvimento e não devem ser enviadas para a hospedagem.

## Como ver no computador

Abra `index.html` no navegador ou rode um servidor local nesta pasta:

```bash
python3 -m http.server 8771
```

Depois acesse http://localhost:8771.

## Pendências antes de publicar

Todos os dados vêm da ficha do Google Maps, coletada em 30/09/2026. O que não estava na ficha ficou marcado na página como pendente:

1. **Retrato da Dra. Franciela.** Salve a foto autorizada em `assets/fotos/dra-franciela.jpg` e troque o bloco "FOTO PENDENTE" da seção da consulta pela linha de `<img>` indicada no comentário do `index.html`. A classe `retrato__moldura` mantém o recorte redondo.
2. **Foto do consultório.** Salve em `assets/fotos/consultorio.jpg` e troque o segundo bloco "FOTO PENDENTE", ao lado do mapa, pela linha de `<img>` do comentário (classe `ambiente__moldura`).
3. **Formação e registro profissional.** Substitua a etiqueta "A confirmar" pela formação e pelo número do conselho (CRM, CRBM etc.) informados pela clínica.
4. **Revisar com a Dra.:**
   - os dois parágrafos sobre melasma da seção escura;
   - a legenda da ilustração;
   - a escala de Fitzpatrick e as seis descrições dos fototipos.

   São textos educativos gerais, não informações da ficha.
5. **Depoimento cortado.** O trecho "Amei, ambiente agradável, produtos de alta qualidade, resultado garantido." aparece sem o final ("[…]"), porque publicidade na área da saúde não pode prometer resultado. Se a clínica quiser o texto completo, ele está anotado no `index.html`.
6. **Link das avaliações.** Hoje o link abre uma busca no Google Maps pelo nome da clínica. Troque pelo link direto da ficha (o do botão "Compartilhar" no Maps).
7. **Números.** A nota 5,0, as 97 avaliações e a contagem de palavras são de setembro de 2026. Atualize de tempos em tempos.
8. **Imagem de compartilhamento.** Depois de publicar, troque `content="assets/og.jpg"` pelo endereço completo, por exemplo `https://seudominio.com.br/assets/og.jpg`. O WhatsApp exige o endereço completo para mostrar a prévia.
9. **Instagram e logo.** Não foram encontrados. Se existirem, dá para incluir no topo e no rodapé.

## Como publicar

Qualquer hospedagem estática serve:

- Netlify: arraste a pasta em app.netlify.com/drop.
- Vercel.
- GitHub Pages.
- Hospedagem comum (Hostinger etc.): envie os arquivos da lista acima.

## O que a página faz

- **Primeira dobra:** uma luz passa pela pele e mostra os melanócitos por baixo da superfície. No computador ela segue o cursor; no celular, se move sozinha e responde ao toque.
- **Linhas entre as camadas:** são desenhadas à medida que a pessoa rola a página.
- **Medidor de profundidade:** no computador, fica à direita, serve de menu e tem o botão do WhatsApp. No celular, vira uma barra fixa com o botão "Agendar no WhatsApp".
- **Ilustração animada da camada basal:** mostra os grânulos de melanina subindo pelos melanócitos.
- **Horário ao vivo:** "Aberto agora" ou "Fechado agora", calculado pelo horário de Brasília, com o dia de hoje marcado na tabela.
- **Botões de agendamento:** abrem o WhatsApp com a mensagem "Olá! Vim pelo site e gostaria de agendar uma consulta estética com a Dra. Franciela."
- **Movimento reduzido:** quem ativa "reduzir movimento" no aparelho vê tudo parado e legível.
