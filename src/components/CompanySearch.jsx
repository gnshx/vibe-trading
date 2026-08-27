import React, { useState, useEffect } from 'react';
import { Search, Building2, MapPin, Clock, UserCheck, Shield, Loader2, Sparkles } from 'lucide-react';
import { searchLiveCompanies } from '../services/liveResearchEngine';

export default function CompanySearch({ selectedCompany, onSelectSymbol, isLoading }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchLiveCompanies(searchTerm);
        setSearchResults(results);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSelectResult = (result) => {
    onSelectSymbol(result.symbol);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleDirectSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSelectSymbol(searchTerm.trim().toUpperCase());
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  return (
    <div className="bg-vibe-card border border-vibe-border rounded-2xl p-6 shadow-xl mb-6 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-400" />
            {selectedCompany.name} ({selectedCompany.symbol})
            {isLoading && <Loader2 className="w-5 h-5 text-cyan-400 animate-spin ml-2" />}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {selectedCompany.sector} • {selectedCompany.primaryExchange} Live Research Profile
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <form onSubmit={handleDirectSearchSubmit}>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Live search ANY ticker, company (e.g. AAPL, NVDA, RELIANCE, AMD)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-vibe-dark border border-vibe-border text-slate-200 text-sm rounded-xl pl-9 pr-24 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
              >
                {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                Analyze
              </button>
            </div>
          </form>

          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-vibe-dark border border-vibe-border rounded-xl shadow-2xl z-50 max-h-72 overflow-y-auto">
              <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-vibe-border/40">
                Live Market Results
              </div>
              {searchResults.map((res) => (
                <button
                  key={res.symbol}
                  onClick={() => handleSelectResult(res)}
                  className="w-full text-left px-4 py-3 hover:bg-vibe-border/50 flex items-center justify-between border-b border-vibe-border/30 last:border-b-0 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-white">
                      {res.symbol} - {res.name}
                    </div>
                    <div className="text-xs text-slate-400">{res.sector || 'Stock Equity'}</div>
                  </div>
                  <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded font-mono border border-indigo-500/20">
                    {res.exchange}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-vibe-border/60">
        <div className="bg-vibe-dark/60 p-3.5 rounded-xl border border-vibe-border/40">
          <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" /> Market Exchange
          </div>
          <div className="text-sm font-semibold text-white">{selectedCompany.primaryExchange}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {selectedCompany.geopolitics?.timezoneEffect?.marketHours || 'Live Market Hours'}
          </div>
        </div>

        <div className="bg-vibe-dark/60 p-3.5 rounded-xl border border-vibe-border/40">
          <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
            <MapPin className="w-3.5 h-3.5 text-rose-400" /> Jurisdiction & Country
          </div>
          <div className="text-sm font-semibold text-white">{selectedCompany.country}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">{selectedCompany.hqCity}</div>
        </div>

        <div className="bg-vibe-dark/60 p-3.5 rounded-xl border border-vibe-border/40">
          <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Corporate Governance
          </div>
          <div className="text-sm font-semibold text-white">{selectedCompany.ceo}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {selectedCompany.leaders?.length || 1} Key Executive Roles
          </div>
        </div>

        <div className="bg-vibe-dark/60 p-3.5 rounded-xl border border-vibe-border/40">
          <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
            <Shield className="w-3.5 h-3.5 text-amber-400" /> Live Market Capitalization
          </div>
          <div className="text-sm font-semibold text-emerald-400 font-mono">{selectedCompany.marketCap}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Stock Price: ${selectedCompany.currentPrice?.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
