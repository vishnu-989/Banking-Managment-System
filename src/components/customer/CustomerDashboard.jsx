import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { 
  Eye, 
  EyeOff, 
  Send, 
  CreditCard, 
  FileText, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  PlusCircle, 
  ShieldCheck, 
  Sparkles,
  PieChart,
  Landmark,
  Lock,
  ChevronRight
} from 'lucide-react';
import { FundTransferModal } from './FundTransferModal';

export const CustomerDashboard = ({ setActiveTab }) => {
  const { currentUser, transactions, isMobileView } = useBank();
  const [showBalance, setShowBalance] = useState(true);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  if (!currentUser) return null;

  const userAccounts = currentUser.accounts || [];
  const totalNetWorth = userAccounts.reduce((acc, a) => acc + a.balance, 0);

  // Filter transactions for this customer
  const myTxns = transactions.filter(t => t.customerId === currentUser.id);

  // Income vs Expense quick calculation
  const totalIncome = myTxns.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = myTxns.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className={`space-y-6 ${isMobileView ? 'max-w-md mx-auto py-2' : 'max-w-7xl mx-auto py-4'}`}>
      
      {/* Transfer Modal */}
      <FundTransferModal isOpen={isTransferOpen} onClose={() => setIsTransferOpen(false)} />

      {/* Greeting Banner */}
      <div className="glass-card rounded-3xl p-6 relative overflow-hidden border border-indigo-500/20 shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                KYC Verified • Premier Member
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {currentUser.name}!
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Account No: <span className="font-mono text-slate-200">{userAccounts[0]?.accountNumber}</span> • Customer ID: <span className="font-mono text-indigo-400">{currentUser.id}</span>
            </p>
          </div>

          {/* Balance Widget */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-6 min-w-[260px] shadow-inner">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span>Total Net Balance</span>
                <button 
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-slate-400 hover:text-white transition"
                  title="Hide/Show Balance"
                >
                  {showBalance ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
              <div className="text-2xl font-black text-white mt-1">
                {showBalance 
                  ? `$${totalNetWorth.toLocaleString('en-US', { minimumFractionDigits: 2 })}` 
                  : '•••••••••'}
              </div>
            </div>
            <button
              onClick={() => setIsTransferOpen(true)}
              className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition flex items-center justify-center"
              title="Instant Transfer"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setIsTransferOpen(true)}
          className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition flex items-center gap-3 group text-left shadow-lg"
        >
          <div className="h-10 w-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 transition">
            <Send className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 group-hover:text-indigo-400 transition">Send Money</h4>
            <p className="text-[10px] text-slate-400">Instant 2FA Transfer</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('statement')}
          className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-teal-500/50 transition flex items-center gap-3 group text-left shadow-lg"
        >
          <div className="h-10 w-10 rounded-xl bg-teal-600/20 text-teal-400 border border-teal-500/30 flex items-center justify-center group-hover:scale-110 transition">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 group-hover:text-teal-400 transition">Statements</h4>
            <p className="text-[10px] text-slate-400">Download PDF & Ledger</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('cards')}
          className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition flex items-center gap-3 group text-left shadow-lg"
        >
          <div className="h-10 w-10 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 group-hover:text-purple-400 transition">Cards Suite</h4>
            <p className="text-[10px] text-slate-400">Freeze & Control PIN</p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('loans')}
          className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition flex items-center gap-3 group text-left shadow-lg"
        >
          <div className="h-10 w-10 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition">
            <Landmark className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-400 transition">Apply Loan</h4>
            <p className="text-[10px] text-slate-400">Calculator & Approval</p>
          </div>
        </button>
      </div>

      {/* Account Cards Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Your Active Banking Accounts</h3>
          <span className="text-xs text-indigo-400 font-semibold">{userAccounts.length} Active Accounts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userAccounts.map((acc) => (
            <div 
              key={acc.id}
              className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition space-y-3 relative overflow-hidden shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  {acc.type}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  acc.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                }`}>
                  {acc.status}
                </span>
              </div>

              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Account Number</p>
                <p className="text-xs font-mono font-bold text-slate-200">{acc.accountNumber}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Available Balance</p>
                  <p className="text-lg font-black text-white">
                    {showBalance ? `$${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••••'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Yield</p>
                  <p className="text-xs font-bold text-emerald-400">{acc.interestRate} APY</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spending Breakdown & Recent Transactions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cashflow Summary */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <PieChart className="h-4 w-4 text-indigo-400" />
              Monthly Cashflow Overview
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <ArrowDownRight className="h-4 w-4" />
                <span>Total Credits</span>
              </div>
              <p className="text-base font-extrabold text-white mt-1">
                ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/20">
              <div className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold">
                <ArrowUpRight className="h-4 w-4" />
                <span>Total Debits</span>
              </div>
              <p className="text-base font-extrabold text-white mt-1">
                ${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs text-slate-300 font-semibold">
              <span>Savings Rate Indicator</span>
              <span className="text-indigo-400">74% Target Reached</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div className="bg-gradient-to-r from-indigo-500 to-teal-400 h-2 rounded-full w-[74%]" />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Recent Transactions
            </h3>
            <button 
              onClick={() => setActiveTab('statement')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>View Full Ledger</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {myTxns.slice(0, 4).map((txn) => (
              <div 
                key={txn.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${
                    txn.type === 'credit' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}>
                    {txn.type === 'credit' ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100">{txn.description}</h4>
                    <p className="text-[10px] text-slate-400">{txn.date} • <span className="font-mono text-indigo-300">{txn.reference}</span></p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`font-extrabold text-sm ${txn.type === 'credit' ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {txn.type === 'credit' ? '+' : '-'}${txn.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                    {txn.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
