// Simple flat line-art diagrams per machine type — not photos, just enough
// so each card is recognizable at a glance instead of a bare icon.
export function MachineIllustration({ kind }) {
  switch (kind) {
    case 'dryer':
      return (
        <svg viewBox="0 0 120 100" className="cm-illustration">
          <rect
            x="24"
            y="90"
            width="72"
            height="5"
            rx="1.5"
            className="cm-ill-base"
          />
          <line x1="34" y1="90" x2="34" y2="80" className="cm-ill-leg" />
          <line x1="86" y1="90" x2="86" y2="80" className="cm-ill-leg" />
          <path d="M30,38 L60,14 L90,38 Z" className="cm-ill-roof" />
          <rect
            x="30"
            y="38"
            width="60"
            height="46"
            rx="3"
            className="cm-ill-body"
          />
          <line x1="30" y1="52" x2="90" y2="52" className="cm-ill-ridge" />
          <line x1="30" y1="66" x2="90" y2="66" className="cm-ill-ridge" />
          <rect
            x="90"
            y="46"
            width="7"
            height="26"
            rx="1.5"
            className="cm-ill-duct"
          />
          <circle cx="60" cy="72" r="9" className="cm-ill-window" />
          <circle cx="60" cy="72" r="5" className="cm-ill-window-inner" />
        </svg>
      )
    case 'solar':
      return (
        <svg viewBox="0 0 120 100" className="cm-illustration">
          <g className="cm-ill-sun">
            <circle cx="94" cy="22" r="9" />
            <line x1="94" y1="4" x2="94" y2="10" />
            <line x1="94" y1="34" x2="94" y2="40" />
            <line x1="76" y1="22" x2="82" y2="22" />
            <line x1="106" y1="22" x2="112" y2="22" />
            <line x1="82" y1="10" x2="86" y2="14" />
            <line x1="102" y1="30" x2="106" y2="34" />
            <line x1="102" y1="14" x2="106" y2="10" />
            <line x1="82" y1="34" x2="86" y2="30" />
          </g>
          <line x1="16" y1="88" x2="16" y2="70" className="cm-ill-leg" />
          <line x1="70" y1="88" x2="94" y2="70" className="cm-ill-leg" />
          <path d="M8,72 L40,50 L104,50 L72,72 Z" className="cm-ill-body" />
          <line x1="24" y1="61" x2="88" y2="61" className="cm-ill-ridge" />
          <line x1="40" y1="50" x2="24" y2="72" className="cm-ill-ridge" />
          <line x1="60" y1="50" x2="46" y2="72" className="cm-ill-ridge" />
          <line x1="80" y1="50" x2="68" y2="72" className="cm-ill-ridge" />
        </svg>
      )
    case 'baler':
      return (
        <svg viewBox="0 0 120 100" className="cm-illustration">
          <rect
            x="12"
            y="38"
            width="52"
            height="34"
            rx="3"
            className="cm-ill-body"
          />
          <path d="M12,46 L2,42 L2,68 L12,64 Z" className="cm-ill-roof" />
          <circle cx="38" cy="55" r="13" className="cm-ill-window" />
          {[0, 45, 90, 135].map((deg) => (
            <line
              key={deg}
              x1={38 - 11 * Math.cos((deg * Math.PI) / 180)}
              y1={55 - 11 * Math.sin((deg * Math.PI) / 180)}
              x2={38 + 11 * Math.cos((deg * Math.PI) / 180)}
              y2={55 + 11 * Math.sin((deg * Math.PI) / 180)}
              className="cm-ill-ridge"
            />
          ))}
          <circle cx="94" cy="55" r="16" className="cm-ill-bale" />
          <circle cx="94" cy="55" r="10" className="cm-ill-bale-inner" />
          <line x1="88" y1="47" x2="100" y2="63" className="cm-ill-ridge" />
          <line x1="100" y1="47" x2="88" y2="63" className="cm-ill-ridge" />
          <line x1="22" y1="86" x2="22" y2="72" className="cm-ill-leg" />
          <line x1="54" y1="86" x2="54" y2="72" className="cm-ill-leg" />
          <rect
            x="14"
            y="86"
            width="46"
            height="4"
            rx="1.5"
            className="cm-ill-base"
          />
        </svg>
      )
    default:
      return null
  }
}
