---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Surface: Daily hub (index.html)

Mode: Operate. Phone-first (390px), desktop secondary. Code-led.

Audience/job: the owner (and friends with the link) opening it on a phone to see what is left today, launch the next game in one tap, and mark it played. Proof: per-game day-square history and streaks. Constraints: static HTML/CSS/JS, shared list in games.js, personal additions and history in localStorage, WCAG 2.2 AA, 44px targets, played never colour-only.

Defaults taken for open decisions: tapping Play does not mark played; krillion.io filed under Logic (owner to confirm); light/dark follows the system setting; no hide/reorder of shared games, no export, no copy-grid button.

## Direction contract

THESIS: The hub speaks the share-grid language people paste into group chats: each game is a row of day squares and today's square is the control that marks it played. It refuses the category default, a grid of icon cards with checkmarks.

OWN-WORLD: Cool paper ground #F6F7F5, ink header band #1C1D1F carrying a three-square mark (green, amber, ink). Played days in own green #2F9E57, today outlined in amber #E0A82E, empty days #DFE0DB. Flat 3px-radius squares, no shadows, hairline row rules. Figtree, heavy names, tabular figures for counts and streaks. Dark theme keeps the same greens on #141516.

STORY: The visitor sees how many games are left, taps Play, comes back, taps today's square. The row stamps green and glides into Played today; the streak ticks up; the count drops.

FIRST VIEWPORT: At 390px: sticky ink header with mark, date and "7 / 12 left"; search field; horizontally scrolling category chips with counts and "+ Add". Then rows: name, streak and a thumb-reach Play button on line one; site and 14 day squares ending in today's square on line two. Desktop: one line per game with 30 days.

FORM: Share Grid, position 1 of the ordered list (chosen as the pick card). seed:93796e4797a11b04. Signature interaction: today's square as the mark-played toggle, stamp then row reorder via view transition. Motion grammar: one stamp-and-glide moment, exponential ease-out, none under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Cited adaptations

- Phone rows are three lines (name + site, streak, Play / 14 squares) because a site name and 14 tappable squares cannot share one line at 390px.
- Light-mode today outline is #A8740F rather than #E0A82E: the brief's WCAG AA requirement needs 3:1 against the ground (3.8:1 vs 2.0:1). Dark mode keeps #E0A82E.
- Finish-review fix round: a live tally of today's squares sits in the ink band and fills as games are played; the all-played state shows a full wall of green squares; "+ Add" leads the chip row and the row fades at its right edge.
