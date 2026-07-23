import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { Users, UserPlus, Trash2, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

export const BeneficiaryManager = () => {
  const { currentUser, addBeneficiary, deleteBeneficiary } = useBank();
  
  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('ApexBank Main Branch');
  const [swiftCode, setSwiftCode] = useState('APEXUS33');
  const [dailyLimit, setDailyLimit] = useState('10000');
  const [msg, setMsg] = useState('');

  if (!currentUser) return null;

  const beneficiaries = currentUser.beneficiaries || [];

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setMsg('');

    if (!name || !accountNumber) {
      alert("Please fill in payee name and account number.");
      return;
    }

    addBeneficiary({
      name,
      accountNumber,
      bankName,
      swiftCode,
      dailyLimit
    });

    setMsg(`Payee ${name} successfully saved to beneficiary directory!`);
    setName('');
    setAccountNumber('');
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Beneficiary Directory & Payees Manager</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Pre-authorize transfer recipients, set daily transfer limits, and store SWIFT/IBAN records.
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
        
        {/* Add Beneficiary Form */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-indigo-400" />
            Add New Payee
          </h3>

          <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Beneficiary Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Samantha Reed"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Account No. / IBAN</label>
              <input
                type="text"
                required
                placeholder="e.g. 4092-5542-1099"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Bank Name</label>
              <input
                type="text"
                placeholder="ApexBank Main Branch"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">SWIFT / BIC</label>
                <input
                  type="text"
                  value={swiftCode}
                  onChange={(e) => setSwiftCode(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Daily Limit ($)</label>
                <input
                  type="number"
                  value={dailyLimit}
                  onChange={(e) => setDailyLimit(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition mt-2"
            >
              Save Beneficiary
            </button>
          </form>
        </div>

        {/* Saved Payees List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Saved Payees ({beneficiaries.length})</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {beneficiaries.length === 0 ? (
              <div className="col-span-2 glass-panel p-8 text-center text-xs text-slate-500 rounded-3xl border border-slate-800">
                No saved beneficiaries. Add a payee to perform 1-click transfers.
              </div>
            ) : (
              beneficiaries.map((ben) => (
                <div key={ben.id} className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3 relative shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-white">{ben.name}</h4>
                      <p className="text-[10px] text-indigo-400 font-mono mt-0.5">{ben.accountNumber}</p>
                    </div>
                    <button
                      onClick={() => deleteBeneficiary(ben.id)}
                      className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                      title="Delete Payee"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[10px] text-slate-300 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Bank:</span>
                      <span className="font-semibold">{ben.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">SWIFT Code:</span>
                      <span className="font-mono text-indigo-300">{ben.swiftCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Max Transfer Limit:</span>
                      <span className="font-bold text-emerald-400">${ben.dailyLimit.toLocaleString()} / Day</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
