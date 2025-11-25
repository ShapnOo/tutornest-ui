import type { TeacherProfile, TuitionPost, TuitionBid, TeacherStats, GuardianStats } from "./types"

export const mockTeacherProfile: TeacherProfile = {
  id: "1",
  userId: "user-1",
  fullName: "Tahmid Afsar Shapno",
  photo: "/professional-male-teacher-photo.jpg",
  headline: "Experienced Math & Science Tutor | BUET Graduate",
  subjects: ["Mathematics", "Physics", "Chemistry"],
  levels: ["Class 9-10", "Class 11-12", "JEE Prep"],
  teachingMode: ["online", "home-tutor"],
  location: {
    city: "Dhaka",
    area: "Dhanmondi",
    pin: "1205",
    maxDistanceKm: 15,
  },
  hourlyRateFrom: 500,
  hourlyRateTo: 1000,
  minMonthlyPackage: 8000,
  experienceYears: 8,
  education: "B.Sc Engineering from BUET",
  certifications: ["Teaching Excellence Award 2023"],
  achievements: ["50+ students scored A+ in SSC/HSC", "Average rating 4.9"],
  languages: ["English", "Bangla"],
  bio: "Passionate educator with 8+ years of experience helping students excel in Mathematics and Science. My teaching methodology focuses on building strong fundamentals and problem-solving skills.",
  ratingAvg: 4.9,
  ratingCount: 156,
  totalStudentsTaught: 234,
  totalClasses: 1500,
  verificationStatus: "verified",
  availability: true,
  createdAt: new Date("2022-01-15"),
}

export const mockTeacherStats: TeacherStats = {
  activeBids: 5,
  hiredTuitions: 12,
  profileViews: 342,
  monthlyEarnings: 45000,
  totalStudents: 8,
}

export const mockGuardianStats: GuardianStats = {
  activeTuitions: 2,
  totalBidsReceived: 18,
  shortlisted: 5,
  hired: 1,
}

export const mockTuitionPosts: TuitionPost[] = [
  {
    id: "1",
    createdByGuardianId: "guardian-1",
    studentId: "student-1",
    title: "Need Class 10 Math & Science Tutor - Online (Dhaka Board)",
    subjects: ["Mathematics", "Science"],
    level: "Class 10",
    board: "Bangladesh Board",
    mode: ["online"],
    budgetAmount: 8000,
    budgetType: "monthly",
    description:
      "Looking for an experienced tutor for my son who is preparing for board exams. Need someone who can explain concepts clearly and help with homework.",
    minExperienceYears: 3,
    genderPreference: "any",
    languagePreference: ["Bangla", "English"],
    schedule: {
      daysPerWeek: 4,
      timeSlot: "5:00 PM - 7:00 PM",
    },
    visibility: "public",
    status: "open",
    expiresAt: new Date("2025-12-25"),
    createdAt: new Date("2025-11-20"),
    bidsCount: 8,
  },
  {
    id: "2",
    createdByGuardianId: "guardian-2",
    studentId: "student-2",
    title: "HSC Preparation - Physics & Chemistry (Dhaka)",
    subjects: ["Physics", "Chemistry"],
    level: "Class 11-12",
    board: "Bangladesh Board",
    mode: ["online", "home"],
    location: { city: "Dhaka", area: "Mirpur" },
    budgetAmount: 12000,
    budgetType: "monthly",
    description:
      "Need an experienced HSC mentor familiar with Bangladesh Board for intensive coaching. Student is currently in Class 11.",
    minExperienceYears: 5,
    genderPreference: "any",
    schedule: {
      daysPerWeek: 5,
      timeSlot: "6:00 PM - 8:00 PM",
    },
    visibility: "public",
    status: "in-bidding",
    expiresAt: new Date("2025-12-30"),
    createdAt: new Date("2025-11-18"),
    bidsCount: 12,
  },
  {
    id: "3",
    createdByGuardianId: "guardian-3",
    studentId: "student-3",
    title: "English Speaking & Writing Coach (Sylhet)",
    subjects: ["English"],
    level: "Class 6-8",
    board: "Bangladesh Board",
    mode: ["online"],
    budgetAmount: 5000,
    budgetType: "monthly",
    description:
      "Looking for a fluent tutor to improve spoken English and creative writing skills with Bangladesh Board syllabus in mind.",
    location: { city: "Sylhet", area: "Zindabazar" },
    schedule: {
      daysPerWeek: 3,
      timeSlot: "4:00 PM - 5:30 PM",
    },
    visibility: "public",
    status: "open",
    expiresAt: new Date("2025-12-28"),
    createdAt: new Date("2025-11-22"),
    bidsCount: 5,
  },
]

export const mockBids: TuitionBid[] = [
  {
    id: "bid-1",
    tuitionPostId: "1",
    teacherId: "1",
    proposedAmount: 7500,
    proposedType: "monthly",
    message:
      "I have 8 years of experience teaching Class 10 students. I can help your son excel in board exams with my structured approach.",
    deliveryPlan: "4 days per week, 1.5 hours per day. Will cover all NCERT topics plus extra practice.",
    availableStartDate: new Date("2025-11-28"),
    status: "applied",
    createdAt: new Date("2025-11-23"),
  },
  {
    id: "bid-2",
    tuitionPostId: "1",
    teacherId: "2",
    proposedAmount: 6500,
    proposedType: "monthly",
    message: "Specialized in CBSE curriculum with focus on practical problem-solving.",
    deliveryPlan: "4 days per week, 2 hours per day.",
    availableStartDate: new Date("2025-11-26"),
    status: "shortlisted",
    createdAt: new Date("2025-11-22"),
  },
]

export const mockTeachers: TeacherProfile[] = [
  mockTeacherProfile,
  {
    ...mockTeacherProfile,
    id: "2",
    fullName: "Priya Patel",
    photo: "/professional-female-teacher-photo.jpg",
    headline: "Physics & Chemistry Expert | 6 Years Experience",
    subjects: ["Physics", "Chemistry"],
    experienceYears: 6,
    ratingAvg: 4.8,
    ratingCount: 98,
    hourlyRateFrom: 400,
    hourlyRateTo: 800,
  },
  {
    ...mockTeacherProfile,
    id: "3",
    fullName: "Amit Kumar",
    photo: "/young-male-teacher-photo.jpg",
    headline: "English Language Specialist | Cambridge Certified",
    subjects: ["English", "Literature"],
    experienceYears: 4,
    ratingAvg: 4.7,
    ratingCount: 72,
    hourlyRateFrom: 350,
    hourlyRateTo: 600,
  },
]

export const mockActivityData = [
  { month: "Jul", bids: 3, hired: 1 },
  { month: "Aug", bids: 5, hired: 2 },
  { month: "Sep", bids: 4, hired: 1 },
  { month: "Oct", bids: 7, hired: 3 },
  { month: "Nov", bids: 6, hired: 2 },
]

export const mockProfileViewsData = [
  { date: "Jul 25", views: 45 },
  { date: "Aug 25", views: 62 },
  { date: "Sep 25", views: 58 },
  { date: "Oct 25", views: 85 },
  { date: "Nov 25", views: 92 },
]
