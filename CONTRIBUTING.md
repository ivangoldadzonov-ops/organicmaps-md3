# Contributing

Спасибо за интерес к редизайну Organic Maps.

## Что здесь можно делать

| Хочу | Куда |
|---|---|
| Изменить цвет, форму, типографику | `tokens/tokens.json` → затем `tokens/css/tokens.css` и файлы в `android/`, `ios/`, `qt/` |
| Поправить компонент в прототипе | `prototype/styles/app.css`, `prototype/scripts/screens.js` |
| Описать новый экран | `docs/screens.md` + макет в `prototype/scripts/screens.js` |
| Предложить правку спецификации | `docs/components.md`, `docs/design-system.md` |

## Правила

1. **Токены — единственный источник правды.** Не пишите цвет или радиус прямо в компоненте: добавляйте токен и используйте его.
2. **Роли вместо сырых цветов.** Компонент обращается к `primary` / `surfaceContainerHigh`, а не к `#B5ECD3`.
3. **Тёмная тема обязательна.** Любой новый компонент проверяется в обеих схемах.
4. **Цель касания — 48 dp.** Иконка без подписи — только с тултипом и `contentDescription`.
5. **Никаких новых зависимостей в прототипе.** Это статические файлы: HTML, CSS и vanilla JS без сборки.

## Проверка перед PR

```bash
# статический сервер
powershell -ExecutionPolicy Bypass -File tools/serve.ps1
```

- Прототип открывается без ошибок в консоли.
- Все пять экранов работают в светлой и тёмной темах.
- Проверены состояния: чипы, сегментированные переключатели, лист, вкладки «Маршрут / Трек».
- Цветовой контраст — не ниже 4,5:1.

## Формат коммитов

Короткий заголовок в стиле Conventional Commits:

```
tokens: add transit accent colour for dark theme
prototype: fix bottom sheet overlapping the navigation bar
docs: describe elevation chart component
```

## Лицензия

Внося изменения, вы соглашаетесь с публикацией их под Apache License 2.0
(см. `LICENSE`). При использовании дизайна в продукте — укажите Organic
Maps Project со ссылкой на https://organicmaps.app
