import React from "react";
import { Search, Bell, HelpCircle } from "lucide-react";

export const Header = ({
  searchQuery,
  setSearchQuery,
  role,
  notificationsCount,
  onNotificationsClick,
  currentTab,
}) => {
  const getPlaceholder = (tab) => {
    switch (tab) {
      case "dashboard":
        return "Search dashboard overview...";
      case "user-management":
      case "students":
        return "Search students, staff, or parents...";
      case "academic":
        return "Search classes, subjects, or exams...";
      case "my-classes":
        return "Search my classes and rooms...";
      case "attendance":
        return "Search student or staff attendance...";
      case "fees":
        return "Search fee categories...";
      case "communication":
        return "Search announcements...";
      case "documents":
        return "Search documents and certificates...";
      case "assignment":
        return "Search assignments...";
      case "exams-marks":
        return "Search exam result sheets...";
      case "messages":
        return "Search chat messages...";
      case "settings":
        return "Search school settings and integrations...";
      case "approvals":
        return "Search pending approvals...";
      default:
        return "Search...";
    }
  };

  return (
    <header className="top-header">
      <div className="search-container">
        <Search size={18} color="var(--text-light)" />
        <input
          type="text"
          className="search-input"
          placeholder={getPlaceholder(currentTab)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="header-actions">
        <button className="icon-button" onClick={onNotificationsClick}>
          <Bell size={20} />
          {notificationsCount > 0 && (
            <span className="notification-badge">{notificationsCount}</span>
          )}
        </button>

        <button className="icon-button">
          <HelpCircle size={20} />
        </button>

        <div className="header-user-profile">
          <div
            className="user-info"
            style={{ alignItems: "flex-end", color: "var(--text-primary)" }}
          >
            <span style={{ fontSize: "14px", fontWeight: 600 }}>
              Sarah Johnson
            </span>
            <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
              {role === "Admin" ? "Administrator" : "Teacher"}
            </span>
          </div>
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
            alt="Sarah Johnson profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid var(--border-color)",
            }}
          />
        </div>
      </div>
    </header>
  );
};
