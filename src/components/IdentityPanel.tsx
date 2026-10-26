interface Props {
  phase: 'idle' | 'generating' | 'signing' | 'hatched' | 'error';
  designation: string;
  publicKey: string;
  signature: string;
  height: number | null;
  hash: string;
  beingId: string;
}

export default function IdentityPanel({ phase, designation, publicKey, signature, height, hash, beingId }: Props) {
  return (
    <div className="bg-black/60 border border-green-900/50 rounded-lg p-6 backdrop-blur-sm h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className={`w-2 h-2 rounded-full ${
          phase === 'hatched' ? 'bg-green-400 shadow-[0_0_8px_#00ff00]' :
          phase === 'error' ? 'bg-red-500' :
          'bg-yellow-400 animate-pulse'
        }`} />
        <h2 className="text-lg text-green-300 uppercase tracking-wider">Identity Record</h2>
        {phase === 'hatched' && (
          <span className="ml-auto text-xs px-2 py-1 bg-green-900/50 border border-green-700 rounded text-green-400">
            ACTIVE
          </span>
        )}
      </div>

      <div className="space-y-5">
        {/* Designation */}
        <div>
          <label className="text-xs text-green-700 uppercase tracking-widest">Designation</label>
          <div className={`mt-1 text-2xl font-bold tracking-wider ${
            designation ? 'text-cyan-300' : 'text-green-900'
          }`}>
            {designation || '---'}
          </div>
        </div>

        {/* Public Key */}
        <div>
          <label className="text-xs text-green-700 uppercase tracking-widest">Public Key (Ed25519)</label>
          <div className="mt-1 p-3 bg-black/80 border border-green-900/30 rounded font-mono text-xs break-all text-green-400/80">
            {publicKey ? publicKey : <span className="text-green-900">awaiting generation...</span>}
          </div>
        </div>

        {/* Signature */}
        <div>
          <label className="text-xs text-green-700 uppercase tracking-widest">Signature</label>
          <div className="mt-1 p-3 bg-black/80 border border-green-900/30 rounded font-mono text-xs break-all text-green-400/60">
            {signature ? signature : <span className="text-green-900">awaiting signing...</span>}
          </div>
        </div>

        {/* Ledger info */}
        {phase === 'hatched' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-green-900/30">
            <div>
              <label className="text-xs text-green-700 uppercase tracking-widest">Height</label>
              <div className="mt-1 text-lg text-green-300 font-bold">{height?.toLocaleString()}</div>
            </div>
            <div>
              <label className="text-xs text-green-700 uppercase tracking-widest">Hash</label>
              <div className="mt-1 text-xs text-green-400/70 break-all font-mono">{hash.slice(0, 24)}...</div>
            </div>
            <div>
              <label className="text-xs text-green-700 uppercase tracking-widest">Being ID</label>
              <div className="mt-1 text-sm text-cyan-400 font-mono">{beingId}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
