import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { Sliders, CheckCircle2, DollarSign, Percent } from 'lucide-react';

export const ProductRatesConfig = () => {
  const { ratesConfig, updateInterestRates } = useBank();
  
  const [savingsRate, setSavingsRate] = useState(ratesConfig.savingsRate);
  const [fdRate, setFdRate] = useState(ratesConfig.fdRate);
  const [homeLoanRate, setHomeLoanRate] = useState(ratesConfig.homeLoanRate);
  const [autoLoanRate, setAutoLoanRate] = useState(ratesConfig.autoLoanRate);
  const [personalLoanRate, setPersonalLoanRate] = useState(ratesConfig.personalLoanRate);
  const [msg, setMsg] = useState('');

  const handleSaveRatesSubmit = (e) => {
    e.preventDefault();
    updateInterestRates({
      savingsRate: parseFloat(savingsRate),
      fdRate: parseFloat(fdRate),
      homeLoanRate: parseFloat(homeLoanRate),
      autoLoanRate: parseFloat(autoLoanRate),
      personalLoanRate: parseFloat(personalLoanRate)
    });

    setMsg("Bank interest rate parameters successfully updated across all portals!");
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Sliders className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Interest Rates & Product Yield Configuration</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure central APY yields for Savings, Fixed Deposits, and interest rates for Home, Auto, and Personal Loans.
          </p>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        <form onSubmit={handleSaveRatesSubmit} className="space-y-6 text-xs">
          
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-2">Deposit Yield Parameters</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Savings Account Yield (% APY)</label>
              <input
                type="number"
                step="0.1"
                value={savingsRate}
                onChange={(e) => setSavingsRate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Fixed Deposit 12M Yield (% APY)</label>
              <input
                type="number"
                step="0.1"
                value={fdRate}
                onChange={(e) => setFdRate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-2 pt-2">Credit & Loan Product Rates</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Home Loan Rate (% APY)</label>
              <input
                type="number"
                step="0.1"
                value={homeLoanRate}
                onChange={(e) => setHomeLoanRate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Auto Financing Rate (% APY)</label>
              <input
                type="number"
                step="0.1"
                value={autoLoanRate}
                onChange={(e) => setAutoLoanRate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Personal Express Loan Rate (% APY)</label>
              <input
                type="number"
                step="0.1"
                value={personalLoanRate}
                onChange={(e) => setPersonalLoanRate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition"
          >
            Update Central Rate Parameters
          </button>

        </form>
      </div>

    </div>
  );
};
