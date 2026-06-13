import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Calendar, DollarSign, Award, ArrowUpRight, TrendingUp, CheckCircle, AlertTriangle } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useApp();
  
  if (!user) return null;

  // Calculate overall average and GPA
  const subjectKeys = Object.keys(user.subjects);
  const totalMarks = subjectKeys.reduce((acc, key) => acc + user.subjects[key].marks, 0);
  const averageMarks = (totalMarks / subjectKeys.length).toFixed(1);
  
  // Calculate GPA based on marks
  const getGpa = (marks) => {
    if (marks >= 90) return 4.0;
    if (marks >= 80) return 3.5;
    if (marks >= 70) return 3.0;
    if (marks >= 60) return 2.5;
    return 2.0;
  };
  const gpa = (subjectKeys.reduce((acc, key) => acc + getGpa(user.subjects[key].marks), 0) / subjectKeys.length).toFixed(2);

  // Dynamic 2-Month Attendance calculation
  const totalPresent = user.attendanceDetail.june.present + user.attendanceDetail.july.present;
  const totalWorking = user.attendanceDetail.june.workingDays + user.attendanceDetail.july.workingDays;
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
  const chartHeight = 200;
  const chartWidth = 500;
  const padding = 40;
  const graphHeight = chartHeight - padding * 2;
  const graphWidth = chartWidth - padding * 2;
  const barWidth = 35;
  const gap = (graphWidth - barWidth * subjectKeys.length) / (subjectKeys.length - 1);

  return (
    <div className="flex flex-col gap-8 fade-in">
      {/* Header Profile card */}
      <div className="glass p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-display font-extrabold text-2xl shadow-lg shadow-indigo-600/20">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-display font-extrabold text-slate-800 dark:text-white">
                {user.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
                Active Student
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
              Class: <span className="font-semibold text-slate-700 dark:text-slate-200">{user.class}</span> | Roll Number: <span className="font-semibold text-slate-700 dark:text-slate-200">{user.rollNumber}</span> | Student ID: <span className="font-semibold text-slate-700 dark:text-slate-200">{user.id}</span>
            </p>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1.5">
              Room: <span className="font-semibold text-slate-700 dark:text-slate-200">{user.room}</span> | Class Advisor: <span className="font-semibold text-indigo-650 dark:text-indigo-400">{user.classAdvisor}</span>
            </p>
          </div>
        </div>

        <div className="flex gap-4 self-start md:self-center">
          <div className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 flex items-center gap-3">
            <Calendar size={18} className="text-indigo-500" />
            <div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block uppercase tracking-wider">Attendance</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{attendancePercentage}</span>
            </div>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 flex items-center gap-3">
            <DollarSign size={18} className={user.feeStatus === 'Paid' ? 'text-emerald-500' : 'text-amber-500'} />
            <div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block uppercase tracking-wider">Fee Status</span>
              <span className={`text-sm font-bold ${user.feeStatus === 'Paid' ? 'text-emerald-500' : 'text-amber-500'}`}>{user.feeStatus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of statistics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
            <TrendingUp size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Average Marks</span>
            <span className="text-2xl font-display font-extrabold text-slate-800 dark:text-white">{averageMarks}%</span>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
            <Award size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Cumulative GPA</span>
            <span className="text-2xl font-display font-extrabold text-slate-800 dark:text-white">{gpa} / 4.00</span>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
            <CheckCircle size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Performance Rank</span>
            <span className="text-2xl font-display font-extrabold text-slate-800 dark:text-white">{user.performance}</span>
          </div>
        </div>

        <div className="glass p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
            <BookOpen size={22} />
          </div>
          <div>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Total Subjects</span>
            <span className="text-2xl font-display font-extrabold text-slate-800 dark:text-white">{subjectKeys.length}</span>
          </div>
        </div>
      </div>

      {/* Main dashboard grid: subjects details & performance chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Subjects list */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <BookOpen size={20} className="text-indigo-500" />
              <span>Academic Performance Details</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjectKeys.map((subName) => {
              const details = user.subjects[subName];
              return (
                <div key={subName} className="glass p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col gap-3.5 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 dark:text-white">{subName}</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-extrabold tracking-wider ${
                      details.grade.includes('A') 
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' 
                        : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                    }`}>
                      Grade {details.grade}
                    </span>
                  </div>
                  
                  {/* Marks progress meter */}
                  <div>
                    <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span>Score</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{details.marks} / 100</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        style={{ width: `${details.marks}%` }}
                      />
                    </div>
                  </div>

                  {/* Teacher remarks */}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 italic">
                    "{details.remarks}"
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* performance metrics & chart */}
        <div className="flex flex-col gap-6">
          
          {/* Custom SVG Performance Chart */}
          <div className="glass p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col gap-4">
            <h3 className="text-lg font-display font-bold text-slate-800 dark:text-white">
              Subject Overview Chart
            </h3>

            <div className="w-full flex justify-center py-2 bg-slate-50 dark:bg-slate-950/30 rounded-2xl border border-slate-100 dark:border-slate-850">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
                {/* Chart Grid Lines */}
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
                  const marks = user.subjects[subName].marks;
                  const x = padding + i * (barWidth + gap);
                  const barHeight = (marks / 100) * graphHeight;
                  const y = padding + graphHeight - barHeight;

                  return (
                    <g key={subName} className="group">
                      {/* Bar Gradient (Simulated via SVG properties) */}
                      <rect
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        rx={4}
                        className="fill-indigo-500/80 hover:fill-indigo-600 dark:fill-indigo-500/70 dark:hover:fill-indigo-400 transition-colors"
                      />
                      
                      {/* Score tooltip text on top of the bar */}
                      <text
                        x={x + barWidth / 2}
                        y={y - 6}
                        textAnchor="middle"
                        fontSize={9}
                        fontWeight="bold"
                        className="fill-indigo-600 dark:fill-indigo-300"
                      >
                        {marks}%
                      </text>

                      {/* X axis labels (shortened / rotated or just initials if too long) */}
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

                {/* X Axis Line */}
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
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              {subjectKeys.map(subName => (
                <div key={subName} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-indigo-500" />
                  <span>{subName.substring(0, 3)}. = {subName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2-Month Attendance Details & Daily Log card */}
          <div className="glass p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-display font-bold text-slate-800 dark:text-white">
                2-Month Attendance
              </h3>
              
              {/* Month Selector Tabs */}
              <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setSelectedLogMonth('june')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    selectedLogMonth === 'june' 
                      ? 'bg-white dark:bg-slate-700 text-indigo-650 dark:text-indigo-400 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  June
                </button>
                <button
                  onClick={() => setSelectedLogMonth('july')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
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
                <span className="text-slate-400 dark:text-slate-500 font-medium">June 2026</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {user.attendanceDetail.june.present} / {user.attendanceDetail.june.workingDays} Days ({Math.round((user.attendanceDetail.june.present / user.attendanceDetail.june.workingDays) * 100)}%)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                <span className="text-slate-400 dark:text-slate-500 font-medium">July 2026</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {user.attendanceDetail.july.present} / {user.attendanceDetail.july.workingDays} Days ({Math.round((user.attendanceDetail.july.present / user.attendanceDetail.july.workingDays) * 100)}%)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850 text-indigo-600 dark:text-indigo-400 font-bold">
                <span>Total Attendance</span>
                <span>
                  {totalPresent} / {totalWorking} Days ({attendancePercentage})
                </span>
              </div>
            </div>

            {/* Daily Calendar/Grid attendance log */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-2.5">
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
                  user.attendanceDetail[selectedLogMonth].present, 
                  user.attendanceDetail[selectedLogMonth].workingDays
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

          {/* Parent details summary card for student */}
          <div className="glass p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col gap-4">
            <h3 className="text-lg font-display font-bold text-slate-800 dark:text-white">
              Parent Contact Details
            </h3>
            
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                <span className="text-slate-400 dark:text-slate-500 font-medium">Name</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{user.parent.name} ({user.parent.relationship})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                <span className="text-slate-400 dark:text-slate-500 font-medium">Email</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200 font-mono text-xs">{user.parent.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-850">
                <span className="text-slate-400 dark:text-slate-500 font-medium">Phone</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{user.parent.phone}</span>
              </div>
              <div className="flex flex-col gap-1 py-1">
                <span className="text-slate-400 dark:text-slate-500 font-medium">Address</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200 text-xs leading-relaxed">{user.parent.address}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
