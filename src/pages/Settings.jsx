import React, { useState } from "react";
import { Plus, Calendar, Check, Building2, UserCheck, Cpu } from "lucide-react";
import { Modal } from "../components/Modal";

export const Settings = ({
  role,
  academicYears,
  setAcademicYears,
  schoolSettings,
  setSchoolSettings,
  rolePermissions,
  setRolePermissions,
  integrations,
  setIntegrations,
}) => {
  const [activeSubTab, setActiveSubTab] = useState("academic-year");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");

  // Form for adding Academic Year (Admin)
  const [yearData, setYearData] = useState({
    year: "",
    startDate: "",
    endDate: "",
    status: "Past",
  });

  // Profile forms (Teacher)
  const [profileData, setProfileData] = useState({
    name: "Ms. Sarah Johnson",
    email: "sarah.johnson@oakwood.edu",
    phone: "6300458649",
    subject: "Mathematics",
    dept: "Science & Mathematics",
    bio: "Experienced mathematics teacher with 8 years in secondary education, passionate about making complex concepts accessible to all students.",
  });

  // School profile form state (Admin)
  const [schoolForm, setSchoolForm] = useState({ ...schoolSettings });

  const handleOpenAddYear = () => {
    setYearData({
      year: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      status: "Past",
    });
    setIsModalOpen(true);
  };

  const handleYearSubmit = (e) => {
    e.preventDefault();
    const newYear = {
      id: `AY-${Date.now()}`,
      year: yearData.year,
      startDate: yearData.startDate.replace(/-/g, "/"),
      endDate: yearData.endDate.replace(/-/g, "/"),
      status: yearData.status,
    };

    // If setting to Current, mark others as Past
    if (yearData.status === "Current") {
      setAcademicYears((prev) => prev.map((y) => ({ ...y, status: "Past" })));
    }

    setAcademicYears((prev) => [newYear, ...prev]);
    setIsModalOpen(false);
    triggerToast("Academic Year added successfully!");
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    triggerToast("Profile changes saved successfully!");
  };

  const handleSchoolProfileSubmit = (e) => {
    e.preventDefault();
    setSchoolSettings(schoolForm);
    triggerToast("School profile updated successfully!");
  };

  const handlePermissionToggle = (key) => {
    setRolePermissions((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      triggerToast("Permission role settings updated!");
      return updated;
    });
  };

  const handleIntegrationToggle = (key) => {
    setIntegrations((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      triggerToast(
        updated[key] ? "Integration connected!" : "Integration disconnected!",
      );
      return updated;
    });
  };

  const triggerToast = (text) => {
    setToastText(text);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="settings-view">
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
          <span>{toastText}</span>
        </div>
      )}

      {role === "Admin" ? (
        // ================= ADMIN SETTINGS VIEW =================
        <>
          <div className="page-header">
            <div className="page-title-group">
              <h1 className="page-title">Settings</h1>
              <span className="page-subtitle">
                Configure school profile, permissions, academic years, and
                third-party integrations
              </span>
            </div>
          </div>

          {/* Subtabs for Admin Settings */}
          <div className="tabs-navigation">
            <button
              className={`tab-btn ${activeSubTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveSubTab("profile")}
            >
              School Profile
            </button>
            <button
              className={`tab-btn ${activeSubTab === "roles" ? "active" : ""}`}
              onClick={() => setActiveSubTab("roles")}
            >
              Roles & Permissions
            </button>
            <button
              className={`tab-btn ${activeSubTab === "academic-year" ? "active" : ""}`}
              onClick={() => setActiveSubTab("academic-year")}
            >
              Academic Year
            </button>
            <button
              className={`tab-btn ${activeSubTab === "integration" ? "active" : ""}`}
              onClick={() => setActiveSubTab("integration")}
            >
              Integration
            </button>
          </div>

          {/* 1. School Profile Subtab */}
          {activeSubTab === "profile" && (
            <div
              className="settings-card"
              style={{
                background: "#fff",
                padding: "32px",
                borderRadius: "12px",
                border: "1px solid var(--border-color)",
                marginTop: "24px",
              }}
            >
              <h3
                className="chart-title"
                style={{
                  fontSize: "18px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Building2 size={20} color="var(--primary)" />
                <span>School Profile Details</span>
              </h3>
              <form onSubmit={handleSchoolProfileSubmit}>
                <div className="form-grid" style={{ marginBottom: "16px" }}>
                  <div className="form-group">
                    <label className="form-label">School Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={schoolForm.name}
                      onChange={(e) =>
                        setSchoolForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Principal Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={schoolForm.principal}
                      onChange={(e) =>
                        setSchoolForm((prev) => ({
                          ...prev,
                          principal: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="form-grid" style={{ marginBottom: "16px" }}>
                  <div className="form-group">
                    <label className="form-label">Established Year</label>
                    <input
                      type="text"
                      className="form-input"
                      value={schoolForm.established}
                      onChange={(e) =>
                        setSchoolForm((prev) => ({
                          ...prev,
                          established: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Website URL</label>
                    <input
                      type="text"
                      className="form-input"
                      value={schoolForm.website}
                      onChange={(e) =>
                        setSchoolForm((prev) => ({
                          ...prev,
                          website: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: "16px" }}>
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-input"
                    value={schoolForm.address}
                    onChange={(e) =>
                      setSchoolForm((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className="form-grid" style={{ marginBottom: "24px" }}>
                  <div className="form-group">
                    <label className="form-label">Contact Phone</label>
                    <input
                      type="text"
                      className="form-input"
                      value={schoolForm.phone}
                      onChange={(e) =>
                        setSchoolForm((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Email</label>
                    <input
                      type="email"
                      className="form-input"
                      value={schoolForm.email}
                      onChange={(e) =>
                        setSchoolForm((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <button className="btn btn-primary" type="submit">
                  Save School Profile
                </button>
              </form>
            </div>
          )}

          {/* 2. Roles & Permissions Subtab */}
          {activeSubTab === "roles" && (
            <div
              className="settings-card"
              style={{
                background: "#fff",
                padding: "32px",
                borderRadius: "12px",
                border: "1px solid var(--border-color)",
                marginTop: "24px",
              }}
            >
              <h3
                className="chart-title"
                style={{
                  fontSize: "18px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <UserCheck size={20} color="var(--primary)" />
                <span>Portal Access Control Rules</span>
              </h3>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 0",
                    borderBottom: "1px solid var(--border-color)",
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 600 }}>
                      Self-Registration for Students
                    </h4>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Allow students to register their own accounts on the login
                      portal.
                    </p>
                  </div>
                  <label
                    className="switch"
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "44px",
                      height: "24px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={rolePermissions.studentRegistration}
                      onChange={() =>
                        handlePermissionToggle("studentRegistration")
                      }
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />

                    <span
                      style={{
                        position: "absolute",
                        cursor: "pointer",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: rolePermissions.studentRegistration
                          ? "var(--primary)"
                          : "#ccc",
                        transition: ".4s",
                        borderRadius: "24px",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          content: '""',
                          height: "18px",
                          width: "18px",
                          left: rolePermissions.studentRegistration
                            ? "22px"
                            : "4px",
                          bottom: "3px",
                          backgroundColor: "white",
                          transition: ".4s",
                          borderRadius: "50%",
                        }}
                      />
                    </span>
                  </label>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 0",
                    borderBottom: "1px solid var(--border-color)",
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 600 }}>
                      Teacher Attendance Entry Lock
                    </h4>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Grant teachers write access to log daily student
                      attendance metrics.
                    </p>
                  </div>
                  <label
                    className="switch"
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "44px",
                      height: "24px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={rolePermissions.teacherAttendance}
                      onChange={() =>
                        handlePermissionToggle("teacherAttendance")
                      }
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />

                    <span
                      style={{
                        position: "absolute",
                        cursor: "pointer",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: rolePermissions.teacherAttendance
                          ? "var(--primary)"
                          : "#ccc",
                        transition: ".4s",
                        borderRadius: "24px",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          content: '""',
                          height: "18px",
                          width: "18px",
                          left: rolePermissions.teacherAttendance
                            ? "22px"
                            : "4px",
                          bottom: "3px",
                          backgroundColor: "white",
                          transition: ".4s",
                          borderRadius: "50%",
                        }}
                      />
                    </span>
                  </label>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 0",
                    borderBottom: "1px solid var(--border-color)",
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 600 }}>
                      Parent-Teacher Messaging Portal
                    </h4>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Activate internal chat features allowing parents to
                      message class instructors.
                    </p>
                  </div>
                  <label
                    className="switch"
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "44px",
                      height: "24px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={rolePermissions.parentMessaging}
                      onChange={() => handlePermissionToggle("parentMessaging")}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />

                    <span
                      style={{
                        position: "absolute",
                        cursor: "pointer",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: rolePermissions.parentMessaging
                          ? "var(--primary)"
                          : "#ccc",
                        transition: ".4s",
                        borderRadius: "24px",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          content: '""',
                          height: "18px",
                          width: "18px",
                          left: rolePermissions.parentMessaging
                            ? "22px"
                            : "4px",
                          bottom: "3px",
                          backgroundColor: "white",
                          transition: ".4s",
                          borderRadius: "50%",
                        }}
                      />
                    </span>
                  </label>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 0",
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 600 }}>
                      Stripe Portal Online Fee Collection
                    </h4>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Let parents process tuition payment categories directly
                      via online credit card systems.
                    </p>
                  </div>
                  <label
                    className="switch"
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "44px",
                      height: "24px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={rolePermissions.feeOnlinePayment}
                      onChange={() =>
                        handlePermissionToggle("feeOnlinePayment")
                      }
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />

                    <span
                      style={{
                        position: "absolute",
                        cursor: "pointer",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: rolePermissions.feeOnlinePayment
                          ? "var(--primary)"
                          : "#ccc",
                        transition: ".4s",
                        borderRadius: "24px",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          content: '""',
                          height: "18px",
                          width: "18px",
                          left: rolePermissions.feeOnlinePayment
                            ? "22px"
                            : "4px",
                          bottom: "3px",
                          backgroundColor: "white",
                          transition: ".4s",
                          borderRadius: "50%",
                        }}
                      />
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* 3. Academic Years Subtab */}
          {activeSubTab === "academic-year" && (
            <>
              <div className="page-header" style={{ margin: "16px 0" }}>
                <div className="page-title-group">
                  <h3 className="chart-title">Academic Years</h3>
                  <span className="chart-subtitle">
                    Manage school academic year calendar
                  </span>
                </div>
                <button className="btn btn-primary" onClick={handleOpenAddYear}>
                  <Plus size={16} />
                  <span>Add Year</span>
                </button>
              </div>

              {/* List of Years */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {academicYears.map((ay) => (
                  <div
                    key={ay.id}
                    className="stat-card"
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 24px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <div
                        className="stat-icon-wrapper blue"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <Calendar size={20} />
                      </div>
                      <div>
                        <h4
                          className="class-title"
                          style={{ fontSize: "16px" }}
                        >
                          {ay.year}
                        </h4>
                        <span
                          className="page-subtitle"
                          style={{ fontSize: "12px" }}
                        >
                          {ay.startDate} - {ay.endDate}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`status-pill ${ay.status === "Current" ? "active" : "inactive"}`}
                      style={{
                        backgroundColor:
                          ay.status === "Current" ? "#edfcf2" : "#f2f4f7",
                        color: ay.status === "Current" ? "#027a48" : "#667085",
                        border: "1px solid transparent",
                      }}
                    >
                      {ay.status}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* 4. Integration Subtab */}
          {activeSubTab === "integration" && (
            <div
              className="settings-card"
              style={{
                background: "#fff",
                padding: "32px",
                borderRadius: "12px",
                border: "1px solid var(--border-color)",
                marginTop: "24px",
              }}
            >
              <h3
                className="chart-title"
                style={{
                  fontSize: "18px",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Cpu size={20} color="var(--primary)" />
                <span>Third-Party Connected Services</span>
              </h3>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {/* Google Workspace */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 0",
                    borderBottom: "1px solid var(--border-color)",
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 600 }}>
                      Google Workspace (Classroom & Drive)
                    </h4>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Automate homework distribution sheets and file uploads via
                      cloud repositories.
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: integrations.googleWorkspace
                          ? "var(--success)"
                          : "var(--text-light)",
                        fontWeight: 600,
                      }}
                    >
                      {integrations.googleWorkspace
                        ? "CONNECTED"
                        : "DISCONNECTED"}
                    </span>
                    <label
                      className="switch"
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "44px",
                        height: "24px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={integrations.googleWorkspace}
                        onChange={() =>
                          handleIntegrationToggle("googleWorkspace")
                        }
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />

                      <span
                        style={{
                          position: "absolute",
                          cursor: "pointer",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: integrations.googleWorkspace
                            ? "var(--primary)"
                            : "#ccc",
                          transition: ".4s",
                          borderRadius: "24px",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            content: '""',
                            height: "18px",
                            width: "18px",
                            left: integrations.googleWorkspace ? "22px" : "4px",
                            bottom: "3px",
                            backgroundColor: "white",
                            transition: ".4s",
                            borderRadius: "50%",
                          }}
                        />
                      </span>
                    </label>
                  </div>
                </div>

                {/* MS Teams */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 0",
                    borderBottom: "1px solid var(--border-color)",
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 600 }}>
                      Microsoft Teams (LMS Video Calls)
                    </h4>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Bind live video lecture events and chat groups directly
                      into teacher classrooms.
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: integrations.msTeams
                          ? "var(--success)"
                          : "var(--text-light)",
                        fontWeight: 600,
                      }}
                    >
                      {integrations.msTeams ? "CONNECTED" : "DISCONNECTED"}
                    </span>
                    <label
                      className="switch"
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "44px",
                        height: "24px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={integrations.msTeams}
                        onChange={() => handleIntegrationToggle("msTeams")}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />

                      <span
                        style={{
                          position: "absolute",
                          cursor: "pointer",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: integrations.msTeams
                            ? "var(--primary)"
                            : "#ccc",
                          transition: ".4s",
                          borderRadius: "24px",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            content: '""',
                            height: "18px",
                            width: "18px",
                            left: integrations.msTeams ? "22px" : "4px",
                            bottom: "3px",
                            backgroundColor: "white",
                            transition: ".4s",
                            borderRadius: "50%",
                          }}
                        />
                      </span>
                    </label>
                  </div>
                </div>

                {/* Zoom */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 0",
                    borderBottom: "1px solid var(--border-color)",
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 600 }}>
                      Zoom Education SDK
                    </h4>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Generate meeting links dynamically when scheduling
                      assignments or online lessons.
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: integrations.zoomEdu
                          ? "var(--success)"
                          : "var(--text-light)",
                        fontWeight: 600,
                      }}
                    >
                      {integrations.zoomEdu ? "CONNECTED" : "DISCONNECTED"}
                    </span>
                    <label
                      className="switch"
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "44px",
                        height: "24px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={integrations.zoomEdu}
                        onChange={() => handleIntegrationToggle("zoomEdu")}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />

                      <span
                        style={{
                          position: "absolute",
                          cursor: "pointer",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: integrations.zoomEdu
                            ? "var(--primary)"
                            : "#ccc",
                          transition: ".4s",
                          borderRadius: "24px",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            content: '""',
                            height: "18px",
                            width: "18px",
                            left: integrations.zoomEdu ? "22px" : "4px",
                            bottom: "3px",
                            backgroundColor: "white",
                            transition: ".4s",
                            borderRadius: "50%",
                          }}
                        />
                      </span>
                    </label>
                  </div>
                </div>

                {/* Stripe */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 0",
                    borderBottom: "1px solid var(--border-color)",
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 600 }}>
                      Stripe Payment Gateway
                    </h4>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Synchronize live payment transactions for transport,
                      activity, and library categories.
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: integrations.stripePayments
                          ? "var(--success)"
                          : "var(--text-light)",
                        fontWeight: 600,
                      }}
                    >
                      {integrations.stripePayments
                        ? "CONNECTED"
                        : "DISCONNECTED"}
                    </span>
                    <label
                      className="switch"
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "44px",
                        height: "24px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={integrations.stripePayments}
                        onChange={() =>
                          handleIntegrationToggle("stripePayments")
                        }
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />

                      <span
                        style={{
                          position: "absolute",
                          cursor: "pointer",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: integrations.stripePayments
                            ? "var(--primary)"
                            : "#ccc",
                          transition: ".4s",
                          borderRadius: "24px",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            content: '""',
                            height: "18px",
                            width: "18px",
                            left: integrations.stripePayments ? "22px" : "4px",
                            bottom: "3px",
                            backgroundColor: "white",
                            transition: ".4s",
                            borderRadius: "50%",
                          }}
                        />
                      </span>
                    </label>
                  </div>
                </div>

                {/* Twilio */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 0",
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: "14px", fontWeight: 600 }}>
                      Twilio SMS Gateway
                    </h4>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Deliver instant SMS text alerts to parents for urgent
                      announcements or child absences.
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: integrations.twilioSms
                          ? "var(--success)"
                          : "var(--text-light)",
                        fontWeight: 600,
                      }}
                    >
                      {integrations.twilioSms ? "CONNECTED" : "DISCONNECTED"}
                    </span>
                    <label
                      className="switch"
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "44px",
                        height: "24px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={integrations.twilioSms}
                        onChange={() => handleIntegrationToggle("twilioSms")}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />

                      <span
                        style={{
                          position: "absolute",
                          cursor: "pointer",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: integrations.twilioSms
                            ? "var(--primary)"
                            : "#ccc",
                          transition: ".4s",
                          borderRadius: "24px",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            content: '""',
                            height: "18px",
                            width: "18px",
                            left: integrations.twilioSms ? "22px" : "4px",
                            bottom: "3px",
                            backgroundColor: "white",
                            transition: ".4s",
                            borderRadius: "50%",
                          }}
                        />
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Academic Year Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add Academic Year"
            footer={
              <>
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleYearSubmit}>
                  Add Year
                </button>
              </>
            }
          >
            <form onSubmit={handleYearSubmit}>
              <div className="form-group" style={{ marginBottom: "12px" }}>
                <label className="form-label">Academic Year Name</label>
                <input
                  type="text"
                  name="year"
                  className="form-input"
                  placeholder="e.g. 2026-2027"
                  value={yearData.year}
                  onChange={(e) =>
                    setYearData((prev) => ({ ...prev, year: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="form-grid" style={{ marginBottom: "12px" }}>
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    className="form-input"
                    value={yearData.startDate}
                    onChange={(e) =>
                      setYearData((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    className="form-input"
                    value={yearData.endDate}
                    onChange={(e) =>
                      setYearData((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Academic Year Status</label>
                <select
                  className="form-select"
                  value={yearData.status}
                  onChange={(e) =>
                    setYearData((prev) => ({ ...prev, status: e.target.value }))
                  }
                >
                  <option value="Past">Past</option>
                  <option value="Current">Current</option>
                </select>
              </div>
            </form>
          </Modal>
        </>
      ) : (
        // ================= TEACHER SETTINGS VIEW =================
        <>
          <div className="page-header" style={{ marginBottom: "16px" }}>
            <div className="page-title-group">
              <h1 className="page-title">Settings</h1>
              <span className="page-subtitle">
                Manage your account preferences and profile
              </span>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit}>
            {/* suggestions container */}
            <div className="settings-suggestions">
              <div
                style={{ display: "flex", alignItems: "center", gap: "16px" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                  alt="Sarah Avatar"
                  className="settings-profile-avatar"
                  style={{ margin: 0 }}
                />

                <div>
                  <h3 className="settings-profile-name">{profileData.name}</h3>
                  <span className="settings-profile-subject">
                    {profileData.subject}, {profileData.dept}
                  </span>
                  <p className="settings-profile-date">Joined August 2019</p>
                </div>
              </div>
            </div>

            {/* Profile fields card */}
            <div className="settings-card" style={{ marginBottom: "24px" }}>
              <div className="form-grid" style={{ marginBottom: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-grid" style={{ marginBottom: "16px" }}>
                <div className="form-group">
                  <label className="form-label">Phone number</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-input"
                    value={profileData.subject}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        subject: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "16px" }}>
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-input"
                  value={profileData.dept}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      dept: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: "20px" }}>
                <label className="form-label">Bio</label>
                <textarea
                  className="form-textarea"
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  required
                />
              </div>

              <button className="btn btn-primary" type="submit">
                Save Changes
              </button>
            </div>

            {/* Notification toggle preferences */}
            <div className="settings-card">
              <h3
                className="chart-title"
                style={{ fontSize: "18px", marginBottom: "16px" }}
              >
                Notifications
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--border-color)",
                }}
              >
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: 600 }}>
                    Assignment Submissions
                  </h4>
                  <p
                    style={{ fontSize: "12px", color: "var(--text-secondary)" }}
                  >
                    Get notified when students submit assignments.
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 0",
                }}
              >
                <div>
                  <h4 style={{ fontSize: "14px", fontWeight: 600 }}>
                    Urgent Messages
                  </h4>
                  <p
                    style={{ fontSize: "12px", color: "var(--text-secondary)" }}
                  >
                    Direct notifications when parents contact you.
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  style={{ width: "20px", height: "20px" }}
                />
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};
