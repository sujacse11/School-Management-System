import React from "react";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarDays,
  DollarSign,
  MessageSquareShare,
  BarChart3,
  FolderClosed,
  Settings,
  FileCheck,
  LogOut,
  FileSpreadsheet,
  Award,
  MessagesSquare,
} from "lucide-react";

export const Sidebar = ({ currentTab, setCurrentTab, role, onLogout }) => {
  // Menu definitions for Admin View
  const adminMenuItems = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "user-management", name: "User Management", icon: Users },
    { id: "academic", name: "Academic", icon: BookOpen },
    { id: "attendance", name: "Attendance", icon: CalendarDays },
    { id: "fees", name: "Fees", icon: DollarSign },
    { id: "communication", name: "Communication", icon: MessageSquareShare },
    { id: "reports", name: "Reports", icon: BarChart3 },
    { id: "documents", name: "Documents", icon: FolderClosed },
    { id: "settings", name: "Settings", icon: Settings },
    { id: "approvals", name: "Approvals", icon: FileCheck },
  ];

  // Menu definitions for Teacher View
  const teacherMenuItems = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "my-classes", name: "My Classes", icon: BookOpen },
    { id: "students", name: "Students", icon: Users },
    { id: "attendance", name: "Attendance", icon: CalendarDays },
    { id: "assignment", name: "Assignment", icon: FileSpreadsheet },
    { id: "exams-marks", name: "Exams & Marks", icon: Award },
    { id: "messages", name: "Messages", icon: MessagesSquare },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  const activeMenuItems = role === "Admin" ? adminMenuItems : teacherMenuItems;

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div className="logo-icon">
          <GraduationCap size={24} color="#ffffff" />
        </div>
        <span className="logo-text">EduSmart</span>
      </div>

      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderRadius: "var(--radius-md)",
          padding: "10px 16px",
          marginBottom: "24px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          fontSize: "14px",
          fontWeight: 600,
          color: "#ffffff",
          textAlign: "center",
          fontFamily: "var(--font-heading)",
          letterSpacing: "0.2px",
        }}
      >
        {role === "Admin" ? "Admin Portal" : "Teacher Portal"}
      </div>

      <nav className="nav-links">
        {activeMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <div
              key={item.id}
              className={`nav-link ${isActive ? "active" : ""}`}
              onClick={() => setCurrentTab(item.id)}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile-summary">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
            alt="Sarah Johnson avatar"
            className="user-avatar"
          />

          <div className="user-info">
            <span className="user-name">Sarah Johnson</span>
            <span className="user-role">
              {role === "Admin" ? "Super Admin" : "Math Teacher"}
            </span>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
