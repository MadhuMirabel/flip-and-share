import type { KeyboardEvent } from "react";

/**
 * Arrow / Home / End handling for single-select groups (radiogroup, tablist).
 * Returns the index to move to, or null when the key isn't a navigation key.
 * Disabled indexes are skipped; movement wraps around.
 */
export function rovingIndex(
  e: KeyboardEvent,
  current: number,
  count: number,
  isDisabled: (i: number) => boolean = () => false,
): number | null {
  let step = 0;
  let start = current;
  switch (e.key) {
    case "ArrowRight":
    case "ArrowDown":
      step = 1;
      break;
    case "ArrowLeft":
    case "ArrowUp":
      step = -1;
      break;
    case "Home":
      step = 1;
      start = -1;
      break;
    case "End":
      step = -1;
      start = count;
      break;
    default:
      return null;
  }
  e.preventDefault();
  for (let n = 1; n <= count; n++) {
    const i = (((start + step * n) % count) + count) % count;
    if (!isDisabled(i)) return i;
  }
  return null;
}
