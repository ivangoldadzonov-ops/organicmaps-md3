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

  /* ── Localization ──────────────────────────────────────────── */
  const translations = {
    en: {
      "meta.title": "Organic Maps — Material Design 3 concept",
      "meta.desc": "Organic Maps redesign concept built with Material Design 3: five screens, light and dark themes, interactive prototype.",
      "tabs.map": "Map",
      "tabs.nav": "Navigation",
      "tabs.search": "Search",
      "tabs.place": "Place",
      "tabs.settings": "Settings",
      "topbar.lang": "Language",
      "topbar.themeTitle": "Light / dark theme",
      "topbar.themeAria": "Switch theme",
      "topbar.allTitle": "All screens",
      "topbar.allAria": "Show all screens",
      "map.searchPlaceholder": "Search places and addresses",
      "map.layersTitle": "Map layers",
      "map.layersAria": "Map layers",
      "map.orientTitle": "Map orientation",
      "map.orientAria": "Map orientation",
      "map.locateTitle": "My location",
      "map.locateAria": "My location",
      "map.zoomIn": "Zoom in",
      "map.zoomOut": "Zoom out",
      "layers.terrain": "Terrain",
      "layers.bike": "Bike lanes",
      "layers.subway": "Subway",
      "cat.food": "Food",
      "cat.cafes": "Cafes",
      "cat.fuel": "Fuel",
      "cat.hotels": "Hotels",
      "nearby.coffeeName": "Coffeemania",
      "nav.label": "Main navigation",
      "navTab.map": "Map",
      "navTab.search": "Search",
      "navTab.route": "Route",
      "navTab.saved": "Saved",
      "navTab.more": "More",
      "nav.maneuverDistance": "In 200 m",
      "nav.maneuverInstruction": "turn right onto Tverskaya St",
      "nav.then": "then",
      "nav.soundAria": "Navigation sound",
      "nav.speed": "47<span>km/h</span>",
      "nav.etaValue": "12 min",
      "nav.etaSub": "4.2 km · arrive at 9:53",
      "nav.endAria": "End route",
      "nav.modeCar": "Car",
      "nav.modeBike": "Bike",
      "nav.modeWalk": "Walk",
      "nav.modeTransit": "Transit",
      "nav.alt1km": "4.2 km",
      "nav.alt1min": "12 min",
      "nav.alt1tag": "no traffic",
      "nav.alt2km": "5.6 km",
      "nav.alt2min": "17 min",
      "nav.alt2tag": "via center",
      "nav.alt3km": "3.9 km",
      "nav.alt3min": "19 min",
      "nav.alt3tag": "traffic",
      "nav.offline": "Offline map",
      "nav.share": "Share",
      "search.backAria": "Back",
      "search.queryAria": "Search query",
      "search.clearAria": "Clear",
      "search.value": "coffee",
      "search.chipOpen": "Open now",
      "search.chipNearby": "Nearby",
      "search.chipWifi": "Wi-Fi",
      "search.chipCards": "Card payment",
      "search.best": "Best result",
      "search.more14": "14 more places",
      "search.bestMeta": "Cafe · 8 Tverskaya St",
      "search.bestTags": '<b class="open">Open until 23:00</b> · 320 m · Wi-Fi · Cards',
      "search.surfMeta": "Coffee shop · 480 m · Wi-Fi",
      "search.shokoName": "Shokoladnitsa",
      "search.shokoMeta": "Cafe · 610 m · Cards",
      "search.cofixMeta": "Coffee shop · 700 m · Open until 21:00",
      "search.doublebMeta": "Coffee shop · 820 m · Wi-Fi · Cards",
      "place.backAria": "Back",
      "place.shareAria": "Share",
      "place.saveAria": "Save",
      "place.category": "Cafe",
      "place.openUntil": "Open until 23:00",
      "place.cuisineShort": "Coffee, pastries",
      "place.cuisine": "Cuisine: coffee, pastries",
      "place.wifi": "Wi-Fi: yes",
      "place.cards": "Cards accepted: yes",
      "place.route": "Route",
      "place.call": "Call",
      "place.save": "Save",
      "place.share": "Share",
      "place.address": "8 Tverskaya St, Moscow",
      "place.distance": "320 m",
      "place.hours": "Daily, 8:00 – 23:00",
      "place.cta": "Build route",
      "settings.backAria": "Back",
      "settings.searchAria": "Search settings",
      "settings.title": "Settings",
      "settings.appearance": "Appearance",
      "settings.light": "Light",
      "settings.dark": "Dark",
      "settings.system": "System",
      "settings.largeFont": "Large font on map",
      "settings.largeFontSub": "Street and POI names",
      "settings.maps": "Maps",
      "settings.downloaded": "Downloaded regions",
      "settings.downloadedSub": "Moscow and region · 412 MB",
      "settings.mapLayers": "Map layers",
      "settings.mapLayersSub": "Terrain, traffic, bike lanes",
      "settings.osm": "OpenStreetMap Profile",
      "settings.osmSub": "For map editing only · Not connected",
      "settings.autoUpdate": "Map auto-update",
      "settings.autoUpdateSub": "Wi-Fi only",
      "settings.navigation": "Navigation",
      "settings.tolls": "Avoid toll roads",
      "settings.voice": "Voice guidance",
      "settings.voiceSub": "English",
      "settings.privacy": "Privacy",
      "settings.noTrackers": "No trackers",
      "settings.noTrackersSub": "Analytics disabled entirely",
      "settings.noTrackersBadge": "On",
      "settings.history": "Search history",
      "settings.historySub": "Stored on device only",
      "settings.about": "About",
      "settings.version": "Version",
      "settings.versionValue": "2026.11 · MD3",
      "settings.support": "Support the project",
      "map.tverskaya": "Tverskaya St",
      "map.stoleshnikov": "Stoleshnikov Ln",
      "map.patriarch": "Patriarch Ponds",
      "map.moskva": "Moskva River",
      "map.bersenevskaya": "Bersenevskaya Emb",
      "sheet.toggleAria": "Collapse or expand panel",
    },
    ru: {
      "meta.title": "Organic Maps — концепт Material Design 3",
      "meta.desc": "Концепт редизайна Organic Maps по Material Design 3: пять экранов, светлая и тёмная темы, интерактивный прототип.",
      "tabs.map": "Карта",
      "tabs.nav": "Навигация",
      "tabs.search": "Поиск",
      "tabs.place": "Место",
      "tabs.settings": "Настройки",
      "topbar.lang": "Язык",
      "topbar.themeTitle": "Светлая / тёмная тема",
      "topbar.themeAria": "Переключить тему",
      "topbar.allTitle": "Все экраны",
      "topbar.allAria": "Показать все экраны",
      "map.searchPlaceholder": "Поиск мест и адресов",
      "map.layersTitle": "Слои карты",
      "map.layersAria": "Слои карты",
      "map.orientTitle": "Ориентация",
      "map.orientAria": "Ориентация карты",
      "map.locateTitle": "Моё местоположение",
      "map.locateAria": "Моё местоположение",
      "map.zoomIn": "Приблизить",
      "map.zoomOut": "Отдалить",
      "layers.terrain": "Рельеф",
      "layers.bike": "Велодорожки",
      "layers.subway": "Метро",
      "cat.food": "Еда",
      "cat.cafes": "Кафе",
      "cat.fuel": "АЗС",
      "cat.hotels": "Отели",
      "nearby.coffeeName": "Кофемания",
      "nav.label": "Основная навигация",
      "navTab.map": "Карта",
      "navTab.search": "Поиск",
      "navTab.route": "Маршрут",
      "navTab.saved": "Метки",
      "navTab.more": "Ещё",
      "nav.maneuverDistance": "Через 200 м",
      "nav.maneuverInstruction": "поверните направо на Тверскую",
      "nav.then": "затем",
      "nav.soundAria": "Звук навигации",
      "nav.speed": "47<span>км/ч</span>",
      "nav.etaValue": "12 мин",
      "nav.etaSub": "4,2 км · прибытие в 9:53",
      "nav.endAria": "Завершить маршрут",
      "nav.modeCar": "Авто",
      "nav.modeBike": "Вело",
      "nav.modeWalk": "Пешком",
      "nav.modeTransit": "Транспорт",
      "nav.alt1km": "4,2 км",
      "nav.alt1min": "12 мин",
      "nav.alt1tag": "без пробок",
      "nav.alt2km": "5,6 км",
      "nav.alt2min": "17 мин",
      "nav.alt2tag": "через центр",
      "nav.alt3km": "3,9 км",
      "nav.alt3min": "19 мин",
      "nav.alt3tag": "пробки",
      "nav.offline": "Офлайн-карта",
      "nav.share": "Поделиться",
      "search.backAria": "Назад",
      "search.queryAria": "Поисковый запрос",
      "search.clearAria": "Очистить",
      "search.value": "кофе",
      "search.chipOpen": "Открыто",
      "search.chipNearby": "Рядом",
      "search.chipWifi": "Wi-Fi",
      "search.chipCards": "Оплата картой",
      "search.best": "Лучший результат",
      "search.more14": "Ещё 14 мест",
      "search.bestMeta": "Кафе · Тверская ул., 8",
      "search.bestTags": '<b class="open">Открыто до 23:00</b> · 320 м · Wi-Fi · Карты',
      "search.surfMeta": "Кофейня · 480 м · Wi-Fi",
      "search.shokoName": "Шоколадница",
      "search.shokoMeta": "Кафе · 610 м · Карты",
      "search.cofixMeta": "Кофейня · 700 м · Открыто до 21:00",
      "search.doublebMeta": "Кофейня · 820 м · Wi-Fi · Карты",
      "place.backAria": "Назад",
      "place.shareAria": "Поделиться",
      "place.saveAria": "Сохранить",
      "place.category": "Кафе",
      "place.openUntil": "Открыто до 23:00",
      "place.cuisineShort": "Кофе, выпечка",
      "place.cuisine": "Кухня: кофе, выпечка",
      "place.wifi": "Wi-Fi: есть",
      "place.cards": "Оплата картой: да",
      "place.route": "Маршрут",
      "place.call": "Позвонить",
      "place.save": "Сохранить",
      "place.share": "Поделиться",
      "place.address": "Тверская ул., 8, Москва",
      "place.distance": "320 м",
      "place.hours": "Ежедневно, 8:00 – 23:00",
      "place.cta": "Построить маршрут",
      "settings.backAria": "Назад",
      "settings.searchAria": "Поиск в настройках",
      "settings.title": "Настройки",
      "settings.appearance": "Внешний вид",
      "settings.light": "Светлая",
      "settings.dark": "Тёмная",
      "settings.system": "Системная",
      "settings.largeFont": "Крупный шрифт на карте",
      "settings.largeFontSub": "Названия улиц и POI",
      "settings.maps": "Карты",
      "settings.downloaded": "Скачанные регионы",
      "settings.downloadedSub": "Москва и область · 412 МБ",
      "settings.mapLayers": "Слои карты",
      "settings.mapLayersSub": "Рельеф, пробки, велодорожки",
      "settings.osm": "Профиль OpenStreetMap",
      "settings.osmSub": "Только для редактирования карты · Не подключён",
      "settings.autoUpdate": "Автообновление карт",
      "settings.autoUpdateSub": "Только по Wi-Fi",
      "settings.navigation": "Навигация",
      "settings.tolls": "Избегать платных дорог",
      "settings.voice": "Голосовые подсказки",
      "settings.voiceSub": "Русский",
      "settings.privacy": "Приватность",
      "settings.noTrackers": "Без трекеров",
      "settings.noTrackersSub": "Аналитика выключена полностью",
      "settings.noTrackersBadge": "Вкл",
      "settings.history": "История поиска",
      "settings.historySub": "Хранится только на устройстве",
      "settings.about": "О приложении",
      "settings.version": "Версия",
      "settings.versionValue": "2026.11 · MD3",
      "settings.support": "Помочь проекту",
      "map.tverskaya": "Тверская ул.",
      "map.stoleshnikov": "Столешников пер.",
      "map.patriarch": "Патриаршие пруды",
      "map.moskva": "Москва-река",
      "map.bersenevskaya": "Берсеневская наб.",
      "sheet.toggleAria": "Свернуть или развернуть панель",
    },
  };

  let currentLang = "en";

  function translate(key) {
    const table = translations[currentLang] || translations.en;
    return table[key] != null ? table[key] : translations.en[key] || key;
  }

  function localize(scope = document) {
    scope.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = translate(el.dataset.i18n);
    });
    scope.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = translate(el.dataset.i18nHtml);
    });
    scope.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      el.setAttribute("aria-label", translate(el.dataset.i18nAriaLabel));
    });
    scope.querySelectorAll("[data-i18n-title]").forEach((el) => {
      el.setAttribute("title", translate(el.dataset.i18nTitle));
    });
    scope.querySelectorAll("[data-i18n-value]").forEach((el) => {
      el.value = translate(el.dataset.i18nValue);
    });
    scope.querySelectorAll("[data-i18n-content]").forEach((el) => {
      el.setAttribute("content", translate(el.dataset.i18nContent));
    });
  }

  function applyLanguage(lang) {
    currentLang = lang === "ru" ? "ru" : "en";
    root.lang = currentLang;

    localize(document);
    localize(mapTemplate.content);

    document.querySelectorAll(".lang-switch [data-lang]").forEach((btn) => {
      const on = btn.dataset.lang === currentLang;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", String(on));
    });

    if (frames) {
      frames.querySelectorAll(".frame__label").forEach((label) => {
        const screen = screens.find((s) => s.dataset.screen === label.dataset.screenLabel);
        if (screen) label.textContent = screen.getAttribute("aria-label") || screen.dataset.screen;
      });
    }
  }

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
      localize(slot);
    });
  }
  paintMaps();

  document.querySelectorAll(".lang-switch [data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });

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
        label.dataset.screenLabel = screen.dataset.screen;
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
  applyLanguage(params.get("lang") === "ru" ? "ru" : "en");

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
