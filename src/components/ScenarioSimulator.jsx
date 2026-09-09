import React, { useState } from 'react';
import { Sliders, Play, RotateCcw, AlertTriangle, ShieldCheck, TrendingUp, DollarSign, Layers, CheckCircle2 } from 'lucide-react';
import { PRESET_SCENARIOS, runSimulation } from '../services/simulationEngine';

export default function ScenarioSimulator() {
  const [selectedScenario, setSelectedScenario] = useState(PRESET_SCENARIOS[0]);
  const [shockSeverity, setShockSeverity] = useState(selectedScenario.defaultShock);
  const [durationMonths, setDurationMonths] = useState(selectedScenario.defaultDuration);
  const [substitutionElasticity, setSubstitutionElasticity] = useState(selectedScenario.defaultSubstitution);

  const handleSelectScenario = (sc) => {
    setSelectedScenario(sc);
    setShockSeverity(sc.defaultShock);
    setDurationMonths(sc.defaultDuration);
    setSubstitutionElasticity(sc.defaultSubstitution);
  };

  const simulationResult = runSimulation({
    scenarioId: selectedScenario.id,
    shockSeverity,
    durationMonths,
    substitutionElasticity
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 p-6 md:p-8 rounded-3xl border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Monte Carlo What-If Simulation Engine</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Scenario & Shock Simulator</h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Simulate hypothetical global disruptions, export caps, trade embargoes, and weather anomalies. Adjust shock parameters to model downstream supply chain propagation.
          </p>
        </div>

        <button
          onClick={() => {
            setShockSeverity(selectedScenario.defaultShock);
            setDurationMonths(selectedScenario.defaultDuration);
            setSubstitutionElasticity(selectedScenario.defaultSubstitution);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-all shrink-0"
        >
          <RotateCcw className="w-4 h-4 text-cyan-400" />
          <span>Reset Parameters</span>
        </button>
      </div>

      {/* Scenario Preset Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PRESET_SCENARIOS.map((sc) => (
          <button
            key={sc.id}
            onClick={() => handleSelectScenario(sc)}
            className={`p-5 rounded-2xl border text-left transition-all ${
              selectedScenario.id === sc.id
                ? 'bg-gradient-to-br from-indigo-950/80 to-slate-900 border-indigo-500 text-white shadow-xl ring-2 ring-indigo-500/20'
                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/60'
            }`}
          >
            <span className="text-[10px] font-mono font-bold uppercase text-indigo-400 block mb-1">{sc.category}</span>
            <h3 className="text-sm font-bold truncate">{sc.title}</h3>
            <p className="text-xs text-slate-400 mt-2 line-clamp-2">{sc.description}</p>
          </button>
        ))}
      </div>

      {/* Main Simulation Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Parameter Sliders */}
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>Simulation Assumptions</span>
          </h3>

          {/* Slider 1: Shock Severity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">Shock Severity (% Capacity Loss):</span>
              <span className="text-indigo-400 font-mono text-sm">{shockSeverity}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              value={shockSeverity}
              onChange={(e) => setShockSeverity(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>10% Minor</span>
              <span>50% Moderate</span>
              <span>95% Extreme</span>
            </div>
          </div>

          {/* Slider 2: Duration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">Disruption Duration:</span>
              <span className="text-cyan-400 font-mono text-sm">{durationMonths} Month(s)</span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              value={durationMonths}
              onChange={(e) => setDurationMonths(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1 Month</span>
              <span>12 Months</span>
              <span>24 Months</span>
            </div>
          </div>

          {/* Slider 3: Substitution Elasticity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-300">Alternative Supplier Substitution:</span>
              <span className="text-emerald-400 font-mono text-sm">{substitutionElasticity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={substitutionElasticity}
              onChange={(e) => setSubstitutionElasticity(Number(e.target.value))}
              className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0% Locked</span>
              <span>50% Moderate</span>
              <span>100% Elastic</span>
            </div>
          </div>
        </div>

        {/* Right: Simulation Output Results */}
        <div className="lg:col-span-2 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Simulation Results: {selectedScenario.title}</h3>
              <p className="text-xs text-slate-400">Monte Carlo projected downstream impact footprint</p>
            </div>
            <span
              className={`px-3 py-1 rounded-xl text-xs font-black uppercase border ${
                simulationResult.riskLevel === 'CRITICAL'
                  ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              }`}
            >
              {simulationResult.riskLevel} RISK (SCORE: {simulationResult.netImpactScore}/100)
            </span>
          </div>

          {/* Projected Impact Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Categories Affected</div>
              <div className="text-xl font-extrabold text-white mt-1">{simulationResult.metrics.affectedCategoriesCount}</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Companies Exposed</div>
              <div className="text-xl font-extrabold text-cyan-400 mt-1">{simulationResult.metrics.affectedCompaniesCount}</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Products At Risk</div>
              <div className="text-xl font-extrabold text-indigo-400 mt-1">{simulationResult.metrics.affectedProductsCount}</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Estimated Price Spike</div>
              <div className="text-xl font-extrabold text-rose-400 mt-1">+{simulationResult.metrics.estimatedCostIncreasePercent}%</div>
            </div>
          </div>

          {/* Multi-Phase Timeline Projections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Multi-Phase Propagation Timeline</h4>
            <div className="space-y-3">
              {simulationResult.downstreamProjections.map((proj, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800/90 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
                    <span>{proj.timeline} — {proj.phase}</span>
                  </div>
                  <p className="text-xs text-slate-300">{proj.impactDescription}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Mitigation Playbook */}
          <div className="bg-emerald-950/20 p-5 rounded-2xl border border-emerald-500/30 space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Recommended Executive Mitigation Actions
            </h4>
            <ul className="text-xs text-slate-300 space-y-1.5">
              {simulationResult.recommendedMitigationActions.map((act, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
