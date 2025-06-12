# Unified SaaS Platform – High-Level Overview

## 1. Vision & Goals

Build a modern, scalable, and fully white-labelable SaaS platform that empowers organizations to customize, manage, and brand their experience. The platform will leverage a robust .NET Core backend, a React frontend with tokenized theming, and a flexible database (PostgreSQL or MongoDB) to support multi-tenancy, extensibility, and accessibility.

## 2. Core Features & Functionalities
- **Multi-Tenancy:** SaaS-level and organization-level data separation, with secure access control.
- **User Management:** Comprehensive admin tools for user CRUD, roles, statuses, and permissions.
- **Theming & Branding:** Real-time, DB-driven design tokens for colors, typography, radii, shadows, etc., supporting full white-labeling per org.
- **Shared Component Library:** All UI elements (buttons, cards, labels, etc.) are derived from a global library for consistent styling and easy branding.
- **Dashboard & Layouts:** Modern, elegant dashboards, sidebars, and topbars, inspired by Apple/Linear/Stripe, with responsive and accessible layouts.
- **API-First:** Structured REST API (and/or GraphQL) for all core entities, with strong validation and security.
- **Accessibility:** WCAG 2.0 AA compliance, universal design, and full keyboard/screen reader support.

## 3. Architecture Overview

### Backend (.NET Core)
- **Framework:** ASP.NET Core Web API
- **Patterns:** Repository Pattern, Domain-Driven Design (DDD) for maintainability and testability
- **Authentication:** JWT/OAuth2, multi-tenant aware
- **API:** RESTful endpoints for all entities (users, orgs, tokens, etc.)
- **Recommendations:**
  - Use MediatR for CQRS if complexity grows
  - Layered architecture: API → Application → Domain → Infrastructure
  - Unit/integration tests for all business logic

### Frontend (React)
- **Framework:** React (with Vite or Next.js for SSR if needed)
- **Styling:** Tokenized, DB-driven theming (CSS variables, JS tokens)
- **Component Library:** All UI built from shared components; no hardcoded styles
- **State Management:** React Query, Context, or Redux as needed
- **Routing:** React Router or Next.js routing
- **Accessibility:** Strict adherence to accessibility standards

### Database (PostgreSQL or MongoDB)
- **Preferred:** PostgreSQL for relational, multi-tenant schema (recommended for most SaaS)
- **Alternative:** MongoDB for document-centric or highly flexible data
- **Schema Highlights:**
  - `design_tokens` and `design_token_enums` tables for theming (see dev-plan docs)
  - Hierarchical org/saas-level overrides for tokens, users, and settings
  - Strong referential integrity and audit trails

## 4. Theming, White-Labeling & Design Tokens
- **Design Tokens:** Centralized, DB-driven tokens for all style primitives (colors, radii, typography, spacing, shadows, etc.)
- **Admin Panel:** UI for org/saas admins to adjust tokens in real time, with live preview and save/apply flow
- **Token Injection:** Tokens loaded on login/app load, injected as CSS variables and JS tokens
- **Overrides:** Org-level tokens override SaaS/global defaults; enums for font sizes, radii, etc.
- **No Storybook for Runtime:** Storybook is deprioritized; focus is on runtime theming and admin UX

## 5. UI/UX Principles
- **Inspiration:** Apple, Linear, Stripe – modern, minimal, elegant, and inspiring
- **Principles:** Clarity, depth, micro-interactions, and universal usability
- **Responsiveness:** All layouts/components adapt to all screen sizes
- **Micro-Interactions:** Smooth transitions, focus states, and feedback

## 6. Component Library & Reuse
- **Global Library:** All UI elements (buttons, labels, cards, menus, badges, etc.) are shared and reused
- **No Duplication:** Strictly avoid custom or hardcoded components/styles
- **Token-Based:** All styling is derived from design tokens for easy white-labeling
- **Documentation:** All components and tokens are documented for dev and admin reference

## 7. Accessibility & Universal Design
- **WCAG 2.0 AA:** All UI meets/exceeds color contrast, font size, and interaction standards
- **Touch Targets:** Min 44x44px for all interactive elements
- **Focus States:** High-contrast, visible focus for all controls
- **ARIA & Screen Reader:** Full support for ARIA roles, labels, and state announcements
- **Keyboard Navigation:** All features accessible via keyboard
- **Responsive:** All components and layouts are mobile-friendly

## 8. Next Steps & Recommendations
1. **Finalize DB Schema:** Confirm PostgreSQL schema for tokens, users, orgs, and settings
2. **Scaffold .NET Core API:** Set up solution structure, implement repository pattern, and DDD layers
3. **Bootstrap React App:** Set up shared component library, theming system, and routing
4. **Build Theming Admin Panel:** Implement token CRUD, live preview, and save/apply flow
5. **Refactor UI:** Ensure all UI uses shared components and token-based styling
6. **Accessibility Review:** Test all flows for accessibility and universal design
7. **Document Everything:** Keep `/dev-plan` updated with architecture, tokens, and component docs

---

*This document is a living overview. Update as the platform evolves and new requirements emerge.* 