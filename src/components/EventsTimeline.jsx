import React, { useState } from 'react';
import { analyzeUpcomingEvents } from '../services/eventTracker';
import { Calendar, Zap, AlertCircle, Clock, ChevronRight } from 'lucide-react';

export default function EventsTimeline({ company }) {
  const [activeTab, setActiveTab] = useState('all');
  const eventsAnalysis = analyzeUpcomingEvents(company);

  if (!company || !company.upcomingEvents) return null;

  const events = company.upcomingEvents;
  const filteredEvents = activeTab === 'all'
    ? events
    : events.filter(e => e.timeframe === activeTab);

  return (
    <div className="bg-vibe-card border border-vibe-border rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-vibe-border/60">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            Upcoming Catalyst Events & Timeline
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Key corporate milestones, earnings releases, and product launches across upcoming days and years
          </p>
        </div>

        <div className="flex items-center bg-vibe-dark p-1 rounded-xl border border-vibe-border">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Events ({events.length})
          </button>
          <button
            onClick={() => setActiveTab('days')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'days'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Short-Term (Days)
          </button>
          <button
            onClick={() => setActiveTab('years')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'years'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Long-Term (Years)
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between bg-vibe-dark/50 px-4 py-2.5 rounded-xl border border-vibe-border/40">
        <span className="text-xs text-slate-400 flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-400" /> Composite Catalyst Outlook:
        </span>
        <span className="text-xs font-bold text-emerald-400">
          {eventsAnalysis.catalystOutlook} (Impact Score: +{eventsAnalysis.catalystImpactScore})
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {filteredEvents.map((event) => {
          const isShortTerm = event.timeframe === 'days';
          let impactBadgeColor = 'bg-slate-800 text-slate-300 border-slate-700';
          if (event.impact === 'Extreme') impactBadgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
          else if (event.impact === 'High') impactBadgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/30';

          return (
            <div
              key={event.id}
              className="bg-vibe-dark/60 border border-vibe-border/60 hover:border-slate-500/50 rounded-xl p-4 transition-all hover:bg-vibe-dark/90 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${isShortTerm ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'}`}>
                    {event.timeframeLabel}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{event.date}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${impactBadgeColor}`}>
                    Impact: {event.impact}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Prob: {event.probability}
                  </span>
                </div>
              </div>

              <h4 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                {event.title}
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </h4>

              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {event.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
