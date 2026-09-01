/**
 * The E/M monogram from Elisa's brand board, redrawn as a vector.
 *
 * An "E" and an "M" sharing one field: the M's left diagonal starts
 * exactly where the E's (deliberately shorter) middle arm stops, and its
 * right stem drops below the E's baseline — so the two letters read as
 * one mark rather than two. Hairline geometric strokes, all one weight.
 *
 * Traced from the board at 1:1, so the proportions are the original's:
 * middle arm at 82% of the outer arms, M starting 57% down the E,
 * right stem overshooting the baseline by half the M's height.
 *
 * Drawn as strokes on `currentColor`, so it inverts for free on the
 * dark pages and can be scaled to any size without going soft.
 */
export function Monogram({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`monogram ${className}`}
      viewBox="0 0 240 224"
      fill="none"
      stroke="currentColor"
      strokeWidth="11"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      {/* E — top arm, stem, bottom arm in one stroke */}
      <path d="M95.5 5.5 H5.5 V148.5 H97.5" />
      {/* E — middle arm, stopping short where the M picks up */}
      <path d="M5.5 73.5 H78.5" />
      {/* M — the V, running up into the flank of the stem */}
      <path d="M93.5 88 L167.5 178 L232 92" />
      {/* M — right stem, flat-topped: the peak is a cut, not a point */}
      <path d="M234.5 88 V218" />
    </svg>
  )
}
