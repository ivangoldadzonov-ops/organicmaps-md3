# Organic Maps — Material Design 3 redesign

Редизайн интерфейса [Organic Maps](https://organicmaps.app) по правилам **Material Design 3**: дизайн-система, машинно-читаемые токены, интерактивный прототип и готовые к переносу реализации токенов под Android (Compose), iOS (SwiftUI) и десктоп (QML).

> Это **дизайн-проект**, а не форк приложения. Код приложения не менялся — здесь лежит всё, что нужно, чтобы команда Organic Maps внедрила новый интерфейс: токены, спецификации, экраны и код.

**Organic Maps** — бесплатное оффлайн-приложение с картами и навигацией на данных OpenStreetMap: без рекламы, трекеров и сбора данных. Если вы используете этот дизайн или производные от него материалы, укажите авторство:

> Organic Maps Project — https://organicmaps.app

---

## Что внутри

| Каталог | Содержимое |
|---|---|
| `tokens/tokens.json` | Единый источник правды: цвет, типографика, форма, тень, motion, метрики |
| `tokens/css/tokens.css` | Те же токены в виде CSS-переменных (светлая и тёмная схемы) |
| `prototype/` | Интерактивный прототип: 5 экранов, тёмная тема, режим «все экраны» |
| `docs/design-system.md` | Цветовые роли, типографика, формы, elevation, motion, доступность |
| `docs/components.md` | Спецификации компонентов: анатомия, состояния, поведение |
| `docs/screens.md` | Разбор каждого экрана и принятые решения |
| `docs/migration.md` | План перехода: что менять в Android / iOS / QML, по этапам |
| `android/` | Токены на Kotlin + Compose (`Color.kt`, `Type.kt`, `Shape.kt`, `Theme.kt`) |
| `ios/` | Токены на Swift + SwiftUI (`OrganicMapsTheme.swift`) |
| `qt/` | Токены на QML (`Theme.qml`) для десктопной версии |
| `tools/serve.ps1` | Локальный статический сервер для просмотра прототипа |

## Посмотреть прототип

Прототип — статические файлы, сборка не нужна.

```bash
# любой статический сервер из корня репозитория
python3 -m http.server 8000
# или в PowerShell
powershell -ExecutionPolicy Bypass -File tools/serve.ps1
```

Откройте <http://localhost:8000/prototype/index.html>.

В прототипе доступны:

- переключение между пятью экранами (вкладки сверху и нижняя навигация);
- светлая и тёмная темы (кнопка справа сверху);
- режим **«Все экраны»** — все макеты рядом;
- рабочие элементы: чипы, сегментированные переключатели, нижний лист, поиск, вкладки «Маршрут / Трек».

## Экраны

1. **Карта** — док-панель с поиском, FAB-стек, лист «Рядом с вами», нижняя навигация.
2. **Навигация** — баннер манёвра, развёрнутый лист с ETA, статистикой и альтернативами маршрута.
3. **Поиск и загрузка карт** — активная строка поиска, фильтры, список результатов с отметкой «в пути».
4. **Загрузка карт** — карточка хранилища, список регионов с прогрессом, extended FAB «Скачать всё».
5. **Маршрут и треки** — точки маршрута с оптимизацией, альтернативы, профиль высот, виджет записи трека.

## Принципы

- **Карта — главный объект.** Всё остальное — док-панели и листы, а не отдельные экраны.
- **Большие цели, крупные элементы.** Цель касания — 48 dp, FAB — 56 dp, баннер манёвра — иконка 56 dp.
- **Один слой действий.** Вторичные действия уходят в bottom sheet, а не в меню.
- **Приватность видна в интерфейсе.** Никаких баннеров про покупки и рекламу; «Скачать всё» и «Оптимизировать» — единственные дорогие операции, и они подписаны явно.
- **Тёмная тема — полноценная**, включая собственный стиль карты.

## Токены: кратко

Цветовая схема построена на тональных палитрах MD3 из одного источника — лесного зелёного `#2F6D4F`.

| Роль | Светлая | Тёмная |
|---|---|---|
| `primary` | `#2F6D4F` | `#96D0B4` |
| `primaryContainer` | `#B5ECD3` | `#224F3C` |
| `secondary` | `#526256` | `#B8C8BB` |
| `tertiary` (вода, транзит) | `#166577` | `#9AD3E2` |
| `surface` | `#FCFDFB` | `#101411` |
| `surfaceContainerHigh` | `#EAEDEA` | `#282B29` |
| `trail` (тропы, внедорожье) | `#E8843C` | `#E8843C` |

Полный список — в `tokens/tokens.json` и `tokens/css/tokens.css`.

## Внедрение

1. **Токены** — скопировать `android/`, `ios/`, `qt/` в проект и подключить тему (пошагово — в `docs/migration.md`).
2. **Стиль карты** — новые значения палитры карты лежат в `tokens.json → color.custom.map`; для применения нужно пересобрать стили в `data/` (см. `docs/STYLES.md` в основном репозитории Organic Maps).
3. **Экраны** — спецификации в `docs/screens.md`, компоненты в `docs/components.md`.
4. **Обратная связь** — открыть issue или обсуждение в этом репозитории.

## Лицензия

Код и дизайн-артефакты — **Apache License 2.0** (см. `LICENSE`). Токены можно свободно переносить в приложение.

Данные карт в самом Organic Maps распространяются отдельно (`DATA_LICENSE.txt` в основном репозитории) — этот проект их не содержит и не изменяет.

## English summary

A complete Material Design 3 redesign for [Organic Maps](https://organicmaps.app): design tokens, component specifications, an interactive prototype of five key screens, and ready-to-use token implementations for Jetpack Compose, SwiftUI and QML.

- **Tokens:** `tokens/tokens.json` (source of truth), `tokens/css/tokens.css`
- **Prototype:** `prototype/index.html` — no build step, open it in a browser
- **Specs:** `docs/design-system.md`, `docs/components.md`, `docs/screens.md`, `docs/migration.md`
- **Platform code:** `android/`, `ios/`, `qt/`

If you reuse this design, please credit the Organic Maps Project — https://organicmaps.app

## Участие

Идеи, правки и замечания — в Issues и Discussions этого репозитория. Подробности — в [CONTRIBUTING.md](CONTRIBUTING.md).
