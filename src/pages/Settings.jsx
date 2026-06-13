import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Key, Eye, EyeOff, Save, CheckCircle, ExternalLink, HelpCircle, Mail } from 'lucide-react';

const SettingsPage = () => {
  const { web3Key, setWeb3Key, user, userType } = useApp();
  const [keyInput, setKeyInput] = useState(web3Key);
  const [showKey, setShowKey] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setWeb3Key(keyInput.trim());
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8 fade-in">
      
      {/* Header Title */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-600 rounded-xl text-white flex items-center justify-center">
          <Settings size={22} />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-extrabold text-slate-800 dark:text-white">
            System Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
            Configure integration keys and view profile session details.
          </p>
        </div>
      </div>

      {/* Web3Forms Integration Panel */}
      <div className="glass p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-4">
          <Key size={20} />
          <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">
            Web3Forms Access Configuration
          </h3>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
          Web3Forms allows you to receive contact form submissions directly to your email without any backend database. When a parent contacts the class teacher, the message will be delivered to your inbox using this key.
        </p>

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2.5">
            <CheckCircle size={16} />
            <span>Web3Forms access key saved successfully to browser storage!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Web3Forms Access Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                placeholder="Paste your Web3Forms Access Key here..."
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="input-field pr-12 font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
            <a
              href="https://web3forms.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5"
            >
              <span>Get a free Access Key at Web3Forms</span>
              <ExternalLink size={12} />
            </a>
            
            <button
              type="submit"
              className="btn-primary py-2.5 px-5 rounded-xl text-xs font-bold self-end md:self-auto"
            >
              <Save size={14} />
              Save Access Key
            </button>
          </div>
        </form>
      </div>

      {/* Guide Card */}
      <div className="glass p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 flex gap-4">
        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl h-fit">
          <HelpCircle size={20} />
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">How do I test the Web3 Contact Form?</h4>
          <ol className="list-decimal pl-4 text-xs text-slate-500 dark:text-slate-400 flex flex-col gap-2 mt-2 font-medium">
            <li>Visit <a href="https://web3forms.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold">web3forms.com</a> and enter your email address to receive your free key.</li>
            <li>Copy the access key from the registration confirmation email.</li>
            <li>Paste it into the form above and click <strong>Save Access Key</strong>.</li>
            <li>Log in as any Parent profile, go to the <strong>Contact Teacher</strong> page, fill out the form, and submit.</li>
            <li>Check your email! You will receive the parent's message in your inbox instantly.</li>
          </ol>
        </div>
      </div>

      {/* Session Profile Panel */}
      {user && (
        <div className="glass p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
            <Mail size={20} />
            <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">
              User Profile Session details
            </h3>
          </div>

          <div className="flex flex-col gap-3 text-xs md:text-sm">
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-850">
              <span className="text-slate-400 dark:text-slate-500">Authorized Name</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{user.name}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-850">
              <span className="text-slate-400 dark:text-slate-500">Authorized Email</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200 font-mono text-xs">{user.email}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400 dark:text-slate-500">Security Clearance Role</span>
              <span className="font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 text-xs">{userType}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SettingsPage;
