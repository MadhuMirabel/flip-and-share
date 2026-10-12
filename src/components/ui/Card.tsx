import type { ElementType, HTMLAttributes, ReactNode } from "react";

export type CardVariant = "default" | "tinted" | "navy" | "glass" | "elevated" | "dashed";

const VARIANT: Record<CardVariant, string> = {
  default: "border border-gray-200 bg-white",
  tinted: "border border-blue-200 bg-blue-50", // "WITH FLIPANDSHARE" column
  navy: "border border-navy-800 bg-navy-800 text-white", // ROI card
  glass: "border border-white/12 bg-white/6 text-white", // cards on ink heroes
  elevated: "border border-gray-200 bg-white shadow-form", // forms and wizards
  dashed: "border border-dashed border-gray-300 bg-white",
};

const PADDING = {
  none: "overflow-hidden p-0",
  sm: "p-4", // 16: app metrics
  base: "p-5", // 20: app panels, hub cards
  md: "p-[22px]", // 22: marketing card base
  lg: "p-7", // 28: forms, wizard, pricing
};

const RADIUS = {
  lg: "rounded-lg", // 10: app screens
};

const HOVER = {
  none: "",
  lift: "transition-[transform,box-shadow,border-color] duration-300 ease-fas hover:-translate-y-[3px] hover:shadow-lift",
  border: "transition-[border-color,box-shadow] duration-300 ease-fas hover:border-blue-300",
};

export type CardProps = Omit<HTMLAttributes<HTMLElement>, "className"> & {
  variant?: CardVariant;
  padding?: keyof typeof PADDING;
  radius?: keyof typeof RADIUS;
  /** lift: rise 3px + shadow-lift · border: border turns blue-300. Also sets `data-hovercard` so fluid icon tiles and `.fas-arrow` react. */
  hover?: keyof typeof HOVER;
  /** Element to render (div, article, li, section, a…). */
  as?: ElementType;
  /** Extra props for the rendered element (e.g. href when `as` is a link). */
  href?: string;
  className?: string;
  children: ReactNode;
};

/** Surface for grouped content: flex column with a 12px gap. */
export function Card({
  variant = "default",
  padding = "md",
  radius = "lg",
  hover = "none",
  as: Tag = "div",
  className = "",
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      {...rest}
      data-hovercard={hover !== "none" ? "" : undefined}
      className={`flex flex-col gap-3 ${VARIANT[variant]} ${PADDING[padding]} ${RADIUS[radius]} ${HOVER[hover]} ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Card title row: 15–16px navy title, optional 13.5px subtitle and a right-aligned actions slot. */
export function CardHeader({
  title,
  subtitle,
  actions,
  as: Title = "h3",
  size = "md",
  tone = "light",
  divided = false,
  className = "",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  as?: "h2" | "h3" | "h4" | "p";
  /** md = 15px (app panels) · lg = 16px (account sections). */
  size?: "md" | "lg";
  /** dark = white title / blue-200 subtitle for navy and glass cards. */
  tone?: "light" | "dark";
  /** Bottom border + 16/20 padding, for `padding="none"` table cards. */
  divided?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-start justify-between gap-3 ${divided ? "border-b border-gray-200 px-5 py-4" : ""} ${className}`}
    >
      <div className="flex min-w-0 flex-col gap-[3px]">
        <Title className={`m-0 font-bold leading-snug ${size === "lg" ? "text-base" : "text-body"} ${tone === "dark" ? "text-white" : "text-navy-800"}`}>
          {title}
        </Title>
        {subtitle && <p className={`m-0 text-menu ${tone === "dark" ? "text-blue-200" : "text-gray-500"}`}>{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-none flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

/** Action bar: hairline top border, right-aligned actions. */
export function CardFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flex flex-wrap items-center justify-end gap-2.5 border-t border-gray-100 pt-4 ${className}`}>{children}</div>;
}
