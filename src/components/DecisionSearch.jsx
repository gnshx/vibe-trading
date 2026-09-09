import React, { useState } from 'react';
import { Search, Sparkles, AlertTriangle, ArrowRight, ShieldAlert, CheckCircle2, Info, ChevronRight, Layers, FileText } from 'lucide-react';
import { calculate7LevelCausalImpact, getProductExposureMatrix } from '../services/worldGraphEngine';

export default function DecisionSearch({ onOpenEvidence }) {
  const [query, setQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('laptop supply disruption');

  const presetQueries = [
    'What could affect NVIDIA\'s AI infrastructure business in the next 12 months?',
    'Show me everything threatening laptop supply over the next six months.',
    'Brazil Drought: Arabica coffee & retail product exposure',
    'Red Sea Shipping Rerouting downstream logistics impact'
  ];

  const handleSelectQuery = (q) => {
    setQuery(q);
    setActiveQuery(q);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setActiveQuery(query.trim());
    }
  };

  const causalResult = calculate7LevelCausalImpact(activeQuery) || calculate7LevelCausalImpact('ev-brazil-drought');
  const exposureMatrix = getProductExposureMatrix(activeQuery);

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 p-6 md:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>Decision Intelligence Search</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Ask Anything About Global Downstream Causal Impact
          </h2>
          <p className="text-sm text-slate-300">
            Query real-time macro disruptions, supply chain bottlenecks, corporate exposure, and 7-level downstream product risks.
          </p>

          {/* Search Bar Input */}
          <form onSubmit={handleSearchSubmit} className="relative mt-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. 'Show me everything threatening laptop supply over next 6 months'..."
              className="w-full bg-slate-950/90 text-white placeholder-slate-400 text-sm md:text-base px-5 py-4 pr-32 rounded-2xl border border-cyan-500/40 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs md:text-sm font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Search Causal Map</span>
            </button>
          </form>

          {/* Preset Prompts */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-slate-400 font-medium">Try Decision Prompts:</span>
            {presetQueries.map((pq, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectQuery(pq)}
                className="text-xs bg-slate-800/80 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 px-3 py-1 rounded-lg border border-slate-700 hover:border-cyan-500/40 transition-all text-left truncate max-w-xs"
              >
                {pq}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Query Active Telemetry Header */}
      <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-400/30">
            <Layers className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Causal Graph Query: <span className="text-cyan-300">"{activeQuery}"</span>
            </h3>
            <p className="text-xs text-slate-400">
              Evaluated against 34,200 world model edges & real-time telemetry feeds.
            </p>
          </div>
        </div>
        <button
          onClick={() => onOpenEvidence('laptop-price-increase')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold rounded-xl border border-cyan-500/30 transition-all"
        >
          <FileText className="w-3.5 h-3.5 text-cyan-400" />
          <span>View Evidence Chain</span>
        </button>
      </div>

      {/* 7-Level Downstream Causal Propagation Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>7-Level Causal Propagation Map</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">CONFIDENCE: HIGH (88%)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {causalResult?.levels.map((lvl) => (
            <div
              key={lvl.level}
              className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-300 text-[10px] font-bold uppercase rounded-md border border-cyan-400/30">
                  Level {lvl.level}
                </span>
                <span className="text-xs font-mono text-slate-400">{lvl.items.length} Node(s)</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {lvl.name}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">{lvl.description}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                {lvl.items.map((item, i) => (
                  <div key={i} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/90 space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                      <span className="truncate max-w-[180px]">{item.node.label}</span>
                      <span className="text-[10px] font-mono text-emerald-400">{item.confidenceScore}% Conf</span>
                    </div>
                    {item.node.description && (
                      <p className="text-[11px] text-slate-400 line-clamp-2">{item.node.description}</p>
                    )}
                    {item.path && item.path.length > 1 && (
                      <div className="text-[10px] text-cyan-400 font-mono flex items-center gap-1 mt-1 truncate">
                        <span>Path:</span>
                        <span className="truncate">{item.path.join(' → ')}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Exposure Matrix Table */}
      <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>Product & Component Exposure Matrix</span>
            </h3>
            <p className="text-xs text-slate-400">Directly & indirectly impacted commercial products</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono tracking-wider">
                <th className="py-3 px-4">Product Category</th>
                <th className="py-3 px-4">Exposure Level</th>
                <th className="py-3 px-4">Causal Mechanism / Reason</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Source Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {exposureMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{item.product}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-md font-bold text-[10px] uppercase border ${
                        item.exposure.includes('Extreme') || item.exposure.includes('High')
                          ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                          : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {item.exposure}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 max-w-md">{item.reason}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{item.confidence}%</td>
                  <td className="py-3.5 px-4 text-slate-400">{item.sourceType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
