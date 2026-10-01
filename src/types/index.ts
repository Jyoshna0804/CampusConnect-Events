export type Role = 'student' | 'admin' | 'faculty';

export type EventCategory = 
  | 'Technology' 
  | 'Cultural' 
  | 'Sports' 
  | 'Workshop' 
  | 'Seminar' 
  | 'Competition' 
  | 'Club Activity';

export type RegistrationStatus = 'Pending' | 'Approved' | 'Rejected' | 'Completed';

export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  year: string;
  section: string;
  college: string;
  phone: string;
  avatar: string;
  role: Role;
  bio?: string;
}

export interface EventScheduleItem {
  time: string;
  activity: string;
}

export interface CollegeEvent {
  id: string;
  title: string;
  category: EventCategory;
  shortDescription: string;
  description: string;
  about: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  organizer: string;
  organizerRole?: string;
  capacity: number;
  registeredCount: number;
  registrationDeadline: string;
  eligibility: string;
  rules: string[];
  schedule: EventScheduleItem[];
  contactEmail: string;
  contactPhone: string;
  image: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  featured?: boolean;
}

export interface Registration {
  id: string;
  eventId: string;
  eventTitle: string;
  eventCategory: EventCategory;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventImage: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  department: string;
  year: string;
  phone: string;
  registeredAt: string;
  status: RegistrationStatus;
  rejectionReason?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'approval' | 'reminder' | 'completion' | 'certificate' | 'general';
  link?: string;
}

export interface CertificateItem {
  id: string;
  certificateNumber: string;
  eventId: string;
  eventName: string;
  eventCategory: EventCategory;
  studentName: string;
  studentId: string;
  department: string;
  college: string;
  participationDate: string;
  issuedDate: string;
  gradeOrRank?: string;
  signatory: string;
  signatoryTitle: string;
}

export interface CategoryInfo {
  id: string;
  name: EventCategory;
  slug: string;
  description: string;
  accentColor: string;
  gradient: string;
  eventCount: number;
}
