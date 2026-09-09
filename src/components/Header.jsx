import React from 'react';
import { motion } from 'framer-motion';
import { Radio, FileText } from 'lucide-react';
import Logo from './Logo';
import { defaultTickers } from '../data/companyDatabase';

export default function Header({ selectedCompany, onSelectSymbol, onOpenExport }) {
  return (
    <header className="border-b border-cyan-500/20 bg-slate-950/95 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Logo size="md" />
          <div>
            <h1 className="text-lg md:text-xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Global Impact Intelligence Engine
            </h1>
            <p className="text-[11px] text-slate-400 hidden sm:flex items-center space-x-1.5 font-mono">
              <span className="text-cyan-400 font-bold">World Graph</span>
              <span>•</span>
              <span>Causal Impact</span>
              <span>•</span>
              <span>Anomaly Radar</span>
              <span>•</span>
              <span>Scenario Simulator</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-2 text-xs text-cyan-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-cyan-500/30">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-mono font-medium">34,200 Graph Edges Active</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenExport}
            className="flex items-center space-x-1.5 text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 hover:border-cyan-500/50 shadow-md transition"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Executive Briefing</span>
          </motion.button>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">Focus:</span>
            <select
              value={selectedCompany.symbol}
              onChange={(e) => onSelectSymbol(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-bold rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 block px-3 py-1.5 cursor-pointer outline-none hover:border-cyan-500 transition-colors"
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

