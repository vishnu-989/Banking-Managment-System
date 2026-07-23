import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { BookOpen, CheckCircle2, Truck, AlertTriangle, Send } from 'lucide-react';

export const ChequeServices = () => {
  const { currentUser, requestChequeBook } = useBank();
  
  const [leaves, setLeaves] = useState('25');
  const [type, setType] = useState('Personal Booklet');
  const [accountNumber, setAccountNumber] = useState(currentUser?.accounts[0]?.accountNumber || '');
  const [stopChequeNo, setStopChequeNo] = useState('');
  const [msg, setMsg] = useState('');

  if (!currentUser) return null;

  const chequeRequests = currentUser.chequeRequests || [];

  const handleOrderChequeSubmit = (e) => {
    e.preventDefault();
    setMsg('');

    const res = requestChequeBook({
      leaves,
      type,
      accountNumber
    });

    setMsg(`Cheque Book request ${res.id} (${leaves} leaves) submitted successfully! Tracking No: ${res.trackingNo}`);
  };

  const handleStopChequeSubmit = (e) => {
    e.preventDefault();
    if (!stopChequeNo) return;
    alert(`Stop Payment Instruction registered for Cheque #${stopChequeNo}. All clearance blocked.`);
    setStopChequeNo('');
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Cheque Book & Service Desk</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Order personalized cheque booklets, track delivery status, and place stop payment instructions.
          </p>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Order Cheque Book Form */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-purple-400" />
            Request New Cheque Book
          </h3>

          <form onSubmit={handleOrderChequeSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Account Number</label>
              <select
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
              >
                {currentUser.accounts.map(acc => (
                  <option key={acc.id} value={acc.accountNumber}>{acc.type} ({acc.accountNumber})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Booklet Capacity</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLeaves('25')}
                  className={`py-2 rounded-xl border text-center font-bold transition ${
                    leaves === '25' ? 'bg-purple-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  25 Leaves Booklet
                </button>
                <button
                  type="button"
                  onClick={() => setLeaves('50')}
                  className={`py-2 rounded-xl border text-center font-bold transition ${
                    leaves === '50' ? 'bg-purple-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  50 Leaves Booklet
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Booklet Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Personal Booklet">Personal Booklet</option>
                <option value="Commercial Business Booklet">Commercial Business Booklet</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-600/30 transition"
            >
              Order Cheque Book
            </button>
          </form>
        </div>

        {/* Dispatch Tracker & Stop Cheque Section */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Dispatch Tracker */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Order Dispatch Tracking</h3>

            <div className="space-y-3">
              {chequeRequests.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">No active cheque book orders.</div>
              ) : (
                chequeRequests.map((req) => (
                  <div key={req.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-bold text-white">{req.type} ({req.leaves} Leaves)</h4>
                      <p className="text-[10px] text-slate-400 font-mono">ID: {req.id} • Date: {req.requestedDate}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {req.status}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono mt-1">{req.trackingNo}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Stop Payment Request */}
          <div className="glass-panel p-6 rounded-3xl border border-rose-500/20 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
              <AlertTriangle className="h-4 w-4" />
              <span>Emergency Stop Payment on Lost Cheque</span>
            </div>

            <form onSubmit={handleStopChequeSubmit} className="flex gap-2 text-xs">
              <input
                type="text"
                placeholder="Enter 6-Digit Cheque Number (e.g. 004912)"
                value={stopChequeNo}
                onChange={(e) => setStopChequeNo(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition shadow-md"
              >
                Stop Payment
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
};
