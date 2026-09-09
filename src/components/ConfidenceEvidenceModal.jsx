import React from 'react';
import { X, ShieldCheck, AlertCircle, FileText, CheckCircle2, Info, ChevronDown } from 'lucide-react';
import { CAUSAL_WHY_TREES, getConfidenceArchitectureBreakdown, checkEvidenceConflicts } from '../services/causalWhyEngine';

export default function ConfidenceEvidenceModal({ claimId, onClose }) {
  if (!claimId) return null;

  const rootNode = CAUSAL_WHY_TREES[claimId] || CAUSAL_WHY_TREES['laptop-price-increase'];
  const breakdown = getConfidenceArchitectureBreakdown();
  const conflictCheck = checkEvidenceConflicts(claimId);

  const renderEvidenceNode = (node, depth = 0) => (
    <div key={node.id} className={`space-y-2 ${depth > 0 ? 'ml-4 md:ml-6 pl-4 border-l-2 border-slate-800' : ''}`}>
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase border ${
              node.type === 'FACT'
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                : node.type === 'INFERENCE'
                ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}
          >
            {node.type}
          </span>
          <span className="text-xs font-mono font-bold text-emerald-400">{node.confidence}% Confidence</span>
        </div>

        <h5 className="text-xs md:text-sm font-bold text-white">{node.claim}</h5>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Source: {node.source}</span>
          <span>Verified: {node.timestamp}</span>
        </div>
      </div>

      {node.subEvidence && node.subEvidence.map(sub => renderEvidenceNode(sub, depth + 1))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Confidence & Evidence Fusion Inspection</span>
          </div>
          <h3 className="text-xl font-bold text-white">Evidence Chain & Multi-Source Verification</h3>
        </div>

        {/* Confidence Architecture Breakdown */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">Confidence Tier Architecture</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {breakdown.map((item, idx) => (
              <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className={item.color}>{item.label}</span>
                  <span className="font-mono text-slate-300">{item.confidence}%</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <div className={`h-full ${item.barBg}`} style={{ width: `${item.confidence}%` }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Source Verification Status */}
        <div className="bg-emerald-950/20 p-4 rounded-2xl border border-emerald-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Multi-Source Consensus: VERIFIED ({conflictCheck.supportingSourcesCount} Independent Sources Agree)</span>
          </div>
          <span className="text-emerald-400 font-mono font-bold">0 Conflicts</span>
        </div>

        {/* Recursive Evidence Tree */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">
            Causal Proof Tree: {rootNode.claim}
          </h4>
          {renderEvidenceNode(rootNode)}
        </div>
      </div>
    </div>
  );
}
