# Shared Components

This folder is for **composite, business, or multi-app components** that are reused across multiple applications or major features.

- Only add components here if they:
  - Compose multiple UI primitives (from `../ui`)
  - Encapsulate business logic, layout, or branding
  - Are used in more than one app or major feature

**Do not** add simple pass-through re-exports of UI primitives here. Import primitives directly from `../ui` in your app code.

**Examples of good shared components:**
- `ApplicationSwitcher.tsx`
- `PageHeader.tsx`
- `FilterPopover.tsx`
- Custom `Sidebar` or `Layout` components

This keeps the codebase clean, maintainable, and ready for white-labeling or branding. 