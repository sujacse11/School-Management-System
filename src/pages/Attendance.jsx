import React, { useState, useEffect } from "react";
import {
  Download,
  Search,
  Check,
  AlertCircle,
  Clock,
  CalendarDays,
} from "lucide-react";

export const Attendance = ({
  attendanceRecords,
  setAttendanceRecords,
  classFilter,
  setClassFilter,
  staff,
  staffAttendanceRecords,
  setStaffAttendanceRecords,
  students,
}) => {
  const [activeTab, setActiveTab] = useState("student");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("2026-04-14");
  const [showToast, setShowToast] = useState(false);

  // Dynamic status counters
  const [counts, setCounts] = useState({
    present: 0,
    absent: 0,
    late: 0,
    excused: 0,
  });

  // Dynamically map all active students from the master students list, fallback to attendanceRecord if present
  const activeStudentAttendance = students.map((student) => {
    const existing = attendanceRecords.find((r) => r.studentId === student.id);
    if (existing) {
      return {
        ...existing,
        name: student.name,
        grade: student.grade,
        section: student.section,
      };
    } else {
      return {
        studentId: student.id,
        rollNo: student.id,
        name: student.name,
        grade: student.grade,
        section: student.section,
        status: "Present",
        remarks: "",
      };
    }
  });

  useEffect(() => {
    if (activeTab === "student") {
      const totalPresent = activeStudentAttendance.filter(
        (r) => r.status === "Present",
      ).length;
      const totalAbsent = activeStudentAttendance.filter(
        (r) => r.status === "Absent",
      ).length;
      const totalLate = activeStudentAttendance.filter(
        (r) => r.status === "Late",
      ).length;
      const totalExcused = activeStudentAttendance.filter(
        (r) => r.status === "Excused",
      ).length;

      setCounts({
        present: totalPresent,
        absent: totalAbsent,
        late: totalLate,
        excused: totalExcused,
      });
    } else {
      const totalPresent = staffAttendanceRecords.filter(
        (r) => r.status === "Present",
      ).length;
      const totalAbsent = staffAttendanceRecords.filter(
        (r) => r.status === "Absent",
      ).length;
      const totalLate = staffAttendanceRecords.filter(
        (r) => r.status === "Late",
      ).length;
      const totalExcused = staffAttendanceRecords.filter(
        (r) => r.status === "Excused",
      ).length;

      setCounts({
        present: totalPresent,
        absent: totalAbsent,
        late: totalLate,
        excused: totalExcused,
      });
    }
  }, [attendanceRecords, staffAttendanceRecords, activeTab, students]);

  const handleStatusChange = (studentId, status) => {
    const exists = attendanceRecords.some((r) => r.studentId === studentId);
    if (exists) {
      setAttendanceRecords((prev) =>
        prev.map((rec) =>
          rec.studentId === studentId ? { ...rec, status } : rec,
        ),
      );
    } else {
      const student = students.find((s) => s.id === studentId);
      if (student) {
        const newRecord = {
          studentId: student.id,
          rollNo: student.id,
          name: student.name,
          grade: student.grade,
          section: student.section,
          status,
          remarks: "",
        };
        setAttendanceRecords((prev) => [...prev, newRecord]);
      }
    }
  };

  const handleRemarksChange = (studentId, remarks) => {
    const exists = attendanceRecords.some((r) => r.studentId === studentId);
    if (exists) {
      setAttendanceRecords((prev) =>
        prev.map((rec) =>
          rec.studentId === studentId ? { ...rec, remarks } : rec,
        ),
      );
    } else {
      const student = students.find((s) => s.id === studentId);
      if (student) {
        const newRecord = {
          studentId: student.id,
          rollNo: student.id,
          name: student.name,
          grade: student.grade,
          section: student.section,
          status: "Present",
          remarks,
        };
        setAttendanceRecords((prev) => [...prev, newRecord]);
      }
    }
  };

  const handleStaffStatusChange = (staffId, status) => {
    setStaffAttendanceRecords((prev) =>
      prev.map((rec) => (rec.staffId === staffId ? { ...rec, status } : rec)),
    );
  };

  const handleStaffRemarksChange = (staffId, remarks) => {
    setStaffAttendanceRecords((prev) =>
      prev.map((rec) => (rec.staffId === staffId ? { ...rec, remarks } : rec)),
    );
  };

  const handleSaveBatch = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const filteredRecords = activeStudentAttendance.filter((rec) => {
    const matchesSearch =
      rec.name.toLowerCase().includes(search.toLowerCase()) ||
      rec.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchesClass = classFilter
      ? rec.grade.toLowerCase().includes(classFilter.toLowerCase()) ||
        (rec.grade + " " + rec.section)
          .toLowerCase()
          .includes(classFilter.toLowerCase())
      : true;
    return matchesSearch && matchesClass;
  });

  const filteredStaffRecords = staffAttendanceRecords.filter((rec) => {
    return (
      rec.name.toLowerCase().includes(search.toLowerCase()) ||
      rec.role.toLowerCase().includes(search.toLowerCase()) ||
      rec.department.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="attendance-view">
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
          }}
        >
          <Check size={20} />
          <span>Attendance batch saved successfully!</span>
        </div>
      )}

      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Attendance</h1>
          <span className="page-subtitle">
            Track and manage student and staff attendance
          </span>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">
            <Download size={16} />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-navigation">
        <button
          className={`tab-btn ${activeTab === "student" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("student");
            setSearch("");
          }}
        >
          Student Attendance
        </button>
        <button
          className={`tab-btn ${activeTab === "staff" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("staff");
            setSearch("");
          }}
        >
          Staff Attendance
        </button>
      </div>

      {/* Stats Cards */}
      <div
        className="stats-grid"
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        <div
          className="stat-card green-border"
          style={{ padding: "16px 20px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              className="stat-icon-wrapper green"
              style={{ width: "36px", height: "36px" }}
            >
              <Check size={18} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="stat-value" style={{ fontSize: "22px" }}>
                {counts.present}
              </span>
              <span
                className="stat-label"
                style={{ margin: 0, fontSize: "12px" }}
              >
                Present
              </span>
            </div>
          </div>
        </div>

        <div className="stat-card red-border" style={{ padding: "16px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              className="stat-icon-wrapper red"
              style={{ width: "36px", height: "36px" }}
            >
              <AlertCircle size={18} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="stat-value" style={{ fontSize: "22px" }}>
                {counts.absent}
              </span>
              <span
                className="stat-label"
                style={{ margin: 0, fontSize: "12px" }}
              >
                Absent
              </span>
            </div>
          </div>
        </div>

        <div
          className="stat-card orange-border"
          style={{ padding: "16px 20px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              className="stat-icon-wrapper orange"
              style={{ width: "36px", height: "36px" }}
            >
              <Clock size={18} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="stat-value" style={{ fontSize: "22px" }}>
                {counts.late}
              </span>
              <span
                className="stat-label"
                style={{ margin: 0, fontSize: "12px" }}
              >
                Late
              </span>
            </div>
          </div>
        </div>

        <div className="stat-card blue-border" style={{ padding: "16px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              className="stat-icon-wrapper blue"
              style={{ width: "36px", height: "36px" }}
            >
              <CalendarDays size={18} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="stat-value" style={{ fontSize: "22px" }}>
                {counts.excused}
              </span>
              <span
                className="stat-label"
                style={{ margin: 0, fontSize: "12px" }}
              >
                Excused
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter controls */}
      <div className="filter-bar" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div className="filter-input-wrapper" style={{ minWidth: "240px" }}>
            <Search size={16} color="var(--text-light)" />
            <input
              type="text"
              className="filter-input"
              placeholder={
                activeTab === "student"
                  ? "Search Student or roll no..."
                  : "Search Staff or role/department..."
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <input
            type="date"
            className="filter-select"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          {activeTab === "student" && (
            <select
              className="filter-select"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
            >
              <option value="">All Grades</option>
              <option value="Grade 3">Grade 3</option>
              <option value="Grade 4">Grade 4</option>
              <option value="Grade 5">Grade 5</option>
              <option value="Grade 6">Grade 6</option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 10">Grade 10</option>
            </select>
          )}
        </div>

        <button className="btn btn-primary" onClick={handleSaveBatch}>
          Save Batch
        </button>
      </div>

      {/* Data Table */}
      <div className="table-card">
        <div className="table-wrapper">
          {activeTab === "student" ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll No</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.studentId}>
                    <td>
                      <span
                        className="table-user-name"
                        style={{ fontWeight: 600 }}
                      >
                        {record.name}
                      </span>
                    </td>
                    <td>{record.rollNo}</td>
                    <td>
                      {record.grade} {record.section}
                    </td>
                    <td>
                      <div className="attendance-toggle-group">
                        <button
                          className={`attendance-toggle-btn present ${record.status === "Present" ? "active" : ""}`}
                          onClick={() =>
                            handleStatusChange(record.studentId, "Present")
                          }
                        >
                          Present
                        </button>
                        <button
                          className={`attendance-toggle-btn absent ${record.status === "Absent" ? "active" : ""}`}
                          onClick={() =>
                            handleStatusChange(record.studentId, "Absent")
                          }
                        >
                          Absent
                        </button>
                        <button
                          className={`attendance-toggle-btn late ${record.status === "Late" ? "active" : ""}`}
                          onClick={() =>
                            handleStatusChange(record.studentId, "Late")
                          }
                        >
                          Late
                        </button>
                        <button
                          className={`attendance-toggle-btn excused ${record.status === "Excused" ? "active" : ""}`}
                          onClick={() =>
                            handleStatusChange(record.studentId, "Excused")
                          }
                          style={{
                            background:
                              record.status === "Excused"
                                ? "var(--primary)"
                                : "transparent",
                            color:
                              record.status === "Excused"
                                ? "white"
                                : "var(--text-secondary)",
                          }}
                        >
                          Excused
                        </button>
                      </div>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="attendance-remarks-input"
                        placeholder={record.remarks || "Add remarks..."}
                        value={record.remarks}
                        onChange={(e) =>
                          handleRemarksChange(record.studentId, e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Staff ID</th>
                  <th>Department / Role</th>
                  <th>Status</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaffRecords.map((record) => (
                  <tr key={record.staffId}>
                    <td>
                      <span
                        className="table-user-name"
                        style={{ fontWeight: 600 }}
                      >
                        {record.name}
                      </span>
                    </td>
                    <td>{record.staffId}</td>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{ fontWeight: 500, fontSize: "13px" }}>
                          {record.role}
                        </span>
                        <span
                          style={{
                            fontSize: "11px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {record.department}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="attendance-toggle-group">
                        <button
                          className={`attendance-toggle-btn present ${record.status === "Present" ? "active" : ""}`}
                          onClick={() =>
                            handleStaffStatusChange(record.staffId, "Present")
                          }
                        >
                          Present
                        </button>
                        <button
                          className={`attendance-toggle-btn absent ${record.status === "Absent" ? "active" : ""}`}
                          onClick={() =>
                            handleStaffStatusChange(record.staffId, "Absent")
                          }
                        >
                          Absent
                        </button>
                        <button
                          className={`attendance-toggle-btn late ${record.status === "Late" ? "active" : ""}`}
                          onClick={() =>
                            handleStaffStatusChange(record.staffId, "Late")
                          }
                        >
                          Late
                        </button>
                        <button
                          className={`attendance-toggle-btn excused ${record.status === "Excused" ? "active" : ""}`}
                          onClick={() =>
                            handleStaffStatusChange(record.staffId, "Excused")
                          }
                          style={{
                            background:
                              record.status === "Excused"
                                ? "var(--primary)"
                                : "transparent",
                            color:
                              record.status === "Excused"
                                ? "white"
                                : "var(--text-secondary)",
                          }}
                        >
                          Excused
                        </button>
                      </div>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="attendance-remarks-input"
                        placeholder={record.remarks || "Add remarks..."}
                        value={record.remarks}
                        onChange={(e) =>
                          handleStaffRemarksChange(
                            record.staffId,
                            e.target.value,
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
