/**
 * Original warrior illustration (hand-drawn SVG, not based on any game artwork).
 * Decorative only, so it is hidden from assistive technology.
 */
export default function Warrior({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 -16 320 436"
      className={className}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
          <linearGradient id="wr-crim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f0405f"/><stop offset="0.55" stopColor="#c8102e"/><stop offset="1" stopColor="#7a0a22"/></linearGradient>
          <linearGradient id="wr-crimD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a30d28"/><stop offset="1" stopColor="#4d0616"/></linearGradient>
          <linearGradient id="wr-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffe08a"/><stop offset="0.5" stopColor="#f5b83a"/><stop offset="1" stopColor="#b9770e"/></linearGradient>
          <linearGradient id="wr-steel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#eef2ff"/><stop offset="0.5" stopColor="#b8c2e0"/><stop offset="1" stopColor="#6b7699"/></linearGradient>
          <linearGradient id="wr-hair" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff"/><stop offset="1" stopColor="#c9b6d4"/></linearGradient>
          <radialGradient id="wr-aura" cx="0.5" cy="0.45" r="0.55"><stop offset="0" stopColor="#ff5c8a" stopOpacity="0.55"/><stop offset="1" stopColor="#ff5c8a" stopOpacity="0"/></radialGradient>
          <radialGradient id="wr-eye" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#fff"/><stop offset="1" stopColor="#ff5c8a"/></radialGradient>
        </defs>
        <ellipse cx="190" cy="200" rx="150" ry="190" fill="url(#wr-aura)"/>
        {/* flowing hair */}
        <path d="M150 78 C100 70 62 96 18 78 C52 112 92 112 128 122 C100 130 70 150 40 176 C86 166 120 150 150 132 Z" fill="url(#wr-hair)" stroke="#3a1020" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M130 100 C96 100 70 112 44 112" fill="none" stroke="#b79cc6" strokeWidth="2" strokeLinecap="round"/>
        <path d="M132 118 C100 124 76 136 56 150" fill="none" stroke="#b79cc6" strokeWidth="2" strokeLinecap="round"/>
        {/* katana blade */}
        <path d="M120 232 L8 340 L14 346 L128 242 Z" fill="url(#wr-steel)" stroke="#2a1830" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M30 330 L122 241" stroke="#ffffff" strokeWidth="1.6" opacity="0.8"/>
        {/* legs / skirt */}
        <path d="M120 262 L226 262 L262 396 L84 396 Z" fill="url(#wr-crimD)" stroke="#2a0710" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M120 262 L226 262 L236 302 L110 302 Z" fill="url(#wr-crim)" stroke="#2a0710" strokeWidth="2.5" strokeLinejoin="round"/>
        <g stroke="#2a0710" strokeWidth="2" fill="none"><path d="M146 302 L134 396"/><path d="M173 302 L173 396"/><path d="M200 302 L212 396"/></g>
        <path d="M84 396 Q98 384 112 396 T140 396 T168 396 T196 396 T224 396 T252 396 L262 396 L84 396 Z" fill="url(#wr-gold)" stroke="#2a0710" strokeWidth="2"/>
        {/* belt */}
        <path d="M116 244 L230 244 L228 266 L118 266 Z" fill="url(#wr-gold)" stroke="#2a0710" strokeWidth="2.5" strokeLinejoin="round"/>
        <circle cx="173" cy="255" r="9" fill="#c8102e" stroke="#2a0710" strokeWidth="2"/>
        {/* torso */}
        <path d="M138 140 L208 140 L222 168 L228 244 L118 244 L124 168 Z" fill="url(#wr-crim)" stroke="#2a0710" strokeWidth="3" strokeLinejoin="round"/>
        <g stroke="#2a0710" strokeWidth="2" fill="none"><path d="M124 172 L222 172"/><path d="M122 196 L224 196"/><path d="M120 220 L226 220"/></g>
        <path d="M173 142 L173 244" stroke="url(#wr-gold)" strokeWidth="5"/>
        <g fill="url(#wr-gold)" stroke="#2a0710" strokeWidth="1.5"><circle cx="173" cy="172" r="4.5"/><circle cx="173" cy="196" r="4.5"/><circle cx="173" cy="220" r="4.5"/></g>
        {/* right shoulder (viewer right) */}
        <path d="M206 146 C236 126 262 136 266 170 C262 188 236 190 214 180 Z" fill="url(#wr-crim)" stroke="#2a0710" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M214 160 C234 150 252 154 258 168" fill="none" stroke="url(#wr-gold)" strokeWidth="4" strokeLinecap="round"/>
        <path d="M232 184 C262 196 262 230 232 250 L212 238 C228 222 230 204 220 190 Z" fill="url(#wr-crimD)" stroke="#2a0710" strokeWidth="3" strokeLinejoin="round"/>
        <circle cx="214" cy="236" r="12" fill="#22101a" stroke="#2a0710" strokeWidth="2"/>
        {/* neck guard */}
        <path d="M126 112 L118 146 L226 146 L220 112 Z" fill="url(#wr-crimD)" stroke="#2a0710" strokeWidth="3" strokeLinejoin="round"/>
        <g stroke="#2a0710" strokeWidth="2"><path d="M122 126 L224 126"/><path d="M120 138 L226 138"/></g>
        {/* left shoulder (viewer left) */}
        <path d="M138 146 C108 124 76 134 74 170 C78 190 108 192 132 180 Z" fill="url(#wr-crim)" stroke="#2a0710" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M130 160 C110 150 90 154 82 168" fill="none" stroke="url(#wr-gold)" strokeWidth="4" strokeLinecap="round"/>
        <path d="M108 184 C84 196 80 224 100 246 L124 236 C110 222 112 206 124 192 Z" fill="url(#wr-crimD)" stroke="#2a0710" strokeWidth="3" strokeLinejoin="round"/>
        {/* sword handle + guard + hands */}
        <path d="M118 232 L150 196" stroke="#2a0710" strokeWidth="12" strokeLinecap="round"/>
        <path d="M118 232 L150 196" stroke="#8a1030" strokeWidth="8" strokeLinecap="round" strokeDasharray="4 4"/>
        <ellipse cx="118" cy="233" rx="14" ry="5" transform="rotate(-48 118 233)" fill="url(#wr-gold)" stroke="#2a0710" strokeWidth="2"/>
        <circle cx="112" cy="240" r="11" fill="#22101a" stroke="#2a0710" strokeWidth="2"/>
        <circle cx="148" cy="200" r="10" fill="#22101a" stroke="#2a0710" strokeWidth="2"/>
        {/* helmet horns */}
        <path d="M136 62 C112 46 102 22 106 0 C122 18 142 32 158 40 Z" fill="url(#wr-gold)" stroke="#2a0710" strokeWidth="2.5" strokeLinejoin="round"/>
        <path d="M206 58 C232 40 242 16 236 -4 C220 16 202 30 188 40 Z" fill="url(#wr-gold)" stroke="#2a0710" strokeWidth="2.5" strokeLinejoin="round"/>
        {/* helmet dome */}
        <path d="M128 98 C124 54 152 34 174 34 C200 34 220 56 218 98 L208 106 L136 106 Z" fill="url(#wr-crim)" stroke="#2a0710" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M174 34 L174 70" stroke="url(#wr-gold)" strokeWidth="5" strokeLinecap="round"/>
        <path d="M142 70 C156 62 192 62 206 70" fill="none" stroke="url(#wr-gold)" strokeWidth="4" strokeLinecap="round"/>
        {/* face mask */}
        <path d="M136 100 L212 100 L208 128 C200 146 188 154 174 156 C160 154 148 146 140 128 Z" fill="#6c0b24" stroke="#2a0710" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M142 102 L170 108 L162 115 L142 110 Z" fill="url(#wr-eye)" stroke="#2a0710" strokeWidth="1.5"/>
        <path d="M206 102 L178 108 L186 115 L206 110 Z" fill="url(#wr-eye)" stroke="#2a0710" strokeWidth="1.5"/>
        <path d="M152 134 Q174 146 196 134" fill="none" stroke="#2a0710" strokeWidth="2.5"/>
        <g fill="#ffffff" stroke="#2a0710" strokeWidth="1.5" strokeLinejoin="round"><path d="M158 134 L163 148 L168 138 Z"/><path d="M190 134 L185 148 L180 138 Z"/></g>

    </svg>
  );
}
