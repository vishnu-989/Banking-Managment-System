import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { CreditCard, CheckCircle2, ShieldCheck, PlusCircle } from 'lucide-react';

export const EmployeeCardIssuance = () => {
  const { customers, issueCardForCustomer, currentUser } = useBank();
  
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');
  const [cardType, setCardType] = useState('Visa Infinite');
  const [limit, setLimit] = useState('15000');
  const [cardClass, setCardClass] = useState('bank-card-gradient-1');
  const [msg, setMsg] = useState('');

  const handleIssueSubmit = (e) => {
    e.preventDefault();
    setMsg('');

    if (!selectedCustomerId) {
      alert("Please select a customer.");
      return;
    }

    const cardId = issueCardForCustomer({
      customerId: selectedCustomerId,
      cardType,
      limit,
      cardClass
    });

    const cust = customers.find(c => c.id === selectedCustomerId);
    setMsg(`Card ${cardType} (${cardId}) successfully issued for ${cust?.name}!`);
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-teal-500/20 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-600/20 text-teal-400 border border-teal-500/30">
              <CreditCard className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Staff Debit & Credit Card Issuance Desk</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Issue new high-limit Visa & Mastercard cards, replace lost cards, and set credit limits.
          </p>
        </div>
      </div>

      {msg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        <form onSubmit={handleIssueSubmit} className="space-y-4 text-xs">
          
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Select Customer</label>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium focus:outline-none focus:border-teal-500"
            >
              {customers.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.id}) — {c.cards.length} Cards Active
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Card Product Scheme</label>
              <select
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-teal-500"
              >
                <option value="Visa Infinite">Visa Infinite Black</option>
                <option value="Mastercard World Elite">Mastercard World Elite</option>
                <option value="Visa Platinum">Visa Platinum Express</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Monthly Spending Credit Limit ($)</label>
              <input
                type="number"
                step="1000"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-2">Card Visual Theme</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setCardClass('bank-card-gradient-1')}
                className={`p-3 rounded-xl text-center text-xs font-bold transition ${
                  cardClass === 'bank-card-gradient-1' ? 'ring-2 ring-indigo-400 font-extrabold' : 'opacity-70'
                } bank-card-gradient-1 text-white`}
              >
                Deep Royal Indigo
              </button>

              <button
                type="button"
                onClick={() => setCardClass('bank-card-gradient-2')}
                className={`p-3 rounded-xl text-center text-xs font-bold transition ${
                  cardClass === 'bank-card-gradient-2' ? 'ring-2 ring-teal-400 font-extrabold' : 'opacity-70'
                } bank-card-gradient-2 text-white`}
              >
                Emerald Emerald Gold
              </button>

              <button
                type="button"
                onClick={() => setCardClass('bank-card-gradient-3')}
                className={`p-3 rounded-xl text-center text-xs font-bold transition ${
                  cardClass === 'bank-card-gradient-3' ? 'ring-2 ring-rose-400 font-extrabold' : 'opacity-70'
                } bank-card-gradient-3 text-white`}
              >
                Ruby Platinum Executive
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-600/30 transition mt-2"
          >
            Issue New Card Credentials
          </button>

        </form>
      </div>

    </div>
  );
};
