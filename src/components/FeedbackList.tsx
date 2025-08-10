
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter, BookOpen, User, Building2, MessageCircle } from 'lucide-react';
import { FeedbackItem } from '@/types/feedback';
import FeedbackCard from './FeedbackCard';

interface FeedbackListProps {
  feedbacks: FeedbackItem[];
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const filteredFeedbacks = feedbacks
    .filter(feedback => {
      const matchesSearch = feedback.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           feedback.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (feedback.courseCode && feedback.courseCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (feedback.courseName && feedback.courseName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           (feedback.professorName && feedback.professorName.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = filterCategory === 'all' || feedback.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || feedback.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        case 'student-name':
          return a.studentName.localeCompare(b.studentName);
        default: // newest
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });

  const getStatsData = () => {
    const total = feedbacks.length;
    const avgRating = feedbacks.length > 0 
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
      : '0';
    
    const byCategory = feedbacks.reduce((acc, f) => {
      acc[f.category] = (acc[f.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byStatus = feedbacks.reduce((acc, f) => {
      acc[f.status] = (acc[f.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, avgRating, byCategory, byStatus };
  };

  const stats = getStatsData();

  if (feedbacks.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No feedback yet</h3>
          <p className="text-gray-500">Waiting for student feedback submissions...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center p-4">
          <h3 className="text-2xl font-bold text-blue-600">{stats.total}</h3>
          <p className="text-sm text-gray-600">Total Feedback</p>
        </Card>
        <Card className="text-center p-4">
          <h3 className="text-2xl font-bold text-yellow-600">{stats.avgRating}</h3>
          <p className="text-sm text-gray-600">Avg Rating</p>
        </Card>
        <Card className="text-center p-4">
          <h3 className="text-2xl font-bold text-orange-600">{stats.byStatus.pending || 0}</h3>
          <p className="text-sm text-gray-600">Pending</p>
        </Card>
        <Card className="text-center p-4">
          <h3 className="text-2xl font-bold text-green-600">{stats.byStatus.resolved || 0}</h3>
          <p className="text-sm text-gray-600">Resolved</p>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Student Feedback Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by student name, ID, course, or professor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="course">📚 Course</SelectItem>
                <SelectItem value="professor">👨‍🏫 Professor</SelectItem>
                <SelectItem value="facilities">🏢 Facilities</SelectItem>
                <SelectItem value="general">💬 General</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">⏳ Pending</SelectItem>
                <SelectItem value="reviewed">👀 Reviewed</SelectItem>
                <SelectItem value="resolved">✅ Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="rating-high">Highest Rating</SelectItem>
                <SelectItem value="rating-low">Lowest Rating</SelectItem>
                <SelectItem value="student-name">Student Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedbacks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No feedback matches your current filters.</p>
            </CardContent>
          </Card>
        ) : (
          filteredFeedbacks.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))
        )}
      </div>

      <div className="text-center text-sm text-gray-500">
        Showing {filteredFeedbacks.length} of {feedbacks.length} feedback submissions
      </div>
    </div>
  );
};

export default FeedbackList;
