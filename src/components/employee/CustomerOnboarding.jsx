import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { UserPlus, CheckCircle2, ShieldCheck, CreditCard, Building } from 'lucide-react';

export const CustomerOnboarding = () => {
  const { createCustomerAccount, currentUser } = useBank();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [accountType, setAccountType] = useState('Savings Premier');
  const [initialDeposit, setInitialDeposit] = useState('2500');
  const [kycDocType, setKycDocType] = useState('Passport');
  const [kycDocNo, setKycDocNo] = useState('');
  const [createdCustomer, setCreatedCustomer] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert("Please fill in customer basic details.");
      return;
    }

    const created = createCustomerAccount({
      name,
      email,
      phone,
      address,
      accountType,
      initialDeposit,
      kycDocType,
      kycDocNo: kycDocNo || `ID-${Math.floor(100000 + Math.random() * 900000)}`
    });

    setCreatedCustomer(created);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setKycDocNo('');
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-teal-500/20 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-600/20 text-teal-400 border border-teal-500/30">
              <UserPlus className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Counter Account Opening & Customer Onboarding</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Register new bank customers, verify KYC identity documents, issue instant IBAN accounts, and process initial deposit.
          </p>
        </div>
      </div>

      {createdCustomer && (
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 bg-emerald-950/20 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="h-5 w-5" />
            <span>Customer Profile & Account Created Successfully!</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block font-semibold">Customer ID:</span>
              <span className="font-mono text-teal-400 font-bold">{createdCustomer.id}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Account Number:</span>
              <span className="font-mono text-white font-bold">{createdCustomer.accounts[0]?.accountNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-semibold">Initial Balance:</span>
              <span className="font-bold text-emerald-400">${createdCustomer.accounts[0]?.balance.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Customer Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Jonathan Miller"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="e.g. j.miller@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
              <input
                type="text"
                required
                placeholder="+1 (555) 000-1122"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Residential Address</label>
              <input
                type="text"
                placeholder="123 Financial Way, Suite 100"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Account Scheme</label>
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-teal-500"
              >
                <option value="Savings Premier">Savings Premier (3.5% APY)</option>
                <option value="Checking Preferred">Checking Preferred (0.5% APY)</option>
                <option value="Fixed Deposit 12M">Fixed Deposit 12M (6.2% APY)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Initial Opening Deposit ($)</label>
              <input
                type="number"
                step="100"
                required
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">KYC Document Type</label>
              <select
                value={kycDocType}
                onChange={(e) => setKycDocType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-teal-500"
              >
                <option value="Passport">Passport / National Passport</option>
                <option value="Driver's License">Driver's License</option>
                <option value="National Identity Card">National Identity Card</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-600/30 transition mt-2"
          >
            Create Customer Profile & Issue Account
          </button>
        </form>
      </div>

    </div>
  );
};
