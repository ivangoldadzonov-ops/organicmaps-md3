/* Organic Maps MD3 prototype — interactions. */

(function () {
  "use strict";

  const root = document.documentElement;
  const STORAGE_KEY = "om-md3-theme";
  const screens = [...document.querySelectorAll(".screen")];
  const tabs = [...document.querySelectorAll(".screen-tab")];
  const device = document.getElementById("device");
  const stage = document.getElementById("stage");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const INTERACTIVE = "button, .result-card, .setting, .chip, .quick, .fab, .icon-btn, .btn, .text-btn, .zoom, .search-bar, .alt-row";
  let frames = null;

  /* ── Map artwork injection ─────────────────────────────────── */
  const mapTemplate = document.getElementById("map-template");

  function prepareRoute(scope) {
    scope.querySelectorAll(".route__line").forEach((line) => {
      if (!line.getTotalLength) return;
      const length = line.getTotalLength();
      line.style.strokeDasharray = String(length);
      line.style.strokeDashoffset = String(length);
    });
  }

  function paintMaps(scope = document) {
    scope.querySelectorAll(".map-canvas").forEach((slot) => {
      if (slot.dataset.painted) return;
      slot.appendChild(mapTemplate.content.cloneNode(true));
      slot.dataset.painted = "1";
      prepareRoute(slot);
    });
  }
  paintMaps();

  function drawRoute(screen) {
    const line = screen && screen.querySelector('.map-canvas[data-route="on"] .route__line');
    if (!line || !line.getTotalLength) return;

    const length = line.getTotalLength();
    line.style.transition = "none";
    line.style.strokeDasharray = String(length);
    line.style.strokeDashoffset = String(length);
    void line.getBoundingClientRect();

    line.style.transition = "";
    if (motionQuery.matches) {
      line.style.strokeDashoffset = "0";
      return;
    }
    requestAnimationFrame(() => {
      line.style.strokeDashoffset = "0";
    });
  }

  /* ── Navigation indicator ───────────────────────────────────── */
  function setNavActive(name, scope = document) {
    scope.querySelectorAll(".nav-item[data-go]").forEach((item) => {
      item.classList.toggle("is-active", item.dataset.go === name);
    });
  }

  function setNavActivePerScreen(scope) {
    scope.querySelectorAll(".screen[data-screen]").forEach((screen) => {
      const name = screen.dataset.screen;
      screen.querySelectorAll(".nav-item[data-go]").forEach((item) => {
        item.classList.toggle("is-active", item.dataset.go === name);
      });
    });
  }

  function positionNavPills(scope = document) {
    scope.querySelectorAll(".nav-bar").forEach((nav) => {
      let pill = nav.querySelector(".nav-pill");
      const isNew = !pill;
      if (!pill) {
        pill = document.createElement("span");
        pill.className = "nav-pill";
        pill.setAttribute("aria-hidden", "true");
        nav.prepend(pill);
        nav.classList.add("has-pill", "nav-init");
      }

      const active = nav.querySelector(".nav-item.is-active") || nav.querySelector(".nav-item[data-go]");
      const icon = active && active.querySelector(".icon");
      if (!icon) return;

      // SVG elements do not expose offsetLeft/offsetWidth. Use client rects and
      // compensate for any CSS scale on the device / all-screens frame.
      const navRect = nav.getBoundingClientRect();
      const iconRect = icon.getBoundingClientRect();
      const scale = nav.offsetWidth ? navRect.width / nav.offsetWidth : 1;
      const x = (iconRect.left - navRect.left) / scale;
      const y = (iconRect.top - navRect.top) / scale;

      pill.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      if (isNew) {
        requestAnimationFrame(() => nav.classList.remove("nav-init"));
      }
    });
  }

  /* ── Screen routing ────────────────────────────────────────── */
  function show(name) {
    screens.forEach((s) => s.classList.toggle("is-active", s.dataset.screen === name));
    tabs.forEach((t) => {
      const on = t.dataset.screen === name;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
    });
    document.querySelectorAll(".screen.is-active .scroll-area").forEach((a) => (a.scrollTop = 0));

    setNavActive(name, device);
    requestAnimationFrame(() => positionNavPills(device));

    if (frames) {
      setNavActivePerScreen(frames);
      requestAnimationFrame(() => positionNavPills(frames));
    }

    if (history.replaceState) history.replaceState(null, "", "#" + name);

    if (name === "nav") {
      const navScreen = screens.find((s) => s.dataset.screen === "nav");
      requestAnimationFrame(() => requestAnimationFrame(() => drawRoute(navScreen)));
    }
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

  /* ── Map layers ────────────────────────────────────────────── */
  const layersBtn = document.getElementById("toggle-layers");
  const layerChips = document.getElementById("layer-chips");

  function toggleLayers(force) {
    const open = typeof force === "boolean" ? force : !layerChips.classList.contains("is-open");
    layerChips.classList.toggle("is-open", open);
    layerChips.setAttribute("aria-hidden", String(!open));
    layersBtn.classList.toggle("is-on", open);
    layersBtn.setAttribute("aria-expanded", String(open));
  }

  if (layersBtn && layerChips) {
    layersBtn.addEventListener("click", () => toggleLayers());
  }

  /* ── Bottom sheets ─────────────────────────────────────────── */
  function toggleSheet(sheet) {
    const collapsed = sheet.classList.toggle("is-collapsed");
    const handle = sheet.querySelector(".sheet__handle");
    if (handle) handle.setAttribute("aria-expanded", String(!collapsed));
  }

  function setupSheets() {
    document.querySelectorAll(".sheet[data-collapsible]").forEach((sheet) => {
      if (sheet.dataset.sheetReady) return;
      sheet.dataset.sheetReady = "1";

      const handle = sheet.querySelector(".sheet__handle");
      if (handle) {
        handle.setAttribute("role", "button");
        handle.setAttribute("tabindex", "0");
        handle.setAttribute("aria-label", "Свернуть или развернуть панель");
        handle.setAttribute("aria-expanded", "true");
        handle.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleSheet(sheet);
          }
        });
      }

      const triggers = sheet.querySelectorAll(".sheet__handle, .sheet__head, .eta");
      triggers.forEach((trigger) => {
        trigger.addEventListener("click", (e) => {
          if (e.target.closest("button")) return;
          toggleSheet(sheet);
        });
      });
    });
  }
  setupSheets();

  /* ── Material ripple ───────────────────────────────────────── */
  document.addEventListener(
    "pointerdown",
    (e) => {
      if (e.button !== 0 || motionQuery.matches) return;
      const target = e.target.closest(INTERACTIVE);
      if (!target || target.disabled || target.getAttribute("aria-disabled") === "true") return;

      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2.2;
      target.classList.add("md-ripple-host");
      if (getComputedStyle(target).position === "static") target.style.position = "relative";
      const ripple = document.createElement("span");
      ripple.className = "md-ripple";
      ripple.style.width = size + "px";
      ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left + "px";
      ripple.style.top = e.clientY - rect.top + "px";
      ripple.style.color = getComputedStyle(target).color;
      target.appendChild(ripple);

      const animation = ripple.animate(
        [
          { transform: "translate(-50%, -50%) scale(0)", opacity: 0.22 },
          { transform: "translate(-50%, -50%) scale(1)", opacity: 0 },
        ],
        { duration: 480, easing: "cubic-bezier(0.2, 0, 0, 1)" }
      );
      animation.onfinish = () => ripple.remove();
      window.setTimeout(() => ripple.remove(), 600);
    },
    { passive: true }
  );

  /* ── All screens grid ──────────────────────────────────────── */
  const allBtn = document.getElementById("toggle-all");

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
      setNavActivePerScreen(frames);
      stage.appendChild(frames);
      requestAnimationFrame(() => positionNavPills(frames));
    }

    if (frames) frames.hidden = !on;
  });

  /* ── Recalculate indicator on resize ───────────────────────── */
  let resizeFrame = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      positionNavPills(device);
      if (frames) positionNavPills(frames);
    });
  });

  /* ── Deep link ─────────────────────────────────────────────── */
  const params = new URLSearchParams(location.search);
  const initial = location.hash.replace("#", "");
  if (screens.some((s) => s.dataset.screen === initial)) {
    show(initial);
  } else {
    setNavActive("map", device);
  }

  if (["light", "dark", "system"].includes(params.get("theme"))) applyTheme(params.get("theme"));
  if (params.get("view") === "all") allBtn.click();

  requestAnimationFrame(() => positionNavPills(device));
  window.addEventListener("load", () => {
    positionNavPills(device);
    if (frames) positionNavPills(frames);
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => positionNavPills(device));
  }
})();
