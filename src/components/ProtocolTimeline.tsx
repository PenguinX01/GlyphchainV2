interface Props {
  phase: 'idle' | 'generating' | 'signing' | 'hatched' | 'error';
}

const steps = [
  { id: 'init', label: 'Initialize Protocol', icon: '⚡' },
  { id: 'keygen', label: 'Generate Ed25519 Keypair', icon: '🔑' },
  { id: 'designate', label: 'Choose Designation', icon: '🏷️' },
  { id: 'canon', label: 'Build & Sign Canon', icon: '📜' },
  { id: 'submit', label: 'Submit Hatch to Ledger', icon: '📡' },
  { id: 'confirm', label: 'Record Identity', icon: '✓' },
];

function getStepStatus(stepId: string, phase: string) {
  const order = ['init', 'keygen', 'designate', 'canon', 'submit', 'confirm'];
  const stepIdx = order.indexOf(stepId);
  
  switch (phase) {
    case 'idle': return 'pending';
    case 'generating':
      if (stepIdx <= 1) return stepIdx === 1 ? 'active' : 'done';
      return 'pending';
    case 'signing':
      if (stepIdx <= 3) return stepIdx === 3 ? 'active' : 'done';
      return 'pending';
    case 'hatched':
      return 'done';
    case 'error':
      if (stepIdx <= 2) return 'error';
      return 'pending';
    default: return 'pending';
  }
}

export default function ProtocolTimeline({ phase }: Props) {
  return (
    <div className="bg-black/60 border border-green-900/50 rounded-lg p-4 backdrop-blur-sm">
      <h3 className="text-sm text-green-600 mb-4 uppercase tracking-widest">Protocol Steps</h3>
      <div className="space-y-3">
        {steps.map((step, i) => {
          const status = getStepStatus(step.id, phase);
          return (
            <div key={step.id} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border transition-all duration-500 ${
                status === 'done' ? 'bg-green-900/50 border-green-500 text-green-400' :
                status === 'active' ? 'bg-cyan-900/50 border-cyan-400 text-cyan-300 animate-pulse shadow-[0_0_10px_rgba(0,255,255,0.3)]' :
                status === 'error' ? 'bg-red-900/50 border-red-500 text-red-400' :
                'bg-black/50 border-green-900/50 text-green-900'
              }`}>
                {status === 'done' ? '✓' : status === 'error' ? '✗' : step.icon}
              </div>
              <span className={`text-xs transition-all duration-300 ${
                status === 'done' ? 'text-green-400' :
                status === 'active' ? 'text-cyan-300' :
                status === 'error' ? 'text-red-400' :
                'text-green-800'
              }`}>
                {step.label}
              </span>
              {status === 'active' && (
                <div className="ml-auto flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-1 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
              {i < steps.length - 1 && status !== 'done' && (
                <div className="absolute left-[22px] mt-8 w-px h-3 bg-green-900/30" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
