import React, { useState } from "react";
import {
  Download,
  Plus,
  Edit3,
  Trash2,
  DollarSign,
  Wallet,
  FileCheck,
} from "lucide-react";
import { Modal } from "../components/Modal";

export const Fees = ({ feeCategories, setFeeCategories }) => {
  const [activeSubTab, setActiveSubTab] = useState("structure");
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    targetGrades: "Grade 1-8",
    amount: 1000,
    cycle: "Annual",
  });

  const handleOpenAddModal = () => {
    setEditingCategory(null);
    setFormData({
      title: "",
      targetGrades: "Grade 1-8",
      amount: 1000,
      cycle: "Annual",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cat) => {
    setEditingCategory(cat);
    setFormData({
      title: cat.title,
      targetGrades: cat.targetGrades,
      amount: cat.amount,
      cycle: cat.cycle,
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      // Edit
      setFeeCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? {
                ...c,
                title: formData.title,
                targetGrades: formData.targetGrades,
                amount: Number(formData.amount),
                cycle: formData.cycle,
              }
            : c,
        ),
      );
    } else {
      // Add
      const newCategory = {
        id: `FE-${Math.floor(100 + Math.random() * 900)}`,
        title: formData.title,
        targetGrades: formData.targetGrades,
        amount: Number(formData.amount),
        cycle: formData.cycle,
      };
      setFeeCategories((prev) => [...prev, newCategory]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this fee category?")) {
      setFeeCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="fees-view">
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Fee Management</h1>
          <span className="page-subtitle">
            Track fees structure, payments and pending.
          </span>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">
            <Download size={16} />
            <span>Export Excel</span>
          </button>
          <button className="btn btn-primary" onClick={handleOpenAddModal}>
            <Plus size={16} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card green-border">
          <div className="stat-header">
            <div className="stat-icon-wrapper green">
              <FileCheck size={22} />
            </div>
            <div className="stat-trend positive">
              <span>94%</span>
            </div>
          </div>
          <span className="stat-value">$25,200</span>
          <span className="stat-label">Total collected</span>
          <span className="stat-subtext">Collected this term</span>
        </div>

        <div className="stat-card orange-border">
          <div className="stat-header">
            <div className="stat-icon-wrapper orange">
              <Wallet size={22} />
            </div>
            <div
              className="stat-trend negative"
              style={{ backgroundColor: "#fffbeb", color: "#b54708" }}
            >
              <span>6%</span>
            </div>
          </div>
          <span className="stat-value">$11,800</span>
          <span className="stat-label">Pending/Partial</span>
          <span className="stat-subtext">Remaining to collect</span>
        </div>

        <div className="stat-card red-border">
          <div className="stat-header">
            <div className="stat-icon-wrapper red">
              <DollarSign size={22} />
            </div>
            <div className="stat-trend negative">
              <span>Critical</span>
            </div>
          </div>
          <span className="stat-value">$6,600</span>
          <span className="stat-label">Total overdue</span>
          <span className="stat-subtext">12 students overdue</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-navigation">
        <button
          className={`tab-btn ${activeSubTab === "structure" ? "active" : ""}`}
          onClick={() => setActiveSubTab("structure")}
        >
          Fee Structure
        </button>
        <button
          className={`tab-btn ${activeSubTab === "payments" ? "active" : ""}`}
          onClick={() => setActiveSubTab("payments")}
        >
          Payments
        </button>
        <button
          className={`tab-btn ${activeSubTab === "pending" ? "active" : ""}`}
          onClick={() => setActiveSubTab("pending")}
        >
          Pending dues
        </button>
      </div>

      {activeSubTab === "structure" && (
        <>
          <div className="chart-title-group" style={{ marginBottom: "20px" }}>
            <h3 className="chart-title" style={{ fontSize: "20px" }}>
              Fee Categories
            </h3>
            <span className="chart-subtitle">
              Define and manage school fee categories
            </span>
          </div>

          <div className="cards-grid">
            {feeCategories.map((cat) => (
              <div key={cat.id} className="fee-card">
                <div className="fee-card-header">
                  <div className="fee-icon-wrapper">
                    <DollarSign size={20} />
                  </div>
                  <div className="class-card-actions">
                    <button
                      className="table-action-btn edit"
                      onClick={() => handleOpenEditModal(cat)}
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      className="table-action-btn delete"
                      onClick={() => handleDeleteCategory(cat.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3 className="fee-title">{cat.title}</h3>
                <span className="fee-target">{cat.targetGrades}</span>

                <div className="fee-amount-row">
                  <span className="fee-amount">
                    ${cat.amount.toLocaleString()}
                  </span>
                  <span className="fee-cycle-badge">{cat.cycle}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeSubTab !== "structure" && (
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
            Payments record tracker displays here
          </p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "Edit Fee Category" : "Add Fee Category"}
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleFormSubmit}>
              {editingCategory ? "Save Changes" : "Add Category"}
            </button>
          </>
        }
      >
        <form onSubmit={handleFormSubmit}>
          <div className="form-group" style={{ marginBottom: "12px" }}>
            <label className="form-label">Category Title</label>
            <input
              type="text"
              name="title"
              className="form-input"
              placeholder="e.g. Tuition Fee"
              value={formData.title}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Target Grades</label>
              <input
                type="text"
                name="targetGrades"
                className="form-input"
                placeholder="e.g. Grade 1-5"
                value={formData.targetGrades}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Amount ($)</label>
              <input
                type="number"
                name="amount"
                className="form-input"
                value={formData.amount}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: "12px" }}>
            <label className="form-label">Billing Cycle</label>
            <select
              name="cycle"
              className="form-select"
              value={formData.cycle}
              onChange={handleFormChange}
            >
              <option value="Annual">Annual</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};
