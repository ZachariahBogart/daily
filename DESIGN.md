---
name: Daily
description: A phone-first daily-games hub that speaks the share-grid language of day squares.
colors:
  ground: "#F6F7F5"
  surface: "#FFFFFF"
  ink: "#1C1D1F"
  ink-2: "#505258"
  rule: "#E3E4DF"
  rule-strong: "#BFC1BB"
  empty: "#DFE0DB"
  green: "#2F9E57"
  green-ink: "#1E7A3F"
  today: "#A8740F"
  danger: "#B3261E"
  band: "#1C1D1F"
  band-2: "#2A2B2E"
  on-band: "#F6F7F5"
  on-band-2: "#B4B6BB"
  amber: "#E0A82E"
typography:
  brand:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 800
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.45
    fontFeature: "tnum"
  section:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 800
  action:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
  label:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
  meta:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
  tag:
    fontFamily: "Figtree, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 800
    letterSpacing: "0.04em"
rounded:
  tally: "2px"
  square: "3px"
  tag: "4px"
  control: "8px"
  field: "10px"
  panel: "12px"
  sheet: "14px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "32px"
components:
  button-play:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.section}"
    rounded: "{rounded.control}"
    padding: "0 14px 0 16px"
    height: "44px"
  button-play-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    height: "44px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.rule}"
  button-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "44px"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "#FFFFFF"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "44px"
  chip:
    backgroundColor: "{colors.band-2}"
    textColor: "{colors.on-band}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "36px"
  chip-active:
    backgroundColor: "{colors.on-band}"
    textColor: "{colors.band}"
  input-search:
    backgroundColor: "{colors.band-2}"
    textColor: "{colors.on-band}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "0 14px"
    height: "44px"
  input-field:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "44px"
  day-square:
    backgroundColor: "{colors.empty}"
    rounded: "{rounded.square}"
  day-square-played:
    backgroundColor: "{colors.green}"
    rounded: "{rounded.square}"
  today-square:
    backgroundColor: "transparent"
    rounded: "{rounded.square}"
  today-square-played:
    backgroundColor: "{colors.green}"
    textColor: "#FFFFFF"
    rounded: "{rounded.square}"
  sheet:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sheet}"
    padding: "18px"
  notice:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.field}"
    padding: "12px 14px"
---

# Design System: Daily

## Overview

**Creative North Star: "The Share Grid"**

Daily borrows the one visual language its users already trade every morning: rows of little coloured squares pasted into a group chat. Every game is a row; every day is a square; today's square is the control. The page is a ledger of those rows under a sticky ink band, on cool paper, with nothing decorative competing with the grid.

The system is flat, dense and tabular. Depth comes only from the ink band against the paper ground and from hairline rules between rows; there is no elevation. Colour is almost entirely neutral until a game is played, and then green does all the talking. Type is one family, Figtree, worked hard: heavy 800 names and figures against a plain 400 body, with tabular numerals everywhere so counts and streaks never jitter.

Motion is a single moment: a square stamps (scales down from 1.45 into place), then the row glides to its new group through a view transition on an exponential ease-out. Under reduced motion all of it is off.

**Key Characteristics:**
- Day squares are the primary visual unit and the primary control.
- One sticky ink band carries brand, date, the remaining-count, today's tally, search and category chips.
- Flat surfaces, hairline rules, no shadows for depth.
- Green means played, amber/ochre means today, grey means empty. Nothing else is coloured.
- Light and dark follow the system setting; the band keeps its own dark palette in both.

## Colors

Cool paper and graphite neutrals with exactly two signal hues: share green for played and ochre-amber for today.

### Primary
- **Share Green** (green): every played square (history, today, tally, the all-played wall) and text selection. Unchanged in dark mode.
- **Deep Share Green** (green-ink): green as text, where the fill green would fail contrast: the "yours" tag and the all-played headline. Lightens to #5FCB86 in dark mode.

### Secondary
- **Today Ochre** (today): the 2px outline on today's unplayed square, the warning-notice border and the demo square in the first-run hint. #A8740F in light mode for 3:1 against paper; #E0A82E in dark mode.
- **Band Amber** (amber): amber on the ink band only: the large remaining-count figure, the band's focus ring and the search field's focus outline.

### Tertiary
- **Alarm Red** (danger): the Remove confirmation button and form errors only. #E5574D in dark mode.

### Neutral
- **Cool Paper** (ground): page background; also the fill of form inputs. #141516 in dark mode.
- **White Sheet** (surface): notices, the add/edit sheet and the all-played panel. #1C1D20 in dark mode.
- **Ink** (ink): body text, game names, streak figures, solid Play and Save buttons. #ECEDEA in dark mode (the solid buttons invert with it).
- **Graphite** (ink-2): secondary text: site names, counts, played-game names, streak units. #A7A9AE in dark mode.
- **Hairline** (rule): row dividers, sheet borders, the hover fill of outline buttons. #2A2C30 in dark mode.
- **Strong Hairline** (rule-strong): 1.5px rings on outline buttons and input borders; scrollbar thumb. #4A4C52 in dark mode.
- **Empty Square** (empty): unplayed past days. #2E3034 in dark mode.
- **Ink Band** (band) / **Band Raised** (band-2): the sticky header and its raised controls (search field, chips). #26272A / #36373B in dark mode.
- **On Band** (on-band) / **On Band Muted** (on-band-2): primary and secondary text on the band; on-band is also the pressed-chip fill.

### Named Rules
**The Green Means Played Rule.** Green appears only where something has been played (or text is selected). Never use it for a link, a button, a heading or decoration.

**The Two Signals Rule.** Only green and today's ochre/amber carry meaning in the list. Everything else is ink, graphite or paper.

**The Band Keeps Its Palette Rule.** The ink band is dark in both themes and uses its own band, band-2, on-band, on-band-2 and amber tokens; never put ground-palette tokens on it.

## Typography

**Display Font:** Figtree (self-hosted variable, weights 400 to 800, with system-ui, sans-serif fallback)
**Body Font:** Figtree
**Label/Mono Font:** none; tabular numerals (`font-variant-numeric: tabular-nums`) are set on the body for the whole page.

**Character:** A friendly geometric sans pushed to 800 for names and figures, so each row reads as a bold name and a bold number with quiet support text between.

### Hierarchy
- **Brand** (800, 22px, -0.01em): the "Daily" wordmark in the band. The remaining-count figure uses the same size and weight in amber.
- **Title** (800, 19px, 1.25, -0.01em): game names; also sheet headings and streak figures.
- **Body** (400, 16px, 1.45): default text and all input text (16px keeps phone browsers from zooming).
- **Section** (800, 15px): group headings ("To play", "Played today") with a 400 graphite count; the Play button label.
- **Action** (600, 15px): outline, solid and danger buttons; the ghost "Again" button.
- **Label** (600, 14px): chips, form labels, errors; notices, dates and detail rows use 14px at 400.
- **Meta** (400, 13px): site host and the streak unit ("days").
- **Tag** (800, 11px, 0.04em): the small outlined "yours" badge on a visitor's own games. Lowercase.

### Named Rules
**The Heavy Name, Heavy Number Rule.** Names and figures are 800; everything that explains them is 400 or 600 at a smaller size. Don't introduce intermediate display weights.

**The Tabular Figures Rule.** All numerals are tabular, so counts and streaks keep their width as they change.

## Layout

A single centred column (max 1080px) with 16px side padding on phones and 32px from 860px up. The header is a sticky ink band containing three stacked rows: brand, date and remaining-count with today's tally squares beneath; a full-width search field; a horizontally scrolling chip row whose right edge fades out (40px mask) to signal more.

Below the band, games are an unboxed list separated by 1px hairlines, grouped under "To play" and "Played today" headings (26px above, 2px below).

- **Phone row (default):** a three-column grid: name and site on the left, streak right-aligned, Play button at the thumb edge; below it the day squares span the full width as 14 equal columns (13 past days plus today's square); an expanded row shows details on a third line and opens the squares to 30 days in 15 columns. Gaps 12px vertical, 14px horizontal; 14px top and 16px bottom padding.
- **Wide row (860px and up):** one line per game: name (170 to 230px), 30 day squares (max 560px), streak (84px), Play (116px, centred label); gap 8px by 28px; 12px vertical padding.
- **Rhythm:** a small-step scale (4, 8, 12, 16, 32px) with 6, 10, 14 and 18px used inside controls. Square grids always gap 4px.

## Elevation & Depth

Flat. No surface casts a shadow. Depth is conveyed by the ink band against the paper ground, by white sheets with a 1px hairline border, and by hairline row rules. `box-shadow` appears only as an inset ring standing in for a border (outline buttons, the add chip, today's square), never as elevation.

### Named Rules
**The Ink Band Is The Only Layer Rule.** The sticky band is the one thing that sits above the content. Sheets and notices stay in the page flow with a hairline, not a shadow.

## Shapes

Small squares are the form language. Day squares have barely-rounded 3px corners and hold an exact 1:1 aspect; the band tally uses 2px and the all-played wall 4px. Controls round to 8px, fields and notices to 10px, panels to 12 to 14px. The only full pill is the category chip. Borders are 1px hairlines for containers and 1.5px for interactive outlines; today's square uses a 2px inset ring. Icons are 18px line icons (2.25 stroke, round caps and joins), 16px inside buttons and chips.

## Components

### Buttons
Compact and firm: 44px tall, 8px corners, label plus optional 16px line icon.
- **Play (primary):** solid ink with paper text, 800 weight, 16px left / 14px right padding, trailing "opens elsewhere" icon. Hover drops to 88% opacity.
- **Again (ghost Play):** shown once a game is played: transparent with a 1.5px strong-hairline inset ring, 600 weight. Hover fills with hairline.
- **Outline (secondary):** same ring treatment, 16px padding; Cancel, Edit, Remove, Keep it.
- **Solid:** ink fill with paper text; Save game and Add a game.
- **Danger:** alarm-red fill with white text; only the confirming Remove.
- **Focus:** 2px ink outline, 2px offset (amber on the band).

### Chips
- **Style:** 36px pills on the band, band-raised fill, on-band text at 600 with a 400 muted count.
- **State:** pressed chip inverts to an on-band fill with ink text; hover (pointer devices) lifts the fill slightly. Colour transitions take 0.2s.
- **Add chip:** leads the row; transparent with a 1.5px grey inset ring and a plus icon.

### Cards / Containers
- **Corner Style:** 10px (notice), 12px (all-played panel), 14px (sheet).
- **Background:** white sheet (surface) on cool paper.
- **Shadow Strategy:** none; see Elevation & Depth.
- **Border:** 1px hairline; a warning notice swaps the border to today ochre.
- **Internal Padding:** 12 by 14px (notice), 16px (panel), 18px with a 12px gap (sheet).

### Inputs / Fields
- **Search (on band):** 44px, band-raised fill, 10px corners, leading search icon, on-band text, muted placeholder. Focus draws a 2px amber outline on the whole field.
- **Form field (sheet):** 44px, cool-paper fill, 1.5px strong-hairline border, 8px corners, 14px/600 label stacked 6px above. Focus adds a 2px ink outline (1px offset) and darkens the border to ink.
- **Error:** alarm-red 14px/600 text below the fields, hidden when empty.

### Navigation
The category chip row is the only navigation: one pressed chip at a time ("All" plus each category, each with a count), scrolling horizontally with a hidden scrollbar and a faded right edge.

### Day Squares (signature)
The row's history: past days are empty-grey or green 1:1 squares with 3px corners, in equal columns with a 4px gap. Today's square is the last in the row and is a real button: unplayed it is a transparent square with a 2px today-ochre inset ring; played it fills green with a white check icon (72% of the square, 3px stroke). Its hit area extends 11px each side (14px on wide screens) to reach 44px. Played state is announced by `aria-pressed`, never colour alone. Hovering an unplayed today square tints it with 18% ochre.

### Stamp and Glide (signature motion)
Marking played scales the square from 1.45 to 1 over 0.42s on the system ease, then the row moves between groups through a 0.45s view transition. The band tally's newest square stamps at the same time. When everything is played, a wall of 28px green squares fills in with a 45ms stagger (0.5s each). Reduced motion removes all animation and transitions.

### Today Tally
A single row of squares (up to 12px, shrinking as the list grows so it never wraps; 2px corners, 3px gap) under the band's top line, one per game, filling green from the left as games are played. Decorative (`aria-hidden`); the remaining-count text carries the meaning.

### Site Previews
Each shared game shows a 16:10 screenshot of its landing page (top-anchored, `object-fit: cover`, 1px rule border, `--empty` behind it). In the row it is a thumbnail in its own leading column: 56px wide on phones and 88px from 860px up, with an 8px radius. It repeats the name button (`tabindex="-1"`, `aria-hidden`) and drops to 60% opacity once the game is played. When a row opens, a large preview (10px radius, at most 560px wide) leads the details and links to the game. From 860px up it sits left of the link, category and actions. Games without a screenshot (your own additions, or a failed load) get a monogram tile: the first letter in 19px/800 `--ink-2` on `--empty`, and no large preview. Screenshots come from `tools/capture-previews.mjs`, never from a runtime service.

## Do's and Don'ts

### Do:
- **Do** make every game a row ending in today's square, and make that square the mark-played control.
- **Do** keep every tap target at least 44px, extending small squares with an invisible hit area rather than enlarging them.
- **Do** pair every played state with a non-colour signal: `aria-pressed`, a check icon, an "Again" label, or screen-reader text.
- **Do** use 800 weight for names and figures and tabular numerals for every count.
- **Do** use #A8740F for today's outline on the light ground and #E0A82E on dark surfaces and the band.
- **Do** keep motion to the stamp-and-glide moment on the cubic-bezier(0.16, 1, 0.3, 1) ease, and turn it off under reduced motion.

### Don't:
- **Don't** present games as a grid of icon cards with checkmarks; the row of squares is the system.
- **Don't** add drop shadows or elevated cards; containers are flat with a hairline.
- **Don't** use green for anything other than played (and selection).
- **Don't** use other games' logos or trademarks as decoration.
- **Don't** put ground-palette tokens on the ink band, or band tokens on the paper.
