import React, { useState } from "react";
import {
  FileSpreadsheet,
  Plus,
  Search,
  Calendar,
  CheckSquare,
  Eye,
  Clock,
} from "lucide-react";
import { Modal } from "../components/Modal";

export const Assignments = ({ assignments, setAssignments }) => {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    classGrade: "10-A",
    dueDate: "2026-04-20",
    filesCount: 1,
    groupProject: false,
    maxScore: "100",
  });

  const handleOpenAddModal = () => {
    setFormData({
      title: "",
      classGrade: "10-A",
      dueDate: "2026-04-20",
      filesCount: 1,
      groupProject: false,
      maxScore: "100",
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? e.target.checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newAssign = {
      id: `ASG-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.title,
      filesCount: Number(formData.filesCount),
      groupProject: formData.groupProject,
      classGrade: formData.classGrade,
      dueDate: formData.dueDate,
      submissionsCount: 0,
      totalStudents: formData.classGrade === "10-A" ? 30 : 25,
      status: "Active",
    };

    setAssignments((prev) => [newAssign, ...prev]);
    setIsModalOpen(false);
  };

  const handleGradeAssignment = (id) => {
    // Toggling state from Needs Grading to Completed
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: "Completed", submissionsCount: a.totalStudents }
          : a,
      ),
    );
    alert("Assignment graded successfully! Status updated to 'Completed'.");
  };

  // Filter logic
  const filteredAssignments = assignments.filter((asg) => {
    const matchesSearch = asg.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesClass = classFilter ? asg.classGrade === classFilter : true;
    const matchesStatus = statusFilter ? asg.status === statusFilter : true;
    return matchesSearch && matchesClass && matchesStatus;
  });

  // Dynamic counts
  const activeCount = assignments.filter((a) => a.status === "Active").length;
  const needsGradingCount = assignments.filter(
    (a) => a.status === "Needs Grading",
  ).length;
  const completedCount = assignments.filter(
    (a) => a.status === "Completed",
  ).length;

  return (
    <div className="assignments-view">
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Assignments</h1>
          <span className="page-subtitle">
            Track, assign and grade student worksheets
          </span>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleOpenAddModal}>
            <Plus size={16} />
            <span>Create Assignment</span>
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
              <FileSpreadsheet size={18} />
            </div>
            <div>
              <span className="stat-value" style={{ fontSize: "20px" }}>
                {activeCount + 11}
              </span>
              <span
                className="stat-label"
                style={{ margin: 0, fontSize: "12px" }}
              >
                Active Assignments
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
            <div>
              <span className="stat-value" style={{ fontSize: "20px" }}>
                {needsGradingCount + 8}
              </span>
              <span
                className="stat-label"
                style={{ margin: 0, fontSize: "12px" }}
              >
                Needs Grading
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
              <CheckSquare size={18} />
            </div>
            <div>
              <span className="stat-value" style={{ fontSize: "20px" }}>
                {completedCount + 44}
              </span>
              <span
                className="stat-label"
                style={{ margin: 0, fontSize: "12px" }}
              >
                Completed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        <div className="filter-input-wrapper">
          <Search size={16} color="var(--text-light)" />
          <input
            type="text"
            className="filter-input"
            placeholder="Search assignments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
        >
          <option value="">All Classes</option>
          <option value="10-A">10-A</option>
          <option value="10-B">10-B</option>
          <option value="10-C">10-C</option>
          <option value="10-D">10-D</option>
        </select>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Needs Grading">Needs Grading</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Assignment Title</th>
                <th>Class</th>
                <th>Due Date</th>
                <th>Submissions</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((asg) => {
                const ratio =
                  asg.totalStudents > 0
                    ? (asg.submissionsCount / asg.totalStudents) * 100
                    : 0;
                return (
                  <tr key={asg.id}>
                    <td>
                      <div className="table-user-details">
                        <span
                          className="table-user-name"
                          style={{ fontSize: "14px" }}
                        >
                          {asg.title}
                        </span>
                        <span className="table-user-subtext">
                          {asg.filesCount} file{asg.filesCount !== 1 ? "s" : ""}{" "}
                          attached {asg.groupProject && "• Group Project"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="status-pill active"
                        style={{
                          backgroundColor: "#eff8ff",
                          color: "#175cd3",
                          fontWeight: 600,
                        }}
                      >
                        {asg.classGrade}
                      </span>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "13px",
                        }}
                      >
                        <Calendar size={14} color="var(--text-light)" />
                        <span>{asg.dueDate}</span>
                      </div>
                    </td>
                    <td style={{ width: "200px" }}>
                      <div className="progress-text-row">
                        <span>
                          {asg.submissionsCount}/{asg.totalStudents} Submitted
                        </span>
                        <span>{Math.round(ratio)}%</span>
                      </div>
                      <div className="progress-bar-container">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${ratio}%` }}
                        ></div>
                      </div>
                    </td>
                    <td>
                      <span
                        className="status-pill active"
                        style={{
                          backgroundColor:
                            asg.status === "Active"
                              ? "#edfcf2"
                              : asg.status === "Needs Grading"
                                ? "#fffaeb"
                                : "#f2f4f7",
                          color:
                            asg.status === "Active"
                              ? "#027a48"
                              : asg.status === "Needs Grading"
                                ? "#b54708"
                                : "#344054",
                        }}
                      >
                        {asg.status}
                      </span>
                    </td>
                    <td>
                      {asg.status === "Needs Grading" ? (
                        <button
                          className="btn btn-primary"
                          style={{ padding: "6px 12px", fontSize: "12px" }}
                          onClick={() => handleGradeAssignment(asg.id)}
                        >
                          Grade
                        </button>
                      ) : (
                        <button
                          className="btn btn-secondary"
                          style={{
                            padding: "6px 12px",
                            fontSize: "12px",
                            display: "inline-flex",
                            gap: "4px",
                          }}
                        >
                          <Eye size={12} />
                          <span>View</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Assignment"
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleFormSubmit}>
              Create Assignment
            </button>
          </>
        }
      >
        <form onSubmit={handleFormSubmit}>
          <div className="form-group" style={{ marginBottom: "12px" }}>
            <label className="form-label">Assignment Title</label>
            <input
              type="text"
              name="title"
              className="form-input"
              placeholder="e.g. Quadratic Equations Practice set"
              value={formData.title}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-grid" style={{ marginBottom: "12px" }}>
            <div className="form-group">
              <label className="form-label">Max Score</label>
              <input
                type="text"
                name="maxScore"
                className="form-input"
                value={formData.maxScore}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Class</label>
              <select
                name="classGrade"
                className="form-select"
                value={formData.classGrade}
                onChange={handleFormChange}
              >
                <option value="10-A">10-A</option>
                <option value="10-B">10-B</option>
                <option value="10-C">10-C</option>
                <option value="10-D">10-D</option>
              </select>
            </div>
          </div>

          <div className="form-grid" style={{ marginBottom: "12px" }}>
            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                name="dueDate"
                className="form-input"
                value={formData.dueDate}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Attached Files Count</label>
              <input
                type="number"
                name="filesCount"
                className="form-input"
                value={formData.filesCount}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "12px",
            }}
          >
            <input
              type="checkbox"
              name="groupProject"
              id="groupProject"
              checked={formData.groupProject}
              onChange={handleFormChange}
            />

            <label
              htmlFor="groupProject"
              className="form-label"
              style={{ cursor: "pointer" }}
            >
              Is this a Group Project?
            </label>
          </div>
        </form>
      </Modal>
    </div>
  );
};
