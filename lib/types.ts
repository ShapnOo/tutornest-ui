// User Roles
export type UserRole = "teacher" | "student" | "guardian" | "admin"

// Teacher Profile
export interface TeacherProfile {
  id: string
  userId: string
  fullName: string
  photo?: string
  headline: string
  subjects: string[]
  levels: string[]
  teachingMode: ("online" | "home-tutor" | "student-visit" | "hybrid")[]
  location: {
    city: string
    area: string
    pin: string
    maxDistanceKm?: number
  }
  hourlyRateFrom: number
  hourlyRateTo: number
  minMonthlyPackage?: number
  experienceYears: number
  education: string
  certifications: string[]
  achievements: string[]
  languages: string[]
  bio: string
  ratingAvg: number
  ratingCount: number
  totalStudentsTaught: number
  totalClasses: number
  verificationStatus: "pending" | "verified" | "rejected"
  availability: boolean
  createdAt: Date
}

// Guardian Info (Required for students)
export interface GuardianInfo {
  guardianName: string
  relationship: string
  phonePrimary: string
  phoneSecondary?: string
  email: string
  address: string
  city: string
  preferredCommunication: "whatsapp" | "call" | "email"
}

// Student Profile
export interface StudentProfile {
  id: string
  userId: string
  studentName: string
  age: number
  class: string
  board: string
  subjectsNeeded: string[]
  guardian: GuardianInfo
  learningPreferences: {
    mode: ("online" | "home" | "visit-tutor")[]
    daysPerWeek: number
    timeSlots: string[]
  }
  createdAt: Date
}

// Tuition Post
export interface TuitionPost {
  id: string
  createdByGuardianId: string
  studentId: string
  title: string
  subjects: string[]
  level: string
  board: string
  mode: ("online" | "home" | "visit-tutor")[]
  location?: {
    city: string
    area: string
  }
  budgetAmount: number
  budgetType: "monthly" | "per-hour" | "per-subject"
  description: string
  minExperienceYears?: number
  genderPreference?: "male" | "female" | "any"
  languagePreference?: string[]
  schedule: {
    daysPerWeek: number
    timeSlot: string
  }
  visibility: "public" | "invited-only"
  status: "open" | "in-bidding" | "hired" | "in-progress" | "completed" | "closed"
  expiresAt: Date
  createdAt: Date
  bidsCount: number
}

// Tuition Bid
export interface TuitionBid {
  id: string
  tuitionPostId: string
  teacherId: string
  teacher?: TeacherProfile
  proposedAmount: number
  proposedType: "monthly" | "per-hour" | "per-subject"
  message: string
  deliveryPlan: string
  availableStartDate: Date
  attachments?: string[]
  status: "applied" | "shortlisted" | "demo-scheduled" | "hired" | "rejected" | "withdrawn"
  createdAt: Date
}

// Class Booking / Contract
export interface ClassBooking {
  id: string
  tuitionPostId: string
  teacherId: string
  studentId: string
  agreedAmount: number
  amountType: "monthly" | "hourly"
  classesPerWeek: number
  startDate: Date
  nextBillingDate: Date
  status: "active" | "paused" | "completed" | "cancelled"
}

// Review
export interface Review {
  id: string
  bookingId: string
  givenById: string
  forTeacherId?: string
  forStudentId?: string
  rating: number
  comment: string
  createdAt: Date
}

// Stats for dashboards
export interface TeacherStats {
  activeBids: number
  hiredTuitions: number
  profileViews: number
  monthlyEarnings: number
  totalStudents: number
}

export interface GuardianStats {
  activeTuitions: number
  totalBidsReceived: number
  shortlisted: number
  hired: number
}
