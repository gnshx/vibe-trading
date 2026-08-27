import React from 'react';
import { Activity, ShieldCheck, TrendingUp, Globe, Sparkles } from 'lucide-react';

export default function Header({ selectedCompany, onSelectCompany, companies }) {
  return (
    <header className="border-b border-vibe-border bg-vibe-card/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Vibe Trading Engine
            </h1>
            <p className="text-xs text-slate-400 flex items-center space-x-1">
              <span>Deep Research</span>
              <span>•</span>
              <span>Geopolitics</span>
              <span>•</span>
              <span>Value Prediction</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400 bg-vibe-dark px-3 py-1.5 rounded-lg border border-vibe-border">
            <Globe className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Real-time Geopolitical & Corporate Event Feed</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Select Company:</span>
            <select
              value={selectedCompany.id}
              onChange={(e) => {
                const target = companies.find(c => c.id === e.target.value);
                if (target) onSelectCompany(target);
              }}
              className="bg-vibe-dark border border-vibe-border text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-2 font-semibold cursor-pointer outline-none hover:border-slate-500 transition-colors"
            >
              {companies.map((comp) => (
                <option key={comp.id} value={comp.id}>
                  {comp.symbol} - {comp.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
