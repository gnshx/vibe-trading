import React from 'react';
import { calculateReputationMetrics } from '../services/reputationService';
import { Activity, ShieldAlert, Award, MessageSquare, ThumbsUp } from 'lucide-react';

export default function VibeScoreCard({ company }) {
  const repData = calculateReputationMetrics(company);

  if (!repData) return null;

  const { netVibeScore, reputationTier, sentimentBadge, breakdown, narrativeSummary } = repData;

  // Determine score color theme
  let scoreColorClass = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  if (netVibeScore < 70) {
    scoreColorClass = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  } else if (netVibeScore < 50) {
    scoreColorClass = 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  }

  return (
    <div className="bg-vibe-card border border-vibe-border rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-vibe-border/60">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">Vibe & Reputation Index</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Algorithmic corporate reputation & sentiment score
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className={`px-4 py-2 rounded-xl border ${scoreColorClass} flex items-center space-x-2`}>
            <span className="text-2xl font-black font-mono tracking-tight">{netVibeScore}</span>
            <span className="text-xs font-semibold text-slate-300">/ 100 Vibe</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-lg">
          {sentimentBadge}
        </span>
        <span className="bg-slate-800 border border-vibe-border text-slate-300 text-xs font-medium px-3 py-1 rounded-lg">
          Tier: {reputationTier}
        </span>
      </div>

      <p className="mt-4 text-sm text-slate-300 bg-vibe-dark/40 p-3.5 rounded-xl border border-vibe-border/40 leading-relaxed italic">
        "{narrativeSummary}"
      </p>

      {/* Detail Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        <div className="bg-vibe-dark/80 p-3 rounded-xl border border-vibe-border/30">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Brand Sentiment</span>
            <ThumbsUp className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-sm font-semibold text-slate-100 mt-1">{breakdown.brandSentiment}</div>
        </div>

        <div className="bg-vibe-dark/80 p-3 rounded-xl border border-vibe-border/30">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Media Buzz</span>
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-sm font-semibold text-indigo-300 mt-1 font-mono">{breakdown.mediaBuzz}/100</div>
        </div>

        <div className="bg-vibe-dark/80 p-3 rounded-xl border border-vibe-border/30">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Institutional Trust</span>
            <Award className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-sm font-semibold text-emerald-400 mt-1 font-mono">{breakdown.institutionalTrust}/100</div>
        </div>

        <div className="bg-vibe-dark/80 p-3 rounded-xl border border-vibe-border/30">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Risk / Controversy</span>
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-sm font-semibold text-amber-400 mt-1 font-mono">{breakdown.controversyIndex} Volatility</div>
        </div>
      </div>
    </div>
  );
}
