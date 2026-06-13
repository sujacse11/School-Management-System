import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, Mail, Settings, Users, BookOpen } from 'lucide-react';

const Sidebar = () => {
  const { userType } = useApp();

  return (
    <aside className="w-full md:w-64 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-2 bg-slate-50 dark:bg-slate-900/50">
      <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-2 px-4">
        Navigation Menu
      </div>

      <nav className="flex flex-col gap-1.5">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        {userType === 'parent' && (
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Mail size={18} />
            <span>Contact Teacher</span>
          </NavLink>
        )}

        <NavLink
          to="/settings"
          className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        >
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div className="mt-auto border-t border-slate-200 dark:border-slate-800 pt-6">
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/50 dark:border-indigo-950 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <BookOpen size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Academic Year</span>
          </div>
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            2025 - 2026
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            Current Class: 10th-A
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
