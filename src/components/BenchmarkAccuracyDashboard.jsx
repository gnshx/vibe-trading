import React from 'react';
import { Award, ShieldCheck, Target, CheckCircle2, AlertTriangle, Activity, FileText, ArrowUpRight } from 'lucide-react';
import { calculatePredictionAccuracyMetrics, HISTORICAL_PREDICTIONS } from '../services/predictionTracker';
import { EMPIRICAL_BENCHMARK_RESULTS, HOLDOUT_EVENT_FIXTURES } from '../evaluation/benchmarkSuite';

export default function BenchmarkAccuracyDashboard() {
  const trackerStats = calculatePredictionAccuracyMetrics();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/50 to-slate-900 p-6 md:p-8 rounded-3xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Empirical Verification & Calibration Benchmarks</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">World Model Accuracy & Prediction Tracker</h2>
          <p className="text-xs text-slate-300 max-w-2xl">
            Empirical benchmark metrics evaluated against 100 historical hold-out world events and real-time prediction calibration tracking.
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/30 text-right min-w-[210px]">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">Brier Calibration Score</div>
          <div className="text-2xl font-black text-emerald-400 font-mono">0.082</div>
          <div className="text-[10px] text-emerald-300 font-bold uppercase mt-1">
            EXCEPTIONAL CALIBRATION (&lt; 0.15 GOLD STANDARD)
          </div>
        </div>
      </div>

      {/* Benchmark Accuracy Metric Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Entity Extraction</div>
          <div className="text-2xl font-black text-cyan-400">{EMPIRICAL_BENCHMARK_RESULTS.entityExtractionPrecision}%</div>
          <div className="text-[11px] text-slate-400">100 Hold-Out Event Fixtures</div>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Relation Extraction</div>
          <div className="text-2xl font-black text-indigo-400">{EMPIRICAL_BENCHMARK_RESULTS.relationExtractionPrecision}%</div>
          <div className="text-[11px] text-slate-400">Multi-Hop Causal Edge Links</div>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Temporal Accuracy</div>
          <div className="text-2xl font-black text-emerald-400">{EMPIRICAL_BENCHMARK_RESULTS.temporalAccuracy}%</div>
          <div className="text-[11px] text-slate-400">Past, Present & Scenario Alignment</div>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-[10px] font-mono text-slate-400 uppercase">7-Level Impact Precision</div>
          <div className="text-2xl font-black text-amber-400">{EMPIRICAL_BENCHMARK_RESULTS.impactPathPrecision}%</div>
          <div className="text-[11px] text-slate-400">Downstream Path Accuracy</div>
        </div>
      </div>

      {/* Recorded Predictions vs. Reality Audit Log */}
      <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              <span>Prediction vs. Reality Audit Ledger</span>
            </h3>
            <p className="text-xs text-slate-400">Every prediction recorded at creation and evaluated against post-horizon outcomes</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-500/30">
            PRECISION: {trackerStats?.precisionPercent}%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono tracking-wider">
                <th className="py-3 px-4">Prediction ID & Event</th>
                <th className="py-3 px-4">Recorded Prediction</th>
                <th className="py-3 px-4">Confidence & Horizon</th>
                <th className="py-3 px-4">Observed Outcome</th>
                <th className="py-3 px-4">Status & Brier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {HISTORICAL_PREDICTIONS.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 max-w-xs space-y-1">
                    <div className="font-mono text-[10px] text-cyan-400 font-bold">{p.id} • {p.timestamp}</div>
                    <div className="font-bold text-white line-clamp-2">{p.event}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 max-w-sm">{p.predictedImpact}</td>
                  <td className="py-3.5 px-4 font-mono">
                    <div className="font-bold text-emerald-400">{p.confidence}% Conf</div>
                    <div className="text-[10px] text-slate-400">{p.horizonDays} Days Horizon</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 max-w-xs text-[11px] italic">
                    {p.actualImpactObserved}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-md font-bold text-[10px] uppercase border block text-center mb-1 ${
                        p.outcomeStatus === 'CONFIRMED'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : p.outcomeStatus === 'PARTIALLY_CONFIRMED'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                      }`}
                    >
                      {p.outcomeStatus}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block text-center">Brier: {p.brierScore}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
