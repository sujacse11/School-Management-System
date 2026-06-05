import React from "react";
import {
  Users,
  Building2,
  GraduationCap,
  DollarSign,
  Clock,
  FileCheck,
  TrendingUp,
  Bell,
  AlertTriangle,
  CheckCircle,
  FileSpreadsheet,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const Dashboard = ({
  role,
  students,
  classes,
  approvals,
  announcements,
  onApprove,
  setCurrentTab,
  searchQuery = "",
}) => {
  // Mock chart data
  const attendanceData = [
    { day: "Mon", Student: 75, Staff: 90 },
    { day: "Tue", Student: 82, Staff: 92 },
    { day: "Wed", Student: 78, Staff: 88 },
    { day: "Thu", Student: 88, Staff: 95 },
    { day: "Fri", Student: 85, Staff: 91 },
    { day: "Sat", Student: 92, Staff: 96 },
    { day: "Sun", Student: 90, Staff: 94 },
  ];

  const feeCollectionData = [
    { month: "Jan", Collected: 35 },
    { month: "Feb", Collected: 48 },
    { month: "Mar", Collected: 65 },
    { month: "Apr", Collected: 52 },
    { month: "May", Collected: 78 },
    { month: "Jun", Collected: 92 },
  ];

  // Activities feed
  const activities = [
    {
      text: "Liam Smith admitted to Grade 5",
      sub: "Admin Elena",
      time: "3 minutes ago",
      color: "blue",
      icon: Users,
    },
    {
      text: "Emily Brown paid fee for Term 1",
      sub: "Emily Brown",
      time: "12 minutes ago",
      color: "green",
      icon: DollarSign,
    },
    {
      text: "Emily Brown admitted to Grade 6",
      sub: "Admin Elena",
      time: "25 minutes ago",
      color: "blue",
      icon: Users,
    },
    {
      text: "Emily Brown paid fee for Term 2",
      sub: "Emily Brown",
      time: "1 hour ago",
      color: "green",
      icon: DollarSign,
    },
    {
      text: "Attendance marked for grade 5A",
      sub: "Sarah Connor",
      time: "2 hours ago",
      color: "purple",
      icon: Clock,
    },
    {
      text: "Annual sports day announcement Published",
      sub: "Principal Johnsen",
      time: "3 hours ago",
      color: "orange",
      icon: Bell,
    },
  ];

  // Alerts
  const alerts = [
    {
      id: 1,
      type: "info",
      title: "New Admission Request",
      desc: "A new admission request has been submitted for Grade 5",
      count: "4 New",
    },
    {
      id: 2,
      type: "warning",
      title: "Approval Request",
      desc: "Sarah Connor submitted a leave request",
      count: "Action Needed",
    },
    {
      id: 3,
      type: "danger",
      title: "Fee payment overdue",
      desc: "12 Students have overdue fee payments",
      count: "Urgent",
    },
    {
      id: 4,
      type: "success",
      title: "Attendance Alert",
      desc: "Attendance below 75% for 5 students this week",
      count: "Alert",
    },
  ];

  const pendingApprovals = approvals
    .filter((a) => a.status === "Pending")
    .slice(0, 3);

  // Teacher tasks data array
  const teacherTasks = [
    {
      id: "t1",
      title: "Grade 10-A Math Quiz",
      subtitle: "Quadratic Equations",
      badge: "8 to grade",
      details: "8 submissions need grading before June 8.",
      actionText: "Go to Grading Sheet",
      tab: "exams-marks",
      btnClass: "btn-primary",
    },
    {
      id: "t2",
      title: "Attendance Correction",
      subtitle: "Robert Chen",
      badge: "1 pending",
      details: "Correction request for Emma Watson on April 12.",
      actionText: "Review Attendance Sheet",
      tab: "attendance",
      btnClass: "btn-secondary",
    },
  ];

  // Filter lists based on searchQuery
  const filteredActivities = activities.filter(
    (act) =>
      !searchQuery ||
      act.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.sub.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAlerts = alerts.filter(
    (al) =>
      !searchQuery ||
      al.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      al.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPendingApprovals = pendingApprovals.filter(
    (req) =>
      !searchQuery ||
      req.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTeacherTasks = teacherTasks.filter(
    (task) =>
      !searchQuery ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Admin stats
  const activeStudentsCount = students.length;
  const adminStats = [
    {
      title: "Total Students",
      value: "1,250",
      change: "+3.5%",
      isPositive: true,
      subtext: "Enrolled this year",
      icon: GraduationCap,
      color: "purple",
    },
    {
      title: "Total Staff",
      value: "85",
      change: "+1.2%",
      isPositive: true,
      subtext: "Active employees",
      icon: Users,
      color: "blue",
    },
    {
      title: "Total Classes",
      value: `${classes.length + 42}`,
      change: "+0.8%",
      isPositive: true,
      subtext: "Across all grades",
      icon: Building2,
      color: "green",
    },
    {
      title: "Total Revenue",
      value: "$152k",
      change: "+3.1%",
      isPositive: true,
      subtext: "Collected this term",
      icon: DollarSign,
      color: "orange",
    },
  ];

  // Teacher stats
  const teacherStats = [
    {
      title: "Active Assignments",
      value: "12",
      change: "Active",
      isPositive: true,
      subtext: "Assigned to classes",
      icon: FileSpreadsheet,
      color: "blue",
    },
    {
      title: "Needs Grading",
      value: "8",
      change: "Due",
      isPositive: false,
      subtext: "Submissions waiting",
      icon: Clock,
      color: "orange",
    },
    {
      title: "My Classes",
      value: "4",
      change: "Classes",
      isPositive: true,
      subtext: "Grades 10A, 10B, 10C, 10D",
      icon: GraduationCap,
      color: "purple",
    },
    {
      title: "Average Attendance",
      value: "91.2%",
      change: "+1.5%",
      isPositive: true,
      subtext: "For current term",
      icon: FileCheck,
      color: "green",
    },
  ];

  const activeStats = role === "Admin" ? adminStats : teacherStats;

  return (
    <div className="dashboard-view">
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Dashboard</h1>
          <span className="page-subtitle">
            Welcome Back, Sarah. Here's what's happening today.
          </span>
        </div>
        <div className="page-actions">
          {role === "Admin" ? (
            <>
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentTab("user-management")}
              >
                + Add Student
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setCurrentTab("communication")}
              >
                New Announcement
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentTab("my-classes")}
              >
                My Classes
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setCurrentTab("assignment")}
              >
                + Create Assignment
              </button>
            </>
          )}
        </div>
      </div>

      {/* Grid Cards */}
      <div className="stats-grid">
        {activeStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <div className={`stat-icon-wrapper ${stat.color}`}>
                  <Icon size={22} />
                </div>
                <div
                  className={`stat-trend ${stat.isPositive ? "positive" : "negative"}`}
                >
                  <TrendingUp size={12} />
                  <span>{stat.change}</span>
                </div>
              </div>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.title}</span>
              <span className="stat-subtext">{stat.subtext}</span>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-title-group">
            <h3 className="chart-title">Attendance Overview</h3>
            <span className="chart-subtitle">
              Last 7 days across all classes
            </span>
          </div>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart
                data={attendanceData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="day"
                  stroke="var(--text-secondary)"
                  fontSize={12}
                />
                <YAxis
                  stroke="var(--text-secondary)"
                  fontSize={12}
                  domain={[50, 100]}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Student"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />

                {role === "Admin" && (
                  <Line
                    type="monotone"
                    dataKey="Staff"
                    stroke="#12b76a"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-title-group">
            <h3 className="chart-title">
              {role === "Admin" ? "Fee Collection" : "Performance Distribution"}
            </h3>
            <span className="chart-subtitle">
              {role === "Admin"
                ? "Monthly collection ($k)"
                : "Avg Math score by grade (%)"}
            </span>
          </div>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={
                  role === "Admin"
                    ? feeCollectionData
                    : [
                        { month: "G3", Collected: 78 },
                        { month: "G4", Collected: 82 },
                        { month: "G5", Collected: 88 },
                        { month: "G6", Collected: 74 },
                        { month: "G7", Collected: 80 },
                        { month: "G8", Collected: 85 },
                      ]
                }
                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  stroke="var(--text-secondary)"
                  fontSize={12}
                />
                <YAxis stroke="var(--text-secondary)" fontSize={12} />
                <Tooltip />
                <Bar
                  dataKey="Collected"
                  fill="var(--sidebar-bg)"
                  radius={[4, 4, 0, 0]}
                  name={role === "Admin" ? "Amount ($)" : "Grade (%)"}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom columns */}
      <div className="dashboard-bottom-grid">
        {/* Recent Activity */}
        <div className="feed-card">
          <div className="chart-title-group">
            <h3 className="chart-title">Recent Activity</h3>
            <span className="chart-subtitle">Live updates from today</span>
          </div>
          <div className="feed-list">
            {filteredActivities.map((act, index) => {
              const Icon = act.icon;
              return (
                <div key={index} className="feed-item">
                  <div className={`feed-icon ${act.color}`}>
                    <Icon size={16} />
                  </div>
                  <div className="feed-content">
                    <span className="feed-title">{act.text}</span>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "2px",
                      }}
                    >
                      <span className="feed-subtitle">{act.sub}</span>
                      <span className="feed-time">{act.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alerts Notifications */}
        <div className="feed-card">
          <div
            className="chart-title-group"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h3 className="chart-title">Alerts</h3>
              <span className="chart-subtitle">Critical updates</span>
            </div>
            <span className="alert-badge">4 Unread</span>
          </div>
          <div style={{ overflowY: "auto", flexGrow: 1 }}>
            {filteredAlerts.map((al) => (
              <div key={al.id} className={`alert-item ${al.type}`}>
                <AlertTriangle size={18} className="alert-icon" />
                <div className="alert-details">
                  <span className="alert-text-title">{al.title}</span>
                  <span className="alert-text-desc">{al.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals / Grading Task */}
        <div className="feed-card">
          <div className="chart-title-group">
            <h3 className="chart-title">
              {role === "Admin" ? "Pending Approvals" : "Pending Tasks"}
            </h3>
            <span className="chart-subtitle">
              Requires your immediate action
            </span>
          </div>
          <div style={{ overflowY: "auto", flexGrow: 1 }}>
            {role === "Admin" ? (
              filteredPendingApprovals.length > 0 ? (
                filteredPendingApprovals.map((req) => (
                  <div key={req.id} className="approval-item">
                    <div className="approval-item-header">
                      <div className="approval-user-info">
                        <span className="approval-username">
                          {req.requester}
                        </span>
                        <span className="approval-userrole">{req.role}</span>
                      </div>
                      <span className="approval-badge pending">
                        {req.status}
                      </span>
                    </div>
                    <div className="approval-details">
                      <strong>{req.type}:</strong> {req.details}
                    </div>
                    <div className="approval-actions">
                      <button
                        className="approval-btn approve"
                        onClick={() => onApprove(req.id, true)}
                      >
                        Approve
                      </button>
                      <button
                        className="approval-btn reject"
                        onClick={() => onApprove(req.id, false)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "24px",
                    color: "var(--text-light)",
                  }}
                >
                  <CheckCircle
                    size={32}
                    style={{ marginBottom: "8px", color: "var(--success)" }}
                  />
                  <p style={{ fontSize: "13px" }}>
                    All requests have been reviewed!
                  </p>
                </div>
              )
            ) : (
              // Teacher actions: Grading pending list
              <div className="teacher-tasks">
                {filteredTeacherTasks.length > 0 ? (
                  filteredTeacherTasks.map((task) => (
                    <div key={task.id} className="approval-item">
                      <div className="approval-item-header">
                        <div className="approval-user-info">
                          <span className="approval-username">
                            {task.title}
                          </span>
                          <span className="approval-userrole">
                            {task.subtitle}
                          </span>
                        </div>
                        <span
                          className="approval-badge pending"
                          style={task.id === "t1" ? { background: "#eef2ff", color: "#4f46ed" } : {}}
                        >
                          {task.badge}
                        </span>
                      </div>
                      <div className="approval-details">{task.details}</div>
                      <button
                        className={`btn ${task.btnClass}`}
                        style={{ width: "100%", padding: "8px" }}
                        onClick={() => setCurrentTab(task.tab)}
                      >
                        {task.actionText}
                      </button>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "24px",
                      color: "var(--text-light)",
                    }}
                  >
                    <CheckCircle
                      size={32}
                      style={{ marginBottom: "8px", color: "var(--success)" }}
                    />
                    <p style={{ fontSize: "13px" }}>All tasks are completed!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
