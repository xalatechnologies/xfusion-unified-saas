# Lint Fix Checklist

This checklist tracks all tasks and subtasks for fixing linting errors and warnings in the codebase. Check off each item as you complete it.

---

## 1. Syntax Errors
- [ ] **Fix parsing/syntax errors that break builds or Storybook**
    - [ ] `src/stories/Switch.stories.ts` (Parsing error at line 31)

---

## 2. Type Errors (`any` usage)
- [ ] **Replace all `any` types with specific types or `unknown`**
    - [ ] `src/apps/saas-admin/components/Layout/SaasAdminSidebarMenuItems.ts`
    - [ ] `src/apps/saas-admin/components/users/ChangeAvatarDialog.tsx`
    - [ ] `src/apps/saas-admin/components/users/CreateUserDialog.tsx`
    - [ ] `src/apps/saas-admin/components/users/EditUserDialog.tsx`
    - [ ] `src/apps/saas-admin/components/users/UserActions.tsx`
    - [ ] `src/apps/saas-admin/components/users/UserBulkActions.tsx`
    - [ ] `src/apps/saas-admin/components/users/UserExport.tsx`
    - [ ] `src/apps/saas-admin/components/users/UserFilters.tsx`
    - [ ] `src/apps/saas-admin/components/users/UserManagement.tsx`
    - [ ] `src/apps/saas-admin/components/users/UserStatsCards.tsx`
    - [ ] `src/apps/saas-admin/components/users/UsersOverview.tsx`
    - [ ] `src/apps/saas-admin/components/users/UsersTable.tsx`
    - [ ] `src/apps/saas-admin/components/users/create-user/CreateUserForm.tsx`
    - [ ] `src/apps/saas-admin/pages/SaasDocumentation.tsx`
    - [ ] `src/apps/saas-admin/pages/SaasThemes.tsx`
    - [ ] `src/apps/saas-admin/pages/SaasTranslations.tsx`
    - [ ] `src/apps/supplymantix/components/Layout/AppSidebarMenuItems.ts`
    - [ ] `src/components/organization/subscription/CurrentSubscriptionCard.tsx`
    - [ ] `src/components/organization/subscription/SubscriptionPlanCard.tsx`
    - [ ] `src/components/organization/subscription/SubscriptionPlansGrid.tsx`
    - [ ] `src/components/organization/subscription/UserLimitWarning.tsx`
    - [ ] `src/components/shared/Button.tsx`
    - [ ] `src/components/shared/Table.tsx`
    - [ ] `src/components/ui/ErrorBoundary.tsx`
    - [ ] `src/components/ui/badge.tsx`
    - [ ] `src/components/ui/globe.tsx`
    - [ ] `src/hooks/useBilling.ts`
    - [ ] `src/hooks/useOrganizationSettingsForm.ts`
    - [ ] `src/hooks/useSearchHistory.ts`
    - [ ] `src/lib/database/billing/subscriptions.ts`
    - [ ] `src/lib/database/organization-themes.ts`
    - [ ] `src/lib/database/searchResultTransformer.ts`
    - [ ] `src/lib/database/users.ts`
    - [ ] `src/pages/InviteAccept.tsx`
    - [ ] `src/types/auth.ts`
    - [ ] `supabase/functions/send-invitation/index.ts`

---

## 3. Empty Object Type/Interface Issues
- [ ] **Fix empty object/interface type errors**
    - [ ] `src/components/ui/ErrorBoundary.tsx`
    - [ ] `src/components/ui/command.tsx`
    - [ ] `src/components/ui/textarea.tsx`

---

## 4. Warnings
- [ ] **Address all warnings**
    - [ ] `src/components/shared/Button.tsx` (`react-refresh/only-export-components`)
    - [ ] `src/components/shared/Table.tsx` (`react-refresh/only-export-components`)
    - [ ] `src/components/ui/button.tsx` (`react-refresh/only-export-components`)
    - [ ] `src/components/ui/form.tsx` (`react-refresh/only-export-components`)
    - [ ] `src/components/ui/navigation-menu.tsx` (`react-refresh/only-export-components`)
    - [ ] `src/components/ui/sidebar.tsx` (`react-refresh/only-export-components`)
    - [ ] `src/components/ui/sidebar/context.tsx` (`react-refresh/only-export-components`)
    - [ ] `src/components/ui/sonner.tsx` (`react-refresh/only-export-components`)
    - [ ] `src/components/ui/toggle.tsx` (`react-refresh/only-export-components`)
    - [ ] `src/contexts/AuthContext.tsx` (`react-refresh/only-export-components`)
    - [ ] `src/contexts/LanguageContext.tsx` (`react-refresh/only-export-components`)
    - [ ] `src/contexts/ThemeContext.tsx` (`react-refresh/only-export-components`, `react-hooks/exhaustive-deps`)
    - [ ] `src/components/ui/globe.tsx` (`react-hooks/exhaustive-deps`)
    - [ ] `src/pages/InviteAccept.tsx` (`react-hooks/exhaustive-deps`)
    - [ ] `tailwind.config.ts` (`@typescript-eslint/no-require-imports`)

---

## 5. Verification
- [ ] **Run `npm run lint` and `npm run build` after each batch of fixes**
- [ ] **Review and test all affected areas for regressions**
- [ ] **Update documentation if any public APIs or types are changed**

---

**Progress Tracking:**
- Check off each file and error type as it is resolved.
- Update this checklist with any blockers, questions, or follow-up actions needed. 