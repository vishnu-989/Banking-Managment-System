import React from 'react';
import { useBank } from '../../context/BankContext';
import { ShieldAlert, AlertTriangle, Lock, Unlock, CheckCircle2, Activity } from 'lucide-react';

export const FraudRiskCenter = () => {
  const { fraudAlerts, resolveFraudAlert, systemLockdown, toggleSystemLockdown } = useBank();

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Bank Fraud Risk & Security Control Center</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time fraud alert monitoring, high-value transfer flags, and system-wide emergency lockout controls.
          </p>
        </div>

        {/* Emergency System Lockdown Toggle Button */}
        <button
          onClick={toggleSystemLockdown}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-lg ${
            systemLockdown 
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
              : 'bg-rose-600 hover:bg-rose-500 text-white'
          }`}
        >
          {systemLockdown ? (
            <>
              <Unlock className="h-4 w-4" />
              <span>Lift System Lockdown</span>
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              <span>EMERGENCY LOCKDOWN BANK</span>
            </>
          )}
        </button>
      </div>

      {systemLockdown && (
        <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-3 animate-pulse">
          <AlertTriangle className="h-6 w-6 shrink-0" />
          <div>
            <span className="font-bold block">🚨 BANK IN EMERGENCY LOCKDOWN MODE</span>
            <span>All outgoing transfers, card swipes, and teller withdrawals are temporarily restricted.</span>
          </div>
        </div>
      )}

      {/* Fraud Alert Logs */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Activity className="h-4 w-4 text-purple-400" />
          Flagged Fraud & Risk Events Stream
        </h3>

        <div className="space-y-3">
          {fraudAlerts.map((alert) => (
            <div key={alert.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{alert.type}</span>
                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                    alert.riskLevel === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  }`}>
                    {alert.riskLevel} Risk
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{alert.timestamp}</span>
                </div>
                <p className="text-slate-300">Customer: <span className="font-bold text-white">{alert.customerName}</span> • Details: {alert.details}</p>
              </div>

              <div className="flex items-center gap-3">
                {alert.amount > 0 && (
                  <span className="font-bold text-emerald-400 text-sm">${alert.amount.toLocaleString()}</span>
                )}
                {alert.status === 'Under Review' ? (
                  <button
                    onClick={() => resolveFraudAlert(alert.id)}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition"
                  >
                    Mark Verified & Resolve
                  </button>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    Resolved
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
