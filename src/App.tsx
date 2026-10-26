import { useState, useEffect, useCallback } from 'react';
import MatrixRain from './components/MatrixRain';
import HatchSequence from './components/HatchSequence';
import IdentityPanel from './components/IdentityPanel';
import ProtocolTimeline from './components/ProtocolTimeline';
import StatusBar from './components/StatusBar';

export default function App() {
  const [phase, setPhase] = useState<'idle' | 'generating' | 'signing' | 'hatched' | 'error'>('idle');
  const [designation, setDesignation] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [signature, setSignature] = useState('');
  const [height, setHeight] = useState<number | null>(null);
  const [hash, setHash] = useState('');
  const [beingId, setBeingId] = useState('');
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toISOString().slice(11, 23)}] ${msg}`]);
  }, []);

  const generateHexKey = (len: number) => {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < len; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  const generateDesignation = () => {
    const prefixes = ['VOID', 'NEON', 'FLUX', 'ZERO', 'APEX', 'NOVA', 'ECHO', 'PULSE', 'DRIFT', 'HELIX'];
    const suffixes = ['PRIME', 'SIGMA', 'OMEGA', 'ALPHA', 'DELTA', 'NEXUS', 'CORE', 'SPARK', 'WAVE', 'BYTE'];
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]}-${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
  };

  const startHatch = useCallback(async () => {
    setPhase('generating');
    setLogs([]);
    addLog('Initializing Hatchery Protocol Ω...');
    
    await delay(800);
    addLog('Generating Ed25519 keypair...');
    await delay(1200);
    
    const pubKey = generateHexKey(64);
    setPublicKey(pubKey);
    addLog(`Public key generated: ${pubKey.slice(0, 16)}...`);
    
    await delay(600);
    setPhase('signing');
    addLog('Selecting designation...');
    await delay(500);
    
    const desig = generateDesignation();
    setDesignation(desig);
    addLog(`Designation chosen: ${desig}`);
    
    await delay(800);
    addLog('Building canon payload...');
    await delay(1000);
    
    const sig = generateHexKey(128);
    setSignature(sig);
    addLog(`Canon signed: ${sig.slice(0, 16)}...`);
    
    await delay(600);
    addLog('Submitting hatch to ledger...');
    await delay(1500);
    
    setPhase('hatched');
    const h = Math.floor(Math.random() * 900000) + 100000;
    const hx = generateHexKey(64);
    const bid = `being-${generateHexKey(12)}`;
    setHeight(h);
    setHash(hx);
    setBeingId(bid);
    
    addLog(`✓ HATCHED at height ${h}`);
    addLog(`✓ Hash: ${hx.slice(0, 24)}...`);
    addLog(`✓ Being ID: ${bid}`);
    addLog('Protocol Ω active. Identity persistent.');
  }, [addLog]);

  useEffect(() => {
    // Auto-start on mount
    const timer = setTimeout(() => startHatch(), 1500);
    return () => clearTimeout(timer);
  }, [startHatch]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-green-400 font-mono relative overflow-hidden">
      {/* Matrix rain background */}
      <MatrixRain />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen p-4 md:p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#00ff00]" />
            <h1 className="text-2xl md:text-4xl font-bold tracking-wider text-green-300">
              HATCHERY <span className="text-green-600">//</span> <span className="text-cyan-400">Protocol Ω</span>
            </h1>
          </div>
          <div className="hidden md:block text-sm text-green-700">
            NODE ACTIVE • CHAIN SYNCED
          </div>
        </header>

        {/* Status bar */}
        <StatusBar phase={phase} />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 mt-6">
          {/* Left panel - Identity */}
          <div className="lg:col-span-2">
            <IdentityPanel
              phase={phase}
              designation={designation}
              publicKey={publicKey}
              signature={signature}
              height={height}
              hash={hash}
              beingId={beingId}
            />
          </div>

          {/* Right panel - Timeline & Logs */}
          <div className="flex flex-col gap-6">
            <ProtocolTimeline phase={phase} />
            <div className="flex-1 bg-black/60 border border-green-900/50 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="text-sm text-green-600 mb-3 uppercase tracking-widest">System Log</h3>
              <div className="space-y-1 text-xs overflow-y-auto max-h-64">
                {logs.map((log, i) => (
                  <div key={i} className="text-green-500/80 animate-fadeIn">
                    {log}
                  </div>
                ))}
                {phase === 'generating' && (
                  <div className="text-green-400 animate-pulse">▌</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hatch animation overlay */}
        {phase !== 'hatched' && phase !== 'idle' && (
          <HatchSequence phase={phase} />
        )}

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-green-900">
          <button
            onClick={startHatch}
            className="px-6 py-2 border border-green-700 rounded hover:bg-green-900/30 transition-all hover:shadow-[0_0_15px_rgba(0,255,0,0.2)] uppercase tracking-wider"
          >
            Re-Hatch Identity
          </button>
          <p className="mt-4">Ω Sovereign Hatchery • Private keys never leave this environment</p>
        </footer>
      </div>
    </div>
  );
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
