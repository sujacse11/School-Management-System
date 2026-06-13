import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import QuickLogin from '../components/QuickLogin';
import { Mail, Lock, Eye, EyeOff, ShieldAlert, Award, Compass, Heart } from 'lucide-react';

const Login = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Validation / Error state
  const [errors, setErrors] = useState({});
  const [isShaking, setIsShaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleQuickLoginSelect = (selectedEmail, selectedPassword) => {
    setEmail(selectedEmail);
    setPassword(selectedPassword);
    setErrors({});
    setErrorMessage('');
  };

  const validateForm = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      tempErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 5) {
      tempErrors.password = 'Password must be at least 5 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    const isValid = validateForm();
    if (!isValid) {
      triggerShake();
      return;
    }

    const res = login(email, password);
    if (!res.success) {
      setErrorMessage(res.message);
      triggerShake();
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  };

  return (
    <div className="min-height-[90vh] flex items-center justify-center p-4 py-12 md:py-20 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

      <div className={`w-full max-w-md glass p-8 rounded-3xl shadow-2xl relative border border-slate-200/60 dark:border-slate-800/80 transition-all ${isShaking ? 'shake' : ''} fade-in`}>
        
        {/* Branding header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl text-white shadow-lg mb-4">
            <Compass size={28} />
          </div>
          <h2 className="text-3xl font-display font-extrabold text-slate-800 dark:text-white tracking-tight">
            Apex School Portal
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Welcome back! Sign in to access student and parent details.
          </p>
        </div>

        {/* Top level server errors */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-950 text-rose-500 text-xs font-semibold flex items-center gap-2.5">
            <ShieldAlert size={16} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email input group */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <Mail size={18} />
              </span>
              <input
                type="text"
                placeholder="student@school.com or parent@parent.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                }}
                className={`input-field pl-11 ${errors.email ? 'error' : ''}`}
              />
            </div>
            {errors.email && (
              <span className="text-xs text-rose-500 font-semibold mt-0.5">{errors.email}</span>
            )}
          </div>

          {/* Password input group */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Password
              </label>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                }}
                className={`input-field pl-11 pr-11 ${errors.password ? 'error' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-rose-500 font-semibold mt-0.5">{errors.password}</span>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="btn-primary w-full py-3.5 rounded-xl font-semibold text-sm mt-3"
          >
            Sign In to Portal
          </button>
        </form>

        {/* Info badges */}
        <div className="grid grid-cols-3 gap-2 mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40">
            <Award size={16} className="text-indigo-500 mb-1" />
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">10th Std</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40">
            <Users size={16} className="text-indigo-500 mb-1" />
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">10 Accounts</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40">
            <Heart size={16} className="text-indigo-500 mb-1" />
            <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Secure TLS</span>
          </div>
        </div>
      </div>

      {/* Floating helper for quick login select */}
      <QuickLogin onSelect={handleQuickLoginSelect} />
    </div>
  );
};

export default Login;
