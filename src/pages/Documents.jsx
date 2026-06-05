import React, { useState } from "react";
import {
  Download,
  Search,
  Trash2,
  Folder,
  File,
  Plus,
  Check,
} from "lucide-react";
import { Modal } from "../components/Modal";

export const Documents = ({ documents, setDocuments }) => {
  const [activeSubTab, setActiveSubTab] = useState("all");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Form states for new document
  const [formData, setFormData] = useState({
    name: "",
    type: "Certificates",
    size: "150KB",
    uploader: "Admin Office",
  });

  const handleOpenAddModal = () => {
    setFormData({
      name: "",
      type: "Certificates",
      size: "150KB",
      uploader: "Admin Office",
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newDoc = {
      id: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
      name: formData.name,
      type: formData.type,
      size: formData.size,
      date: new Date().toISOString().split("T")[0],
      uploader: formData.uploader,
    };

    setDocuments((prev) => [newDoc, ...prev]);
    setIsModalOpen(false);
    triggerToast(`Document "${formData.name}" uploaded successfully!`);
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      triggerToast(`Document "${name}" deleted.`);
    }
  };

  const handleExportExcel = () => {
    const headers = [
      "Document ID",
      "Document Name",
      "Type",
      "Size",
      "Uploader",
      "Uploaded Date",
    ];
    const rows = documents.map((doc) => [
      `"${doc.id}"`,
      `"${doc.name.replace(/"/g, '""')}"`,
      `"${doc.type}"`,
      `"${doc.size}"`,
      `"${doc.uploader.replace(/"/g, '""')}"`,
      `"${doc.date}"`,
    ]);
    const csvContent =
      "\uFEFF" +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "school_documents_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("Spreadsheet exported successfully!");
  };

  const handleDownloadDocument = (doc) => {
    let content = "";
    if (doc.type === "Certificates") {
      content = `
================================================================================
                    O A K W O O D   A C A D E M Y
================================================================================
                          CERTIFICATE OF MERIT
                          
This is to certify that the academic record and achievements of:

                  ${doc.name.replace("Enrollment Certificate - ", "").replace("Merit Certificate - ", "").replace("Attendance Certificate - ", "")}

has been verified and registered under Document Reference:
${doc.id}

Issued by the Oakwood Academy Admin Office on ${doc.date}.

--------------------------------------------------------------------------------
         Principal Johnsen                         Elena Rostova
         School Principal                       Admin Representative
================================================================================
      `;
    } else if (doc.type === "Report Card") {
      content = `
================================================================================
                    O A K W O O D   A C A D E M Y
================================================================================
                       OFFICIAL STUDENT REPORT CARD
                          
Student Name: ${doc.name.replace("Grade 6 Report Card - ", "").replace("Grade 5 Report Card - ", "")}
Document ID:  ${doc.id}
Date Issued:  ${doc.date}
Uploader:     ${doc.uploader}

Academic Status: Passed
Attendance Rating: Satisfactory (92.5%)

--------------------------------------------------------------------------------
Subjects Checked:
- Mathematics:       Grade A+ (92%)
- Advanced Algebra:  Grade A  (88%)
- Statistics:        Grade A+ (95%)
- Physics:           Grade B  (78%)

--------------------------------------------------------------------------------
         Principal Johnsen                         Elena Rostova
         School Principal                       Admin Representative
================================================================================
      `;
    } else {
      content = `
================================================================================
                    O A K W O O D   A C A D E M Y
================================================================================
                          OFFICIAL SCHOOL DOCUMENT
                          
Document Title: ${doc.name}
Reference ID:   ${doc.id}
Date Issued:    ${doc.date}
Uploader:       ${doc.uploader}

Details:
This is an official administrative file stored in the school portal database.
Size: ${doc.size}

--------------------------------------------------------------------------------
         Principal Johnsen                         Elena Rostova
         School Principal                       Admin Representative
================================================================================
      `;
    }
    const blob = new Blob([content.trim()], {
      type: "text/plain;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${doc.name.replace(/ /g, "_")}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast(`Downloaded "${doc.name}" successfully!`);
  };

  const handleDownload = (docOrName) => {
    if (typeof docOrName === "string") {
      handleExportExcel();
    } else {
      handleDownloadDocument(docOrName);
    }
  };

  // Filtered documents list
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.uploader.toLowerCase().includes(search.toLowerCase());
    // Sub-tab filter
    let matchesTab = true;
    if (activeSubTab === "records") {
      matchesTab = doc.type === "Report Card" || doc.type === "ID Card";
    } else if (activeSubTab === "certificates") {
      matchesTab = doc.type === "Certificates";
    }

    // Type dropdown filter
    const matchesType = typeFilter ? doc.type === typeFilter : true;

    return matchesSearch && matchesTab && matchesType;
  });

  // Calculate statistics counts
  const totalCount = documents.length;
  const certificatesCount = documents.filter(
    (d) => d.type === "Certificates",
  ).length;
  const recordsCount = documents.filter(
    (d) => d.type === "Report Card" || d.type === "ID Card",
  ).length;
  const othersCount = documents.filter((d) => d.type === "Other").length;

  return (
    <div className="documents-view">
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            backgroundColor: "var(--text-primary)",
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
          <Check size={20} color="var(--success)" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Documents</h1>
          <span className="page-subtitle">
            Manage students records, certificates and uploaded files
          </span>
        </div>
        <div className="page-actions">
          <button
            className="btn btn-secondary"
            onClick={() => handleDownload("All_Documents_Archive.zip")}
          >
            <Download size={16} />
            <span>Export Excel</span>
          </button>
          <button className="btn btn-primary" onClick={handleOpenAddModal}>
            <Plus size={16} />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div
        className="stats-grid"
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        <div className="stat-card blue-border" style={{ padding: "16px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              className="stat-icon-wrapper blue"
              style={{ width: "36px", height: "36px" }}
            >
              <Folder size={18} />
            </div>
            <div>
              <span className="stat-value" style={{ fontSize: "20px" }}>
                {totalCount}
              </span>
              <span
                className="stat-label"
                style={{ margin: 0, fontSize: "12px" }}
              >
                Total Documents
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
              <File size={18} />
            </div>
            <div>
              <span className="stat-value" style={{ fontSize: "20px" }}>
                {certificatesCount}
              </span>
              <span
                className="stat-label"
                style={{ margin: 0, fontSize: "12px" }}
              >
                Total Certificates
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
              <Folder size={18} />
            </div>
            <div>
              <span className="stat-value" style={{ fontSize: "20px" }}>
                {recordsCount}
              </span>
              <span
                className="stat-label"
                style={{ margin: 0, fontSize: "12px" }}
              >
                Student Records
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
              <File size={18} />
            </div>
            <div>
              <span className="stat-value" style={{ fontSize: "20px" }}>
                {othersCount}
              </span>
              <span
                className="stat-label"
                style={{ margin: 0, fontSize: "12px" }}
              >
                Other Files
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-navigation">
        <button
          className={`tab-btn ${activeSubTab === "all" ? "active" : ""}`}
          onClick={() => setActiveSubTab("all")}
        >
          All documents
        </button>
        <button
          className={`tab-btn ${activeSubTab === "records" ? "active" : ""}`}
          onClick={() => setActiveSubTab("records")}
        >
          Student records
        </button>
        <button
          className={`tab-btn ${activeSubTab === "certificates" ? "active" : ""}`}
          onClick={() => setActiveSubTab("certificates")}
        >
          Certificates
        </button>
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        <div className="filter-input-wrapper">
          <Search size={16} color="var(--text-light)" />
          <input
            type="text"
            className="filter-input"
            placeholder="Search Student or roll no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Certificates">Certificates</option>
          <option value="Report Card">Report Card</option>
          <option value="ID Card">ID Card</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>File Size</th>
                <th>Upload Date</th>
                <th>Uploaded By</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocs.map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <File size={16} color="var(--primary)" />
                      <span
                        className="table-user-name"
                        style={{ fontSize: "13px" }}
                      >
                        {doc.name}
                      </span>
                    </div>
                  </td>
                  <td>{doc.size}</td>
                  <td>{doc.date}</td>
                  <td>{doc.uploader}</td>
                  <td>
                    <span
                      className="status-pill active"
                      style={{
                        backgroundColor:
                          doc.type === "Certificates"
                            ? "#edfcf2"
                            : doc.type === "Report Card"
                              ? "#f4f3ff"
                              : "#eff8ff",
                        color:
                          doc.type === "Certificates"
                            ? "#027a48"
                            : doc.type === "Report Card"
                              ? "#6941c6"
                              : "#175cd3",
                        fontWeight: 600,
                        fontSize: "11px",
                      }}
                    >
                      {doc.type}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="table-action-btn edit"
                        onClick={() => handleDownload(doc)}
                        title="Download file"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        className="table-action-btn delete"
                        onClick={() => handleDelete(doc.id, doc.name)}
                        title="Delete file"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDocs.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      textAlign: "center",
                      padding: "32px",
                      color: "var(--text-light)",
                    }}
                  >
                    No files found in directory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Document Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Document"
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleFormSubmit}>
              Upload
            </button>
          </>
        }
      >
        <form onSubmit={handleFormSubmit}>
          <div className="photo-uploader">
            <Plus size={24} className="photo-uploader-icon" />
            <span className="photo-uploader-text">Select Document File</span>
            <span className="photo-uploader-subtext">
              PDF, DOCX, JPEG, PNG formats (up to 15MB)
            </span>
          </div>

          <div className="form-group" style={{ marginBottom: "12px" }}>
            <label className="form-label">Document Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="e.g. Enrollment Certificate - Liam Smith"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Document Category</label>
              <select
                name="type"
                className="form-select"
                value={formData.type}
                onChange={handleFormChange}
              >
                <option value="Certificates">Certificates</option>
                <option value="Report Card">Report Card</option>
                <option value="ID Card">ID Card</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">File Size Estimate</label>
              <input
                type="text"
                name="size"
                className="form-input"
                value={formData.size}
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
