import React from 'react';
import { useBank } from '../../context/BankContext';
import { 
  Building2, 
  ShieldCheck, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  Landmark, 
  CreditCard,
  Layers,
  Sparkles
} from 'lucide-react';

export const AdminDashboard = ({ setActiveTab }) => {
  const { customers, employees, loans, auditLogs } = useBank();

  // Aggregate System Metrics
  const totalCustomerFunds = customers.reduce((sum, c) => 
    sum + c.accounts.reduce((aSum, acc) => aSum + acc.balance, 0), 0
  );

  const totalLoansDisbursed = loans
    .filter(l => l.status === 'Approved')
    .reduce((sum, l) => sum + l.amount, 0);

  const totalBankReserves = 25000000; // $25M vault liquidity

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Director Level Executive Access
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">Bank System & Reserves Oversight</h2>
          <p className="text-xs text-slate-400">
            Real-time branch cashflow, employee allocations, risk parameters, and audit logging.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('employee-mgmt')}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 transition"
          >
            <Users className="h-4 w-4" />
            <span>Manage Bank Staff</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Bank Liquidity */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Central Bank Vault</span>
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400">
              <Building2 className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">
            ${(totalBankReserves + totalCustomerFunds).toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </p>
          <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>+4.2% Cash Reserves Capital Tier 1</span>
          </p>
        </div>

        {/* Total Customer Deposits */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Customer Deposits</span>
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">
            ${totalCustomerFunds.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[10px] text-slate-400">Across {customers.length} Verified Customer Portfolios</p>
        </div>

        {/* Active Staff */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Bank Staff Count</span>
            <div className="p-2 rounded-xl bg-teal-600/20 text-teal-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{employees.length} Staff</p>
          <p className="text-[10px] text-teal-400 font-semibold">Tellers, Officers & Managers</p>
        </div>

        {/* Active Loans */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Loans Disbursed</span>
            <div className="p-2 rounded-xl bg-amber-600/20 text-amber-400">
              <Landmark className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">
            ${totalLoansDisbursed.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </p>
          <p className="text-[10px] text-amber-400 font-semibold">Performing Asset Ratio: 98.6%</p>
        </div>

      </div>

      {/* Branch Breakdown & Real-Time Security Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Branch Liquidity Allocation */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Branch Cash Reserves</h3>

          <div className="space-y-3">
            {[
              { branch: "Springfield Main Branch", liquidity: "$8,500,000", staff: "12 Staff" },
              { branch: "New York Corporate HQ", liquidity: "$12,200,000", staff: "24 Staff" },
              { branch: "San Francisco Financial District", liquidity: "$6,300,000", staff: "16 Staff" }
            ].map((b, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-100">{b.branch}</span>
                  <span className="font-bold text-purple-400">{b.liquidity}</span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Capacity: Optimal</span>
                  <span>{b.staff}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time System Audit Stream */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-400" />
              Live Security & Audit Feed
            </h3>
            <button 
              onClick={() => setActiveTab('audit-logs')}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300"
            >
              View Full Audit Trace
            </button>
          </div>

          <div className="space-y-2.5">
            {auditLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-purple-400">{log.actor} ({log.role})</span>
                  <span className="text-slate-500 font-mono">{log.timestamp}</span>
                </div>
                <p className="font-bold text-slate-200">{log.action}</p>
                <p className="text-[10px] text-slate-400">{log.details}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
