/* Organic Maps MD3 prototype — interactions. */

(function () {
  "use strict";

  const root = document.documentElement;
  const STORAGE_KEY = "om-md3-theme";
  const screens = [...document.querySelectorAll(".screen")];
  const tabs = [...document.querySelectorAll(".screen-tab")];
  const device = document.getElementById("device");
  const stage = document.getElementById("stage");

  /* ── Map artwork injection ─────────────────────────────────── */
  const mapTemplate = document.getElementById("map-template");
  function paintMaps(scope = document) {
    scope.querySelectorAll(".map-canvas").forEach((slot) => {
      if (slot.dataset.painted) return;
      slot.appendChild(mapTemplate.content.cloneNode(true));
      slot.dataset.painted = "1";
    });
  }
  paintMaps();

  /* ── Screen routing ────────────────────────────────────────── */
  function show(name) {
    screens.forEach((s) => s.classList.toggle("is-active", s.dataset.screen === name));
    tabs.forEach((t) => {
      const on = t.dataset.screen === name;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
    });
    document.querySelectorAll(".screen.is-active .scroll-area").forEach((a) => (a.scrollTop = 0));
    if (history.replaceState) history.replaceState(null, "", "#" + name);
  }

  tabs.forEach((t) => t.addEventListener("click", () => show(t.dataset.screen)));

  document.addEventListener("click", (e) => {
    const go = e.target.closest("[data-go]");
    if (go) {
      show(go.dataset.go);
      return;
    }

    const chip = e.target.closest(".chip");
    if (chip) chip.classList.toggle("is-selected");

    const sw = e.target.closest(".switch");
    if (sw) {
      sw.classList.toggle("is-on");
      sw.setAttribute("aria-checked", String(sw.classList.contains("is-on")));
      return;
    }

    const seg = e.target.closest(".segmented > button");
    if (seg) {
      const group = seg.parentElement;
      [...group.children].forEach((b) => b.classList.toggle("is-active", b === seg));
      if (group.classList.contains("segmented--three")) {
        const mode = ["light", "dark", "system"][[...group.children].indexOf(seg)];
        applyTheme(mode);
      }
    }
  });

  /* ── Theme ─────────────────────────────────────────────────── */
  const themeBtn = document.getElementById("toggle-theme");

  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(mode, persist = true) {
    const resolved = mode === "system" ? systemTheme() : mode;
    root.dataset.theme = resolved;
    if (persist) localStorage.setItem(STORAGE_KEY, mode);

    const icon = themeBtn.querySelector("use");
    icon.setAttribute("href", resolved === "dark" ? "#i-sun" : "#i-moon");

    const group = document.querySelector(".segmented--three");
    if (group) {
      const idx = ["light", "dark", "system"].indexOf(mode);
      [...group.children].forEach((b, i) => b.classList.toggle("is-active", i === idx));
    }
  }

  themeBtn.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if ((localStorage.getItem(STORAGE_KEY) || "light") === "system") applyTheme("system", false);
  });

  applyTheme(localStorage.getItem(STORAGE_KEY) || "light", false);

  /* ── All screens grid ──────────────────────────────────────── */
  const allBtn = document.getElementById("toggle-all");
  let frames = null;

  allBtn.addEventListener("click", () => {
    const on = !document.body.classList.contains("all-screens");
    document.body.classList.toggle("all-screens", on);
    allBtn.setAttribute("aria-pressed", String(on));

    if (on && !frames) {
      frames = document.createElement("div");
      frames.className = "frames";
      screens.forEach((screen) => {
        const frame = document.createElement("div");
        frame.className = "frame";

        const holder = document.createElement("div");
        holder.className = "frame__device";
        holder.appendChild(screen.cloneNode(true));

        const label = document.createElement("span");
        label.className = "frame__label";
        label.textContent = screen.getAttribute("aria-label") || screen.dataset.screen;

        frame.append(holder, label);
        frames.appendChild(frame);
      });
      paintMaps(frames);
      stage.appendChild(frames);
    }

    if (frames) frames.hidden = !on;
  });

  /* ── Deep link ─────────────────────────────────────────────── */
  const params = new URLSearchParams(location.search);
  const initial = location.hash.replace("#", "");
  if (screens.some((s) => s.dataset.screen === initial)) show(initial);

  if (["light", "dark", "system"].includes(params.get("theme"))) applyTheme(params.get("theme"));
  if (params.get("view") === "all") allBtn.click();
})();
