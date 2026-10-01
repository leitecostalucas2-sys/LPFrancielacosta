---
name: Clínica Especializada Dra. Franciela Costa
description: "Camadas da pele: the page as a cut through skin, one drenched stratum per section, written in melanin umber."
colors:
  melanina: "#3E1F16"
  melanina-funda: "#2E140D"
  nucleo: "#5B3F8C"
  nucleo-claro: "#C9B6F0"
  ambar: "#E9A55B"
  superficie: "#D9A27E"
  epiderme: "#F2C8A8"
  derme: "#E4826F"
  hipoderme: "#F1CF72"
  claro: "#F9E3D2"
  pele-1: "#F5D8C3"
  pele-2: "#EBC09F"
  pele-3: "#D6A07A"
  pele-4: "#B67A52"
  pele-5: "#875336"
  pele-6: "#4F2E20"
typography:
  display:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(2.75rem, min(1.35rem + 4.9vw, 10vh), 5.75rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  numeral:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(7rem, 3.4rem + 12.5vw, 15rem)"
    fontWeight: 700
    lineHeight: 0.76
    letterSpacing: "-0.04em"
    fontFeature: "\"lnum\""
  headline:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(2.125rem, 1.4rem + 2.6vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(1.5rem, 1.15rem + 1.1vw, 2.125rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  quote:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(1.5rem, 1.05rem + 1.8vw, 2.625rem)"
    fontWeight: 600
    lineHeight: 1.24
    letterSpacing: "-0.02em"
  quote-short:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(1.1875rem, 1rem + 0.6vw, 1.5rem)"
    fontWeight: 500
    lineHeight: 1.3
  lead:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.45vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.55
  caption:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.45
  small:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
  button:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.2
  label:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    letterSpacing: "0.09em"
  tag:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.09em"
  micro:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    letterSpacing: "0.1em"
  latin:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    letterSpacing: "0em"
rounded:
  pill: "999px"
  plate: "1.6rem"
  core-crown: "1.4rem"
  core-foot: "0.7rem"
  focus: "10px"
spacing:
  gutter: "clamp(1.25rem, 0.6rem + 2.6vw, 3rem)"
  column-gap: "clamp(1rem, 0.4rem + 1.6vw, 2rem)"
  container: "1320px"
  stratum: "clamp(6rem, 3.5rem + 8vw, 10.5rem)"
  interlude: "clamp(6rem, 4rem + 6vw, 10rem)"
  gauge-rail: "156px"
  ink-overlap: "8px"
components:
  stratum-superficie:
    backgroundColor: "{colors.superficie}"
    textColor: "{colors.melanina}"
  stratum-epiderme:
    backgroundColor: "{colors.epiderme}"
    textColor: "{colors.melanina}"
  stratum-basal:
    backgroundColor: "{colors.melanina}"
    textColor: "{colors.claro}"
  stratum-derme:
    backgroundColor: "{colors.derme}"
    textColor: "{colors.melanina-funda}"
  stratum-hipoderme:
    backgroundColor: "{colors.hipoderme}"
    textColor: "{colors.melanina}"
  stratum-rodape:
    backgroundColor: "{colors.melanina}"
    textColor: "{colors.claro}"
  button-primary:
    backgroundColor: "{colors.melanina}"
    textColor: "{colors.claro}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 1.6rem 0.45rem 0.45rem"
    height: "3.5rem"
  button-primary-disc:
    backgroundColor: "{colors.claro}"
    textColor: "{colors.melanina}"
    rounded: "{rounded.pill}"
    size: "2.6rem"
  button-compact:
    backgroundColor: "{colors.melanina}"
    textColor: "{colors.claro}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 1.05rem 0.3rem 0.3rem"
    height: "2.9rem"
  button-large:
    backgroundColor: "{colors.melanina}"
    textColor: "{colors.claro}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 2.1rem 0.5rem 0.5rem"
    height: "4.4rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.melanina}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 1.25rem 0.35rem 1rem"
    height: "3.5rem"
  button-inverted:
    backgroundColor: "{colors.claro}"
    textColor: "{colors.melanina}"
    rounded: "{rounded.pill}"
  button-bar:
    backgroundColor: "{colors.claro}"
    textColor: "{colors.melanina}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 1.05rem 0.25rem 0.25rem"
    height: "3rem"
  stratum-label:
    backgroundColor: "{colors.epiderme}"
    textColor: "{colors.melanina}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.3rem 0.85rem 0.3rem 0.4rem"
  plate-callout:
    backgroundColor: "{colors.melanina}"
    textColor: "{colors.claro}"
    typography: "{typography.tag}"
    rounded: "{rounded.pill}"
    padding: "0.22rem 0.6rem"
  tag:
    backgroundColor: "{colors.melanina}"
    textColor: "{colors.hipoderme}"
    typography: "{typography.tag}"
    rounded: "{rounded.pill}"
    padding: "0.22rem 0.65rem"
  gauge-marker:
    backgroundColor: "{colors.melanina}"
    rounded: "{rounded.pill}"
    size: "13px"
  gauge-whatsapp:
    backgroundColor: "{colors.melanina}"
    textColor: "{colors.superficie}"
    rounded: "{rounded.pill}"
    size: "58px"
  mobile-bar:
    backgroundColor: "{colors.melanina}"
    textColor: "{colors.claro}"
    rounded: "{rounded.pill}"
    padding: "0.4rem 0.4rem 0.4rem 1.15rem"
  phototype-core:
    rounded: "{rounded.core-crown}"
    height: "clamp(11rem, 7rem + 10vw, 17.5rem)"
  map-plate:
    backgroundColor: "{colors.epiderme}"
    rounded: "{rounded.plate}"
---

# Design System: Clínica Especializada Dra. Franciela Costa

## Overview

**Creative North Star: "Camadas da pele"**

The page is a cut through skin, read from the surface down. Each section is one stratum, drenched edge to edge in its own tissue color and stacked in anatomical order: tan surface, peach epiderme, umber basal layer, coral derme, butter hipoderme, and an umber footer beneath them. Melanin umber is at once the deepest stratum and the ink everything is written in. Strata never sit in boxes; they meet along undulating junction lines, one profile per anatomical boundary, where the lower stratum rises into the one above.

The material is a stained histology plate printed in translucent ink. Each ground carries its own tissue as a faint umber line texture (keratinocytes, collagen, fat lobules). Tissue is named in tracked caps with an italic Latin companion, tied to what it names by a leader line or a ringed dot. Where inks overlap they multiply, so an overlap always prints darker and melanin is always the darkest ink. Hematoxylin violet appears only where a stain would: nuclei, keyboard focus, and the live "open now" dot. Granule amber appears only as melanin granules. One grotesk, Familjen Grotesk, carries everything from the 15rem rating numeral down to the 11px gauge labels. The brand fixes the anti-reference: never the generic luxury spa (no gold, marble, foil, or interchangeable aspirational lines).

Motion is descent. On arrival a lamp sweeps once across the surface, then follows the pointer and reveals the melanocyte network underneath. Junction lines draw themselves as they come into view. A depth gauge on the right rail tracks the stratum you are in and recolors itself to each ground. Phototype cores open top-down in sequence. Granules flow up the dendrites in the basal plate. Every transition eases on one long expo-out curve (cubic-bezier(0.16, 1, 0.3, 1)); only the live dot's pulse breathes on ease-in-out. Under reduced motion the page arrives drawn and still: lines already traced, cores already open, the lamp at rest, granules frozen; only fades and color changes remain.

**Key Characteristics:**
- Full-bleed stratum grounds in anatomical order; no cards, no boxed sections.
- Junction lines are the only dividers between strata, one generated profile per boundary.
- Umber is the ink, the CTA and the deepest ground; violet and amber are cellular, never decorative.
- Translucent inks multiply where they overlap.
- One type family; tracked caps only for anatomical labels.
- Pills and circles for controls, organic curves for anatomy, straight leaders for labels.
- A depth gauge on the desktop rail, a floating umber bar on phones.

## Colors

A warm palette drawn from tissue: every ground is a stratum, the only ink is melanin, and the single cool hue is the violet of a stained nucleus.

### Primary
- **Melanin Umber** (#3E1F16): The system's ink. Text and headings on every light stratum, the 1.5px junction lines and rims, every primary pill, the gauge marker, the selection highlight, the scrollbar thumb. Also the ground of the basal stratum and the footer, where the ink flips to Claro.
- **Deep Melanin** (#2E140D): The ink on the coral derme, the stroke of the collagen texture, the tint of every pill shadow, and the monumental 5,0 (at 92% with multiply, so the collagen shows through it).

### Secondary
- **Hematoxylin Violet** (#5B3F8C): Nuclei in the lamp's underlayer and the basal plate, the 3px focus ring on light strata, the text caret, and the pulsing dot of the live "Aberto agora" status.
- **Pale Hematoxylin** (#C9B6F0): The same stain on umber: the focus ring in the basal stratum, the footer and the mobile bar, and nuclei painted on the dark plate.

### Tertiary
- **Granule Amber** (#E9A55B): Melanin granules only: the granule caps sitting over keratinocyte nuclei in the basal plate, and the granules that flow up the dendrites, screen-composited over the umber.

### Neutral
The strata grounds and the pale ink. Each ground pairs with exactly one ink.
- **Surface Tan** (#D9A27E): The first viewport, painted with canvas microrelief, pores and grain; also the browser theme color and the outer field of the favicon. Ink: Melanin Umber.
- **Epiderme Peach** (#F2C8A8): The consultation stratum, with the keratinocyte texture; the under-fill of the map plate and the "tratamento" band of the word core. Ink: Melanin Umber.
- **Derme Coral** (#E4826F): The reviews stratum, with the collagen texture; the dermal band of every phototype core. Ink: Deep Melanin.
- **Hipoderme Butter** (#F1CF72): The visit stratum, with the fat-lobule texture; the fat band of every phototype core and the text of the "hoje" tag. Ink: Melanin Umber. Flat and matte, never metallic.
- **Claro** (#F9E3D2): The pale ink on umber grounds: text in the basal stratum, the footer and the mobile bar; the inverted pill; the cell outlines, membrane and leader lines of the basal plate.

### Fitzpatrick Ramp
Six skin tones, pele-1 (#F5D8C3) through pele-6 (#4F2E20), used as data. Each tints the top band of one phototype core, and the melanin dots in that band grow denser and stronger from I to VI (dot pitch 22, 17, 13, 10, 7.5, 5.5px; strength 0.35, 0.45, 0.55, 0.7, 0.85, 1). pele-2 also fills the dotted "resultado" band of the word core.

### Named Rules
**The One Ink Rule.** Melanin is the only ink: Melanin Umber on light strata (Deep Melanin on the coral derme), Claro on umber strata. Secondary text is that ink mixed toward its own ground (86%; 80% in the footer), never a gray. No pure black, pure white or neutral gray appears anywhere.

**The Stain Rule.** Violet marks nuclei, focus and the live open-now dot; amber marks melanin granules. Neither is ever text, a surface, a button or an ornament.

**The Ground Pair Rule.** A stratum sets its ground and ink once. Labels, outline buttons, tags, rims and secondary text inherit that pair instead of choosing their own colors.

**The Flag Exception.** The LGBTQ+ flag beside the welcome line (six 3px stripes, 1.75rem wide, 3px corners, 25% umber outline) keeps its canonical colors. It is the only off-palette color in the system and seeds nothing else.

## Typography

**Display Font:** Familjen Grotesk (with ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif)
**Body Font:** Familjen Grotesk (same stack)

**Character:** One compact grotesk, loaded as a 400–700 variable family with italics. It sets heavy and tight at display sizes and opens up at text sizes; the plate's labeling voice comes from tracked caps beside italic Latin, never from a second family.

### Hierarchy
- **Display** (700, clamp(2.75rem, min(1.35rem + 4.9vw, 10vh), 5.75rem), 0.95, -0.035em): The H1 only, max 11.5ch. The 10vh term keeps it inside short viewports.
- **Numeral** (700, clamp(7rem, 3.4rem + 12.5vw, 15rem), 0.76, -0.04em, lining figures): The monumental 5,0, in Deep Melanin at 92% with multiply.
- **Headline** (700, clamp(2.125rem, 1.4rem + 2.6vw, 3.75rem), 1.02, -0.03em): Stratum headings and the closing phrase, 12–19ch, balanced wrap.
- **Title** (700, clamp(1.5rem, 1.15rem + 1.1vw, 2.125rem), 1.1, -0.02em): Sub-heads within a stratum and the words set beside the 5,0.
- **Quote** (600, clamp(1.5rem, 1.05rem + 1.8vw, 2.625rem), 1.24, -0.02em): Named patient quotes. **Quote Short** (500, clamp(1.1875rem, 1rem + 0.6vw, 1.5rem), 1.3) carries unnamed review highlights.
- **Lead** (400, clamp(1.125rem, 1rem + 0.45vw, 1.3125rem), 1.5): The first paragraph under a heading, 35–38ch.
- **Body** (400, clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem), 1.55): Running text, 44–46ch, pretty wrap.
- **Caption** (400, 0.9375rem, 1.45) and **Small** (400, 0.875rem, 1.4): Figcaptions, attributions, footer blocks, phototype descriptions, always in the secondary ink.
- **Button** (600, 1.0625rem, 1.2): Pill labels; 0.9375rem in the compact and bar pills, 1.1875rem in the large pill.
- **Label** (700, 0.8125rem, 0.09em, uppercase): Stratum labels and the lamp label. **Tag** (700, 0.75rem, 0.09em, uppercase) for plate callouts and tags. **Micro** (700, 0.6875rem, 0.1em, uppercase) for the anatomical names in the gauge and the bar. **Latin** (italic 400, 0.9375rem, no tracking, lowercase) beside any label that names tissue.

Figures are tabular in the phone number, the hours and the word counts, and lining in the 5,0.

### Named Rules
**The Plate Caps Rule.** Uppercase with tracking belongs to anatomical labeling only: stratum labels, plate callouts, tags and the gauge's anatomical names. Headings, buttons and body copy are never set in caps.

**The Tightening Rule.** Tracking tightens as size grows: 0 at text sizes, -0.01em at the brand name and the owner's statement, -0.02em at titles and quotes, -0.03em at headlines, -0.035em at display, -0.04em on the numeral.

**The Hanging Quote Rule.** Opening quotation marks hang outside the text block (-0.42em indent), so the first letter, not the mark, aligns with the column.

## Layout

The page is a vertical stack of full-bleed strata. Inside each one, content sits on a 12-column grid capped at the container width, with fluid gutters and column gaps. Every stratum pads its block edges by the stratum spacing, and at desktop widths every stratum, the header and the footer pad their right edge by the gauge rail, so the depth gauge never covers content. The first viewport is at least max(100svh, 40rem) tall with its copy centered vertically; on phones the copy rises to the top and the lower part of the screen is left to the lamp.

Composition is asymmetric. Copy hangs from the left columns (the H1 block, the consultation and the reviews on columns 1–7, the visit on 1–5); figures take the right (portrait and word core on 9–12, the map plates on 7–12). Quotes step across the grid at offsets (2–10; 9–12 dropped 5rem; 5–9 dropped 3rem). Sub-blocks within a stratum separate by the interlude spacing (before the phototypes and before the closing phrase) or by 3–8.5rem fluid gaps around plates and quotes; text-to-text spacing stays within 1–2.75rem.

**Responsive behavior:**
- **≥1240px:** the live open/closed status joins the header.
- **≥1100px:** the gauge rail opens and the mobile bar disappears; the closing CTA moves beside the closing phrase (columns 9–12, bottom-aligned).
- **≤1099px:** the first-viewport and visit copy widen to 8 columns (the basal text to 9), side figures widen to 5 columns, the map and room plates drop below the visit copy at full width, and the footer reserves bottom room for the bar (its blocks go to 4 columns each).
- **≤899px:** the lamp label and its hint disappear; the lamp rests below the copy instead of beside it.
- **≤719px:** single column; the first-viewport and visit CTAs go full width; phototypes go 3-up; the header phone link hides; the stratum label shrinks to 0.75rem and drops its Latin name; the basal plate is 320px tall with three callouts instead of six.
- **Touch (no hover), 900px and up:** the lamp hint switches to the tap instruction.

### Named Rules
**The Right Rail Rule.** At 1100px and up, the right 156px belongs to the depth gauge on every stratum, the header and the footer; copy, labels and the lamp stay out of it.

**The Hanging Copy Rule.** Copy hangs from the left columns; figures, the lamp and offset quotes take the right. Text never centers on the page axis.

## Elevation & Depth

Depth is stratification, not elevation. The order of the strata is the depth; the junction line, drawn in a 64–130px band at the head of each stratum where the lower ground rises into the one above, is the cut; overlapping translucent inks multiply so crossings print darker. Strata, text and illustrations are flat. Soft umber shadows exist only under things you press or that float over the strata, plus the single map plate.

### Shadow Vocabulary
- **Pill rest** (`box-shadow: 0 14px 26px -16px rgba(46, 20, 13, 0.75)`): Primary, compact and large pills on light strata.
- **Pill hover** (`box-shadow: 0 20px 32px -18px rgba(46, 20, 13, 0.8)`): Paired with the 2px lift.
- **Floating bar** (`box-shadow: 0 18px 36px -16px rgba(46, 20, 13, 0.75)`): The mobile bar.
- **Floating disc** (`box-shadow: 0 16px 28px -14px rgba(46, 20, 13, 0.8)`): The gauge's WhatsApp disc.
- **Plate** (`box-shadow: 0 28px 44px -34px rgba(46, 20, 13, 0.6)`): The embedded map plate only.

### Named Rules
**The Flat Strata Rule.** Grounds, text and illustrations never cast shadows. Depth comes from stratum order, the junction overlap and the multiply overprint.

**The Umber Shadow Rule.** Every shadow is umber-tinted, soft and pulled in with negative spread so it pools under the object. No gray, no hard offset. Pills on umber grounds and outline pills carry none.

**The Overprint Rule.** Where translucent inks overlap they multiply: each lower band rides 8px up over the band above, inside an isolated container. Labels and tabs stay opaque so they can sit on a line.

## Shapes

The form language pairs organic anatomy with machined controls. Anatomy is drawn in curves: noise-driven junction profiles, rounded cell mosaics, tapered dendrites, lobule arcs. Controls are pills and circles. Labels reach anatomy along straight leaders.

- **Pill** (999px): every button, the stratum label, tags, the status chip, plate callouts, the mobile bar, the skip link.
- **Circle:** icon discs inside pills, the 13px gauge marker (cut out of the ruler by a 4px ring in the ground color), the 58px gauge WhatsApp disc, the portrait frame, and the recurring 0.55rem nucleus dot (the stratum-label marker with a 1.5px ring at 3px offset, the status dot, the quote pin).
- **Core** (crown twice the foot: 1.4rem over 0.7rem; 1.6rem over 0.8rem at word-core scale): any vertical sample of stacked bands.
- **Plate** (1.6rem): the map and room-photo frames; the map adds a 1.5px umber rim drawn as an overlay so it sits above the content.
- **Lines:** one 1.5px umber pen for junction lines, rims, outline-button borders, leader rules, gauge ticks, dashed slot borders and quote pins; 1px for the gauge ruler, table rules, the colophon rule, the plate's callout leaders and hover underlines (the one link underlined at rest, the arrow link, uses the 1.5px pen).
- **Focus ring** (10px corners): a 3px ring at 4px offset; pills and circles keep their own outline shape.

The favicon is the system in miniature: a circle cut through the five strata along their junction profiles, rimmed in 2px umber.

### Named Rules
**The Core Sample Rule.** Anything that shows layers in miniature is a core: a vertical capsule whose top corners are twice its bottom corners, with a 1.5px inner rim and bands stacked from the surface down, each overlapping the band above by 8px with multiply.

**The One Pen Rule.** Structure is drawn with one 1.5px umber pen. 1px is reserved for rulers, table rules and hairlines.

## Components

### Buttons
Umber pills that carry their icon in a pale disc nested at the left end.
- **Shape:** full pill (999px). The icon disc fills the pill's height minus one even inset (0.45rem on the primary), so disc and pill share a single edge gap.
- **Primary:** Melanin Umber ground, Claro label in Button type, a Claro disc holding the umber WhatsApp glyph, 3.5rem tall, pill-rest shadow. Full width on phones in the first viewport and the visit stratum.
- **Hover / Focus:** lifts 2px into the pill-hover shadow while the disc turns -10° and scales to 1.06 (0.45s); a press settles back in 0.08s. Focus is the 3px violet ring at 4px offset, following the pill. Reduced motion keeps only the color and shadow changes.
- **Compact (header):** 2.9rem tall, 0.9375rem label, 2.3rem disc. The visible label is the verb alone; the full action is kept for screen readers.
- **Large (closing CTA):** 4.4rem tall, 1.1875rem label, 3.4rem disc.
- **Outline (secondary actions: route, call):** transparent, with a 1.5px border and label in the stratum ink, an inline 1.25em line icon instead of a disc, and no shadow; on hover it lifts like the others while 9% of the ink washes across it.
- **Inverted (on umber grounds):** Claro pill, umber label, umber disc with a Claro glyph, no shadow. The bar pill is the inverted compact form (3rem tall, 2.5rem disc).

### Chips
- **Tag:** a pill in the stratum ink with the ground as its text, in Tag type: "Foto pendente", "A confirmar", and the "hoje" marker on today's row of the hours table (umber with butter text).
- **Status chip:** a pill washed with 9% umber, 0.9375rem at 600, led by a 0.55rem dot: the ink at 45% when closed, violet and pulsing (2.4s) when open. Text and state are computed live from the clinic hours in Brasília time, and today's row of the hours table turns bold. The header carries the same status without the pill at 1240px and up.

### Cores and Plates (no cards)
There are no cards. Grouped content is a core or a plate.
- **Phototype core:** six in a row (3-up on phones), clamp(11rem, 7rem + 10vw, 17.5rem) tall (9.5rem on phones), with bands in proportion 38/36/26: the skin tone with melanin dots densest toward its foot, coral with the fiber texture, butter with the lobule texture. Beneath each: a roman numeral (700, clamp(1.75rem, 1.2rem + 1.4vw, 2.5rem), -0.02em), the name (700, 1rem) and the description in Small. Cores open top-down over 1.2s, staggered 90ms apart; hover lifts a core 6px.
- **Word core:** one core whose bands are sized by count and filled with materials (tan with the microrelief texture, peach, dotted pele-2, solid melanin); a legend beside it aligns each word and count to its band with a 1.25rem leader. The core opens over 1.4s; legend rows fade in from 8px left, starting at 0.35s and 120ms apart.
- **Plate:** 1.6rem corners. The map plate adds a 1.5px umber rim and the plate shadow, and its third-party imagery is warmed with saturate(0.85) sepia(0.12).

### Navigation
- **Header:** sits over the first viewport and scrolls away with it. The brand lockup (name at 700, 1.1875rem, -0.01em over a 0.8125rem, 500 sub-line in the secondary ink), the phone number in tabular figures with a line icon (hidden at 719px and below), the live status (1240px and up), and the compact pill.
- **Depth gauge (1100px and up):** fixed in the right rail. A ruler (a 1px line with 5px ticks every 11px, at 55%) runs from 17vh below the top to 27vh above the bottom, 32px in from the edge. Five evenly spaced entries, each an anatomical name in Micro caps over its topic at 0.8125rem, right-aligned and joined to the ruler by a 0.95rem tick. The current entry is full ink with its topic bold; the others recede to 0.86 opacity, which still holds 5:1 or better against every ground beneath them. A 13px marker travels the ruler with scroll progress through the strata. Ink and ground swap to each stratum's pair over 0.6s as the middle of the viewport crosses into it. A 58px WhatsApp disc in the same pair (ink disc, ground glyph) appears at the foot of the rail once the first-viewport CTA has scrolled away, rising 16px from 0.9 scale; on hover it lifts 3px and tilts -6°.
- **Mobile bar (below 1100px):** a floating umber pill inset 0.75rem from the sides and from the safe-area bottom. On the left, the current anatomical name (Micro caps, Claro at 82%) over its topic (0.9375rem at 600, truncated with an ellipsis) and a 5.5rem by 2px progress line; on the right, the inverted bar pill. It slides up over 0.55s once the first-viewport CTA has scrolled away.
- **Footer:** the umber stratum under a calm junction: the clinic lockup (the doctor's name at 1.75rem, -0.015em), three blocks in Caption at a 1.65 line height in the secondary ink, links underlined only on hover, and a 1px colophon rule in Claro at 22%.

### Junction Lines (signature)
The only dividers. Each stratum opens with an inline SVG drawn by script at the stratum's real width (redrawn on resize and once fonts load) and lifted by its own height, so the lower ground rises into the stratum above. Five profiles, one per boundary:
- **superficie** (surface to epiderme, 96px): the skin's cut edge, gentle waves with fine furrows; overprint band in Surface Tan.
- **rete** (epiderme to basal, 120px): rete ridges, rounded crests dipping down, with a row of Claro melanin granules (1.3–2.6px) just below the line at 50%.
- **papila** (basal to derme, 120px): dermal papillae rising up, each peak holding a capillary loop, arterial red (#B8342B at 60%) up and venous blue (#3F5AA6 at 55%) down, 1.25px, multiplied. These two vessel inks exist only here.
- **lobulo** (derme to hipoderme, 130px): a run of fat-lobule arcs; overprint band in Derme Coral.
- **rodape** (hipoderme to footer, 64px): a calm double sine.

The line itself is the 1.5px umber pen (Deep Melanin over the derme) with round caps and joins. The overprint band (9px at 50%, multiplied, offset 4px below the line, in the upper stratum's color) appears only on the two light-over-light boundaries, superficie and lobulo. Each line draws in once over 2.2s as it enters the viewport; its granules fade in after 0.6s over 1.2s. Under reduced motion the line is already drawn.

### Plate Labels (signature)
- **Stratum label:** an opaque pill in the lower stratum's ground and ink, centered vertically on the junction line (its offset is measured from the line at the label's own position) and aligned to the right at the rail plus one gutter. A 0.55rem ringed nucleus dot, the name in Label caps, the Latin name in italic. It is decorative and hidden from assistive technology; the stratum's heading carries the meaning. On phones it shrinks to 0.75rem and drops the Latin name.
- **Lamp label:** caps plus Latin with a 2.75rem, 1.5px leader pointing at the light. It travels with the lamp, flips to the lamp's left before it would touch the rail, and fades in (0.8s) after the sweep. Hidden at 899px and below.
- **Plate callouts:** umber pills in Tag caps with a hairline Claro border at 30%, tied to the anatomy by 1px Claro leaders at 75% that end in a 2.6px dot.

### The Lamp (signature, first viewport)
A canvas over the surface. The surface layer is tan with soft tonal variation, a diamond microrelief of crossing furrows with lit edges, pores and fine grain. The light (150–230px radius at 900px and up, at most 118px below) reveals the basal layer seen from above, magnified 1.12x: a deeper tan (#CC8762) mosaic of keratinocytes with violet nuclei, pigment washes, and umber melanocytes whose dendrites carry granules. The light carries a warm halo, a thin umber ring at 94% of its radius and four ticks at 45°, like an examination lens. Choreography: one 2.8s sweep up from below the fold along a curve to its resting place beside the copy, then a slow drift (±34px across, ±22px vertically); it follows the pointer, easing 8.5% of the distance per frame, and moves to touch taps; it keeps clear of the copy, the header and the rail. Under reduced motion it rests in place and jumps to the pointer without easing. It paints only while on screen.

### Basal Plate (signature)
A full-bleed canvas in the basal stratum, 360–460px tall (320px on phones), its side edges fading out over 5%. Collagen in coral lies below a Claro basement membrane; above it sit a row of basal cells, flattening spinous rows and a nucleus-free stratum corneum, with melanocytes reaching up through tapered Claro dendrites and amber granule caps over each nucleus, denser near dendrite tips. Granules flow up the dendrites (three per dendrite, 8–14s per trip), only while the plate is on screen; reduced motion freezes them in place.

### Quotes
Named quotes in Quote type, with hanging marks and an attribution led by a 3rem, 1.5px rule. Unnamed highlights in Quote Short hang from a pin: a 0.55rem dot atop a 1.5px by 2.6rem line, as if suspended from the stratum above.

### Pending Slots (pre-publication only)
Where client content is still missing: a 1.5px dashed border at 55% of the ink over a 135° hatch at 8%, with a Tag naming what is missing, cut in the shape the real content will take (a circle for the portrait, a 16:7 plate for the room, a pill for the credentials line). Real content replaces the slot inside the same frame shape.

## Do's and Don'ts

### Do:
- **Do** give every new section exactly one stratum, in anatomical order from the surface down, with its ground and ink pair: Surface Tan with Melanin Umber, Epiderme Peach with Melanin Umber, Melanin Umber with Claro, Derme Coral with Deep Melanin, Hipoderme Butter with Melanin Umber.
- **Do** open each stratum with the junction profile for its boundary (superficie, rete, papila, lobulo, rodape), generated at the real width and drawn in over 2.2s with the expo-out ease.
- **Do** keep every text pairing at 4.5:1 or better on its own ground; secondary text is the ink mixed 86% toward the ground (80% in the footer).
- **Do** make buttons pills: umber pills with a Claro icon disc on light grounds, inverted Claro pills without shadow on umber, outline pills in the stratum ink for secondary actions.
- **Do** label anatomy the plate way: Label caps (0.8125rem, 700, 0.09em) with an italic Latin companion, tied to the subject by a 1.5px leader or a ringed 0.55rem dot.
- **Do** let overlapping inks multiply, each lower band riding 8px over the one above, inside an isolated container.
- **Do** keep the 156px right rail clear for the gauge at 1100px and up, and reveal floating WhatsApp controls only after the first-viewport CTA has scrolled away.
- **Do** honor reduced motion: lines arrive drawn, cores arrive open, the lamp rests, granules freeze, nothing translates; fades and color changes may stay.
- **Do** warm embedded third-party imagery (saturate 0.85, sepia 0.12) and seat it in a 1.6rem plate with a 1.5px umber rim.

### Don't:
- **Don't** divide strata with straight rules, boxes, cards or color blocks. Inside a stratum, 1px tabular rules (the hours table, the colophon) are the only straight separators.
- **Don't** use violet or amber for text, surfaces, buttons or ornament.
- **Don't** introduce pure black, pure white, neutral gray or a second ink.
- **Don't** render the butter hipoderme as gold or add marble, foil or metallic finishes; the generic luxury spa is the brand's anti-reference.
- **Don't** set a caps label above a heading as a lead-in; stratum labels live on the junction line at the right edge.
- **Don't** cast shadows from strata, text or illustrations, and never use gray or hard-offset shadows.
- **Don't** add a second typeface or set headings, buttons or body copy in caps.
- **Don't** use the Fitzpatrick ramp as section grounds or UI accents; it is data.
