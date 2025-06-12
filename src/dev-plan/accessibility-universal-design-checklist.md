# Accessibility & Universal Design Checklist

## Overview

Accessibility and universal design are core requirements for the SaaS platform. All features, flows, and layouts must meet or exceed WCAG 2.0 AA standards, support keyboard navigation, ARIA, color contrast, and screen reader support. This checklist covers global accessibility requirements, testing, and documentation for the entire platform.

---

## 1. Global Accessibility Standards
- [ ] Set base font size to at least 16px for all text
- [ ] Ensure all color pairs meet or exceed WCAG 2.0 AA contrast ratios
- [ ] Implement visible, high-contrast focus states for all interactive elements
- [ ] Ensure all interactive elements are accessible via keyboard (Tab/Shift+Tab)
- [ ] Add ARIA roles, labels, and descriptions to all controls and layouts
- [ ] Ensure all controls and states are announced by screen readers
- [ ] Ensure all clickable elements have a minimum touch target of 44x44px
- [ ] Make all layouts and flows responsive for all screen sizes
- [ ] Add skip-to-content and landmark navigation
- [ ] Add accessibility mode toggle (extra outlines, hints, etc.)

## 2. Keyboard Navigation & ARIA
- [ ] Ensure all dialogs, menus, and overlays are keyboard accessible
- [ ] Add keyboard shortcuts for common actions (where appropriate)
- [ ] Ensure focus is trapped in modals and restored on close
- [ ] Add ARIA live regions for dynamic content updates
- [ ] Add ARIA attributes for all custom controls
- [ ] Test all flows with keyboard only

## 3. Screen Reader & Assistive Tech Support
- [ ] Test all flows with major screen readers (VoiceOver, NVDA, JAWS)
- [ ] Add screen reader labels and descriptions to all controls
- [ ] Ensure all state changes are announced (e.g., validation, errors, success)
- [ ] Add visually hidden text for context where needed
- [ ] Document screen reader support and known issues

## 4. Testing & QA
- [ ] Run automated accessibility tests (axe, Lighthouse) on all pages and flows
- [ ] Write manual accessibility test cases for all critical flows
- [ ] Test all layouts and flows on mobile, tablet, and desktop
- [ ] Collect feedback from users with accessibility needs (if possible)
- [ ] Iterate and fix any accessibility or usability issues found

## 5. Documentation & Training
- [ ] Document all global accessibility requirements in markdown
- [ ] Add accessibility notes to all component and flow docs
- [ ] Add a global accessibility statement in the app and docs
- [ ] Provide training/guidelines for devs and designers on accessibility best practices
- [ ] Add troubleshooting and FAQ section for common accessibility issues

---

*All boxes must be checked before Accessibility & Universal Design is considered finalized. This checklist is exhaustive and atomic. Each task should be checked off only when fully complete and verified for accessibility, usability, and compliance.* 