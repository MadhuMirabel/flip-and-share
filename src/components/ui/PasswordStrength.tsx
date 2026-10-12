export type PasswordScore = 0 | 1 | 2 | 3 | 4;

/** One point each for: length ≥ 8, mixed case, a digit, a symbol. */
export function scorePassword(password: string): PasswordScore {
  if (!password) return 0;
  let s = 0;
  if (password.length >= 8) s++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) s++;
  if (/\d/.test(password)) s++;
  if (/[^A-Za-z0-9]/.test(password)) s++;
  return s as PasswordScore;
}

/** Segment fills follow the prototype; captions use the darker step of each hue so 12px text stays ≥ 4.5:1. */
const BAR = ["bg-gray-200", "bg-red-600", "bg-amber-500", "bg-blue-500", "bg-green-600"];
const TEXT = ["text-gray-500", "text-red-600", "text-amber-700", "text-blue-700", "text-green-700"];
const DEFAULT_CAPTIONS: [string, string, string, string] = ["Weak", "Fair", "Good", "Strong"];

type PasswordStrengthProps = {
  password: string;
  /** Captions for scores 1–4. */
  captions?: [string, string, string, string];
  /** Shown while the field is empty. */
  emptyHint?: string;
  /** id for linking from the input's aria-describedby. */
  id?: string;
  className?: string;
};

/** 4-segment strength meter + caption, placed under a New password field. */
export function PasswordStrength({
  password,
  captions = DEFAULT_CAPTIONS,
  emptyHint = "Use 8+ characters with upper and lower case, a number and a symbol.",
  id,
  className = "",
}: PasswordStrengthProps) {
  const score = scorePassword(password);
  const caption = password ? captions[Math.max(score, 1) - 1] : emptyHint;
  return (
    <div id={id} className={`flex flex-col gap-1.5 ${className}`}>
      <div
        role="meter"
        aria-label="Password strength"
        aria-valuemin={0}
        aria-valuemax={4}
        aria-valuenow={score}
        aria-valuetext={password ? caption : "Empty"}
        className="flex gap-1"
      >
        {[1, 2, 3, 4].map((seg) => (
          <span
            key={seg}
            className={`h-1 flex-1 rounded-sm transition-colors duration-300 ${seg <= score ? BAR[score] : BAR[0]}`}
          />
        ))}
      </div>
      <span aria-live="polite" className={`text-xs ${password ? TEXT[Math.max(score, 1)] : "text-gray-500"}`}>
        {caption}
      </span>
    </div>
  );
}
