import React, { useState } from "react";
import { Award, Check, TrendingUp } from "lucide-react";

export const ExamsMarks = ({ examMarks, setExamMarks }) => {
  const [activeUnit, setActiveUnit] = useState(3);
  const [classFilter, setClassFilter] = useState("10-A");
  const [showToast, setShowToast] = useState(false);

  // Grade calculation logic
  const calculatePerformance = (math, advAlgebra, stats) => {
    const total = math + advAlgebra + stats;
    let grade = "C";
    if (total >= 270) grade = "Grade A+";
    else if (total >= 255) grade = "Grade A";
    else if (total >= 240) grade = "Grade A-";
    else if (total >= 225) grade = "Grade B+";
    else if (total >= 200) grade = "Grade B";
    else if (total >= 180) grade = "Grade B-";
    return { total, grade };
  };

  const handleScoreChange = (studentId, subject, value) => {
    const scoreVal = Math.min(100, Math.max(0, Number(value) || 0));

    setExamMarks((prev) =>
      prev.map((rec) => {
        if (rec.studentId === studentId) {
          const updated = { ...rec, [subject]: scoreVal };
          const { total, grade } = calculatePerformance(
            updated.math,
            updated.advAlgebra,
            updated.statistics,
          );
          return {
            ...updated,
            totalScore: total,
            performanceGrade: grade,
          };
        }
        return rec;
      }),
    );
  };

  const handlePublish = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Stats averages
  const totalStudents = examMarks.length;
  const avgScore = Math.round(
    examMarks.reduce((sum, r) => sum + r.totalScore, 0) / (totalStudents || 1),
  );
  const highestScore = Math.max(...examMarks.map((r) => r.totalScore), 0);
  const passCount = examMarks.filter((r) => r.totalScore >= 200).length;
  const passRate =
    totalStudents > 0 ? Math.round((passCount / totalStudents) * 100) : 0;

  return (
    <div className="exams-marks-view">
      {showToast && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            backgroundColor: "var(--primary)",
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
          <span>
            Marks published successfully to student and parent portal
            dashboards!
          </span>
        </div>
      )}

      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Exam Marks</h1>
          <span className="page-subtitle">
            Enter marks and track student performance
          </span>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handlePublish}>
            Publish Marks
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div
        className="stats-grid"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        <div className="stat-card blue-border" style={{ padding: "16px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              className="stat-icon-wrapper blue"
              style={{ width: "36px", height: "36px" }}
            >
              <Award size={18} />
            </div>
            <div>
              <span className="stat-value" style={{ fontSize: "20px" }}>
                {avgScore}/300
              </span>
              <span
                className="stat-label"
                style={{ margin: 0, fontSize: "12px" }}
              >
                Average score across all subjects
              </span>
            </div>
          </div>
        </div>

        <div
          className="stat-card green-border"
          style={{ padding: "16px 20px" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              className="stat-icon-wrapper green"
              style={{ width: "36px", height: "36px" }}
            >
              <TrendingUp size={18} />
            </div>
            <div>
              <span className="stat-value" style={{ fontSize: "20px" }}>
                {highestScore}/300
              </span>
              <span
                className="stat-label"
                style={{ margin: 0, fontSize: "12px" }}
              >
                Highest score top performer
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
              <Award size={18} />
            </div>
            <div>
              <span className="stat-value" style={{ fontSize: "20px" }}>
                {passRate}%
              </span>
              <span
                className="stat-label"
                style={{ margin: 0, fontSize: "12px" }}
              >
                Pass Rate (200% threshold)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Unit Selector */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
        <button
          className={`btn ${activeUnit === 1 ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setActiveUnit(1)}
          style={{ padding: "8px 16px", fontSize: "13px" }}
        >
          Unit 1 - Algebra basics Feb 2026
        </button>
        <button
          className={`btn ${activeUnit === 2 ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setActiveUnit(2)}
          style={{ padding: "8px 16px", fontSize: "13px" }}
        >
          Unit 2 - Linear Equations Mar 2026
        </button>
        <button
          className={`btn ${activeUnit === 3 ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setActiveUnit(3)}
          style={{ padding: "8px 16px", fontSize: "13px" }}
        >
          Unit 3 - Quadratic Equations Apr 2026
        </button>
      </div>

      {/* Main Panel title + Filter */}
      <div className="filter-bar" style={{ justifyContent: "space-between" }}>
        <div className="chart-title-group" style={{ margin: 0 }}>
          <h3 className="chart-title" style={{ fontSize: "18px" }}>
            Marks Entry class 10A
          </h3>
          <span className="chart-subtitle">
            Enter Score for Each subject out of 100
          </span>
        </div>

        <select
          className="filter-select"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        >
          <option value="10-A">Class 10 A</option>
          <option value="10-B">Class 10 B</option>
        </select>
      </div>

      {/* Marks Table */}
      <div className="table-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Mathematics</th>
                <th>Adv Algebra</th>
                <th>Statistics</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {examMarks.map((rec) => (
                <tr key={rec.studentId}>
                  <td>
                    <div className="table-user-details">
                      <span className="table-user-name">{rec.name}</span>
                      <span className="table-user-subtext">{rec.rollNo}</span>
                    </div>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="attendance-remarks-input"
                      style={{ width: "80px", textAlign: "center" }}
                      value={rec.math}
                      onChange={(e) =>
                        handleScoreChange(rec.studentId, "math", e.target.value)
                      }
                      min={0}
                      max={100}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="attendance-remarks-input"
                      style={{ width: "80px", textAlign: "center" }}
                      value={rec.advAlgebra}
                      onChange={(e) =>
                        handleScoreChange(
                          rec.studentId,
                          "advAlgebra",
                          e.target.value,
                        )
                      }
                      min={0}
                      max={100}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="attendance-remarks-input"
                      style={{ width: "80px", textAlign: "center" }}
                      value={rec.statistics}
                      onChange={(e) =>
                        handleScoreChange(
                          rec.studentId,
                          "statistics",
                          e.target.value,
                        )
                      }
                      min={0}
                      max={100}
                    />
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <span
                        className="status-pill active"
                        style={{
                          backgroundColor:
                            rec.totalScore >= 240
                              ? "#edfcf2"
                              : rec.totalScore >= 200
                                ? "#eff8ff"
                                : "#fef3f2",
                          color:
                            rec.totalScore >= 240
                              ? "#027a48"
                              : rec.totalScore >= 200
                                ? "#175cd3"
                                : "#b42318",
                          fontWeight: 700,
                          fontSize: "12px",
                          width: "90px",
                          justifyContent: "center",
                        }}
                      >
                        {rec.performanceGrade}
                      </span>
                      <span
                        style={{
                          fontWeight: 600,
                          color: "var(--text-secondary)",
                        }}
                      >
                        {rec.totalScore}/300
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
