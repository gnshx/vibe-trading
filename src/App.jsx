import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CompanySearch from './components/CompanySearch';
import VibeScoreCard from './components/VibeScoreCard';
import EventsTimeline from './components/EventsTimeline';
import TieUpGeopoliticsMap from './components/TieUpGeopoliticsMap';
import ValuationPredictionChart from './components/ValuationPredictionChart';
import Logo from './components/Logo';
import { Layers, Loader2, Sparkles } from 'lucide-react';
import { fetchLiveCompanyResearch } from './services/liveResearchEngine';

export default function App() {
  const [selectedSymbol, setSelectedSymbol] = useState('NVDA');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchLiveCompanyResearch(selectedSymbol)
      .then((data) => {
        if (isMounted) {
          setSelectedCompany(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching live company research:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedSymbol]);

  const handleUpdateCompany = (updatedCompany) => {
    setSelectedCompany(updatedCompany);
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-100 flex flex-col font-sans antialiased">
      <Header
        selectedCompany={selectedCompany || { symbol: selectedSymbol, name: selectedSymbol }}
        onSelectSymbol={setSelectedSymbol}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Company Search Bar */}
        <CompanySearch
          selectedCompany={selectedCompany || { symbol: selectedSymbol, name: selectedSymbol, primaryExchange: 'NASDAQ', country: 'Global', hqCity: 'Global', ceo: 'Executive', marketCap: '$10B+', currentPrice: 100.0 }}
          onSelectSymbol={setSelectedSymbol}
          isLoading={isLoading}
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 space-y-4 bg-vibe-card border border-vibe-border rounded-2xl shadow-xl">
            <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
            <div className="text-center">
              <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-bounce" />
                Performing Deep Live Research for {selectedSymbol}...
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fetching real-time stock prices, live news feeds, catalyst events, and geopolitical tie-ups...
              </p>
            </div>
          </div>
        )}

        {/* Main Content Dashboard */}
        {!isLoading && selectedCompany && (
          <>
            {/* Navigation Tabs */}
            <div className="flex border-b border-vibe-border space-x-2 sm:space-x-4 overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'bg-vibe-card border-t-2 border-indigo-500 text-indigo-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-vibe-card/40'
                }`}
              >
                <Layers className="w-4 h-4" /> Comprehensive Dashboard
              </button>
              <button
                onClick={() => setActiveTab('reputation')}
                className={`px-4 py-2 text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'reputation'
                    ? 'bg-vibe-card border-t-2 border-indigo-500 text-indigo-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-vibe-card/40'
                }`}
              >
                Vibe & Reputation
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`px-4 py-2 text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'events'
                    ? 'bg-vibe-card border-t-2 border-indigo-500 text-indigo-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-vibe-card/40'
                }`}
              >
                Catalyst Events (Days/Years)
              </button>
              <button
                onClick={() => setActiveTab('geopolitics')}
                className={`px-4 py-2 text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'geopolitics'
                    ? 'bg-vibe-card border-t-2 border-indigo-500 text-indigo-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-vibe-card/40'
                }`}
              >
                Tie-Ups & Geopolitics
              </button>
              <button
                onClick={() => setActiveTab('valuation')}
                className={`px-4 py-2 text-sm font-semibold rounded-t-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'valuation'
                    ? 'bg-vibe-card border-t-2 border-indigo-500 text-indigo-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-vibe-card/40'
                }`}
              >
                Value Predictions
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <VibeScoreCard company={selectedCompany} />
                  <ValuationPredictionChart company={selectedCompany} />
                </div>

                <EventsTimeline company={selectedCompany} onUpdateCompany={handleUpdateCompany} />

                <TieUpGeopoliticsMap company={selectedCompany} />
              </div>
            )}

            {activeTab === 'reputation' && (
              <div className="max-w-4xl mx-auto">
                <VibeScoreCard company={selectedCompany} />
              </div>
            )}

            {activeTab === 'events' && (
              <div className="max-w-4xl mx-auto">
                <EventsTimeline company={selectedCompany} onUpdateCompany={handleUpdateCompany} />
              </div>
            )}

            {activeTab === 'geopolitics' && (
              <div className="max-w-5xl mx-auto">
                <TieUpGeopoliticsMap company={selectedCompany} />
              </div>
            )}

            {activeTab === 'valuation' && (
              <div className="max-w-5xl mx-auto">
                <ValuationPredictionChart company={selectedCompany} />
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-vibe-border bg-vibe-card/60 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Logo size="sm" />
            <span className="font-semibold text-slate-400">Vibe Trading Engine</span>
            <span>- Live Geopolitical & Sentiment Analytics Engine</span>
          </div>
          <div>
            Real-Time Market Search & Synthesis. Disclaimer: Proprietary Vibe Score model for research purposes only.
          </div>
        </div>
      </footer>
    </div>
  );
}
