import React, { useState, useEffect } from "react";
import {
  User,
  Calendar,
  Mail,
  BookOpen,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Send,
  MessageSquare,
  Award,
  DollarSign
} from "lucide-react";

export const ParentDashboard = ({ parent, students, currentTab, setCurrentTab }) => {
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "attendance" | "contact"
  const [selectedMonth, setSelectedMonth] = useState("June"); // "June" | "July"
  const [message, setMessage] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Sync tab with sidebar/app state
  useEffect(() => {
    if (currentTab === "dashboard" || currentTab === "overview") {
      setActiveTab("overview");
    } else if (currentTab === "attendance") {
      setActiveTab("attendance");
    } else if (currentTab === "contact") {
      setActiveTab("contact");
    }
  }, [currentTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (setCurrentTab) {
      if (tab === "overview") {
        setCurrentTab("dashboard");
      } else {
        setCurrentTab(tab);
      }
    }
  };

  // Find parent's child
  const child = students.find((s) => s.id === parent.studentId) || {
    id: "STU-24001",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    phone: "8493208401",
    dob: "2015-05-14",
    grade: "Grade 5",
    section: "A",
    status: "Active",
    joinedDate: "Oct 24, 2023",
    parentName: "Michael Johnson",
    parentPhone: "8503432890",
    avatar: "https://images.unsplash.com/photo-1542186938-df9626455120?w=150",
    subjects: {
      math: { score: 92, grade: "A+", attendance: 95 },
      science: { score: 88, grade: "A", attendance: 98 },
      english: { score: 85, grade: "A-", attendance: 92 }
    },
    gpa: "3.8",
    attendanceRate: "95%",
    pendingAssignments: 2,
    feeStatus: "Paid",
    room: "105",
    advisor: "Sarah Connor"
  };

  // Contact Teacher message history state loaded from localStorage
  const [msgHistory, setMsgHistory] = useState(() => {
    const val = localStorage.getItem(`edu_msg_history_${parent.id}`);
    return val ? JSON.parse(val) : [];
  });

  useEffect(() => {
    localStorage.setItem(`edu_msg_history_${parent.id}`, JSON.stringify(msgHistory));
  }, [msgHistory, parent.id]);

  // Generate deterministic weekday attendance log for June & July 2026
  const attendanceLog = (() => {
    const months = { June: 30, July: 31 };
    const log = { June: [], July: [] };
    const seed = parseInt(child.id.replace("STU-", "")) || 1;

    for (const [month, daysCount] of Object.entries(months)) {
      const monthNum = month === "June" ? 5 : 6; // June = 5, July = 6
      for (let d = 1; d <= daysCount; d++) {
        const dateObj = new Date(2026, monthNum, d);
        const dayOfWeek = dateObj.getDay();

        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Weekdays only
          const hash = (seed * 17 + d * 23) % 100;
          let status = "Present";
          let remark = "";

          if (hash < 6) {
            status = "Absent";
            remark = hash < 3 ? "Sick leave (Mild fever)" : "Family function";
          } else if (hash < 15) {
            status = "Late";
            remark = "School bus delayed due to traffic";
          }

          log[month].push({
            dayNum: d,
            dateString: dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            weekday: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
            status,
            remark
          });
        }
      }
    }
    return log;
  })();

  const currentMonthLog = attendanceLog[selectedMonth];
  const totalDays = currentMonthLog.length;
  const presentDays = currentMonthLog.filter((day) => day.status === "Present").length;
  const lateDays = currentMonthLog.filter((day) => day.status === "Late").length;
  const absentDays = currentMonthLog.filter((day) => day.status === "Absent").length;
  const monthlyAttendanceRate = Math.round(((presentDays + lateDays * 0.5) / totalDays) * 100);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg = {
      id: `MSG-${Date.now()}`,
      senderName: parent.name,
      studentName: child.name,
      email: parent.email,
      message: message.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "Sent"
    };

    setMsgHistory((prev) => [newMsg, ...prev]);
    setMessage("");
    triggerToast("Message sent to advisor successfully!");
  };

  const triggerToast = (text) => {
    setToastMessage(text);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  // Convert child subjects object into list
  const subjectsList = child.subjects
    ? Object.entries(child.subjects).map(([key, data]) => ({
        id: key,
        name: key === "math" ? "Mathematics" : key === "science" ? "Science" : "English Literature",
        score: data.score,
        grade: data.grade,
        attendance: data.attendance,
        teacher: key === "math" ? "Sarah Connor" : key === "science" ? "Lisa Park" : "Elena Rostova"
      }))
    : [
        { name: "Mathematics", score: 92, grade: "A+", attendance: 95, teacher: "Sarah Connor" },
        { name: "Science", score: 88, grade: "A", attendance: 98, teacher: "Lisa Park" },
        { name: "English Literature", score: 85, grade: "A-", attendance: 92, teacher: "Elena Rostova" }
      ];

  const filteredSubjects =
    subjectFilter === "All" ? subjectsList : subjectsList.filter((s) => s.name === subjectFilter);

  // SVG dimensions for subject grades bar chart
  const svgWidth = 500;
  const svgHeight = 250;
  const paddingX = 50;
  const paddingY = 40;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  return (
    <div className="parent-dashboard-view" style={{ animation: "fadeIn 0.4s ease" }}>
      {showToast && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            backgroundColor: "var(--success)",
            color: "white",
            padding: "16px 24px",
            borderRadius: "8px",
            boxShadow: "var(--shadow-lg)",
            zIndex: 1000,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            animation: "slideIn 0.3s ease-out"
          }}
        >
          <CheckCircle size={20} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Page Title Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Parent Portal</h1>
          <span className="page-subtitle">
            Welcome back, {parent.name}. Viewing details for student <strong>{child.name}</strong>
          </span>
        </div>
      </div>

      {/* Navigation tabs for Parent Dashboard */}
      <div className="tabs-navigation" style={{ marginBottom: "24px" }}>
        <button
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => handleTabChange("overview")}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === "attendance" ? "active" : ""}`}
          onClick={() => handleTabChange("attendance")}
        >
          Attendance Calendar
        </button>
        <button
          className={`tab-btn ${activeTab === "contact" ? "active" : ""}`}
          onClick={() => handleTabChange("contact")}
        >
          Contact Advisor
        </button>
      </div>

      {/* ================= 1. OVERVIEW TAB ================= */}
      {activeTab === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Quick Overview & Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card blue-border" style={{ display: "flex", gap: "16px", padding: "20px" }}>
              <div className="stat-icon-wrapper blue" style={{ width: "48px", height: "48px" }}>
                <Award size={24} />
              </div>
              <div>
                <span className="stat-value">{child.gpa || "3.8"}</span>
                <span className="stat-label">Cumulative GPA</span>
              </div>
            </div>

            <div className="stat-card green-border" style={{ display: "flex", gap: "16px", padding: "20px" }}>
              <div className="stat-icon-wrapper green" style={{ width: "48px", height: "48px" }}>
                <Calendar size={24} />
              </div>
              <div>
                <span className="stat-value">{child.attendanceRate || "95%"}</span>
                <span className="stat-label">Attendance Rate</span>
              </div>
            </div>

            <div className="stat-card yellow-border" style={{ display: "flex", gap: "16px", padding: "20px" }}>
              <div className="stat-icon-wrapper yellow" style={{ width: "48px", height: "48px" }}>
                <BookOpen size={24} />
              </div>
              <div>
                <span className="stat-value">{child.pendingAssignments || "0"}</span>
                <span className="stat-label">Pending Homework</span>
              </div>
            </div>

            <div className="stat-card purple-border" style={{ display: "flex", gap: "16px", padding: "20px" }}>
              <div className="stat-icon-wrapper purple" style={{ width: "48px", height: "48px" }}>
                <DollarSign size={24} />
              </div>
              <div>
                <span className={`stat-value ${child.feeStatus === "Paid" ? "status-present" : "status-absent"}`} style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {child.feeStatus || "Paid"}
                </span>
                <span className="stat-label">Term Fee Status</span>
              </div>
            </div>
          </div>

          {/* Child Information Card & Subject Scores Layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 2fr", gap: "24px" }}>
            
            {/* Left: Child Details Card */}
            <div className="settings-card" style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <h3 className="chart-title" style={{ fontSize: "16px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <User size={18} color="var(--primary)" />
                <span>Student Profile Card</span>
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", paddingBottom: "20px", borderBottom: "1px solid var(--border-color)" }}>
                <img
                  src={child.avatar}
                  alt={child.name}
                  style={{ width: "96px", height: "96px", borderRadius: "50%", objectFit: "cover", border: "3px solid var(--primary-light)" }}
                />
                <h2 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>{child.name}</h2>
                <span className="badge" style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)", fontWeight: 600, padding: "4px 12px", borderRadius: "12px" }}>
                  ID: {child.id}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px", fontSize: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Grade:</span>
                  <span style={{ fontWeight: 600 }}>{child.grade} - {child.section}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Classroom:</span>
                  <span style={{ fontWeight: 600 }}>Room {child.room || "105"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Advisor:</span>
                  <span style={{ fontWeight: 600, color: "var(--primary)" }}>{child.advisor || "Sarah Connor"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>DOB:</span>
                  <span style={{ fontWeight: 600 }}>{child.dob}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Joined Date:</span>
                  <span style={{ fontWeight: 600 }}>{child.joinedDate}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Status:</span>
                  <span className={`badge ${child.status === "Active" ? "status-present" : "status-absent"}`} style={{ padding: "2px 8px" }}>
                    {child.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Academic Performance and Bar Chart */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className="settings-card" style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                <h3 className="chart-title" style={{ fontSize: "16px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <TrendingUp size={18} color="var(--primary)" />
                  <span>Subject Performance Ratings</span>
                </h3>
                
                {/* SVG Bar Chart rendering scores */}
                <div style={{ background: "#fafbfc", padding: "16px", borderRadius: "8px", border: "1px solid var(--border-color)", display: "flex", justifyContent: "center" }}>
                  <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: "100%", maxHeight: "200px" }}>
                    {/* Background Grid Lines */}
                    {[0, 25, 50, 75, 100].map((level, idx) => {
                      const yPos = paddingY + chartH - (level / 100) * chartH;
                      return (
                        <g key={idx}>
                          <line
                            x1={paddingX}
                            y1={yPos}
                            x2={svgWidth - paddingX}
                            y2={yPos}
                            stroke="#e4e7ec"
                            strokeDasharray="4 4"
                          />
                          <text
                            x={paddingX - 10}
                            y={yPos + 4}
                            textAnchor="end"
                            fill="var(--text-secondary)"
                            style={{ fontSize: "11px", fontFamily: "var(--font-body)" }}
                          >
                            {level}%
                          </text>
                        </g>
                      );
                    })}

                    {/* Chart columns rendering */}
                    {subjectsList.map((subject, index) => {
                      const colWidth = 50;
                      const distance = chartW / subjectsList.length;
                      const xPos = paddingX + index * distance + (distance - colWidth) / 2;
                      const colHeight = (subject.score / 100) * chartH;
                      const yPos = paddingY + chartH - colHeight;
                      const gradId = `col-grad-${index}`;

                      return (
                        <g key={index}>
                          <defs>
                            <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="var(--primary)" />
                              <stop offset="100%" stopColor="rgba(59, 79, 254, 0.3)" />
                            </linearGradient>
                          </defs>
                          <rect
                            x={xPos}
                            y={yPos}
                            width={colWidth}
                            height={colHeight}
                            rx={6}
                            fill={`url(#${gradId})`}
                            style={{ transition: "all 0.3s ease" }}
                          />
                          <text
                            x={xPos + colWidth / 2}
                            y={yPos - 8}
                            textAnchor="middle"
                            fill="var(--text-primary)"
                            style={{ fontSize: "12px", fontWeight: "bold", fontFamily: "var(--font-heading)" }}
                          >
                            {subject.score}%
                          </text>
                          <text
                            x={xPos + colWidth / 2}
                            y={paddingY + chartH + 18}
                            textAnchor="middle"
                            fill="var(--text-secondary)"
                            style={{ fontSize: "11px", fontWeight: 500, fontFamily: "var(--font-body)" }}
                          >
                            {subject.name.split(" ")[0]}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Subject details table card */}
              <div className="settings-card" style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>Academic Marks Log</h4>
                  <select
                    className="form-input"
                    style={{ width: "160px", padding: "4px 8px", fontSize: "13px" }}
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                  >
                    <option value="All">All Subjects</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="English Literature">English Lit</option>
                  </select>
                </div>

                <table className="user-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "10px 12px", fontSize: "12px", textTransform: "uppercase", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>Subject</th>
                      <th style={{ textAlign: "center", padding: "10px 12px", fontSize: "12px", textTransform: "uppercase", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>Score</th>
                      <th style={{ textAlign: "center", padding: "10px 12px", fontSize: "12px", textTransform: "uppercase", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>Grade</th>
                      <th style={{ textAlign: "center", padding: "10px 12px", fontSize: "12px", textTransform: "uppercase", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>Subject Att.</th>
                      <th style={{ textAlign: "left", padding: "10px 12px", fontSize: "12px", textTransform: "uppercase", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-color)" }}>Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubjects.map((subject, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #f4f5f7" }}>
                        <td style={{ padding: "12px", fontSize: "14px", fontWeight: 600 }}>{subject.name}</td>
                        <td style={{ padding: "12px", fontSize: "14px", fontWeight: 700, color: "var(--primary)", textAlign: "center" }}>{subject.score}%</td>
                        <td style={{ padding: "12px", textAlign: "center" }}>
                          <span className="badge" style={{ backgroundColor: "var(--primary-light)", color: "var(--primary)", padding: "2px 8px", fontSize: "12px", fontWeight: "bold" }}>
                            {subject.grade}
                          </span>
                        </td>
                        <td style={{ padding: "12px", textAlign: "center", fontSize: "14px", fontWeight: 500 }}>{subject.attendance}%</td>
                        <td style={{ padding: "12px", fontSize: "13px", color: "var(--text-secondary)" }}>{subject.teacher}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. ATTENDANCE TAB ================= */}
      {activeTab === "attendance" && (
        <div className="settings-card" style={{ background: "#fff", padding: "28px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                <Calendar size={20} color="var(--primary)" />
                <span>Daily Weekday Calendar Logs</span>
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                Color-coded calendar grid showing weekday classroom log history
              </p>
            </div>
            
            {/* Month Toggles */}
            <div style={{ display: "flex", gap: "8px", background: "var(--bg-main)", padding: "4px", borderRadius: "8px" }}>
              <button
                className={`btn ${selectedMonth === "June" ? "btn-primary" : ""}`}
                style={{ padding: "6px 16px", fontSize: "13px", height: "auto", minWidth: "100px", border: "none", boxShadow: selectedMonth === "June" ? "" : "none", background: selectedMonth === "June" ? "" : "transparent", color: selectedMonth === "June" ? "" : "var(--text-secondary)" }}
                onClick={() => setSelectedMonth("June")}
              >
                June 2026
              </button>
              <button
                className={`btn ${selectedMonth === "July" ? "btn-primary" : ""}`}
                style={{ padding: "6px 16px", fontSize: "13px", height: "auto", minWidth: "100px", border: "none", boxShadow: selectedMonth === "July" ? "" : "none", background: selectedMonth === "July" ? "" : "transparent", color: selectedMonth === "July" ? "" : "var(--text-secondary)" }}
                onClick={() => setSelectedMonth("July")}
              >
                July 2026
              </button>
            </div>
          </div>

          {/* Monthly Attendance Stats Row */}
          <div className="stats-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px", background: "#f8f9fc", padding: "16px", borderRadius: "12px", border: "1px solid #eaecf0" }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "block", fontSize: "20px", fontWeight: 800, color: "var(--text-primary)" }}>{monthlyAttendanceRate}%</span>
              <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Month Attendance Rate</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "block", fontSize: "20px", fontWeight: 800, color: "var(--success)" }}>{presentDays}</span>
              <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Days Present</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "block", fontSize: "20px", fontWeight: 800, color: "var(--warning)" }}>{lateDays}</span>
              <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Days Late</span>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ display: "block", fontSize: "20px", fontWeight: 800, color: "var(--error)" }}>{absentDays}</span>
              <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Days Absent</span>
            </div>
          </div>

          {/* Grid Layout of Dates */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "12px" }}>
            {currentMonthLog.map((day, idx) => {
              let statusClass = "";
              let statusIcon = null;
              let tooltipText = day.remark || `${day.status} on ${day.dateString}`;

              if (day.status === "Present") {
                statusClass = "status-present";
                statusIcon = <CheckCircle size={14} style={{ color: "var(--success)" }} />;
              } else if (day.status === "Absent") {
                statusClass = "status-absent";
                statusIcon = <AlertCircle size={14} style={{ color: "var(--error)" }} />;
              } else {
                statusClass = "status-late";
                statusIcon = <Clock size={14} style={{ color: "var(--warning)" }} />;
              }

              return (
                <div
                  key={idx}
                  title={tooltipText}
                  style={{
                    border: "1px solid var(--border-color)",
                    borderRadius: "8px",
                    padding: "12px",
                    textAlign: "center",
                    position: "relative",
                    background: "#ffffff",
                    transition: "var(--transition)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--primary)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-color)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500 }}>
                    {day.weekday}, {selectedMonth.substring(0, 3)} {day.dayNum}
                  </span>
                  
                  <span
                    className={`badge ${statusClass}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "4px 8px",
                      borderRadius: "6px"
                    }}
                  >
                    {statusIcon}
                    <span>{day.status}</span>
                  </span>

                  {day.remark && (
                    <span style={{ fontSize: "10px", color: "var(--text-secondary)", fontStyle: "italic", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%", marginTop: "2px" }}>
                      {day.remark}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: "24px", marginTop: "32px", borderTop: "1px solid var(--border-color)", paddingTop: "16px", fontSize: "12px", color: "var(--text-secondary)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--success)", display: "inline-block" }} />
              <strong>Present:</strong> Full day attendance log.
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--warning)", display: "inline-block" }} />
              <strong>Late:</strong> Arrived late, marked with remark log.
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--error)", display: "inline-block" }} />
              <strong>Absent:</strong> Excused/Unexcused leave logs.
            </span>
          </div>
        </div>
      )}

      {/* ================= 3. CONTACT TAB ================= */}
      {activeTab === "contact" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "24px" }}>
          
          {/* Left: Contact Form Card */}
          <div className="settings-card" style={{ background: "#fff", padding: "28px", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Mail size={20} color="var(--primary)" />
              <span>Contact Advisor Sarah Connor</span>
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "24px" }}>
              Send an email request or update message directly to your child's advisor.
            </p>

            <form onSubmit={handleSendMessage}>
              <div className="form-grid" style={{ marginBottom: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Parent Name</label>
                  <input
                    type="text"
                    className="form-input"
                    style={{ backgroundColor: "#f8f9fa", color: "var(--text-secondary)", cursor: "not-allowed" }}
                    value={parent.name}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Student Name</label>
                  <input
                    type="text"
                    className="form-input"
                    style={{ backgroundColor: "#f8f9fa", color: "var(--text-secondary)", cursor: "not-allowed" }}
                    value={child.name}
                    disabled
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label className="form-label">Parent Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  style={{ backgroundColor: "#f8f9fa", color: "var(--text-secondary)", cursor: "not-allowed" }}
                  value={parent.email}
                  disabled
                />
              </div>

              <div className="form-group" style={{ marginBottom: "24px" }}>
                <label className="form-label">Message Content</label>
                <textarea
                  className="form-input"
                  style={{ minHeight: "130px", padding: "12px", lineHeight: "1.5", resize: "vertical" }}
                  placeholder="Type your message to the teacher here... e.g. request tutoring, report illness, etc."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ display: "flex", alignItems: "center", gap: "8px", width: "auto", padding: "10px 24px" }}
              >
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Right: Message History Card */}
          <div className="settings-card" style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid var(--border-color)", display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <MessageSquare size={18} color="var(--primary)" />
              <span>Contact History Log</span>
            </h3>

            <div
              style={{
                flexGrow: 1,
                overflowY: "auto",
                maxHeight: "380px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                paddingRight: "4px"
              }}
            >
              {msgHistory.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-light)" }}>
                  <Mail size={32} style={{ marginBottom: "8px", opacity: 0.5 }} />
                  <p style={{ fontSize: "13px", margin: 0 }}>No contact history recorded locally</p>
                </div>
              ) : (
                msgHistory.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      border: "1px solid var(--border-color)",
                      borderRadius: "8px",
                      padding: "12px",
                      background: "#fafbfc",
                      fontSize: "13px",
                      position: "relative"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span className="badge status-present" style={{ fontSize: "10px", padding: "2px 6px", fontWeight: "bold" }}>
                        {item.status}
                      </span>
                      <span style={{ fontSize: "11px", color: "var(--text-light)" }}>{item.date}</span>
                    </div>
                    
                    <p style={{ margin: "6px 0 0 0", color: "var(--text-primary)", lineHeight: "1.4", wordBreak: "break-word" }}>
                      {item.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
