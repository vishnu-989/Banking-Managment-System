import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { 
  Zap, 
  Wifi, 
  Smartphone, 
  Tv, 
  CreditCard, 
  Flame, 
  Droplet,
  CheckCircle2, 
  AlertCircle, 
  Receipt,
  PlusCircle,
  X
} from 'lucide-react';

export const BillPayments = () => {
  const { currentUser, payBill, addBiller, DEFAULT_BILLERS } = useBank();
  
  const billers = (currentUser?.billers && currentUser.billers.length > 0) ? currentUser.billers : DEFAULT_BILLERS;
  
  const [selectedBillerId, setSelectedBillerId] = useState(billers[0]?.id || '');
  const [fromAccount, setFromAccount] = useState(currentUser?.accounts[0]?.accountNumber || '');
  const [customAmount, setCustomAmount] = useState('');
  const [msg, setMsg] = useState('');

  // Add Biller Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [billerName, setBillerName] = useState('');
  const [category, setCategory] = useState('Electricity');
  const [accountNo, setAccountNo] = useState('');
  const [amountDue, setAmountDue] = useState('120.00');

  if (!currentUser) return null;

  const selectedBiller = billers.find(b => b.id === selectedBillerId) || billers[0];

  const handlePayBillSubmit = (e) => {
    e.preventDefault();
    setMsg('');

    if (!selectedBiller) {
      alert("Please select a biller payee.");
      return;
    }

    const payAmt = customAmount ? parseFloat(customAmount) : selectedBiller.amountDue;
    if (isNaN(payAmt) || payAmt <= 0) {
      alert("Bill is already fully paid or invalid amount specified.");
      return;
    }

    const res = payBill({
      billerId: selectedBiller.id,
      fromAccount,
      amount: payAmt
    });

    if (res.success) {
      setMsg(`Bill Payment of $${payAmt.toFixed(2)} for ${selectedBiller.billerName} executed successfully! Ref Code: ${res.refCode}`);
      setCustomAmount('');
    }
  };

  const handleAddBillerSubmit = (e) => {
    e.preventDefault();
    if (!billerName || !accountNo) {
      alert("Please enter biller name and consumer account number.");
      return;
    }

    addBiller({
      billerName,
      category,
      accountNo,
      amountDue
    });

    setMsg(`Registered new utility payee: ${billerName}`);
    setBillerName('');
    setAccountNo('');
    setIsAddModalOpen(false);
  };

  const getBillerIcon = (cat) => {
    switch (cat) {
      case 'Electricity': return <Zap className="h-5 w-5 text-amber-400" />;
      case 'Internet': return <Wifi className="h-5 w-5 text-indigo-400" />;
      case 'Mobile': return <Smartphone className="h-5 w-5 text-teal-400" />;
      case 'Piped Gas': return <Flame className="h-5 w-5 text-orange-400" />;
      case 'Water': return <Droplet className="h-5 w-5 text-sky-400" />;
      default: return <CreditCard className="h-5 w-5 text-purple-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
              <Zap className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Bill Payments & Utility Payees Hub</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Instant bill payments for Electricity, Water, Broadband, Mobile, Gas, Credit Card EMI & Auto-Pay.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30 flex items-center gap-2 transition"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add New Biller Payee</span>
        </button>
      </div>

      {msg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Registered Utility Billers */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">My Registered Utility Payees</h3>
            <span className="text-xs text-amber-400 font-semibold">{billers.length} Active</span>
          </div>

          <div className="space-y-3">
            {billers.map((biller) => (
              <div
                key={biller.id}
                onClick={() => setSelectedBillerId(biller.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition ${
                  selectedBiller?.id === biller.id 
                    ? 'bg-amber-950/40 border-amber-500/60 shadow-lg' 
                    : 'glass-panel border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      {getBillerIcon(biller.category)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">{biller.billerName}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">Ref: {biller.accountNo}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-extrabold text-white block">
                      ${biller.amountDue.toFixed(2)}
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      biller.amountDue > 0 ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {biller.amountDue > 0 ? `Due ${biller.dueDate}` : 'Paid'}
                    </span>
                  </div>
                </div>

                {biller.autoPay && (
                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex justify-between text-[10px] text-emerald-400 font-semibold">
                    <span>⚡ Auto-Pay Active</span>
                    <span>Direct Debit Enabled</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Columns: Payment Console */}
        <div className="lg:col-span-2 space-y-6">
          {selectedBiller ? (
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
              
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  {getBillerIcon(selectedBiller.category)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedBiller.billerName}</h3>
                  <p className="text-xs text-slate-400">
                    Category: <span className="text-slate-200 font-semibold">{selectedBiller.category}</span> • Account No: <span className="font-mono text-amber-400">{selectedBiller.accountNo}</span>
                  </p>
                </div>
              </div>

              <form onSubmit={handlePayBillSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Pay From Bank Account</label>
                    <select
                      value={fromAccount}
                      onChange={(e) => setFromAccount(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      {currentUser.accounts.map(acc => (
                        <option key={acc.id} value={acc.accountNumber}>
                          {acc.type} ({acc.accountNumber}) — Bal: ${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Payment Amount ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder={selectedBiller.amountDue > 0 ? selectedBiller.amountDue.toFixed(2) : "0.00"}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-slate-400 block font-semibold">Total Invoice Outstanding</span>
                    <span className="text-xl font-black text-white">${selectedBiller.amountDue.toFixed(2)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block font-semibold">Invoice Due Date</span>
                    <span className="text-amber-400 font-bold">{selectedBiller.dueDate}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={selectedBiller.amountDue === 0 && !customAmount}
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                  <Receipt className="h-4 w-4" />
                  <span>Execute Utility Bill Payment</span>
                </button>
              </form>

            </div>
          ) : (
            <div className="glass-panel p-12 text-center text-slate-500 rounded-3xl border border-slate-800">
              Select a biller payee from the left list to make a payment.
            </div>
          )}
        </div>

      </div>

      {/* Add New Biller Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel rounded-3xl border border-slate-700 p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-amber-400" />
                <span>Register New Utility Biller</span>
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddBillerSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Biller / Service Provider Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. State Electricity Board"
                  value={billerName}
                  onChange={(e) => setBillerName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Utility Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Electricity">Electricity</option>
                    <option value="Internet">Internet Broadband</option>
                    <option value="Mobile">Mobile Postpaid</option>
                    <option value="Piped Gas">Piped Gas</option>
                    <option value="Water">Water Supply</option>
                    <option value="Credit Card EMI">Credit Card EMI</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Bill Amount Due ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={amountDue}
                    onChange={(e) => setAmountDue(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Consumer Account / Meter Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ELEC-998214"
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-amber-600 text-white font-bold shadow-lg"
                >
                  Save Biller
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
