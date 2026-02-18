# Plan: Shopify Developer Portfolio Theme (End-to-End)

## Context

Production-ready Shopify 2.0 тема-портфолио, демонстрирующая навыки уровня платного Shopify-разработчика (80-90% реальных заказов). Стек: Shopify 2.0, Liquid, vanilla JS (без jQuery), mobile-first CSS, Shopify CLI.

---

## Фаза 0: Подготовка

- [ ] Создать Shopify development store (вручную на partners.shopify.com)
- [ ] Инициализировать тему на базе Dawn: `shopify theme init`
- [ ] Инициализировать git-репозиторий: `git init`, `.gitignore`
- [ ] Создать GitHub-репозиторий и подключить remote
- [ ] Проверить `shopify theme dev` — тема запускается локально
- [ ] Первый коммит: "Initial theme setup based on Dawn"

**Файлы:** Весь каталог темы (layout/, sections/, snippets/, templates/, config/, assets/, locales/)

---

## Фаза 1: Структура темы

**Цель:** Организовать тему в чистую архитектуру sections/snippets, настроить основные шаблоны.

- [ ] Ревизия Dawn-структуры — понять что оставить, что переписать
- [ ] Настроить `layout/theme.liquid` — header, footer, основная обёртка
- [ ] Создать/адаптировать JSON-шаблоны:
  - `templates/index.json` (homepage)
  - `templates/product.json` (PDP)
  - `templates/collection.json` (collection page)
  - `templates/cart.json` (cart page)
- [ ] Разбить общие элементы на snippets:
  - `snippets/product-card.liquid` (карточка продукта для коллекций)
  - `snippets/price.liquid` (отображение цены — будет расширено в фазе 6)
  - `snippets/image.liquid` (оптимизированный вывод изображений)
- [ ] Настроить `config/settings_schema.json` — глобальные настройки темы (цвета, шрифты, логотип)
- [ ] Коммит: "Set up theme structure with sections, snippets, and JSON templates"

**Ключевые файлы:** `layout/theme.liquid`, `templates/*.json`, `snippets/product-card.liquid`, `snippets/price.liquid`, `snippets/image.liquid`, `config/settings_schema.json`

---

## Фаза 2: Figma → Shopify (дизайн-вёрстка)

**Цель:** Pixel-accurate верстка по Figma-макету, mobile-first.

- [ ] Определиться с Figma-макетом (или подобрать бесплатный e-commerce макет)
- [ ] Верстка Homepage:
  - Hero banner section
  - Featured collection section
  - Promo/info sections
- [ ] Верстка PDP (Product Detail Page):
  - Product gallery (images)
  - Product info (title, price, description, variant selector)
  - Add to cart button
  - Product metafields area (placeholder для фазы 4)
- [ ] Mobile-first подход — сначала мобильная версия, потом desktop
- [ ] CSS в `assets/` — без preprocessors
- [ ] Без page builders — весь layout кодом
- [ ] Коммит: "Implement pixel-accurate Figma design for homepage and PDP"

**Ключевые файлы:** `assets/base.css`, `sections/hero-banner.liquid`, `sections/featured-collection.liquid`, `sections/main-product.liquid`

---

## Фаза 3: Shopify 2.0 Sections (dynamic blocks)

**Цель:** Кастомные sections с dynamic blocks, переставляемые из админки.

- [ ] Создать кастомную section с dynamic blocks (например, "Product Features" или "FAQ")
- [ ] Обеспечить reorder блоков из админки (JSON templates + blocks)
- [ ] Добавить section на PDP через `templates/product.json`
- [ ] Протестировать: блоки можно добавлять, удалять и перетаскивать в Theme Customizer
- [ ] Коммит: "Add custom section with dynamic blocks and admin reordering"

**Ключевые файлы:** `sections/custom-features.liquid`, `templates/product.json`

---

## Фаза 4: Metafields

**Цель:** Product metafields разных типов с условным рендерингом на PDP.

- [ ] Создать metafield definitions в Shopify Admin (Settings → Custom data → Products):
  - `custom.features_text` (single_line_text / multi_line_text)
  - `custom.is_featured` (boolean)
  - `custom.extra_image` (file_reference / image)
- [ ] Заполнить metafields для тестовых продуктов
- [ ] Вывести metafields на PDP с условным рендерингом (показывать ТОЛЬКО если заполнен)
- [ ] Создать snippet: `snippets/product-metafields.liquid`
- [ ] Коммит: "Add metafield rendering on PDP with conditional display"

**Ключевые файлы:** `snippets/product-metafields.liquid`, `sections/main-product.liquid`

---

## Фаза 5: App Data (имитация)

**Цель:** "App-like" данные в metafields, тема устойчива к изменениям.

- [ ] Создать metafield namespace `app_data`:
  - `app_data.badge_text` (текст бейджа)
  - `app_data.badge_enabled` (boolean)
  - `app_data.extra_info` (JSON / single_line_text)
- [ ] Вывести данные в теме (badge на карточке, доп. инфо на PDP)
- [ ] Defensive coding — тема НЕ ломается если metafield пустой / удалён / формат изменился
- [ ] Коммит: "Add app-like data via metafields with resilient rendering"

**Ключевые файлы:** `snippets/product-card.liquid`, `snippets/product-metafields.liquid`

---

## Фаза 6: Custom Pricing Logic (VAT)

**Цель:** Inc/exc tax, per-product контроль, sale prices на всех страницах.

- [ ] Создать metafield `custom.show_tax` (boolean) — per product
- [ ] Создать/расширить `snippets/price.liquid`:
  - "Price incl. VAT" и "Price excl. VAT"
  - Учёт `product.metafields.custom.show_tax`
  - Поддержка compare_at_price (sale/зачёркнутая цена)
  - `| money` фильтр для форматирования
- [ ] Интеграция на всех страницах: PDP, Collection, Cart
- [ ] Глобальная настройка в `settings_schema.json`: tax rate (%)
- [ ] Коммит: "Implement custom VAT pricing logic across PDP, collection, and cart"

**Ключевые файлы:** `snippets/price.liquid`, `sections/main-product.liquid`, `snippets/product-card.liquid`, `sections/main-cart.liquid`, `config/settings_schema.json`

---

## Фаза 7: JavaScript Interactions

**Цель:** Динамический UI на PDP — toggle, conditional rendering, vanilla JS.

- [ ] Создать `assets/product-interactions.js`:
  - Toggle: показать/скрыть блок (More details, Shipping info)
  - Conditional rendering по выбранному варианту
  - `data-` атрибуты для связи JS с HTML
- [ ] Vanilla JS — без jQuery, без глобальных side effects
  - Классы или модульный паттерн
  - Event delegation
  - Инициализация через `DOMContentLoaded` или section rendering API
- [ ] Подключить через `<script src="{{ 'product-interactions.js' | asset_url }}" defer></script>`
- [ ] Коммит: "Add dynamic JS interactions on PDP (toggle, conditional UI)"

**Ключевые файлы:** `assets/product-interactions.js`, `sections/main-product.liquid`

---

## Фаза 8: Performance

**Цель:** Оптимизация — images, CLS, LCP, lazy loading. Lighthouse 90+.

- [ ] Изображения:
  - `image_tag` / `img_url` с параметрами размера
  - `width` и `height` атрибуты на всех `<img>` (предотвращение CLS)
  - Responsive images через `srcset`
  - WebP через Shopify CDN (`| image_url: width: 800`)
- [ ] Lazy loading:
  - `loading="lazy"` ниже fold
  - НЕ lazy-load hero/LCP изображение
- [ ] CLS: фиксированные размеры, aspect-ratio, без динамической вставки выше fold
- [ ] LCP: preload hero image, минимизировать render-blocking CSS/JS
- [ ] Минимизировать DOM: убрать лишние обёртки, semantic HTML
- [ ] Проверить через Lighthouse и PageSpeed Insights
- [ ] Коммит: "Optimize performance: images, CLS, LCP, lazy loading"

**Ключевые файлы:** `snippets/image.liquid`, `layout/theme.liquid`, все sections с изображениями

---

## Фаза 9: Git Workflow (применяется на всех этапах)

- [ ] Feature branch для каждой фазы: `feature/phase-1-theme-structure`, `feature/phase-2-figma-design`, ...
- [ ] Meaningful commits (не "fix", а "Add product card snippet with price and image")
- [ ] PR description для каждого merge в main
- [ ] Не коммитить `.env`, `config/settings_data.json` (`.gitignore`)

---

## Фаза 10: Документация

- [ ] Создать `README.md`:
  - Описание проекта
  - Что реализовано (по фазам)
  - Какие Shopify-проблемы закрыты
  - Как запустить (`shopify theme dev`)
  - Скриншоты
- [ ] Комментарии в коде — "ПОЧЕМУ", а не "ЧТО"
- [ ] Коммит: "Add project documentation and code comments"

---

## Порядок выполнения

```
Фаза 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 10
                                          ↑
                                  Фаза 9 на всех этапах
```

## Верификация после каждой фазы

1. `shopify theme dev` — тема работает без ошибок
2. `shopify theme check` — нет Liquid ошибок
3. Theme Customizer — sections/blocks настраиваются
4. Мобильная проверка — responsive работает
5. После фазы 8 — Lighthouse score 90+
