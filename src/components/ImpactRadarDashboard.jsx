import React from 'react';
import { Radio, AlertOctagon, ShieldAlert, Cpu, Activity, ArrowUpRight, CheckCircle2, FileText, Zap } from 'lucide-react';
import { ACTIVE_RADAR_SIGNALS, getRadarDashboardStats } from '../services/impactRadarEngine';
import { SPECIALIZED_AGENTS } from '../services/agentOrchestrator';

export default function ImpactRadarDashboard({ onOpenEvidence }) {
  const stats = getRadarDashboardStats();

  return (
    <div className="space-y-6">
      {/* Top Banner & Autonomous System Status */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 p-6 md:p-8 rounded-3xl border border-rose-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-400/30 text-rose-300 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-ping" />
            <span>Impact Radar — Autonomous Disruption Discovery</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Global Anomaly & Disruption Radar</h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Continuously monitors global news streams, customs manifests, AIS vessel telemetry, and satellite scans to detect emerging supply chain & macro market shocks before they hit financial reports.
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-rose-500/30 text-right min-w-[200px]">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">Radar Telemetry Status</div>
          <div className="text-sm font-bold text-emerald-400 flex items-center justify-end gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{stats.systemStatus}</span>
          </div>
          <div className="text-xs font-mono text-slate-400 mt-2">
            34,200 Graph Edges Active
          </div>
        </div>
      </div>

      {/* Metrics Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Active Disruption Signals</div>
          <div className="text-2xl font-black text-white">{stats.activeSignalsCount}</div>
          <div className="text-[11px] text-rose-400 flex items-center gap-1">
            <AlertOctagon className="w-3 h-3" /> {stats.criticalThreatsCount} Critical Threat(s)
          </div>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Monitored Entities</div>
          <div className="text-2xl font-black text-cyan-400">{stats.monitoredEntitiesCount}</div>
          <div className="text-[11px] text-slate-400">Global Equities & Suppliers</div>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Monitored Products</div>
          <div className="text-2xl font-black text-indigo-400">{stats.monitoredProductsCount}</div>
          <div className="text-[11px] text-slate-400">Commercial BOM Dependencies</div>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Multi-Agent Swarm</div>
          <div className="text-2xl font-black text-emerald-400">{SPECIALIZED_AGENTS.length} Agents</div>
          <div className="text-[11px] text-emerald-400">100% Active Autonomous</div>
        </div>
      </div>

      {/* Active Disruption Signals Feed & Multi-Agent Swarm Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Signals Feed */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Radio className="w-5 h-5 text-rose-400" />
            <span>Detected Disruption Signals & Anomaly Alerts</span>
          </h3>

          <div className="space-y-4">
            {ACTIVE_RADAR_SIGNALS.map((sig) => (
              <div
                key={sig.id}
                className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 hover:border-rose-500/40 transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase border bg-rose-500/10 text-rose-300 border-rose-500/30">
                        {sig.severity}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
                        {sig.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{sig.timestamp}</span>
                    </div>
                    <h4 className="text-base font-bold text-white mt-1">{sig.title}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400 block">{sig.confidence}% Conf</span>
                    <span className="text-[10px] text-slate-400">Signal Strength: {sig.signalStrength}%</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300">{sig.summary}</p>

                {/* Supporting Evidence List */}
                <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase font-mono">Supporting Telemetry Evidence:</div>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {sig.supportingEvidence.map((ev, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Impact Footprint Counter */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
                  <span>Impact Footprint: <strong className="text-white">{sig.impactedEntitiesCount} Companies</strong>, <strong className="text-white">{sig.impactedProductsCount} Products</strong></span>
                  <button
                    onClick={() => onOpenEvidence('coffee-price-surge')}
                    className="flex items-center gap-1 text-cyan-400 hover:underline font-semibold"
                  >
                    <span>Inspect Evidence Chain</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Agent Swarm Status Widget */}
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-5">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <span>Specialized AI Agent Swarm</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">8 specialized reasoning agents active</p>
          </div>

          <div className="space-y-3">
            {SPECIALIZED_AGENTS.map((agent) => (
              <div key={agent.id} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/90 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{agent.name}</span>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 text-[9px] font-bold uppercase rounded-md border border-emerald-500/30">
                    {agent.status}
                  </span>
                </div>
                <div className="text-[11px] text-cyan-300">{agent.role}</div>
                <div className="text-[10px] text-slate-400 italic bg-slate-900/50 p-2 rounded-lg">
                  "{agent.lastAction}"
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
