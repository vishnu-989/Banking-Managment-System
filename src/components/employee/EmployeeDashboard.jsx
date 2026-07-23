import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { 
  Users, 
  Search, 
  PlusCircle, 
  MinusCircle, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle,
  Building2,
  Receipt,
  DollarSign,
  ArrowRightLeft,
  FileText,
  Download,
  Printer,
  ArrowDownRight,
  ArrowUpRight
} from 'lucide-react';

export const EmployeeDashboard = ({ activeTab, setActiveTab }) => {
  const { 
    currentUser, 
    customers, 
    transactions,
    depositWithdrawCounter, 
    toggleAccountStatus 
  } = useBank();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [deskViewMode, setDeskViewMode] = useState('counter'); // 'counter' | 'statement'
  
  // Statement filters
  const [stmtAccountFilter, setStmtAccountFilter] = useState('All');
  const [stmtCategoryFilter, setStmtCategoryFilter] = useState('All');
  const [stmtSearch, setStmtSearch] = useState('');

  // Counter Deposit / Withdrawal Form state
  const [targetAccount, setTargetAccount] = useState('');
  const [txType, setTxType] = useState('deposit'); // 'deposit' | 'withdraw'
  const [amount, setAmount] = useState('');
  const [opMsg, setOpMsg] = useState('');
  const [receipt, setReceipt] = useState(null);

  if (!currentUser) return null;

  // Filter customer directory
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    c.accounts.some(a => a.accountNumber.includes(searchTerm))
  );

  // Selected customer transactions
  let custTxns = transactions.filter(t => t.customerId === selectedCustomer?.id);
  if (stmtAccountFilter !== 'All') {
    custTxns = custTxns.filter(t => t.accountNumber === stmtAccountFilter);
  }
  if (stmtCategoryFilter !== 'All') {
    custTxns = custTxns.filter(t => t.category === stmtCategoryFilter);
  }
  if (stmtSearch) {
    const q = stmtSearch.toLowerCase();
    custTxns = custTxns.filter(t => 
      t.description.toLowerCase().includes(q) ||
      t.reference.toLowerCase().includes(q) ||
      (t.counterparty && t.counterparty.toLowerCase().includes(q))
    );
  }

  const handleCounterOperation = (e) => {
    e.preventDefault();
    setOpMsg('');
    setReceipt(null);

    const accNum = targetAccount || selectedCustomer?.accounts[0]?.accountNumber;
    if (!accNum) {
      setOpMsg("Please select an account number.");
      return;
    }

    const res = depositWithdrawCounter({
      accountNumber: accNum,
      amount,
      type: txType,
      employeeName: currentUser.name
    });

    if (res.success) {
      setOpMsg(res.message);
      setReceipt(res.receipt);
      setAmount('');
    } else {
      setOpMsg(res.message);
    }
  };

  const handleExportCustCSV = () => {
    if (custTxns.length === 0) {
      alert("No transaction records to export for this customer.");
      return;
    }

    const headers = ["Txn ID", "Date", "Account No", "Description", "Category", "Amount ($)", "Type", "Reference", "Status"];
    const rows = custTxns.map(t => [
      t.id,
      t.date,
      t.accountNumber,
      `"${t.description}"`,
      t.category,
      t.amount,
      t.type,
      t.reference,
      t.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Customer_Statement_${selectedCustomer.name.replace(" ", "_")}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintCustStatement = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Top Staff Desk Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-teal-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={currentUser.avatar} alt={currentUser.name} className="h-12 w-12 rounded-2xl object-cover border border-teal-500/40" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">{currentUser.name}</h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Assigned Branch: <span className="text-slate-200 font-semibold">{currentUser.branch}</span> • Staff ID: <span className="font-mono text-teal-400">{currentUser.id}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900/90 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
            <span className="text-slate-400 block font-medium">Counter Operations Handled</span>
            <span className="text-lg font-black text-teal-400">{currentUser.transactionsHandled || 142} Txns</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Customer Directory Search & Selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Customer Directory Lookup</h3>
            <span className="text-xs text-slate-500">{filteredCustomers.length} Found</span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, ID, phone, account..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-100 focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Customer Cards List */}
          <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {filteredCustomers.map((cust) => (
              <div
                key={cust.id}
                onClick={() => {
                  setSelectedCustomer(cust);
                  setTargetAccount(cust.accounts[0]?.accountNumber || '');
                  setReceipt(null);
                  setOpMsg('');
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center gap-3 ${
                  selectedCustomer?.id === cust.id 
                    ? 'bg-teal-950/40 border-teal-500/50 shadow-lg' 
                    : 'glass-panel border-slate-800 hover:border-slate-700'
                }`}
              >
                <img src={cust.avatar} alt={cust.name} className="h-10 w-10 rounded-xl object-cover shrink-0" />
                <div className="flex-1 truncate">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-slate-100 truncate">{cust.name}</h4>
                    <span className="text-[10px] font-mono text-teal-400">{cust.id}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{cust.email}</p>
                  <p className="text-[10px] font-mono text-slate-400">Acc: {cust.accounts[0]?.accountNumber}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Columns: Counter Desk & Customer Statement Inspection */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Selected Customer Profile Header & Account Cards */}
          {selectedCustomer && (
            <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <img src={selectedCustomer.avatar} alt={selectedCustomer.name} className="h-12 w-12 rounded-2xl object-cover border border-slate-700" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{selectedCustomer.name}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        KYC Verified
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Email: <span className="text-slate-200">{selectedCustomer.email}</span> • Phone: <span className="text-slate-200">{selectedCustomer.phone}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase text-slate-400 font-bold">Total Customer Balance</span>
                  <p className="text-xl font-black text-emerald-400">
                    ${selectedCustomer.accounts.reduce((sum, a) => sum + a.balance, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              {/* Customer Accounts Breakdown & Freeze Controls */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Active Accounts & Status Controls</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedCustomer.accounts.map((acc) => (
                    <div key={acc.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-indigo-300">{acc.type}</span>
                        <button
                          onClick={() => toggleAccountStatus(acc.accountNumber)}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition ${
                            acc.status === 'Active' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-rose-500/20 hover:text-rose-300' 
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-emerald-500/20 hover:text-emerald-300'
                          }`}
                          title="Toggle Frozen/Active State"
                        >
                          {acc.status === 'Active' ? <CheckCircle2 className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                          <span>{acc.status}</span>
                        </button>
                      </div>

                      <p className="text-xs font-mono font-bold text-white">{acc.accountNumber}</p>
                      
                      <div className="flex justify-between text-xs pt-1 border-t border-slate-800">
                        <span className="text-slate-400">Balance:</span>
                        <span className="font-bold text-white">${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desk View Mode Switcher Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 pt-2">
                <button
                  onClick={() => setDeskViewMode('counter')}
                  className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition ${
                    deskViewMode === 'counter' 
                      ? 'bg-teal-600 text-white shadow' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  <span>Teller Cash Counter</span>
                </button>

                <button
                  onClick={() => setDeskViewMode('statement')}
                  className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition ${
                    deskViewMode === 'statement' 
                      ? 'bg-teal-600 text-white shadow' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Inspect Bank Statement</span>
                </button>
              </div>

            </div>
          )}

          {/* VIEW MODE 1: Teller Counter Terminal */}
          {deskViewMode === 'counter' && (
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                  <ArrowRightLeft className="h-4 w-4 text-teal-400" />
                  Over-the-Counter Deposit & Withdrawal Terminal
                </h3>
              </div>

              {opMsg && (
                <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  opMsg.includes("Successfully") || opMsg.includes("Processed")
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' 
                    : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                }`}>
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{opMsg}</span>
                </div>
              )}

              <form onSubmit={handleCounterOperation} className="space-y-4">
                
                {/* Deposit vs Withdrawal */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setTxType('deposit')}
                    className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition ${
                      txType === 'deposit' 
                        ? 'bg-emerald-600 text-white shadow' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <PlusCircle className="h-4 w-4" />
                    <span>Cash Deposit (+)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTxType('withdraw')}
                    className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition ${
                      txType === 'withdraw' 
                        ? 'bg-rose-600 text-white shadow' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <MinusCircle className="h-4 w-4" />
                    <span>Cash Withdrawal (-)</span>
                  </button>
                </div>

                {/* Target Account Select */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Account</label>
                  <select
                    value={targetAccount}
                    onChange={(e) => setTargetAccount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-100 focus:outline-none focus:border-teal-500"
                  >
                    {selectedCustomer?.accounts.map(acc => (
                      <option key={acc.id} value={acc.accountNumber}>
                        {acc.type} ({acc.accountNumber}) — Bal: ${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} [{acc.status}]
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cash Amount */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Transaction Cash Amount ($)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-xs">$</span>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-600/30 flex items-center justify-center gap-2 transition"
                >
                  <Receipt className="h-4 w-4" />
                  <span>Process Counter {txType.toUpperCase()}</span>
                </button>

              </form>

            </div>
          )}

          {/* VIEW MODE 2: Audited Customer Bank Statement Inspector */}
          {deskViewMode === 'statement' && (
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-teal-400" />
                    <span>Customer Statement Ledger — {selectedCustomer?.name}</span>
                  </h3>
                  <p className="text-[10px] text-slate-400">Official audited passbook for staff inspection</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleExportCustCSV}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Download className="h-3.5 w-3.5 text-teal-400" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={handlePrintCustStatement}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Print Statement</span>
                  </button>
                </div>
              </div>

              {/* Statement Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <input
                  type="text"
                  placeholder="Filter by ref, payee, description..."
                  value={stmtSearch}
                  onChange={(e) => setStmtSearch(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-teal-500"
                />

                <select
                  value={stmtAccountFilter}
                  onChange={(e) => setStmtAccountFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="All">All Customer Accounts</option>
                  {selectedCustomer?.accounts.map(acc => (
                    <option key={acc.id} value={acc.accountNumber}>{acc.type} ({acc.accountNumber})</option>
                  ))}
                </select>

                <select
                  value={stmtCategoryFilter}
                  onChange={(e) => setStmtCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Salary">Salary</option>
                  <option value="Transfer">Transfer</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Deposit">Deposit</option>
                  <option value="Withdrawal">Withdrawal</option>
                </select>
              </div>

              {/* Statement Ledger Table */}
              <div className="rounded-2xl border border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/90 uppercase text-[10px] tracking-wider text-slate-400 font-bold border-b border-slate-800">
                      <tr>
                        <th className="px-4 py-3">Description & Ref</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Account</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {custTxns.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                            No transaction ledger entries found for this customer.
                          </td>
                        </tr>
                      ) : (
                        custTxns.map((t) => (
                          <tr key={t.id} className="hover:bg-slate-900/40 transition">
                            <td className="px-4 py-3">
                              <div className="font-bold text-slate-100">{t.description}</div>
                              <div className="text-[10px] font-mono text-teal-400">{t.reference}</div>
                            </td>
                            <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{t.date}</td>
                            <td className="px-4 py-3 font-mono text-slate-400">{t.accountNumber}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-semibold text-slate-300 border border-slate-700">
                                {t.category}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right font-extrabold whitespace-nowrap">
                              <span className={t.type === 'credit' ? 'text-emerald-400' : 'text-slate-200'}>
                                {t.type === 'credit' ? '+' : '-'}${t.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
