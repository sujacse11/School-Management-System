import React, { useState } from "react";
import {
  BookOpen,
  Plus,
  Edit3,
  Trash2,
  Calendar,
  MapPin,
  Clock,
  Hash,
  GraduationCap,
} from "lucide-react";
import { Modal } from "../components/Modal";

export const Academic = ({
  classes,
  setClasses,
  subjects,
  setSubjects,
  timetable,
  setTimetable,
  exams,
  setExams,
}) => {
  const [activeSubTab, setActiveSubTab] = useState("classes");
  // Modals state
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);

  // Edit states
  const [editingClass, setEditingClass] = useState(null);
  const [editingSubject, setEditingSubject] = useState(null);
  const [editingTimetableSlot, setEditingTimetableSlot] = useState(null);
  const [editingExam, setEditingExam] = useState(null);

  // Filter for timetable
  const [timetableClassFilter, setTimetableClassFilter] = useState("Grade 5-A");

  // Form states - Classes
  const [classFormData, setClassFormData] = useState({
    grade: "Grade 5",
    section: "A",
    room: "101",
    teacher: "",
    schedule: "Mon - Fri 8:00-15:00",
    studentCount: 30,
  });

  // Form states - Subjects
  const [subjectFormData, setSubjectFormData] = useState({
    name: "",
    code: "",
    grade: "Grade 5",
    teacher: "",
    weeklyHours: 4,
    room: "101",
  });

  // Form states - Timetable
  const [timetableFormData, setTimetableFormData] = useState({
    gradeSection: "Grade 5-A",
    day: "Monday",
    period: 1,
    subject: "",
    teacher: "",
    room: "101",
  });

  // Form states - Exams
  const [examFormData, setExamFormData] = useState({
    title: "Midterm Exam",
    subject: "",
    grade: "Grade 5",
    date: "2026-06-15",
    time: "09:00 AM - 11:00 AM",
    totalMarks: 100,
    passingMarks: 35,
  });

  // -------------------------------------------------------------
  // Class CRUD Handlers
  // -------------------------------------------------------------
  const handleOpenAddClass = () => {
    setEditingClass(null);
    setClassFormData({
      grade: "Grade 5",
      section: "A",
      room: "101",
      teacher: "",
      schedule: "Mon - Fri 8:00-15:00",
      studentCount: 30,
    });
    setIsClassModalOpen(true);
  };

  const handleOpenEditClass = (cls) => {
    setEditingClass(cls);
    setClassFormData({
      grade: cls.grade,
      section: cls.section,
      room: cls.room,
      teacher: cls.teacher,
      schedule: cls.schedule,
      studentCount: cls.studentCount,
    });
    setIsClassModalOpen(true);
  };

  const handleClassSubmit = (e) => {
    e.preventDefault();
    if (editingClass) {
      setClasses((prev) =>
        prev.map((c) =>
          c.id === editingClass.id
            ? {
                ...c,
                grade: classFormData.grade,
                section: classFormData.section,
                room: classFormData.room,
                teacher: classFormData.teacher,
                schedule: classFormData.schedule,
                studentCount: Number(classFormData.studentCount),
              }
            : c,
        ),
      );
    } else {
      const newClass = {
        id: `CLS-${Math.floor(1000 + Math.random() * 9000)}`,
        grade: classFormData.grade,
        section: classFormData.section,
        room: classFormData.room,
        teacher: classFormData.teacher,
        schedule: classFormData.schedule,
        studentCount: Number(classFormData.studentCount),
      };
      setClasses((prev) => [...prev, newClass]);
    }
    setIsClassModalOpen(false);
  };

  const handleDeleteClass = (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setClasses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // -------------------------------------------------------------
  // Subject CRUD Handlers
  // -------------------------------------------------------------
  const handleOpenAddSubject = () => {
    setEditingSubject(null);
    setSubjectFormData({
      name: "",
      code: "",
      grade: "Grade 5",
      teacher: "",
      weeklyHours: 4,
      room: "101",
    });
    setIsSubjectModalOpen(true);
  };

  const handleOpenEditSubject = (sub) => {
    setEditingSubject(sub);
    setSubjectFormData({
      name: sub.name,
      code: sub.code,
      grade: sub.grade,
      teacher: sub.teacher,
      weeklyHours: sub.weeklyHours,
      room: sub.room,
    });
    setIsSubjectModalOpen(true);
  };

  const handleSubjectSubmit = (e) => {
    e.preventDefault();
    if (editingSubject) {
      setSubjects((prev) =>
        prev.map((s) =>
          s.id === editingSubject.id
            ? {
                ...s,
                name: subjectFormData.name,
                code: subjectFormData.code,
                grade: subjectFormData.grade,
                teacher: subjectFormData.teacher,
                weeklyHours: Number(subjectFormData.weeklyHours),
                room: subjectFormData.room,
              }
            : s,
        ),
      );
    } else {
      const newSubject = {
        id: `SUB-${Math.floor(100 + Math.random() * 900)}`,
        name: subjectFormData.name,
        code: subjectFormData.code,
        grade: subjectFormData.grade,
        teacher: subjectFormData.teacher,
        weeklyHours: Number(subjectFormData.weeklyHours),
        room: subjectFormData.room,
      };
      setSubjects((prev) => [...prev, newSubject]);
    }
    setIsSubjectModalOpen(false);
  };

  const handleDeleteSubject = (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      setSubjects((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // -------------------------------------------------------------
  // Timetable CRUD Handlers
  // -------------------------------------------------------------
  const handleOpenAddTimetable = (day, period) => {
    setEditingTimetableSlot(null);
    setTimetableFormData({
      gradeSection: timetableClassFilter,
      day: day || "Monday",
      period: period || 1,
      subject: subjects[0]?.name || "",
      teacher: subjects[0]?.teacher || "",
      room: "101",
    });
    setIsTimetableModalOpen(true);
  };

  const handleOpenEditTimetable = (slot) => {
    setEditingTimetableSlot(slot);
    setTimetableFormData({
      gradeSection: slot.gradeSection,
      day: slot.day,
      period: slot.period,
      subject: slot.subject,
      teacher: slot.teacher,
      room: slot.room,
    });
    setIsTimetableModalOpen(true);
  };

  const handleTimetableSubmit = (e) => {
    e.preventDefault();
    if (editingTimetableSlot) {
      setTimetable((prev) =>
        prev.map((t) =>
          t.id === editingTimetableSlot.id
            ? {
                ...t,
                gradeSection: timetableFormData.gradeSection,
                day: timetableFormData.day,
                period: Number(timetableFormData.period),
                subject: timetableFormData.subject,
                teacher: timetableFormData.teacher,
                room: timetableFormData.room,
              }
            : t,
        ),
      );
    } else {
      const newSlot = {
        id: `TT-${Math.floor(1000 + Math.random() * 9000)}`,
        gradeSection: timetableFormData.gradeSection,
        day: timetableFormData.day,
        period: Number(timetableFormData.period),
        subject: timetableFormData.subject,
        teacher: timetableFormData.teacher,
        room: timetableFormData.room,
      };
      setTimetable((prev) => [...prev, newSlot]);
    }
    setIsTimetableModalOpen(false);
  };

  const handleDeleteTimetableSlot = (id) => {
    if (
      window.confirm("Are you sure you want to remove this timetable slot?")
    ) {
      setTimetable((prev) => prev.filter((t) => t.id !== id));
    }
  };

  // -------------------------------------------------------------
  // Exam Schedule CRUD Handlers
  // -------------------------------------------------------------
  const handleOpenAddExam = () => {
    setEditingExam(null);
    setExamFormData({
      title: "Term 1 Midterm",
      subject: subjects[0]?.name || "",
      grade: "Grade 5",
      date: "2026-06-15",
      time: "09:00 AM - 11:00 AM",
      totalMarks: 100,
      passingMarks: 35,
    });
    setIsExamModalOpen(true);
  };

  const handleOpenEditExam = (ex) => {
    setEditingExam(ex);
    setExamFormData({
      title: ex.title,
      subject: ex.subject,
      grade: ex.grade,
      date: ex.date,
      time: ex.time,
      totalMarks: ex.totalMarks,
      passingMarks: ex.passingMarks,
    });
    setIsExamModalOpen(true);
  };

  const handleExamSubmit = (e) => {
    e.preventDefault();
    if (editingExam) {
      setExams((prev) =>
        prev.map((ex) =>
          ex.id === editingExam.id
            ? {
                ...ex,
                title: examFormData.title,
                subject: examFormData.subject,
                grade: examFormData.grade,
                date: examFormData.date,
                time: examFormData.time,
                totalMarks: Number(examFormData.totalMarks),
                passingMarks: Number(examFormData.passingMarks),
              }
            : ex,
        ),
      );
    } else {
      const newExam = {
        id: `EX-${Math.floor(1000 + Math.random() * 9000)}`,
        title: examFormData.title,
        subject: examFormData.subject,
        grade: examFormData.grade,
        date: examFormData.date,
        time: examFormData.time,
        totalMarks: Number(examFormData.totalMarks),
        passingMarks: Number(examFormData.passingMarks),
      };
      setExams((prev) => [...prev, newExam]);
    }
    setIsExamModalOpen(false);
  };

  const handleDeleteExam = (id) => {
    if (window.confirm("Are you sure you want to delete this exam schedule?")) {
      setExams((prev) => prev.filter((ex) => ex.id !== id));
    }
  };

  // Timetable periods mapping helper
  const periods = [
    { num: 1, time: "08:30 AM - 09:45 AM" },
    { num: 2, time: "10:00 AM - 11:15 AM" },
    { num: 3, time: "11:30 AM - 12:45 PM" },
    { num: 4, time: "01:30 PM - 02:45 PM" },
    { num: 5, time: "03:00 PM - 04:15 PM" },
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="academic-view">
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Academic Management</h1>
          <span className="page-subtitle">
            Manage school classes, subjects, timetables, and exam schedules
          </span>
        </div>
        <div className="page-actions">
          {activeSubTab === "classes" && (
            <button className="btn btn-primary" onClick={handleOpenAddClass}>
              <Plus size={16} />
              <span>Add Class</span>
            </button>
          )}
          {activeSubTab === "subjects" && (
            <button className="btn btn-primary" onClick={handleOpenAddSubject}>
              <Plus size={16} />
              <span>Add Subject</span>
            </button>
          )}
          {activeSubTab === "timetable" && (
            <button
              className="btn btn-primary"
              onClick={() => handleOpenAddTimetable()}
            >
              <Plus size={16} />
              <span>Assign Period</span>
            </button>
          )}
          {activeSubTab === "exams" && (
            <button className="btn btn-primary" onClick={handleOpenAddExam}>
              <Plus size={16} />
              <span>Schedule Exam</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-navigation">
        <button
          className={`tab-btn ${activeSubTab === "classes" ? "active" : ""}`}
          onClick={() => setActiveSubTab("classes")}
        >
          Classes & Sections
        </button>
        <button
          className={`tab-btn ${activeSubTab === "subjects" ? "active" : ""}`}
          onClick={() => setActiveSubTab("subjects")}
        >
          Subjects
        </button>
        <button
          className={`tab-btn ${activeSubTab === "timetable" ? "active" : ""}`}
          onClick={() => setActiveSubTab("timetable")}
        >
          Timetable
        </button>
        <button
          className={`tab-btn ${activeSubTab === "exams" ? "active" : ""}`}
          onClick={() => setActiveSubTab("exams")}
        >
          Exams & Results
        </button>
      </div>

      {/* ----------------- CLASSES PANEL ----------------- */}
      {activeSubTab === "classes" && (
        <div className="cards-grid">
          {classes.map((cls) => (
            <div key={cls.id} className="class-card">
              <div className="class-card-header">
                <div className="class-icon-badge">
                  <BookOpen size={20} />
                </div>
                <div className="class-card-actions">
                  <button
                    className="table-action-btn edit"
                    onClick={() => handleOpenEditClass(cls)}
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    className="table-action-btn delete"
                    onClick={() => handleDeleteClass(cls.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="class-title">
                {cls.grade} - Section {cls.section}
              </h3>
              <span className="class-room">Room {cls.room}</span>

              <div className="class-stats">
                <div className="class-stat-item">
                  <span className="class-stat-value">{cls.studentCount}</span>
                  <span className="class-stat-label">Students</span>
                </div>
                <div className="class-stat-item">
                  <span className="class-stat-value">{cls.grade}</span>
                  <span className="class-stat-label">Grade</span>
                </div>
              </div>

              <div className="class-details">
                <div className="class-detail-item">
                  <span className="class-detail-label">Class Teacher:</span>
                  <span>{cls.teacher || "Not Assigned"}</span>
                </div>
                <div className="class-detail-item">
                  <span className="class-detail-label">Schedule:</span>
                  <span>{cls.schedule}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ----------------- SUBJECTS PANEL ----------------- */}
      {activeSubTab === "subjects" && (
        <div className="cards-grid">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              className="class-card"
              style={{ borderLeft: "4px solid var(--primary)" }}
            >
              <div className="class-card-header">
                <div
                  className="class-icon-badge"
                  style={{
                    backgroundColor: "var(--primary-light)",
                    color: "var(--primary)",
                  }}
                >
                  <GraduationCap size={20} />
                </div>
                <div className="class-card-actions">
                  <button
                    className="table-action-btn edit"
                    onClick={() => handleOpenEditSubject(sub)}
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    className="table-action-btn delete"
                    onClick={() => handleDeleteSubject(sub.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="class-title">{sub.name}</h3>
              <span
                className="class-room"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Hash size={12} /> {sub.code}
              </span>

              <div className="class-stats" style={{ margin: "16px 0 12px 0" }}>
                <div className="class-stat-item">
                  <span
                    className="class-stat-value"
                    style={{ fontSize: "18px" }}
                  >
                    {sub.weeklyHours}h
                  </span>
                  <span className="class-stat-label">Weekly Hours</span>
                </div>
                <div className="class-stat-item">
                  <span
                    className="class-stat-value"
                    style={{ fontSize: "18px" }}
                  >
                    Room {sub.room}
                  </span>
                  <span className="class-stat-label">Classroom</span>
                </div>
              </div>

              <div className="class-details">
                <div className="class-detail-item">
                  <span className="class-detail-label">Teacher:</span>
                  <span style={{ fontWeight: 600 }}>
                    {sub.teacher || "Unassigned"}
                  </span>
                </div>
                <div className="class-detail-item">
                  <span className="class-detail-label">Target Grade:</span>
                  <span>{sub.grade}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ----------------- TIMETABLE PANEL ----------------- */}
      {activeSubTab === "timetable" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Class Selector Filter */}
          <div className="filter-bar">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                }}
              >
                Select Class:
              </span>
              <select
                className="filter-select"
                value={timetableClassFilter}
                onChange={(e) => setTimetableClassFilter(e.target.value)}
                style={{ minWidth: "180px" }}
              >
                {classes.map((c) => (
                  <option key={c.id} value={`${c.grade}-${c.section}`}>
                    {c.grade} - Section {c.section}
                  </option>
                ))}
                <option value="Grade 6-B">Grade 6 - Section B</option>
                <option value="Grade 7-A">Grade 7 - Section A</option>
              </select>
            </div>
          </div>

          {/* Timetable Grid */}
          <div className="table-card">
            <div className="table-wrapper">
              <table className="data-table" style={{ tableLayout: "fixed" }}>
                <thead>
                  <tr>
                    <th style={{ width: "150px" }}>Time / Period</th>
                    {days.map((d) => (
                      <th key={d}>{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {periods.map((period) => (
                    <tr key={period.num}>
                      <td style={{ verticalAlign: "middle" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 700,
                              color: "var(--text-primary)",
                            }}
                          >
                            Period {period.num}
                          </span>
                          <span
                            style={{
                              fontSize: "11px",
                              color: "var(--text-light)",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <Clock size={10} /> {period.time.split(" - ")[0]}
                          </span>
                        </div>
                      </td>
                      {days.map((day) => {
                        // Find slot
                        const slot = timetable.find(
                          (s) =>
                            s.gradeSection === timetableClassFilter &&
                            s.day === day &&
                            s.period === period.num,
                        );

                        if (slot) {
                          return (
                            <td key={day} style={{ padding: "10px" }}>
                              <div
                                style={{
                                  background: "var(--primary-light)",
                                  borderLeft: "3px solid var(--primary)",
                                  borderRadius: "8px",
                                  padding: "8px 12px",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "2px",
                                  position: "relative",
                                }}
                              >
                                <span
                                  style={{
                                    fontWeight: 700,
                                    fontSize: "13px",
                                    color: "var(--primary)",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {slot.subject}
                                </span>
                                <span
                                  style={{
                                    fontSize: "11px",
                                    color: "var(--text-secondary)",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {slot.teacher}
                                </span>
                                <span
                                  style={{
                                    fontSize: "10px",
                                    color: "var(--text-light)",
                                    marginTop: "2px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "2px",
                                  }}
                                >
                                  <MapPin size={10} /> Room {slot.room}
                                </span>
                                <div
                                  style={{
                                    position: "absolute",
                                    right: "6px",
                                    top: "6px",
                                    display: "flex",
                                    gap: "2px",
                                  }}
                                >
                                  <button
                                    onClick={() =>
                                      handleOpenEditTimetable(slot)
                                    }
                                    style={{
                                      background: "transparent",
                                      border: "none",
                                      cursor: "pointer",
                                      color: "var(--text-secondary)",
                                    }}
                                    title="Edit slot"
                                  >
                                    <Edit3 size={11} />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteTimetableSlot(slot.id)
                                    }
                                    style={{
                                      background: "transparent",
                                      border: "none",
                                      cursor: "pointer",
                                      color: "var(--error)",
                                    }}
                                    title="Delete slot"
                                  >
                                    <Trash2 size={11} />
                                  </button>
                                </div>
                              </div>
                            </td>
                          );
                        } else {
                          return (
                            <td
                              key={day}
                              style={{ padding: "10px", textAlign: "center" }}
                            >
                              <button
                                className="btn btn-secondary"
                                onClick={() =>
                                  handleOpenAddTimetable(day, period.num)
                                }
                                style={{
                                  padding: "6px 12px",
                                  fontSize: "11px",
                                  borderStyle: "dashed",
                                  background: "transparent",
                                  width: "100%",
                                  color: "var(--text-light)",
                                }}
                              >
                                <Plus size={12} /> Assign
                              </button>
                            </td>
                          );
                        }
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- EXAMS PANEL ----------------- */}
      {activeSubTab === "exams" && (
        <div className="table-card">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Exam Title</th>
                  <th>Subject</th>
                  <th>Grade</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Total Marks</th>
                  <th>Passing Marks</th>
                  <th style={{ width: "120px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((ex) => (
                  <tr key={ex.id}>
                    <td>
                      <span
                        className="table-user-name"
                        style={{ fontWeight: 600 }}
                      >
                        {ex.title}
                      </span>
                    </td>
                    <td>{ex.subject}</td>
                    <td>{ex.grade}</td>
                    <td>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Calendar size={14} color="var(--text-light)" />
                        <span>{ex.date}</span>
                      </div>
                    </td>
                    <td>{ex.time}</td>
                    <td>{ex.totalMarks}</td>
                    <td>
                      <span
                        style={{ color: "var(--success)", fontWeight: 600 }}
                      >
                        {ex.passingMarks}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions-container">
                        <button
                          className="table-action-btn edit"
                          onClick={() => handleOpenEditExam(ex)}
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          className="table-action-btn delete"
                          onClick={() => handleDeleteExam(ex.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
           MODALS SECTION
           ------------------------------------------------------------- */}

      {/* 1. Class Add/Edit Modal */}
      <Modal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        title={editingClass ? "Edit Class Details" : "Add New Class"}
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setIsClassModalOpen(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleClassSubmit}>
              {editingClass ? "Save Changes" : "Add Class"}
            </button>
          </>
        }
      >
        <form onSubmit={handleClassSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Grade</label>
              <select
                name="grade"
                className="form-select"
                value={classFormData.grade}
                onChange={(e) =>
                  setClassFormData((prev) => ({
                    ...prev,
                    grade: e.target.value,
                  }))
                }
              >
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Section</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. A"
                value={classFormData.section}
                onChange={(e) =>
                  setClassFormData((prev) => ({
                    ...prev,
                    section: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Room</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 101"
                value={classFormData.room}
                onChange={(e) =>
                  setClassFormData((prev) => ({
                    ...prev,
                    room: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Class Teacher</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Sarah Connor"
                value={classFormData.teacher}
                onChange={(e) =>
                  setClassFormData((prev) => ({
                    ...prev,
                    teacher: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Students Count</label>
              <input
                type="number"
                className="form-input"
                value={classFormData.studentCount}
                onChange={(e) =>
                  setClassFormData((prev) => ({
                    ...prev,
                    studentCount: Number(e.target.value),
                  }))
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Schedule</label>
              <input
                type="text"
                className="form-input"
                value={classFormData.schedule}
                onChange={(e) =>
                  setClassFormData((prev) => ({
                    ...prev,
                    schedule: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* 2. Subject Add/Edit Modal */}
      <Modal
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
        title={editingSubject ? "Edit Subject" : "Add New Subject"}
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setIsSubjectModalOpen(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubjectSubmit}>
              {editingSubject ? "Save Changes" : "Add Subject"}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubjectSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Subject Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. History"
                value={subjectFormData.name}
                onChange={(e) =>
                  setSubjectFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subject Code</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. HIST-101"
                value={subjectFormData.code}
                onChange={(e) =>
                  setSubjectFormData((prev) => ({
                    ...prev,
                    code: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target Grade</label>
              <select
                name="grade"
                className="form-select"
                value={subjectFormData.grade}
                onChange={(e) =>
                  setSubjectFormData((prev) => ({
                    ...prev,
                    grade: e.target.value,
                  }))
                }
              >
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Teacher</label>
              <input
                type="text"
                className="form-input"
                placeholder="Teacher name"
                value={subjectFormData.teacher}
                onChange={(e) =>
                  setSubjectFormData((prev) => ({
                    ...prev,
                    teacher: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Weekly Hours</label>
              <input
                type="number"
                className="form-input"
                value={subjectFormData.weeklyHours}
                onChange={(e) =>
                  setSubjectFormData((prev) => ({
                    ...prev,
                    weeklyHours: Number(e.target.value),
                  }))
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Classroom Room</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 101"
                value={subjectFormData.room}
                onChange={(e) =>
                  setSubjectFormData((prev) => ({
                    ...prev,
                    room: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* 3. Timetable Assign Modal */}
      <Modal
        isOpen={isTimetableModalOpen}
        onClose={() => setIsTimetableModalOpen(false)}
        title={
          editingTimetableSlot
            ? "Edit Timetable Period"
            : "Assign Timetable Period"
        }
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setIsTimetableModalOpen(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleTimetableSubmit}>
              {editingTimetableSlot ? "Save Changes" : "Assign"}
            </button>
          </>
        }
      >
        <form onSubmit={handleTimetableSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Class/Section</label>
              <input
                type="text"
                className="form-input"
                value={timetableFormData.gradeSection}
                disabled
              />
            </div>

            <div className="form-group">
              <label className="form-label">Day</label>
              <select
                className="form-select"
                value={timetableFormData.day}
                onChange={(e) =>
                  setTimetableFormData((prev) => ({
                    ...prev,
                    day: e.target.value,
                  }))
                }
              >
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Period</label>
              <select
                className="form-select"
                value={timetableFormData.period}
                onChange={(e) =>
                  setTimetableFormData((prev) => ({
                    ...prev,
                    period: Number(e.target.value),
                  }))
                }
              >
                {periods.map((p) => (
                  <option key={p.num} value={p.num}>
                    Period {p.num} ({p.time})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <select
                className="form-select"
                value={timetableFormData.subject}
                onChange={(e) => {
                  const sub = subjects.find((s) => s.name === e.target.value);
                  setTimetableFormData((prev) => ({
                    ...prev,
                    subject: e.target.value,
                    teacher: sub ? sub.teacher : prev.teacher,
                    room: sub ? sub.room : prev.room,
                  }));
                }}
              >
                <option value="">-- Select Subject --</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Teacher</label>
              <input
                type="text"
                className="form-input"
                placeholder="Teacher name"
                value={timetableFormData.teacher}
                onChange={(e) =>
                  setTimetableFormData((prev) => ({
                    ...prev,
                    teacher: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Classroom Room</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 101"
                value={timetableFormData.room}
                onChange={(e) =>
                  setTimetableFormData((prev) => ({
                    ...prev,
                    room: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* 4. Exam Add/Edit Modal */}
      <Modal
        isOpen={isExamModalOpen}
        onClose={() => setIsExamModalOpen(false)}
        title={editingExam ? "Edit Exam Schedule" : "Schedule New Exam"}
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setIsExamModalOpen(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleExamSubmit}>
              {editingExam ? "Save Changes" : "Schedule Exam"}
            </button>
          </>
        }
      >
        <form onSubmit={handleExamSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Exam Title</label>
              <input
                type="text"
                className="form-input"
                value={examFormData.title}
                onChange={(e) =>
                  setExamFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subject</label>
              <select
                className="form-select"
                value={examFormData.subject}
                onChange={(e) =>
                  setExamFormData((prev) => ({
                    ...prev,
                    subject: e.target.value,
                  }))
                }
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Grade</label>
              <select
                className="form-select"
                value={examFormData.grade}
                onChange={(e) =>
                  setExamFormData((prev) => ({
                    ...prev,
                    grade: e.target.value,
                  }))
                }
              >
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
                <option value="Grade 7">Grade 7</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={examFormData.date}
                onChange={(e) =>
                  setExamFormData((prev) => ({ ...prev, date: e.target.value }))
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. 09:00 AM - 11:00 AM"
                value={examFormData.time}
                onChange={(e) =>
                  setExamFormData((prev) => ({ ...prev, time: e.target.value }))
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Total Marks</label>
              <input
                type="number"
                className="form-input"
                value={examFormData.totalMarks}
                onChange={(e) =>
                  setExamFormData((prev) => ({
                    ...prev,
                    totalMarks: Number(e.target.value),
                  }))
                }
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Passing Marks</label>
              <input
                type="number"
                className="form-input"
                value={examFormData.passingMarks}
                onChange={(e) =>
                  setExamFormData((prev) => ({
                    ...prev,
                    passingMarks: Number(e.target.value),
                  }))
                }
                required
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
