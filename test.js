// Run with: node test.js
const assert = require("node:assert/strict");
const L = require("./lib.js");

const t = "2026-11-16";
assert.equal(L.shift(t, -16), "2026-10-31");
assert.equal(L.shift("2026-12-31", 1), "2027-01-01");
assert.equal(L.shift("2028-03-01", -1), "2028-02-29"); // leap year
assert.deepEqual(L.lastDays(t, 3), ["2026-11-14", "2026-11-15", "2026-11-16"]);

assert.equal(L.streak([], t), 0);
assert.equal(L.streak(["2026-11-14", "2026-11-15", "2026-11-16"], t), 3);
assert.equal(L.streak(["2026-11-14", "2026-11-15"], t), 2, "unplayed today keeps yesterday's streak");
assert.equal(L.streak(["2026-11-13", "2026-11-14"], t), 0, "a fully missed day breaks it");
assert.equal(L.streak(["2026-11-16", "2026-11-14"], t), 1);

assert.equal(L.normalizeUrl("krillion.io"), "https://krillion.io/");
assert.equal(L.normalizeUrl(" https://www.nytimes.com/games/wordle/ "), "https://www.nytimes.com/games/wordle/");
assert.equal(L.normalizeUrl("javascript:alert(1)"), null);
assert.equal(L.normalizeUrl("ftp://x.com"), null);
assert.equal(L.normalizeUrl("notaurl"), null);
assert.equal(L.normalizeUrl(""), null);
assert.equal(L.host("https://www.nytimes.com/games/wordle/"), "nytimes.com");
assert.equal(L.urlKey("https://www.nytimes.com/games/strands"), L.urlKey(L.normalizeUrl("nytimes.com/games/strands/")));
assert.notEqual(L.urlKey("https://nytimes.com/games/strands"), L.urlKey("https://nytimes.com/games/wordle"));

console.log("all tests passed");
