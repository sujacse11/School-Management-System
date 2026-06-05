import React, { useState } from "react";
import { Plus, Megaphone, Calendar, User, Clock } from "lucide-react";
import { Modal } from "../components/Modal";

export const Communication = ({ announcements, setAnnouncements }) => {
  const [activeSubTab, setActiveSubTab] = useState("announcements");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    priority: "Medium",
    content: "",
    audience: "Everyone",
    expires: "2026-06-30",
  });

  const handleOpenAddModal = () => {
    setFormData({
      title: "",
      priority: "Medium",
      content: "",
      audience: "Everyone",
      expires: "2026-06-30",
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newAnn = {
      id: `ANN-${Math.floor(100 + Math.random() * 900)}`,
      title: formData.title,
      priority: formData.priority,
      status: "Published",
      content: formData.content,
      audience: formData.audience,
      date: new Date().toISOString().split("T")[0],
      author: "Principal Johnsen",
      expires: formData.expires,
    };

    setAnnouncements((prev) => [newAnn, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <div className="communication-view">
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Communication</h1>
          <span className="page-subtitle">
            Announcements, notifications and broadcasts
          </span>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleOpenAddModal}>
            <Plus size={16} />
            <span>New Announcement</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-navigation">
        <button
          className={`tab-btn ${activeSubTab === "announcements" ? "active" : ""}`}
          onClick={() => setActiveSubTab("announcements")}
        >
          Announcements
        </button>
        <button
          className={`tab-btn ${activeSubTab === "notifications" ? "active" : ""}`}
          onClick={() => setActiveSubTab("notifications")}
        >
          Notifications
        </button>
        <button
          className={`tab-btn ${activeSubTab === "broadcast" ? "active" : ""}`}
          onClick={() => setActiveSubTab("broadcast")}
        >
          Broadcast
        </button>
      </div>

      {activeSubTab === "announcements" && (
        <div className="announcements-feed">
          {announcements.map((ann) => (
            <div key={ann.id} className="announcement-card">
              <div className="announcement-header">
                <div className="announcement-title-group">
                  <h3 className="announcement-title">{ann.title}</h3>
                  <span className={`priority-badge ${ann.priority}`}>
                    {ann.priority}
                  </span>
                  <span className="announcement-status-badge">
                    {ann.status}
                  </span>
                </div>
              </div>

              <p className="announcement-body">{ann.content}</p>

              <div className="announcement-footer">
                <div className="announcement-meta-group">
                  <div className="announcement-meta-item">
                    <User size={14} />
                    <span>Audience: </span>
                    <span className="announcement-meta-value">
                      {ann.audience}
                    </span>
                  </div>
                  <div className="announcement-meta-item">
                    <Calendar size={14} />
                    <span>Date: </span>
                    <span className="announcement-meta-value">{ann.date}</span>
                  </div>
                  <div className="announcement-meta-item">
                    <Megaphone size={14} />
                    <span>By: </span>
                    <span className="announcement-meta-value">
                      {ann.author}
                    </span>
                  </div>
                  {ann.expires && (
                    <div className="announcement-meta-item">
                      <Clock size={14} />
                      <span>Expires: </span>
                      <span className="announcement-meta-value">
                        {ann.expires}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSubTab !== "announcements" && (
        <div
          style={{
            background: "#fff",
            padding: "48px",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
            textAlign: "center",
          }}
        >
          <p style={{ color: "var(--text-secondary)" }}>
            Broadcasting services offline in offline sandbox
          </p>
        </div>
      )}

      {/* New Announcement Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Announcement"
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleFormSubmit}>
              Publish
            </button>
          </>
        }
      >
        <form onSubmit={handleFormSubmit}>
          <div className="form-group" style={{ marginBottom: "12px" }}>
            <label className="form-label">Announcement Title</label>
            <input
              type="text"
              name="title"
              className="form-input"
              placeholder="e.g. Sports Day 2026"
              value={formData.title}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-grid" style={{ marginBottom: "12px" }}>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                name="priority"
                className="form-select"
                value={formData.priority}
                onChange={handleFormChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Target Audience</label>
              <select
                name="audience"
                className="form-select"
                value={formData.audience}
                onChange={handleFormChange}
              >
                <option value="Everyone">Everyone</option>
                <option value="Students">Students Only</option>
                <option value="Parents">Parents Only</option>
                <option value="Staff">Staff Only</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "12px" }}>
            <label className="form-label">Expiration Date</label>
            <input
              type="date"
              name="expires"
              className="form-input"
              value={formData.expires}
              onChange={handleFormChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              name="content"
              className="form-textarea"
              placeholder="Type announcement details here..."
              value={formData.content}
              onChange={handleFormChange}
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};
