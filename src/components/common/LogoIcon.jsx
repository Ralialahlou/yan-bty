/**
 * Yan BTY Icon/Favicon — brand guidelines p.46
 *
 * "The Yan BTY Icon utilises the 'y' from the Yan BTY Logo as the hero element.
 *  Use the Yan BTY Icon in applications where the full Yan BTY Logo is not
 *  feasible only (e.g., social media avatars, and digital favicons)."
 *
 * Structure: circle containing "y" glyph + "BTY" text below circle
 * Colours: circle bg + contrasting "y" + "BTY" below
 */
export default function LogoIcon({
  size = 40,
  bgColor = '#b25745',   /* YB Tabla Red by default */
  fgColor = '#ffffff',   /* White "y" inside */
  btyColor = '#b25745',  /* "BTY" text below */
  showBty = true,
}) {
  const r = size / 2;

  return (
    <svg
      width={size}
      height={showBty ? size * 1.45 : size}
      viewBox={`0 0 ${size} ${showBty ? size * 1.45 : size}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Yan BTY"
    >
      {/* Circle background */}
      <circle cx={r} cy={r} r={r} fill={bgColor} />

      {/* "y" glyph — centred in circle, Comfortaa Light */}
      <text
        x={r}
        y={r * 1.22}
        textAnchor="middle"
        fontFamily="'Comfortaa', 'Nunito', 'Varela Round', cursive"
        fontWeight="300"
        fontSize={size * 0.58}
        fill={fgColor}
        letterSpacing="-0.01em"
      >
        y
      </text>

      {/* "BTY" — below the circle, wide-tracked */}
      {showBty && (
        <text
          x={r}
          y={size * 1.32}
          textAnchor="middle"
          fontFamily="'Outfit', 'Helvetica Neue', sans-serif"
          fontWeight="200"
          fontSize={size * 0.17}
          fill={btyColor}
          letterSpacing={size * 0.065}
          dx={size * 0.033}  /* compensate trailing tracking */
        >
          BTY
        </text>
      )}
    </svg>
  );
}
