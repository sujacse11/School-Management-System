import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, User, Edit, Save, CheckCircle, ShieldAlert, Award, FileSpreadsheet, RefreshCw } from 'lucide-react';

const TeacherDashboard = () => {
  const { students, updateStudentDetails } = useApp();
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [editForm, setEditForm] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const activeStudent = students.find(s => s.id === selectedStudentId);

  // Initialize edit form when student is selected
  React.useEffect(() => {
    if (activeStudent) {
      setEditForm({
        attendanceDetail: {
          june: { ...activeStudent.attendanceDetail.june },
          july: { ...activeStudent.attendanceDetail.july }
        },
        feeStatus: activeStudent.feeStatus,
        performance: activeStudent.performance,
        subjects: {
          "Mathematics": { ...activeStudent.subjects["Mathematics"] },
          "Science": { ...activeStudent.subjects["Science"] },
          "Social Studies": { ...activeStudent.subjects["Social Studies"] },
          "English": { ...activeStudent.subjects["English"] },
          "Hindi": { ...activeStudent.subjects["Hindi"] },
          "Computer Science": { ...activeStudent.subjects["Computer Science"] }
        }
      });
      setSuccessMessage('');
      setErrorMessage('');
    }
  }, [selectedStudentId, activeStudent]);

  if (!activeStudent || !editForm) return null;

  const handleSubjectChange = (subject, field, value) => {
    setEditForm(prev => {
      const currentSub = prev.subjects[subject];
      let updatedVal = value;
      
      if (field === 'marks') {
        updatedVal = parseInt(value, 10);
        if (isNaN(updatedVal)) updatedVal = 0;
        if (updatedVal < 0) updatedVal = 0;
        if (updatedVal > 100) updatedVal = 100;
      }

      // Automatically determine grade based on marks
      let grade = 'F';
      if (field === 'marks') {
        const m = updatedVal;
        if (m >= 95) grade = 'A+';
        else if (m >= 90) grade = 'A';
        else if (m >= 85) grade = 'B+';
        else if (m >= 80) grade = 'B';
        else if (m >= 75) grade = 'C+';
        else if (m >= 70) grade = 'C';
        else if (m >= 60) grade = 'D';
        else grade = 'F';
      } else {
        grade = currentSub.grade;
      }

      return {
        ...prev,
        subjects: {
          ...prev.subjects,
          [subject]: {
            ...currentSub,
            [field]: updatedVal,
            ...(field === 'marks' ? { grade } : {})
          }
        }
      };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    // Validations
    const junePresent = parseInt(editForm.attendanceDetail.june.present, 10);
    const julyPresent = parseInt(editForm.attendanceDetail.july.present, 10);
    
    if (isNaN(junePresent) || junePresent < 0 || junePresent > editForm.attendanceDetail.june.workingDays) {
      setErrorMessage(`June present days must be between 0 and ${editForm.attendanceDetail.june.workingDays}`);
      return;
    }
    
    if (isNaN(julyPresent) || julyPresent < 0 || julyPresent > editForm.attendanceDetail.july.workingDays) {
      setErrorMessage(`July present days must be between 0 and ${editForm.attendanceDetail.july.workingDays}`);
      return;
    }

    const updatedData = {
      attendanceDetail: {
        june: { ...editForm.attendanceDetail.june, present: junePresent },
        july: { ...editForm.attendanceDetail.july, present: julyPresent }
      },
      feeStatus: editForm.feeStatus,
      performance: editForm.performance,
      subjects: editForm.subjects
    };

    updateStudentDetails(selectedStudentId, updatedData);
    setSuccessMessage('Student records updated successfully in local database!');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const resetAllData = () => {
    if (window.confirm("Are you sure you want to reset all students data back to defaults? This will erase all edits.")) {
      localStorage.removeItem('school_students');
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col gap-8 fade-in">
      
      {/* Header Info */}
      <div className="glass p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold border border-amber-500/25">
            <Users size={28} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-extrabold text-slate-800 dark:text-white">
              Teacher Control Panel
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
              Class Advisor: <span className="font-semibold text-indigo-650 dark:text-indigo-400">Sarah Connor</span> | Class: <span className="font-semibold text-slate-700 dark:text-slate-200">Grade 5 - A (Room 105)</span>
            </p>
          </div>
        </div>

        <button 
          onClick={resetAllData}
          className="btn-secondary py-2.5 px-4 rounded-xl text-xs font-semibold hover:border-rose-500 hover:text-rose-500 hover:bg-rose-500/5 self-start md:self-center"
        >
          <RefreshCw size={14} />
          Reset Student Data
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Students list selector */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <FileSpreadsheet size={18} className="text-indigo-500" />
            <span>Select Student to Edit</span>
          </h3>

          <div className="flex flex-col gap-2.5 max-h-[550px] overflow-y-auto pr-1">
            {students.map((student) => (
              <div
                key={student.id}
                onClick={() => setSelectedStudentId(student.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedStudentId === student.id
                    ? 'bg-indigo-600 border-indigo-650 text-white shadow-lg shadow-indigo-600/15'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-400 text-slate-800 dark:text-slate-200 hover:-translate-x-0.5'
                }`}
              >
                <div>
                  <h4 className="font-semibold text-sm leading-tight">{student.name}</h4>
                  <span className={`text-[10px] ${selectedStudentId === student.id ? 'text-indigo-200' : 'text-slate-400 dark:text-slate-500'} font-semibold`}>
                    ID: {student.id} | Roll No: {student.rollNumber}
                  </span>
                </div>
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  selectedStudentId === student.id 
                    ? 'bg-indigo-700 text-white' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  Section {student.section}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor Form panel */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h3 className="text-base font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Edit size={18} className="text-indigo-500" />
            <span>Modify Record: {activeStudent.name}</span>
          </h3>

          <div className="glass p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80">
            {successMessage && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2.5">
                <CheckCircle size={16} />
                <span>{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-950 text-rose-500 text-xs font-semibold flex items-center gap-2.5">
                <ShieldAlert size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
              
              {/* Profile details editor */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">June Present Days (of 22)</label>
                  <input
                    type="number"
                    value={editForm.attendanceDetail.june.present}
                    onChange={(e) => setEditForm(prev => ({
                      ...prev,
                      attendanceDetail: {
                        ...prev.attendanceDetail,
                        june: { ...prev.attendanceDetail.june, present: e.target.value }
                      }
                    }))}
                    className="input-field"
                    min="0"
                    max="22"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">July Present Days (of 22)</label>
                  <input
                    type="number"
                    value={editForm.attendanceDetail.july.present}
                    onChange={(e) => setEditForm(prev => ({
                      ...prev,
                      attendanceDetail: {
                        ...prev.attendanceDetail,
                        july: { ...prev.attendanceDetail.july, present: e.target.value }
                      }
                    }))}
                    className="input-field"
                    min="0"
                    max="22"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Fee Status</label>
                  <select
                    value={editForm.feeStatus}
                    onChange={(e) => setEditForm(prev => ({ ...prev, feeStatus: e.target.value }))}
                    className="input-field"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Academic Standing</label>
                  <select
                    value={editForm.performance}
                    onChange={(e) => setEditForm(prev => ({ ...prev, performance: e.target.value }))}
                    className="input-field"
                  >
                    <option value="Outstanding">Outstanding</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Needs Improvement">Needs Improvement</option>
                  </select>
                </div>
              </div>

              {/* Subject Marks Editors */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm mb-4">Subject Marks & Remarks (10th Std)</h4>
                
                <div className="flex flex-col gap-4">
                  {Object.keys(editForm.subjects).map((subName) => {
                    const subDetails = editForm.subjects[subName];
                    return (
                      <div key={subName} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-3 border-b border-slate-100 dark:border-slate-850/40">
                        <div className="md:col-span-3">
                          <span className="font-bold text-slate-700 dark:text-slate-300 text-xs block">{subName}</span>
                          <span className="text-[10px] text-slate-400 font-semibold uppercase">Grade: {subDetails.grade}</span>
                        </div>

                        <div className="md:col-span-2 flex flex-col gap-1">
                          <input
                            type="number"
                            value={subDetails.marks}
                            onChange={(e) => handleSubjectChange(subName, 'marks', e.target.value)}
                            className="input-field text-center font-semibold"
                            min="0"
                            max="100"
                          />
                        </div>

                        <div className="md:col-span-7 flex flex-col gap-1">
                          <input
                            type="text"
                            value={subDetails.remarks}
                            onChange={(e) => handleSubjectChange(subName, 'remarks', e.target.value)}
                            className="input-field text-xs"
                            placeholder="Teacher feedback remarks..."
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="submit"
                  className="btn-primary py-3 px-6 rounded-xl text-sm font-semibold"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeacherDashboard;
