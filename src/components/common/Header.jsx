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
  RotateCcw,
  LogOut
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
    resetDemoData,
    logout
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
              <div className="absolute right-0 mt-2 w-72 rounded-2xl glass-panel p-4 shadow-2xl border border-slate-700 z-50 space-y-4">
                
                {/* Authenticated User Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <img 
                    src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"} 
                    alt={currentUser?.name || "User"} 
                    className="h-10 w-10 rounded-full object-cover border-2 border-indigo-500/50" 
                  />
                  <div className="flex-1 truncate">
                    <div className="text-sm font-extrabold text-white truncate">{currentUser?.name || "User"}</div>
                    <div className="text-xs font-semibold text-indigo-400">{currentRole} Access</div>
                  </div>
                </div>

                {/* Account / Session Info */}
                <div className="space-y-2 text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">Email / ID:</span>
                    <span className="font-mono text-slate-200 truncate max-w-[130px]">{currentUser?.email || currentUser?.id}</span>
                  </div>
                  {currentRole === 'Customer' && currentUser?.accounts?.[0] && (
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Account:</span>
                      <span className="font-mono text-indigo-300">{currentUser.accounts[0].accountNumber}</span>
                    </div>
                  )}
                  {currentRole === 'Employee' && (
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Title:</span>
                      <span className="text-teal-300 font-medium truncate max-w-[130px]">{currentUser?.role}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active Session
                    </span>
                  </div>
                </div>

                {/* Sign Out Action */}
                <div className="pt-1">
                  <button
                    onClick={() => {
                      setShowRoleDropdown(false);
                      logout();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition border border-rose-500/30 shadow-lg"
                  >
                    <LogOut className="h-4 w-4 text-rose-400" />
                    <span>Sign Out of Account</span>
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
