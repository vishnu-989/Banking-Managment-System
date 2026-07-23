import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { 
  Building2, 
  Lock, 
  Mail, 
  ShieldCheck, 
  UserCheck, 
  KeyRound, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  User,
  Sparkles
} from 'lucide-react';

export const Login = () => {
  const { login, customers, employees } = useBank();

  const [portalType, setPortalType] = useState('Customer'); // 'Customer' | 'Employee' | 'Admin'
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [password, setPassword] = useState('Password@123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePortalSwitch = (type) => {
    setPortalType(type);
    setErrorMessage('');
    if (type === 'Customer') {
      setEmail('alex.morgan@example.com');
      setPassword('Password@123');
    } else if (type === 'Employee') {
      setEmail('d.miller@apexbank.com');
      setPassword('Password@123');
    } else if (type === 'Admin') {
      setEmail('s.connor@apexbank.com');
      setPassword('Password@123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const res = login({ email, password, portalType });
      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.message);
      }
    }, 400);
  };

  const selectQuickDemoUser = (user, type) => {
    setPortalType(type);
    setEmail(user.email);
    setPassword(user.password || 'Password@123');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Bar */}
      <header className="px-6 py-6 border-b border-slate-800/60 glass-panel relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bank-card-gradient-1 flex items-center justify-center shadow-lg shadow-indigo-500/25 border border-indigo-400/30">
              <Building2 className="h-6 w-6 text-indigo-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                  ApexBank Premier
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Enterprise Gateway
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Next-Gen Banking & Operations Portal
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-medium bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>256-Bit SSL Encrypted Vault</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-xl">

          {/* Login Card */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-700/70 shadow-2xl backdrop-blur-2xl">
            
            {/* Header / Portal Selector */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">
                Secure Account Sign In
              </h1>
              <p className="text-sm text-slate-400">
                Choose your portal access level and enter your authentication credentials
              </p>

              {/* Portal Selector Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1.5 mt-6 bg-slate-900/90 rounded-2xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => handlePortalSwitch('Customer')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    portalType === 'Customer'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Customer</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePortalSwitch('Employee')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    portalType === 'Employee'
                      ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 border border-teal-400/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <UserCheck className="h-4 w-4" />
                  <span>Staff / Teller</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePortalSwitch('Admin')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    portalType === 'Admin'
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>Executive Admin</span>
                </button>
              </div>
            </div>

            {/* Error Alert */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
                <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* User / Email Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  {portalType === 'Customer' ? 'Email Address or Account #' : 'Staff Corporate Email'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      portalType === 'Customer' 
                        ? 'alex.morgan@example.com' 
                        : portalType === 'Employee' 
                        ? 'd.miller@apexbank.com' 
                        : 's.connor@apexbank.com'
                    }
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Password / PIN Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Password / Security PIN
                  </label>
                  <span className="text-[11px] text-indigo-400 hover:underline cursor-pointer">
                    Forgot PIN?
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm font-medium text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-xl transition-all ${
                  portalType === 'Customer'
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-indigo-600/30'
                    : portalType === 'Employee'
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 shadow-teal-600/30'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-purple-600/30'
                }`}
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In to {portalType} Portal</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Credentials Assistant */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-1.5 mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span>Quick Demo Login Presets</span>
              </div>
              
              <div className="space-y-2">
                {/* Customer Demos */}
                {portalType === 'Customer' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {customers.slice(0, 2).map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => selectQuickDemoUser(c, 'Customer')}
                        className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 text-left transition"
                      >
                        <img src={c.avatar} alt={c.name} className="h-7 w-7 rounded-full object-cover shrink-0" />
                        <div className="truncate">
                          <div className="text-xs font-bold text-slate-200">{c.name}</div>
                          <div className="text-[10px] text-slate-400 truncate">PW: Password@123</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Employee Demos */}
                {portalType === 'Employee' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {employees.slice(0, 2).map((e) => (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => selectQuickDemoUser(e, 'Employee')}
                        className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 text-left transition"
                      >
                        <img src={e.avatar} alt={e.name} className="h-7 w-7 rounded-full object-cover shrink-0" />
                        <div className="truncate">
                          <div className="text-xs font-bold text-slate-200">{e.name}</div>
                          <div className="text-[10px] text-teal-400 truncate">{e.role}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Admin Demo */}
                {portalType === 'Admin' && (
                  <button
                    type="button"
                    onClick={() => selectQuickDemoUser({ email: 's.connor@apexbank.com', password: 'Password@123' }, 'Admin')}
                    className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-purple-900/20 border border-purple-800/50 hover:border-purple-500/70 text-left transition"
                  >
                    <div className="h-7 w-7 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Sarah Connor (Executive Director)</div>
                      <div className="text-[10px] text-purple-300">s.connor@apexbank.com • Password@123</div>
                    </div>
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Features note */}
          <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Customer Self-Service
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Staff Counter Operations
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Admin Oversight
            </span>
          </div>

        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="py-4 px-6 border-t border-slate-900 text-center text-xs text-slate-600 relative z-10">
        ApexBank Premier Enterprise OS • Encrypted & Audited Core System
      </footer>
    </div>
  );
};
