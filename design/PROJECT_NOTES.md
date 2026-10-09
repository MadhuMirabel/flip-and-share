# FlipAndShare project notes

## "issuu animation" style
When the user says "issuu animation" (or "issuu style"), build the graphic as a looping product-UI scene in the style of Issuu's marketing videos. Reference: the `tourScene(i)` helper in `FlipAndShare Prototype.dc.html`.

Recipe:
- A soft panel (light sky gradient `radial-gradient(ellipse at 30% 20%,rgba(56,189,248,.18),transparent 60%)` on `#f0f9ff`/`#fff`, 14px radius, 1px `#e0f2fe` border, overflow hidden).
- Floating white UI cards (`border-radius:10px`, `1px solid #e5e7eb`, shadow `0 20px 40px -22px rgba(12,74,110,.45)`) positioned absolutely with % offsets.
- Real magazine covers (from `this.COVERS`) as 3:4 tiles with deep shadow.
- Staggered, looping entrances every ~7s using the `fasS*` keyframes: `fasSFly` (covers fly in from corners via `--fx/--fy/--fr`), `fasSCard` (cards rise in), `fasSPop` (pins/avatars pop), `fasSType` (URL types out), `fasSGrow` (bars grow), `fasSKnob`/`fasSTrack` (toggles switch on), `fasSCursor` (cursor travels to `--cx/--cy`, clicks, returns), `fasSFloat` (gentle idle float), `fasSCount`, `fasSBlink`.
- A black arrow cursor (`svg path M1 1l6 18 3-7 7-3z`, white stroke) that moves to the key action and clicks.
- Team avatars: 30px circles, brand colours `#0ea5e9 #f59e0b #8b5cf6 #14b8a6 #ec4899`, white 2px border, initials.
- One outcome pill at the end of the loop (e.g. "Page 6 placed", "3 hotspots · all tracked") in navy `#0c4a6e` or green `#dcfce7/#166534`.
- Build scenes with `React.createElement` in the logic class so animation state survives re-renders; expose by name into the template.
- No emoji-heavy or stock-illustration style; UI-first, calm, Ocean palette (`#0b1f2e #0c4a6e #0ea5e9 #38bdf8 #bae6fd #e0f2fe`).
