// Run with `npm test` (Node's built-in test runner; Node 24 runs the .ts import directly).
import assert from "node:assert/strict";
import { test } from "node:test";
import {
  CONSENT_COOKIE,
  CONSENT_MAX_AGE_DAYS,
  CONSENT_VERSION,
  ANALYTICS_COOKIE_PATTERNS,
  MARKETING_COOKIE_PATTERNS,
  consentCookieString,
  matchingCookieNames,
  parentDomains,
  parseConsent,
  readCookie,
  serializeConsent,
} from "./consent-core.ts";

const NOW = Date.UTC(2026, 9, 13, 12, 0, 0); // 2026-10-13
const ts = Math.floor(NOW / 1000);
const base = { v: CONSENT_VERSION, analytics: true, marketing: false, ts, gpc: false };

test("round trip keeps every field", () => {
  assert.deepEqual(parseConsent(serializeConsent(base), NOW), base);
  const all = { ...base, marketing: true, gpc: true };
  assert.deepEqual(parseConsent(serializeConsent(all), NOW), all);
});

test("missing or garbage values are rejected", () => {
  for (const raw of [undefined, null, "", "abc", "%7B", encodeURIComponent("[]"), encodeURIComponent('"x"')]) {
    assert.equal(parseConsent(raw, NOW), null);
  }
});

test("an older policy version asks again", () => {
  assert.equal(parseConsent(serializeConsent({ ...base, v: CONSENT_VERSION - 1 }), NOW), null);
  assert.equal(parseConsent(serializeConsent({ ...base, v: CONSENT_VERSION + 1 }), NOW), null);
});

test("expires after the maximum age, but not before", () => {
  const day = 86_400_000;
  assert.ok(parseConsent(serializeConsent(base), NOW + (CONSENT_MAX_AGE_DAYS - 1) * day));
  assert.equal(parseConsent(serializeConsent(base), NOW + (CONSENT_MAX_AGE_DAYS + 1) * day), null);
});

test("a timestamp in the future is rejected", () => {
  assert.equal(parseConsent(serializeConsent({ ...base, ts: ts + 3600 }), NOW), null);
});

test("fields of the wrong type are rejected", () => {
  const bad = (o) => encodeURIComponent(JSON.stringify(o));
  assert.equal(parseConsent(bad({ v: 1, a: true, m: 0, t: ts }), NOW), null);
  assert.equal(parseConsent(bad({ v: 1, a: 1, m: 2, t: ts }), NOW), null);
  assert.equal(parseConsent(bad({ v: 1, a: 1, m: 0, t: "x" }), NOW), null);
});

test("readCookie finds a value among several", () => {
  const header = `a=1; ${CONSENT_COOKIE}=hello%20there; b=2`;
  assert.equal(readCookie(header, CONSENT_COOKIE), "hello%20there");
  assert.equal(readCookie(header, "missing"), undefined);
  assert.equal(readCookie("", "a"), undefined);
});

test("cookie string has the safe attributes", () => {
  const s = consentCookieString(base, { secure: true, domain: ".flipandshare.com" });
  assert.match(s, new RegExp(`^${CONSENT_COOKIE}=`));
  assert.match(s, /Max-Age=15552000/);
  assert.match(s, /Path=\//);
  assert.match(s, /SameSite=Lax/);
  assert.match(s, /Secure/);
  assert.match(s, /Domain=\.flipandshare\.com/);
  assert.doesNotMatch(consentCookieString(base, { secure: false }), /Secure|Domain/);
});

test("tracking cookies are found by category and necessary ones never are", () => {
  const header = "fas_consent=x; _ga=1; _ga_ABC123=2; _gid=3; _fbp=4; _gcl_au=5; session=6; _gallery=7";
  assert.deepEqual(matchingCookieNames(header, ANALYTICS_COOKIE_PATTERNS), ["_ga", "_ga_ABC123", "_gid"]);
  assert.deepEqual(matchingCookieNames(header, MARKETING_COOKIE_PATTERNS), ["_fbp", "_gcl_au"]);
});

test("parent domains stop before the bare TLD and skip IPs and localhost", () => {
  assert.deepEqual(parentDomains("www.flipandshare.com"), [".www.flipandshare.com", ".flipandshare.com"]);
  assert.deepEqual(parentDomains("flipandshare.com"), [".flipandshare.com"]);
  assert.deepEqual(parentDomains("localhost"), []);
  assert.deepEqual(parentDomains("127.0.0.1"), []);
});
