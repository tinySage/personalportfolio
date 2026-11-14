// Small pieces shared by the home page and the project pages.

// Deterministic jitter so server and browser render the same letters
export const rnd = (i: number, s: number) => {
  const v = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

// Distressed gothic wordmark: each letter slightly rotated, lifted and resized
export function Mark({ text, seed = 1, className = "" }: { text: string; seed?: number; className?: string }) {
  return (
    <span className={`mark ${className}`} aria-label={text} role="img">
      {[...text].map((c, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            transform: `rotate(${((rnd(i, seed) - 0.5) * 14).toFixed(1)}deg) translateY(${((rnd(i, seed + 3) - 0.5) * 0.14).toFixed(2)}em) scale(${(0.86 + rnd(i, seed + 7) * 0.3).toFixed(2)})`,
          }}
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}

export function Head({ id, word }: { id: string; word: string }) {
  return (
    <h2 className="shead" id={`${id}-h`}>
      <span className="slash">/</span> <Mark text={word} seed={word.length} />
    </h2>
  );
}

// SVG filter that roughens the gothic wordmark; every page that uses <Mark> needs one
export function Rough() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <filter id="rough">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
        <feDisplacementMap in="SourceGraphic" scale="2.6" />
      </filter>
    </svg>
  );
}
