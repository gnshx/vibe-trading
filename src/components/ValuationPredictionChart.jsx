import React, { useState } from 'react';
import { predictCompanyValue } from '../services/valuationPredictor';
import { TrendingUp, DollarSign, Sliders, Target, AlertTriangle, ArrowUpRight } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function ValuationPredictionChart({ company }) {
  const [catalystMultiplier, setCatalystMultiplier] = useState(1.0);
  const [geoMultiplier, setGeoMultiplier] = useState(1.0);

  const prediction = predictCompanyValue(company, {
    catalystWeight: catalystMultiplier,
    geoWeight: geoMultiplier
  });

  if (!prediction) return null;

  const {
    currentPrice,
    dynamicPredictedPrice,
    impliedUpsidePercentage,
    valuationRating,
    trajectory,
    fundamentalStats,
    targetBullPrice,
    targetBearPrice
  } = prediction;

  const isUpside = impliedUpsidePercentage >= 0;

  return (
    <div className="bg-vibe-card border border-vibe-border rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-vibe-border/60">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Vibe Value Prediction Engine & Trajectory
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Dynamic AI-synthesized price prediction based on reputation, catalysts, and geopolitical weightings
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-xs text-slate-400">Predicted Target (12M)</div>
            <div className="text-2xl font-black font-mono text-emerald-400">${dynamicPredictedPrice.toFixed(2)}</div>
          </div>
          <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center space-x-1 ${
            isUpside ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
          }`}>
            <ArrowUpRight className="w-4 h-4" />
            <span>{isUpside ? '+' : ''}{impliedUpsidePercentage}%</span>
          </div>
        </div>
      </div>

      {/* Target Bands & Fundamentals */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-vibe-dark/60 p-3 rounded-xl border border-vibe-border/40">
          <div className="text-xs text-slate-400">Current Stock Price</div>
          <div className="text-base font-bold text-white font-mono mt-0.5">${currentPrice.toFixed(2)}</div>
        </div>
        <div className="bg-vibe-dark/60 p-3 rounded-xl border border-vibe-border/40">
          <div className="text-xs text-slate-400">Bull Case Target</div>
          <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">${targetBullPrice.toFixed(2)}</div>
        </div>
        <div className="bg-vibe-dark/60 p-3 rounded-xl border border-vibe-border/40">
          <div className="text-xs text-slate-400">Bear Case Target</div>
          <div className="text-base font-bold text-rose-400 font-mono mt-0.5">${targetBearPrice.toFixed(2)}</div>
        </div>
        <div className="bg-vibe-dark/60 p-3 rounded-xl border border-vibe-border/40">
          <div className="text-xs text-slate-400">Valuation Rating</div>
          <div className="text-xs font-bold text-indigo-300 mt-1">{valuationRating}</div>
        </div>
      </div>

      {/* Interactive Simulation Controls */}
      <div className="bg-vibe-dark/80 p-4 rounded-xl border border-vibe-border/60 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-indigo-400" /> Dynamic Scenario Simulator Controls
          </span>
          <button
            onClick={() => {
              setCatalystMultiplier(1.0);
              setGeoMultiplier(1.0);
            }}
            className="text-[11px] text-slate-400 hover:text-white underline transition-colors"
          >
            Reset Multipliers
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Catalyst Momentum Weight:</span>
              <span className="font-mono font-bold text-indigo-400">{catalystMultiplier}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={catalystMultiplier}
              onChange={(e) => setCatalystMultiplier(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Geopolitical Stability Weight:</span>
              <span className="font-mono font-bold text-cyan-400">{geoMultiplier}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={geoMultiplier}
              onChange={(e) => setGeoMultiplier(parseFloat(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Recharts Trajectory Chart */}
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trajectory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="vibePriceColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#232A36" />
            <XAxis dataKey="period" stroke="#94A3B8" fontSize={11} />
            <YAxis stroke="#94A3B8" fontSize={11} domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{ backgroundColor: '#151921', borderColor: '#232A36', borderRadius: '12px', color: '#fff' }}
              formatter={(value) => [`$${value}`, 'Predicted Price']}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#6366F1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#vibePriceColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
