import React, { useState, useRef } from "react";
import { Plus, Search, Download, Edit3, Trash2, Upload } from "lucide-react";
import { Modal } from "../components/Modal";

export const UserManagement = ({
  students,
  setStudents,
  staff,
  setStaff,
  parents,
  setParents,
}) => {
  const [activeTab, setActiveTab] = useState("students");
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const fileInputRef = useRef(null);

  const handleImportExcel = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = evt.target?.result;
        if (!data) return;

        import("xlsx").then((XLSX) => {
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          const importedStudents = jsonData.map((row, idx) => {
            const fullName =
              row.Name ||
              row["Student Name"] ||
              row.name ||
              `${row["First Name"] || ""} ${row["Last Name"] || ""}`.trim() ||
              `Imported Student ${idx + 1}`;
            return {
              id:
                row.ID ||
                row["Student ID"] ||
                row.id ||
                `STU-${Math.floor(10000 + Math.random() * 90000)}`,
              name: fullName,
              email:
                row.Email ||
                row.email ||
                `${fullName.toLowerCase().replace(/ /g, "")}@example.com`,
              phone: String(row.Phone || row.phone || "8493208400"),
              dob: row.DOB || row.dob || "2015-01-01",
              grade: row.Grade || row.grade || "Grade 5",
              section: row.Section || row.section || "A",
              status:
                (row.Status || row.status || "Active") === "Inactive"
                  ? "Inactive"
                  : "Active",
              joinedDate:
                row["Joined Date"] ||
                row.joinedDate ||
                new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }),
              parentName: row["Parent Name"] || row.parentName || "Guardian",
              parentPhone: String(
                row["Parent Phone"] || row.parentPhone || "8503432890",
              ),
              avatar:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
            };
          });

          if (importedStudents.length > 0) {
            setStudents((prev) => [...importedStudents, ...prev]);
            alert(
              `Successfully imported ${importedStudents.length} students from Excel!`,
            );
          } else {
            alert(
              "No students found in sheet. Columns should include 'Name', 'Grade', 'Section', etc.",
            );
          }
        });
      } catch (err) {
        console.error(err);
        alert(
          "Error parsing file. Ensure it is a valid Excel/CSV spreadsheet.",
        );
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  // Form fields state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    grade: "Grade 5",
    section: "A",
    parentName: "",
    parentPhone: "",
    status: "Active",
    avatar: "",
  });

  const handleOpenAddModal = () => {
    setEditingStudent(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: "",
      grade: "Grade 5",
      section: "A",
      parentName: "",
      parentPhone: "",
      status: "Active",
      avatar: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (student) => {
    setEditingStudent(student);
    const names = student.name.split(" ");
    const firstName = names[0] || "";
    const lastName = names.slice(1).join(" ") || "";
    setFormData({
      firstName,
      lastName,
      email: student.email,
      phone: student.phone,
      dob: student.dob,
      grade: student.grade,
      section: student.section,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      status: student.status,
      avatar: student.avatar,
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    if (editingStudent) {
      // Edit Student
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editingStudent.id
            ? {
                ...s,
                name: fullName,
                email: formData.email,
                phone: formData.phone,
                dob: formData.dob,
                grade: formData.grade,
                section: formData.section,
                parentName: formData.parentName,
                parentPhone: formData.parentPhone,
                status: formData.status,
              }
            : s,
        ),
      );
    } else {
      // Add Student
      const newStudent = {
        id: `STU-${Math.floor(10000 + Math.random() * 90000)}`,
        name: fullName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        grade: formData.grade,
        section: formData.section,
        status: formData.status,
        joinedDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        parentName: formData.parentName,
        parentPhone: formData.parentPhone,
        avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 999999)}?w=150`,
      };
      setStudents((prev) => [newStudent, ...prev]);

      // Check if parent already exists, otherwise add them
      const parentExists = parents.some((p) => p.name === formData.parentName);
      if (!parentExists && formData.parentName) {
        const newParent = {
          id: `PAR-${Math.floor(10000 + Math.random() * 90000)}`,
          name: formData.parentName,
          email: `${formData.parentName.toLowerCase().replace(" ", "")}@example.com`,
          phone: formData.parentPhone,
          studentName: fullName,
          studentId: newStudent.id,
          relation: "Guardian",
          avatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
        };
        setParents((prev) => [...prev, newParent]);
      }
    }
    setIsModalOpen(false);
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Filters logic
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = gradeFilter ? s.grade.includes(gradeFilter) : true;
    const matchesStatus = statusFilter ? s.status === statusFilter : true;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const filteredStaff = staff.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? s.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const filteredParents = parents.filter((p) => {
    return (
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.studentName.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="user-management-view">
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">User Management</h1>
          <span className="page-subtitle">
            Manage Students, Staffs and parents across the school
          </span>
        </div>
        <div className="page-actions">
          <button
            className="btn btn-secondary"
            onClick={() => fileInputRef.current?.click()}
          >
            <Download size={16} />
            <span>Import Excel</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportExcel}
            accept=".xlsx,.xls,.csv"
            style={{ display: "none" }}
          />

          <button className="btn btn-primary" onClick={handleOpenAddModal}>
            <Plus size={16} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-navigation">
        <button
          className={`tab-btn ${activeTab === "students" ? "active" : ""}`}
          onClick={() => setActiveTab("students")}
        >
          Students ({students.length})
        </button>
        <button
          className={`tab-btn ${activeTab === "staff" ? "active" : ""}`}
          onClick={() => setActiveTab("staff")}
        >
          Staff ({staff.length})
        </button>
        <button
          className={`tab-btn ${activeTab === "parents" ? "active" : ""}`}
          onClick={() => setActiveTab("parents")}
        >
          Parents ({parents.length})
        </button>
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        <div className="filter-input-wrapper">
          <Search size={16} color="var(--text-light)" />
          <input
            type="text"
            className="filter-input"
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {activeTab === "students" && (
          <select
            className="filter-select"
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
          >
            <option value="">All Grade</option>
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
        )}

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Data Table */}
      <div className="table-card">
        <div className="table-wrapper">
          {activeTab === "students" && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student Details</th>
                  <th>Student ID</th>
                  <th>Grade/Class</th>
                  <th>Guardian</th>
                  <th>Status</th>
                  <th>Joined Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="table-user-cell">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="table-user-avatar"
                        />
                        <div className="table-user-details">
                          <span className="table-user-name">
                            {student.name}
                          </span>
                          <span className="table-user-subtext">
                            {student.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{student.id}</td>
                    <td>
                      {student.grade} - {student.section}
                    </td>
                    <td>
                      <div className="table-user-details">
                        <span
                          className="table-user-name"
                          style={{ fontSize: "13px" }}
                        >
                          {student.parentName}
                        </span>
                        <span className="table-user-subtext">
                          {student.parentPhone}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`status-pill ${student.status.toLowerCase()}`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td>{student.joinedDate}</td>
                    <td>
                      <div className="table-actions">
                        <button
                          className="table-action-btn edit"
                          onClick={() => handleOpenEditModal(student)}
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          className="table-action-btn delete"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        textAlign: "center",
                        padding: "32px",
                        color: "var(--text-light)",
                      }}
                    >
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {activeTab === "staff" && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Staff Details</th>
                  <th>Staff ID</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Joined Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((staffMember) => (
                  <tr key={staffMember.id}>
                    <td>
                      <div className="table-user-cell">
                        <img
                          src={staffMember.avatar}
                          alt={staffMember.name}
                          className="table-user-avatar"
                        />
                        <div className="table-user-details">
                          <span className="table-user-name">
                            {staffMember.name}
                          </span>
                          <span className="table-user-subtext">
                            {staffMember.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{staffMember.id}</td>
                    <td>{staffMember.role}</td>
                    <td>{staffMember.department}</td>
                    <td>
                      <span
                        className={`status-pill ${staffMember.status.toLowerCase()}`}
                      >
                        {staffMember.status}
                      </span>
                    </td>
                    <td>{staffMember.joinedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === "parents" && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Parent Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Student Name</th>
                  <th>Student ID</th>
                  <th>Relationship</th>
                </tr>
              </thead>
              <tbody>
                {filteredParents.map((parent) => (
                  <tr key={parent.id}>
                    <td>
                      <div className="table-user-cell">
                        <img
                          src={parent.avatar}
                          alt={parent.name}
                          className="table-user-avatar"
                        />
                        <div className="table-user-details">
                          <span className="table-user-name">{parent.name}</span>
                          <span className="table-user-subtext">
                            {parent.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{parent.email}</td>
                    <td>{parent.phone}</td>
                    <td>{parent.studentName}</td>
                    <td>{parent.studentId}</td>
                    <td>{parent.relation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add/Edit Student Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStudent ? "Edit Student Details" : "Add New Student"}
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleFormSubmit}>
              {editingStudent ? "Save Changes" : "Add Student"}
            </button>
          </>
        }
      >
        <form onSubmit={handleFormSubmit}>
          <div className="photo-uploader">
            <Upload size={24} className="photo-uploader-icon" />
            <span className="photo-uploader-text">Upload Photo</span>
            <span className="photo-uploader-subtext">
              Click or drag image file here
            </span>
          </div>

          <div className="form-section-title">Student Information</div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-input"
                value={formData.firstName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-input"
                value={formData.lastName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-input"
                value={formData.phone}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                name="dob"
                className="form-input"
                value={formData.dob}
                onChange={handleFormChange}
                required
              />
            </div>
            <div
              className="form-grid"
              style={{ gridColumn: "span 1", gap: "8px", margin: 0 }}
            >
              <div className="form-group">
                <label className="form-label">Grade</label>
                <select
                  name="grade"
                  className="form-select"
                  value={formData.grade}
                  onChange={handleFormChange}
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
                  name="section"
                  className="form-input"
                  value={formData.section}
                  onChange={handleFormChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section-title">Parent Information</div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Parent Name</label>
              <input
                type="text"
                name="parentName"
                className="form-input"
                value={formData.parentName}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="parentPhone"
                className="form-input"
                value={formData.parentPhone}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleFormChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
