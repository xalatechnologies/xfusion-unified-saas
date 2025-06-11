# Design Tokens Reference

This document lists all design tokens used in the project, including their JS and CSS variable names, values, and accessibility notes.

---

## Colors

| Token Name (JS)      | CSS Variable              | Value                                      | Usage/Notes                                  |
|----------------------|---------------------------|--------------------------------------------|----------------------------------------------|
| primary              | --color-primary           | #2563eb                                    | Main brand color                             |
| primaryGradient      | --color-primary-gradient  | linear-gradient(90deg, #2563eb 0%, #6366f1 100%) | For backgrounds, buttons, highlights   |
| secondary            | --color-secondary         | #6366f1                                    | Secondary brand color                        |
| accent               | --color-accent            | #f59e42                                    | Use for backgrounds, icons, badges           |
| accentText           | --color-accent-text       | #b26a1a                                    | Use for text on light backgrounds (WCAG AA)  |
| accentGradient       | --color-accent-gradient   | linear-gradient(90deg, #f59e42 0%, #fbbf24 100%) | Accent backgrounds, badges            |
| background           | --color-background        | #f9fafb                                    | App background                               |
| surface              | --color-surface           | #ffffff                                    | Card, popover, modal backgrounds             |
| border               | --color-border            | #e5e7eb                                    | Borders, dividers                            |
| text                 | --color-text              | #1e293b                                    | Main text color                              |
| muted                | --color-muted             | #64748b                                    | Muted/secondary text                         |
| success              | --color-success           | #10b981                                    | Success state                                |
| warning              | --color-warning           | #f59e42                                    | Warning state                                |
| error                | --color-error             | #ef4444                                    | Error state                                  |
| info                 | --color-info              | #3b82f6                                    | Info state                                   |
| destructive          | --color-destructive       | #ef4444                                    | Destructive actions                          |
| card                 | --color-card              | #ffffff                                    | Card background                              |
| cardBorder           | --color-card-border       | #e5e7eb                                    | Card border                                  |
| cardShadow           | --color-card-shadow       | rgba(0,0,0,0.04)                           | Card shadow                                  |
| popover              | --color-popover           | #ffffff                                    | Popover background                           |
| popoverBorder        | --color-popover-border    | #e5e7eb                                    | Popover border                               |
| popoverShadow        | --color-popover-shadow    | rgba(0,0,0,0.08)                           | Popover shadow                               |
| shadowXs             | --shadow-xs               | 0 1px 2px 0 rgba(16, 24, 40, 0.05)         | Small shadow                                 |
| shadowMd             | --shadow-md               | 0 4px 8px 0 rgba(16, 24, 40, 0.10)         | Medium shadow                                |
| shadowLg             | --shadow-lg               | 0 8px 24px 0 rgba(16, 24, 40, 0.12)        | Large shadow                                 |
| blurMd               | --blur-md                 | 8px                                       | For glassmorphism effects                    |

---

## Radii

| Token Name (JS) | CSS Variable   | Value    | Usage/Notes                  |
|-----------------|----------------|----------|------------------------------|
| sm              | --radius-sm    | 4px      | Small elements, badges       |
| md              | --radius-md    | 8px      | Buttons, cards, inputs       |
| lg              | --radius-lg    | 16px     | Large cards, modals          |
| full            | --radius-full  | 9999px   | Fully rounded (circle/pill)  |

---

## Typography

| Token Name (JS) | CSS Variable         | Value                        | Usage/Notes                  |
|-----------------|----------------------|------------------------------|------------------------------|
| fontFamily      | --font-family        | Inter, system-ui, sans-serif | Main font stack              |
| fontSize.xs     | --font-size-xs       | 12px                         | Caption, small text          |
| fontSize.sm     | --font-size-sm       | 14px                         | Secondary text, labels       |
| fontSize.md     | --font-size-md       | 16px                         | Body text (min for access.)  |
| fontSize.lg     | --font-size-lg       | 20px                         | Headings, large text         |
| fontSize.xl     | --font-size-xl       | 24px                         | Headings                     |
| fontSize.2xl    | --font-size-2xl      | 32px                         | Hero, large headings         |
| fontWeight.regular | --font-weight-regular | 400                      | Normal text                  |
| fontWeight.medium  | --font-weight-medium  | 500                      | Medium emphasis              |
| fontWeight.bold    | --font-weight-bold    | 700                      | Bold text, headings          |
| lineHeight.tight   | --line-height-tight   | 1.2                      | Tight line height            |
| lineHeight.normal  | --line-height-normal  | 1.5                      | Default line height          |
| lineHeight.relaxed | --line-height-relaxed | 1.7                      | Relaxed line height          |

---

## Spacing

| Token Name (JS) | CSS Variable   | Value    | Usage/Notes                  |
|-----------------|----------------|----------|------------------------------|
| xs              |                | 4px      | Small gaps, icon padding     |
| sm              |                | 8px      | Small padding, gaps          |
| md              |                | 16px     | Default padding, margin      |
| lg              |                | 24px     | Card/content padding         |
| xl              |                | 32px     | Section padding              |
| 2xl             |                | 40px     | Large section padding        |

---

**Accessibility Notes:**
- All text tokens meet or exceed WCAG 2.0 minimums for size and contrast.
- Use `accentText`/`--color-accent-text` for accent text on light backgrounds.
- Use at least `md` radii for touch targets (8px+ recommended).
- Use shadow and blur tokens for consistent elevation and glassmorphism effects. 