import React, { useState } from 'react';
import { analyzeUpcomingEvents } from '../services/eventTracker';
import { Calendar, Zap, CheckCircle2, Plus, Clock, ChevronRight, X } from 'lucide-react';

export default function EventsTimeline({ company, onUpdateCompany }) {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    timeframe: 'days',
    timeframeLabel: 'Next 14 Days',
    date: new Date().toISOString().split('T')[0],
    category: 'Product Launch',
    impact: 'High',
    direction: 'Bullish',
    probability: '80%',
    description: ''
  });

  const eventsAnalysis = analyzeUpcomingEvents(company);

  if (!company || !company.upcomingEvents) return null;

  const events = company.upcomingEvents;
  const filteredEvents = events.filter((e) => {
    if (activeTab === 'all') return e.status !== 'completed';
    if (activeTab === 'days') return e.status !== 'completed' && e.timeframe === 'days';
    if (activeTab === 'years') return e.status !== 'completed' && e.timeframe === 'years';
    if (activeTab === 'completed') return e.status === 'completed';
    return true;
  });

  const handleCompleteEvent = (eventId, outcome) => {
    const updatedEvents = company.upcomingEvents.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          status: 'completed',
          outcome: outcome
        };
      }
      return e;
    });

    onUpdateCompany({
      ...company,
      upcomingEvents: updatedEvents
    });
  };

  const handleAddEventSubmit = (e) => {
    e.preventDefault();
    if (!newEvent.title.trim()) return;

    const eventObj = {
      ...newEvent,
      id: `${company.id.toLowerCase()}-e-${Date.now()}`,
      status: 'upcoming'
    };

    onUpdateCompany({
      ...company,
      upcomingEvents: [eventObj, ...company.upcomingEvents]
    });

    setShowAddModal(false);
    setNewEvent({
      title: '',
      timeframe: 'days',
      timeframeLabel: 'Next 14 Days',
      date: new Date().toISOString().split('T')[0],
      category: 'Product Launch',
      impact: 'High',
      direction: 'Bullish',
      probability: '80%',
      description: ''
    });
  };

  return (
    <div className="bg-vibe-card border border-vibe-border rounded-2xl p-6 shadow-xl relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-vibe-border/60">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            Catalyst Events & Milestone Timeline
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Short-term days catalysts, long-term years expansion, and completed event realization
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-vibe-dark p-1 rounded-xl border border-vibe-border text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'all' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Upcoming ({eventsAnalysis.upcomingEventsCount})
            </button>
            <button
              onClick={() => setActiveTab('days')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'days' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Days
            </button>
            <button
              onClick={() => setActiveTab('years')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'years' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Years
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                activeTab === 'completed' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Completed ({eventsAnalysis.completedEventsCount})
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Add Event
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between bg-vibe-dark/50 px-4 py-2.5 rounded-xl border border-vibe-border/40 gap-2">
        <span className="text-xs text-slate-400 flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-400" /> Composite Catalyst Outlook:
        </span>
        <div className="flex items-center space-x-3 text-xs font-bold">
          <span className="text-indigo-400">Upcoming Impact: +{eventsAnalysis.catalystImpactScore}</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400">Completed Boost: +{eventsAnalysis.realizedCatalystScore}</span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => {
            const isCompleted = event.status === 'completed';
            const isShortTerm = event.timeframe === 'days';

            let impactBadgeColor = 'bg-slate-800 text-slate-300 border-slate-700';
            if (event.impact === 'Extreme') impactBadgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
            else if (event.impact === 'High') impactBadgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/30';

            return (
              <div
                key={event.id}
                className={`border rounded-xl p-4 transition-all group ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-vibe-dark/60 border-vibe-border/60 hover:border-slate-500/50 hover:bg-vibe-dark/90'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    {isCompleted ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border bg-emerald-500/10 text-emerald-400 border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Realized ({event.outcome || 'Completed'})
                      </span>
                    ) : (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                          isShortTerm
                            ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                            : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                        }`}
                      >
                        {event.timeframeLabel}
                      </span>
                    )}
                    <span className="text-xs font-mono text-slate-400">{event.date}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${impactBadgeColor}`}>
                      Impact: {event.impact}
                    </span>
                    {!isCompleted && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Prob: {event.probability}
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {event.title}
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                  </span>

                  {!isCompleted && onUpdateCompany && (
                    <div className="flex items-center space-x-1 text-xs">
                      <button
                        onClick={() => handleCompleteEvent(event.id, 'Exceeded Expectations')}
                        className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded text-[11px] font-medium transition-all"
                        title="Mark event as realized with positive outcome"
                      >
                        ✓ Completed (Beat)
                      </button>
                      <button
                        onClick={() => handleCompleteEvent(event.id, 'Bearish Miss')}
                        className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-1 rounded text-[11px] font-medium transition-all"
                        title="Mark event as realized with negative outcome"
                      >
                        ✕ Completed (Miss)
                      </button>
                    </div>
                  )}
                </h4>

                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{event.description}</p>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-slate-400 text-sm">
            No events found for this filter tab.
          </div>
        )}
      </div>

      {/* Add Custom Catalyst Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-vibe-dark border border-vibe-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-vibe-border pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-indigo-400" />
                Add Catalyst Event for {company.symbol}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEventSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next-Gen Product Launch / Government Contract"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full bg-vibe-card border border-vibe-border rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Timeframe Horizon</label>
                  <select
                    value={newEvent.timeframe}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        timeframe: e.target.value,
                        timeframeLabel: e.target.value === 'days' ? 'Next 14 Days' : 'Next 1-2 Years'
                      })
                    }
                    className="w-full bg-vibe-card border border-vibe-border rounded-xl px-3 py-2 text-slate-100"
                  >
                    <option value="days">Short-Term (Days)</option>
                    <option value="years">Long-Term (Years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full bg-vibe-card border border-vibe-border rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Impact Level</label>
                  <select
                    value={newEvent.impact}
                    onChange={(e) => setNewEvent({ ...newEvent, impact: e.target.value })}
                    className="w-full bg-vibe-card border border-vibe-border rounded-xl px-3 py-2 text-slate-100"
                  >
                    <option value="Extreme">Extreme</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Vibe Direction</label>
                  <select
                    value={newEvent.direction}
                    onChange={(e) => setNewEvent({ ...newEvent, direction: e.target.value })}
                    className="w-full bg-vibe-card border border-vibe-border rounded-xl px-3 py-2 text-slate-100"
                  >
                    <option value="Bullish">Bullish</option>
                    <option value="Bearish">Bearish</option>
                    <option value="Neutral">Neutral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Probability</label>
                  <select
                    value={newEvent.probability}
                    onChange={(e) => setNewEvent({ ...newEvent, probability: e.target.value })}
                    className="w-full bg-vibe-card border border-vibe-border rounded-xl px-3 py-2 text-slate-100"
                  >
                    <option value="90%">90% (High)</option>
                    <option value="75%">75% (Moderate)</option>
                    <option value="50%">50% (50/50)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Description / Analysis</label>
                <textarea
                  rows="3"
                  placeholder="Explain why this event impacts the company's valuation and market sentiment..."
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full bg-vibe-card border border-vibe-border rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl font-semibold shadow-lg shadow-indigo-600/30"
                >
                  Add Event to Timeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
