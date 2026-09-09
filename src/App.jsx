import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import ProductNavigation from './components/ProductNavigation';
import LiveIngestionFeed from './components/LiveIngestionFeed';
import DecisionSearch from './components/DecisionSearch';
import TemporalWorldGraph from './components/TemporalWorldGraph';
import ImpactRadarDashboard from './components/ImpactRadarDashboard';
import ScenarioSimulator from './components/ScenarioSimulator';
import DecisionActMatrix from './components/DecisionActMatrix';
import BenchmarkAccuracyDashboard from './components/BenchmarkAccuracyDashboard';
import ExecutiveReportModal from './components/ExecutiveReportModal';
import CompanySearch from './components/CompanySearch';
import VibeScoreCard from './components/VibeScoreCard';
import EventsTimeline from './components/EventsTimeline';
import TieUpGeopoliticsMap from './components/TieUpGeopoliticsMap';
import ValuationPredictionChart from './components/ValuationPredictionChart';
import ConfidenceEvidenceModal from './components/ConfidenceEvidenceModal';
import Logo from './components/Logo';
import { Loader2, Sparkles } from 'lucide-react';
import { fetchLiveCompanyResearch, getInitialCompanyResearch } from './services/liveResearchEngine';

export default function App() {
  const [selectedSymbol, setSelectedSymbol] = useState('NVDA');
  const [selectedCompany, setSelectedCompany] = useState(() => getInitialCompanyResearch('NVDA'));
  const [isLoading, setIsLoading] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Primary Experience Tab ('ask' | 'explore' | 'radar' | 'simulate' | 'act' | 'benchmark' | 'ticker')
  const [primaryTab, setPrimaryTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || 'ask';
  });
  const [evidenceClaimId, setEvidenceClaimId] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (selectedCompany && selectedCompany.symbol === selectedSymbol) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }

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
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans antialiased">
      {/* Top Header */}
      <Header
        selectedCompany={selectedCompany || { symbol: selectedSymbol, name: selectedSymbol }}
        onSelectSymbol={(sym) => {
          setSelectedSymbol(sym);
          setPrimaryTab('ticker');
        }}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Primary Experience Navigation Bar */}
      <ProductNavigation
        activeTab={primaryTab}
        setActiveTab={setPrimaryTab}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Real-Time World Model Ingestion Stream Banner */}
        <LiveIngestionFeed />

        {/* Tab View Transition Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={primaryTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Experience 1: 🎯 Ask (Decision Search & Causal Map) */}
            {primaryTab === 'ask' && (
              <DecisionSearch onOpenEvidence={(claimId) => setEvidenceClaimId(claimId)} />
            )}

            {/* Experience 2: 🕸️ Explore (Temporal World Graph) */}
            {primaryTab === 'explore' && (
              <TemporalWorldGraph />
            )}

            {/* Experience 3: 📡 Monitor (Impact Radar & Anomaly Monitor) */}
            {primaryTab === 'radar' && (
              <ImpactRadarDashboard onOpenEvidence={(claimId) => setEvidenceClaimId(claimId)} />
            )}

            {/* Experience 4: 🎛️ Simulate (Scenario Simulator / What-If Lab) */}
            {primaryTab === 'simulate' && (
              <ScenarioSimulator />
            )}

            {/* Experience 5: ⚡ Act (Decision Playbooks & API Matrix) */}
            {primaryTab === 'act' && (
              <DecisionActMatrix />
            )}

            {/* Experience 6: 🧪 Benchmark (Empirical Accuracy & Brier Calibration) */}
            {primaryTab === 'benchmark' && (
              <BenchmarkAccuracyDashboard />
            )}

            {/* Ticker Focus Dashboard (Company Telemetry) */}
            {primaryTab === 'ticker' && (
              <div className="space-y-8">
                <CompanySearch
                  selectedCompany={selectedCompany || { symbol: selectedSymbol, name: selectedSymbol, primaryExchange: 'NASDAQ', country: 'Global', hqCity: 'Global', ceo: 'Executive', marketCap: '$10B+', currentPrice: 100.0 }}
                  onSelectSymbol={setSelectedSymbol}
                  isLoading={isLoading}
                />

                {isLoading && (
                  <div className="flex flex-col items-center justify-center py-16 space-y-4 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl">
                    <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5 text-cyan-400 animate-bounce" />
                        Synthesizing Live Telemetry for {selectedSymbol}...
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Fetching real-time quotes, news feeds, catalyst timelines, and geopolitical risk models...
                      </p>
                    </div>
                  </div>
                )}

                {!isLoading && selectedCompany && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <VibeScoreCard company={selectedCompany} />
                      <ValuationPredictionChart company={selectedCompany} />
                    </div>
                    <EventsTimeline company={selectedCompany} onUpdateCompany={handleUpdateCompany} />
                    <TieUpGeopoliticsMap company={selectedCompany} />
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Evidence Inspection Modal */}
      <ConfidenceEvidenceModal
        claimId={evidenceClaimId}
        onClose={() => setEvidenceClaimId(null)}
      />

      {/* Executive Intelligence Briefing Exporter Modal */}
      <ExecutiveReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Global Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Logo size="sm" />
            <span className="font-bold text-slate-200">Global Impact Intelligence Engine</span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-400 font-mono">v2.0 Architecture</span>
          </div>
          <div className="text-slate-500">
            Autonomous World Modeling, Causal Downstream Propagation & Decision Search.
          </div>
        </div>
      </footer>
    </div>
  );
}

