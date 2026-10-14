import { InlineCtaStrip, MiniConvertArt } from "@/components/sections/Banners";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** "See it with your own PDF." call-to-action strip between the feature grid and the examples. */
export function ConvertStrip() {
  return (
    <section className="px-8 max-sm:px-5">
      <Reveal>
        <InlineCtaStrip
          art={<MiniConvertArt />}
          title="See it with your own PDF."
          sub="Drop a file, watch it convert, and click through the interactive result."
          action={
            <Button href="/signup" glow className="py-3!">
              Upload a PDF, it&apos;s free
            </Button>
          }
          note="Free account · no credit card"
        />
      </Reveal>
    </section>
  );
}
