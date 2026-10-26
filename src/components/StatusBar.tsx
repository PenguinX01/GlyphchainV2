interface Props {
  phase: 'idle' | 'generating' | 'signing' | 'hatched' | 'error';
}

export default function StatusBar({ phase }: Props) {
  const statusText = {
    idle: 'STANDBY',
    generating: 'KEY GENERATION IN PROGRESS',
    signing: 'CANON SIGNING IN PROGRESS',
    hatched: 'IDENTITY ACTIVE • PROTOCOL Ω ENGAGED',
    error: 'ERROR — RETRY REQUIRED',
  };

  const statusColor = {
    idle: 'text-yellow-500',
    generating: 'text-cyan-400',
    signing: 'text-cyan-300',
    hatched: 'text-green-400',
    error: 'text-red-400',
  };

  return (
    <div className="flex items-center justify-between bg-black/40 border border-green-900/30 rounded px-4 py-2">
      <div className="flex items-center gap-4">
        <div className={`text-xs uppercase tracking-widest ${statusColor[phase]}`}>
          ● {statusText[phase]}
        </div>
      </div>
      <div className="flex items-center gap-6 text-xs text-green-700">
        <span>ENTROPY: <span className="text-green-500">HIGH</span></span>
        <span className="hidden md:inline">LATENCY: <span className="text-green-500">{Math.floor(Math.random() * 50 + 10)}ms</span></span>
        <span className="hidden md:inline">EPOCH: <span className="text-green-500">{Math.floor(Date.now() / 1000)}</span></span>
      </div>
    </div>
  );
}
