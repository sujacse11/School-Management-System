import React, { useState } from "react";
import { BookOpen, Plus, Calendar } from "lucide-react";
import { Modal } from "../components/Modal";

export const MyClasses = ({
  teacherClasses,
  setTeacherClasses,
  setCurrentTab,
  setAttendanceClassFilter,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    className: "",
    gradeSection: "10A",
    subject: "",
    room: "Room 201",
    schedule: "Mon, Wed, Fri 10:00AM",
    studentCount: 30,
  });

  const handleOpenAddModal = () => {
    setFormData({
      className: "",
      gradeSection: "10A",
      subject: "",
      room: "Room 201",
      schedule: "Mon, Wed, Fri 10:00AM",
      studentCount: 30,
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newClass = {
      id: `TCLS-${Math.floor(1000 + Math.random() * 9000)}`,
      className: formData.className,
      gradeSection: formData.gradeSection,
      subject: formData.subject || formData.className,
      studentCount: Number(formData.studentCount),
      room: formData.room,
      schedule: formData.schedule,
    };

    setTeacherClasses((prev) => [...prev, newClass]);
    setIsModalOpen(false);
  };

  const handleGoToAttendance = (gradeSection) => {
    // Standardize to matching formats e.g. "Grade 3" or similar, or just pass directly
    // Let's translate "10A" to "Grade 10" or similar if needed. Let's pass the string.
    setAttendanceClassFilter(gradeSection);
    setCurrentTab("attendance");
  };

  return (
    <div className="my-classes-view">
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">My Classes</h1>
          <span className="page-subtitle">
            Manage at your assigned classes and subjects
          </span>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleOpenAddModal}>
            <Plus size={16} />
            <span>New Class</span>
          </button>
        </div>
      </div>

      <div className="cards-grid">
        {teacherClasses.map((cls) => (
          <div key={cls.id} className="class-card">
            <div className="class-card-header" style={{ marginBottom: "8px" }}>
              <div
                className="class-icon-badge"
                style={{ backgroundColor: "#f4f3ff", color: "var(--primary)" }}
              >
                <BookOpen size={20} />
              </div>
              <span className="class-badge" style={{ position: "static" }}>
                {cls.gradeSection}
              </span>
            </div>

            <h3 className="class-title" style={{ marginTop: "8px" }}>
              Class {cls.gradeSection}
            </h3>
            <span
              className="class-room"
              style={{ color: "var(--primary)", fontWeight: 600 }}
            >
              {cls.subject}
            </span>

            <div
              className="class-stats"
              style={{ margin: "12px 0", padding: "8px 0" }}
            >
              <div className="class-stat-item">
                <span className="class-stat-value">{cls.studentCount}</span>
                <span className="class-stat-label">Students</span>
              </div>
              <div className="class-stat-item">
                <span className="class-stat-value">{cls.room}</span>
                <span className="class-stat-label">Room</span>
              </div>
            </div>

            <div className="class-details" style={{ marginBottom: "16px" }}>
              <div className="class-detail-item">
                <Calendar size={14} />
                <span>{cls.schedule}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
              <button
                className="btn btn-secondary"
                style={{ flex: 1, padding: "8px 12px", fontSize: "12px" }}
                onClick={() => setCurrentTab("students")}
              >
                View Students
              </button>
              <button
                className="btn btn-primary"
                style={{ flex: 1, padding: "8px 12px", fontSize: "12px" }}
                onClick={() => handleGoToAttendance(cls.gradeSection)}
              >
                Attendance
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create New Class Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Class"
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleFormSubmit}>
              Create Class
            </button>
          </>
        }
      >
        <form onSubmit={handleFormSubmit}>
          <div className="form-group" style={{ marginBottom: "12px" }}>
            <label className="form-label">Class Name</label>
            <input
              type="text"
              name="className"
              className="form-input"
              placeholder="e.g. Mathematics"
              value={formData.className}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-grid" style={{ marginBottom: "12px" }}>
            <div className="form-group">
              <label className="form-label">Grade / Section</label>
              <input
                type="text"
                name="gradeSection"
                className="form-input"
                placeholder="e.g. 10A"
                value={formData.gradeSection}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Room</label>
              <input
                type="text"
                name="room"
                className="form-input"
                value={formData.room}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "12px" }}>
            <label className="form-label">Subject</label>
            <input
              type="text"
              name="subject"
              className="form-input"
              placeholder="e.g. Calculus"
              value={formData.subject}
              onChange={handleFormChange}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Students Count</label>
              <input
                type="number"
                name="studentCount"
                className="form-input"
                value={formData.studentCount}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Schedule</label>
              <input
                type="text"
                name="schedule"
                className="form-input"
                value={formData.schedule}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
