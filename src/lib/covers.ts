/**
 * Sample publication imagery from Magazine Central (prototype `COVERS` and `CN`).
 * Sample content: replace with the Magazine Central API / CDN in production.
 */
const MC = "https://www.mirabelsmagazinecentral.com/Content/";

export const COVERS: string[] = [
  "9D2BBD99-21FC-45EE-861E-FC8F7D54BDEA/images/f1799f81-c705-4198-8bff-41416b9bbb3d",
  "7EE85896-0F53-4E74-B726-7132ED5D1EAF/images/380b446e-d810-4e5b-8c0c-ffcd206d6a7d",
  "F98CC99B-FC7C-431A-B62D-C1FE513F6631/images/d508ad62-62dd-4520-bf95-5d4f73c28175",
  "FBC04EEE-F5E8-4AB9-9E30-729687021E75/images/4706b275-7630-4859-b31a-bc58a575ce8e",
  "C00FF7C9-AD1D-4006-9CD2-6CF02A603D31/images/a0c5968e-7bb0-43a1-94cf-98ef62299edf",
  "700BD093-EFEF-4A2E-BD2F-5C23EDC6C77A/images/b031c479-462c-4375-ab91-e3d59b9a3318",
  "A747E854-249B-49B3-A585-904A1AAECA4C/images/46b61400-8511-4c23-b48d-75f0b2f1c701",
  "546A3365-9F9F-48BD-B983-EF3891FE6E3A/images/7edfd30c-d617-47cf-954b-07c398828b9d",
  "620E8020-003F-46B6-91B7-243E559D3678/images/d87be7fa-492c-4604-a805-3f869b73be19",
  "F54F4444-5B9E-4B24-9D3B-2E83CE029658/images/47823566-6ab8-4bf8-90e6-19af17d1c469",
  "1DB32CEB-3AA1-407C-8C1A-A8A44CF05B10/images/49e2d20b-c7cc-4122-93c7-46453fe06cc4",
  "BC62D8FB-FD5A-4594-8A56-4C53A5FF4BE4/images/d734f1a8-c885-4176-b4f7-4aabea2d61a7",
].map((p) => `${MC}${p}_370.jpeg`);

/** Interior page `n` (1-based) of the sample issue used by the reader demo (prototype `CN`). */
export const issuePage = (n: number) =>
  `${MC}620E8020-003F-46B6-91B7-243E559D3678/d87be7fa-492c-4604-a805-3f869b73be19/${n}.jpg`;

/**
 * Stand-ins for the prototype's local `uploads/RocketSTEM_issue_14_march_2017_page-00NN.jpg`
 * interior pages, which were not included in the design handoff. Swap for the real files when supplied.
 */
export const SAMPLE_PAGES = {
  page8: issuePage(8),
  // The sample issue only has pages 1–16 on the CDN, so these stand in for the prototype's pages 22 and 41.
  page22: issuePage(7),
  page41: issuePage(9),
} as const;
