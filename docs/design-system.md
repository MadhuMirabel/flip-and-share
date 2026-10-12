# FlipAndShare design system

The source of truth for tokens and shared components. Values come from the Claude Design handoff ([README.md](../README.md), `design/FlipAndShare Prototype.dc.html`).

- **Tokens:** `@theme` in [src/app/globals.css](../src/app/globals.css)
- **Components:** [src/components/ui/](../src/components/ui/) (primitives) and [src/components/site/](../src/components/site/) (site chrome)
- **Live preview:** run `npm run dev` and open [/design-system](http://localhost:3000/design-system)

## Rules

1. **Use tokens, not literals.** Tailwind's default colours, radii and shadows are reset, so only FlipAndShare values exist. Writing `#6b7280` or `rounded-[9px]` is the only way to go off-system, and code review should catch it.
2. **Every call to action is a `<Button>`.** Use `href` for navigation (it renders a Next `<Link>`) and `onClick` for actions (it renders a `<button>`). Never put `onClick` on an `<a>` or `<div>`.
3. **Every form control is a `<Field>`.** It wires up the label, hint, error and screen-reader attributes for you.
4. **Text colour must be `gray-500` or darker on white.** `gray-400` is for placeholders and decoration only.
5. **Respect reduced motion.** It's handled globally in `globals.css`. Long loops also need a pause control (see the README accessibility list).

---

## Tokens

### Colour

| Token | Hex | Use |
|---|---|---|
| `ink-950` | #0b1f2e | Darkest surfaces, dark heroes, footer |
| `navy-900` | #0f2f45 | Dark panels, stat values |
| `navy-800` | #0c4a6e | Headings, secondary buttons, info toast |
| `navy-700` | #075985 | Hover on navy |
| `blue-700` | #0369a1 | Link hover, chips, dark-mode highlight |
| `blue-600` | #0284c7 | Links, hover on primary |
| `blue-500` | #0ea5e9 | Primary buttons, toggle on, chart accent |
| `blue-400` | #38bdf8 | Accents and focus on dark |
| `blue-300` | #7dd3fc | Eyebrows and links on dark |
| `blue-200` | #bae6fd | Borders, pale bars |
| `blue-100` | #e0f2fe | Tints, icon tiles, banners, cookie bar |
| `blue-50` | #f0f9ff | Lightest tint, hover rows |
| `gray-900` | #111827 | Body text |
| `gray-700` | #374151 | Labels, nav text |
| `gray-600` | #4b5563 | Long-form secondary text |
| `gray-500` | #6b7280 | Secondary text, eyebrows (lightest allowed for text) |
| `gray-400` | #9ca3af | Placeholders and decoration only (fails contrast) |
| `gray-300` | #d1d5db | Input borders, toggle off |
| `gray-200` | #e5e7eb | Card borders, dividers |
| `gray-100` / `gray-50` | #f3f4f6 / #f9fafb | Backgrounds |
| `slate-100` / `slate-50` | #f1f5f9 / #f8fafc | Soft dividers, backgrounds |
| `slate-300` / `slate-400` / `slate-500` | #cbd5e1 / #94a3b8 / #64748b | Text on dark surfaces |

**Accents:**
- amber: `100` #fef3c7, `200` #fde68a, `300` #fcd34d, `500` #f59e0b, `600` #d97706, `700` #b45309
- violet: `50` #f5f3ff, `100` #ede9fe, `200` #ddd6fe, `500` #8b5cf6, `700` #6d28d9, `950` #3b0764
- green: `100` #dcfce7, `300` #86efac, `600` #16a34a, `800` #166534
- teal: `100` #ccfbf1, `500` #14b8a6
- pink: `100` #fce7f3, `500` #ec4899
- red: `400` #f87171, `500` #ef4444, `600` #dc2626

**Extra shades from the prototype audit:**
- slate: `200` #e2e8f0, `700` #334155 (banner sub-copy), `800` #1e293b (lines on dark), `900` #0f172a (device screens)
- amber: `400` #fbbf24, `800` #92400e
- violet: `300` #c4b5fd (hero accent), `600` #7c3aed, `800` #5b21b6 (violet hover), `900` #4c1d95; purple `100` #f3e8ff / `800` #6b21a8 (video tag)
- green: `50` #f0fdf4 (success surface), `200` #bbf7d0, `400` #4ade80, `500` #22c55e, `700` #15803d, `900` #14532d; emerald `50` #ecfdf5, `200` #a7f3d0
- teal: `200` #99f6e4, `300` #5eead4, `700` #0f766e; cyan `50` #ecfeff (closing-banner gradient)
- pink: `200` #fbcfe8, `300` #f9a8d4, `700` #be185d; orange `300` #fdba74, `500` #f97316, `600` #ea580c
- red: `200` #fecaca, `300` #fca5a5 (error input border)
- `google-link` #1a0dab (SERP preview titles only)

The **pastel card set** is sky `blue-100`, amber `amber-100`, lavender `violet-100`, mint `green-100`, pink `pink-100` and teal `teal-100`.

### Typography

| Token | Size | Use |
|---|---|---|
| `text-display` | clamp(40, 6vw, 64) / 1.03 / -0.035em / 700 | Homepage hero only |
| `text-h1` | clamp(32, 4.5vw, 52) / 1.06 / -0.035em / 700 | Page heroes (one `<h1>` per page) |
| `text-h2` | clamp(24, 3.2vw, 38) / 1.12 / -0.025em / 700 | Section titles, `navy-800` |
| `text-h3` | 20 / 1.25 / 700 | Card titles |
| `text-lg` | 18 | Hero lead |
| `text-body-lg` | 17 / 1.6 | Long-form body |
| `text-body` | 15 / 1.55 | Default body, mobile nav |
| `text-body-sm` | 14.5 / 1.6 | Footer description |
| `text-sm` | 14 | Buttons, nav, inputs |
| `text-menu` | 13.5 | Dropdown titles |
| `text-label` | 13 | Compact titles |
| `text-small` | 12.5 / 1.4 | Labels, small print |
| `text-xs` | 12 | Errors, meta |
| `text-caption` | 11.5 / 1.35 | Menu descriptions |
| `text-eyebrow` | 11 | Eyebrows |
| `text-2xs` | 10.5 | Mega-menu column labels |

- **Families:** `font-sans` (system stack), `font-mono` (eyebrows, codes) and `font-hand` (notebook sketch only).
- **Tracking:** `tracking-eyebrow` is 0.12em.
- **Numbers:** add `tabular-nums` to figures.

### Radius

| Token | px | Use |
|---|---|---|
| `rounded-sm` | 6 | Inputs, buttons, badges with corners, small tiles (≤30px), chart bar tops, thumbnails, the focus ring |
| `rounded-md` | 8 | Extra-large buttons, menu items, social buttons, toast, 32–38px tiles |
| `rounded-lg` | 10 | Cards, panels, banners, modals, dropdowns, floating UI, 40px+ tiles (the largest radius) |
| `rounded-full` | — | Pills, chips, toggles, avatars, progress bars |

These are the only radii. There is no `rounded-xl` or `rounded-2xl`, and the tokens don't exist. Prototype values were snapped to the nearest one: 2–5px → sm, 7–9px → md, 11–16px → lg.

**One exception: device mockups.** Phone and tablet bezels in `DeviceFrames.tsx` keep their physical-device corners (26–38px, or a percentage on the iPhone). Illustration SVG `rx` values are drawing details, not UI radii.

### Elevation

| Token | Use |
|---|---|
| `shadow-tile` | White icon tiles |
| `shadow-knob` | Toggle knob |
| `shadow-card-hover` / `shadow-card-hover-violet` | Card hover lift |
| `shadow-float` | Floating UI cards in product scenes |
| `shadow-dropdown` | Nav dropdowns |
| `shadow-mega` | Use cases mega menu |
| `shadow-form` | Elevated form card |
| `shadow-cover` | Magazine covers |
| `shadow-toast` | Toast |
| `shadow-sheet` | Bottom bars and sheets (cookie bar, mobile editor) |
| `shadow-modal` | Large modals |
| `shadow-dialog` | Small modals (lead form, demo done) |
| `shadow-cta` / `shadow-cta-violet` | Glowing CTA buttons (`Button glow`) |
| `shadow-frame` | Browser mockups |
| `shadow-panel` | Dark code and quote panels |
| `shadow-lift` | Card hover lift |
| `shadow-tier` / `shadow-tier-hi` | Pricing tiers (normal / highlighted) |
| `shadow-stat` | At-a-glance stat strip |
| `shadow-avatar` | Floating avatars |

### Motion

| Token | Value | Use |
|---|---|---|
| `ease-fas` | cubic-bezier(.2, .8, .2, 1) | Entrances, toggles, slides |
| `duration-150` | 150ms | Hover colour |
| `duration-250` | 250ms | Toggles |
| `duration-300` | 300ms | Slides (arrow nudge, cover lift) |
| reveal | 700ms | Reveal on scroll (opacity, 18px rise) |

**Keyframes:** all 83 prototype animations are in [src/app/keyframes.css](../src/app/keyframes.css), copied verbatim and named `fas*`. Don't edit that file by hand. Where the prototype defined `fasDraw` twice, the later definition is kept, as CSS would.

**Effect classes** (in `globals.css`):
- `data-hovercard` on a card makes `.fas-fluidtile` blobs and `.fas-arrow` arrows react to hovering the whole card.
- `fas-dropzone` / `fas-sparkring` / `fas-sparkspin` / `fas-spark`: the hero drop-zone sparkle.
- `fas-book`: shelf book lift.
- `fas-range-dark`: range slider skin on dark; set `--p` to the fill percentage.
- `no-scrollbar`: hides the scrollbar on chip rows and tab strips.
- `[data-reveal]:not([data-shown])`: pauses child animations until `<Reveal>` shows the block.

**Layering:** the base element styles (`a`, `body`, focus ring) are in `@layer base`, so a `text-*` class on a link always wins.

### Layout

- **Container:** `<Container>` gives a `max-w-page` (1200px) width, 32px side padding (20px under 640px) and `box-border`.
- **Section padding:** 80px vertical as standard (64–88px). Sub-sections use 52–72px.
- **Spacing:** Tailwind's 4px scale. Use custom values only to match a measured prototype value.
- **Breakpoints:** 1100, 1040 (nav collapses), 1000, 900, 760, 640 and 560px.

---

## Components

### Button

`src/components/ui/Button.tsx`. One component for every call to action.

| Variant | Use when |
|---|---|
| `primary` | The main action: Sign up, Subscribe, Save |
| `navy` | Strong secondary on light tint (cookie Accept, "Plan my migration") |
| `outline` | Navy-bordered choice next to a navy button (Manage Cookies) |
| `neutral` | White with a gray-300 border that turns blue on hover (Export CSV, Cancel) |
| `light` | White with a blue-200 border and navy text ("Watch the demo", "Talk to Sales" on light) |
| `subtle` | White with a blue-200 border and blue text (mobile-menu Pricing) |
| `ghost` | Dismiss or negative choice (Reject non-essential) |
| `violet` | Sales and enterprise ("Talk to Sales →"); use with `glow` |
| `amber` | Webinar hero ("Save my seat") |
| `success` | Green confirmation action ("See analytics") |
| `onDark` | Secondary action on ink or navy heroes |
| `white` | Primary action on navy panels ("Change plan", ROI card) |
| `text` | Inline blue text action (Copy key, Edit, Add to calendar) |
| `danger` | Inline red text action (Delete, Remove) |
| `link` | Text link with a sliding arrow (header "→ Pricing") |

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | see above | `primary` | Colour style |
| `size` | `xs` \| `sm` \| `md` \| `lg` \| `xl` | `md` | xs/sm 13px · md 14px (10/18) · lg 15px (12/20) · xl 15px (14/22, banner CTAs) |
| `glow` | boolean | false | Adds the coloured CTA shadow (`shadow-cta`, or `shadow-cta-violet` on violet) |
| `shape` | `rounded` \| `pill` | `rounded` | A pill is fully rounded and bold |
| `radius` | `sm` | `md` | md for xl, sm otherwise | Corner override for the rounded shape (`rounded-sm` or `rounded-md`) |\| `md` | md for xl, sm otherwise | Corner override for the rounded shape |
| `href` | string | — | Renders a Next `<Link>` |
| `iconLeft` / `iconRight` | `IconName` | — | Icons slide on hover |
| `loading` | boolean | false | Shows a spinner, disables, sets `aria-busy` |
| `fullWidth` | boolean | false | Stretches to the container width |

| State | Visual | Behaviour |
|---|---|---|
| Default | Variant fill or border | — |
| Hover | Darker fill (primary goes to `blue-600`, navy to `navy-700`); link arrow moves 4px | 150ms colour transition |
| Focus | 2px `blue-500` outline, 2px offset | Global `:focus-visible` |
| Disabled | 50% opacity, not-allowed cursor | Not clickable |
| Loading | Spinner replaces the left icon | `aria-busy`, disabled |

**Accessibility:** native `<button type="button">` or `<a>`. Enter and Space work natively. Icons are hidden from screen readers.

**`IconButton`** (same file) is the round icon-only button for pagers (‹ ›), reader controls and close (×). `label` is required, `tone` is `light` | `dark` | `plain` | `float`, and `size` is 28, 32, 34 or 44.

| ✅ Do | ❌ Don't |
|---|---|
| `<Button href="/pricing">` for navigation | `<Button onClick={() => router.push(...)}>` |
| Use one primary per view region | Put two primaries side by side |
| Use the `radius` prop | Override with `className="rounded-…"` (classes conflict) |

```tsx
<Button href="/signup">Sign up / Sign in</Button>
<Button variant="link" href="/pricing" iconLeft="arrow">Pricing</Button>
<Button variant="navy" shape="pill" size="lg" onClick={accept}>Accept</Button>
<Button size="xl" glow href="/signup">Create for Free</Button>
<IconButton icon="next" label="Next page" tone="dark" size={44} />
<Button type="submit" loading={saving}>Save</Button>
```

### Field

`src/components/ui/Field.tsx`. The label, control, hint and error as one unit.

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | string | required | Always rendered; `hideLabel` makes it visible to screen readers only |
| `tone` | `light` \| `dark` | `light` | `dark` for ink or navy surfaces |
| `hint` | ReactNode | — | Linked through `aria-describedby` |
| `error` | string | — | Sets `aria-invalid`, red border, and announces via `role="alert"` |
| `required` | boolean | — | Adds a red asterisk that screen readers skip |
| `multiline` | boolean | false | Renders a `<textarea>` |
| `action` | ReactNode | — | Inline button beside the control, which wraps on narrow widths |
| …rest | input or textarea attributes | — | `type`, `autoComplete`, `value`, etc. |

| State | Visual |
|---|---|
| Default | 1px `gray-300` border (light) or white/18% (dark) |
| Focus | Border `blue-500` (light) or `blue-400` (dark), plus the focus ring |
| Error | Border `red-600` or `red-400`; message below |
| Disabled | Native disabled styling |

**Accessibility:** always pass `autoComplete` for personal data (`email`, `name`, `tel`, `organization`). Validate on submit, not on every keystroke.

```tsx
<Field label="Work email" type="email" autoComplete="email" required error={errors.email} />
<Field tone="dark" label="Email" hideLabel type="email" action={<Button type="submit">Subscribe</Button>} />
```

### Toggle

`src/components/ui/Toggle.tsx`. A 38×22 switch.

| Prop | Type | Description |
|---|---|---|
| `checked` | boolean | On or off |
| `onChange` | (next) => void | Called on change |
| `label` | string | Accessible name; required because the switch has no visible text |
| `disabled` | boolean | Grey at 50% opacity |
| `locked` | boolean | Shown on and pale blue, can't be changed (Necessary cookies, billing emails) |

**States:** off is `gray-300`; on is `blue-500` with the knob moved 16px; locked is `blue-300` at 70% opacity. The move takes 250ms with `ease-fas`.

**Accessibility:** `role="switch"` and `aria-checked`. Space and Enter toggle it.

### Eyebrow

`src/components/ui/Eyebrow.tsx`. A mono, uppercase label above sections.

| Prop | Values | Default |
|---|---|---|
| `tone` | `light` (gray-500), `dark` (blue-300), `amber` (amber-300) | `light` |
| `size` | `xs` 10.5px, `sm` 11px, `md` 11.5px bold | `sm` |
| `as` | `span`, `p`, `h2`, `h3` | `span` |

Use `as="h2"` when the label titles a region, such as footer columns. Write the text in sentence case; CSS uppercases it, so screen readers don't spell it out letter by letter.

### IconTile

`src/components/ui/IconTile.tsx`. A square icon holder.

| Prop | Values | Default |
|---|---|---|
| `name` | `IconName` | required |
| `tone` | `plain` (no fill), `white`, `sky`, `violet`, `amber`, `mint`, `pink`, `teal`, `gray` | `sky` |
| `size` | 26, 30, 40, 48 | 30 |

Corners are 6px up to 30px, 8px for 32–38px and 10px from 40px. The `gray` and `sky` tones make the Without / With FlipAndShare pair. The tile is always hidden from screen readers, so put the meaning in nearby text.

### Icon

`src/components/icons.tsx`. 44 stroke icons on a 24×24 grid with round caps; stroke 2, or 2.4 at 16px and below. They're hidden from screen readers by default; pass `aria-label` to make one meaningful. Lucide is the closest match if the set grows.

### Container

`src/components/ui/Container.tsx`. The 1200px page width with standard side padding. Takes an `as` prop for `section`, `header`, etc.

### Toast

Provided by `Providers`: call `const toast = useToast(); toast("Saved", "success")`.

| Tone | Colour | Use |
|---|---|---|
| `info` | `navy-800` | Neutral confirmation (default) |
| `success` | `green-800` | Completed actions |
| `error` | `red-600` | Failed actions |

It appears bottom centre for 2.6 seconds, with an 8px radius and `shadow-toast`. A visually hidden `aria-live="polite"` region announces it. Only one toast shows at a time; a new one replaces the old.

---

## Site components

### Header

`src/components/site/Header.tsx`.
- **Layout:** sticky, 95% white with an 8px backdrop blur.
- **Dropdowns:** Platform, Features and Resources, plus the full-width Use cases mega menu. They open on hover, or by keyboard through the chevron button, which reports open or closed (`aria-expanded`) and rotates 180° when open.
- **Closing:** Escape, a click outside, or navigating to another page.
- **Current page:** marked with `aria-current="page"`.
- **Mobile:** below 1040px the links collapse into the ☰ panel. "My account" shows only when signed in, and hides below 900px.
- **Data:** all links come from `src/lib/nav.ts`.

### Footer

`src/components/site/Footer.tsx`.
- **Background:** `ink-950` with a blue radial glow.
- **Top row:** a description with inline links, and the newsletter form.
- **Link columns:** 5, labelled as navigation regions. They become 3 columns below 980px and 2 below 600px.
- **Contact:** phone and email links, plus social icons.
- **Legal row.**
- **Search data:** organization details marked up for schema.org.

### NewsletterForm

A dark `Field` with an inline Subscribe button. It checks the email against `^[^@\s]+@[^@\s]+\.[^@\s]+$` on submit. Success shows "✓ You're subscribed." and announces it as a status message.

### CookieBanner

- **Layout:** a fixed bottom bar in `blue-100` with `shadow-sheet`. It slides up over 0.5s and is a labelled region, not a modal.
- **Buttons:** Accept (secondary pill) and Manage Cookies (outline pill).
- **Settings panel:** opens Necessary (locked), Analytics and Marketing toggles, then Reject non-essential (ghost pill) or Save choices (primary pill).
- **Storage:** `localStorage["fas_cookie_consent"]` holds `{necessary, analytics, marketing, at}`. Production should replace this with a real consent manager.

---

## Component catalogue

Everything below has a live example on `/design-system`. Props are typed and documented with JSDoc in each file, so read the file for the full API.

### Primitives: `src/components/ui/`

| File | Exports | Notes |
|---|---|---|
| Button.tsx | `Button`, `IconButton` | 15 variants, 5 sizes, pill, glow, loading |
| Field.tsx, fieldStyles.ts | `Field` | Sizes sm/md/lg, dark tone, prefix, counter, warning, labelSuffix, prototype focus ring |
| Select.tsx | `Select` | Native select, sm/md |
| Checkbox.tsx | `Checkbox` | |
| OtpInput.tsx | `OtpInput` | 6-digit code, numeric keypad, one-time-code autofill |
| SearchInput.tsx | `SearchInput` | hero / toolbar / dark / app, `role="search"` |
| RangeField.tsx | `RangeField` | light or dark (ROI) skin |
| CopyField.tsx | `CopyField` | Clipboard with toast and fallbacks |
| ChipGroup.tsx | `ChipGroup`, `ChipList` | Single-select (radiogroup, arrow keys) or multi-select; navy/primary/choice/violet/dark/darkGlass |
| SegmentedControl.tsx | `SegmentedControl` | gray / white / dark / mini; radio or tab semantics |
| BillingToggle.tsx | `BillingToggle` | Springy Monthly/Annual pill with "Save 20%" |
| RadioCardGroup.tsx | `RadioCardGroup` | Radio cards or icon option cards, blue or green accent |
| Toggle.tsx | `Toggle`, `SwitchTrack`, `ToggleRow`, `ToggleCard`, `SettingRow`, `ToggleButton` | sm/md/lg, blue/green, locked |
| PasswordStrength.tsx | `PasswordStrength`, `scorePassword` | 4-segment meter |
| Dropzone.tsx | `Dropzone` | Hero (sparkle ring) and app variants, real file input |
| Badge.tsx | `Badge`, `MethodBadge`, `Stamp`, `CouponCode`, `StoreBadge` | 16 tones, xs/sm/md, dot/pulse |
| Card.tsx | `Card`, `CardHeader`, `CardFooter` | default/tinted/navy/glass/elevated/dashed, hover lift or border |
| Avatar.tsx | `Avatar`, `AvatarStack`, `PEOPLE` | Presence dot, float, pop |
| Progress.tsx | `ProgressBar`, `BarRow`, `StackedBar`, `LegendSwatch` | Usage thresholds, dark tracks |
| Stat.tsx | `StatTile`, `StatRow` | metric / mini / hero / pastel / plain / kpi |
| Alert.tsx | `Alert` | success / info / warning / danger, box or banner |
| EmptyState.tsx, Divider.tsx | `EmptyState`, `Divider` | |
| CheckList.tsx | `CheckList` | ✓ / ✕, dark, inline trust row |
| KeyValueList.tsx | `KeyValueList` | Billing details with a summary row |
| LiveDot.tsx | `LiveDot`, `PulseMarker` | |
| Quote.tsx | `QuoteFigure`, `QuoteCard`, `PullQuote`, `TestimonialCard` | |
| Countdown.tsx | `Countdown` | hero and panel variants, hydration-safe |
| CodeBlock.tsx | `CodeBlock`, `ConfigBlock`, `TerminalWindow` | |
| Marquee.tsx | `Marquee`, `LogoPill`, `LogoWall` | Pause control, reduced-motion fallback |
| Tabs.tsx | `UnderlineTabs` | Full WAI-ARIA tabs |
| SubNav.tsx | `SubNav`, `PLATFORM_SUBNAV` | Sticky platform sub-navigation |
| Stepper.tsx | `Stepper` | pills / tabs / process / dark |
| Timeline.tsx | `Timeline` | changelog / numbered / years |
| NumberedSteps.tsx | `NumberedSteps`, `StepCard`, `StepCardGrid`, `SolutionSteps` | |
| Accordion.tsx | `Accordion`, `FaqSection` | divided (home) or cards; sticky-intro FAQ layout |
| Modal.tsx | `Modal` | Portal, focus trap, Escape, scroll lock, sm/md/lg |
| DataTable.tsx | `DataTable` | Grid table with roles, responsive columns |
| ComparisonTable.tsx | `ComparisonTable` | Plan matrix and competitor table |
| Reveal.tsx | `Reveal` | Scroll reveal (700ms, 18px), pauses child animations until shown |
| CountUp.tsx | `CountUp` | 1600ms ease-out, "x.xxM", SSR shows the final value |
| Eyebrow, IconTile, Container | | See above |

### Charts: `src/components/charts/`
`BarChart` (single, grouped or stacked, with markers), `Sparkline` and `KpiSparkTile` (light or dark), `AreaChart` (multi-series, unique gradient ids), `Donut`, `Heatmap`, `Legend`. Every chart has `role="img"` and an `aria-label`.

### Sections: `src/components/sections/`
`Section`, `SectionHeader`, `SplitSection`, `PageHero` and `HeroBackdrop` (with the `HERO_GLOW`, `HERO_ACCENT` and `HERO_PATTERN` maps for every page, plus `USE_CASE_HERO_BG`), `ClosingCtaBanner` and `CtaArt` (28 illustration kinds, `featureArt(slug)`), `InlineCtaStrip`, `SpecialistBanner`, `DarkPromoPanel`, `BeforeAfter`, `FeatureCellGrid`, `ContactStrip`, `ContactLinkCards`.

### Cards: `src/components/cards/`
`FeatureCard`, `ReasonCard`, `SelectableCard`, `RelatedCard` (`PASTEL_CYCLE`), `PricingTierCard` and `PricingTierGrid`, `BlogPostCard` (card, featured, compact), `VideoCard`, `IntegrationCard` and `IntegrationPill` (with the `INTEGRATIONS` data), `PersonCard`, `PublicationCard`, `MiniCover`, `ExamplePublicationCard`, `LinkChip`, `LinkChipCloud`, `ListRow`, `EditorListItem`.

### Mockups: `src/components/mockups/`
`BrowserFrame` (light or dark), `PhoneFrame`, `IPhoneFrame`, `TabletFrame`, `BookSpread`, `StripedPlaceholder`, `SkeletonLines`, `QrMatrix`, `SerpCard`, `SocialPreviewCard`, `SearchBarMock`.

### Product scenes: `src/components/scene/`
The "Issuu-style" scene kit (see `design/PROJECT_NOTES.md`):
- `SceneStage`, `SceneCard`, `SceneCover`, `SceneAvatar`, `SceneCursor`, `ScenePill`, `SceneLine`, `SceneLabel`, `SceneToggle`, `SceneBars` and `SceneIconDisc`, all on the shared 7-second loop (`SCENE_PERIOD`).
- `FakeCursor`: the demo cursor (arrow, hand or grab, with a press ripple).

### Still page-specific (built with the pages)
- **Homepage:** hero cover stack, the desk scene, the iPad reader demo, the wooden shelf and the month ruler.
- **Demo page:** the animated demo-call hero.
- **App screens:** the editor canvas and bottom sheet, and the reader.
- **Composed scenes:** each `tourScene` and `featScene` scene, assembled from the scene kit.
- **What's new:** the `MiniArt` illustrations.
