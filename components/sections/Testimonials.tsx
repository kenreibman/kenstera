export function Testimonials() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-5">
        {/* Headline */}
        <h2 className="text-center text-sm font-bold tracking-wide uppercase text-black mb-12">
          Trusted by leading businesses
        </h2>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-200 rounded-lg overflow-hidden">
          {/* Row 1 */}
          <LogoCell>
            <LogoMorgan />
          </LogoCell>
          <LogoCell>
            <LogoCrestview />
          </LogoCell>
          <LogoCell className="hidden md:flex">
            <LogoSterling />
          </LogoCell>
          <LogoCell borderRight={false}>
            <LogoHarrison />
          </LogoCell>

          {/* Row 2 */}
          <LogoCell borderBottom={false}>
            <LogoPacific />
          </LogoCell>
          <LogoCell borderBottom={false}>
            <LogoBennett />
          </LogoCell>
          <LogoCell borderBottom={false} className="hidden md:flex">
            <LogoSummit />
          </LogoCell>
          <LogoCell borderRight={false} borderBottom={false}>
            <LogoCapital />
          </LogoCell>
        </div>

        {/* CTAs */}
        <div className="flex flex-row items-center justify-center gap-3 mt-12">
          <a
            href="/contact-sales"
            className="inline-flex items-center justify-center px-6 py-3 bg-black text-white text-[13px] font-semibold tracking-wide uppercase rounded-full hover:bg-gray-800 transition-colors"
          >
            Talk to Sales
          </a>
          <a
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 text-[13px] font-semibold tracking-wide uppercase rounded-full hover:bg-gray-50 transition-colors border border-gray-300"
          >
            Read Stories
          </a>
        </div>
      </div>
    </section>
  );
}

// Logo cell wrapper
function LogoCell({
  children,
  borderRight = true,
  borderBottom = true,
  className = "",
}: {
  children: React.ReactNode;
  borderRight?: boolean;
  borderBottom?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center py-8 px-4 md:px-6 ${
        borderRight ? "border-r border-gray-200" : ""
      } ${borderBottom ? "border-b border-gray-200" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// Fake law firm logos
function LogoMorgan() {
  return (
    <div className="flex items-center gap-2 text-gray-400">
      <svg className="w-5 h-5 hidden sm:block" viewBox="0 0 20 20" fill="currentColor">
        <rect x="3" y="14" width="14" height="3" />
        <rect x="4" y="6" width="2" height="8" />
        <rect x="9" y="6" width="2" height="8" />
        <rect x="14" y="6" width="2" height="8" />
        <polygon points="10,2 2,6 18,6" />
      </svg>
      <span className="text-[12px] sm:text-[14px] font-semibold tracking-wide">TheTickSuit</span>
    </div>
  );
}

function LogoCrestview() {
  return (
    <div className="flex items-center gap-1.5 text-gray-400">
      <svg className="w-5 h-5 hidden sm:block" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2L3 6v8l7 4 7-4V6l-7-4zm0 2.5L14.5 7 10 9.5 5.5 7 10 4.5z" />
      </svg>
      <span className="text-[12px] sm:text-[14px] font-medium">TheDavidImage</span>
    </div>
  );
}

function LogoSterling() {
  return (
    <div className="flex items-center gap-1.5 text-gray-400">
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <circle cx="10" cy="10" r="8" fillOpacity="0.15" />
        <path d="M6 10l3 3 5-6" strokeWidth="2" stroke="currentColor" fill="none" />
      </svg>
      <span className="text-[14px] font-semibold">LEARFIELD</span>
    </div>
  );
}

function LogoHarrison() {
  return (
    <div className="flex items-center gap-2 text-gray-400">
      <svg className="w-5 h-5 hidden sm:block" viewBox="0 0 20 20" fill="currentColor">
        <rect x="2" y="8" width="7" height="10" rx="1" />
        <rect x="11" y="8" width="7" height="10" rx="1" />
        <rect x="8" y="4" width="4" height="4" />
        <circle cx="10" cy="12" r="2" fillOpacity="0.3" />
      </svg>
      <span className="text-[12px] sm:text-[14px] font-bold tracking-tight">HARRISON BELL</span>
    </div>
  );
}

function LogoPacific() {
  return (
    <div className="flex items-center gap-1.5 text-gray-400">
      <svg className="w-5 h-5 hidden sm:block" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 14c2-2 4-3 6-3s4 1 6 3 4 3 6 3v2H2v-2z" fillOpacity="0.3" />
        <path d="M2 10c2-2 4-3 6-3s4 1 6 3 4 3 6 3v2c-2 0-4-1-6-3s-4-3-6-3-4 1-6 3v-2z" />
      </svg>
      <span className="text-[12px] sm:text-[14px] font-medium italic">MassimiLaw</span>
    </div>
  );
}

function LogoBennett() {
  return (
    <div className="flex items-center gap-2 text-gray-400">
      <svg className="w-5 h-5 hidden sm:block" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 3h14v2H3zM3 7h10v2H3zM3 11h14v2H3zM3 15h8v2H3z" />
      </svg>
      <span className="text-[12px] sm:text-[14px] font-semibold tracking-wide">Reibman&Weiner</span>
    </div>
  );
}

function LogoSummit() {
  return (
    <div className="flex items-center gap-1.5 text-gray-400">
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <polygon points="10,2 18,18 2,18" fillOpacity="0.2" />
        <polygon points="10,6 14,14 6,14" />
      </svg>
      <span className="text-[14px] font-medium">SIDEARM Sports</span>
    </div>
  );
}

function LogoCapital() {
  return (
    <div className="flex items-center gap-1.5 text-gray-400">
      <svg className="w-5 h-5 hidden sm:block" viewBox="0 0 20 20" fill="currentColor">
        <circle cx="10" cy="10" r="8" fillOpacity="0.15" />
        <text x="10" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">C</text>
      </svg>
      <span className="text-[12px] sm:text-[14px] font-bold">Capital Law</span>
    </div>
  );
}
