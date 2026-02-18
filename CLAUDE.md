# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Shopify 2.0 theme development portfolio project. The goal is to build a production-ready custom Shopify theme demonstrating professional-level skills across theme structure, design implementation, metafields, custom pricing logic, and performance optimization.

The full project specification is in `goal.md` (written in Ukrainian).

## Project Status

Phase 0 (bootstrap) and Phase 1 (theme structure) are complete. Dawn theme cloned as base, GitHub repo created, theme renamed to "Portfolio Theme". Ready for Phase 2 (Figma to code).

## Expected Tech Stack

- **Platform:** Shopify Online Store 2.0
- **Templating:** Liquid
- **JavaScript:** Vanilla JS (no jQuery, no global side effects)
- **CSS:** Mobile-first, responsive
- **Theme base:** Dawn (v15.4.1)
- **Dev tools:** Shopify CLI, GitHub integration

## Common Commands

```bash
# Theme development (all commands use --path for client/ subfolder)
shopify theme dev --path=client/ --store=portfolio-dev-store.myshopify.com
shopify theme push --path=client/
shopify theme pull --path=client/
shopify theme check --path=client/
```

## Project Structure

```
├── CLAUDE.md         # Project instructions
├── goal.md           # Full specification (Ukrainian)
├── plan.md           # Implementation plan
├── client/           # Shopify theme files
│   ├── assets/       # CSS, JS, images
│   ├── config/       # settings_schema.json, settings_data.json
│   ├── layout/       # theme.liquid (main layout)
│   ├── locales/      # Translation files
│   ├── sections/     # Reusable sections with schema (admin-configurable)
│   ├── snippets/     # Reusable partial templates
│   └── templates/    # Page templates (JSON, Shopify 2.0 style)
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
