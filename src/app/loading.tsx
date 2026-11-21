export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-beige-50 via-white to-beige-50">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gold-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-maroon-600/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Logo pulse */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="animate-pulse">
          <span className="text-4xl font-bold font-serif tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-amber-600">Rent</span>
            <span className="text-maroon-700">The</span>
            <span className="text-maroon-900">Vastra</span>
          </span>
        </div>

        {/* Animated shimmer bar */}
        <div className="relative w-48 h-1 bg-beige-200 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-400 to-transparent animate-[shimmer_1.5s_ease-in-out_infinite]" />
        </div>

        <p className="text-xs text-neutral-400 font-medium tracking-widest uppercase">
          Curating Your Luxury Experience
        </p>
      </div>
    </div>
  );
}
