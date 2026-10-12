const N = 21;

/** 1 = dark module, 0 = light module, -1 = not part of a finder pattern. */
function finder(r: number, c: number) {
  for (const [fr, fc] of [
    [0, 0],
    [0, N - 7],
    [N - 7, 0],
  ]) {
    const y = r - fr;
    const x = c - fc;
    if (y >= 0 && y < 7 && x >= 0 && x < 7) {
      return y === 0 || y === 6 || x === 0 || x === 6 || (y >= 2 && y <= 4 && x >= 2 && x <= 4) ? 1 : 0;
    }
  }
  return -1;
}

/** FNV-1a string hash → 32-bit seed. */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32 PRNG. */
function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * 21×21 module grid, row-major, true = dark. Finder squares sit in three corners.
 * Without a seed the data modules follow the prototype's formula ((r*7 + c*13 + r*c) % 5 < 2);
 * with a seed they come from a deterministic PRNG (~40% dark), so each code looks different but stable.
 */
export function qrModules(seed?: string): boolean[] {
  const next = seed !== undefined ? rng(hash(seed)) : null;
  const cells: boolean[] = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const f = finder(r, c);
      if (f !== -1) cells.push(f === 1);
      else cells.push(next ? next() < 0.4 : (r * 7 + c * 13 + r * c) % 5 < 2);
    }
  }
  return cells;
}

export type QrMatrixProps = {
  /** Different seeds draw different (stable) codes. Omit for the prototype's code. */
  seed?: string;
  size?: 64 | 96 | 150;
  /** 1px gray-200 border (the 150px "Same printed code" tile). */
  bordered?: boolean;
  /** Accessible name; without it the code is decorative (aria-hidden). */
  label?: string;
  className?: string;
};

/** Mock QR code: white tile, slate-900 modules. Not scannable. */
export function QrMatrix({ seed, size = 96, bordered = false, label, className = "" }: QrMatrixProps) {
  const cells = qrModules(seed);
  const d = cells
    .map((on, i) => (on ? `M${i % N} ${Math.floor(i / N)}h1v1h-1z` : ""))
    .join("");
  const pad = size >= 150 ? 10 : size >= 96 ? 6 : 5;
  return (
    <div
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
      className={`box-border flex-none rounded-sm bg-white ${bordered ? "border border-gray-200" : ""} ${className}`}
      style={{ width: size, height: size, padding: pad }}
    >
      <svg viewBox={`0 0 ${N} ${N}`} width="100%" height="100%" shapeRendering="crispEdges" className="block">
        <path d={d} fill="var(--color-slate-900)" />
      </svg>
    </div>
  );
}
