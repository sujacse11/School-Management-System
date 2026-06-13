import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, User, ArrowRight, Shield, X, HelpCircle } from 'lucide-react';

const QuickLogin = ({ onSelect }) => {
  const { students } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('students'); // 'students' | 'parents' | 'staff'

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg z-50 flex items-center gap-2 font-semibold text-sm transition-all hover:scale-105"
      >
        <HelpCircle size={20} />
        <span>Demo Credentials</span>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-indigo-50/50 dark:bg-slate-950/20">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Users size={20} />
            <h3 className="font-display font-bold text-lg text-slate-800 dark:text-white">
              Demo Credentials Helper
            </h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          {['students', 'parents', 'staff'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3.5 text-center text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              {tab === 'students' ? 'Students (10)' : tab === 'parents' ? 'Parents (10)' : 'Staff / Teacher'}
            </button>
          ))}
        </div>

        {/* Accounts List */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
          {activeTab === 'students' &&
            students.map((student, idx) => (
              <div
                key={student.id}
                onClick={() => {
                  onSelect(student.email, student.password);
                  setIsOpen(false);
                }}
                className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 bg-slate-50 dark:bg-slate-950/20 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    Roll No: {student.rollNumber} | {student.id}
                  </span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">
                  {student.name}
                </h4>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  <div>Email: {student.email}</div>
                  <div>Password: {student.password}</div>
                </div>
              </div>
            ))}

          {activeTab === 'parents' &&
            students.map((student) => (
              <div
                key={student.id}
                onClick={() => {
                  onSelect(student.parent.email, student.parent.password);
                  setIsOpen(false);
                }}
                className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 bg-slate-50 dark:bg-slate-950/20 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    Parent of {student.name}
                  </span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">
                  {student.parent.name} ({student.parent.relationship})
                </h4>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  <div>Email: {student.parent.email}</div>
                  <div>Password: {student.parent.password}</div>
                </div>
              </div>
            ))}

          {activeTab === 'staff' && (
            <div
              onClick={() => {
                onSelect('teacher@school.com', 'teacher123');
                setIsOpen(false);
              }}
              className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 bg-slate-50 dark:bg-slate-950/20 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Shield size={12} />
                  Teacher Profile
                </span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-1">
                Mrs. Sarah Connor (Class Teacher)
              </h4>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <div>Email: teacher@school.com</div>
                <div>Password: teacher123</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default QuickLogin;
