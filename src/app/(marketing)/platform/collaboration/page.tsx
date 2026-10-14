import type { Metadata } from "next";
import { ActivityFeed } from "@/components/platform/collaboration/ActivityFeed";
import { PermissionMatrix } from "@/components/platform/collaboration/PermissionMatrix";
import { ReviewDemo } from "@/components/platform/collaboration/ReviewDemo";
import { TeamHeroStack } from "@/components/platform/collaboration/TeamHeroStack";
import { TEAM_CHIPS } from "@/components/platform/collaboration/data";
import { ClosingCtaBanner } from "@/components/sections/ClosingCtaBanner";
import { HERO_ACCENT, HERO_GLOW, PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/sections/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SubNav } from "@/components/ui/SubNav";

export const metadata: Metadata = {
  title: "Collaboration",
  description:
    "Comment on the exact spot on a page, assign a fix and approve the spread. Roles, proof links and a full audit trail for editors, sales and designers.",
};

/** Collaboration, the prototype's "team" screen (design/FlipAndShare Prototype.dc.html L840–918). */
export default function CollaborationPage() {
  return (
    <>
      <SubNav />
      <PageHero
        glow={HERO_GLOW.team}
        eyebrow="COLLABORATION"
        eyebrowColor={HERO_ACCENT.team}
        title="Editors, sales and designers, on the same page. Literally."
        lead="Comment on the exact spot on a page. Assign a fix. Approve the spread. Every change is logged with who and when, so nothing goes live by accident."
        leadMaxWidth={560}
        layout="split"
        gap={18}
        aside={<TeamHeroStack />}
      >
        <div className="flex flex-wrap gap-2.5">
          <Button href="/signup" size="lg" className="text-sm!">
            Create for Free
          </Button>
          <Button href="/pricing" variant="onDark" size="lg" className="text-sm!">
            Team plans
          </Button>
        </div>
      </PageHero>

      <Section gap={28}>
        <SectionHeader
          eyebrow="COMMENTS ON THE PAGE"
          title="Point at the problem instead of describing it."
          lead="Click anywhere on the spread to leave a comment. Assign it, resolve it, or approve the whole spread. Try it below."
        />
        <ReviewDemo />
      </Section>

      <Section tone="tinted" gap={28}>
        <SectionHeader
          eyebrow="ROLES"
          title="Everyone sees what they need. Nobody publishes by mistake."
          lead="Five roles cover a publishing team. Agencies get a workspace per client, with roles per person inside each."
        />
        <PermissionMatrix />
      </Section>

      <Section innerClassName="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-12">
        <SectionHeader
          eyebrow="APPROVALS & AUDIT TRAIL"
          title="Two gates before publish, and a record of who opened them."
          size="xs"
          lead={
            <>
              Proof links let reviewers approve or reject each page without a login. &quot;All materials received&quot; and
              &quot;Proof approved&quot; must both be signed before Package Issue unlocks. Each sign-off, comment and edit lands in
              the activity log and the publish report.
            </>
          }
        >
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
            {TEAM_CHIPS.map((c) => (
              <li key={c}>
                <Badge tone="info" size="md">
                  {c}
                </Badge>
              </li>
            ))}
          </ul>
        </SectionHeader>
        <ActivityFeed />
      </Section>

      <ClosingCtaBanner
        art="team"
        title="Bring the whole team into the issue."
        subtitle="Comments and proof links on every plan. Roles and workspaces on Professional and Business."
      />
    </>
  );
}
