import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { 
  FileText, 
  Search, 
  Download, 
  Printer, 
  Filter, 
  ArrowDownRight, 
  ArrowUpRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const StatementView = () => {
  const { currentUser, transactions } = useBank();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedAccount, setSelectedAccount] = useState('All');

  if (!currentUser) return null;

  // Filter transactions for this customer
  let myTxns = transactions.filter(t => t.customerId === currentUser.id);

  if (selectedAccount !== 'All') {
    myTxns = myTxns.filter(t => t.accountNumber === selectedAccount);
  }

  if (selectedCategory !== 'All') {
    myTxns = myTxns.filter(t => t.category === selectedCategory);
  }

  if (selectedType !== 'All') {
    myTxns = myTxns.filter(t => t.type === selectedType);
  }

  if (searchTerm) {
    const query = searchTerm.toLowerCase();
    myTxns = myTxns.filter(t => 
      t.description.toLowerCase().includes(query) || 
      t.reference.toLowerCase().includes(query) ||
      (t.counterparty && t.counterparty.toLowerCase().includes(query))
    );
  }

  const handleExportCSV = () => {
    if (myTxns.length === 0) {
      alert("No transaction records available to export.");
      return;
    }

    const headers = ["Transaction ID", "Date", "Account Number", "Description", "Category", "Amount ($)", "Type", "Reference", "Status"];
    const rows = myTxns.map(t => [
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
    link.setAttribute("download", `ApexBank_Statement_${currentUser.name.replace(" ", "_")}_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintStatement = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-600/20 text-teal-400 border border-teal-500/30">
              <FileText className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Bank Passbook & Statement Ledger</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Official audited transaction statements for <span className="text-white font-bold">{currentUser.name}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 font-semibold text-xs flex items-center gap-2 transition shadow-md"
          >
            <Download className="h-4 w-4 text-teal-400" />
            <span>Export CSV Ledger</span>
          </button>
          <button
            onClick={handlePrintStatement}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-indigo-600/30"
          >
            <Printer className="h-4 w-4" />
            <span>Print PDF Statement</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by payee, ref no, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-100 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Account Filter */}
        <select
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-100 focus:outline-none focus:border-indigo-500"
        >
          <option value="All">All Bank Accounts</option>
          {currentUser.accounts.map(acc => (
            <option key={acc.id} value={acc.accountNumber}>{acc.type} ({acc.accountNumber})</option>
          ))}
        </select>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-100 focus:outline-none focus:border-indigo-500"
        >
          <option value="All">All Categories</option>
          <option value="Salary">Salary</option>
          <option value="Transfer">Transfer</option>
          <option value="Shopping">Shopping</option>
          <option value="Utilities">Utilities</option>
          <option value="Investment">Investment</option>
          <option value="Deposit">Deposit</option>
          <option value="Withdrawal">Withdrawal</option>
        </select>

        {/* Credit / Debit Filter */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-100 focus:outline-none focus:border-indigo-500"
        >
          <option value="All">All Transaction Types</option>
          <option value="credit">Credits (+ Money In)</option>
          <option value="debit">Debits (- Money Out)</option>
        </select>
      </div>

      {/* Ledger Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 uppercase text-[10px] tracking-wider text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Transaction & Ref</th>
                <th className="px-5 py-3.5">Date & Time</th>
                <th className="px-5 py-3.5">Account Number</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Counterparty</th>
                <th className="px-5 py-3.5 text-right">Amount</th>
                <th className="px-5 py-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {myTxns.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-500">
                    No transactions match your search filters.
                  </td>
                </tr>
              ) : (
                myTxns.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-900/40 transition">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-100">{t.description}</div>
                      <div className="text-[10px] font-mono text-indigo-400">{t.reference}</div>
                    </td>
                    <td className="px-5 py-4 text-slate-300 whitespace-nowrap">{t.date}</td>
                    <td className="px-5 py-4 font-mono text-slate-400">{t.accountNumber}</td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[10px] font-semibold border border-slate-700">
                        {t.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-300">{t.counterparty || 'N/A'}</td>
                    <td className="px-5 py-4 text-right font-extrabold text-sm whitespace-nowrap">
                      <span className={t.type === 'credit' ? 'text-emerald-400' : 'text-slate-200'}>
                        {t.type === 'credit' ? '+' : '-'}${t.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="h-3 w-3" />
                        {t.status}
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
  );
};
