
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Eye, BarChart3, GraduationCap, BookOpen, User, Building2 } from 'lucide-react';
import FeedbackForm from '@/components/FeedbackForm';
import FeedbackList from '@/components/FeedbackList';
import { FeedbackItem } from '@/types/feedback';

const Index = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([
  {
    id: '1',
    studentName: 'Rahul Sharma',
    studentId: 'CS2023001',
    email: 'rahul.sharma@college.in',
    category: 'course',
    courseCode: 'CS101',
    courseName: 'Basics of Programming',
    professorName: 'Dr. Anil Kumar',
    semester: 'Odd 2024',
    rating: 5,
    message: 'Very good course! Assignments were tough but taught me a lot. Dr. Anil Kumar explained everything clearly and always helped when needed.',
    timestamp: new Date('2024-01-15T10:30:00'),
    status: 'reviewed'
  },
  {
    id: '2',
    studentName: 'Priya Verma',
    studentId: 'EE2023045',
    email: 'priya.verma@college.in',
    category: 'professor',
    professorName: 'Prof. Meena Reddy',
    semester: 'Odd 2024',
    rating: 4,
    message: 'Prof. Meena is very experienced and explains well, but the lectures move a bit fast. Slowing down would help students understand better.',
    timestamp: new Date('2024-01-14T14:45:00'),
    status: 'pending'
  },
  {
    id: '3',
    studentName: 'Amit Yadav',
    studentId: 'BM2020089',
    email: 'amit.yadav@college.in',
    category: 'facilities',
    semester: 'Odd 2024',
    rating: 3,
    message: 'Library is decent, but during exams it gets crowded. Also, WiFi signals are weak in the reading room and need improvement.',
    timestamp: new Date('2024-01-13T09:15:00'),
    status: 'resolved'
  },
  {
    id: '4',
    studentName: 'Sneha Nair',
    studentId: 'PH2022012',
    email: 'sneha.nair@college.in',
    category: 'course',
    courseCode: 'PHY201',
    courseName: 'Classical Mechanics',
    professorName: 'Dr. Rakesh Rao',
    semester: 'Even 2024',
    rating: 4,
    message: 'Strong theory classes by Dr. Rao, but more real-world examples and demo sessions will make learning easier.',
    timestamp: new Date('2024-01-12T16:20:00'),
    status: 'reviewed'
  },
  {
    id: '5',
    studentName: 'Mohit Singh',
    studentId: 'MA2023067',
    email: 'mohit.singh@college.in',
    category: 'general',
    semester: 'Odd 2024',
    rating: 5,
    message: 'Had a great experience at the college. Faculty is supportive, and student support services are always ready to help.',
    timestamp: new Date('2024-01-11T11:30:00'),
    status: 'pending'
  }
]
);

  const handleFeedbackSubmit = (newFeedback: FeedbackItem) => {
    setFeedbacks(prev => [newFeedback, ...prev]);
  };

  const getStats = () => {
    const totalFeedbacks = feedbacks.length;
    const averageRating = feedbacks.length > 0 
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
      : '0';
    
    const categoryCount = feedbacks.reduce((acc, f) => {
      acc[f.category] = (acc[f.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const statusCount = feedbacks.reduce((acc, f) => {
      acc[f.status] = (acc[f.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { totalFeedbacks, averageRating, categoryCount, statusCount };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-12 h-12 text-blue-900" />
            <h1 className="text-4xl font-bold text-blue-900 to-purple-600 bg-clip-text ">
              Student Feedback System
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive platform for students to share feedback about courses, professors, and college facilities
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalFeedbacks}</h3>
              <p className="text-gray-600">Total Submissions</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.averageRating}</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.statusCount.pending || 0}</h3>
              <p className="text-gray-600">Pending Review</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stats.categoryCount.course || 0}</h3>
              <p className="text-gray-600">Course Feedback</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="submit" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="submit" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Submit Feedback
            </TabsTrigger>
            <TabsTrigger value="view" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View All Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submit" className="space-y-6">
            <FeedbackForm onSubmit={handleFeedbackSubmit} />
          </TabsContent>

          <TabsContent value="view" className="space-y-6">
            <FeedbackList feedbacks={feedbacks} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
