(() => {
  const L = window.DailyLib;
  const KEY = "daily.v1";
  const DAYS = 30;
  const ALL = "All";

  const $ = (id) => document.getElementById(id);
  const els = { date: $("date"), left: $("left"), tally: $("tally"), chips: $("chips"), list: $("list"), notices: $("notices"),
    form: $("form"), formTitle: $("form-title"), formErr: $("form-err"), cats: $("cats"), q: $("q") };

  let today = L.dayKey(new Date());
  let tab = ALL, query = "", openId = null, editing = null, confirmId = null, stampId = null;
  let storageOk = true;
  const state = load();

  // ---------- storage ----------
  function load() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem(KEY)); } catch { storageOk = false; }
    const added = Array.isArray(s && s.added) ? s.added.filter((g) =>
      g && typeof g.id === "string" && typeof g.name === "string" && L.normalizeUrl(g.url)) : [];
    const played = s && s.played && typeof s.played === "object" ? s.played : {};
    // shared games this browser removed; adding the same link again brings them back
    const removed = Array.isArray(s && s.removed) ? s.removed.filter((id) => typeof id === "string") : [];
    return { added, played, removed };
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); storageOk = true; }
    catch { storageOk = false; }
  }
  try { localStorage.setItem(KEY + ".probe", "1"); localStorage.removeItem(KEY + ".probe"); } catch { storageOk = false; }

  // ---------- helpers ----------
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else if (k === "class") el.className = v;
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const kid of kids.flat()) if (kid != null && kid !== false) el.append(kid.nodeType ? kid : String(kid));
    return el;
  }
  const ICONS = {
    out: '<path d="M14 5h5v5M19 5l-8 8M17 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
  };
  function icon(name) {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("aria-hidden", "true"); s.setAttribute("class", "ico");
    s.innerHTML = ICONS[name];
    return s;
  }
  const fmtDay = (key, opts) => {
    const [y, m, d] = key.split("-").map(Number);
    return new Intl.DateTimeFormat(undefined, opts).format(new Date(y, m - 1, d));
  };
  const vtName = (id) => "g-" + id.replace(/[^a-z0-9-]/gi, "-");
  const shared = () => (window.DAILY_GAMES || []).map((g) => ({ ...g, shared: true }));
  const games = () => [
    ...shared().filter((g) => !state.removed.includes(g.id)),
    ...state.added.map((g) => ({ ...g, shared: false })),
  ];
  const removedGames = () => shared().filter((g) => state.removed.includes(g.id));
  const playedToday = (id) => (state.played[id] || []).includes(today);
  const categories = (list) => [...new Set(list.map((g) => g.category || "Other"))];
  const matches = (g) => {
    if (tab !== ALL && (g.category || "Other") !== tab) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return g.name.toLowerCase().includes(q) || L.host(g.url).toLowerCase().includes(q);
  };

  // ---------- actions ----------
  function toggle(id) {
    const days = new Set(state.played[id] || []);
    days.has(today) ? days.delete(today) : days.add(today);
    const oldest = L.shift(today, -400); // keep a year+ of history, drop the rest
    state.played[id] = [...days].filter((k) => k >= oldest).sort();
    stampId = days.has(today) ? id : null;
    save();
    const go = () => render(`[data-toggle="${id}"]`, true);
    if (document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.startViewTransition(go);
    } else go();
  }

  function remove(g) {
    if (g.shared) { if (!state.removed.includes(g.id)) state.removed.push(g.id); }
    else state.added = state.added.filter((x) => x.id !== g.id);
    delete state.played[g.id];
    save(); openId = null; confirmId = null;
    render("#q");
  }

  function openForm(game, presetName) {
    editing = game ? game.id : "new";
    const f = els.form;
    els.formTitle.textContent = game ? `Edit ${game.name}` : "Add a game";
    f.name.value = game ? game.name : presetName || "";
    f.url.value = game ? game.url : "";
    f.category.value = game ? game.category : tab !== ALL ? tab : "";
    els.formErr.textContent = "";
    f.hidden = false;
    f.scrollIntoView({ block: "nearest" });
    f.name.focus();
  }
  function closeForm() { editing = null; els.form.hidden = true; }

  els.form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = els.form;
    const name = f.name.value.trim();
    const url = L.normalizeUrl(f.url.value);
    const category = f.category.value.trim().slice(0, 24) || "Other";
    let err = "";
    if (!name) err = "Give the game a name.";
    else if (!url) err = "That link doesn't look like a web address. Try something like krillion.io.";
    else if (games().some((g) => L.urlKey(g.url) === L.urlKey(url) && g.id !== editing)) err = "That game is already on your list.";
    if (err) { els.formErr.textContent = err; (name ? f.url : f.name).focus(); return; }

    let id = editing;
    const back = editing === "new" && removedGames().find((g) => L.urlKey(g.url) === L.urlKey(url));
    if (back) {
      // a shared game this browser removed earlier: restore it rather than adding a copy
      id = back.id;
      state.removed = state.removed.filter((x) => x !== id);
    } else if (editing === "new") {
      id = "u" + Date.now().toString(36);
      state.added.push({ id, name, url, category });
    } else {
      Object.assign(state.added.find((g) => g.id === editing), { name, url, category });
    }
    save();
    closeForm();
    tab = ALL; query = ""; els.q.value = ""; openId = null;
    render(`[data-open="${id}"]`);
  });
  $("cancel").addEventListener("click", () => { const back = editing; closeForm(); render(back && back !== "new" ? `[data-open="${back}"]` : "#q"); });
  els.form.addEventListener("keydown", (e) => { if (e.key === "Escape") $("cancel").click(); });

  els.q.addEventListener("input", () => { query = els.q.value.trim(); render(); });

  // ---------- render ----------
  function render(focusSel, keepScroll) {
    const all = games();
    const cats = categories(all);
    if (tab !== ALL && !cats.includes(tab)) tab = ALL;

    // header
    els.date.textContent = fmtDay(today, { weekday: "short", day: "numeric", month: "short" });
    const left = all.filter((g) => !playedToday(g.id)).length;
    els.left.replaceChildren(left
      ? h("span", {}, h("b", {}, left), ` / ${all.length} left`)
      : h("span", {}, "All ", h("b", {}, all.length), " played"));
    // today's share grid: one square per game, filling left to right as games are played
    const playedN = all.length - left;
    els.tally.replaceChildren(...all.map((_, i) =>
      h("i", { class: (i < playedN ? "on" : "") + (stampId && i === playedN - 1 ? " stamp" : "") })));

    // chips
    els.chips.replaceChildren(
      h("button", { type: "button", class: "chip add", "data-chip": "+", onclick: () => openForm(null) }, icon("plus"), "Add"),
      ...[ALL, ...cats].map((c) => {
        const n = c === ALL ? all.length : all.filter((g) => (g.category || "Other") === c).length;
        return h("button", { type: "button", class: "chip", "aria-pressed": String(tab === c), "data-chip": c,
          onclick: () => { tab = c; openId = null; render(`[data-chip="${CSS.escape(c)}"]`); } }, c, h("span", { class: "n" }, n));
      }),
    );
    els.cats.replaceChildren(...cats.map((c) => h("option", { value: c })));

    // notices
    const noHistory = !Object.values(state.played).some((d) => d.length);
    els.notices.replaceChildren(
      storageOk ? "" : h("p", { class: "notice warn" }, "This browser isn't letting Daily save, so streaks and added games will be lost when you close it."),
      noHistory ? h("p", { class: "notice" }, "After you play, tap today's square ", h("span", { class: "demo", "aria-hidden": "true" }), " at the end of the row to start a streak.") : "",
    );

    // list
    const shown = all.filter(matches);
    const todo = shown.filter((g) => !playedToday(g.id));
    const done = shown.filter((g) => playedToday(g.id));
    const parts = [];
    if (!shown.length) {
      parts.push(h("div", { class: "empty" },
        h("p", {}, query ? `No games match “${query}”${tab !== ALL ? ` in ${tab}` : ""}.` : "No games in this category yet."),
        h("div", { class: "actions" },
          query && tab !== ALL ? h("button", { type: "button", class: "btn", onclick: () => { tab = ALL; render(); } }, "Search all categories") : "",
          h("button", { type: "button", class: "btn solid", onclick: () => openForm(null, query) }, icon("plus"), query ? `Add “${query}”` : "Add a game"))));
    } else {
      if (todo.length) parts.push(section("To play", todo));
      else if (!query && tab === ALL) parts.push(h("div", { class: "alldone" },
        h("div", { class: "wall", "aria-hidden": "true" }, all.map((_, i) => h("i", { style: `--i:${i}` }))),
        h("p", {}, h("b", {}, `All ${all.length} played.`), " New day, new squares at midnight.")));
      if (done.length) parts.push(section("Played today", done));
    }
    els.list.replaceChildren(...parts);

    stampId = null;
    if (focusSel) { const el = document.querySelector(focusSel); if (el) el.focus({ preventScroll: !!keepScroll }); }
  }

  function section(title, list) {
    return h("section", { class: "group" },
      h("h2", {}, title, h("span", { class: "n" }, list.length)),
      h("ul", { class: "games" }, list.map(row)));
  }

  // Landing-page screenshots live in previews/ (made by tools/capture-previews.mjs) for shared games only.
  function shot(g, thumb) {
    const mono = () => h("span", { class: "mono" }, g.name.trim().charAt(0).toUpperCase());
    if (!g.shared) return thumb ? mono() : null;
    const img = h("img", { src: `previews/${encodeURIComponent(g.id)}${thumb ? "-thumb" : ""}.webp`, alt: thumb ? "" : `The ${g.name} home page`,
      width: thumb ? 192 : 768, height: thumb ? 120 : 480, loading: thumb ? "lazy" : "eager", decoding: "async" });
    img.addEventListener("error", () => { if (thumb) img.replaceWith(mono()); else img.closest(".shot")?.remove(); });
    return img;
  }
  const toggleOpen = (g, open) => { openId = open ? null : g.id; confirmId = null; render(`[data-open="${g.id}"]`); };

  function row(g) {
    const days = state.played[g.id] || [];
    const set = new Set(days);
    const keys = L.lastDays(today, DAYS);
    const done = set.has(today);
    const s = L.streak(days, today);
    const open = openId === g.id;
    const count = keys.filter((k) => set.has(k)).length;
    const did = "d-" + vtName(g.id);

    return h("li", { class: `game${done ? " done" : ""}${open ? " open" : ""}`, style: `view-transition-name:${vtName(g.id)}` },
      // the thumbnail repeats the name button for pointer users, so it stays out of the tab order
      h("button", { type: "button", class: "thumb", tabindex: "-1", "aria-hidden": "true", onclick: () => toggleOpen(g, open) }, shot(g, true)),
      h("div", { class: "who" },
        h("button", { type: "button", class: "name", "aria-expanded": String(open), "aria-controls": did, "data-open": g.id,
          onclick: () => toggleOpen(g, open) },
          g.name, done ? h("span", { class: "sr" }, " (played today)") : ""),
        h("span", { class: "site" }, L.host(g.url), g.shared ? "" : h("span", { class: "tag" }, "yours"))),
      h("p", { class: `streak${s ? "" : " zero"}` }, h("b", {}, s), s === 1 ? " day" : " days", h("span", { class: "sr" }, " streak")),
      h("a", { class: `play${done ? " ghost" : ""}`, href: g.url, target: "_blank", rel: "noopener noreferrer" },
        done ? "Again" : "Play", icon("out"), h("span", { class: "sr" }, ` ${g.name} (opens in a new tab)`)),
      h("div", { class: "days" },
        h("span", { class: "sr" }, `Played ${count} of the last ${DAYS} days.`),
        h("span", { class: "past", "aria-hidden": "true" },
          keys.slice(0, -1).map((k) => h("i", { class: set.has(k) ? "on" : "", title: `${fmtDay(k, { weekday: "short", day: "numeric", month: "short" })}${set.has(k) ? " · played" : ""}` }))),
        h("button", { type: "button", class: `today${done ? " on" : ""}${stampId === g.id ? " stamp" : ""}`, "aria-pressed": String(done),
          "aria-label": `Played ${g.name} today`, title: done ? "Played today · tap to undo" : "Tap when you've played today",
          "data-toggle": g.id, onclick: () => toggle(g.id) }, icon("check"))),
      open ? details(g, did) : "");
  }

  function details(g, did) {
    const asking = confirmId === g.id;
    const big = shot(g, false);
    return h("div", { class: `more${big ? " with-shot" : ""}`, id: did },
      big ? h("a", { class: "shot", href: g.url, target: "_blank", rel: "noopener noreferrer" }, big, h("span", { class: "sr" }, " (opens in a new tab)")) : "",
      h("a", { class: "url", href: g.url, target: "_blank", rel: "noopener noreferrer" }, g.url),
      h("span", { class: "cat" }, g.category || "Other"),
      h("div", { class: "actions" },
        asking
          ? [h("span", { class: "ask" }, `Remove ${g.name} and its streak from your list?`),
             h("button", { type: "button", class: "btn danger", "data-rm": g.id, onclick: () => remove(g) }, "Remove"),
             h("button", { type: "button", class: "btn", "data-keep": g.id, onclick: () => { confirmId = null; render(`[data-open="${g.id}"]`); } }, "Keep it")]
          : [g.shared ? "" : h("button", { type: "button", class: "btn", onclick: () => openForm(g) }, "Edit"),
             h("button", { type: "button", class: "btn", "data-ask": g.id, onclick: () => { confirmId = g.id; render(`[data-keep="${g.id}"]`); } }, "Remove")]));
  }

  // ---------- day rollover ----------
  function checkDay() {
    const k = L.dayKey(new Date());
    if (k !== today) { today = k; render(); }
  }
  document.addEventListener("visibilitychange", () => { if (!document.hidden) checkDay(); });
  window.addEventListener("focus", checkDay);
  setInterval(checkDay, 60_000);

  render();
})();
