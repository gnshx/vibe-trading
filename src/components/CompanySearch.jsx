import React, { useState } from 'react';
import { Search, Building2, Globe, MapPin, Clock, UserCheck, Shield } from 'lucide-react';

export default function CompanySearch({ companies, selectedCompany, onSelectCompany }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies.filter(
    (c) =>
      c.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-vibe-card border border-vibe-border rounded-2xl p-6 shadow-xl mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-400" />
            {selectedCompany.name} ({selectedCompany.symbol})
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {selectedCompany.sector} • {selectedCompany.primaryExchange} Listing
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search company, ticker, sector..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-vibe-dark border border-vibe-border text-slate-200 text-sm rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
          {searchTerm && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-vibe-dark border border-vibe-border rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => {
                      onSelectCompany(comp);
                      setSearchTerm('');
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-vibe-border/50 flex items-center justify-between border-b border-vibe-border/30 last:border-b-0 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-white">{comp.symbol} - {comp.name}</div>
                      <div className="text-xs text-slate-400">{comp.sector}</div>
                    </div>
                    <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded font-mono">
                      {comp.marketCap}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-slate-400">No matching companies found</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-vibe-border/60">
        <div className="bg-vibe-dark/60 p-3.5 rounded-xl border border-vibe-border/40">
          <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" /> Market Time Zone
          </div>
          <div className="text-sm font-semibold text-white">{selectedCompany.timezone}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">{selectedCompany.geopolitics.timezoneEffect.marketHours}</div>
        </div>

        <div className="bg-vibe-dark/60 p-3.5 rounded-xl border border-vibe-border/40">
          <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
            <MapPin className="w-3.5 h-3.5 text-rose-400" /> HQ & Country
          </div>
          <div className="text-sm font-semibold text-white">{selectedCompany.hqCity}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">{selectedCompany.country} Sovereign Jurisdiction</div>
        </div>

        <div className="bg-vibe-dark/60 p-3.5 rounded-xl border border-vibe-border/40">
          <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Executive Leadership
          </div>
          <div className="text-sm font-semibold text-white">{selectedCompany.ceo} (CEO)</div>
          <div className="text-[11px] text-slate-400 mt-0.5">{selectedCompany.leaders.length} Key Executives Monitored</div>
        </div>

        <div className="bg-vibe-dark/60 p-3.5 rounded-xl border border-vibe-border/40">
          <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
            <Shield className="w-3.5 h-3.5 text-amber-400" /> Market Capitalization
          </div>
          <div className="text-sm font-semibold text-emerald-400 font-mono">{selectedCompany.marketCap}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Current Stock: ${selectedCompany.currentPrice.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
