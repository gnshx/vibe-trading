import React from 'react';
import { analyzeGeopoliticsAndTieUps } from '../services/geopoliticalService';
import { Network, Landmark, Globe2, ShieldCheck, Clock, Users } from 'lucide-react';

export default function TieUpGeopoliticsMap({ company }) {
  const geoAnalysis = analyzeGeopoliticsAndTieUps(company);

  if (!geoAnalysis) return null;

  const { tieUps, keyLeaderRelations, primaryCountry, timezoneEffect, regulatoryRisk, compositeGeopoliticalScore } = geoAnalysis;

  return (
    <div className="bg-vibe-card border border-vibe-border rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-vibe-border/60">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-indigo-400" />
            Corporate Tie-Ups & Geopolitical Ecosystem
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Deep analysis of strategic partnerships, political leader connections, and nation-state alignment
          </p>
        </div>

        <div className="bg-vibe-dark px-3 py-1.5 rounded-xl border border-vibe-border text-xs flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-400">Geo-Stability Score:</span>
          <span className="font-bold text-emerald-400 font-mono">{compositeGeopoliticalScore}/100</span>
        </div>
      </div>

      {/* Grid Section: Strategic Corporate Partnerships & Leader Ties */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strategic Corporate Partnerships */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-indigo-300 flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" />
            Strategic Corporate Tie-Ups ({tieUps.length})
          </h4>

          <div className="space-y-3">
            {tieUps.map((tie, idx) => (
              <div
                key={idx}
                className="bg-vibe-dark/60 border border-vibe-border/50 rounded-xl p-3.5 space-y-2 hover:border-slate-500 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{tie.partner}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                    {tie.dealValue}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">{tie.type}</div>
                <p className="text-xs text-slate-300 leading-normal">{tie.details}</p>
                <div className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded inline-block">
                  Vibe Impact: {tie.vibeImpact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geopolitical & Political Leader Alignment */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-cyan-300 flex items-center gap-2">
            <Landmark className="w-4 h-4 text-cyan-400" />
            Country Leadership & Policy Relations
          </h4>

          <div className="space-y-3">
            {keyLeaderRelations.map((rel, idx) => (
              <div
                key={idx}
                className="bg-vibe-dark/60 border border-vibe-border/50 rounded-xl p-3.5 space-y-2 hover:border-slate-500 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-100">{rel.leader}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                    rel.relationship.includes('Ally') || rel.relationship.includes('Partner')
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    {rel.relationship}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-normal">{rel.impact}</p>
              </div>
            ))}

            {/* Timezone & Trading Dynamics */}
            <div className="bg-vibe-dark/80 border border-vibe-border/60 rounded-xl p-3.5 space-y-1.5">
              <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> Global Time Zone Overlap Impact
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {timezoneEffect.overlapImpact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
