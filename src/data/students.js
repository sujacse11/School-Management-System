export const studentsData = [
  {
    id: "STU-24001",
    name: "Alex Johnson",
    email: "alex.johnson@school.com",
    password: "password001",
    class: "Grade 5 - A",
    section: "A",
    room: "105",
    classAdvisor: "Sarah Connor",
    rollNumber: "10",
    attendanceDetail: {
      june: { present: 21, workingDays: 22 },
      july: { present: 20, workingDays: 22 }
    },
    feeStatus: "Paid",
    performance: "Outstanding",
    subjects: {
      "Mathematics": { marks: 95, grade: "A+", remarks: "Excellent problem-solving skills." },
      "Science": { marks: 92, grade: "A+", remarks: "Great understanding of physics concepts." },
      "Social Studies": { marks: 88, grade: "A", remarks: "Good grasp of history and geography." },
      "English": { marks: 90, grade: "A+", remarks: "Articulate and well-written essays." },
      "Hindi": { marks: 85, grade: "A", remarks: "Improved grammar and vocabulary." },
      "Computer Science": { marks: 98, grade: "A+", remarks: "Outstanding coding skills." }
    },
    parent: {
      name: "Rajesh Johnson",
      email: "rajesh.johnson@parent.com",
      password: "parent001",
      phone: "+91 98765 43210",
      address: "123, Sunrise Apartments, Sector 15, Dwarka, Delhi",
      relationship: "Father"
    }
  },
  {
    id: "STU-24002",
    name: "Priya Patel",
    email: "priya.patel@school.com",
    password: "password002",
    class: "Grade 5 - A",
    section: "A",
    room: "105",
    classAdvisor: "Sarah Connor",
    rollNumber: "18",
    attendanceDetail: {
      june: { present: 21, workingDays: 22 },
      july: { present: 21, workingDays: 22 }
    },
    feeStatus: "Paid",
    performance: "Excellent",
    subjects: {
      "Mathematics": { marks: 88, grade: "A", remarks: "Logical and systematic approach." },
      "Science": { marks: 95, grade: "A+", remarks: "Superb lab work and biology concepts." },
      "Social Studies": { marks: 91, grade: "A+", remarks: "Very active in class discussions." },
      "English": { marks: 94, grade: "A+", remarks: "Excellent comprehension skills." },
      "Hindi": { marks: 89, grade: "A", remarks: "Good creative writing." },
      "Computer Science": { marks: 92, grade: "A+", remarks: "Very good logical reasoning." }
    },
    parent: {
      name: "Sanjay Patel",
      email: "sanjay.patel@parent.com",
      password: "parent002",
      phone: "+91 98765 43211",
      address: "45, Green Glen Layout, Bellandur, Bangalore",
      relationship: "Father"
    }
  },
  {
    id: "STU-24003",
    name: "Rohan Verma",
    email: "rohan.verma@school.com",
    password: "password003",
    class: "Grade 5 - A",
    section: "A",
    room: "105",
    classAdvisor: "Sarah Connor",
    rollNumber: "25",
    attendanceDetail: {
      june: { present: 20, workingDays: 22 },
      july: { present: 19, workingDays: 22 }
    },
    feeStatus: "Paid",
    performance: "Good",
    subjects: {
      "Mathematics": { marks: 76, grade: "B", remarks: "Needs more practice in algebra." },
      "Science": { marks: 80, grade: "B+", remarks: "Solid work, can improve with focus." },
      "Social Studies": { marks: 85, grade: "A", remarks: "Interested in contemporary issues." },
      "English": { marks: 82, grade: "B+", remarks: "Good vocabulary, watch spelling." },
      "Hindi": { marks: 78, grade: "B", remarks: "Needs to focus on essay writing." },
      "Computer Science": { marks: 85, grade: "A", remarks: "Good programming logic." }
    },
    parent: {
      name: "Meenakshi Verma",
      email: "meenakshi.verma@parent.com",
      password: "parent003",
      phone: "+91 98765 43212",
      address: "B-402, Royal Palms, Goregaon East, Mumbai",
      relationship: "Mother"
    }
  },
  {
    id: "STU-24004",
    name: "Ananya Iyer",
    email: "ananya.iyer@school.com",
    password: "password004",
    class: "Grade 5 - A",
    section: "A",
    room: "105",
    classAdvisor: "Sarah Connor",
    rollNumber: "03",
    attendanceDetail: {
      june: { present: 22, workingDays: 22 },
      july: { present: 22, workingDays: 22 }
    },
    feeStatus: "Paid",
    performance: "Outstanding",
    subjects: {
      "Mathematics": { marks: 99, grade: "A+", remarks: "Flawless performance, highly analytical." },
      "Science": { marks: 98, grade: "A+", remarks: "Excellent scientific reasoning." },
      "Social Studies": { marks: 94, grade: "A+", remarks: "Comprehensive understanding." },
      "English": { marks: 96, grade: "A+", remarks: "Exceptional language skills." },
      "Hindi": { marks: 92, grade: "A+", remarks: "Excellent expression and grammar." },
      "Computer Science": { marks: 100, grade: "A+", remarks: "Perfect score! Brilliant coding." }
    },
    parent: {
      name: "Ramanathan Iyer",
      email: "ramanathan.iyer@parent.com",
      password: "parent004",
      phone: "+91 98765 43213",
      address: "12, Kasturi Rangan Road, Alwarpet, Chennai",
      relationship: "Father"
    }
  },
  {
    id: "STU-24005",
    name: "Kabir Singh",
    email: "kabir.singh@school.com",
    password: "password005",
    class: "Grade 5 - A",
    section: "A",
    room: "105",
    classAdvisor: "Sarah Connor",
    rollNumber: "12",
    attendanceDetail: {
      june: { present: 19, workingDays: 22 },
      july: { present: 18, workingDays: 22 }
    },
    feeStatus: "Pending",
    performance: "Average",
    subjects: {
      "Mathematics": { marks: 65, grade: "C", remarks: "Requires significant effort and extra classes." },
      "Science": { marks: 72, grade: "B", remarks: "Should pay more attention during theory lessons." },
      "Social Studies": { marks: 70, grade: "B", remarks: "Tends to miss assignment deadlines." },
      "English": { marks: 78, grade: "B", remarks: "Good reading comprehension, needs writing practice." },
      "Hindi": { marks: 82, grade: "B+", remarks: "Capable of achieving higher grades." },
      "Computer Science": { marks: 75, grade: "B", remarks: "Needs to submit projects on time." }
    },
    parent: {
      name: "Gurpreet Singh",
      email: "gurpreet.singh@parent.com",
      password: "parent005",
      phone: "+91 98765 43214",
      address: "567, Phase 3B2, Mohali, Punjab",
      relationship: "Father"
    }
  },
  {
    id: "STU-24006",
    name: "Sneha Reddy",
    email: "sneha.reddy@school.com",
    password: "password006",
    class: "Grade 5 - A",
    section: "A",
    room: "105",
    classAdvisor: "Sarah Connor",
    rollNumber: "22",
    attendanceDetail: {
      june: { present: 20, workingDays: 22 },
      july: { present: 21, workingDays: 22 }
    },
    feeStatus: "Paid",
    performance: "Excellent",
    subjects: {
      "Mathematics": { marks: 91, grade: "A+", remarks: "Quick to grasp new formulas." },
      "Science": { marks: 89, grade: "A", remarks: "Performs well in chemistry and physics." },
      "Social Studies": { marks: 93, grade: "A+", remarks: "Very neat work and structured answers." },
      "English": { marks: 91, grade: "A+", remarks: "Polite and participates in debates." },
      "Hindi": { marks: 84, grade: "A", remarks: "Good progress since last term." },
      "Computer Science": { marks: 88, grade: "A", remarks: "Consistent coder, clear concepts." }
    },
    parent: {
      name: "Madhusudhan Reddy",
      email: "madhusudhan.reddy@parent.com",
      password: "parent006",
      phone: "+91 98765 43215",
      address: "8-2-293, Road No. 12, Banjara Hills, Hyderabad",
      relationship: "Father"
    }
  },
  {
    id: "STU-24007",
    name: "Vikram Sen",
    email: "vikram.sen@school.com",
    password: "password007",
    class: "Grade 5 - A",
    section: "A",
    room: "105",
    classAdvisor: "Sarah Connor",
    rollNumber: "31",
    attendanceDetail: {
      june: { present: 20, workingDays: 22 },
      july: { present: 20, workingDays: 22 }
    },
    feeStatus: "Paid",
    performance: "Excellent",
    subjects: {
      "Mathematics": { marks: 85, grade: "A", remarks: "Good analytical skills, minor calculation errors." },
      "Science": { marks: 87, grade: "A", remarks: "Active in science club and experiments." },
      "Social Studies": { marks: 92, grade: "A+", remarks: "Deep understanding of civics." },
      "English": { marks: 89, grade: "A", remarks: "Excellent essay writing." },
      "Hindi": { marks: 90, grade: "A+", remarks: "Great vocabulary and pronunciation." },
      "Computer Science": { marks: 94, grade: "A+", remarks: "Very creative in UI designs." }
    },
    parent: {
      name: "Animesh Sen",
      email: "animesh.sen@parent.com",
      password: "parent007",
      phone: "+91 98765 43216",
      address: "14/2, Salt Lake, Sector 2, Kolkata",
      relationship: "Father"
    }
  },
  {
    id: "STU-24008",
    name: "Diya Joshi",
    email: "diya.joshi@school.com",
    password: "password008",
    class: "Grade 5 - A",
    section: "A",
    room: "105",
    classAdvisor: "Sarah Connor",
    rollNumber: "07",
    attendanceDetail: {
      june: { present: 21, workingDays: 22 },
      july: { present: 21, workingDays: 22 }
    },
    feeStatus: "Paid",
    performance: "Excellent",
    subjects: {
      "Mathematics": { marks: 92, grade: "A+", remarks: "Highly attentive, asks smart questions." },
      "Science": { marks: 91, grade: "A+", remarks: "Detail-oriented, excels in biology." },
      "Social Studies": { marks: 87, grade: "A", remarks: "Enthusiastic about geography." },
      "English": { marks: 93, grade: "A+", remarks: "Splendid public speaker." },
      "Hindi": { marks: 88, grade: "A", remarks: "Very good spelling and handwriting." },
      "Computer Science": { marks: 90, grade: "A+", remarks: "Strong logical thinking." }
    },
    parent: {
      name: "Amit Joshi",
      email: "amit.joshi@parent.com",
      password: "parent008",
      phone: "+91 98765 43217",
      address: "702, Maple Heights, Vastrapur, Ahmedabad",
      relationship: "Father"
    }
  },
  {
    id: "STU-24009",
    name: "Aditya Mishra",
    email: "aditya.mishra@school.com",
    password: "password009",
    class: "Grade 5 - A",
    section: "A",
    room: "105",
    classAdvisor: "Sarah Connor",
    rollNumber: "02",
    attendanceDetail: {
      june: { present: 20, workingDays: 22 },
      july: { present: 20, workingDays: 22 }
    },
    feeStatus: "Pending",
    performance: "Good",
    subjects: {
      "Mathematics": { marks: 80, grade: "B+", remarks: "Capable of scoring higher, needs focus." },
      "Science": { marks: 82, grade: "B+", remarks: "Good theoretical knowledge." },
      "Social Studies": { marks: 80, grade: "B+", remarks: "Participates well in historical discussions." },
      "English": { marks: 85, grade: "A", remarks: "Clear writing style, check punctuation." },
      "Hindi": { marks: 81, grade: "B+", remarks: "Good oral expression." },
      "Computer Science": { marks: 83, grade: "A", remarks: "Capable of complex logical flows." }
    },
    parent: {
      name: "Sarita Mishra",
      email: "sarita.mishra@parent.com",
      password: "parent009",
      phone: "+91 98765 43218",
      address: "H.No. 45, Gomti Nagar, Lucknow",
      relationship: "Mother"
    }
  },
  {
    id: "STU-24010",
    name: "Zara Khan",
    email: "zara.khan@school.com",
    password: "password010",
    class: "Grade 5 - A",
    section: "A",
    room: "105",
    classAdvisor: "Sarah Connor",
    rollNumber: "35",
    attendanceDetail: {
      june: { present: 21, workingDays: 22 },
      july: { present: 22, workingDays: 22 }
    },
    feeStatus: "Paid",
    performance: "Outstanding",
    subjects: {
      "Mathematics": { marks: 96, grade: "A+", remarks: "Brilliant math skills, very fast." },
      "Science": { marks: 94, grade: "A+", remarks: "Superb analytical skills." },
      "Social Studies": { marks: 95, grade: "A+", remarks: "Excellent presentation and answers." },
      "English": { marks: 97, grade: "A+", remarks: "Exceptional mastery of language and grammar." },
      "Hindi": { marks: 91, grade: "A+", remarks: "Fluent and expressive." },
      "Computer Science": { marks: 96, grade: "A+", remarks: "Outstanding programming constructs." }
    },
    parent: {
      name: "Farhan Khan",
      email: "farhan.khan@parent.com",
      password: "parent010",
      phone: "+91 98765 43219",
      address: "Flat 201, Oasis Residency, Civil Lines, Jaipur",
      relationship: "Father"
    }
  }
];
