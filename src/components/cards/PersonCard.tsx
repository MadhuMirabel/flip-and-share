import { Avatar } from "@/components/ui/Avatar";

export type PersonCardProps = {
  name: string;
  role: string;
  bio?: string;
  /** Defaults to the first letter of each word in `name`. */
  initials?: string;
  /** CSS colour of the initials disc (team data: navy, amber, teal, violet). */
  color?: string;
  className?: string;
};

/** Team member card: 64px initials disc, name, blue role line, short bio. */
export function PersonCard({ name, role, bio, initials, color = "var(--color-navy-800)", className = "" }: PersonCardProps) {
  const ini =
    initials ??
    name
      .split(" ")
      .map((w) => w[0])
      .join("");
  return (
    <div className={`flex flex-col items-start gap-3 rounded-lg border border-gray-200 bg-white p-[22px] ${className}`}>
      <Avatar initials={ini} color={color} size={64} style={{ fontWeight: 700 }} />
      <div className="flex flex-col gap-0.5">
        <span className="text-base font-bold text-navy-800">{name}</span>
        <span className="text-label font-semibold text-blue-600">{role}</span>
      </div>
      {bio && <span className="text-menu leading-normal text-gray-600">{bio}</span>}
    </div>
  );
}
