import React, { useState } from "react";
import {
  Download,
  TrendingUp,
  DollarSign,
  Wallet,
  FileText,
  CheckCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

export const Reports = () => {
  const [activeSubTab, setActiveSubTab] = useState("financial");

  // Chart Colors
  const COLORS = ["#3b4dfe", "#12b76a", "#f79009", "#f04438", "#98a2b3"];

  // Financial Data
  const financialMonthlyData = [
    { month: "Jan", Collected: 35 },
    { month: "Feb", Collected: 48 },
    { month: "Mar", Collected: 65 },
    { month: "Apr", Collected: 52 },
    { month: "May", Collected: 78 },
    { month: "Jun", Collected: 92 },
    { month: "Jul", Collected: 68 },
    { month: "Aug", Collected: 55 },
    { month: "Sep", Collected: 84 },
    { month: "Oct", Collected: 72 },
    { month: "Nov", Collected: 66 },
    { month: "Dec", Collected: 80 },
  ];

  const feeCategoryData = [
    { name: "Tuition", value: 65 },
    { name: "Transport", value: 15 },
    { name: "Activity", value: 10 },
    { name: "Library", value: 5 },
    { name: "Other", value: 5 },
  ];

  // Attendance Analysis Data
  const attendanceMonthlyData = [
    { month: "Aug", Students: 92, Staff: 94 },
    { month: "Sep", Students: 90, Staff: 92 },
    { month: "Oct", Students: 93, Staff: 95 },
    { month: "Nov", Students: 88, Staff: 91 },
    { month: "Dec", Students: 85, Staff: 89 },
    { month: "Jan", Students: 94, Staff: 96 },
    { month: "Feb", Students: 91, Staff: 93 },
    { month: "Mar", Students: 92, Staff: 94 },
    { month: "Apr", Students: 93, Staff: 95 },
  ];

  const attendanceBreakdownData = [
    { name: "Present", value: 75 },
    { name: "Absent", value: 12 },
    { name: "Late", value: 8 },
    { name: "Excuse", value: 5 },
  ];

  return (
    <div className="reports-view">
      <div className="page-header">
        <div className="page-title-group">
          <h1 className="page-title">Report & Analysis</h1>
          <span className="page-subtitle">
            Comprehensive school performance insights and export tools
          </span>
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary">
            <Download size={16} />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-navigation">
        <button
          className={`tab-btn ${activeSubTab === "academic" ? "active" : ""}`}
          onClick={() => setActiveSubTab("academic")}
        >
          Academic Reports
        </button>
        <button
          className={`tab-btn ${activeSubTab === "financial" ? "active" : ""}`}
          onClick={() => setActiveSubTab("financial")}
        >
          Financial Reports
        </button>
        <button
          className={`tab-btn ${activeSubTab === "attendance" ? "active" : ""}`}
          onClick={() => setActiveSubTab("attendance")}
        >
          Attendance Analysis
        </button>
      </div>

      {/* 1. FINANCIAL REPORTS SUBTAB */}
      {activeSubTab === "financial" && (
        <>
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card green-border">
              <div className="stat-header">
                <div className="stat-icon-wrapper green">
                  <DollarSign size={20} />
                </div>
                <div className="stat-trend positive">
                  <TrendingUp size={12} />
                  <span>9.2%</span>
                </div>
              </div>
              <span className="stat-value">$525k</span>
              <span className="stat-label">Total Collected</span>
              <span className="stat-subtext">9.2% vs last year</span>
            </div>

            <div className="stat-card orange-border">
              <div className="stat-header">
                <div className="stat-icon-wrapper orange">
                  <Wallet size={20} />
                </div>
                <div
                  className="stat-trend negative"
                  style={{ backgroundColor: "#fffbeb", color: "#b54708" }}
                >
                  <span>24 students</span>
                </div>
              </div>
              <span className="stat-value">$48k</span>
              <span className="stat-label">Pending dues</span>
              <span className="stat-subtext">24 students pending</span>
            </div>

            <div className="stat-card red-border">
              <div className="stat-header">
                <div className="stat-icon-wrapper red">
                  <FileText size={20} />
                </div>
                <div className="stat-trend negative">
                  <span>12 Overdue</span>
                </div>
              </div>
              <span className="stat-value">$25k</span>
              <span className="stat-label">Overdue Amounts</span>
              <span className="stat-subtext">12 Overdue bills</span>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-title-group">
                <h3 className="chart-title">Monthly collection Fee 2026</h3>
                <span className="chart-subtitle">
                  Monthly total fee collections
                </span>
              </div>
              <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                  <BarChart
                    data={financialMonthlyData}
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
                      fill="#8884d8"
                      name="Collection"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-title-group">
                <h3 className="chart-title">Fee by Category</h3>
                <span className="chart-subtitle">
                  Fee category distribution
                </span>
              </div>
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={feeCategoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {feeCategoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Custom Legend */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginTop: "16px",
                }}
              >
                {feeCategoryData.map((entry, index) => (
                  <div
                    key={entry.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></span>
                      <span style={{ color: "var(--text-secondary)" }}>
                        {entry.name}
                      </span>
                    </div>
                    <span style={{ fontWeight: 600 }}>{entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 2. ATTENDANCE ANALYSIS SUBTAB */}
      {activeSubTab === "attendance" && (
        <>
          <div
            className="stats-grid"
            style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
          >
            <div className="stat-card blue-border">
              <span className="stat-value">91.2%</span>
              <span className="stat-label">Overall Attendance</span>
              <span className="stat-subtext">1.5% vs last month</span>
            </div>
            <div className="stat-card green-border">
              <span className="stat-value">75%</span>
              <span className="stat-label">Present Rate</span>
              <span className="stat-subtext">Avg across all classes</span>
            </div>
            <div className="stat-card orange-border">
              <span className="stat-value">12%</span>
              <span className="stat-label">Absent Rate</span>
              <span className="stat-subtext">0.8% vs last month</span>
            </div>
            <div className="stat-card red-border">
              <span className="stat-value">8%</span>
              <span className="stat-label">Late Arrivals</span>
              <span className="stat-subtext">Flagged this term</span>
            </div>
          </div>

          <div className="charts-grid">
            <div className="chart-card">
              <div className="chart-title-group">
                <h3 className="chart-title">
                  Monthly Attendance Students vs Staff
                </h3>
                <span className="chart-subtitle">
                  Historical attendance trends
                </span>
              </div>
              <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                  <AreaChart
                    data={attendanceMonthlyData}
                    margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorStudents"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--primary)"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--primary)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorStaff"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#12b76a"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="#12b76a"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      stroke="var(--text-secondary)"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="var(--text-secondary)"
                      fontSize={12}
                      domain={[60, 100]}
                    />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="Students"
                      stroke="var(--primary)"
                      fillOpacity={1}
                      fill="url(#colorStudents)"
                      strokeWidth={3}
                    />
                    <Area
                      type="monotone"
                      dataKey="Staff"
                      stroke="#12b76a"
                      fillOpacity={1}
                      fill="url(#colorStaff)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-title-group">
                <h3 className="chart-title">Attendance breakdown</h3>
                <span className="chart-subtitle">Breakdown distribution</span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 260,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={attendanceBreakdownData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {attendanceBreakdownData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                {/* Donut Center Count */}
                <div
                  style={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "24px", fontWeight: 800 }}>
                    100%
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "var(--text-light)",
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    Total
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginTop: "16px",
                }}
              >
                {attendanceBreakdownData.map((entry, index) => (
                  <div
                    key={entry.name}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      ></span>
                      <span style={{ color: "var(--text-secondary)" }}>
                        {entry.name}
                      </span>
                    </div>
                    <span style={{ fontWeight: 600 }}>{entry.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 3. ACADEMIC REPORTS */}
      {activeSubTab === "academic" && (
        <div
          style={{
            background: "#fff",
            padding: "48px",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
            textAlign: "center",
          }}
        >
          <CheckCircle
            size={40}
            color="var(--success)"
            style={{ margin: "0 auto 16px auto" }}
          />
          <h4
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "18px",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            Academic Records Synchronized
          </h4>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "14px",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            Overall school grade index stands at B+ (84.6%). All exam results
            and grading registers are finalized.
          </p>
        </div>
      )}
    </div>
  );
};
