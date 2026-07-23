import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { 
  Building2, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  Bell, 
  ChevronDown, 
  CheckCircle2,
  RotateCcw
} from 'lucide-react';

export const Header = ({ activeTab, setActiveTab }) => {
  const { 
    currentRole, 
    currentUser, 
    switchRole, 
    customers, 
    employees, 
    isMobileView, 
    setIsMobileView,
    notifications,
    resetDemoData
  } = useBank();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3 shadow-xl backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bank-card-gradient-1 flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-indigo-400/30">
            <Building2 className="h-5 w-5 text-indigo-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                ApexBank Premier
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Enterprise OS
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Digital Banking & Staff Operations System
            </p>
          </div>
        </div>

        {/* Navigation Tabs based on Current Role */}
        <div className="hidden lg:flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 space-x-1 overflow-x-auto max-w-2xl no-scrollbar">
          {currentRole === 'Customer' && (
            <>
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'overview' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Accounts
              </button>
              <button
                onClick={() => setActiveTab('statement')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'statement' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Passbook
              </button>
              <button
                onClick={() => setActiveTab('cards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'cards' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setActiveTab('loans')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'loans' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Loans & EMI
              </button>
              <button
                onClick={() => setActiveTab('bills')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'bills' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Bill Pay (Electricity/Gas)
              </button>
              <button
                onClick={() => setActiveTab('deposits')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'deposits' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                FD/RD Deposits
              </button>
              <button
                onClick={() => setActiveTab('beneficiaries')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'beneficiaries' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Payees
              </button>
              <button
                onClick={() => setActiveTab('cheques')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'cheques' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Cheques
              </button>
              <button
                onClick={() => setActiveTab('fx')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'fx' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Forex SWIFT
              </button>
              <button
                onClick={() => setActiveTab('locations')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'locations' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ATMs & Branch
              </button>
              <button
                onClick={() => setActiveTab('tax')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'tax' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tax Form 16A
              </button>
              <button
                onClick={() => setActiveTab('support')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'support' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Help Desk
              </button>
            </>
          )}

          {currentRole === 'Employee' && (
            <>
              <button
                onClick={() => setActiveTab('desk')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'desk' ? 'bg-teal-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Teller Desk & Statement
              </button>
              <button
                onClick={() => setActiveTab('onboarding')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'onboarding' ? 'bg-teal-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Account Opening & KYC
              </button>
              <button
                onClick={() => setActiveTab('card-issuance')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'card-issuance' ? 'bg-teal-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Card Issuance Desk
              </button>
              <button
                onClick={() => setActiveTab('loan-reviews')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'loan-reviews' ? 'bg-teal-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Loan Approvals
              </button>
              <button
                onClick={() => setActiveTab('customer-tickets')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'customer-tickets' ? 'bg-teal-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Support Desk
              </button>
            </>
          )}

          {currentRole === 'Admin' && (
            <>
              <button
                onClick={() => setActiveTab('admin-metrics')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'admin-metrics' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                System Metrics
              </button>
              <button
                onClick={() => setActiveTab('employee-mgmt')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'employee-mgmt' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Employee Directory
              </button>
              <button
                onClick={() => setActiveTab('fraud-center')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'fraud-center' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Fraud & Security Lock
              </button>
              <button
                onClick={() => setActiveTab('rates-config')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'rates-config' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Rate Parameters
              </button>
              <button
                onClick={() => setActiveTab('audit-logs')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === 'audit-logs' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Audit Logs
              </button>
            </>
          )}
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-3">

          {/* View Toggle */}
          {currentRole === 'Customer' && (
            <button
              onClick={() => setIsMobileView(!isMobileView)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/60 text-xs font-medium text-slate-300 hover:bg-slate-800 transition"
              title="Toggle Mobile App View"
            >
              {isMobileView ? (
                <>
                  <Monitor className="h-3.5 w-3.5 text-indigo-400" />
                  <span className="hidden md:inline">Desktop View</span>
                </>
              ) : (
                <>
                  <Smartphone className="h-3.5 w-3.5 text-indigo-400" />
                  <span className="hidden md:inline">Mobile App Simulator</span>
                </>
              )}
            </button>
          )}

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition"
            >
              <Bell className="h-4 w-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-indigo-500 animate-ping" />
              )}
            </button>

            {showNotifs && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl glass-panel p-4 shadow-2xl border border-slate-700 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
                  <h4 className="text-xs font-bold uppercase text-slate-300">Live Notifications</h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                    {notifications.length} New
                  </span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs flex gap-2.5 items-start">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-slate-200 leading-snug">{n.text}</p>
                        <span className="text-[10px] text-slate-500 mt-1 block">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/70 hover:border-slate-600 transition"
            >
              <div className="h-6 w-6 rounded-full overflow-hidden border border-slate-600 shrink-0">
                <img src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"} alt="Avatar" className="h-full w-full object-cover" />
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-slate-200 flex items-center gap-1">
                  {currentUser?.name || "User"}
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </div>
                <div className="text-[10px] font-semibold text-indigo-400">{currentRole} Access</div>
              </div>
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl glass-panel p-3 shadow-2xl border border-slate-700 z-50 space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 pt-1 pb-1">
                  Demo Role Switcher
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-500 px-2 uppercase">Customers</div>
                  {customers.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        switchRole("Customer", c);
                        setShowRoleDropdown(false);
                        setActiveTab('overview');
                      }}
                      className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition ${
                        currentRole === 'Customer' && currentUser?.id === c.id ? 'bg-indigo-600/30 border border-indigo-500/50 text-white' : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <img src={c.avatar} alt={c.name} className="h-7 w-7 rounded-full object-cover" />
                      <div className="flex-1 truncate">
                        <div className="text-xs font-bold">{c.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">Customer • {c.accounts[0]?.accountNumber}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="space-y-1 pt-1 border-t border-slate-800">
                  <div className="text-[10px] font-bold text-slate-500 px-2 uppercase">Bank Staff (Employee)</div>
                  {employees.map((e) => (
                    <button
                      key={e.id}
                      onClick={() => {
                        switchRole("Employee", e);
                        setShowRoleDropdown(false);
                        setActiveTab('desk');
                      }}
                      className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition ${
                        currentRole === 'Employee' && currentUser?.id === e.id ? 'bg-teal-600/30 border border-teal-500/50 text-white' : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <img src={e.avatar} alt={e.name} className="h-7 w-7 rounded-full object-cover" />
                      <div className="flex-1 truncate">
                        <div className="text-xs font-bold">{e.name}</div>
                        <div className="text-[10px] text-teal-400 truncate">{e.role}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-1 border-t border-slate-800">
                  <button
                    onClick={() => {
                      switchRole("Admin");
                      setShowRoleDropdown(false);
                      setActiveTab('admin-metrics');
                    }}
                    className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition ${
                      currentRole === 'Admin' ? 'bg-purple-600/30 border border-purple-500/50 text-white' : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="h-7 w-7 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div className="flex-1 truncate">
                      <div className="text-xs font-bold">Sarah Connor</div>
                      <div className="text-[10px] text-purple-300 truncate">System Director / Admin</div>
                    </div>
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => {
                      resetDemoData();
                      setShowRoleDropdown(false);
                    }}
                    className="w-full py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset All Demo Data & Utility Payees</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
