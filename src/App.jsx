import React, { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { AIAssistant } from "./components/AIAssistant";
import { GraduationCap, Mail, Lock } from "lucide-react";

// Pages import
import { Dashboard } from "./pages/Dashboard";
import { UserManagement } from "./pages/UserManagement";
import { Academic } from "./pages/Academic";
import { MyClasses } from "./pages/MyClasses";
import { Attendance } from "./pages/Attendance";
import { Fees } from "./pages/Fees";
import { Communication } from "./pages/Communication";
import { Reports } from "./pages/Reports";
import { Documents } from "./pages/Documents";
import { Assignments } from "./pages/Assignments";
import { ExamsMarks } from "./pages/ExamsMarks";
import { Messages } from "./pages/Messages";
import { Settings } from "./pages/Settings";
import { Approvals } from "./pages/Approvals";
import { ParentDashboard } from "./pages/ParentDashboard";

// ================= INITIAL MOCK DATA =================
const initialStudents = [
  {
    id: "STU-24001",
    name: "Alex Johnson",
    email: "alex.j@example.com",
    phone: "8493208401",
    dob: "2015-05-14",
    grade: "Grade 5",
    section: "A",
    status: "Active",
    joinedDate: "Oct 24, 2023",
    parentName: "Michael Johnson",
    parentPhone: "8503432890",
    avatar: "https://images.unsplash.com/photo-1542186938-df9626455120?w=150",
    subjects: {
      math: { score: 92, grade: "A+", attendance: 95 },
      science: { score: 88, grade: "A", attendance: 98 },
      english: { score: 85, grade: "A-", attendance: 92 }
    },
    gpa: "3.8",
    attendanceRate: "95%",
    pendingAssignments: 2,
    feeStatus: "Paid",
    room: "105",
    advisor: "Sarah Connor"
  },
  {
    id: "STU-24002",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    phone: "8493208402",
    dob: "2014-03-22",
    grade: "Grade 5",
    section: "A",
    status: "Active",
    joinedDate: "Oct 11, 2023",
    parentName: "Emma Williams",
    parentPhone: "8503432891",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    subjects: {
      math: { score: 95, grade: "A+", attendance: 98 },
      science: { score: 94, grade: "A+", attendance: 97 },
      english: { score: 90, grade: "A", attendance: 99 }
    },
    gpa: "3.9",
    attendanceRate: "98%",
    pendingAssignments: 1,
    feeStatus: "Paid",
    room: "105",
    advisor: "Sarah Connor"
  },
  {
    id: "STU-24003",
    name: "David Chen",
    email: "david.c@example.com",
    phone: "8493208403",
    dob: "2016-07-10",
    grade: "Grade 5",
    section: "A",
    status: "Active",
    joinedDate: "Oct 18, 2023",
    parentName: "Robert Chen",
    parentPhone: "8503432892",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
    subjects: {
      math: { score: 85, grade: "A-", attendance: 93 },
      science: { score: 87, grade: "B+", attendance: 90 },
      english: { score: 80, grade: "B", attendance: 92 }
    },
    gpa: "3.5",
    attendanceRate: "92%",
    pendingAssignments: 3,
    feeStatus: "Unpaid",
    room: "105",
    advisor: "Sarah Connor"
  },
  {
    id: "STU-24004",
    name: "Maya Patel",
    email: "maya.p@example.com",
    phone: "8493208404",
    dob: "2013-11-05",
    grade: "Grade 5",
    section: "A",
    status: "Active",
    joinedDate: "Oct 15, 2023",
    parentName: "Sanjay Patel",
    parentPhone: "8503432893",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    subjects: {
      math: { score: 89, grade: "A-", attendance: 95 },
      science: { score: 91, grade: "A", attendance: 94 },
      english: { score: 86, grade: "B+", attendance: 93 }
    },
    gpa: "3.7",
    attendanceRate: "94%",
    pendingAssignments: 2,
    feeStatus: "Paid",
    room: "105",
    advisor: "Sarah Connor"
  },
  {
    id: "STU-24005",
    name: "Lucas Silva",
    email: "lucas.s@example.com",
    phone: "8493208405",
    dob: "2015-12-19",
    grade: "Grade 5",
    section: "A",
    status: "Active",
    joinedDate: "Oct 10, 2023",
    parentName: "Maria Silva",
    parentPhone: "8503432894",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
    subjects: {
      math: { score: 80, grade: "B", attendance: 89 },
      science: { score: 82, grade: "B", attendance: 91 },
      english: { score: 78, grade: "C+", attendance: 90 }
    },
    gpa: "3.4",
    attendanceRate: "90%",
    pendingAssignments: 4,
    feeStatus: "Unpaid",
    room: "105",
    advisor: "Sarah Connor"
  },
  {
    id: "STU-24006",
    name: "Amina Okafor",
    email: "amina.o@example.com",
    phone: "8493208406",
    dob: "2014-08-30",
    grade: "Grade 5",
    section: "A",
    status: "Active",
    joinedDate: "Oct 08, 2023",
    parentName: "Chinedu Okafor",
    parentPhone: "8503432895",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    subjects: {
      math: { score: 98, grade: "A+", attendance: 100 },
      science: { score: 99, grade: "A+", attendance: 100 },
      english: { score: 96, grade: "A+", attendance: 100 }
    },
    gpa: "4.0",
    attendanceRate: "100%",
    pendingAssignments: 0,
    feeStatus: "Paid",
    room: "105",
    advisor: "Sarah Connor"
  },
  {
    id: "STU-24007",
    name: "Omar Hassan",
    email: "omar.h@example.com",
    phone: "8493208407",
    dob: "2012-01-25",
    grade: "Grade 5",
    section: "A",
    status: "Active",
    joinedDate: "Oct 06, 2023",
    parentName: "Layla Hassan",
    parentPhone: "8503432896",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    subjects: {
      math: { score: 86, grade: "B+", attendance: 92 },
      science: { score: 89, grade: "A-", attendance: 95 },
      english: { score: 83, grade: "B", attendance: 92 }
    },
    gpa: "3.6",
    attendanceRate: "93%",
    pendingAssignments: 3,
    feeStatus: "Paid",
    room: "105",
    advisor: "Sarah Connor"
  },
  {
    id: "STU-24008",
    name: "Yuki Tanaka",
    email: "yuki.t@example.com",
    phone: "8493208408",
    dob: "2013-09-03",
    grade: "Grade 5",
    section: "A",
    status: "Active",
    joinedDate: "Oct 04, 2023",
    parentName: "Ken Tanaka",
    parentPhone: "8503432897",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    subjects: {
      math: { score: 94, grade: "A+", attendance: 98 },
      science: { score: 95, grade: "A+", attendance: 96 },
      english: { score: 91, grade: "A", attendance: 97 }
    },
    gpa: "3.9",
    attendanceRate: "97%",
    pendingAssignments: 1,
    feeStatus: "Paid",
    room: "105",
    advisor: "Sarah Connor"
  },
  {
    id: "STU-24009",
    name: "Noah Alischer",
    email: "noah.a@example.com",
    phone: "8493208409",
    dob: "2015-02-14",
    grade: "Grade 5",
    section: "A",
    status: "Active",
    joinedDate: "Oct 02, 2023",
    parentName: "Hannah Alischer",
    parentPhone: "8503432898",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150",
    subjects: {
      math: { score: 76, grade: "C", attendance: 86 },
      science: { score: 80, grade: "B-", attendance: 88 },
      english: { score: 74, grade: "C", attendance: 90 }
    },
    gpa: "3.3",
    attendanceRate: "88%",
    pendingAssignments: 5,
    feeStatus: "Unpaid",
    room: "105",
    advisor: "Sarah Connor"
  },
  {
    id: "STU-24010",
    name: "Billy Vance",
    email: "billy.v@example.com",
    phone: "8493208410",
    dob: "2019-05-12",
    grade: "Grade 5",
    section: "A",
    status: "Active",
    joinedDate: "Sep 01, 2025",
    parentName: "James Vance",
    parentPhone: "8503432810",
    avatar: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=150",
    subjects: {
      math: { score: 91, grade: "A", attendance: 96 },
      science: { score: 90, grade: "A", attendance: 95 },
      english: { score: 88, grade: "A-", attendance: 97 }
    },
    gpa: "3.8",
    attendanceRate: "96%",
    pendingAssignments: 2,
    feeStatus: "Paid",
    room: "105",
    advisor: "Sarah Connor"
  },
  {
    id: "STU-24011",
    name: "Lily Evans",
    email: "lily.e@example.com",
    phone: "8493208411",
    dob: "2019-08-20",
    grade: "Grade 1",
    section: "A",
    status: "Active",
    joinedDate: "Sep 03, 2025",
    parentName: "Mark Evans",
    parentPhone: "8503432811",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
  },
  {
    id: "STU-24012",
    name: "Danny Miller",
    email: "danny.m@example.com",
    phone: "8493208412",
    dob: "2018-04-15",
    grade: "Grade 2",
    section: "A",
    status: "Active",
    joinedDate: "Sep 02, 2024",
    parentName: "Alice Miller",
    parentPhone: "8503432812",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
  },
  {
    id: "STU-24013",
    name: "Sophie Turner",
    email: "sophie.t@example.com",
    phone: "8493208413",
    dob: "2018-11-30",
    grade: "Grade 2",
    section: "A",
    status: "Active",
    joinedDate: "Sep 05, 2024",
    parentName: "John Turner",
    parentPhone: "8503432813",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150",
  },
  {
    id: "STU-24014",
    name: "Leo Martinez",
    email: "leo.m@example.com",
    phone: "8493208414",
    dob: "2017-02-10",
    grade: "Grade 3",
    section: "A",
    status: "Active",
    joinedDate: "Sep 01, 2023",
    parentName: "Carlos Martinez",
    parentPhone: "8503432814",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  {
    id: "STU-24015",
    name: "Grace Hopper",
    email: "grace.h@example.com",
    phone: "8493208415",
    dob: "2011-12-09",
    grade: "Grade 9",
    section: "A",
    status: "Active",
    joinedDate: "Sep 01, 2021",
    parentName: "Mary Hopper",
    parentPhone: "8503432815",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  },
  {
    id: "STU-24016",
    name: "Alan Turing",
    email: "alan.t@example.com",
    phone: "8493208416",
    dob: "2011-06-23",
    grade: "Grade 9",
    section: "A",
    status: "Active",
    joinedDate: "Sep 01, 2021",
    parentName: "Sarah Turing",
    parentPhone: "8503432816",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  {
    id: "STU-24017",
    name: "Emma Watson",
    email: "emma.wa@example.com",
    phone: "8493208417",
    dob: "2010-04-15",
    grade: "Grade 10",
    section: "A",
    status: "Active",
    joinedDate: "Sep 01, 2020",
    parentName: "Richard Watson",
    parentPhone: "8503432817",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  {
    id: "STU-24018",
    name: "Lucas Garcia",
    email: "lucas.g@example.com",
    phone: "8493208418",
    dob: "2010-09-08",
    grade: "Grade 10",
    section: "A",
    status: "Active",
    joinedDate: "Sep 02, 2020",
    parentName: "George Garcia",
    parentPhone: "8503432818",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
  {
    id: "STU-24019",
    name: "Sophia Chen",
    email: "sophia.c@example.com",
    phone: "8493208419",
    dob: "2010-06-20",
    grade: "Grade 10",
    section: "B",
    status: "Active",
    joinedDate: "Sep 01, 2020",
    parentName: "Helen Chen",
    parentPhone: "8503432819",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
  },
  {
    id: "STU-24020",
    name: "Olivia Smith",
    email: "olivia.s@example.com",
    phone: "8493208420",
    dob: "2010-03-01",
    grade: "Grade 10",
    section: "B",
    status: "Active",
    joinedDate: "Sep 01, 2020",
    parentName: "John Smith",
    parentPhone: "8503432820",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
  },
];

const initialStaff = [
  {
    id: "STF-10023",
    name: "Elena Rostova",
    email: "elena.r@example.com",
    phone: "9483028301",
    role: "Administrator",
    department: "Administration",
    status: "Active",
    joinedDate: "May 10, 2021",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
  },
  {
    id: "STF-10024",
    name: "Sarah Connor",
    email: "sarah.c@example.com",
    phone: "9483028302",
    role: "Academic Teacher",
    department: "Academic",
    status: "Active",
    joinedDate: "Aug 14, 2019",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
  },
  {
    id: "STF-10025",
    name: "Robert Chen",
    email: "robert.c@example.com",
    phone: "9483028303",
    role: "Academic Teacher",
    department: "Academic",
    status: "Active",
    joinedDate: "Jan 05, 2022",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
  {
    id: "STF-10026",
    name: "Lisa Park",
    email: "lisa.p@example.com",
    phone: "9483028304",
    role: "Academic Teacher",
    department: "Academic",
    status: "Active",
    joinedDate: "Sep 11, 2020",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
  },
  {
    id: "STF-10027",
    name: "David Kim",
    email: "david.k@example.com",
    phone: "9483028305",
    role: "Academic Teacher",
    department: "Academic",
    status: "Active",
    joinedDate: "Dec 18, 2023",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  {
    id: "STF-10028",
    name: "Emily Watson",
    email: "emily.w@example.com",
    phone: "9483028306",
    role: "Academic Teacher",
    department: "Academic",
    status: "Active",
    joinedDate: "Sep 01, 2024",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
  },
  {
    id: "STF-10029",
    name: "Michael Chang",
    email: "michael.c@example.com",
    phone: "9483028307",
    role: "Academic Teacher",
    department: "Academic",
    status: "Active",
    joinedDate: "Oct 15, 2023",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
  {
    id: "STF-10030",
    name: "Maria Santos",
    email: "maria.s@example.com",
    phone: "9483028308",
    role: "Academic Teacher",
    department: "Academic",
    status: "Active",
    joinedDate: "Aug 20, 2021",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
  },
  {
    id: "STF-10031",
    name: "James Porter",
    email: "james.p@example.com",
    phone: "9483028309",
    role: "Academic Teacher",
    department: "Academic",
    status: "Active",
    joinedDate: "Jun 10, 2020",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150",
  },
  {
    id: "STF-10032",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    phone: "9483028310",
    role: "Academic Teacher",
    department: "Academic",
    status: "Active",
    joinedDate: "Sep 01, 2022",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
  },
  {
    id: "STF-10033",
    name: "John Miller",
    email: "john.m@example.com",
    phone: "9483028311",
    role: "Academic Teacher",
    department: "Academic",
    status: "Active",
    joinedDate: "Jan 15, 2023",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
  },
];

const initialParents = [
  {
    id: "PAR-24001",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    phone: "8503432890",
    studentName: "Alex Johnson",
    studentId: "STU-24001",
    relation: "Father",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
  {
    id: "PAR-24002",
    name: "Emma Williams",
    email: "emma.w@example.com",
    phone: "8503432891",
    studentName: "Sarah Williams",
    studentId: "STU-24002",
    relation: "Mother",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
  },
  {
    id: "PAR-24003",
    name: "Robert Chen",
    email: "robert.c@example.com",
    phone: "8503432892",
    studentName: "David Chen",
    studentId: "STU-24003",
    relation: "Father",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  {
    id: "PAR-24004",
    name: "Sanjay Patel",
    email: "sanjay.p@example.com",
    phone: "8503432893",
    studentName: "Maya Patel",
    studentId: "STU-24004",
    relation: "Father",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
  {
    id: "PAR-24005",
    name: "Maria Silva",
    email: "maria.s@example.com",
    phone: "8503432894",
    studentName: "Lucas Silva",
    studentId: "STU-24005",
    relation: "Mother",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
  },
  {
    id: "PAR-24006",
    name: "Chinedu Okafor",
    email: "chinedu.o@example.com",
    phone: "8503432895",
    studentName: "Amina Okafor",
    studentId: "STU-24006",
    relation: "Father",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  {
    id: "PAR-24007",
    name: "Layla Hassan",
    email: "layla.h@example.com",
    phone: "8503432896",
    studentName: "Omar Hassan",
    studentId: "STU-24007",
    relation: "Mother",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
  },
  {
    id: "PAR-24008",
    name: "Ken Tanaka",
    email: "ken.t@example.com",
    phone: "8503432897",
    studentName: "Yuki Tanaka",
    studentId: "STU-24008",
    relation: "Father",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
  {
    id: "PAR-24009",
    name: "Hannah Alischer",
    email: "hannah.a@example.com",
    phone: "8503432898",
    studentName: "Noah Alischer",
    studentId: "STU-24009",
    relation: "Mother",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
  },
  {
    id: "PAR-24010",
    name: "James Vance",
    email: "james.v@example.com",
    phone: "8503432810",
    studentName: "Billy Vance",
    studentId: "STU-24010",
    relation: "Father",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  },
];

const initialClasses = [
  {
    id: "CLS-1008",
    grade: "Grade 1",
    section: "A",
    room: "101",
    studentCount: 18,
    teacher: "Emily Watson",
    schedule: "Mon - Fri 8:00-14:00",
  },
  {
    id: "CLS-1009",
    grade: "Grade 2",
    section: "A",
    room: "102",
    studentCount: 19,
    teacher: "Michael Chang",
    schedule: "Mon - Fri 8:00-14:00",
  },
  {
    id: "CLS-1007",
    grade: "Grade 3",
    section: "A",
    room: "103",
    studentCount: 21,
    teacher: "David Kim",
    schedule: "Mon - Fri 8:00-15:00",
  },
  {
    id: "CLS-1003",
    grade: "Grade 4",
    section: "A",
    room: "104",
    studentCount: 20,
    teacher: "Maria Santos",
    schedule: "Mon - Fri 8:00-14:30",
  },
  {
    id: "CLS-1001",
    grade: "Grade 5",
    section: "A",
    room: "105",
    studentCount: 22,
    teacher: "Sarah Connor",
    schedule: "Mon - Fri 8:00-15:00",
  },
  {
    id: "CLS-1005",
    grade: "Grade 5",
    section: "B",
    room: "106",
    studentCount: 20,
    teacher: "Lisa Park",
    schedule: "Mon - Fri 8:00-15:30",
  },
  {
    id: "CLS-1002",
    grade: "Grade 6",
    section: "B",
    room: "205",
    studentCount: 24,
    teacher: "Robert Chen",
    schedule: "Mon - Fri 8:00-15:30",
  },
  {
    id: "CLS-1004",
    grade: "Grade 7",
    section: "C",
    room: "207",
    studentCount: 26,
    teacher: "James Porter",
    schedule: "Mon - Fri 8:00-16:00",
  },
  {
    id: "CLS-1006",
    grade: "Grade 8",
    section: "A",
    room: "208",
    studentCount: 25,
    teacher: "Alice Johnson",
    schedule: "Mon - Fri 8:00-14:30",
  },
  {
    id: "CLS-1010",
    grade: "Grade 9",
    section: "A",
    room: "301",
    studentCount: 28,
    teacher: "John Miller",
    schedule: "Mon - Fri 8:00-15:30",
  },
  {
    id: "CLS-1011",
    grade: "Grade 10",
    section: "A",
    room: "302",
    studentCount: 30,
    teacher: "Sarah Connor",
    schedule: "Mon - Fri 8:00-16:00",
  },
  {
    id: "CLS-1012",
    grade: "Grade 10",
    section: "B",
    room: "303",
    studentCount: 28,
    teacher: "Robert Chen",
    schedule: "Mon - Fri 8:00-16:00",
  },
];

const initialTeacherClasses = [
  {
    id: "TCLS-101",
    className: "Grade 10-A Maths",
    gradeSection: "Grade 10-A",
    subject: "Mathematics",
    studentCount: 30,
    room: "302",
    schedule: "Mon, Wed, Fri 9:00 AM",
  },
  {
    id: "TCLS-102",
    className: "Grade 10-B Maths",
    gradeSection: "Grade 10-B",
    subject: "Mathematics",
    studentCount: 28,
    room: "303",
    schedule: "Tue, Thu 9:00 AM",
  },
  {
    id: "TCLS-103",
    className: "Grade 5-A Maths",
    gradeSection: "Grade 5-A",
    subject: "Mathematics",
    studentCount: 22,
    room: "105",
    schedule: "Mon, Tue, Thu 11:00 AM",
  },
  {
    id: "TCLS-104",
    className: "Grade 6-B Science",
    gradeSection: "Grade 6-B",
    subject: "Science",
    studentCount: 24,
    room: "205",
    schedule: "Wed, Fri 11:00 AM",
  },
];

const initialAttendance = [
  {
    studentId: "STU-24010",
    rollNo: "STU-24010",
    name: "Billy Vance",
    grade: "Grade 1",
    section: "A",
    status: "Present",
    remarks: "",
  },
  {
    studentId: "STU-24011",
    rollNo: "STU-24011",
    name: "Lily Evans",
    grade: "Grade 1",
    section: "A",
    status: "Present",
    remarks: "",
  },
  {
    studentId: "STU-24012",
    rollNo: "STU-24012",
    name: "Danny Miller",
    grade: "Grade 2",
    section: "A",
    status: "Present",
    remarks: "",
  },
  {
    studentId: "STU-24013",
    rollNo: "STU-24013",
    name: "Sophie Turner",
    grade: "Grade 2",
    section: "A",
    status: "Present",
    remarks: "",
  },
  {
    studentId: "STU-24014",
    rollNo: "STU-24014",
    name: "Leo Martinez",
    grade: "Grade 3",
    section: "A",
    status: "Present",
    remarks: "",
  },
  {
    studentId: "STU-24003",
    rollNo: "STU-24003",
    name: "David Chen",
    grade: "Grade 4",
    section: "A",
    status: "Present",
    remarks: "",
  },
  {
    studentId: "STU-24001",
    rollNo: "STU-24001",
    name: "Alex Johnson",
    grade: "Grade 5",
    section: "A",
    status: "Present",
    remarks: "",
  },
  {
    studentId: "STU-24002",
    rollNo: "STU-24002",
    name: "Sarah Williams",
    grade: "Grade 6",
    section: "B",
    status: "Absent",
    remarks: "Sick leave",
  },
  {
    studentId: "STU-24004",
    rollNo: "STU-24004",
    name: "Maya Patel",
    grade: "Grade 7",
    section: "C",
    status: "Late",
    remarks: "10 min late",
  },
  {
    studentId: "STU-24007",
    rollNo: "STU-24007",
    name: "Omar Hassan",
    grade: "Grade 8",
    section: "A",
    status: "Present",
    remarks: "",
  },
  {
    studentId: "STU-24015",
    rollNo: "STU-24015",
    name: "Grace Hopper",
    grade: "Grade 9",
    section: "A",
    status: "Present",
    remarks: "",
  },
  {
    studentId: "STU-24017",
    rollNo: "STU-24017",
    name: "Emma Watson",
    grade: "Grade 10",
    section: "A",
    status: "Present",
    remarks: "",
  },
];

const initialFeeCategories = [
  {
    id: "FE-1",
    title: "Tuition Fee",
    targetGrades: "Grade 1-5",
    amount: 5200,
    cycle: "Annual",
  },
  {
    id: "FE-2",
    title: "Activity Fee",
    targetGrades: "Grade 1-8",
    amount: 800,
    cycle: "Annual",
  },
  {
    id: "FE-3",
    title: "Transport Fee",
    targetGrades: "Grade 1-8",
    amount: 1200,
    cycle: "Annual",
  },
  {
    id: "FE-4",
    title: "Library Fee",
    targetGrades: "Grade 1-8",
    amount: 400,
    cycle: "Annual",
  },
  {
    id: "FE-5",
    title: "Lab Fee",
    targetGrades: "Grade 6-10",
    amount: 600,
    cycle: "Annual",
  },
  {
    id: "FE-6",
    title: "Sports Fee",
    targetGrades: "Grade 1-10",
    amount: 350,
    cycle: "Quarterly",
  },
];

const initialAnnouncements = [
  {
    id: "ANN-1",
    title: "Annual Sports Day 2026",
    priority: "High",
    status: "Published",
    content:
      "We are excited to announce our annual sports day on April 25th. All students are encouraged to participate in at least one event. Practice Sessions start from Monday.",
    audience: "Everyone",
    date: "2026-04-10",
    author: "Principal Johnsen",
    expires: "2026-04-25",
  },
  {
    id: "ANN-2",
    title: "Parent Teacher Conference Schedule",
    priority: "Medium",
    status: "Published",
    content:
      "The parent teacher conference is scheduled for April 20th. Please book your slot via the parent portal. Sessions run from 9AM to 5PM.",
    audience: "Parent, Staff",
    date: "2026-04-08",
    author: "Admin office",
    expires: "2026-04-20",
  },
  {
    id: "ANN-3",
    title: "Library Book Return Reminder",
    priority: "Low",
    status: "Published",
    content:
      "Please make sure to return all borrowed library books before the upcoming term break to avoid late processing penalties.",
    audience: "Student",
    date: "2026-04-08",
    author: "Library staff",
    expires: "2026-04-15",
  },
  {
    id: "ANN-4",
    title: "Science Fair Registration Open",
    priority: "Medium",
    status: "Published",
    content:
      "Registration for the annual Science Fair is now open. Team submissions and project synopses should be turned in before mid-month.",
    audience: "Student",
    date: "2026-04-08",
    author: "Science department",
    expires: "2026-04-18",
  },
];

const initialDocuments = [
  {
    id: "DOC-1",
    name: "Enrollment Certificate - Liam Smith",
    type: "Certificates",
    size: "245KB",
    date: "2023-03-01",
    uploader: "Admin Office",
  },
  {
    id: "DOC-2",
    name: "Grade 6 Report Card - Emily Brown",
    type: "Report Card",
    size: "180KB",
    date: "2023-02-28",
    uploader: "Robert Chen",
  },
  {
    id: "DOC-3",
    name: "School Calendar 2026",
    type: "Other",
    size: "520KB",
    date: "2026-01-10",
    uploader: "Principal",
  },
  {
    id: "DOC-4",
    name: "Staff Handbook 2026",
    type: "Other",
    size: "12MB",
    date: "2026-01-05",
    uploader: "HR Department",
  },
  {
    id: "DOC-5",
    name: "Student ID - Noah Johnson",
    type: "ID Card",
    size: "95KB",
    date: "2023-04-01",
    uploader: "Admin Office",
  },
  {
    id: "DOC-6",
    name: "Merit Certificate - Emily Brown",
    type: "Certificates",
    size: "210KB",
    date: "2023-03-15",
    uploader: "Principal",
  },
  {
    id: "DOC-7",
    name: "Attendance Certificate - Noah Johnson",
    type: "Certificates",
    size: "195KB",
    date: "2023-03-20",
    uploader: "Office",
  },
  {
    id: "DOC-8",
    name: "Grade 5 Report Card - Ethan Jones",
    type: "Report Card",
    size: "193KB",
    date: "2023-02-10",
    uploader: "Sarah Connor",
  },
  {
    id: "DOC-9",
    name: "Staff Attendance Sheet - April",
    type: "Other",
    size: "88KB",
    date: "2026-04-01",
    uploader: "HR Department",
  },
  {
    id: "DOC-10",
    name: "Fee Receipt - Olivia Williams",
    type: "Other",
    size: "72KB",
    date: "2023-04-05",
    uploader: "Accounts Office",
  },
  {
    id: "DOC-11",
    name: "Student Photo - Sophia Martinez",
    type: "ID Card",
    size: "312KB",
    date: "2023-02-15",
    uploader: "Admin Office",
  },
];

const initialApprovals = [
  {
    id: "REQ-1",
    requester: "Sarah Connor",
    role: "Teacher",
    details: "Medical Leave request for 3 days",
    type: "Leave Request",
    date: "2026-04-10",
    status: "Pending",
  },
  {
    id: "REQ-2",
    requester: "Sarah Connor",
    role: "Teacher",
    details: "Attendance correction for Emma Watson on April 12",
    type: "Attendance Edit",
    date: "2026-04-10",
    status: "Approved",
  },
  {
    id: "REQ-3",
    requester: "Sarah Connor",
    role: "Teacher",
    details: "Final grades revision unit 2",
    type: "Marks Entry",
    date: "2026-04-10",
    status: "Approved",
  },
  {
    id: "REQ-4",
    requester: "James Porter",
    role: "Teacher",
    details: "Medical Leave request for 2 days",
    type: "Leave Request",
    date: "2026-04-10",
    status: "Pending",
  },
  {
    id: "REQ-5",
    requester: "Robert Chen",
    role: "Teacher",
    details: "Attendance edit request Grade 6B",
    type: "Attendance Edit",
    date: "2026-04-10",
    status: "Pending",
  },
  {
    id: "REQ-6",
    requester: "Robert Chen",
    role: "Teacher",
    details: "Sick Leave request for 1 day",
    type: "Leave Request",
    date: "2026-04-10",
    status: "Rejected",
  },
];

const initialAssignments = [
  {
    id: "ASG-1",
    title: "Quadratic Equations Practice Set",
    filesCount: 2,
    groupProject: false,
    classGrade: "Grade 10-A",
    dueDate: "2026-04-15",
    submissionsCount: 28,
    totalStudents: 30,
    status: "Active",
  },
  {
    id: "ASG-2",
    title: "Algebraic Expressions Homework",
    filesCount: 1,
    groupProject: false,
    classGrade: "Grade 10-B",
    dueDate: "2026-04-13",
    submissionsCount: 26,
    totalStudents: 28,
    status: "Needs Grading",
  },
  {
    id: "ASG-3",
    title: "Statistics Chapter 4 Problems",
    filesCount: 3,
    groupProject: false,
    classGrade: "Grade 10-B",
    dueDate: "2026-04-18",
    submissionsCount: 25,
    totalStudents: 28,
    status: "Completed",
  },
  {
    id: "ASG-4",
    title: "Science Lab report 1",
    filesCount: 1,
    groupProject: false,
    classGrade: "Grade 6-B",
    dueDate: "2026-04-10",
    submissionsCount: 12,
    totalStudents: 24,
    status: "Active",
  },
];

const initialExamMarks = [
  {
    studentId: "STU-24017",
    name: "Emma Watson",
    rollNo: "STU-24017",
    math: 92,
    advAlgebra: 88,
    statistics: 95,
    performanceGrade: "Grade A+",
    totalScore: 275,
  },
  {
    studentId: "STU-24019",
    name: "Sophia Chen",
    rollNo: "STU-24019",
    math: 78,
    advAlgebra: 82,
    statistics: 95,
    performanceGrade: "Grade B",
    totalScore: 255,
  },
  {
    studentId: "STU-24018",
    name: "Lucas Garcia",
    rollNo: "STU-24018",
    math: 65,
    advAlgebra: 70,
    statistics: 88,
    performanceGrade: "Grade C",
    totalScore: 223,
  },
  {
    studentId: "STU-24020",
    name: "Olivia Smith",
    rollNo: "STU-24020",
    math: 89,
    advAlgebra: 91,
    statistics: 88,
    performanceGrade: "Grade A-",
    totalScore: 268,
  },
];

const initialChatThreads = [
  {
    id: "TH-1",
    name: "Sarah Smith",
    role: "Parent (Alice Freeman)",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    lastMessage:
      "That's wonderful news! Thank you for the update and your continued support. She has been studying very hard.",
    lastMessageTime: "10:42 AM",
    unreadCount: 0,
    messages: [
      {
        id: "MSG-1-1",
        senderId: "teacher",
        senderName: "Sarah Johnson",
        senderRole: "Teacher",
        content:
          "Good morning Mrs. Smith! I wanted to give you a quick update on Alice's performance in class lately.",
        timestamp: "09:30 AM",
        isSelf: true,
      },
      {
        id: "MSG-1-2",
        senderId: "parent",
        senderName: "Sarah Smith",
        senderRole: "Parent (Alice Freeman)",
        content:
          "Good morning Mr. Fox! Oh, I'd love to hear about it. How is she doing?",
        timestamp: "09:40 AM",
        isSelf: false,
      },
      {
        id: "MSG-1-3",
        senderId: "teacher",
        senderName: "Sarah Johnson",
        senderRole: "Teacher",
        content:
          "She is doing fantastically. She just scored a 92% on her mid-term physics exam! Her practical work has also improved significantly.",
        timestamp: "09:41 AM",
        isSelf: true,
      },
      {
        id: "MSG-1-4",
        senderId: "parent",
        senderName: "Sarah Smith",
        senderRole: "Parent (Alice Freeman)",
        content:
          "That's wonderful news! Thank you for the update and your continued support. She has been studying very hard.",
        timestamp: "10:42 AM",
        isSelf: false,
      },
    ],
  },
  {
    id: "TH-2",
    name: "Michael Johnson",
    role: "Parent (Alex Johnson)",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    lastMessage: "Can we schedule a meeting next Monday to discuss tutoring?",
    lastMessageTime: "09:15 AM",
    unreadCount: 2,
    messages: [
      {
        id: "MSG-2-1",
        senderId: "parent",
        senderName: "Michael Johnson",
        senderRole: "Parent (Alex Johnson)",
        content:
          "Hello Ms. Johnson, I noticed Alex had difficulty in algebra chapter 2.",
        timestamp: "09:10 AM",
        isSelf: false,
      },
      {
        id: "MSG-2-2",
        senderId: "parent",
        senderName: "Michael Johnson",
        senderRole: "Parent (Alex Johnson)",
        content: "Can we schedule a meeting next Monday to discuss tutoring?",
        timestamp: "09:15 AM",
        isSelf: false,
      },
    ],
  },
  {
    id: "TH-3",
    name: "David Martinez",
    role: "Student (Grade 10A)",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    lastMessage:
      "I have submitted my assignment through the portal. Please review it.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    messages: [
      {
        id: "MSG-3-1",
        senderId: "student",
        senderName: "David Martinez",
        senderRole: "Student (Grade 10A)",
        content:
          "I have submitted my assignment through the portal. Please review it.",
        timestamp: "03:45 PM",
        isSelf: false,
      },
      {
        id: "MSG-3-2",
        senderId: "teacher",
        senderName: "Sarah Johnson",
        senderRole: "Teacher",
        content: "Excellent David! I will grade it by this evening.",
        timestamp: "04:15 PM",
        isSelf: true,
      },
    ],
  },
  {
    id: "TH-4",
    name: "Emma Chen",
    role: "Parent (Grace Chen)",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    lastMessage: "Thank you for the feedback, we will work on it.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    messages: [
      {
        id: "MSG-4-1",
        senderId: "teacher",
        senderName: "Sarah Johnson",
        senderRole: "Teacher",
        content:
          "Grace did an excellent job on her science presentation today.",
        timestamp: "02:30 PM",
        isSelf: true,
      },
      {
        id: "MSG-4-2",
        senderId: "parent",
        senderName: "Emma Chen",
        senderRole: "Parent (Grace Chen)",
        content: "Thank you for the feedback, we will work on it.",
        timestamp: "03:10 PM",
        isSelf: false,
      },
    ],
  },
  {
    id: "TH-5",
    name: "Priya Patel",
    role: "Student (Grade 10B)",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    lastMessage: "Sir, could you please explain the homework question 5 again?",
    lastMessageTime: "Monday",
    unreadCount: 1,
    messages: [
      {
        id: "MSG-5-1",
        senderId: "student",
        senderName: "Priya Patel",
        senderRole: "Student (Grade 10B)",
        content: "Sir, could you please explain the homework question 5 again?",
        timestamp: "11:20 AM",
        isSelf: false,
      },
    ],
  },
];

const initialAcademicYears = [
  {
    id: "AY-1",
    year: "2025-2026",
    startDate: "2025/06/01",
    endDate: "2026/06/30",
    status: "Current",
  },
  {
    id: "AY-2",
    year: "2024-2025",
    startDate: "2024/06/01",
    endDate: "2025/06/30",
    status: "Past",
  },
  {
    id: "AY-3",
    year: "2023-2024",
    startDate: "2023/06/01",
    endDate: "2024/06/30",
    status: "Past",
  },
];

const initialSubjects = [
  // Grade 1
  {
    id: "SUB-101",
    name: "English",
    code: "ENG-101",
    grade: "Grade 1",
    teacher: "Emily Watson",
    weeklyHours: 5,
    room: "101",
  },
  {
    id: "SUB-102",
    name: "Mathematics",
    code: "MATH-101",
    grade: "Grade 1",
    teacher: "Emily Watson",
    weeklyHours: 5,
    room: "101",
  },
  {
    id: "SUB-103",
    name: "Art & Craft",
    code: "ART-101",
    grade: "Grade 1",
    teacher: "Emily Watson",
    weeklyHours: 2,
    room: "101",
  },
  // Grade 2
  {
    id: "SUB-201",
    name: "English",
    code: "ENG-201",
    grade: "Grade 2",
    teacher: "Michael Chang",
    weeklyHours: 5,
    room: "102",
  },
  {
    id: "SUB-202",
    name: "Mathematics",
    code: "MATH-202",
    grade: "Grade 2",
    teacher: "Michael Chang",
    weeklyHours: 5,
    room: "102",
  },
  {
    id: "SUB-203",
    name: "General Science",
    code: "SCI-202",
    grade: "Grade 2",
    teacher: "Michael Chang",
    weeklyHours: 4,
    room: "102",
  },
  // Grade 3
  {
    id: "SUB-301",
    name: "English",
    code: "ENG-301",
    grade: "Grade 3",
    teacher: "David Kim",
    weeklyHours: 4,
    room: "103",
  },
  {
    id: "SUB-302",
    name: "Mathematics",
    code: "MATH-301",
    grade: "Grade 3",
    teacher: "David Kim",
    weeklyHours: 5,
    room: "103",
  },
  {
    id: "SUB-303",
    name: "Science",
    code: "SCI-301",
    grade: "Grade 3",
    teacher: "David Kim",
    weeklyHours: 4,
    room: "103",
  },

  // Grade 4
  {
    id: "SUB-401",
    name: "English",
    code: "ENG-401",
    grade: "Grade 4",
    teacher: "Maria Santos",
    weeklyHours: 4,
    room: "104",
  },
  {
    id: "SUB-402",
    name: "Mathematics",
    code: "MATH-401",
    grade: "Grade 4",
    teacher: "Maria Santos",
    weeklyHours: 5,
    room: "104",
  },
  {
    id: "SUB-403",
    name: "Science",
    code: "SCI-401",
    grade: "Grade 4",
    teacher: "Maria Santos",
    weeklyHours: 4,
    room: "104",
  },
  // Grade 5
  {
    id: "SUB-501",
    name: "Mathematics",
    code: "MATH-501",
    grade: "Grade 5",
    teacher: "Sarah Connor",
    weeklyHours: 5,
    room: "105",
  },
  {
    id: "SUB-502",
    name: "Science",
    code: "SCI-501",
    grade: "Grade 5",
    teacher: "Lisa Park",
    weeklyHours: 4,
    room: "105",
  },
  {
    id: "SUB-503",
    name: "English Literature",
    code: "ENG-501",
    grade: "Grade 5",
    teacher: "Elena Rostova",
    weeklyHours: 4,
    room: "105",
  },
  // Grade 6
  {
    id: "SUB-601",
    name: "Science",
    code: "SCI-601",
    grade: "Grade 6",
    teacher: "Robert Chen",
    weeklyHours: 5,
    room: "205",
  },
  {
    id: "SUB-602",
    name: "World History",
    code: "HIST-601",
    grade: "Grade 6",
    teacher: "James Porter",
    weeklyHours: 3,
    room: "205",
  },
  {
    id: "SUB-603",
    name: "English Literature",
    code: "ENG-601",
    grade: "Grade 6",
    teacher: "Elena Rostova",
    weeklyHours: 4,
    room: "205",
  },

  // Grade 7
  {
    id: "SUB-701",
    name: "Physics",
    code: "PHYS-701",
    grade: "Grade 7",
    teacher: "Lisa Park",
    weeklyHours: 4,
    room: "207",
  },
  {
    id: "SUB-702",
    name: "Chemistry",
    code: "CHEM-701",
    grade: "Grade 7",
    teacher: "David Kim",
    weeklyHours: 4,
    room: "207",
  },
  {
    id: "SUB-703",
    name: "English Literature",
    code: "ENG-701",
    grade: "Grade 7",
    teacher: "James Porter",
    weeklyHours: 4,
    room: "207",
  },

  // Grade 8
  {
    id: "SUB-801",
    name: "Biology",
    code: "BIO-801",
    grade: "Grade 8",
    teacher: "Alice Johnson",
    weeklyHours: 3,
    room: "208",
  },
  {
    id: "SUB-802",
    name: "World History",
    code: "HIST-801",
    grade: "Grade 8",
    teacher: "James Porter",
    weeklyHours: 3,
    room: "208",
  },
  {
    id: "SUB-803",
    name: "Mathematics",
    code: "MATH-801",
    grade: "Grade 8",
    teacher: "Alice Johnson",
    weeklyHours: 5,
    room: "208",
  },

  // Grade 9
  {
    id: "SUB-901",
    name: "Mathematics",
    code: "MATH-901",
    grade: "Grade 9",
    teacher: "John Miller",
    weeklyHours: 5,
    room: "301",
  },
  {
    id: "SUB-902",
    name: "Physics",
    code: "PHYS-901",
    grade: "Grade 9",
    teacher: "John Miller",
    weeklyHours: 4,
    room: "301",
  },
  {
    id: "SUB-903",
    name: "Chemistry",
    code: "CHEM-901",
    grade: "Grade 9",
    teacher: "John Miller",
    weeklyHours: 4,
    room: "301",
  },

  // Grade 10
  {
    id: "SUB-1001",
    name: "Mathematics",
    code: "MATH-1001",
    grade: "Grade 10",
    teacher: "Sarah Connor",
    weeklyHours: 5,
    room: "302",
  },
  {
    id: "SUB-1002",
    name: "Advanced Algebra",
    code: "ALG-1001",
    grade: "Grade 10",
    teacher: "Sarah Connor",
    weeklyHours: 4,
    room: "302",
  },
  {
    id: "SUB-1003",
    name: "Statistics",
    code: "STAT-1001",
    grade: "Grade 10",
    teacher: "Robert Chen",
    weeklyHours: 3,
    room: "303",
  },
  {
    id: "SUB-1004",
    name: "Physics",
    code: "PHYS-1001",
    grade: "Grade 10",
    teacher: "Robert Chen",
    weeklyHours: 4,
    room: "303",
  },
  {
    id: "SUB-1005",
    name: "Chemistry",
    code: "CHEM-1001",
    grade: "Grade 10",
    teacher: "Robert Chen",
    weeklyHours: 4,
    room: "303",
  },
];

const generateInitialTimetable = () => {
  const timetableSlots = [];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const subjectsByGrade = {
    "Grade 1": [
      { name: "English", teacher: "Emily Watson", room: "101" },
      { name: "Mathematics", teacher: "Emily Watson", room: "101" },
      { name: "Art & Craft", teacher: "Emily Watson", room: "101" },
    ],
    "Grade 2": [
      { name: "English", teacher: "Michael Chang", room: "102" },
      { name: "Mathematics", teacher: "Michael Chang", room: "102" },
      { name: "General Science", teacher: "Michael Chang", room: "102" },
    ],
    "Grade 3": [
      { name: "English", teacher: "David Kim", room: "103" },
      { name: "Mathematics", teacher: "David Kim", room: "103" },
      { name: "Science", teacher: "David Kim", room: "103" },
    ],
    "Grade 4": [
      { name: "English", teacher: "Maria Santos", room: "104" },
      { name: "Mathematics", teacher: "Maria Santos", room: "104" },
      { name: "Science", teacher: "Maria Santos", room: "104" },
    ],
    "Grade 5": [
      { name: "Mathematics", teacher: "Sarah Connor", room: "105" },
      { name: "Science", teacher: "Lisa Park", room: "105" },
      { name: "English Literature", teacher: "Elena Rostova", room: "105" },
    ],
    "Grade 6": [
      { name: "Science", teacher: "Robert Chen", room: "205" },
      { name: "World History", teacher: "James Porter", room: "205" },
      { name: "English Literature", teacher: "Elena Rostova", room: "205" },
    ],
    "Grade 7": [
      { name: "Physics", teacher: "Lisa Park", room: "207" },
      { name: "Chemistry", teacher: "David Kim", room: "207" },
      { name: "English Literature", teacher: "James Porter", room: "207" },
    ],
    "Grade 8": [
      { name: "Biology", teacher: "Alice Johnson", room: "208" },
      { name: "World History", teacher: "James Porter", room: "208" },
      { name: "Mathematics", teacher: "Alice Johnson", room: "208" },
    ],
    "Grade 9": [
      { name: "Mathematics", teacher: "John Miller", room: "301" },
      { name: "Physics", teacher: "John Miller", room: "301" },
      { name: "Chemistry", teacher: "John Miller", room: "301" },
    ],
    "Grade 10": [
      { name: "Mathematics", teacher: "Sarah Connor", room: "302" },
      { name: "Advanced Algebra", teacher: "Sarah Connor", room: "302" },
      { name: "Statistics", teacher: "Robert Chen", room: "303" },
      { name: "Physics", teacher: "Robert Chen", room: "303" },
      { name: "Chemistry", teacher: "Robert Chen", room: "303" },
    ],
  };

  const classesList = [
    { grade: "Grade 1", section: "A" },
    { grade: "Grade 2", section: "A" },
    { grade: "Grade 3", section: "A" },
    { grade: "Grade 4", section: "A" },
    { grade: "Grade 5", section: "A" },
    { grade: "Grade 5", section: "B" },
    { grade: "Grade 6", section: "B" },
    { grade: "Grade 7", section: "C" },
    { grade: "Grade 8", section: "A" },
    { grade: "Grade 9", section: "A" },
    { grade: "Grade 10", section: "A" },
    { grade: "Grade 10", section: "B" },
  ];

  let idCounter = 1;
  classesList.forEach((cls) => {
    const gradeSubjects = subjectsByGrade[cls.grade] || [];
    if (gradeSubjects.length === 0) return;

    days.forEach((day) => {
      for (let period = 1; period <= 5; period++) {
        const dayIdx = days.indexOf(day);
        const subIdx = (dayIdx + period) % gradeSubjects.length;
        const subject = gradeSubjects[subIdx];

        timetableSlots.push({
          id: `TT-GEN-${idCounter++}`,
          gradeSection: `${cls.grade}-${cls.section}`,
          day,
          period,
          subject: subject.name,
          teacher: subject.teacher,
          room: subject.room,
        });
      }
    });
  });

  return timetableSlots;
};

const initialTimetable = generateInitialTimetable();

const initialExams = [
  {
    id: "EX-001",
    title: "Term 1 Midterm",
    subject: "Mathematics",
    grade: "Grade 1",
    date: "2026-06-15",
    time: "09:00 AM - 10:30 AM",
    totalMarks: 50,
    passingMarks: 18,
  },
  {
    id: "EX-002",
    title: "Term 1 Midterm",
    subject: "Mathematics",
    grade: "Grade 2",
    date: "2026-06-15",
    time: "09:00 AM - 10:30 AM",
    totalMarks: 50,
    passingMarks: 18,
  },
  {
    id: "EX-003",
    title: "Term 1 Midterm",
    subject: "Mathematics",
    grade: "Grade 3",
    date: "2026-06-15",
    time: "09:00 AM - 11:00 AM",
    totalMarks: 100,
    passingMarks: 35,
  },
  {
    id: "EX-004",
    title: "Term 1 Midterm",
    subject: "Mathematics",
    grade: "Grade 4",
    date: "2026-06-15",
    time: "09:00 AM - 11:00 AM",
    totalMarks: 100,
    passingMarks: 35,
  },
  {
    id: "EX-005",
    title: "Term 1 Midterm",
    subject: "Mathematics",
    grade: "Grade 5",
    date: "2026-06-15",
    time: "09:00 AM - 11:00 AM",
    totalMarks: 100,
    passingMarks: 35,
  },
  {
    id: "EX-006",
    title: "Term 1 Midterm",
    subject: "Science",
    grade: "Grade 6",
    date: "2026-06-16",
    time: "09:00 AM - 11:00 AM",
    totalMarks: 100,
    passingMarks: 35,
  },
  {
    id: "EX-007",
    title: "Unit Test 2",
    subject: "Physics",
    grade: "Grade 7",
    date: "2026-06-20",
    time: "01:00 PM - 02:00 PM",
    totalMarks: 50,
    passingMarks: 18,
  },
  {
    id: "EX-008",
    title: "Term 1 Final",
    subject: "Biology",
    grade: "Grade 8",
    date: "2026-06-25",
    time: "09:00 AM - 12:00 PM",
    totalMarks: 100,
    passingMarks: 40,
  },
  {
    id: "EX-009",
    title: "Term 1 Final",
    subject: "Physics",
    grade: "Grade 9",
    date: "2026-06-26",
    time: "09:00 AM - 12:00 PM",
    totalMarks: 100,
    passingMarks: 40,
  },
  {
    id: "EX-010",
    title: "Term 1 Final",
    subject: "Mathematics",
    grade: "Grade 10",
    date: "2026-06-27",
    time: "09:00 AM - 12:00 PM",
    totalMarks: 100,
    passingMarks: 40,
  },
];

const initialStaffAttendance = [
  {
    staffId: "STF-10023",
    name: "Elena Rostova",
    role: "Administrator",
    department: "Administration",
    status: "Present",
    remarks: "",
  },
  {
    staffId: "STF-10024",
    name: "Sarah Connor",
    role: "Academic Teacher",
    department: "Academic",
    status: "Present",
    remarks: "",
  },
  {
    staffId: "STF-10025",
    name: "Robert Chen",
    role: "Academic Teacher",
    department: "Academic",
    status: "Absent",
    remarks: "Medical Leave",
  },
  {
    staffId: "STF-10026",
    name: "Lisa Park",
    role: "Academic Teacher",
    department: "Academic",
    status: "Present",
    remarks: "",
  },
  {
    staffId: "STF-10027",
    name: "David Kim",
    role: "Academic Teacher",
    department: "Academic",
    status: "Late",
    remarks: "Commute delay",
  },
  {
    staffId: "STF-10028",
    name: "Emily Watson",
    role: "Academic Teacher",
    department: "Academic",
    status: "Present",
    remarks: "",
  },
  {
    staffId: "STF-10029",
    name: "Michael Chang",
    role: "Academic Teacher",
    department: "Academic",
    status: "Present",
    remarks: "",
  },
  {
    staffId: "STF-10030",
    name: "Maria Santos",
    role: "Academic Teacher",
    department: "Academic",
    status: "Present",
    remarks: "",
  },
  {
    staffId: "STF-10031",
    name: "James Porter",
    role: "Academic Teacher",
    department: "Academic",
    status: "Present",
    remarks: "",
  },
  {
    staffId: "STF-10032",
    name: "Alice Johnson",
    role: "Academic Teacher",
    department: "Academic",
    status: "Present",
    remarks: "",
  },
  {
    staffId: "STF-10033",
    name: "John Miller",
    role: "Academic Teacher",
    department: "Academic",
    status: "Present",
    remarks: "",
  },
];

export default function App() {
  // Check dataset version and reset if outdated
  const CURRENT_DB_VERSION = "edu_dataset_version_v6";
  if (localStorage.getItem(CURRENT_DB_VERSION) !== "true") {
    localStorage.removeItem("edu_students");
    localStorage.removeItem("edu_staff");
    localStorage.removeItem("edu_parents");
    localStorage.removeItem("edu_classes");
    localStorage.removeItem("edu_teacher_classes");
    localStorage.removeItem("edu_attendance");
    localStorage.removeItem("edu_fee_categories");
    localStorage.removeItem("edu_announcements");
    localStorage.removeItem("edu_documents");
    localStorage.removeItem("edu_approvals");
    localStorage.removeItem("edu_assignments");
    localStorage.removeItem("edu_exam_marks");
    localStorage.removeItem("edu_chats");
    localStorage.removeItem("edu_academic_years");
    localStorage.removeItem("edu_subjects");
    localStorage.removeItem("edu_timetable");
    localStorage.removeItem("edu_exams");
    localStorage.removeItem("edu_staff_attendance");
    localStorage.removeItem("edu_current_parent");
    localStorage.setItem(CURRENT_DB_VERSION, "true");
  }
  const [role, setRole] = useState("Admin");
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login credentials states
  const [loginEmail, setLoginEmail] = useState("admin@careerwave.com");
  const [loginPassword, setLoginPassword] = useState("admin123");
  const [loginError, setLoginError] = useState("");
  const [loginSuccessToast, setLoginSuccessToast] = useState("");

  const [currentParent, setCurrentParent] = useState(() => {
    const val = localStorage.getItem("edu_current_parent");
    return val ? JSON.parse(val) : null;
  });

  const handleRoleToggle = (newRole) => {
    setRole(newRole);
    setLoginError("");
    if (newRole === "Admin") {
      setLoginEmail("admin@careerwave.com");
      setLoginPassword("admin123");
    } else if (newRole === "Teacher") {
      setLoginEmail("teacher@careerwave.com");
      setLoginPassword("teacher123");
    } else if (newRole === "Parent") {
      setLoginEmail("michael.j@example.com");
      setLoginPassword("parent123");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    const normalizedEmail = loginEmail.trim().toLowerCase();
    const normalizedPassword = loginPassword.trim();

    if (role === "Admin") {
      if (
        (normalizedEmail === "admin@careerwave.com" ||
          normalizedEmail === "admin@edusmart.com" ||
          normalizedEmail === "admin") &&
        (normalizedPassword === "admin123" || normalizedPassword === "admin")
      ) {
        setIsLoggedIn(true);
        setLoginSuccessToast("");
      } else {
        setLoginError(
          "Invalid Admin credentials. Try admin@careerwave.com / admin123",
        );
      }
    } else if (role === "Teacher") {
      if (
        (normalizedEmail === "teacher@careerwave.com" ||
          normalizedEmail === "teacher@edusmart.com" ||
          normalizedEmail === "teacher") &&
        (normalizedPassword === "teacher123" ||
          normalizedPassword === "teacher")
      ) {
        setIsLoggedIn(true);
        setLoginSuccessToast("");
      } else {
        setLoginError(
          "Invalid Teacher credentials. Try teacher@careerwave.com / teacher123",
        );
      }
    } else if (role === "Parent") {
      const parentObj = parents.find(
        (p) => p.email.toLowerCase() === normalizedEmail
      );
      if (parentObj && normalizedPassword === "parent123") {
        setCurrentParent(parentObj);
        setIsLoggedIn(true);
        setLoginSuccessToast("");
      } else {
        setLoginError(
          "Invalid Parent credentials. Try michael.j@example.com / parent123",
        );
      }
    }
  };

  // Core Data States (Load from localStorage if exists, otherwise default)
  const [students, setStudents] = useState(() => {
    const val = localStorage.getItem("edu_students");
    return val ? JSON.parse(val) : initialStudents;
  });
  const [staff, setStaff] = useState(() => {
    const val = localStorage.getItem("edu_staff");
    return val ? JSON.parse(val) : initialStaff;
  });
  const [parents, setParents] = useState(() => {
    const val = localStorage.getItem("edu_parents");
    return val ? JSON.parse(val) : initialParents;
  });
  const [classes, setClasses] = useState(() => {
    const val = localStorage.getItem("edu_classes");
    return val ? JSON.parse(val) : initialClasses;
  });
  const [teacherClasses, setTeacherClasses] = useState(() => {
    const val = localStorage.getItem("edu_teacher_classes");
    return val ? JSON.parse(val) : initialTeacherClasses;
  });
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const val = localStorage.getItem("edu_attendance");
    return val ? JSON.parse(val) : initialAttendance;
  });
  const [feeCategories, setFeeCategories] = useState(() => {
    const val = localStorage.getItem("edu_fee_categories");
    return val ? JSON.parse(val) : initialFeeCategories;
  });
  const [announcements, setAnnouncements] = useState(() => {
    const val = localStorage.getItem("edu_announcements");
    return val ? JSON.parse(val) : initialAnnouncements;
  });
  const [documents, setDocuments] = useState(() => {
    const val = localStorage.getItem("edu_documents");
    return val ? JSON.parse(val) : initialDocuments;
  });
  const [approvals, setApprovals] = useState(() => {
    const val = localStorage.getItem("edu_approvals");
    return val ? JSON.parse(val) : initialApprovals;
  });
  const [assignments, setAssignments] = useState(() => {
    const val = localStorage.getItem("edu_assignments");
    return val ? JSON.parse(val) : initialAssignments;
  });
  const [examMarks, setExamMarks] = useState(() => {
    const val = localStorage.getItem("edu_exam_marks");
    return val ? JSON.parse(val) : initialExamMarks;
  });
  const [chatThreads, setChatThreads] = useState(() => {
    const val = localStorage.getItem("edu_chats");
    return val ? JSON.parse(val) : initialChatThreads;
  });
  const [academicYears, setAcademicYears] = useState(() => {
    const val = localStorage.getItem("edu_academic_years");
    return val ? JSON.parse(val) : initialAcademicYears;
  });

  const [subjects, setSubjects] = useState(() => {
    const val = localStorage.getItem("edu_subjects");
    return val ? JSON.parse(val) : initialSubjects;
  });

  const [timetable, setTimetable] = useState(() => {
    const val = localStorage.getItem("edu_timetable");
    return val ? JSON.parse(val) : initialTimetable;
  });

  const [exams, setExams] = useState(() => {
    const val = localStorage.getItem("edu_exams");
    return val ? JSON.parse(val) : initialExams;
  });

  const [staffAttendance, setStaffAttendance] = useState(() => {
    const val = localStorage.getItem("edu_staff_attendance");
    return val ? JSON.parse(val) : initialStaffAttendance;
  });

  const [schoolSettings, setSchoolSettings] = useState(() => {
    const val = localStorage.getItem("edu_school_settings");
    return val
      ? JSON.parse(val)
      : {
          name: "Oakwood Academy",
          address: "102 Academic Ave, Boston, MA",
          phone: "+1 (555) 019-2834",
          email: "contact@oakwoodacademy.edu",
          website: "www.oakwoodacademy.edu",
          principal: "Principal Johnsen",
          established: "2005",
        };
  });

  const [rolePermissions, setRolePermissions] = useState(() => {
    const val = localStorage.getItem("edu_role_permissions");
    return val
      ? JSON.parse(val)
      : {
          studentRegistration: true,
          teacherAttendance: true,
          parentMessaging: true,
          feeOnlinePayment: true,
        };
  });

  const [integrations, setIntegrations] = useState(() => {
    const val = localStorage.getItem("edu_integrations");
    return val
      ? JSON.parse(val)
      : {
          googleWorkspace: true,
          msTeams: false,
          zoomEdu: true,
          stripePayments: true,
          twilioSms: true,
        };
  });

  // Short-term navigation bindings
  const [attendanceClassFilter, setAttendanceClassFilter] = useState("");

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("edu_students", JSON.stringify(students));
  }, [students]);
  useEffect(() => {
    localStorage.setItem("edu_staff", JSON.stringify(staff));
  }, [staff]);
  useEffect(() => {
    localStorage.setItem("edu_parents", JSON.stringify(parents));
  }, [parents]);
  useEffect(() => {
    localStorage.setItem("edu_classes", JSON.stringify(classes));
  }, [classes]);
  useEffect(() => {
    localStorage.setItem("edu_teacher_classes", JSON.stringify(teacherClasses));
  }, [teacherClasses]);
  useEffect(() => {
    localStorage.setItem("edu_attendance", JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);
  useEffect(() => {
    localStorage.setItem("edu_fee_categories", JSON.stringify(feeCategories));
  }, [feeCategories]);
  useEffect(() => {
    localStorage.setItem("edu_announcements", JSON.stringify(announcements));
  }, [announcements]);
  useEffect(() => {
    localStorage.setItem("edu_documents", JSON.stringify(documents));
  }, [documents]);
  useEffect(() => {
    localStorage.setItem("edu_approvals", JSON.stringify(approvals));
  }, [approvals]);
  useEffect(() => {
    localStorage.setItem("edu_assignments", JSON.stringify(assignments));
  }, [assignments]);
  useEffect(() => {
    localStorage.setItem("edu_exam_marks", JSON.stringify(examMarks));
  }, [examMarks]);
  useEffect(() => {
    localStorage.setItem("edu_chats", JSON.stringify(chatThreads));
  }, [chatThreads]);
  useEffect(() => {
    localStorage.setItem("edu_academic_years", JSON.stringify(academicYears));
  }, [academicYears]);
  useEffect(() => {
    localStorage.setItem("edu_subjects", JSON.stringify(subjects));
  }, [subjects]);
  useEffect(() => {
    localStorage.setItem("edu_timetable", JSON.stringify(timetable));
  }, [timetable]);
  useEffect(() => {
    localStorage.setItem("edu_exams", JSON.stringify(exams));
  }, [exams]);
  useEffect(() => {
    localStorage.setItem(
      "edu_staff_attendance",
      JSON.stringify(staffAttendance),
    );
  }, [staffAttendance]);
  useEffect(() => {
    localStorage.setItem("edu_school_settings", JSON.stringify(schoolSettings));
  }, [schoolSettings]);
  useEffect(() => {
    localStorage.setItem(
      "edu_role_permissions",
      JSON.stringify(rolePermissions),
    );
  }, [rolePermissions]);
  useEffect(() => {
    localStorage.setItem("edu_integrations", JSON.stringify(integrations));
  }, [integrations]);

  useEffect(() => {
    if (currentParent) {
      localStorage.setItem("edu_current_parent", JSON.stringify(currentParent));
    } else {
      localStorage.removeItem("edu_current_parent");
    }
  }, [currentParent]);

  // Handle Approve/Reject callback from Dashboard or Approvals Tab
  const handleApprove = (id, approve) => {
    setApprovals((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: approve ? "Approved" : "Rejected" }
          : req,
      ),
    );
  };

  const notificationsCount =
    approvals.filter((a) => a.status === "Pending").length +
    chatThreads.reduce((acc, t) => acc + t.unreadCount, 0);

  const handleNotificationsClick = () => {
    if (role === "Admin") {
      setCurrentTab("approvals");
    } else {
      setCurrentTab("messages");
    }
  };

  // Render active page component
  const renderContent = () => {
    if (role === "Admin") {
      switch (currentTab) {
        case "dashboard":
          return (
            <Dashboard
              role={role}
              students={students}
              classes={classes}
              approvals={approvals}
              announcements={announcements}
              onApprove={handleApprove}
              setCurrentTab={setCurrentTab}
            />
          );
        case "user-management":
          return (
            <UserManagement
              students={students}
              setStudents={setStudents}
              staff={staff}
              setStaff={setStaff}
              parents={parents}
              setParents={setParents}
            />
          );
        case "academic":
          return (
            <Academic
              classes={classes}
              setClasses={setClasses}
              subjects={subjects}
              setSubjects={setSubjects}
              timetable={timetable}
              setTimetable={setTimetable}
              exams={exams}
              setExams={setExams}
            />
          );
        case "attendance":
          return (
            <Attendance
              attendanceRecords={attendanceRecords}
              setAttendanceRecords={setAttendanceRecords}
              classFilter={attendanceClassFilter}
              setClassFilter={setAttendanceClassFilter}
              staff={staff}
              staffAttendanceRecords={staffAttendance}
              setStaffAttendanceRecords={setStaffAttendance}
              students={students}
            />
          );

        case "fees":
          return (
            <Fees
              feeCategories={feeCategories}
              setFeeCategories={setFeeCategories}
            />
          );
        case "communication":
          return (
            <Communication
              announcements={announcements}
              setAnnouncements={setAnnouncements}
            />
          );
        case "reports":
          return <Reports />;
        case "documents":
          return (
            <Documents documents={documents} setDocuments={setDocuments} />
          );
        case "settings":
          return (
            <Settings
              role={role}
              academicYears={academicYears}
              setAcademicYears={setAcademicYears}
              schoolSettings={schoolSettings}
              setSchoolSettings={setSchoolSettings}
              rolePermissions={rolePermissions}
              setRolePermissions={setRolePermissions}
              integrations={integrations}
              setIntegrations={setIntegrations}
            />
          );

        case "approvals":
          return <Approvals approvals={approvals} onApprove={handleApprove} />;
        default:
          return (
            <Dashboard
              role={role}
              students={students}
              classes={classes}
              approvals={approvals}
              announcements={announcements}
              onApprove={handleApprove}
              setCurrentTab={setCurrentTab}
              searchQuery={searchQuery}
            />
          );
      }
    } else if (role === "Teacher") {
      // Teacher View
      switch (currentTab) {
        case "dashboard":
          return (
            <Dashboard
              role={role}
              students={students}
              classes={classes}
              approvals={approvals}
              announcements={announcements}
              onApprove={handleApprove}
              setCurrentTab={setCurrentTab}
              searchQuery={searchQuery}
            />
          );
        case "my-classes":
          return (
            <MyClasses
              teacherClasses={teacherClasses}
              setTeacherClasses={setTeacherClasses}
              setCurrentTab={setCurrentTab}
              setAttendanceClassFilter={setAttendanceClassFilter}
            />
          );
        case "students":
          return (
            <UserManagement
              students={students}
              setStudents={setStudents}
              staff={staff}
              setStaff={setStaff}
              parents={parents}
              setParents={setParents}
            />
          );
        case "attendance":
          return (
            <Attendance
              attendanceRecords={attendanceRecords}
              setAttendanceRecords={setAttendanceRecords}
              classFilter={attendanceClassFilter}
              setClassFilter={setAttendanceClassFilter}
              staff={staff}
              staffAttendanceRecords={staffAttendance}
              setStaffAttendanceRecords={setStaffAttendance}
              students={students}
            />
          );
        case "assignment":
          return (
            <Assignments
              assignments={assignments}
              setAssignments={setAssignments}
            />
          );
        case "exams-marks":
          return (
            <ExamsMarks examMarks={examMarks} setExamMarks={setExamMarks} />
          );
        case "messages":
          return (
            <Messages
              chatThreads={chatThreads}
              setChatThreads={setChatThreads}
            />
          );
        case "settings":
          return (
            <Settings
              role={role}
              academicYears={academicYears}
              setAcademicYears={setAcademicYears}
              schoolSettings={schoolSettings}
              setSchoolSettings={setSchoolSettings}
              rolePermissions={rolePermissions}
              setRolePermissions={setRolePermissions}
              integrations={integrations}
              setIntegrations={setIntegrations}
            />
          );

        default:
          return (
            <Dashboard
              role={role}
              students={students}
              classes={classes}
              approvals={approvals}
              announcements={announcements}
              onApprove={handleApprove}
              setCurrentTab={setCurrentTab}
              searchQuery={searchQuery}
            />
          );
      }
    } else if (role === "Parent") {
      return (
        <ParentDashboard
          parent={currentParent}
          students={students}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
      );
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsLoggedOut(true);
    setLoginSuccessToast("Logged out successfully!");
    setTimeout(() => {
      setLoginSuccessToast("");
    }, 5000);
  };

  if (isLoggedOut) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "var(--sidebar-bg)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          fontFamily: "var(--font-heading)",
        }}
      >
        <div
          className="logo-icon"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "24px",
            backgroundColor: "rgba(255,255,255,0.2)",
          }}
        >
          <GraduationCap size={48} />
        </div>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 800 }}>
            Logged Out Successfully
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              marginTop: "8px",
              fontSize: "14px",
              fontFamily: "var(--font-body)",
            }}
          >
            Thank you for using EduSmart School Management system.
          </p>
        </div>
        <button
          className="btn"
          style={{
            backgroundColor: "white",
            color: "var(--sidebar-bg)",
            padding: "12px 28px",
            fontSize: "15px",
          }}
          onClick={() => {
            setIsLoggedOut(false);
          }}
        >
          Log In Again
        </button>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="login-screen-wrapper">
        <div className="login-bg-image" />
        <div className="login-card">
          {loginSuccessToast && (
            <div className="login-success-toast">{loginSuccessToast}</div>
          )}
          <div className="login-header">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign into your careerwave account</p>
          </div>

          <div className="login-role-toggles">
            <button
              type="button"
              className={`login-role-btn ${role === "Admin" ? "active" : "inactive"}`}
              onClick={() => handleRoleToggle("Admin")}
            >
              Admin
            </button>
            <button
              type="button"
              className={`login-role-btn ${role === "Teacher" ? "active" : "inactive"}`}
              onClick={() => handleRoleToggle("Teacher")}
            >
              Teacher
            </button>
            <button
              type="button"
              className={`login-role-btn ${role === "Parent" ? "active" : "inactive"}`}
              onClick={() => handleRoleToggle("Parent")}
            >
              Parent
            </button>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="login-field-group">
              <label className="login-field-label">Email</label>
              <div className="login-input-wrapper">
                <Mail size={18} className="login-input-icon" />
                <input
                  type="text"
                  className="login-input"
                  placeholder="Enter your Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-field-group">
              <label className="login-field-label">Password</label>
              <div className="login-input-wrapper">
                <Lock size={18} className="login-input-icon" />
                <input
                  type="password"
                  className="login-input"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              {loginError && (
                <div className="login-error-msg">{loginError}</div>
              )}
            </div>

            <button type="submit" className="login-signin-btn">
              Sign in
            </button>
          </form>

          <div className="login-demo-helper">
            <div className="login-demo-title">Quick Demo Login</div>
            <div className="login-demo-subtitle">
              Click to auto-fill credentials
            </div>
            <div className="login-demo-credentials">
              <div
                className="login-demo-row"
                onClick={() => {
                  handleRoleToggle("Admin");
                }}
              >
                <span className="login-demo-badge">Admin</span>
                <span className="login-demo-info">
                  admin@careerwave.com / admin123
                </span>
              </div>
              <div
                className="login-demo-row"
                onClick={() => {
                  handleRoleToggle("Teacher");
                }}
              >
                <span className="login-demo-badge">Teacher</span>
                <span className="login-demo-info">
                  teacher@careerwave.com / teacher123
                </span>
              </div>
              <div
                className="login-demo-row"
                onClick={() => {
                  handleRoleToggle("Parent");
                }}
              >
                <span className="login-demo-badge">Parent</span>
                <span className="login-demo-info">
                  michael.j@example.com / parent123
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Sidebar navigation */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        role={role}
        onLogout={handleLogout}
        currentParent={currentParent}
      />

      {/* Main Wrapper */}
      <div className="main-wrapper">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          role={role}
          notificationsCount={notificationsCount}
          onNotificationsClick={handleNotificationsClick}
          currentTab={currentTab}
          currentParent={currentParent}
        />

        {/* Scrollable Content Panel */}
        <main className="content-panel">{renderContent()}</main>

        {/* Floating AI Assistant Drawer for Teachers */}
        {role === "Teacher" && <AIAssistant />}
      </div>
    </div>
  );
}
