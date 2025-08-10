
export interface FeedbackItem {
  id: string;
  studentName: string;
  studentId: string;
  email: string;
  category: 'course' | 'professor' | 'facilities' | 'general';
  courseCode?: string;
  courseName?: string;
  professorName?: string;
  semester: string;
  rating: number;
  message: string;
  timestamp: Date;
  status: 'pending' | 'reviewed' | 'resolved';
}

export interface FeedbackFormData {
  studentName: string;
  studentId: string;
  email: string;
  category: 'course' | 'professor' | 'facilities' | 'general';
  courseCode?: string;
  courseName?: string;
  professorName?: string;
  semester: string;
  rating: number;
  message: string;
}
