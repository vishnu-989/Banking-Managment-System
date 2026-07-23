import React from 'react';
import { useBank } from '../../context/BankContext';
import { FileCheck, Download, Printer, ShieldCheck, DollarSign } from 'lucide-react';

export const TaxCertificates = () => {
  const { currentUser } = useBank();

  if (!currentUser) return null;

  const accounts = currentUser.accounts || [];
  const fdAcc = accounts.find(a => a.type.includes('Fixed Deposit'));
  const fdBalance = fdAcc ? fdAcc.balance : 0;
  const annualInterest = (fdBalance * 0.062) + 850;
  const tdsDeducted = annualInterest > 10000 ? annualInterest * 0.10 : 0;

  const handlePrintTaxCertificate = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <FileCheck className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Annual Tax & Interest Certificate Hub</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Download certified interest income statements (Form 16A), TDS certificates, and annual financial summaries.
          </p>
        </div>

        <button
          onClick={handlePrintTaxCertificate}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-purple-600/30"
        >
          <Printer className="h-4 w-4" />
          <span>Print Tax Certificate</span>
        </button>
      </div>

      {/* Tax Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Interest Earned (FY 2025-26)</span>
          <p className="text-2xl font-black text-emerald-400">${annualInterest.toFixed(2)}</p>
          <span className="text-[10px] text-slate-500 block">Savings & Fixed Deposit Interest</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">TDS Withheld at Source</span>
          <p className="text-2xl font-black text-rose-400">${tdsDeducted.toFixed(2)}</p>
          <span className="text-[10px] text-slate-500 block">10% Statutory Tax Deducted</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Net Tax-Credited Yield</span>
          <p className="text-2xl font-black text-white">${(annualInterest - tdsDeducted).toFixed(2)}</p>
          <span className="text-[10px] text-emerald-400 font-semibold block">Form 16A Certified</span>
        </div>
      </div>

      {/* Certificate Voucher Preview */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="border-b border-slate-800 pb-3 flex justify-between items-center text-xs">
          <div>
            <h3 className="font-bold text-white text-base">Interest Certificate — FY 2025-2026</h3>
            <p className="text-slate-400">Tax ID: <span className="font-mono text-purple-400">US-TAX-8891240</span></p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            Audited & Verified
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex justify-between py-2 border-b border-slate-800/60">
            <span className="text-slate-400">Taxpayer Name:</span>
            <span className="font-bold text-white">{currentUser.name}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-800/60">
            <span className="text-slate-400">Address of Record:</span>
            <span className="text-slate-200">{currentUser.address}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-800/60">
            <span className="text-slate-400">Primary Bank Account:</span>
            <span className="font-mono text-indigo-300">{accounts[0]?.accountNumber}</span>
          </div>
        </div>

        <div className="pt-2 text-center">
          <button
            onClick={() => alert("Official Form 16A PDF Certificate downloaded to your local device.")}
            className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-white font-bold text-xs inline-flex items-center gap-2 transition"
          >
            <Download className="h-4 w-4 text-purple-400" />
            <span>Download Official Signed PDF</span>
          </button>
        </div>
      </div>

    </div>
  );
};
