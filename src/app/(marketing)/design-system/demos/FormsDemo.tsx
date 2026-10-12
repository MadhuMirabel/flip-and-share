"use client";

import { useState, type ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { BillingToggle, type BillingCycle } from "@/components/ui/BillingToggle";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { ChipGroup, ChipList } from "@/components/ui/ChipGroup";
import { CopyField } from "@/components/ui/CopyField";
import { Dropzone } from "@/components/ui/Dropzone";
import { Field } from "@/components/ui/Field";
import { OtpInput } from "@/components/ui/OtpInput";
import { PasswordStrength } from "@/components/ui/PasswordStrength";
import { RadioCardGroup } from "@/components/ui/RadioCardGroup";
import { RangeField } from "@/components/ui/RangeField";
import { SearchInput } from "@/components/ui/SearchInput";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Select } from "@/components/ui/Select";
import { SettingRow, Toggle, ToggleButton, ToggleCard, ToggleRow } from "@/components/ui/Toggle";
import { useToast } from "@/components/site/Providers";

function Block({ title, dark, children }: { title: string; dark?: boolean; children: ReactNode }) {
  return (
    <div className={`flex flex-col gap-4 rounded-lg border p-5 ${dark ? "border-navy-900 bg-ink-950" : "border-gray-200 bg-white"}`}>
      <h3 className={`m-0 font-mono text-eyebrow font-semibold uppercase tracking-eyebrow ${dark ? "text-blue-300" : "text-gray-500"}`}>
        {title}
      </h3>
      {children}
    </div>
  );
}

/** Group A: forms and selection controls, every variant with realistic props. */
export function FormsDemo() {
  const toast = useToast();
  const [desc, setDesc] = useState("Spring catalog with 48 pages of outdoor furniture, lighting and accessories.");
  const [alt, setAlt] = useState("");
  const [card, setCard] = useState("4242 4242 4242 4242");
  const [tz, setTz] = useState("ET");
  const [range, setRange] = useState("30d");
  const [showPw, setShowPw] = useState(false);
  const [pw, setPw] = useState("");
  const [otp, setOtp] = useState("");
  const [otpErr, setOtpErr] = useState<string>();
  const [issues, setIssues] = useState(12);
  const [pages, setPages] = useState(48);
  const [ads, setAds] = useState(20);
  const [lib, setLib] = useState("all");
  const [tab, setTab] = useState("overview");
  const [pubs, setPubs] = useState("5-12");
  const [needs, setNeeds] = useState<string[]>(["pdf", "analytics"]);
  const [publishTo, setPublishTo] = useState("web");
  const [tone, setTone] = useState("friendly");
  const [heroCat, setHeroCat] = useState("all");
  const [role, setRole] = useState("publisher");
  const [blog, setBlog] = useState("all");
  const [brand, setBrand] = useState("north");
  const [caseTab, setCaseTab] = useState("retail");
  const [auth, setAuth] = useState("signup");
  const [rangeSeg, setRangeSeg] = useState("12m");
  const [db, setDb] = useState("publishing");
  const [mode, setMode] = useState("flipbook");
  const [textSize, setTextSize] = useState("m");
  const [view, setView] = useState("cover");
  const [billing, setBilling] = useState<BillingCycle>("annual");
  const [access, setAccess] = useState("public");
  const [cycle, setCycle] = useState("annual");
  const [dest, setDest] = useState("flipbook");
  const [method, setMethod] = useState<string | null>(null);
  const [t1, setT1] = useState(true);
  const [t2, setT2] = useState(false);
  const [t3, setT3] = useState(true);
  const [opts, setOpts] = useState({ download: true, share: true, print: false });
  const [finder, setFinder] = useState({ ads: true, team: false });
  const [net, setNet] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [lastFile, setLastFile] = useState<string>();

  const onFiles = (files: File[]) => {
    setLastFile(files.map((f) => f.name).join(", "));
    toast(`Received ${files[0].name}`, "success");
  };

  return (
    <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
      <Block title="Field">
        <Field label="Work email" type="email" autoComplete="email" placeholder="you@publisher.com" required />
        <Field label="Company" labelSuffix="Optional" size="md" autoComplete="organization" placeholder="Northwind Press" />
        <Field label="Password" type="password" autoComplete="new-password" defaultValue="hunter2" error="Use at least 8 characters." />
        <Field
          label="Web address"
          size="sm"
          prefix="flipandshare.com/catalogs/"
          defaultValue="spring-2026"
          hint="Lowercase letters, numbers and dashes."
        />
        <Field
          label="Description"
          multiline
          rows={3}
          size="sm"
          counter={160}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Field
          label="Alt text"
          multiline
          rows={3}
          size="sm"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          warning={alt ? undefined : "Missing. Screen readers will skip this element."}
          hint="Describe the image for screen readers."
        />
        <Field
          label="Card number"
          size="md"
          tabularNums
          inputMode="numeric"
          autoComplete="cc-number"
          value={card}
          onChange={(e) => setCard(e.target.value)}
        />
      </Block>

      <div className="flex flex-col gap-6">
        <Block title="Field · dark" dark>
          <Field
            tone="dark"
            label="Get publishing tips once a month"
            type="email"
            autoComplete="email"
            placeholder="you@publisher.com"
            action={<Button radius="md">Subscribe</Button>}
          />
        </Block>
        <Block title="Select · Checkbox">
          <Select
            label="Time zone"
            size="sm"
            inline
            value={tz}
            onChange={(e) => setTz(e.target.value)}
            options={[
              { value: "ET", label: "Eastern (ET)" },
              { value: "CT", label: "Central (CT)" },
              { value: "MT", label: "Mountain (MT)" },
              { value: "PT", label: "Pacific (PT)" },
            ]}
          />
          <Select
            label="Date range"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            options={[
              { value: "7d", label: "Last 7 days" },
              { value: "30d", label: "Last 30 days" },
              { value: "12m", label: "Last 12 months" },
            ]}
          />
          <Checkbox label="Show passwords" checked={showPw} onChange={(e) => setShowPw(e.target.checked)} />
          <Checkbox label="Email me when someone comments" description="At most one digest per day." defaultChecked />
        </Block>
        <Block title="Password strength · OTP · Copy">
          <Field
            label="New password"
            type={showPw ? "text" : "password"}
            autoComplete="new-password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            aria-describedby="pw-meter"
          />
          <PasswordStrength id="pw-meter" password={pw} className="-mt-3" />
          <CopyField value="JBSW Y3DP EHPK 3PXP" buttonLabel="Copy key" label="Authenticator setup key" successMessage="Setup key copied" />
          <OtpInput
            label="6-digit code from your app"
            hideLabel={false}
            value={otp}
            onChange={(v) => {
              setOtp(v);
              setOtpErr(undefined);
            }}
            error={otpErr}
            action={
              <Button
                onClick={() => (otp.length === 6 ? toast("Two-step verification is on", "success") : setOtpErr("Enter all 6 digits."))}
              >
                Verify
              </Button>
            }
          />
        </Block>
      </div>

      <Block title="SearchInput · light">
        <SearchInput variant="toolbar" label="Search integrations" placeholder="Search integrations" />
        <SearchInput variant="app" label="Search publications" placeholder="Search publications" />
      </Block>
      <Block title="SearchInput · dark" dark>
        <SearchInput variant="hero" label="Search the blog" placeholder="Search articles" />
        <SearchInput
          variant="hero"
          label="Search resources"
          placeholder="Search guides, webinars and docs"
          buttonLabel="Search"
          onSearch={(q) => toast(`Searching “${q}”`)}
        />
        <SearchInput variant="dark" label="Search templates" placeholder="Search templates" />
        <ChipList
          tone="darkGlass"
          lead="Popular:"
          label="Popular searches"
          items={[{ label: "Media kit" }, { label: "Shoppable catalog" }, { label: "Analytics" }, { label: "SSO" }].map((i) => ({
            ...i,
            onClick: () => toast(`Searching “${i.label}”`),
          }))}
        />
      </Block>

      <Block title="RangeField">
        <RangeField label="Issues per year" min={1} max={52} value={issues} onChange={setIssues} />
        <RangeField label="Pages per issue" min={8} max={200} step={4} value={pages} onChange={setPages} />
      </Block>
      <Block title="RangeField · dark" dark>
        <RangeField tone="dark" label="Ads per issue" min={0} max={80} value={ads} onChange={setAds} format={(v) => `${v} ads`} />
      </Block>

      <Block title="ChipGroup · light">
        <ChipGroup
          label="Library filter"
          tone="navy"
          value={lib}
          onChange={setLib}
          items={[
            { value: "all", label: "All" },
            { value: "published", label: "Published" },
            { value: "drafts", label: "Drafts" },
          ]}
        />
        <ChipGroup
          label="Analytics view"
          tone="navy"
          size="lg"
          value={tab}
          onChange={setTab}
          items={[
            { value: "overview", label: "Overview", icon: "chart" },
            { value: "readers", label: "Readers", icon: "users" },
            { value: "clicks", label: "Clicks", icon: "target" },
            { value: "revenue", label: "Revenue", icon: "trend" },
          ]}
        />
        <ChipGroup
          label="Blog category"
          tone="navy"
          size="lg"
          value={blog}
          onChange={setBlog}
          items={[
            { value: "all", label: "All", count: 42 },
            { value: "guides", label: "Guides", count: 18 },
            { value: "product", label: "Product", count: 11 },
            { value: "stories", label: "Customer stories", count: 13 },
          ]}
        />
        <ChipGroup
          label="Brand"
          tone="navy"
          size="lg"
          value={brand}
          onChange={setBrand}
          items={[
            { value: "north", label: "Northwind", swatch: "var(--color-blue-500)" },
            { value: "harbor", label: "Harbor & Co", swatch: "var(--color-teal-500)" },
            { value: "atlas", label: "Atlas Media", swatch: "var(--color-orange-500)" },
          ]}
        />
        <ChipGroup
          label="Customer story"
          tone="navy"
          size="xl"
          value={caseTab}
          onChange={setCaseTab}
          items={[
            { value: "retail", label: "Retail", dot: "var(--color-blue-500)" },
            { value: "beauty", label: "Beauty", dot: "var(--color-pink-500)" },
            { value: "garden", label: "Garden", dot: "var(--color-green-600)" },
            { value: "edu", label: "Education", dot: "var(--color-violet-500)" },
          ]}
        />
        <ChipGroup
          label="Publications per year"
          tone="primary"
          size="lg"
          value={pubs}
          onChange={setPubs}
          items={["1–4", "5–12", "13–50", "50+"].map((l) => ({ value: l.replace("–", "-"), label: l }))}
        />
        <ChipGroup
          label="What would you like to see?"
          multiple
          tone="choice"
          shape="rounded"
          size="lg"
          value={needs}
          onChange={setNeeds}
          items={[
            { value: "pdf", label: "PDF to flipbook", icon: "pdf" },
            { value: "ads", label: "Ads and Ad Manager", icon: "megaphone" },
            { value: "analytics", label: "Analytics", icon: "chart" },
            { value: "qr", label: "QR codes", icon: "qr" },
          ]}
        />
        <ChipGroup
          label="Publish to"
          tone="choice"
          shape="rounded"
          size="lg"
          value={publishTo}
          onChange={setPublishTo}
          items={[
            { value: "web", label: "Web" },
            { value: "app", label: "Mobile app" },
            { value: "embed", label: "Embed" },
          ]}
        />
        <ChipGroup
          label="Tone"
          tone="violet"
          size="sm"
          value={tone}
          onChange={setTone}
          items={[
            { value: "neutral", label: "Neutral" },
            { value: "friendly", label: "Friendly" },
            { value: "formal", label: "Formal" },
          ]}
        />
        <ChipList
          label="Explore other use cases"
          items={[
            { label: "Magazines", icon: "book", href: "#" },
            { label: "Catalogs", icon: "cart", href: "#" },
            { label: "Reports", icon: "chart", href: "#" },
          ]}
        />
      </Block>

      <Block title="ChipGroup · dark" dark>
        <ChipGroup
          label="Template category"
          tone="dark"
          size="xl"
          value={heroCat}
          onChange={setHeroCat}
          items={["All", "Magazines", "Catalogs", "Brochures", "Reports"].map((l) => ({ value: l.toLowerCase(), label: l }))}
        />
        <ChipGroup
          label="I am a…"
          tone="darkGlass"
          size="lg"
          value={role}
          onChange={setRole}
          items={["Publisher", "Retailer", "Agency", "Educator"].map((l) => ({ value: l.toLowerCase(), label: l }))}
        />
      </Block>

      <Block title="SegmentedControl · light">
        <SegmentedControl
          label="Account"
          fullWidth
          size="lg"
          value={auth}
          onChange={setAuth}
          options={[
            { value: "signup", label: "Sign up" },
            { value: "login", label: "Log in" },
          ]}
        />
        <SegmentedControl
          label="Preview"
          value={view}
          onChange={setView}
          options={[
            { value: "cover", label: "Cover" },
            { value: "spread", label: "Spread" },
            { value: "article", label: "Article" },
          ]}
        />
        <SegmentedControl
          label="Range"
          tone="white"
          value={rangeSeg}
          onChange={setRangeSeg}
          options={[
            { value: "30d", label: "30 days" },
            { value: "90d", label: "90 days" },
            { value: "12m", label: "12 months" },
          ]}
        />
        <SegmentedControl
          label="Reading mode"
          tone="mini"
          value={mode}
          onChange={setMode}
          options={[
            { value: "flipbook", label: "Flipbook", icon: "book" },
            { value: "article", label: "Article", icon: "text" },
            { value: "pdf", label: "PDF", icon: "pdf" },
          ]}
        />
        <SegmentedControl
          label="Text size"
          tone="white"
          size="sm"
          value={textSize}
          onChange={setTextSize}
          options={[
            { value: "s", label: "A", ariaLabel: "Small text" },
            { value: "m", label: "A", ariaLabel: "Medium text" },
            { value: "l", label: "A", ariaLabel: "Large text" },
          ]}
        />
      </Block>

      <Block title="SegmentedControl · Billing" dark>
        <SegmentedControl
          label="Dashboard"
          tone="dark"
          semantics="tabs"
          value={db}
          onChange={setDb}
          options={[
            { value: "publishing", label: "Publishing", icon: "grid" },
            { value: "audience", label: "Audience", icon: "users" },
            { value: "interactivity", label: "Interactivity", icon: "sparkles" },
            { value: "revenue", label: "Ad Revenue", icon: "trend" },
          ]}
        />
        <SegmentedControl
          label="Reader view"
          tone="dark"
          size="md"
          value={mode === "flipbook" ? "flipbook" : "article"}
          onChange={setMode}
          options={[
            { value: "flipbook", label: "Flipbook" },
            { value: "article", label: "Article" },
          ]}
        />
        <BillingToggle value={billing} onChange={setBilling} />
      </Block>

      <Block title="RadioCardGroup">
        <RadioCardGroup
          label="Who can read it"
          value={access}
          onChange={setAccess}
          options={[
            { value: "public", title: "Public", description: "Anyone can find and read it." },
            { value: "unlisted", title: "Unlisted", description: "Only people with the link." },
            { value: "restricted", title: "Restricted", description: "Readers must sign in or enter a password." },
          ]}
        />
        <RadioCardGroup
          label="Billing cycle"
          size="lg"
          value={cycle}
          onChange={setCycle}
          options={[
            { value: "monthly", title: "Monthly", sub: "$49 billed every month" },
            {
              value: "annual",
              title: "Annual",
              sub: "$470 billed once a year",
              accent: "green",
              badge: <Badge tone="success">Save 20%</Badge>,
            },
          ]}
        />
        <RadioCardGroup
          label="QR destination"
          radius="lg"
          value={dest}
          onChange={setDest}
          options={[
            { value: "flipbook", title: "Open the flipbook", sub: "flipandshare.com/c/spring-2026", subMono: true },
            { value: "page", title: "Jump to a page", sub: "flipandshare.com/c/spring-2026#p12", subMono: true },
          ]}
        />
        <RadioCardGroup
          label="Two-step method"
          variant="option"
          value={method}
          onChange={setMethod}
          options={[
            {
              value: "app",
              title: "Authenticator app",
              icon: "shield",
              sub: "Use Google Authenticator, 1Password or Authy.",
              badge: <Badge tone="success" size="xs">Recommended</Badge>,
            },
            { value: "sms", title: "Text message", icon: "sms", sub: "We'll text a code to your phone." },
          ]}
        />
      </Block>

      <Block title="Toggle">
        <div className="flex flex-wrap items-center gap-4">
          <Toggle label="Small" size="sm" checked={t1} onChange={setT1} />
          <Toggle label="Medium" checked={t2} onChange={setT2} />
          <Toggle label="Large green" size="lg" color="green" checked={t3} onChange={setT3} />
          <Toggle label="Green" color="green" checked={t3} onChange={setT3} />
          <Toggle label="Locked" checked locked />
          <Toggle label="Disabled" checked={false} disabled />
        </div>
        <div>
          <ToggleRow
            title="Allow downloads"
            description="Readers can save a PDF copy."
            checked={opts.download}
            onChange={(v) => setOpts({ ...opts, download: v })}
          />
          <ToggleRow
            title="Show share buttons"
            description="Email, LinkedIn, X and copy link."
            checked={opts.share}
            onChange={(v) => setOpts({ ...opts, share: v })}
          />
          <ToggleRow
            title="Allow printing"
            description="Adds a print button to the reader."
            checked={opts.print}
            onChange={(v) => setOpts({ ...opts, print: v })}
          />
        </div>
        <ToggleCard title="I sell ads in my publications" checked={finder.ads} onChange={(v) => setFinder({ ...finder, ads: v })} />
        <ToggleCard title="Several people edit each issue" checked={finder.team} onChange={(v) => setFinder({ ...finder, team: v })} />
        <SettingRow title="Network" description={net ? "Online · syncing" : "Offline · reading cached issues"} checked={net} onChange={setNet} />
        <ToggleButton title="Dark mode" checked={darkMode} onChange={setDarkMode} className="w-44" />
      </Block>

      <div className="col-span-full flex flex-col gap-6">
        <div className="flex justify-center rounded-lg bg-linear-to-b from-blue-100 to-white px-6 py-12">
          <Dropzone variant="hero" onFiles={onFiles} onReject={() => toast("That file type isn't supported", "error")} />
        </div>
        <Block title={`Dropzone · app${lastFile ? ` · last: ${lastFile}` : ""}`}>
          <Dropzone onFiles={onFiles} onReject={() => toast("That file type isn't supported", "error")} />
        </Block>
      </div>
    </div>
  );
}
