import type { FeatureDetail } from "./FeatureDetailPage";
import { ArticleScene, RevenueScene, ShareHeroDemo, SocialScene } from "./scenes";

/** Social posts (prototype `FEAT.social` L3369 + `FEAT_X.social` L3289). */
export const SOCIAL_DETAIL: FeatureDetail = {
  label: "SOCIAL POSTS",
  title: "A week of posts from every issue.",
  lead: "Turn any page into on-brand images, short clips and captions sized for each network, then schedule them from one place.",
  plan: "From Professional",
  demo: <ShareHeroDemo />,
  stats: [
    { value: "3", label: "formats per page", icon: "trend" },
    { value: "<1 min", label: "from page to post", icon: "target" },
    { value: "+2.4×", label: "clicks vs a plain link (placeholder)", icon: "check" },
  ],
  blocks: [
    {
      tag: "EVERY FORMAT",
      title: "One page, three formats.",
      description:
        "Pick any page and get square, story and landscape images with your fonts and colours, ready for Instagram, LinkedIn, Facebook and X.",
      points: ["1:1, 9:16 and 16:9 crops", "Brand kit applied automatically", "Short video clips from page-flips"],
      scene: <SocialScene />,
    },
    {
      tag: "AI CAPTIONS",
      title: "Captions written from the page, not a blank box.",
      description: "The AI reads the article and drafts a caption, hashtags and a call to action in your tone. Edit or regenerate.",
      points: ["Tone presets: news, lifestyle, B2B", "Hashtags from the content", "Alt text for accessibility included"],
      scene: <ArticleScene />,
    },
    {
      tag: "TRACKED LINKS",
      title: "Know which post sent the readers.",
      description:
        "Every post links to the exact page with a tracking tag. Opens, pages read and conversions show per post in analytics.",
      points: ["UTM tags added for you", "Per-post reads and clicks", "Best-performing page suggested for the next post"],
      scene: <RevenueScene />,
    },
  ],
  howTitle: "Pick a page, get a post.",
  steps: [
    { title: "Choose a page or article", description: "From the issue or the AI summary.", time: "10 sec" },
    { title: "Review posts and captions", description: "Edit, regenerate, or swap the crop.", time: "1 min" },
    { title: "Download or schedule", description: "Schedule across a week from one screen.", time: "Once per issue" },
  ],
  without: {
    icon: "clock",
    heading: "Posting by hand",
    points: ["Screenshot a page, crop it three times", "Write captions from scratch", "A link to the homepage, nothing tracked"],
  },
  withFas: {
    icon: "megaphone",
    heading: "Posting from the issue",
    points: ["Three formats generated in seconds", "Captions drafted from the article", "Deep link to the page, tracked per post"],
  },
  short: "social posts",
  faqs: [
    { question: "Which networks are supported?", answer: "Instagram, Facebook, LinkedIn and X for scheduling. Any network for download." },
    { question: "Can I use my own brand fonts?", answer: "Yes. Upload fonts and colours once in Brand kit." },
    { question: "Is the AI caption editable?", answer: "Always. Nothing posts without your approval." },
  ],
  related: [
    { title: "Fullscreen sharing", icon: "globe", href: "/features/share" },
    { title: "AI and automation", icon: "sparkles", href: "/platform/ai" },
    { title: "Analytics", icon: "chart", href: "/platform/analytics" },
    { title: "Article mode and SEO", icon: "text", href: "/features/seo" },
  ],
  art: "social",
};
