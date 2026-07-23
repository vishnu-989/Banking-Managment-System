import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { 
  CreditCard, 
  Lock, 
  Unlock, 
  ShieldCheck, 
  Globe, 
  ShoppingBag, 
  Eye, 
  EyeOff,
  KeyRound,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const CardManagement = () => {
  const { currentUser, toggleCardFreeze, updateCardControls, resetCardPin } = useBank();
  
  const [selectedCardId, setSelectedCardId] = useState(currentUser?.cards[0]?.id || '');
  const [showCvv, setShowCvv] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinMsg, setPinMsg] = useState('');

  if (!currentUser) return null;

  const userCards = currentUser.cards || [];
  const selectedCard = userCards.find(c => c.id === selectedCardId) || userCards[0];

  const handlePinResetSubmit = (e) => {
    e.preventDefault();
    setPinMsg('');
    if (!newPin || newPin.length < 4) {
      setPinMsg("Please enter a valid 4-digit PIN.");
      return;
    }
    resetCardPin(selectedCard.id, newPin);
    setNewPin('');
    setPinMsg("Card PIN successfully updated!");
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <CreditCard className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Virtual Card Control Center</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage debit & credit cards, security limits, freeze cards, and change PINs.
          </p>
        </div>
      </div>

      {userCards.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl border border-slate-800 space-y-3">
          <CreditCard className="h-12 w-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">No Cards Issued Yet</h3>
          <p className="text-xs text-slate-500">Contact bank employee to issue an instant debit or credit card.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: 3D Interactive Card Preview */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Active Card</h3>
            
            {/* Card Selector List */}
            <div className="space-y-3">
              {userCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setSelectedCardId(card.id)}
                  className={`p-6 rounded-2xl cursor-pointer transition transform duration-300 relative overflow-hidden shadow-2xl ${card.cardClass} ${
                    selectedCardId === card.id ? 'ring-2 ring-indigo-400 scale-[1.02]' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  {card.isFrozen && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-20 flex items-center justify-center gap-2 text-rose-400 font-bold text-sm">
                      <Lock className="h-5 w-5" />
                      <span>CARD FROZEN</span>
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-6">
                    <span className="font-bold tracking-widest text-xs text-slate-200 uppercase">{card.type}</span>
                    <span className="font-mono font-bold text-xs bg-white/10 px-2 py-1 rounded border border-white/20">
                      ApexBank
                    </span>
                  </div>

                  <div className="font-mono text-lg font-bold tracking-widest text-white mb-6">
                    {card.number}
                  </div>

                  <div className="flex justify-between items-end text-xs text-slate-200">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Cardholder</p>
                      <p className="font-bold tracking-wider">{card.holder}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Expires</p>
                      <p className="font-mono font-bold">{card.expiry}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Security Controls & PIN Reset */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Card Security Controls Card */}
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{selectedCard.type}</span>
                    <span className="text-xs font-mono text-indigo-400">({selectedCard.id})</span>
                  </h3>
                  <p className="text-xs text-slate-400">Card Controls & Limit Configuration</p>
                </div>

                {/* Freeze / Unfreeze Toggle */}
                <button
                  onClick={() => toggleCardFreeze(selectedCard.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-lg ${
                    selectedCard.isFrozen 
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                      : 'bg-rose-600 hover:bg-rose-500 text-white'
                  }`}
                >
                  {selectedCard.isFrozen ? (
                    <>
                      <Unlock className="h-4 w-4" />
                      <span>Unfreeze Card</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      <span>Freeze Card Instantly</span>
                    </>
                  )}
                </button>
              </div>

              {/* Spending Limit Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Monthly Spending Limit</span>
                  <span className="text-white">${selectedCard.spent.toLocaleString()} / ${selectedCard.limit.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div 
                    className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (selectedCard.spent / selectedCard.limit) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Security Toggles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* Online Transactions Toggle */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400">
                      <ShoppingBag className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">Online Payments</h4>
                      <p className="text-[10px] text-slate-400">E-Commerce & Digital Subscriptions</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedCard.onlinePayments}
                    onChange={(e) => updateCardControls(selectedCard.id, { onlinePayments: e.target.checked })}
                    className="h-4 w-4 rounded accent-indigo-600 cursor-pointer"
                  />
                </div>

                {/* International Usage Toggle */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-teal-600/20 text-teal-400">
                      <Globe className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">International Usage</h4>
                      <p className="text-[10px] text-slate-400">Foreign Currency & POS Swipes</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedCard.internationalUsage}
                    onChange={(e) => updateCardControls(selectedCard.id, { internationalUsage: e.target.checked })}
                    className="h-4 w-4 rounded accent-teal-600 cursor-pointer"
                  />
                </div>

              </div>

              {/* CVV & Security PIN Section */}
              <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Reveal CVV */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-400">Card CVV Security Code</span>
                    <button 
                      onClick={() => setShowCvv(!showCvv)}
                      className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-bold"
                    >
                      {showCvv ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      <span>{showCvv ? 'Hide' : 'Show CVV'}</span>
                    </button>
                  </div>
                  <div className="text-lg font-mono font-bold text-white tracking-widest">
                    {showCvv ? '892' : '•••'}
                  </div>
                </div>

                {/* Change PIN Form */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <span className="font-semibold text-xs text-slate-400 block">Change 4-Digit Security PIN</span>
                  {pinMsg && (
                    <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{pinMsg}</span>
                    </div>
                  )}
                  <form onSubmit={handlePinResetSubmit} className="flex gap-2">
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="New PIN"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      className="w-28 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono font-bold text-center text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition"
                    >
                      Update
                    </button>
                  </form>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
