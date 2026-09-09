import React from 'react';
import { Search, Network, Radio, Sliders, Zap, ShieldCheck } from 'lucide-react';

export default function ProductNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: 'ask',
      label: '🎯 Ask (Decision Search)',
      shortName: 'Ask',
      icon: Search,
      badge: 'Causal Engine',
      description: 'Search downstream causal effects, product exposures, & evidence chains.'
    },
    {
      id: 'explore',
      label: '🕸️ Explore (Temporal World Graph)',
      shortName: 'Explore Graph',
      icon: Network,
      badge: 'Temporal Graph',
      description: 'Interactive node-edge world model visualizer & timeline.'
    },
    {
      id: 'radar',
      label: '📡 Monitor (Impact Radar)',
      shortName: 'Impact Radar',
      icon: Radio,
      badge: 'Autonomous',
      description: 'Autonomous anomaly detection & real-time signal monitor.'
    },
    {
      id: 'simulate',
      label: '🎛️ Simulate (Scenario Simulator)',
      shortName: 'Scenario Lab',
      icon: Sliders,
      badge: 'What-If Lab',
      description: 'Run hypothetical supply shocks, climate events, & geopolitical embargoes.'
    },
    {
      id: 'act',
      label: '⚡ Act (Decision Intelligence)',
      shortName: 'Action Matrix',
      icon: Zap,
      badge: 'Playbooks',
      description: 'Actionable executive playbooks, supplier alternatives, & API export.'
    }
  ];

  return (
    <div className="w-full bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20 sticky top-0 z-40 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-2 scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-400/40 shadow-lg shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400 animate-pulse' : 'text-slate-400'}`} />
                <span>{tab.shortName}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                  isActive ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/30' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-500/30">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-mono font-medium">WORLD MODEL: ONLINE</span>
        </div>
      </div>
    </div>
  );
}
