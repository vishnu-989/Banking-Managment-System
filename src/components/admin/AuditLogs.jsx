import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { Activity, Search, ShieldCheck, Download, Filter } from 'lucide-react';

export const AuditLogs = () => {
  const { auditLogs } = useBank();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  let filteredLogs = auditLogs;

  if (selectedRole !== 'All') {
    filteredLogs = filteredLogs.filter(l => l.role === selectedRole);
  }

  if (searchTerm) {
    const q = searchTerm.toLowerCase();
    filteredLogs = filteredLogs.filter(l => 
      l.action.toLowerCase().includes(q) ||
      l.actor.toLowerCase().includes(q) ||
      l.details.toLowerCase().includes(q) ||
      l.id.toLowerCase().includes(q)
    );
  }

  const handleExportAuditCSV = () => {
    const headers = ["Audit ID", "Timestamp", "Actor", "Role", "Action", "Details"];
    const rows = filteredLogs.map(l => [
      l.id,
      `"${l.timestamp}"`,
      `"${l.actor}"`,
      l.role,
      `"${l.action}"`,
      `"${l.details}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ApexBank_Audit_Logs_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Activity className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">System Security & Compliance Audit Log</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Immutable trace of financial transfers, counter operations, staff administration, and account status changes.
          </p>
        </div>

        <button
          onClick={handleExportAuditCSV}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 font-semibold text-xs flex items-center gap-2 transition shadow-md"
        >
          <Download className="h-4 w-4 text-purple-400" />
          <span>Export Audit Log CSV</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search audit records by actor, action description, or log ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-100 focus:outline-none focus:border-purple-500"
          />
        </div>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-100 focus:outline-none focus:border-purple-500"
        >
          <option value="All">All Roles</option>
          <option value="Admin">Admin Only</option>
          <option value="Employee">Employee Staff Only</option>
          <option value="Customer">Customer Actions Only</option>
        </select>
      </div>

      {/* Audit Log Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 uppercase text-[10px] tracking-wider text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Log ID</th>
                <th className="px-5 py-3.5">Timestamp</th>
                <th className="px-5 py-3.5">Actor & Role</th>
                <th className="px-5 py-3.5">Action Executed</th>
                <th className="px-5 py-3.5">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-slate-500">
                    No audit records match your query.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-900/40 transition">
                    <td className="px-5 py-4 font-mono text-purple-400 font-bold">{log.id}</td>
                    <td className="px-5 py-4 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-100">{log.actor}</div>
                      <span className="text-[10px] font-semibold text-slate-400">{log.role}</span>
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-200">{log.action}</td>
                    <td className="px-5 py-4 text-slate-300 max-w-xs leading-relaxed">{log.details}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
