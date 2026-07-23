import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { 
  Landmark, 
  Calculator, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Send,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export const LoanApplication = () => {
  const { currentUser, loans, applyLoan } = useBank();
  
  const [loanType, setLoanType] = useState('Home Renovation Loan');
  const [amount, setAmount] = useState(20000);
  const [tenureMonths, setTenureMonths] = useState(24);
  const [purpose, setPurpose] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!currentUser) return null;

  const myLoans = loans.filter(l => l.customerId === currentUser.id);

  // Interest rate calculation
  const interestRate = loanType.includes("Home") ? 6.5 : (loanType.includes("Auto") ? 7.2 : 9.5);
  
  // EMI Calculation: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const calculatedEmi = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  const totalRepayment = calculatedEmi * tenureMonths;
  const totalInterest = totalRepayment - amount;

  const handleSubmitLoan = (e) => {
    e.preventDefault();
    setSuccessMsg('');

    if (!purpose.trim()) {
      alert("Please enter the loan purpose details.");
      return;
    }

    const newLoan = applyLoan({
      loanType,
      amount,
      tenureMonths,
      purpose
    });

    setSuccessMsg(`Loan Application ${newLoan.id} successfully submitted for bank officer review!`);
    setPurpose('');
  };

  return (
    <div className="max-w-7xl mx-auto py-4 space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
              <Landmark className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Digital Loan & Credit Facility</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Instant credit approval system with EMI calculator and risk score verification.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: EMI Calculator & Submission Form */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Calculator className="h-4 w-4 text-amber-400" />
                Interactive EMI Loan Calculator
              </h3>
              <span className="text-xs font-semibold text-amber-400 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                {interestRate}% Fixed APY
              </span>
            </div>

            {successMsg && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmitLoan} className="space-y-6">
              
              {/* Select Loan Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Loan Category</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { title: "Home Renovation Loan", rate: "6.5% APY" },
                    { title: "Auto Financing", rate: "7.2% APY" },
                    { title: "Personal Express Loan", rate: "9.5% APY" }
                  ].map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setLoanType(item.title)}
                      className={`p-3.5 rounded-2xl border text-left text-xs transition ${
                        loanType === item.title 
                          ? 'bg-amber-600/20 border-amber-500 text-white font-bold' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-slate-100">{item.title}</div>
                      <div className="text-[10px] text-amber-400 mt-1 font-semibold">{item.rate}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-300">Desired Loan Amount</label>
                  <span className="text-lg font-black text-amber-400">${amount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="2500"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>$5,000</span>
                  <span>$50,000</span>
                  <span>$100,000</span>
                </div>
              </div>

              {/* Tenure Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-300">Repayment Duration</label>
                  <span className="text-base font-bold text-white">{tenureMonths} Months ({tenureMonths/12} Years)</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="60"
                  step="6"
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                  className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>6 Months</span>
                  <span>36 Months</span>
                  <span>60 Months</span>
                </div>
              </div>

              {/* EMI Calculation Summary Box */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Monthly EMI</p>
                  <p className="text-xl font-black text-white mt-1">${calculatedEmi.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Total Interest</p>
                  <p className="text-sm font-bold text-rose-400 mt-1">${totalInterest.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-slate-400">Total Repayment Amount</p>
                  <p className="text-sm font-bold text-emerald-400 mt-1">${totalRepayment.toFixed(2)}</p>
                </div>
              </div>

              {/* Loan Purpose Note */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Loan Purpose & Remarks
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Home renovation, buying solar panel equipment..."
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30 flex items-center justify-center gap-2 transition"
              >
                <Send className="h-4 w-4" />
                <span>Submit Loan Application to Bank Officers</span>
              </button>

            </form>

          </div>

        </div>

        {/* Right Column: Loan Application Status Tracker */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">My Loan Requests</h3>

          <div className="space-y-3">
            {myLoans.length === 0 ? (
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 text-center text-xs text-slate-500">
                No active or pending loan requests.
              </div>
            ) : (
              myLoans.map((loan) => (
                <div key={loan.id} className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-100">{loan.type}</h4>
                      <p className="text-[10px] font-mono text-indigo-400">{loan.id} • Applied {loan.appliedDate}</p>
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                      loan.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      loan.status === 'Rejected' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      {loan.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800/80">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Principal</span>
                      <span className="font-bold text-white">${loan.amount.toLocaleString()}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Monthly EMI</span>
                      <span className="font-bold text-amber-400">${loan.monthlyEmi}</span>
                    </div>
                  </div>

                  {loan.notes && (
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
                      <span className="font-bold text-slate-400 block">Bank Officer Note:</span>
                      <span>{loan.notes}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
