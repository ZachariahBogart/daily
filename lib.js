// Pure date/streak/url helpers. Runs in the browser (window.DailyLib) and in Node (test.js).
(function (root) {
  const pad = (n) => String(n).padStart(2, "0");

  // Local calendar day as YYYY-MM-DD, so "today" resets at the visitor's own midnight.
  const dayKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  const shift = (key, n) => {
    const [y, m, d] = key.split("-").map(Number);
    return dayKey(new Date(y, m - 1, d + n));
  };

  // The n days ending with (and including) today, oldest first.
  const lastDays = (today, n) => Array.from({ length: n }, (_, i) => shift(today, i - n + 1));

  // Consecutive played days ending today; if today isn't played yet the streak
  // still counts through yesterday, so it only breaks once a whole day is missed.
  function streak(days, today) {
    const set = new Set(days);
    let k = set.has(today) ? today : shift(today, -1);
    let s = 0;
    while (set.has(k)) { s++; k = shift(k, -1); }
    return s;
  }

  // Accepts "krillion.io" or a full link; returns a clean http(s) URL or null.
  function normalizeUrl(raw) {
    let s = String(raw == null ? "" : raw).trim();
    if (!s) return null;
    if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(s)) s = "https://" + s;
    try {
      const u = new URL(s);
      return /^https?:$/.test(u.protocol) && u.hostname.includes(".") ? u.href : null;
    } catch { return null; }
  }

  const host = (url) => {
    try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return String(url); }
  };

  // Same game regardless of "www.", letter case in the host, or a trailing slash.
  const urlKey = (url) => {
    try { const u = new URL(url); return host(url).toLowerCase() + u.pathname.replace(/\/+$/, "") + u.search; } catch { return String(url); }
  };

  const api = { dayKey, shift, lastDays, streak, normalizeUrl, host, urlKey };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.DailyLib = api;
})(this);
