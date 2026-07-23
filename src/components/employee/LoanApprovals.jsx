import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldAlert, 
  FileText, 
  User, 
  Landmark,
  AlertCircle
} from 'lucide-react';

export const LoanApprovals = () => {
  const { loans, processLoan, currentUser } = useBank();
  
  const [selectedLoan, setSelectedLoan] = useState(loans.find(l => l.status === 'Pending') || loans[0]);
  const [reviewNotes, setReviewNotes] = useState('');
  const [msg, setMsg] = useState('');

  const pendingLoans = loans.filter(l => l.status === 'Pending');
  const processedLoans = loans.filter(l => l.status !== 'Pending');

  const handleDecision = (status) => {
    if (!selectedLoan) return;
    processLoan(selectedLoan.id, status, reviewNotes, currentUser.name);
    setMsg(`Loan ${selectedLoan.id} successfully marked as ${status.toUpperCase()}!`);
    setReviewNotes('');
    
    // Select next pending loan if available
    const remaining = loans.filter(l => l.id !== selectedLoan.id && l.status === 'Pending');
    if (remaining.length > 0) {
      setSelectedLoan(remaining[0]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-teal-500/20 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-600/20 text-teal-400 border border-teal-500/30">
              <Landmark className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Credit Risk & Loan Approvals Desk</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Review customer loan applications, evaluate risk scores, and execute credit decisions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-medium block">Pending Applications</span>
            <span className="text-base font-bold text-amber-400">{pendingLoans.length} Queue</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Pending Queue List */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Application Queue</h3>

          <div className="space-y-2.5">
            {pendingLoans.length === 0 ? (
              <div className="glass-panel p-6 text-center text-xs text-slate-500 rounded-2xl border border-slate-800">
                No pending loan applications awaiting review.
              </div>
            ) : (
              pendingLoans.map((loan) => (
                <div
                  key={loan.id}
                  onClick={() => setSelectedLoan(loan)}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    selectedLoan?.id === loan.id 
                      ? 'bg-teal-950/40 border-teal-500/50 shadow-lg' 
                      : 'glass-panel border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">{loan.customerName}</h4>
                      <p className="text-[10px] text-teal-400 font-mono">{loan.id} • {loan.type}</p>
                    </div>
                    <span className="text-xs font-bold text-amber-400">${loan.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-2">
                    <span>Applied: {loan.appliedDate}</span>
                    <span className="font-semibold text-emerald-400">Credit Score: {loan.creditScore}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pt-4">Processed Archive</h3>
          <div className="space-y-2">
            {processedLoans.map((loan) => (
              <div key={loan.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-200">{loan.customerName} ({loan.id})</div>
                  <div className="text-[10px] text-slate-400">${loan.amount.toLocaleString()} • {loan.type}</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  loan.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                }`}>
                  {loan.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Columns: Application Review Inspector */}
        <div className="lg:col-span-2 space-y-6">
          {selectedLoan ? (
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest block font-bold">
                    Loan ID: {selectedLoan.id}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{selectedLoan.type}</h3>
                  <p className="text-xs text-slate-400">Applicant: <span className="text-slate-200 font-bold">{selectedLoan.customerName}</span> ({selectedLoan.customerId})</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase text-slate-400 font-bold block">Credit Risk Score</span>
                  <span className="text-xl font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30 inline-block mt-1">
                    {selectedLoan.creditScore} / 850 (Low Risk)
                  </span>
                </div>
              </div>

              {msg && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{msg}</span>
                </div>
              )}

              {/* Loan Financial Parameters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Requested Amount</span>
                  <span className="text-base font-extrabold text-white mt-1 block">${selectedLoan.amount.toLocaleString()}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Tenure</span>
                  <span className="text-base font-extrabold text-white mt-1 block">{selectedLoan.tenureMonths} Months</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Interest APY</span>
                  <span className="text-base font-extrabold text-amber-400 mt-1 block">{selectedLoan.interestRate}%</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Calculated EMI</span>
                  <span className="text-base font-extrabold text-teal-400 mt-1 block">${selectedLoan.monthlyEmi}</span>
                </div>
              </div>

              {/* Purpose & Remarks */}
              <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Stated Purpose</span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">{selectedLoan.purpose || 'No purpose specified.'}</p>
              </div>

              {/* Decision Input & Action Buttons */}
              {selectedLoan.status === 'Pending' ? (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Officer Review Notes / Decision Rationale
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Enter verification notes regarding applicant income, collateral or credit standing..."
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-100 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleDecision('Rejected')}
                      className="py-3 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 font-bold text-xs flex items-center justify-center gap-2 transition"
                    >
                      <XCircle className="h-4 w-4" />
                      <span>Reject Application</span>
                    </button>
                    <button
                      onClick={() => handleDecision('Approved')}
                      className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Approve & Disburse Funds</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Review Decision:</span>
                    <span className="font-bold text-white">{selectedLoan.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Reviewed By:</span>
                    <span className="text-slate-200">{selectedLoan.reviewedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Review Date:</span>
                    <span className="text-slate-200">{selectedLoan.reviewDate}</span>
                  </div>
                  {selectedLoan.notes && (
                    <div className="pt-2 border-t border-slate-800">
                      <span className="text-slate-400 block font-bold">Officer Remarks:</span>
                      <p className="text-slate-300">{selectedLoan.notes}</p>
                    </div>
                  )}
                </div>
              )}

            </div>
          ) : (
            <div className="glass-panel p-12 text-center text-slate-500 rounded-3xl border border-slate-800">
              Select a loan application from the left queue to review details.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
