# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Shopify 2.0 theme development portfolio project. The goal is to build a production-ready custom Shopify theme demonstrating professional-level skills across theme structure, design implementation, metafields, custom pricing logic, and performance optimization.

The full project specification is in `goal.md` (written in Ukrainian).

## Project Status

Project is in the specification/planning phase. No theme code has been scaffolded yet.

## Expected Tech Stack

- **Platform:** Shopify Online Store 2.0
- **Templating:** Liquid
- **JavaScript:** Vanilla JS (no jQuery, no global side effects)
- **CSS:** Mobile-first, responsive
- **Theme base:** Dawn or custom theme
- **Dev tools:** Shopify CLI, GitHub integration

## Common Commands

```bash
# Initialize theme development
shopify theme dev              # Start local development server
shopify theme push             # Push theme to Shopify store
shopify theme pull             # Pull theme from Shopify store
shopify theme check            # Lint Liquid/theme files (Theme Check)
```

## Architecture (Shopify 2.0 Theme Structure)

```
├── assets/           # CSS, JS, images
├── config/           # settings_schema.json, settings_data.json
├── layout/           # theme.liquid (main layout)
├── locales/          # Translation files
├── sections/         # Reusable sections with schema (admin-configurable)
├── snippets/         # Reusable partial templates
├── templates/        # Page templates (product, collection, cart, index)
│   └── *.json        # JSON templates (2.0 style, reference sections)
```

**Key patterns:**
- Sections define their own `{% schema %}` blocks for admin customization
- JSON templates (not `.liquid` templates) to enable section reordering in the admin
- Snippets for shared rendering logic (e.g., price display, image optimization)
- Metafields accessed via `product.metafields.namespace.key` — always check presence before rendering

## Implementation Phases

1. **Theme Structure** — sections/snippets architecture, product/collection/cart templates, settings schema
2. **Figma → Code** — pixel-accurate, mobile-first, no page builders
3. **Shopify 2.0 Sections** — dynamic blocks, admin reordering
4. **Metafields** — text/boolean/image metafields on PDP, conditional rendering
5. **App Data Simulation** — app-like data via metafields, resilient to app updates
6. **Custom Pricing (VAT)** — inc/exc tax toggle per product, sale price support across PDP/collection/cart
7. **JS Interactions** — dynamic PDP UI (toggles, conditional rendering), vanilla JS
8. **Performance** — image optimization, CLS/LCP, lazy loading, minimal DOM
9. **Git Workflow** — feature branches, meaningful commits, PR descriptions
10. **Documentation** — README with implementation details, "why" comments in code

## Git Workflow

- Feature branches per phase/task
- Meaningful commit messages describing "what and why"
- PR descriptions for each feature
