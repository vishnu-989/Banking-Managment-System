import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { Landmark, PiggyBank, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';

export const DepositOpening = () => {
  const { currentUser, openDeposit } = useBank();
  
  const [depositType, setDepositType] = useState('Fixed Deposit');
  const [amount, setAmount] = useState(10000);
  const [tenureMonths, setTenureMonths] = useState(12);
  const [fromAccount, setFromAccount] = useState(currentUser?.accounts[0]?.accountNumber || '');
  const [msg, setMsg] = useState('');

  if (!currentUser) return null;

  const getInterestRate = (months) => {
    if (months === 6) return 5.5;
    if (months === 12) return 6.2;
    if (months === 24) return 7.0;
    return 7.5;
  };

  const rate = getInterestRate(tenureMonths);
  const totalInterest = (amount * rate * (tenureMonths / 12)) / 100;
  const maturityValue = amount + totalInterest;

  const handleOpenDepositSubmit = (e) => {
    e.preventDefault();
    setMsg('');

    const res = openDeposit({
      depositType,
      amount,
      tenureMonths,
      interestRate: rate,
      fromAccount
    });

    if (res.success) {
      setMsg(`New ${depositType} created successfully! Account No: ${res.accountNumber}`);
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <PiggyBank className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">High-Yield Deposit Creation Terminal</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Open Fixed Deposits (FD) & Recurring Deposits (RD) with guaranteed up to 7.5% APY yield.
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
        
        <form onSubmit={handleOpenDepositSubmit} className="space-y-6">
          
          {/* Deposit Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Select Deposit Scheme</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDepositType('Fixed Deposit')}
                className={`p-4 rounded-2xl border text-left text-xs font-bold transition ${
                  depositType === 'Fixed Deposit' 
                    ? 'bg-emerald-600/20 border-emerald-500 text-white' 
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <div>Fixed Deposit (Lump Sum Investment)</div>
                <div className="text-[10px] text-emerald-400 font-semibold mt-1">Up to 7.5% Guaranteed Return</div>
              </button>

              <button
                type="button"
                onClick={() => setDepositType('Recurring Deposit')}
                className={`p-4 rounded-2xl border text-left text-xs font-bold transition ${
                  depositType === 'Recurring Deposit' 
                    ? 'bg-emerald-600/20 border-emerald-500 text-white' 
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <div>Recurring Deposit (Monthly Savings Plan)</div>
                <div className="text-[10px] text-emerald-400 font-semibold mt-1">Auto Monthly Deduction</div>
              </button>
            </div>
          </div>

          {/* Amount & Source Account */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Fund From Account</label>
              <select
                value={fromAccount}
                onChange={(e) => setFromAccount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {currentUser.accounts.map(acc => (
                  <option key={acc.id} value={acc.accountNumber}>
                    {acc.type} ({acc.accountNumber}) — Bal: ${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Deposit Principal ($)</label>
              <input
                type="number"
                step="500"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Tenure Selection Cards */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Select Investment Tenure</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { months: 6, rate: 5.5 },
                { months: 12, rate: 6.2 },
                { months: 24, rate: 7.0 },
                { months: 36, rate: 7.5 }
              ].map((t) => (
                <button
                  key={t.months}
                  type="button"
                  onClick={() => setTenureMonths(t.months)}
                  className={`p-3.5 rounded-2xl border text-center text-xs transition ${
                    tenureMonths === t.months 
                      ? 'bg-emerald-600 text-white font-bold shadow-lg' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold">{t.months} Months</div>
                  <div className="text-[10px] mt-0.5">{t.rate}% APY</div>
                </button>
              ))}
            </div>
          </div>

          {/* Return Yield Summary Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-400 uppercase font-bold text-[10px]">Guaranteed APY</span>
              <p className="text-lg font-black text-emerald-400 mt-0.5">{rate}% Per Annum</p>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-bold text-[10px]">Total Interest Yield</span>
              <p className="text-lg font-black text-white mt-0.5">${totalInterest.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-slate-400 uppercase font-bold text-[10px]">Maturity Payout Value</span>
              <p className="text-lg font-black text-emerald-300 mt-0.5">${maturityValue.toFixed(2)}</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition"
          >
            Create New {depositType} Account
          </button>

        </form>

      </div>

    </div>
  );
};
