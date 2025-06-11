# Project Structure & UI Consistency Checklist

## 1. UI Consistency
- [x] All UI components must be imported from `src/components/shared/` (never from `ui/` or any other source in features/pages).
- [x] No direct use of HTML or ad-hoc styling in features—always use shared components.
- [x] All new UI primitives or advanced components (e.g., DataTable, Toolbar, Popover) must be created in `shared/` and reused everywhere.

## 2. Feature Organization
- [x] Each feature/module gets its own folder under `src/apps/saas-admin/components/` (e.g., `users/`, `organizations/`, `billing/`).
- [x] Feature components only use shared UI and never import from `ui/` or duplicate code.
- [x] No business logic in feature components—only UI and composition.
- [x] Move all relevant pages for each app into `src/apps/[app]/pages/` for modularity and structure.

## 3. Business Logic & Data
- [x] All data fetching, mutations, and business logic must be in `src/lib/database/` or `src/hooks/`.
- [x] No direct API/database calls in feature components or pages.

## 4. Pages
- [x] Pages in `src/pages/` are thin: they only compose feature modules and shared UI.
- [x] No business logic or direct UI primitives in pages.

## 5. State & Context
- [x] Global state (auth, theme, etc.) is managed in `src/contexts/` and accessed via hooks.

## 6. Type Safety
- [x] All types/interfaces are defined in `src/types/` and imported where needed.

## 7. Clean Up & Consistency
- [x] Audit `src/shared/` (the one outside `components/`) and migrate any useful code to the correct `src/components/shared/` location.
- [x] Delete `src/shared/` if it's not the canonical shared UI library.
- [x] Search for and remove any other duplicate or legacy shared/UI folders.
- [x] Update all imports throughout the codebase to use only the canonical `src/components/shared/`.
- [ ] Document the structure and rules in `README.md` or a CONTRIBUTING guide.

---

## Folder Clean-Up Tasks
- [x] Audit `src/shared/` and migrate or delete as needed.
- [x] Remove any unnecessary or legacy folders (e.g., `@/shared`).
- [x] Ensure all imports are absolute and consistent (e.g., `@/components/shared/Button`).

---

## Visual Diagram
```
src/
  components/
    shared/         <-- All UI primitives & advanced shared UI
    ui/             <-- (Legacy, only for migration)
    ...features...  <-- Feature-specific UI, only using shared
  apps/
    saas-admin/
      components/
        users/
        organizations/
        billing/
        ...
      pages/        <-- All app-specific pages
  lib/
    database/       <-- All business logic, API, data
  hooks/            <-- Custom React hooks
  contexts/         <-- Global state/context
  types/            <-- TypeScript types/interfaces
  pages/            <-- Thin route/page files
``` 