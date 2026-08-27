import React from 'react';
import { Globe } from 'lucide-react';
import Logo from './Logo';
import { defaultTickers } from '../data/companyDatabase';

export default function Header({ selectedCompany, onSelectSymbol }) {
  return (
    <header className="border-b border-vibe-border bg-vibe-card/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Logo size="md" />
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Vibe Trading Engine
            </h1>
            <p className="text-xs text-slate-400 flex items-center space-x-1">
              <span>Live Research</span>
              <span>•</span>
              <span>Geopolitics & Tie-Ups</span>
              <span>•</span>
              <span>Value Prediction</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400 bg-vibe-dark px-3 py-1.5 rounded-lg border border-vibe-border">
            <Globe className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Live Market Data & Real-Time News Stream</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Popular:</span>
            <select
              value={selectedCompany.symbol}
              onChange={(e) => onSelectSymbol(e.target.value)}
              className="bg-vibe-dark border border-vibe-border text-slate-200 text-sm rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block p-2 font-semibold cursor-pointer outline-none hover:border-slate-500 transition-colors"
            >
              {defaultTickers.map((t) => (
                <option key={t.symbol} value={t.symbol}>
                  {t.symbol} - {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
