# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: static HTML, CSS and vanilla JS with no build step. The game list ships as a plain data file in the repo; personal additions and play history live in the visitor's browser (localStorage). Chosen because it is a small personal site on free static hosting with no server, and a data file is the easiest thing for the owner to edit.

Hosting: a free static host (GitHub Pages, Netlify or similar) with a public URL.

## Users

- **Owner (primary):** opens the site whenever they want to play their daily browser games, often several in a row, to launch the next one and see what is left today.
- **Friends with the link (secondary):** people the owner shares the URL with. They see the owner's shared list and can keep their own additions and play history in their own browser.

## Product Purpose

A personal hub for daily web games (Wordle, krillion.io and similar). It stores the links, groups them by category, and gets you into today's game fast. Success: opening the site, seeing what is still unplayed today, and launching a game takes seconds, and coming back the next day feels like a ritual worth keeping.

## Positioning

It is the owner's own curated daily-games shelf with memory: it knows what you played today and how long each streak has run, which a bookmarks folder or a generic "daily games" directory cannot do.

## Operating Context

- Used in short bursts, often once or twice a day. **Phone is the primary device** (the owner plays most daily games on mobile); desktop is secondary.
- Games open on their own sites; this hub links out and does not embed them.
- A day resets at the visitor's local midnight.

## Capabilities and Constraints

- **List:** every game has a name, a URL and one category. The shared list is a data file the owner edits in the repo.
- **Views:** the whole list, or one category at a time.
- **Search:** filter games by name or site.
- **Personal additions:** any visitor can add their own games in the page; they are stored only in that browser and are not shared with anyone.
- **Removing games:** any visitor can remove any game from their own list (Remove in its details, then a confirm step). That deletes it and its streak on that browser only; the shared list and everyone else's lists are unchanged. Adding a removed shared game's link again with + Add brings it back from the shared list.
- **Daily state:** mark a game played today; it clears at local midnight. Each game keeps a streak of consecutive days played.
- **No accounts, no server, no sync across devices.** Clearing browser data loses personal additions and streaks.
- **Undecided:** whether visitors can reorder games; whether personal additions can be exported/imported.

## Evidence on Hand

- Confirmed games: Wordle, krillion.io.
- The rest of the starter list is to be authored as a realistic set of popular daily games across categories, for the owner to prune. The owner will supply more games to add after the first build.
- Landing-page screenshots of each shared game live in `previews/`, captured with ads blocked by `tools/capture-previews.mjs` (first captured 2026-11-16). They appear only as previews of the linked site. Don't use other games' logos or trademarks as decoration elsewhere.
- Games visitors add themselves have no screenshot (there is no server to capture one); they show a letter tile instead.

## Product Principles

1. **Today first.** What is left to play today outranks everything else on screen.
2. **One tap to play.** Launching a game is never more than one action away from arrival.
3. **Memory without accounts.** Streaks and additions persist locally and never ask anyone to sign in.
4. **The list is the owner's.** The shared list reflects one person's taste; visitors add to their copy, never to it.

## Accessibility & Inclusion

WCAG 2.2 AA. Played/unplayed state must not rely on color alone; full keyboard use; respects reduced motion.
