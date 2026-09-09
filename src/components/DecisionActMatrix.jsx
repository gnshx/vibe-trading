import React, { useState } from 'react';
import { Zap, ShieldCheck, Terminal, Download, ArrowUpRight, CheckCircle2, FileJson, AlertCircle } from 'lucide-react';

export default function DecisionActMatrix() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const actionItems = [
    {
      category: 'Procurement & Supply Chain',
      priority: 'HIGH PRIORITY',
      title: 'Execute Forward Arabica Bean Contracts (Q3-Q4)',
      action: 'Lock in 12-month forward pricing for coffee bean inventories before 24% Brazil yield deficit translates into spot market spikes.',
      impact: 'Protects COGS margins by ~8.5%'
    },
    {
      category: 'Enterprise Hardware & IT',
      priority: 'CRITICAL PRIORITY',
      title: 'Dual-Source Tier-1 Laptop & Workstation OEM Suppliers',
      action: 'Qualify secondary regional distributors to hedge against Taiwan sub-3nm chip packaging lead-time extensions (32 weeks).',
      impact: 'Mitigates 45% hardware shipment delay risk'
    },
    {
      category: 'Logistics & Ocean Freight',
      priority: 'MEDIUM PRIORITY',
      title: 'Reroute High-Value Transit via Trans-Pacific Rail Corridors',
      action: 'Bypass Suez/Red Sea Cape detours by shifting Asia-to-US/EU cargo to sea-air multimodal routes.',
      impact: 'Saves 14 days transit lead time'
    }
  ];

  const apiEndpoints = [
    { method: 'GET', path: '/api/v1/world-graph/events', desc: 'Fetch active global disruption signals & causal edges.' },
    { method: 'GET', path: '/api/v1/impact/products', desc: 'Query 7-level product exposure matrix for any ticker or commodity.' },
    { method: 'POST', path: '/api/v1/simulate/scenario', desc: 'Execute serverless Monte Carlo supply shock simulations.' },
    { method: 'GET', path: '/api/v1/evidence/verify', desc: 'Run evidence fusion verification on multi-source claims.' }
  ];

  const handleExportReport = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 p-6 md:p-8 rounded-3xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Decision Intelligence → Execution Matrix</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Actionable Executive Playbooks & API Layer</h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Transform world impact intelligence into concrete business decisions, procurement playbooks, risk mitigation actions, and autonomous API triggers.
          </p>
        </div>

        <button
          onClick={handleExportReport}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-emerald-500/20 transition-all shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>{downloadSuccess ? 'Report Exported (JSON)' : 'Export Intelligence Report'}</span>
        </button>
      </div>

      {/* Recommended Action Playbooks */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Executive Strategic Action Playbooks</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actionItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400">{item.category}</span>
                  <span className="px-2.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    {item.priority}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{item.action}</p>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs text-emerald-400 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{item.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intelligence Infrastructure API Layer Preview */}
      <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <span>Global Intelligence Infrastructure API</span>
            </h3>
            <p className="text-xs text-slate-400">RESTful API endpoints for external AI agents and enterprise ERP systems</p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-xl border border-cyan-500/30">
            API STATUS: ACTIVE
          </span>
        </div>

        <div className="space-y-3">
          {apiEndpoints.map((ep, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 font-mono">
                <span className={`px-2 py-1 rounded-md font-bold text-[10px] ${
                  ep.method === 'GET' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {ep.method}
                </span>
                <span className="text-white font-bold">{ep.path}</span>
              </div>
              <span className="text-slate-400">{ep.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
