import React from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, LogOut, School, User } from 'lucide-react';

const Navbar = () => {
  const { user, userType, darkMode, toggleDarkMode, logout } = useApp();

  return (
    <nav className="glass border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-indigo-600 rounded-xl text-white flex items-center justify-center">
          <School size={22} />
        </div>
        <div>
          <span className="font-display font-bold text-lg text-slate-800 dark:text-white block">
            Apex Academy
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            10th Grade Portal
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Theme"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {user && (
          <>
            {/* User Profile Summary */}
            <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4">
              <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-900">
                <User size={16} />
              </div>
              <div className="hidden md:block">
                <span className="text-sm font-semibold text-slate-800 dark:text-white block leading-tight">
                  {user.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-indigo-500 font-bold">
                  {userType === 'parent' ? `Parent of ${user.childName}` : userType}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors flex items-center gap-2 font-semibold text-sm border border-transparent hover:border-rose-100 dark:hover:border-rose-950"
              title="Logout"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
