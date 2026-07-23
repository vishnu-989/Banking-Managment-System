import React, { useState } from 'react';
import { BRANCH_LOCATIONS } from '../../data/initialData';
import { MapPin, Navigation, Clock, Phone, DollarSign, ShieldCheck, Search } from 'lucide-react';

export const AtmBranchLocator = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBranches = BRANCH_LOCATIONS.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <MapPin className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Branch & Cash Deposit ATM Locator</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Locate nearest ApexBank branches, 24/7 Cash Deposit ATMs, and branch manager contacts.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by city, address, or branch name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-xs text-slate-100 font-medium focus:outline-none"
        />
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBranches.map((b) => (
          <div key={b.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl relative">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-white">{b.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                  <span>{b.address}</span>
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {b.status}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Working Hours:</span>
                </span>
                <span className="font-semibold">{b.hours}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Phone className="h-3.5 w-3.5" />
                  <span>Branch Desk:</span>
                </span>
                <span className="font-mono text-indigo-300">{b.phone}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300 pt-1 border-t border-slate-800">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                  <span>ATM Cash Vault:</span>
                </span>
                <span className="font-bold text-emerald-400">{b.atmCash}</span>
              </div>
            </div>

            <button
              onClick={() => alert(`Opening GPS Maps directions to ${b.address}`)}
              className="w-full py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <Navigation className="h-3.5 w-3.5" />
              <span>Get Directions</span>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
