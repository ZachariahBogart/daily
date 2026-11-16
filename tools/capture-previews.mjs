// Captures each shared game's landing page into previews/<id>.webp (large) and previews/<id>-thumb.webp (row thumbnail).
// Usage:  node tools/capture-previews.mjs            (every game in games.js)
//         node tools/capture-previews.mjs wordle waffle   (just these ids)
// Needs Google Chrome or Edge; set CHROME=<path to the browser exe> if it isn't in the default place.
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sandbox = { window: {} };
vm.runInNewContext(readFileSync(join(root, "games.js"), "utf8"), sandbox);
const only = process.argv.slice(2);
const games = sandbox.window.DAILY_GAMES.filter((g) => !only.length || only.includes(g.id));
if (!games.length) { console.error("No matching games."); process.exit(1); }

const browser = process.env.CHROME || [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].find(existsSync);
if (!browser) { console.error("Chrome not found; set CHROME to its path."); process.exit(1); }

const W = 1280, H = 800; // desktop landing page, cropped to the first screen
const port = 9300 + Math.floor(Math.random() * 500);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const proc = spawn(browser, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--mute-audio", `--remote-debugging-port=${port}`,
  `--user-data-dir=${mkdtempSync(join(tmpdir(), "daily-cap-"))}`, "about:blank"], { stdio: "ignore" });

try {
  let targets;
  for (let i = 0; i < 60 && !targets; i++) { await sleep(250); try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch {} }
  if (!targets) throw new Error("Chrome didn't start.");
  const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.addEventListener("open", r); ws.addEventListener("error", j); });
  let n = 0; const pending = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
  const send = (method, params = {}) => new Promise((r) => { const id = ++n; pending.set(id, r); ws.send(JSON.stringify({ id, method, params })); });

  await send("Page.enable");
  // Keep third-party ads out of the previews.
  await send("Network.enable");
  await send("Network.setBlockedURLs", { urls: ["*doubleclick.net*", "*googlesyndication.com*", "*googletagservices.com*", "*adservice.google*",
    "*amazon-adsystem.com*", "*adnxs.com*", "*taboola.com*", "*outbrain.com*", "*pubmatic.com*", "*rubiconproject.com*", "*criteo.*",
    "*moatads.com*", "*ezoic*", "*media.net*", "*adsafeprotected.com*", "*3lift.com*", "*openx.net*", "*casalemedia.com*", "*sharethrough.com*"] });
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: "light" }, { name: "prefers-reduced-motion", value: "reduce" }] });
  mkdirSync(join(root, "previews"), { recursive: true });

  const failed = [];
  for (const g of games) {
    const nav = await send("Page.navigate", { url: g.url });
    if (nav.result?.errorText) { failed.push(`${g.id} (${nav.result.errorText})`); continue; }
    await sleep(6000); // let splash screens, fonts and client-side apps settle
    for (const [suffix, scale, quality] of [["", 0.6, 72], ["-thumb", 0.15, 70]]) {
      const shot = await send("Page.captureScreenshot", { format: "webp", quality, clip: { x: 0, y: 0, width: W, height: H, scale } });
      if (!shot.result?.data) { failed.push(g.id); break; }
      writeFileSync(join(root, "previews", `${g.id}${suffix}.webp`), Buffer.from(shot.result.data, "base64"));
    }
    console.log("captured", g.id);
  }
  ws.close();
  if (failed.length) { console.error("Failed:", failed.join(", ")); process.exitCode = 1; }
} finally {
  proc.kill();
}
