interface Props {
  phase: 'idle' | 'generating' | 'signing' | 'hatched' | 'error';
}

export default function HatchSequence({ phase }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-48 h-48 rounded-full border-2 border-green-500/30 animate-spin-slow flex items-center justify-center">
          {/* Middle ring */}
          <div className="w-32 h-32 rounded-full border border-cyan-500/40 animate-spin-reverse flex items-center justify-center">
            {/* Inner core */}
            <div className={`w-16 h-16 rounded-full transition-all duration-500 ${
              phase === 'generating' 
                ? 'bg-green-500/20 animate-pulse shadow-[0_0_40px_rgba(0,255,0,0.5)]' 
                : 'bg-cyan-500/30 animate-pulse shadow-[0_0_40px_rgba(0,255,255,0.5)]'
            }`} />
          </div>
        </div>
        
        {/* Scanning lines */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-scan" />
        </div>

        {/* Corner brackets */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-green-400" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-green-400" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-green-400" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-green-400" />

        {/* Status text */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs text-green-400 uppercase tracking-widest whitespace-nowrap">
          {phase === 'generating' ? 'GENERATING KEYPAIR...' : 'SIGNING CANON...'}
        </div>
      </div>
    </div>
  );
}
