// Phase 2 replaces this with the full homepage.
export default function HomePage() {
  return (
    <section className="flex flex-col items-center gap-[22px] px-8 pb-[88px] pt-20 text-center">
      <h1 className="m-0 max-w-[900px] text-[clamp(40px,6vw,64px)] font-bold leading-[1.03] tracking-[-.035em] text-navy-800 [text-wrap:balance]">
        Turn PDFs into interactive digital experiences.
      </h1>
      <p className="m-0 max-w-[620px] text-lg leading-[1.55] text-[#4b5563] [text-wrap:pretty]">
        Create beautiful flipbooks, catalogs, brochures and publications that people can actually engage with.
      </p>
    </section>
  );
}
