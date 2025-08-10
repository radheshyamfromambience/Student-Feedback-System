
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen, User, Building2, MessageCircle, GraduationCap, Clock } from 'lucide-react';
import { FeedbackItem } from '@/types/feedback';

interface FeedbackCardProps {
  feedback: FeedbackItem;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'course':
        return <BookOpen className="w-4 h-4" />;
      case 'professor':
        return <User className="w-4 h-4" />;
      case 'facilities':
        return <Building2 className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'course':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'professor':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'facilities':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'course':
        return 'Course Feedback';
      case 'professor':
        return 'Professor Feedback';
      case 'facilities':
        return 'Facilities Feedback';
      default:
        return 'General Feedback';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="w-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{feedback.studentName}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>ID: {feedback.studentId}</span>
                <span>•</span>
                <span>{feedback.email}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`${getStatusColor(feedback.status)} text-xs`}>
              {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
            </Badge>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= feedback.rating 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Badge className={`${getCategoryColor(feedback.category)} flex items-center gap-1`}>
            {getCategoryIcon(feedback.category)}
            {getCategoryLabel(feedback.category)}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {feedback.semester}
          </Badge>
        </div>

        {(feedback.courseCode || feedback.courseName || feedback.professorName) && (
          <div className="mt-2 p-3 bg-gray-50 rounded-md">
            {feedback.courseCode && feedback.courseName && (
              <p className="text-sm font-medium text-gray-700">
                Course: {feedback.courseCode} - {feedback.courseName}
              </p>
            )}
            {feedback.professorName && (
              <p className="text-sm font-medium text-gray-700">
                Professor: {feedback.professorName}
              </p>
            )}
          </div>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="mb-3 text-xs text-gray-500 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {feedback.timestamp.toLocaleDateString()} at {feedback.timestamp.toLocaleTimeString()}
        </div>
        <p className="text-gray-700 leading-relaxed">{feedback.message}</p>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
