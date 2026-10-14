# Cookie consent

How the site asks for, stores and respects cookie choices. Built in-house (no consent service).

## What is stored, and where

| What | Where | Lifetime | Why |
|---|---|---|---|
| The visitor's choice | First-party cookie `fas_consent` | 180 days | So we don't ask on every page |
| Sign-in (demo) `fas_session`, hero rotation `fas-hero` | Browser local storage | Until cleared | Necessary / display preference |

The cookie value is URL-encoded JSON: `{"v":1,"a":0|1,"m":0|1,"t":<unix seconds>,"g":0|1}`.
`v` is the policy version, `a` analytics, `m` marketing, `t` when it was saved, `g` whether Global Privacy Control was on.
"Necessary" is always on and isn't stored. Attributes: `Path=/; SameSite=Lax; Max-Age=15552000`, plus `Secure` on https.
Set `NEXT_PUBLIC_COOKIE_DOMAIN` (e.g. `.flipandshare.com`) to share it with subdomains such as the app.

No consent data leaves the browser yet. There is no server-side record (see "Not built yet").

## How it works

- `src/lib/consent-core.ts`: pure logic (parse, validate, expiry, cookie string, cookie names per category). Unit tested: `npm test`.
- `src/lib/consent.ts`: browser store. `useConsent()` returns `undefined` (server/hydration), `null` (no valid choice) or the choice. `saveConsent()` writes the cookie, deletes cookies of declined categories and notifies the page.
- `src/components/site/CookieBanner.tsx`: the banner. Nothing is pre-ticked. Accept turns on analytics and marketing. Reject keeps only necessary. Reopen it with `openCookieSettings()` (footer "Cookie settings", the policy page).
- `src/components/site/ConsentScripts.tsx`: the only place tracking scripts are added. A script is rendered only while its category is allowed and its ID is in the environment.
- `/cookie-policy`: the public policy with a table of every cookie.

The pages are statically built, so the server can't read the cookie per request. Instead the tracking scripts are never in the page until consent exists in the browser, so nothing is requested from those tools beforehand.

## Rules

- **Global Privacy Control** (`navigator.globalPrivacyControl`) always forces marketing off and disables that toggle.
- **A new policy version, or 180 days, brings the banner back.** Bump `CONSENT_VERSION` in `consent-core.ts` and the "Last updated" date in `cookie-policy/page.tsx` together.
- **Withdrawing** deletes the declined category's known cookies (`consent-core.ts` patterns) on the current host and its parent domains, and sets Google's `ga-disable-<ID>` flag. Cookies set by other domains can't be deleted from the browser; the tool simply stops running on the next page load.

## Adding a tool

1. Add its ID to `.env.example` and `.env.local`.
2. Render its script in `ConsentScripts.tsx`, only when `analytics` or `marketing` is true, and validate the ID's shape before putting it in an inline script.
3. Add its cookie names to the right pattern list in `consent-core.ts` so withdrawal removes them.
4. Add a row to the table in `cookie-policy/page.tsx`, then bump `CONSENT_VERSION` and the date.

## Not built yet

- **Server-side consent record** (consent ID, choices, policy version, timestamp, hashed IP, country, user ID). Needs the database. Many privacy laws expect you to be able to prove consent.
- **Privacy Policy and Terms pages.** The footer links still go to `/company`; the text needs your legal team.
- **Region rules.** Everyone gets the strictest behaviour (opt-in). Regional behaviour can be added if needed.
- **Real sign-in cookie.** `fas_session` is a demo flag in local storage; real authentication will use a secure server cookie and be added to the policy table.
