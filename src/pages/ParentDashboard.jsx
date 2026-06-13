import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { User, BookOpen, Calendar, DollarSign, Award, Mail, MessageSquare, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

const ParentDashboard = () => {
  const { user, students } = useApp();

  if (!user) return null;

  // Find this parent's child in the active students list (so it's dynamic!)
  let child = students.find(s => s.id === user.childId);
  // Fallback: lookup by parent email in case cached session child ID format is outdated (e.g. STU001 vs STU-24001)
  if (!child && user.email) {
    child = students.find(s => s.parent.email.toLowerCase() === user.email.toLowerCase());
  }

  if (!child) {
    return (
      <div className="glass p-8 rounded-3xl text-center border border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-bold text-rose-500">Child Details Not Found</h3>
        <p className="text-slate-500 mt-2">We couldn't retrieve the associated student record. Please contact the administrator.</p>
      </div>
    );
  }

  // Calculate child average marks
  const subjectKeys = Object.keys(child.subjects);
  const totalMarks = subjectKeys.reduce((acc, key) => acc + child.subjects[key].marks, 0);
  const averageMarks = (totalMarks / subjectKeys.length).toFixed(1);

  // Dynamic 2-Month Attendance calculation
  const totalPresent = child.attendanceDetail.june.present + child.attendanceDetail.july.present;
  const totalWorking = child.attendanceDetail.june.workingDays + child.attendanceDetail.july.workingDays;
  const attendancePercentage = `${Math.round((totalPresent / totalWorking) * 100)}%`;

  // Daily Log Month State
  const [selectedLogMonth, setSelectedLogMonth] = useState('june');

  // Daily Log Generator helper
  const getDailyLogs = (present, total) => {
    const logs = Array(total).fill('Present');
    const absentCount = total - present;
    for (let i = 0; i < absentCount; i++) {
      const index = (i * 7 + 4) % total; // scatter absent days realistically
      logs[index] = 'Absent';
    }
    return logs;
  };

  // SVG bar chart parameters
  const chartHeight = 160;
  const chartWidth = 500;
  const padding = 30;
  const graphHeight = chartHeight - padding * 2;
  const graphWidth = chartWidth - padding * 2;
  const barWidth = 35;
  const gap = (graphWidth - barWidth * subjectKeys.length) / (subjectKeys.length - 1);

  return (
    <div className="flex flex-col gap-8 fade-in">
      
      {/* Welcome Banner */}
      <div className="glass p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 dark:bg-indigo-400/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200/30">
            <User size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-extrabold text-slate-800 dark:text-white">
              Welcome, {user.name}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
              Logged in as <span className="font-semibold text-indigo-600 dark:text-indigo-400">{user.relationship}</span> of <span className="font-semibold text-slate-700 dark:text-slate-200">{child.name}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 flex items-center gap-1.5">
            <ShieldCheck size={14} />
            Verified Parent Profile
          </span>
        </div>
      </div>

      {/* 10th Std Student & Parent Profile Card */}
      <div className="glass p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col gap-6">
        <h2 className="text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <User size={20} className="text-indigo-500" />
          <span>10th Std Student & Parent Profile Details</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Child (Student) Details */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-850 pb-2">
              Student Details (10th Std)
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850/50">
                <span className="text-slate-400 dark:text-slate-500">Student Name</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{child.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850/50">
                <span className="text-slate-400 dark:text-slate-500">Student ID</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200 font-mono text-xs">{child.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850/50">
                <span className="text-slate-400 dark:text-slate-500">Roll Number</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{child.rollNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850/50">
                <span className="text-slate-400 dark:text-slate-500">Class & Section</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{child.class} (Section {child.section})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850/50">
                <span className="text-slate-400 dark:text-slate-500">Classroom Room</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{child.room}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850/50">
                <span className="text-slate-400 dark:text-slate-500">Class Advisor</span>
                <span className="font-semibold text-indigo-650 dark:text-indigo-400">{child.classAdvisor}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 dark:text-slate-500">Student Email</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200 font-mono text-xs">{child.email}</span>
              </div>
            </div>
          </div>

          {/* Parent Details */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 border-b border-slate-100 dark:border-slate-850 pb-2">
              Parent Details
            </h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850/50">
                <span className="text-slate-400 dark:text-slate-500">Parent Name</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{user.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850/50">
                <span className="text-slate-400 dark:text-slate-500">Relationship</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{user.relationship}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850/50">
                <span className="text-slate-400 dark:text-slate-500">Contact Phone</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{user.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850/50">
                <span className="text-slate-400 dark:text-slate-500">Email Address</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200 font-mono text-xs">{user.email}</span>
              </div>
              <div className="flex flex-col gap-1 py-1">
                <span className="text-slate-400 dark:text-slate-500">Home Address</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200 text-xs leading-relaxed">{user.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Child Summary Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Child Details Card */}
        <div className="glass p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mb-2">Student Information</span>
            <h3 className="text-xl font-display font-extrabold text-slate-800 dark:text-white mb-3">
              {child.name}
            </h3>
            <div className="flex flex-col gap-2.5 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                <span className="text-slate-400 dark:text-slate-500">Class</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{child.class}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                <span className="text-slate-400 dark:text-slate-500">Room / Advisor</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{child.room} / {child.classAdvisor}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                <span className="text-slate-400 dark:text-slate-500">Roll No / Attendance</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">#{child.rollNumber} / {attendancePercentage}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 dark:text-slate-500">Academic Standing</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{child.performance}</span>
              </div>
            </div>
          </div>

          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500"
              style={{ width: attendancePercentage }}
            />
          </div>
        </div>

        {/* Academics Overview Card */}
        <div className="glass p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mb-2">Academics Performance</span>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-display font-extrabold text-slate-800 dark:text-white">{averageMarks}%</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Class Average</span>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Your child is performing <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">{child.performance.toLowerCase()}</strong> in class. Review detailed scores of the 6 subjects below.
            </p>
          </div>

          <Link 
            to="/contact" 
            className="btn-primary w-full py-2.5 rounded-xl text-xs font-bold mt-2"
          >
            <Mail size={14} />
            <span>Contact Class Teacher</span>
          </Link>
        </div>

        {/* Finance/Fees Card */}
        <div className="glass p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mb-2">School Fee Invoice</span>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl font-display font-extrabold text-slate-800 dark:text-white">Term 2 Fees</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Due Date: 15th July 2026</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                child.feeStatus === 'Paid' 
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-950' 
                  : 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-950'
              }`}>
                {child.feeStatus}
              </span>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {child.feeStatus === 'Paid' 
                ? 'School fees are fully paid for this term. Thank you for your payment!' 
                : 'Pending payment. Kindly complete the tuition fee clearance as soon as possible.'}
            </p>
          </div>

          {child.feeStatus === 'Pending' ? (
            <button
              onClick={() => alert("Simulated Payment Gateway: Payment Successful!")} 
              className="btn-secondary w-full py-2.5 rounded-xl text-xs font-bold mt-2 border-amber-500/20 hover:bg-amber-500/10 hover:text-amber-500"
            >
              <DollarSign size={14} />
              <span>Pay Tuition Fees</span>
            </button>
          ) : (
            <div className="text-center py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400">
              Receipt Reference: #INV-2026-9023
            </div>
          )}
        </div>

      </div>

      {/* Subjects Performance list & Marks Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Child Subject Performance Details */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h3 className="text-lg font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <BookOpen size={18} className="text-indigo-500" />
            <span>Child Academic Progress Report</span>
          </h3>

          <div className="flex flex-col gap-3">
            {subjectKeys.map((subName) => {
              const details = child.subjects[subName];
              return (
                <div key={subName} className="glass p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                      {subName[0]}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">{subName}</span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">10th Std Curriculum</span>
                    </div>
                  </div>

                  <div className="flex-1 md:max-w-xs">
                    <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span>Score</span>
                      <span className="font-bold text-slate-700 dark:text-slate-350">{details.marks} / 100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{ width: `${details.marks}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`px-2.5 py-1 rounded text-xs font-bold min-w-[50px] text-center ${
                      details.grade.includes('A') 
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400' 
                        : 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                    }`}>
                      Grade {details.grade}
                    </span>
                    <div className="hidden md:block text-xs text-slate-500 dark:text-slate-400 italic max-w-xs text-right">
                      "{details.remarks}"
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Charts & Links Column */}
        <div className="flex flex-col gap-6">
          
          {/* Custom SVG Performance Chart */}
          <div className="glass p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col gap-4">
            <h3 className="text-base font-display font-bold text-slate-800 dark:text-white">
              Academic Overview Chart
            </h3>

            <div className="w-full flex justify-center py-2 bg-slate-50 dark:bg-slate-950/30 rounded-2xl border border-slate-100 dark:border-slate-850">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
                {[0, 25, 50, 75, 100].map((gridVal) => {
                  const y = padding + graphHeight - (gridVal / 100) * graphHeight;
                  return (
                    <g key={gridVal} className="opacity-40">
                      <line 
                        x1={padding} 
                        y1={y} 
                        x2={chartWidth - padding} 
                        y2={y} 
                        stroke="var(--border-color)" 
                        strokeWidth={1}
                        strokeDasharray="4 4"
                      />
                      <text 
                        x={padding - 8} 
                        y={y + 4} 
                        textAnchor="end" 
                        fontSize={9} 
                        className="fill-slate-400 font-bold"
                      >
                        {gridVal}
                      </text>
                    </g>
                  );
                })}

                {/* Bars */}
                {subjectKeys.map((subName, i) => {
                  const marks = child.subjects[subName].marks;
                  const x = padding + i * (barWidth + gap);
                  const barHeight = (marks / 100) * graphHeight;
                  const y = padding + graphHeight - barHeight;

                  return (
                    <g key={subName}>
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        rx={4}
                        className="fill-indigo-500/80 hover:fill-indigo-650 dark:fill-indigo-500/70"
                      />
                      <text
                        x={x + barWidth / 2}
                        y={y - 5}
                        textAnchor="middle"
                        fontSize={8}
                        fontWeight="bold"
                        className="fill-indigo-600 dark:fill-indigo-300"
                      >
                        {marks}
                      </text>
                      <text
                        x={x + barWidth / 2}
                        y={chartHeight - padding + 15}
                        textAnchor="middle"
                        fontSize={8}
                        fontWeight="600"
                        className="fill-slate-500 dark:fill-slate-400"
                      >
                        {subName.substring(0, 3)}
                      </text>
                    </g>
                  );
                })}

                <line 
                  x1={padding} 
                  y1={chartHeight - padding} 
                  x2={chartWidth - padding} 
                  y2={chartHeight - padding} 
                  stroke="var(--border-color)" 
                  strokeWidth={1.5}
                />
              </svg>
            </div>
          </div>

          {/* 2-Month Attendance & Daily Log card */}
          <div className="glass p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-display font-bold text-slate-800 dark:text-white">
                2-Month Attendance
              </h3>
              
              {/* Month Selector Tabs */}
              <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setSelectedLogMonth('june')}
                  className={`px-3.5 py-1 rounded transition-all ${
                    selectedLogMonth === 'june' 
                      ? 'bg-white dark:bg-slate-700 text-indigo-650 dark:text-indigo-400 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  June
                </button>
                <button
                  onClick={() => setSelectedLogMonth('july')}
                  className={`px-3.5 py-1 rounded transition-all ${
                    selectedLogMonth === 'july' 
                      ? 'bg-white dark:bg-slate-700 text-indigo-650 dark:text-indigo-400 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  July
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                <span className="text-slate-400 dark:text-slate-500">June 2026</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {child.attendanceDetail.june.present} / {child.attendanceDetail.june.workingDays} Days ({Math.round((child.attendanceDetail.june.present / child.attendanceDetail.june.workingDays) * 100)}%)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                <span className="text-slate-400 dark:text-slate-500">July 2026</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {child.attendanceDetail.july.present} / {child.attendanceDetail.july.workingDays} Days ({Math.round((child.attendanceDetail.july.present / child.attendanceDetail.july.workingDays) * 100)}%)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850 text-indigo-650 dark:text-indigo-400 font-bold">
                <span>Total Attendance</span>
                <span>
                  {totalPresent} / {totalWorking} Days ({attendancePercentage})
                </span>
              </div>
            </div>

            {/* Daily Calendar/Grid attendance log */}
            <div className="pt-1.5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Daily Log: {selectedLogMonth === 'june' ? 'June 2026' : 'July 2026'}
                </span>
                
                {/* Legend */}
                <div className="flex gap-2 text-[9px] font-bold">
                  <span className="flex items-center gap-1 text-emerald-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    P (Present)
                  </span>
                  <span className="flex items-center gap-1 text-rose-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    A (Absent)
                  </span>
                </div>
              </div>

              {/* Grid of 22 slots representing working days */}
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-11 gap-1.5">
                {getDailyLogs(
                  child.attendanceDetail[selectedLogMonth].present, 
                  child.attendanceDetail[selectedLogMonth].workingDays
                ).map((status, index) => (
                  <div
                    key={index}
                    className={`p-1.5 text-center text-[10px] font-bold rounded-lg border transition-all ${
                      status === 'Present'
                        ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-950 text-emerald-600 dark:text-emerald-400'
                        : 'bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-950 text-rose-500'
                    }`}
                    title={`Day ${index + 1}: ${status}`}
                  >
                    D{index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick links & support info */}
          <div className="glass p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col gap-4">
            <h3 className="text-base font-display font-bold text-slate-800 dark:text-white">
              Portal Support Links
            </h3>
            <div className="flex flex-col gap-1">
              <Link 
                to="/contact" 
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors text-xs font-semibold text-slate-600 dark:text-slate-300"
              >
                <span className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-indigo-500" />
                  Request Teacher Meeting
                </span>
                <ChevronRight size={14} />
              </Link>
              <div 
                onClick={() => alert("Download Syllabus PDF: Coming soon!")}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <BookOpen size={14} className="text-indigo-500" />
                  Download 10th Std Syllabus
                </span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ParentDashboard;
