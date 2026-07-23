import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { 
  Users, 
  UserPlus, 
  Search, 
  ShieldCheck, 
  Building2, 
  CheckCircle2, 
  X, 
  UserX, 
  UserCheck,
  Edit
} from 'lucide-react';

export const EmployeeManagement = () => {
  const { employees, addEmployee, updateEmployeeRole, toggleEmployeeStatus } = useBank();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Employee Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Senior Teller');
  const [branch, setBranch] = useState('Springfield Main Branch');
  const [avatar, setAvatar] = useState('');
  const [msg, setMsg] = useState('');

  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployeeSubmit = (e) => {
    e.preventDefault();
    setMsg('');

    if (!name || !email) {
      alert("Please fill in staff name and email.");
      return;
    }

    const created = addEmployee({
      name,
      email,
      role,
      branch,
      avatar
    });

    setMsg(`Employee ${created.name} (${created.id}) successfully added!`);
    setName('');
    setEmail('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Bank Employee & Staff Directory</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Create staff credentials, assign branch locations, update roles, and manage access permissions.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 transition"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add New Bank Employee</span>
        </button>
      </div>

      {msg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search staff by name, email, role, or branch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-100 focus:outline-none focus:border-purple-500"
          />
        </div>
        <span className="text-xs text-slate-400 font-semibold">{filteredEmployees.length} Staff Members</span>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((emp) => (
          <div key={emp.id} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4 shadow-xl relative">
            <div className="flex items-center gap-3">
              <img src={emp.avatar} alt={emp.name} className="h-12 w-12 rounded-2xl object-cover border border-slate-700" />
              <div className="flex-1 truncate">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white truncate">{emp.name}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    emp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {emp.status}
                  </span>
                </div>
                <p className="text-[10px] text-purple-400 font-semibold">{emp.role}</p>
                <p className="text-[10px] text-slate-400 font-mono">{emp.id} • {emp.email}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
              <div className="flex justify-between text-slate-400 text-[10px]">
                <span>Assigned Branch:</span>
                <span className="text-slate-200 font-medium">{emp.branch}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[10px]">
                <span>Member Since:</span>
                <span className="text-slate-200 font-mono">{emp.joinDate}</span>
              </div>
            </div>

            <div className="pt-1 flex gap-2">
              <button
                onClick={() => toggleEmployeeStatus(emp.id)}
                className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  emp.status === 'Active'
                    ? 'bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30'
                    : 'bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30'
                }`}
              >
                {emp.status === 'Active' ? (
                  <>
                    <UserX className="h-3.5 w-3.5" />
                    <span>Suspend Access</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="h-3.5 w-3.5" />
                    <span>Activate Access</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md glass-panel rounded-3xl border border-slate-700 p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-purple-400" />
                <span>Onboard New Bank Employee</span>
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddEmployeeSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jonathan Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Official Bank Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. j.vance@apexbank.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Assigned Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Senior Teller">Senior Teller</option>
                    <option value="Loan & Risk Officer">Loan & Risk Officer</option>
                    <option value="Branch Manager">Branch Manager</option>
                    <option value="Compliance Officer">Compliance Officer</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Branch</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Springfield Main Branch">Springfield Main Branch</option>
                    <option value="New York Corporate Branch">New York Corporate Branch</option>
                    <option value="San Francisco Financial District">San Francisco Financial District</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Avatar Image URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition"
              >
                Create Staff Account
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
