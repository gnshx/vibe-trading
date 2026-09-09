import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Pause, Play, Zap, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

const MOCK_STREAM_EVENTS = [
  { id: 'ev-101', time: '10:24:12', title: 'Taiwan Strait Maritime Defense Patrol Heightened', category: 'Geopolitics', impact: 'High', node: 'TSMC Fab 18 (Tainan)' },
  { id: 'ev-102', time: '10:23:45', title: 'Lithium Carbonate Spot Contract Price +4.2%', category: 'Commodity', impact: 'Medium', node: 'Albemarle Lithium Supply' },
  { id: 'ev-103', time: '10:22:10', title: 'Rotterdam Port Terminal Automation Upgrade Complete', category: 'Logistics', impact: 'Low', node: 'ASML EUV Shipments' },
  { id: 'ev-104', time: '10:21:05', title: 'Panama Canal Transit Slots Restricted by -15%', category: 'Logistics', impact: 'High', node: 'US East Coast Freight' },
  { id: 'ev-105', time: '10:19:30', title: 'South American Hydrological Basin Rainfall Deficit', category: 'Climate', impact: 'Medium', node: 'Coffee & Soybean Yields' },
  { id: 'ev-106', time: '10:18:00', title: 'Advanced Packaging Substrate Lead Time Expands to 28w', category: 'Supply Chain', impact: 'High', node: 'NVDA H200 Accelerators' },
];

export default function LiveIngestionFeed() {
  const [events, setEvents] = useState(MOCK_STREAM_EVENTS);
  const [isPlaying, setIsPlaying] = useState(true);
  const [ingestedCount, setIngestedCount] = useState(34218);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      const randomEv = MOCK_STREAM_EVENTS[Math.floor(Math.random() * MOCK_STREAM_EVENTS.length)];
      const newEv = {
        ...randomEv,
        id: `ev-${Date.now()}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      };
      setEvents((prev) => [newEv, ...prev.slice(0, 4)]);
      setIngestedCount((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-200">Real-Time World Model Ingestion Stream</h3>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full">
                LIVE PIPELINE
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Continuously parsing global unstructured feeds • Ingested Edges: <span className="font-mono text-cyan-300 font-bold">{ingestedCount.toLocaleString()}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span>Pause Feed</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resume Feed</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stream Items Carousel */}
      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
        <AnimatePresence mode="popLayout">
          {events.slice(0, 3).map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-between hover:border-cyan-500/40 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-slate-400">{item.time}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                    item.impact === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  }`}>
                    {item.category} • {item.impact} Impact
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-200 line-clamp-2">{item.title}</p>
              </div>

              <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="truncate">Target: <strong className="text-cyan-400">{item.node}</strong></span>
                <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
