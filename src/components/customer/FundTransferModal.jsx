import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { 
  X, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle, 
  Download, 
  Receipt, 
  Lock, 
  Send,
  Building2,
  AlertCircle
} from 'lucide-react';

export const FundTransferModal = ({ isOpen, onClose }) => {
  const { currentUser, customers, performTransfer } = useBank();
  
  const [step, setStep] = useState(1); // 1: Details, 2: PIN Verification, 3: Receipt Success
  const [fromAccount, setFromAccount] = useState(currentUser?.accounts[0]?.accountNumber || '');
  const [transferType, setTransferType] = useState('internal'); // 'internal' | 'external'
  const [recipientAccount, setRecipientAccount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [receiptData, setReceiptData] = useState(null);

  if (!isOpen || !currentUser) return null;

  const handleQuickSelectRecipient = (cust) => {
    setRecipientAccount(cust.accounts[0]?.accountNumber || '');
    setRecipientName(cust.name);
  };

  const handleProceedToPin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fromAccount) {
      setErrorMsg("Please select a source account.");
      return;
    }
    if (!recipientAccount) {
      setErrorMsg("Please enter recipient account number.");
      return;
    }
    if (!recipientName) {
      setErrorMsg("Please enter recipient name.");
      return;
    }
    const numAmt = parseFloat(amount);
    if (isNaN(numAmt) || numAmt <= 0) {
      setErrorMsg("Please enter a valid positive transfer amount.");
      return;
    }

    const selAcc = currentUser.accounts.find(a => a.accountNumber === fromAccount);
    if (selAcc && selAcc.balance < numAmt) {
      setErrorMsg(`Insufficient funds in selected account (Balance: $${selAcc.balance.toLocaleString()}).`);
      return;
    }

    setStep(2);
  };

  const handleExecuteTransfer = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!pin || pin.length < 4) {
      setErrorMsg("Please enter your 4-digit Security PIN.");
      return;
    }

    const res = performTransfer({
      fromAccNum: fromAccount,
      toAccNum: recipientAccount,
      recipientName,
      amount,
      note,
      pin
    });

    if (res.success) {
      setReceiptData(res.receipt);
      setStep(3);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleCloseAll = () => {
    setStep(1);
    setAmount('');
    setNote('');
    setPin('');
    setErrorMsg('');
    setReceiptData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg glass-panel rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Send className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Instant Fund Transfer</h3>
              <p className="text-xs text-slate-400">Secure 2FA Encrypted Banking Gateway</p>
            </div>
          </div>
          <button 
            onClick={handleCloseAll}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Transfer Details Form */}
          {step === 1 && (
            <form onSubmit={handleProceedToPin} className="space-y-4">
              
              {/* Transfer Type Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setTransferType('internal')}
                  className={`py-2 text-xs font-semibold rounded-lg transition ${
                    transferType === 'internal' 
                      ? 'bg-indigo-600 text-white shadow' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Within ApexBank
                </button>
                <button
                  type="button"
                  onClick={() => setTransferType('external')}
                  className={`py-2 text-xs font-semibold rounded-lg transition ${
                    transferType === 'external' 
                      ? 'bg-indigo-600 text-white shadow' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Other Bank (IMPS / Wire)
                </button>
              </div>

              {/* Source Account */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Pay From Account
                </label>
                <select
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  {currentUser.accounts.map(acc => (
                    <option key={acc.id} value={acc.accountNumber}>
                      {acc.type} ({acc.accountNumber}) — Balance: ${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Beneficiaries (Internal) */}
              {transferType === 'internal' && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                    Saved Beneficiaries
                  </label>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {customers.filter(c => c.id !== currentUser.id).map(cust => (
                      <button
                        key={cust.id}
                        type="button"
                        onClick={() => handleQuickSelectRecipient(cust)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs whitespace-nowrap transition ${
                          recipientAccount === cust.accounts[0]?.accountNumber 
                            ? 'bg-indigo-600/30 border-indigo-500 text-white' 
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <img src={cust.avatar} alt={cust.name} className="h-5 w-5 rounded-full object-cover" />
                        <span>{cust.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recipient Account & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Recipient Account No. / IBAN
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4092-5542-1099"
                    value={recipientAccount}
                    onChange={(e) => setRecipientAccount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Recipient Account Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Samantha Reed"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Amount & Note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Transfer Amount ($)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-400 text-xs font-bold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Payment Note / Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rent share or Dinner split"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
                >
                  <span>Review Transfer</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PIN Authentication Prompt */}
          {step === 2 && (
            <form onSubmit={handleExecuteTransfer} className="space-y-4 py-2">
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-center space-y-2">
                <div className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">Confirm Payment</div>
                <div className="text-2xl font-black text-white">
                  ${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-slate-300">
                  Transferring to <span className="font-bold text-white">{recipientName}</span> ({recipientAccount})
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-center text-xs font-semibold text-slate-300">
                  Enter 4-Digit Security PIN (Default Demo PIN: <span className="text-indigo-400 font-mono">4321</span>)
                </label>
                <div className="flex justify-center">
                  <input
                    type="password"
                    maxLength={4}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-36 text-center text-xl font-mono tracking-widest px-4 py-2.5 rounded-xl bg-slate-900 border border-indigo-500/50 text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="••••"
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-1.5 transition"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Authorize Transfer</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Digital Payment Receipt Success */}
          {step === 3 && receiptData && (
            <div className="space-y-4 text-center py-2 animate-in zoom-in-95">
              <div className="h-14 w-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Transfer Successful!</h4>
                <p className="text-xs text-slate-400">Transaction authorized and funds dispatched.</p>
              </div>

              {/* Receipt Voucher */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Reference No:</span>
                  <span className="font-mono font-bold text-indigo-400">{receiptData.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Time:</span>
                  <span className="text-slate-200">{receiptData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">From Account:</span>
                  <span className="text-slate-200">{receiptData.fromAccount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">To Beneficiary:</span>
                  <span className="text-slate-200">{receiptData.recipient} ({receiptData.toAccount})</span>
                </div>
                <div className="flex justify-between border-t border-slate-800 pt-2 font-bold text-sm">
                  <span className="text-slate-300">Amount Sent:</span>
                  <span className="text-emerald-400">${receiptData.amount.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    alert(`Receipt ${receiptData.reference} downloaded to your local drive!`);
                  }}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Receipt</span>
                </button>
                <button
                  onClick={handleCloseAll}
                  className="w-1/2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
