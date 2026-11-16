// The shared list everyone with the link sees. Edit this file to change it.
// Each game needs: id (unique, lowercase, never change it or its streaks reset),
// name, url, and category. Categories appear as tabs in the order they first show up here.
// After adding a game, run `node tools/capture-previews.mjs <id>` to make its preview screenshots.
window.DAILY_GAMES = [
  { id: "wordle",       name: "Wordle",       url: "https://www.nytimes.com/games/wordle/",      category: "Word" },
  { id: "connections",  name: "Connections",  url: "https://www.nytimes.com/games/connections",  category: "Word" },
  { id: "strands",      name: "Strands",      url: "https://www.nytimes.com/games/strands",      category: "Word" },
  { id: "spelling-bee", name: "Spelling Bee", url: "https://www.nytimes.com/puzzles/spelling-bee", category: "Word" },
  { id: "waffle",       name: "Waffle",       url: "https://wafflegame.net/daily",               category: "Word" },
  { id: "contexto",     name: "Contexto",     url: "https://contexto.me/",                       category: "Word" },
  { id: "quordle",      name: "Quordle",      url: "https://www.merriam-webster.com/games/quordle/", category: "Word" },
  { id: "poople",       name: "Poople",       url: "https://poople.io/",                         category: "Word" },
  { id: "worldle",      name: "Worldle",      url: "https://worldle.teuteuf.fr/",                category: "Geography" },
  { id: "globle",       name: "Globle",       url: "https://globle-game.com/",                   category: "Geography" },
  { id: "travle",       name: "Travle",       url: "https://travle.earth/",                      category: "Geography" },
  { id: "queens",       name: "Queens",       url: "https://www.linkedin.com/games/queens/",     category: "Logic" },
  { id: "nerdle",       name: "Nerdle",       url: "https://nerdlegame.com/",                    category: "Logic" },
  { id: "at-what-point", name: "At What Point?", url: "https://atwhatpoint.gg/",                 category: "Logic" },
  { id: "krillion",     name: "Krillion",     url: "https://krillion.io/",                       category: "Trivia" },
  { id: "dartle",       name: "Dartle",       url: "https://dartle.net/",                        category: "Trivia" },
  { id: "peakle",       name: "Peakle",       url: "https://peakle.net/",                        category: "Trivia" },
  { id: "list-them-all", name: "List Them All", url: "https://listthemall.com/",                 category: "Trivia" },
  { id: "framed",       name: "Framed",       url: "https://framed.wtf/",                        category: "Trivia" },
  { id: "bandle",       name: "Bandle",       url: "https://bandle.app/",                        category: "Trivia" },
  { id: "costcodle",    name: "Costcodle",    url: "https://costcodle.com/",                     category: "Trivia" },
  { id: "magnitudle",   name: "Magnitudle",   url: "https://magnitudle.com/",                    category: "Estimation" },
  { id: "perceptle",    name: "Perceptle",    url: "https://perceptle.com/",                     category: "Skill" },
  { id: "skills-gauntlet", name: "Daily Skills Gauntlet", url: "https://flowstates.gg/gauntlet", category: "Skill" },
  { id: "tierdrop",     name: "TierDrop",     url: "https://www.sabcdef.com/",                   category: "Fun" }
];
