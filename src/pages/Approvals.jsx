import React, { useState } from "react";
import { Check, X, Search, UserCheck, AlertCircle } from "lucide-react";

export const Approvals = ({ approvals, onApprove }) => {
  const [activeSubTab, setActiveSubTab] = useState("all");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Calculate statistics counts
  const approveCount = approvals.filter((a) => a.status === "Approved").length;
  const pendingCount = approvals.filter((a) => a.status === "Pending").length;
  const rejectCount = approvals.filter((a) => a.status === "Rejected").length;

  const filteredRequests = approvals.filter((req) => {
    const matchesSearch =
      req.requester.toLowerCase().includes(search.toLowerCase()) ||
      req.details.toLowerCase().includes(search.toLowerCase());
    // Tab filter
    const matchesTab =
      activeSubTab === "pending" ? req.status === "Pending" : true;
    // Dropdown filter
    const matchesStatus = statusFilter ? req.status === statusFilter : true;

    return matchesSearch && matchesTab && matchesStatus;
  });

  return (
    <div className="approvals-view">
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Approvals</h1>
          <span className="page-subtitle">
            Configure school profile, permission and integration
          </span>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div
        className="stats-grid"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
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
              <UserCheck size={18} />
            </div>
            <div>
              <span className="stat-value" style={{ fontSize: "20px" }}>
                {approveCount}
              </span>
              <span
                className="stat-label"
                style={{ margin: 0, fontSize: "12px" }}
              >
                Approved this week
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
              <AlertCircle size={18} />
            </div>
            <div>
              <span className="stat-value" style={{ fontSize: "20px" }}>
                {pendingCount}
              </span>
              <span
                className="stat-label"
                style={{ margin: 0, fontSize: "12px" }}
              >
                Pending review
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
              <X size={18} />
            </div>
            <div>
              <span className="stat-value" style={{ fontSize: "20px" }}>
                {rejectCount}
              </span>
              <span
                className="stat-label"
                style={{ margin: 0, fontSize: "12px" }}
              >
                Rejected this week
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
          All Request
        </button>
        <button
          className={`tab-btn ${activeSubTab === "pending" ? "active" : ""}`}
          onClick={() => setActiveSubTab("pending")}
        >
          Pending
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
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Requester</th>
                <th>Request details</th>
                <th>Request Type</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id}>
                  <td>
                    <div className="table-user-details">
                      <span className="table-user-name">{req.requester}</span>
                      <span className="table-user-subtext">{req.role}</span>
                    </div>
                  </td>
                  <td>{req.details}</td>
                  <td>
                    <span
                      className="status-pill active"
                      style={{
                        backgroundColor: "#eff8ff",
                        color: "#175cd3",
                        fontWeight: 600,
                      }}
                    >
                      {req.type}
                    </span>
                  </td>
                  <td>{req.date}</td>
                  <td>
                    <span
                      className={`status-pill ${req.status.toLowerCase()}`}
                      style={{
                        backgroundColor:
                          req.status === "Approved"
                            ? "#edfcf2"
                            : req.status === "Pending"
                              ? "#fffaeb"
                              : "#fef3f2",
                        color:
                          req.status === "Approved"
                            ? "#027a48"
                            : req.status === "Pending"
                              ? "#b54708"
                              : "#b42318",
                      }}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === "Pending" ? (
                      <div className="table-actions">
                        <button
                          className="table-action-btn edit"
                          onClick={() => onApprove(req.id, true)}
                          title="Approve request"
                          style={{ color: "var(--success)" }}
                        >
                          <Check size={16} />
                        </button>
                        <button
                          className="table-action-btn delete"
                          onClick={() => onApprove(req.id, false)}
                          title="Reject request"
                          style={{ color: "var(--error)" }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--text-light)",
                          fontWeight: 500,
                        }}
                      >
                        Reviewed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      textAlign: "center",
                      padding: "32px",
                      color: "var(--text-light)",
                    }}
                  >
                    No approval requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
