# Handoff: FlipAndShare marketing site + product demo

## Overview
FlipAndShare is a Mirabel Technologies product that turns print PDFs into interactive flipbooks with links, video, lead forms, QR codes, shoppable ads and analytics, publishing to Magazine Central (the public store).

This package covers the full **marketing website** plus a **clickable product demo**. The goal of the site is lead conversion: visitors upload a PDF, sign up, see their issue published, and are shown analytics and revenue. Other routes are Book a demo, Pricing and Talk to Sales.

Positioning: *Create → Publish → Engage → Measure*. Competitors (Issuu, Flipsnack, FlippingBook, Yumpu, Heyzine, Publuu) stop at "make and share"; FlipAndShare adds the publishing business around it (Ad Manager, advertiser click reports, QR, shoppable pages, Magazine Manager integration).

## About the design files
The files in `design/` are **design references built in HTML**: prototypes that show the intended look, copy and behaviour. They are **not production code to ship**.

Recreate these designs in the target codebase's existing stack (React/Next.js, Vue, etc.), using its established patterns, router, component library and data layer. If no stack exists yet, Next.js (App Router) + React + Tailwind or CSS Modules is a good fit: the site is mostly static marketing pages with a few interactive islands.

The prototype is one large single-page file. Each "screen" below should become its own route/page in the real app. All styles are inline in the prototype. Extract them into the codebase's design tokens and components, and don't copy inline styles.

## Fidelity
**High-fidelity.** The colours, type scale, spacing, copy, hover states and animations are final. Recreate the UI pixel-close using the codebase's own primitives.

Figures, customer names, stats, invoices, webinar sessions and plan limits are **sample content** unless stated otherwise. Replace them with real data and confirm with the product/marketing owner before launch.

## Opening the reference
Open `design/FlipAndShare Prototype.dc.html` in a browser, keeping `support.js` and `assets/` beside it. `design/FlipAndShare Prototype.html` is a self-contained offline bundle of the same thing; magazine covers load from mirabelsmagazinecentral.com and need a connection.

The reference has props, shown in the host's Tweaks panel; in code they are `this.props.*`:
- `startScreen`: which screen opens first (Homepage, Pricing, Library…)
- `startSignedIn`: start in the signed-in app
- `autoDemo`: autoplay the guided cursor demo
- `shopPage`, `qrPage`, `qrLeft`…: page numbers and QR position for the homepage reader demo

## Information architecture

### Top navigation (sticky, 64px, white 95% + 8px backdrop blur, 1px #e5e7eb bottom border)
Logo (`assets/logo-flipandshare.png`, 26px tall) · **Platform ▾** · **Features ▾** · **Use cases ▾** (full-bleed mega menu) · **Resources ▾** · **Store** (routes to Examples / Magazine Central page) · right side: **→ Pricing** (blue #0284c7, arrow slides on hover) · **My account** (blue, shown when signed in) · **Sign up / Sign in** (primary button #0ea5e9).

Below 900px the links collapse into a ☰ panel: sections PLATFORM / FEATURES / USE CASES / RESOURCES / COMPANY, with 30px top padding and a 1px #e5e7eb divider between sections. At the bottom are Book a demo, My account, Pricing and Sign up / Sign in.

Dropdown items: a 30px icon (link colour, no tile background) + title (13.5px/600) + one-line description (11.5px #6b7280). The Use cases mega menu spans the full viewport width (white, 1px top border, shadow `0 24px 40px -20px rgba(12,74,110,.28)`). Its content is a 1200px container with columns **By industry** (2 sub-columns) · **By content type** (2 sub-columns) · 250px column holding two pastel cards: All use cases (sky gradient) and Enterprise (lavender gradient).

### Routes / screens
| Route | Screen | Purpose |
|---|---|---|
| `/` | Homepage | Primary conversion page |
| `/signup` | Sign up / Sign in | Auth (gated after "Choose a file") |
| `/app/library` | Library | Signed-in home: publications grid |
| `/app/upload` | Upload | PDF upload with progress |
| `/app/editor` | Editor | Add links, video, forms, ads to pages |
| `/app/publish` | Publish | Access, SEO, share link/QR, publish gates |
| `/app/analytics` | Analytics | Tabs: Publishing · Audience · Revenue · Interactivity |
| `/app/account` | My account | Tabs: Profile · Usage & limits · Billing & payment · Invoices · Notifications |
| `/read/:id` | Reader | Fullscreen flipbook reader |
| `/platform` | Product overview | "Issuu-style" animated scenes |
| `/platform/analytics` | Analytics tour | Auto-playing dark dashboard tour |
| `/platform/qr` | QR Codes | |
| `/platform/ad-manager` | Ad Manager | |
| `/platform/collaboration` | Collaboration | Roles, comments, approvals demo |
| `/platform/ai` | AI & Automation | |
| `/platform/mobile` | Mobile app | Offline reading story |
| `/features` | All features | |
| `/features/:slug` | Feature page (×8) | share, embed, links, access, forms, sales, seo, social |
| `/use-cases` | Solutions hub | |
| `/use-cases/:slug` | Use case (×17) | 9 by industry, 8 by content type |
| `/pricing` | Pricing | Tiers, monthly/annual toggle, ROI calculator, FAQ |
| `/enterprise` | Enterprise | SSO, white label, custom domains, API |
| `/why-us` | Why us | Capability comparison table (moved off the homepage) |
| `/demo` | Book a demo | 3-step form + calendar |
| `/company` | Company | About Mirabel, contact |
| `/blog` | Blog | |
| `/resources` | Resource center | |
| `/resources/webinars` | Webinars | Upcoming + recordings |
| `/resources/templates` | Templates | Template library |
| `/customers` | Customers | Case studies |
| `/whats-new` | What's new | Changelog |
| `/integrations` | Integrations | |
| `/store` | Examples / Magazine Central | Wooden shelf by category → external category pages |

External links:
- Store categories go to `https://www.mirabelsmagazinecentral.com/Publication/Category/<category>` (e.g. `/business`).
- The footer "Products" column links to the other Mirabel products: Digital Studio, Magazine Manager, Marketing Manager, Newspaper Manager and Magazine Central.

Contact details, used everywhere they appear: **+1 (954) 462-4579** (as a `tel:` link) and **info@mirabeltechnologies.com** (as a `mailto:` link).

## Key flows

### 1. Primary conversion (homepage hero → published issue)
1. Hero drop zone ("Choose a file", with a PDF icon; on hover a spark ring animates around the box; the border goes to 40% opacity).
2. **Choose a file → Sign up / Sign in** (sign-up first, by product decision). The copy under the drop zone reads: *"Free account, no credit card. Free plan includes 1 publication for the first month."*
3. Create the account, which **publishes immediately**, then open Upload → Editor → Publish → Analytics in the app shell.
4. The header "Create for Free" / "Sign up / Sign in" button routes to auth. "Pricing" routes to /pricing.

### 2. Guided auto-demo (optional, `autoDemo`)
A black arrow cursor (SVG path `M1 1l6 18 3-7 7-3z`, white 1.5px stroke) drives the app on its own: it moves, clicks (scales to .85) and types. There is a **Skip demo** control. Pressing **Pause** fully stops autoplay. While paused, clicking a step only jumps to that step and does **not** resume autoplay. Play resumes.

### 3. Book a demo (`/demo`)
- **Step 1, details:**
  - Fields: name*, work email* (validated against `^[^@\s]+@[^@\s]+\.[^@\s]+$`), company*, phone (optional).
  - Publications per year: pills 1–4 / 5–12 / 13–50 / 50+.
  - "What would you like to see?": multi-select chips for 8 topics.
  - Optional note.
- **Step 2, time:** month calendar (current + next month). Only weekdays within 30 days are bookable. Time-zone select (ET/CT/MT/PT), a 2-column slot grid, then **Book the call**.
- **Step 3, confirmed:** "You're booked, {first name}.", Add to calendar (.ics), Start a free account, Change the time.
- **Right column:** What to expect (4 timed steps), Prefer to talk now (phone + email cards), Just want to try it.
- **Entry points:** every "Talk to Sales" button, Pricing Business tier, the Company sales card, the footer, the mobile menu, and "Plan my migration" (pre-selects the *Switching tools* topic).
- **Hero:** right side has a 10s looping animated "live demo call" scene: video-call window, specialist tile, PDF → flipbook spread, Link / video / Ad pins, a reads chart, then a "Live flipbook in 12 min" pill. Hidden below 900px; honours `prefers-reduced-motion`.

### 4. My account (`/app/account`)
- **Profile:**
  - Avatar and details form (name, email, company, job title, phone, time zone), with Save / Cancel.
  - Change password expands inline: current, new (4-bar strength meter: length ≥8, mixed case, digit, symbol → Weak/Fair/Good/Strong in #dc2626/#f59e0b/#0ea5e9/#16a34a), and confirm (live "Passwords don't match").
  - Two-step verification card:
    - Off: "Turn on". Step 1: pick a method, Authenticator app (Recommended) or SMS.
    - Step 2a, app: QR code, setup key with Copy, 6-digit code input. Step 2b, SMS: phone number, Send code, 6-digit code input.
    - Step 3: 10 backup codes with Download, Copy, and "Done, turn it on".
    - On: green shield, plus Backup codes and Turn off.
- **Usage & limits:** current plan card (navy gradient), then 8 limit cards with animated bars. At ≥80% a card turns amber (#f59e0b) and shows "Add more on Business". Unlimited items show a full pale bar labelled "of unlimited".
- **Billing & payment:**
  - Saved cards: Default badge, Make default, Remove. Add card form auto-formats the number in groups of 4 and detects the brand from the first digit (3=Amex, 4=Visa, else Mastercard).
  - Billing cycle radio: Annual is green with a "Save 20%" badge; Monthly is blue. The next-charge line updates with the choice.
  - Billing details, then a Cancel subscription link.
- **Invoices:** year filter, table (Invoice · Date · Description · Amount · Status · PDF), and Download all.
- **Notifications:** Email / In-app toggles per event, in groups: Publishing, Audience and revenue, Account. Billing and new-sign-in emails are locked on.

### 5. Webinars (`/resources/webinars`)
- **Hero:** next-session card with a countdown and Save my seat.
- **Upcoming list:** topic filter (All / Ad sales / Production / Analytics / Getting started). Each row: date tile · topic pill · time & length · speakers · Save my seat. That button expands an inline name + email form; once registered the row shows "You're registered" and Add to calendar.
- **Recordings:** 3-column grid. Clicking opens a modal player with play/pause, a progress bar and clickable chapters.

### 6. Cookie consent (first visit)
- Fixed bottom bar, #e0f2fe background, slides up over .5s.
- Copy: *"At FlipAndShare.com, we use cookies to improve your browsing experience, understand how our site is used, and deliver personalized content and ads. For more information, please check our Cookie Policy."*
- Buttons: Accept (navy filled, pill) and Manage Cookies (navy outline, pill). Manage opens toggles for Necessary (locked), Analytics and Marketing, plus Reject non-essential and Save choices.
- The choice is persisted (the prototype uses `localStorage` key `fas_cookie_consent`; production should use a real consent manager).
- Confirm the final domain and add a Cookie Policy page; that link currently opens the settings.

## Homepage section order (top → bottom)
1. **Hero:** "Turn PDFs into interactive digital experiences."
   - Left: copy and the upload drop zone.
   - Right: a stack of 3 magazine covers. On scroll, the third cover drops into the "magazine holder", then ads, video, form and link pins animate on.
   - Analytics card beside it: values start at zero and count up after the interactions are placed. It then keeps updating with small random changes.
   - The hero animation runs **once per page load** and does not replay when scrolling back up.
   - Covers rotate between a few sets on refresh. The first load always shows the latest issues.
2. **Trust stats strip:** count-up stat cards with icons (publishers, publications, years, reads).
3. **"Everything from first draft to results."** Process steps. The arrows animate in sequence after each step completes, and the step boxes float softly.
4. **"One platform. Every publication."** Horizontal ruler-style 12-month scale (Jan–Dec, issue counts, sliding blue marker) over a horizontally scrolling row of covers grouped by month (200px covers, 3:4).
5. **"Every flipbook is also an SEO-ready web page."** Two columns. The demo browser has Flipbook / Article / In Google tabs.
   - The Flipbook view background is a gradient from #e5e7eb through #f3f4f6 to #fff.
   - Until the visitor clicks a tab, an animated arrow cursor demonstrates clicking **Article** and then **In Google**.
   - In dark mode the highlight is #0369a1 with white text.
6. **Before & After desk scene:** wooden desk (`assets/desk-wood.png`) with a spiral notebook (hand-drawn chart: blue Flip&Share line rising +42% vs amber #d97706 Print PDF line), calculator (`assets/desk-calc.png`), pencil below the calculator, coffee and plant. The print magazine "migrates" onto a tablet and phone.
7. **Digital magazine reader demo:** an iPad with a cursor that picks an issue, swipes pages (cursor turns into a hand while dragging, URL bar at the top), scans a small printed QR on page 3 with an iPhone (opens a booking/offer form), then shops an ad product through to payment. It ends with a dark dashboard showing tabs Publishing → Audience → Revenue → Interactivity, auto-clicked about every 3s.
8. **Wooden shelf of magazines** (3 rows, category labels above the books).
9. **"Built for publishers who sell pages, not just share them."** 3×2 cards (Ad Adviser … Versions with A/B diff). Each card title is a link in its label's colour.
10. **Pricing teaser:** "Professional publishing without enterprise pricing." No prices here; it routes to /pricing. The **Talk to a publishing specialist** banner sits inside this section at the bottom: lavender gradient #f5f3ff→#fff, #ddd6fe border, 3 floating avatars with an online dot, phone link, and a violet #6d28d9 "Talk to Sales →" button.
11. **FAQ**, then a closing banner: "Your next issue, live in ten minutes."
12. **Footer** (SEO-rich, navy).

## Recurring components
- **Closing CTA banner (17 instances):** light gradient #e0f2fe → #f0f9ff → #ecfeff, 1px #bae6fd border, 14px radius, `box-sizing:border-box`, 270px left padding reserved for art (220px under 1100px; art hidden under 760px).
  - The art on the left is an animated translucent "fluid blob" plus a large icon chosen per page: rocket only on Digital sales; share, embed, video, lock, form, search and social on the other feature pages; chart, phone, sparkles, team, QR and others elsewhere.
  - The green check badge floats at the top-left of the icon.
- **Feature page template:**
  - Hero.
  - **AT A GLANCE** 3-stat row, in the body (not overlapping the hero).
  - Without / With FlipAndShare comparison, with icon tiles: grey #e5e7eb for Without, #e0f2fe for With.
  - Animated scene, FAQ, Related features (pastel cards rotating sky / amber / lavender / mint / pink / teal), then the closing banner.
- **Use case template:**
  - Hero background by group. By industry: `linear-gradient(135deg,#0b1f2e,#0c2a40 55%,#3b2a1a)`. By content type: `linear-gradient(135deg,#0b1f2e,#0c4a6e 55%,#0e7490)`.
  - Then "The problem today", then a **WITH FLIPANDSHARE** label over 3 pastel stat tiles, in the body.
- **"Issuu-style" product scene:** soft sky radial glow fading into white (no boxed panel). Floating white UI cards (radius 10px, 1px #e5e7eb, shadow `0 20px 40px -22px rgba(12,74,110,.45)`), real covers, staggered looping entrances about every 7s, the arrow cursor, team avatars (30px, colours #0ea5e9 #f59e0b #8b5cf6 #14b8a6 #ec4899, 2px white border), and one outcome pill at the end.
- **Section eyebrow label:** 11px/600 ui-monospace, letter-spacing .12em, uppercase. #6b7280 on light backgrounds; #7dd3fc or #fcd34d on dark.
- **Toggle switch:** 38×22px track (#0ea5e9 when on, #d1d5db when off) with a 16px white knob that moves 16px over .25s `cubic-bezier(.2,.8,.2,1)`.
- **Monthly / Annual toggle** (pricing): sliding thumb. Annual selected = green (#16a34a / #dcfce7); Monthly = blue.
- **Toast:** navy #0c4a6e, white text, 8px radius, bottom-centre.

## Design tokens

### Colour: Ocean palette (primary)
| Token | Hex | Use |
|---|---|---|
| ink-950 | #0b1f2e | Darkest surfaces, dark heroes |
| navy-900 | #0f2f45 | Dark panels, stat values |
| navy-800 | #0c4a6e | Headings, secondary buttons, toasts |
| navy-700 | #075985 | Hover on navy |
| blue-700 | #0369a1 | Dark-mode highlight, chips |
| blue-600 | #0284c7 | Links, Pricing / My account nav, hover on primary |
| blue-500 | #0ea5e9 | Primary buttons, toggles on, chart accent |
| blue-400 | #38bdf8 | Accents on dark, slider fill |
| blue-300 | #7dd3fc | Eyebrows and links on dark |
| blue-200 | #bae6fd | Borders, pale bars |
| blue-100 | #e0f2fe | Tints, icon tiles, banner |
| blue-50 | #f0f9ff | Lightest tint, selected rows |

### Neutrals
#111827 (body text) · #374151 · #4b5563 · #6b7280 (secondary text, eyebrows) · #9ca3af (placeholder only; fails contrast as text) · #d1d5db (input borders) · #e5e7eb (card borders) · #f1f5f9 / #f3f4f6 / #f8fafc / #f9fafb (backgrounds) · #fff

### Accents
- Amber #f59e0b / #b45309 / #fef3c7 / #fde68a
- Violet #8b5cf6 / #6d28d9 / #ede9fe / #ddd6fe / #f5f3ff
- Green #16a34a / #166534 / #dcfce7
- Teal #14b8a6
- Pink #ec4899
- Red #dc2626 / #ef4444 (errors, PDF tag, live dot)

Pastel card set: sky #e0f2fe, amber #fef3c7, lavender #ede9fe, mint #dcfce7, pink #fce7f3, teal #ccfbf1.

### Typography
- Family: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif`. Mono: `ui-monospace, Menlo, monospace` (eyebrows, codes). Handwritten (notebook sketch only): `'Segoe Print','Bradley Hand','Comic Sans MS',cursive`.
- H1 hero: clamp(32px, 4.4–4.6vw, 52px), weight 700, letter-spacing -.035em, line-height 1.05–1.08, `text-wrap:balance`.
- H2: 38px (clamp 24–38px), weight 700, letter-spacing -.025em, line-height 1.1–1.15, colour #0c4a6e.
- H3 / card title: 16–20px, weight 700.
- Body: 15–17px, line-height 1.55–1.6, `text-wrap:pretty`. Small: 12.5–14px. Labels: 12.5px/600 #374151.
- Eyebrow: 11px/600 mono, letter-spacing .12–.14em.
- Numbers: `font-variant-numeric: tabular-nums`.

### Spacing
- Container: max-width 1200px, side padding 32px (20px on mobile). Use `box-sizing:border-box` on padded containers so they don't exceed 1200px.
- Section vertical padding: 80px standard (64–88px range). In-page sub-sections: 52–72px top.
- Card padding: 18–28px. Grid gaps: 14–28px. Base unit: 4px.

### Radius
6px (inputs, small buttons) · 8px (buttons, tiles) · 10px (cards, floating UI) · 12px (large cards) · 14px (banners, panels) · 999px (pills, chips, toggles) · 50% (avatars)

### Shadows
- Card hover: `0 18px 36px -24px rgba(12,74,110,.45)`
- Floating UI card: `0 20px 40px -22px rgba(12,74,110,.45)`
- Elevated form card: `0 30px 60px -36px rgba(12,74,110,.45)`
- Mega menu: `0 24px 40px -20px rgba(12,74,110,.28)`
- Cover: `0 14px 30px -16px rgba(12,74,110,.5)`
- Modal: `0 40px 80px -30px rgba(0,0,0,.6)`

### Motion
- Standard easing: `cubic-bezier(.2,.8,.2,1)` (entrances, toggles). Gentle loops: `ease-in-out`.
- Durations: hover .15–.3s; reveal-on-scroll .7s (opacity 0 → 1 with translateY 18px → 0, triggered by IntersectionObserver); pop .3–.5s; toggles .25s.
- Loops: floating cards 5–7s; bubbles and blobs 9–12s; product scenes 7–10s.
- Store cover hover: smooth lift using transform only (no layout properties), `transform .3s cubic-bezier(.2,.8,.2,1)`.
- Respect `prefers-reduced-motion` on **all** looping scenes (the prototype only does this on the demo hero; extend it).
- The 83 `@keyframes` in the reference are all prefixed `fas*`. Reuse the timing and curves, and rebuild them as CSS or with Framer Motion.

## Responsive behaviour
- 1100px: Use cases mega menu sub-columns collapse to 1.
- 1000px: feature 3×2 grid becomes 2 columns; "Preview" hides in the app flow header.
- 900px: nav collapses to the ☰ panel; header Pricing / Sign up / My account move into the menu; demo-page and webinar heroes stack and their animated scenes hide; Book a demo becomes 1 column.
- 760px: closing-banner art hides.
- 640px: calendar stacks; feature grid becomes 1 column; webinar rows stack.
- Month ruler: keeps a 560px minimum width and scrolls horizontally on phones (scrollbar hidden).

## State (suggested)
- **Session:** `user`, `signedIn`, `plan`, `billingCycle`.
- **Upload / publish:** current publication, pages, interactions (links / video / forms / ads / QR), publish settings.
- **Analytics:** fetched per publication and date range (reads, time on page, clicks by type, QR scans, lead captures, revenue attributed).
- **Account:** profile, payment methods (store tokens from the processor, never raw card data), invoices, notification prefs, 2FA status.
- **Demo booking:** form fields, then a real scheduling backend (Calendly / HubSpot Meetings / Chili Piper) and CRM lead creation.
- **Webinars:** sessions, registration (CRM / webinar platform), recordings (video host).
- **Consent:** cookie categories, to gate analytics and marketing scripts.

## Accessibility work required (not done in the prototype)
- Set `<html lang="en">`, add a Skip to content link, and add `<main>` landmarks.
- Mark the current nav item with `aria-current`.
- Make every clickable element a real `<a href>` or `<button>`, with visible focus rings. The prototype often uses `<a onClick>` and `<div onClick>`.
- **Contrast:** don't use #9ca3af for text; use #6b7280 or darker. Keep text ≥12px outside the illustrative mock-ups.
- Give labels to all inputs, and add `autocomplete` attributes.
- **Validation:** errors need `aria-invalid` and `aria-describedby`. Toasts need an `aria-live` region.
- **Menus and controls:**
  - Dropdowns need `aria-expanded`.
  - Tabs need `role="tablist"` / `"tab"` and `aria-selected`.
  - Switches need `role="switch"` and `aria-checked`.
  - Modals need `role="dialog"`, a focus trap, and Escape to close.
- **Motion:** add pause controls for long looping animations, and honour reduced motion everywhere.
- **Headings:** exactly one `<h1>` per page (Editor and Publish have none; Blog has two).

## Assets
- `assets/logo-flipandshare.png`: supplied FLIP&SHARE logo. The footer renders it white via a CSS filter; ask for an official white version.
- `assets/desk-wood.png`, `assets/desk-calc.png`: Before & After desk scene photography.
- **Magazine covers and interior pages:** loaded from `https://www.mirabelsmagazinecentral.com/Content/<pubId>/images/<id>_370.jpeg` (covers) and `/Content/620E8020-003F-46B6-91B7-243E559D3678/d87be7fa-492c-4604-a805-3f869b73be19/<n>.jpg` (reader demo issue). Use the Magazine Central API/CDN in production.
- **Icons:** 24×24 stroke icons (stroke 2, round caps and joins), defined as path data in the reference's `ICON_PATHS`. Use the codebase's icon set (e.g. Lucide, which matches closely).
- **Illustrations and scenes:** built from HTML/CSS/SVG in the reference. Rebuild them as components; no image exports are needed.

## Files
- `design/FlipAndShare Prototype.dc.html`: **the main reference** (all screens, logic and animations). Search for `data-screen-label="…"` to find each screen.
- `design/FlipAndShare Prototype.html`: self-contained offline bundle of the same file.
- `design/support.js`: runtime the reference needs to open in a browser. It is not part of the design.
- `design/assets/`: images listed above.
- `design/PROJECT_NOTES.md`: project notes, including the "issuu animation" recipe.

## Open items to confirm before build
1. Production domain (the cookie banner says FlipAndShare.com).
2. Real plan limits and prices per tier (Free: 1 publication for the first month).
3. Real customer logos, case studies and stats (current ones are samples).
4. Cookie Policy, Privacy, Terms and Accessibility pages.
5. Scheduling, CRM, webinar and payment providers.
6. Official white logo for dark backgrounds.
