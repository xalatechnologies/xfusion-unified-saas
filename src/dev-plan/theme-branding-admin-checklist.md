# Theme/Branding Admin Panel Checklist

## Overview & Goals

The Theme/Branding Admin panel enables SaaS and organization admins to fully customize the look and feel of their application in real time, supporting white-labeling and brand consistency. All changes are persisted to the database and reflected live for the organization or platform. This system is the runtime, user-facing counterpart to the developer-focused Storybook.

---

## 1. Database Schema & Backend

### 1.1 Design Tokens Table Structure
```sql
CREATE TABLE design_tokens (
  id SERIAL PRIMARY KEY,
  org_id UUID NULL,           -- null for saas/global tokens, set for org-specific
  saas_id UUID NULL,          -- null for org tokens, set for saas/global
  token_key VARCHAR(64) NOT NULL,  -- e.g. 'color.primary', 'font.size.body'
  token_value VARCHAR(128) NOT NULL, -- e.g. '#0055ff', '18px', 'smaller'
  token_type VARCHAR(32) NOT NULL,   -- e.g. 'color', 'font-size', 'radius', 'shadow'
  enum_key VARCHAR(32) NULL,         -- e.g. 'smaller', 'larger' (for enums)
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(org_id, saas_id, token_key)
);
```

### 1.2 Enum Table for Adjustable Values
```sql
CREATE TABLE design_token_enums (
  id SERIAL PRIMARY KEY,
  enum_type VARCHAR(32) NOT NULL,    -- e.g. 'font-size', 'radius'
  enum_key VARCHAR(32) NOT NULL,     -- e.g. 'smaller', 'larger', 'initial'
  enum_value VARCHAR(64) NOT NULL,   -- e.g. '14px', '20px', '16px'
  description TEXT NULL,
  UNIQUE(enum_type, enum_key)
);
```

### 1.3 Example: Org/SaaS-Level Override
- If an org has a value for a token, use it; otherwise, fall back to the saas/global value.

### 1.4 Example Token JSON for Frontend
```json
{
  "color.primary": "#0055ff",
  "color.secondary": "#f5f5f5",
  "font.size.body": "smaller",
  "font.size.heading": "larger",
  "radius.card": "md",
  "shadow.card": "0 2px 8px rgba(0,0,0,0.08)"
}
```
- The frontend can resolve enums (e.g., `smaller`) to pixel values using the `design_token_enums` table.

### 1.5 API Endpoints
- `GET /api/design-tokens?org_id=...` — fetch all tokens for an org (with fallback to saas/global)
- `POST /api/design-tokens` — create/update a token
- `DELETE /api/design-tokens/:id` — delete/reset a token
- `GET /api/design-token-enums?type=font-size` — fetch all font size enums
- All endpoints require proper authentication and permissions (super-admin/org-admin only for write)

### 1.6 Security/Permissions
- Only super-admins/org-admins can create/update/delete tokens for their org
- SaaS-level tokens can only be managed by platform super-admins
- All reads are public to authenticated users for their org/saas

---

## 2. Admin UI Requirements
- [ ] **Access control**
  - [ ] Only super-admins/org-admins can access the panel
- [ ] **Token controls**
  - [ ] Color pickers for all color tokens (primary, secondary, accent, error, etc.)
  - [ ] Dropdowns for font size enums (initial, smaller, larger, etc.)
  - [ ] Font family selector (from allowed list)
  - [ ] Controls for border radius, border width, shadow, spacing, etc.
  - [ ] Reset to default button for each token
- [ ] **Live preview**
  - [ ] Show a live preview of the app or key layouts/components with current token values
  - [ ] Changes update preview instantly (before saving)
- [ ] **Save & apply flow**
  - [ ] Save button persists changes to DB
  - [ ] Show success/error toasts
  - [ ] Option to discard changes
- [ ] **Theme switching**
  - [ ] Allow switching between org and saas/global theme for preview/comparison

---

## 3. Integration with Global Styles & ThemeProvider
- [ ] **Token loading**
  - [ ] On login/app load, fetch tokens for current org/saas
  - [ ] Inject tokens as CSS variables and JS tokens
- [ ] **ThemeProvider**
  - [ ] Update ThemeProvider to use tokens from DB (with fallback to defaults)
  - [ ] Support hot-reloading of tokens on change
- [ ] **Sync with Storybook/dev tokens**
  - [ ] Ensure devs can preview org/saas tokens in Storybook (optional: export/import)

---

## 4. QA, Testing, and Rollout
- [ ] **Unit and integration tests**
  - [ ] Test token CRUD, permissions, and UI controls
- [ ] **Accessibility testing**
  - [ ] Ensure all controls are keyboard and screen reader accessible
- [ ] **Visual regression testing**
  - [ ] Snapshot previews before/after token changes
- [ ] **Rollout plan**
  - [ ] Beta with select orgs/admins
  - [ ] Announce and document for all users

---

*This checklist is exhaustive and atomic. Each task should be checked off only when fully complete and verified for design, security, and user experience. For DB schema and API, see section 1 above.* 