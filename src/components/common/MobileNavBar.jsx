import React from 'react';
import { Home, FileText, CreditCard, Zap, Grid } from 'lucide-react';

export const MobileNavBar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 p-2 grid grid-cols-5 gap-1 z-50 text-[10px] font-semibold text-center text-slate-400">
      <button
        onClick={() => setActiveTab('overview')}
        className={`flex flex-col items-center py-1 rounded-xl transition ${
          activeTab === 'overview' ? 'text-indigo-400 font-bold' : 'hover:text-slate-200'
        }`}
      >
        <Home className="h-4 w-4 mb-0.5" />
        <span>Home</span>
      </button>

      <button
        onClick={() => setActiveTab('statement')}
        className={`flex flex-col items-center py-1 rounded-xl transition ${
          activeTab === 'statement' ? 'text-indigo-400 font-bold' : 'hover:text-slate-200'
        }`}
      >
        <FileText className="h-4 w-4 mb-0.5" />
        <span>Passbook</span>
      </button>

      <button
        onClick={() => setActiveTab('cards')}
        className={`flex flex-col items-center py-1 rounded-xl transition ${
          activeTab === 'cards' ? 'text-indigo-400 font-bold' : 'hover:text-slate-200'
        }`}
      >
        <CreditCard className="h-4 w-4 mb-0.5" />
        <span>Cards</span>
      </button>

      <button
        onClick={() => setActiveTab('bills')}
        className={`flex flex-col items-center py-1 rounded-xl transition ${
          activeTab === 'bills' ? 'text-indigo-400 font-bold' : 'hover:text-slate-200'
        }`}
      >
        <Zap className="h-4 w-4 mb-0.5" />
        <span>Pay Bills</span>
      </button>

      <button
        onClick={() => setActiveTab('support')}
        className={`flex flex-col items-center py-1 rounded-xl transition ${
          activeTab === 'support' ? 'text-indigo-400 font-bold' : 'hover:text-slate-200'
        }`}
      >
        <Grid className="h-4 w-4 mb-0.5" />
        <span>Help Desk</span>
      </button>
    </div>
  );
};
