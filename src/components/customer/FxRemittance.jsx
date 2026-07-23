import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { Globe, ArrowRightLeft, Send, CheckCircle2, TrendingUp } from 'lucide-react';

export const FxRemittance = () => {
  const { fxRates, currentUser, performTransfer } = useBank();
  
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromAmount, setFromAmount] = useState('1000');
  const [recipientIban, setRecipientIban] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [swiftCode, setSwiftCode] = useState('BARCGB22');
  const [pin, setPin] = useState('');
  const [msg, setMsg] = useState('');

  if (!currentUser) return null;

  // Rate lookup calculation
  const getRate = () => {
    if (toCurrency === 'EUR') return 0.92;
    if (toCurrency === 'GBP') return 0.77;
    if (toCurrency === 'JPY') return 156.40;
    if (toCurrency === 'CAD') return 1.36;
    return 1.0;
  };

  const rate = getRate();
  const convertedAmount = (parseFloat(fromAmount) || 0) * rate;

  const handleWireSubmit = (e) => {
    e.preventDefault();
    setMsg('');

    if (!recipientIban || !recipientName || !pin) {
      alert("Please fill in recipient details and security PIN.");
      return;
    }

    const res = performTransfer({
      fromAccNum: currentUser.accounts[0]?.accountNumber,
      toAccNum: recipientIban,
      recipientName: `${recipientName} (${toCurrency})`,
      amount: fromAmount,
      note: `International FX Wire Remittance via SWIFT ${swiftCode}`,
      pin
    });

    if (res.success) {
      setMsg(`International Remittance of $${fromAmount} (${convertedAmount.toFixed(2)} ${toCurrency}) executed via SWIFT ${swiftCode}. Ref: ${res.receipt.reference}`);
      setFromAmount('');
      setRecipientIban('');
      setRecipientName('');
      setPin('');
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
            <div className="p-2 rounded-xl bg-teal-600/20 text-teal-400 border border-teal-500/30">
              <Globe className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Forex Exchange & Global SWIFT Wire</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Live FX currency conversion rates, multi-currency wallets, and international cross-border transfers.
          </p>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {/* Live Forex Rates Ticker Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-4 min-w-[600px]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">Live FX Rates:</span>
          {fxRates.map((fx, i) => (
            <div key={i} className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center gap-2">
              <span className="font-bold text-white">{fx.pair}</span>
              <span className="font-mono text-teal-400">{fx.buy}</span>
              <span className="text-[10px] font-bold text-emerald-400">{fx.change}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* FX Converter Calculator */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <ArrowRightLeft className="h-4 w-4 text-teal-400" />
            Real-Time Currency Calculator
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">You Send (USD)</label>
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-teal-500 text-base"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Recipient Gets ({toCurrency})</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold focus:outline-none focus:border-teal-500 mb-2"
              >
                <option value="EUR">EUR - Euro (€)</option>
                <option value="GBP">GBP - British Pound (£)</option>
                <option value="JPY">JPY - Japanese Yen (¥)</option>
                <option value="CAD">CAD - Canadian Dollar ($)</option>
              </select>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono font-bold text-lg text-emerald-400">
                {convertedAmount.toFixed(2)} {toCurrency}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[10px] text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Exchange Rate:</span>
                <span className="text-slate-200 font-bold">1 USD = {rate} {toCurrency}</span>
              </div>
              <div className="flex justify-between">
                <span>Transfer Fee:</span>
                <span className="text-emerald-400 font-bold">$0.00 (Zero Fee Premier)</span>
              </div>
            </div>
          </div>
        </div>

        {/* International Remittance SWIFT Form */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <Send className="h-4 w-4 text-teal-400" />
            International SWIFT Wire Transfer
          </h3>

          <form onSubmit={handleWireSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Beneficiary Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Barclays Overseas Ltd"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">International IBAN / Account</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GB29BARC2020153009418"
                  value={recipientIban}
                  onChange={(e) => setRecipientIban(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Bank SWIFT / BIC Code</label>
                <input
                  type="text"
                  required
                  placeholder="BARCGB22"
                  value={swiftCode}
                  onChange={(e) => setSwiftCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono uppercase focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">2FA Security PIN (Demo: 4321)</label>
                <input
                  type="password"
                  maxLength={4}
                  required
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono tracking-widest text-center focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-600/30 transition"
            >
              Dispatch SWIFT International Wire
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
