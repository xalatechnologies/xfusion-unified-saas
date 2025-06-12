# Storybook-Driven UI Migration & Design System Checklist

## Overview

This checklist details the step-by-step process for migrating the application to a fully Storybook-driven, token-based, shared-component UI system. **Storybook is for developers and designers only**—it is the source of truth for component documentation, variant previews, and internal QA. **It is not the runtime theming/branding UI for end-users or org admins.**

**All runtime theming, white-labeling, and token management for organizations and SaaS is handled by the Theme/Branding Admin panel.** See `theme-branding-admin-checklist.md` for the full implementation plan for that system.

**Key White-Labeling & Configurability Requirements:**
- All design tokens (colors, font sizes, typography, borders, radii, etc.) are adjustable from the Theme/Branding Admin panel and are stored in the database at both the SaaS platform and organization level.
- Font sizes use enums (e.g., `initial`, `smaller`, `larger`, etc.) and are mapped to values stored in the DB for each org/saas profile.
- All components must be derived from shared UI components—no hardcoded styles or custom components.
- **The database is the master source of truth for tokens.** Storybook should read tokens from the DB (or a synced export) to ensure dev and runtime environments match.
- **Storybook controls are for developer preview/testing only.** The actual saving and management of tokens happens in the Theme/Branding Admin panel.
- **Tokens must be synced between the admin panel and Storybook.**

**Recommended Order:**
1. **Start with the DB/token schema and Theme/Branding Admin panel** (see `theme-branding-admin-checklist.md`).
2. Refactor shared components to use only token/variant-based styling.
3. Integrate Storybook with the DB-driven tokens for dev preview and QA.

---

## 1. Centralize & Database-Back Design Tokens
- [ ] **Audit all current tokens**
  - [ ] List all tokens in `tokens.ts`, `index.css`, and DB schema
  - [ ] Identify duplicates and inconsistencies
- [ ] **Define enums for font sizes and other adjustable values**
  - [ ] Create enums for font sizes (e.g., `initial`, `smaller`, `larger`, etc.)
  - [ ] Map enums to values in the DB (org/saas level)
- [ ] **Choose single source of truth**
  - [ ] Database is the master; generate tokens.ts/css from DB or sync Storybook with DB
- [ ] **Automate token sync with DB**
  - [ ] Set up a build step or API to generate CSS variables and tokens.ts from DB values
  - [ ] Remove manual/duplicate token definitions
- [ ] **Document tokens and DB schema**
  - [ ] Add/expand `design-tokens.md` to explain token structure, DB schema, usage, and update process
- [ ] **Implement admin UI for token management**
  - [ ] See `theme-branding-admin-checklist.md` for full requirements
  - [ ] Allow super-admins/org-admins to adjust tokens (colors, fonts, radii, etc.) via UI
  - [ ] Save changes to DB and reflect in Storybook/global styles
- [ ] **Sync tokens between admin panel and Storybook**
  - [ ] Ensure Storybook always previews the latest DB-driven tokens (export/import or live sync in dev)

---

## 2. Refactor Shared Components to Use Tokens/Variants Only
- [ ] **Audit all shared components**
  - [ ] List all components in `src/components/ui` and `src/components/shared`
  - [ ] Identify any Tailwind, custom CSS, or hardcoded styles/components
  - [ ] Ensure every component is derived from shared UI components (no hardcoded styles/components)
- [ ] **Refactor each component**
  - [ ] Remove Tailwind classes and custom CSS
  - [ ] Use only variant props and token-based styles (from DB-driven tokens)
  - [ ] Ensure all variants are documented in Storybook
  - [ ] Add/expand prop tables and usage docs in Storybook
- [ ] **Add iOS-style transitions**
  - [ ] Create a shared `Transition` component (Framer Motion/React Spring)
  - [ ] Demo transitions in Storybook

---

## 3. Build Storybook as the Source of UI Truth & Configurator (for Devs Only)
- [ ] **Add a "Design Tokens" page**
  - [ ] Render all color, spacing, radii, typography, shadow tokens
  - [ ] Show live previews and code snippets
  - [ ] Add Storybook controls to adjust tokens live (for dev preview only; saving is in admin panel)
- [ ] **Add a "Global Styles" story**
  - [ ] Show base typography, backgrounds, etc.
  - [ ] Allow font/typography adjustments via Storybook controls (for dev preview only)
- [ ] **Add a "Layouts" section**
  - [ ] Build custom layouts (Dashboard, Auth, Admin, etc.) using only shared components
  - [ ] Document layout props and usage
- [ ] **Add a "Theming" story**
  - [ ] Show how to switch themes and override tokens (org/saas level)
  - [ ] Document `ThemeProvider` usage and DB integration

---

## 4. Accessibility & Theming Documentation
- [ ] **Add an "Accessibility Statement" page**
  - [ ] Describe WCAG goals, keyboard navigation, and accessibility mode
  - [ ] List supported ARIA roles, keyboard shortcuts, and focus management
- [ ] **Document Theming API and DB integration**
  - [ ] Expand docs on how to customize tokens and themes (from DB)
  - [ ] Add examples for organization-specific branding and white-labeling
  - [ ] Reference the Theme/Branding Admin checklist for runtime theming

---

## 5. Automated a11y Testing in Storybook
- [ ] **Integrate Storybook a11y addon**
  - [ ] Add `@storybook/addon-a11y` to project
  - [ ] Enable a11y panel for all stories
- [ ] **Add a11y checks to CI**
  - [ ] Configure GitHub Actions (or other CI) to run Storybook a11y tests on PRs
  - [ ] Fail PRs if new a11y issues are introduced

---

## 6. Migrate All Layouts and Pages
- [ ] **Audit all pages/layouts**
  - [ ] List all pages in each app (e.g., saas-admin, org-admin, etc.)
  - [ ] Identify any direct Tailwind/custom CSS usage or hardcoded components
  - [ ] Ensure all layouts/pages use only shared UI components and token-based layouts
- [ ] **Refactor to use only shared components/layouts**
  - [ ] Replace all custom CSS/Tailwind with shared components and token-based layouts
  - [ ] Remove legacy CSS files and Tailwind config
  - [ ] Ensure all layouts are demoed in Storybook

---

## 7. Enforce and Maintain the System
- [ ] **Add lint rules/code review checks**
  - [ ] Prevent reintroduction of Tailwind/custom CSS or hardcoded components
- [ ] **Schedule regular design system reviews**
  - [ ] Review tokens, components, and docs for consistency
- [ ] **Encourage Storybook contributions**
  - [ ] Add guidelines for adding new components/variants to Storybook

---

## 8. Final Review & Launch
- [ ] **Run full a11y and visual regression tests**
- [ ] **Review all documentation in `dev-plan`**
- [ ] **Announce new system to the team**
- [ ] **Plan for ongoing improvements and feedback**

---

*This checklist is exhaustive and atomic. Each task should be checked off only when fully complete and verified for design, accessibility, code quality, and white-labeling configurability at both SaaS and organization levels. For runtime theming/branding, see `theme-branding-admin-checklist.md`.* 