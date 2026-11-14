# Шаблон обращения в upstream Organic Maps

Готовый текст для Issue или Discussion в [organicmaps/organicmaps](https://github.com/organicmaps/organicmaps). Перед публикацией проверьте, что ссылки доступны, и при необходимости сократите раздел «What is already prepared» под формат обсуждения.

---

## Title

Design proposal: Material Design 3 refresh for Organic Maps (interactive prototype + design tokens)

## Body

### Summary

This proposal is a visual refresh of Organic Maps based on **Material Design 3**, without changing the map engine, data pipeline, or offline-first behaviour. It includes an interactive prototype of five key screens, a machine-readable token source, and ready-to-use implementations for Jetpack Compose, SwiftUI, and QML.

The goal is not to make Organic Maps look like a generic Material app. The goal is to keep the map as the primary object, make actions easier to reach, and give the interface a coherent, accessible visual system on every platform.

### Live prototype

- **Interactive prototype:** <https://ivangoldadzonov-ops.github.io/organicmaps-md3/>
- **Source and design documentation:** <https://github.com/ivangoldadzonov-ops/organicmaps-md3>

The prototype includes all five screens, light and dark themes, and direct links:

- `?theme=dark` — dark theme;
- `?view=all` — all screens side by side;
- `#map`, `#nav`, `#search`, `#place`, `#settings` — deep links to a screen.

### Design principles

1. **The map stays the main object.** Search, place details, route information, and settings are sheets and docked panels over the map, not separate full-screen contexts.
2. **One layer of actions.** Primary actions stay visible; secondary actions move into a bottom sheet instead of being hidden in overflow menus.
3. **Large, predictable touch targets.** Minimum target is 48 dp, primary FAB is 56 dp, and the manoeuvre banner uses a 56 dp icon.
4. **Roles, not shades.** Components consume semantic roles (`primary`, `surface-container`, `on-surface-variant`) rather than hard-coded colours. This is what makes theme switching and future branding changes safe.
5. **Dark theme is a first-class theme.** It includes its own map palette for parks, water, buildings, roads, labels, and the active route, not just inverted UI surfaces.
6. **Privacy is visible.** The settings screen states “No trackers” directly instead of hiding privacy in a marketing page.

### What is already prepared

- `tokens/tokens.json` — the single source of truth for colour, typography, shape, elevation, motion, layout, and map symbols.
- `tokens/css/tokens.css` — CSS custom properties generated from the same values.
- `docs/design-system.md` — colour roles, type scale, shape, elevation, motion, and accessibility rules.
- `docs/components.md` — component anatomy, states, and behaviour.
- `docs/screens.md` — screen-by-screen rationale for the five prototypes.
- `docs/migration.md` — a staged migration plan for Android, iOS, and Qt.
- `android/`, `ios/`, `qt/` — token implementations for Compose, SwiftUI, and QML.
- `android/app/src/main/res/values/colors.xml` and `values-night/colors.xml` — XML colour resources for legacy Views screens, kept in sync with the token source.

### Proposed rollout

The rollout is intentionally incremental and can stop after any phase.

**Phase 0 — Tokens and theme plumbing (1–2 days).**
Add the token source, generate platform wrappers, and wire the theme without changing the current look. This proves the build and theming pipeline before any visual change ships.

**Phase 1 — Android theme and typography (about 1 week).**
Switch to `Theme.Material3.DayNight.NoActionBar`, map legacy colour names to the new `md3_*` XML resources, remove hard-coded colours from layouts, and verify light/dark parity.

**Phase 2 — Navigation and sheets (about 2 weeks).**
Introduce the five-item bottom navigation with an active indicator, move map panels to `BottomSheetBehavior` with peek/expanded states, and standardise FAB sizes.

**Phase 3 — Screen-by-screen migration (about 3 weeks).**
Migrate place details, search, settings, and navigation one screen at a time. Each screen can be reviewed and reverted independently. Screenshot tests cover all five screens in both themes.

**Phase 4 — iOS and Qt (in parallel after Phase 0).**
Reuse the same tokens and metrics, but keep native controls: `UISheetPresentationController` on iOS and a QML theme singleton on desktop. Material components are not forced onto non-Android platforms.

**Phase 5 — Cleanup.**
Remove legacy aliases, update store screenshots, and record contrast checks in the design-system documentation.

### Why this is low-risk

- The map renderer and offline data path are untouched; only presentation-layer code changes.
- The token layer can ship before any screen is redesigned.
- Legacy XML screens and new Compose screens can use the same palette at the same time.
- Each phase has a clear rollback point, and the prototype is available for review before implementation starts.

### Questions for maintainers

1. Would a token-first rollout fit the current Android/iOS/Qt structure?
2. Which existing colour resource names should be kept as aliases during the transition?
3. Is the proposed five-screen scope appropriate for an initial design review, or should it be narrowed to the map and place-details screens first?
4. Would you prefer this as a Discussion for design feedback before any implementation PRs?

Thank you for building an app that respects users’ privacy and works offline. This proposal is meant to support those principles, not replace them.
