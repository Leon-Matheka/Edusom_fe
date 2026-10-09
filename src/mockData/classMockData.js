// src/mockData/classMockData.js
// Mock data for a single class: 8 subjects, 8 teachers (1 per subject),
// students each linked to a parent, login credentials for all three roles,
// and per-subject performance for every student.
//
// NOTE: passwords below are plain demo strings for local/dev use only —
// never treat this pattern as real auth. Swap for hashed credentials
// behind a real auth flow before this touches production.

const DEMO_PASSWORD = "Edusom#2026";

// ---------- SUBJECTS ----------
export const subjects = [
  "Mathematics",
  "English",
  "Kiswahili",
  "Biology",
  "Chemistry",
  "Physics",
  "Geography",
  "History",
];

// ---------- CLASS ----------
export const classInfo = {
  id: "C7B",
  name: "Grade 7B",
  term: "Term 2, 2026",
  classTeacherId: 1, // Grace Wanjiru — Mathematics
};

// ---------- TEACHERS (1 per subject) ----------
export const teachers = [
  {
    id: 1,
    name: "Grace Wanjiru",
    subject: "Mathematics",
    email: "grace.wanjiru@classbridge.example.com",
    classes: ["Grade 7B"],
    yearsOfExperience: 9,
    profilePic: "https://i.pravatar.cc/100?img=47",
    login: { username: "grace.wanjiru", password: DEMO_PASSWORD },
  },
  {
    id: 2,
    name: "Peter Mwangi",
    subject: "English",
    email: "peter.mwangi@classbridge.example.com",
    classes: ["Grade 7B"],
    yearsOfExperience: 6,
    profilePic: "https://i.pravatar.cc/100?img=12",
    login: { username: "peter.mwangi", password: DEMO_PASSWORD },
  },
  {
    id: 3,
    name: "Faith Njeri",
    subject: "Kiswahili",
    email: "faith.njeri@classbridge.example.com",
    classes: ["Grade 7B"],
    yearsOfExperience: 11,
    profilePic: "https://i.pravatar.cc/100?img=32",
    login: { username: "faith.njeri", password: DEMO_PASSWORD },
  },
  {
    id: 4,
    name: "Brian Otieno",
    subject: "Biology",
    email: "brian.otieno@classbridge.example.com",
    classes: ["Grade 7B"],
    yearsOfExperience: 5,
    profilePic: "https://i.pravatar.cc/100?img=15",
    login: { username: "brian.otieno", password: DEMO_PASSWORD },
  },
  {
    id: 5,
    name: "Cynthia Achieng",
    subject: "Chemistry",
    email: "cynthia.achieng@classbridge.example.com",
    classes: ["Grade 7B"],
    yearsOfExperience: 8,
    profilePic: "https://i.pravatar.cc/100?img=44",
    login: { username: "cynthia.achieng", password: DEMO_PASSWORD },
  },
  {
    id: 6,
    name: "David Kiprotich",
    subject: "Physics",
    email: "david.kiprotich@classbridge.example.com",
    classes: ["Grade 7B"],
    yearsOfExperience: 7,
    profilePic: "https://i.pravatar.cc/100?img=51",
    login: { username: "david.kiprotich", password: DEMO_PASSWORD },
  },
  {
    id: 7,
    name: "Mercy Wambui",
    subject: "Geography",
    email: "mercy.wambui@classbridge.example.com",
    classes: ["Grade 7B"],
    yearsOfExperience: 4,
    profilePic: "https://i.pravatar.cc/100?img=29",
    login: { username: "mercy.wambui", password: DEMO_PASSWORD },
  },
  {
    id: 8,
    name: "Samuel Kamau",
    subject: "History",
    email: "samuel.kamau@classbridge.example.com",
    classes: ["Grade 7B"],
    yearsOfExperience: 10,
    profilePic: "https://i.pravatar.cc/100?img=8",
    login: { username: "samuel.kamau", password: DEMO_PASSWORD },
  },
];

const teacherFor = (subject) => teachers.find((t) => t.subject === subject);

function gradeFor(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B+";
  if (score >= 60) return "B";
  if (score >= 50) return "C+";
  if (score >= 40) return "C";
  return "D";
}

function buildPerformance(scores) {
  return subjects.map((subject, i) => {
    const score = scores[i];
    const teacher = teacherFor(subject);
    return {
      subject,
      teacher: teacher.name,
      teacherId: teacher.id,
      score,
      grade: gradeFor(score),
    };
  });
}

// ---------- STUDENTS + PARENTS (with login credentials) ----------
// scores order matches `subjects`:
// [Maths, English, Kiswahili, Biology, Chemistry, Physics, Geography, History]

export const students = [
  {
    id: 101,
    name: "Amina Hassan",
    classId: "C7B",
    admissionNo: "GB7B-101",
    profilePic: "https://i.pravatar.cc/100?img=5",
    login: { username: "amina.hassan", password: DEMO_PASSWORD },
    parent: {
      id: 201,
      name: "Fatuma Hassan",
      relationship: "Mother",
      email: "fatuma.hassan@example.com",
      phone: "+254 712 345 601",
      login: { username: "fatuma.hassan", password: DEMO_PASSWORD },
    },
    performance: buildPerformance([88, 74, 81, 69, 72, 65, 77, 80]),
  },
  {
    id: 102,
    name: "Kevin Odhiambo",
    classId: "C7B",
    admissionNo: "GB7B-102",
    profilePic: "https://i.pravatar.cc/100?img=6",
    login: { username: "kevin.odhiambo", password: DEMO_PASSWORD },
    parent: {
      id: 202,
      name: "Joseph Odhiambo",
      relationship: "Father",
      email: "joseph.odhiambo@example.com",
      phone: "+254 712 345 602",
      login: { username: "joseph.odhiambo", password: DEMO_PASSWORD },
    },
    performance: buildPerformance([55, 61, 58, 47, 52, 49, 63, 57]),
  },
  {
    id: 103,
    name: "Wanjiku Kariuki",
    classId: "C7B",
    admissionNo: "GB7B-103",
    profilePic: "https://i.pravatar.cc/100?img=9",
    login: { username: "wanjiku.kariuki", password: DEMO_PASSWORD },
    parent: {
      id: 203,
      name: "Susan Kariuki",
      relationship: "Mother",
      email: "susan.kariuki@example.com",
      phone: "+254 712 345 603",
      login: { username: "susan.kariuki", password: DEMO_PASSWORD },
    },
    performance: buildPerformance([92, 85, 79, 88, 90, 84, 76, 82]),
  },
  {
    id: 104,
    name: "Mohamed Ali",
    classId: "C7B",
    admissionNo: "GB7B-104",
    profilePic: "https://i.pravatar.cc/100?img=11",
    login: { username: "mohamed.ali", password: DEMO_PASSWORD },
    parent: {
      id: 204,
      name: "Ali Abdullahi",
      relationship: "Father",
      email: "ali.abdullahi@example.com",
      phone: "+254 712 345 604",
      login: { username: "ali.abdullahi", password: DEMO_PASSWORD },
    },
    performance: buildPerformance([40, 45, 50, 38, 42, 35, 48, 44]),
  },
  {
    id: 105,
    name: "Grace Mutua",
    classId: "C7B",
    admissionNo: "GB7B-105",
    profilePic: "https://i.pravatar.cc/100?img=20",
    login: { username: "grace.mutua", password: DEMO_PASSWORD },
    parent: {
      id: 205,
      name: "Peter Mutua",
      relationship: "Father",
      email: "peter.mutua@example.com",
      phone: "+254 712 345 605",
      login: { username: "peter.mutua", password: DEMO_PASSWORD },
    },
    performance: buildPerformance([70, 68, 72, 65, 60, 58, 74, 66]),
  },
  {
    id: 106,
    name: "Ian Kiplagat",
    classId: "C7B",
    admissionNo: "GB7B-106",
    profilePic: "https://i.pravatar.cc/100?img=13",
    login: { username: "ian.kiplagat", password: DEMO_PASSWORD },
    parent: {
      id: 206,
      name: "Ruth Kiplagat",
      relationship: "Mother",
      email: "ruth.kiplagat@example.com",
      phone: "+254 712 345 606",
      login: { username: "ruth.kiplagat", password: DEMO_PASSWORD },
    },
    performance: buildPerformance([63, 59, 66, 55, 61, 57, 62, 60]),
  },
  {
    id: 107,
    name: "Sharon Njoki",
    classId: "C7B",
    admissionNo: "GB7B-107",
    profilePic: "https://i.pravatar.cc/100?img=24",
    login: { username: "sharon.njoki", password: DEMO_PASSWORD },
    parent: {
      id: 207,
      name: "Daniel Njoroge",
      relationship: "Father",
      email: "daniel.njoroge@example.com",
      phone: "+254 712 345 607",
      login: { username: "daniel.njoroge", password: DEMO_PASSWORD },
    },
    performance: buildPerformance([81, 77, 83, 74, 79, 71, 85, 78]),
  },
  {
    id: 108,
    name: "Victor Mwangi",
    classId: "C7B",
    admissionNo: "GB7B-108",
    profilePic: "https://i.pravatar.cc/100?img=14",
    login: { username: "victor.mwangi", password: DEMO_PASSWORD },
    parent: {
      id: 208,
      name: "Alice Mwangi",
      relationship: "Mother",
      email: "alice.mwangi@example.com",
      phone: "+254 712 345 608",
      login: { username: "alice.mwangi", password: DEMO_PASSWORD },
    },
    performance: buildPerformance([49, 52, 46, 44, 48, 41, 53, 47]),
  },
  {
    id: 109,
    name: "Diana Chebet",
    classId: "C7B",
    admissionNo: "GB7B-109",
    profilePic: "https://i.pravatar.cc/100?img=25",
    login: { username: "diana.chebet", password: DEMO_PASSWORD },
    parent: {
      id: 209,
      name: "Kiplagat Chebet",
      relationship: "Father",
      email: "kiplagat.chebet@example.com",
      phone: "+254 712 345 609",
      login: { username: "kiplagat.chebet", password: DEMO_PASSWORD },
    },
    performance: buildPerformance([76, 70, 74, 68, 71, 66, 73, 69]),
  },
  {
    id: 110,
    name: "Brian Onyango",
    classId: "C7B",
    admissionNo: "GB7B-110",
    profilePic: "https://i.pravatar.cc/100?img=33",
    login: { username: "brian.onyango", password: DEMO_PASSWORD },
    parent: {
      id: 210,
      name: "Lilian Onyango",
      relationship: "Mother",
      email: "lilian.onyango@example.com",
      phone: "+254 712 345 610",
      login: { username: "lilian.onyango", password: DEMO_PASSWORD },
    },
    performance: buildPerformance([84, 80, 78, 82, 86, 79, 81, 83]),
  },
];

// ---------- Convenience lookups ----------

export const getStudentById = (id) => students.find((s) => s.id === id);

export const getChildrenByParentId = (parentId) =>
  students.filter((s) => s.parent.id === parentId);

// per-subject class average — useful for teacher-side charts
export const classAverages = subjects.map((subject) => {
  const scores = students.map(
    (s) => s.performance.find((p) => p.subject === subject).score
  );
  const avg = Math.round(
    scores.reduce((sum, n) => sum + n, 0) / scores.length
  );
  return { subject, average: avg };
});

// Wide-format results table: one row per student, one column per subject,
// plus an overall average. Handy for a results/report-card style view.
export const resultsTable = students.map((s) => {
  const row = { studentId: s.id, name: s.name };
  s.performance.forEach((p) => {
    row[p.subject] = p.score;
  });
  row.average = Math.round(
    s.performance.reduce((sum, p) => sum + p.score, 0) / s.performance.length
  );
  return row;
});

// Simple login lookup across all three roles — checks username + password
// against students, parents, and teachers. Returns { role, profile } or null.
export function login(username, password) {
  const teacher = teachers.find(
    (t) => t.login.username === username && t.login.password === password
  );
  if (teacher) return { role: "teacher", profile: teacher };

  const student = students.find(
    (s) => s.login.username === username && s.login.password === password
  );
  if (student) return { role: "student", profile: student };

  for (const s of students) {
    if (
      s.parent.login.username === username &&
      s.parent.login.password === password
    ) {
      return { role: "parent", profile: s.parent, children: [s] };
    }
  }

  return null;
}
