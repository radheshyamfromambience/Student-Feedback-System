
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Star, Send, CheckCircle, GraduationCap } from 'lucide-react';
import { FeedbackFormData, FeedbackItem } from '@/types/feedback';
import { useToast } from '@/hooks/use-toast';

interface FeedbackFormProps {
  onSubmit: (feedback: FeedbackItem) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    studentName: '',
    studentId: '',
    email: '',
    category: 'course',
    courseCode: '',
    courseName: '',
    professorName: '',
    semester: '',
    rating: 0,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.studentName || !formData.studentId || !formData.email || !formData.semester || !formData.message || formData.rating === 0) {
      toast({
        title: "Please fill in all required fields",
        description: "All required fields must be completed to submit feedback.",
        variant: "destructive"
      });
      return;
    }

    // Validate course/professor fields based on category
    if (formData.category === 'course' && (!formData.courseCode || !formData.courseName)) {
      toast({
        title: "Course information required",
        description: "Please provide course code and name for course feedback.",
        variant: "destructive"
      });
      return;
    }

    if (formData.category === 'professor' && !formData.professorName) {
      toast({
        title: "Professor name required",
        description: "Please provide professor name for professor feedback.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      ...formData,
      timestamp: new Date(),
      status: 'pending'
    };
    
    onSubmit(newFeedback);
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Feedback submitted successfully!",
      description: "Thank you for your valuable feedback. It will be reviewed by the administration.",
    });

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        studentName: '',
        studentId: '',
        email: '',
        category: 'course',
        courseCode: '',
        courseName: '',
        professorName: '',
        semester: '',
        rating: 0,
        message: ''
      });
    }, 3000);
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-green-700 mb-2">Thank You!</h3>
          <p className="text-gray-600">Your feedback has been submitted successfully and will be reviewed by the administration.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <GraduationCap className="w-6 h-6 text-blue-600" />
          Student Feedback Form
        </CardTitle>
        <CardDescription className="text-center">
          Share your feedback about courses, professors, and college facilities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name *</Label>
              <Input
                id="studentName"
                value={formData.studentName}
                onChange={(e) => setFormData(prev => ({ ...prev, studentName: e.target.value }))}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID *</Label>
              <Input
                id="studentId"
                value={formData.studentId}
                onChange={(e) => setFormData(prev => ({ ...prev, studentId: e.target.value }))}
                placeholder="Enter your student ID"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your college email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="semester">Semester *</Label>
              <Select value={formData.semester} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, semester: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                  <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                  <SelectItem value="Summer 2024">Summer 2024</SelectItem>
                  <SelectItem value="Fall 2023">Fall 2023</SelectItem>
                  <SelectItem value="Spring 2023">Spring 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Feedback Category *</Label>
            <Select value={formData.category} onValueChange={(value: 'course' | 'professor' | 'facilities' | 'general') => 
              setFormData(prev => ({ ...prev, category: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select feedback category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="course">📚 Course Feedback</SelectItem>
                <SelectItem value="professor">👨‍🏫 Professor Feedback</SelectItem>
                <SelectItem value="facilities">🏢 Facilities Feedback</SelectItem>
                <SelectItem value="general">💬 General Feedback</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(formData.category === 'course' || formData.category === 'professor') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.category === 'course' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="courseCode">Course Code *</Label>
                    <Input
                      id="courseCode"
                      value={formData.courseCode}
                      onChange={(e) => setFormData(prev => ({ ...prev, courseCode: e.target.value }))}
                      placeholder="e.g., CS101"
                      required={formData.category === 'course'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courseName">Course Name *</Label>
                    <Input
                      id="courseName"
                      value={formData.courseName}
                      onChange={(e) => setFormData(prev => ({ ...prev, courseName: e.target.value }))}
                      placeholder="e.g., Introduction to Computer Science"
                      required={formData.category === 'course'}
                    />
                  </div>
                </>
              )}
              {(formData.category === 'professor' || formData.category === 'course') && (
                <div className="space-y-2">
                  <Label htmlFor="professorName">Professor Name {formData.category === 'professor' ? '*' : ''}</Label>
                  <Input
                    id="professorName"
                    value={formData.professorName}
                    onChange={(e) => setFormData(prev => ({ ...prev, professorName: e.target.value }))}
                    placeholder="Enter professor's name"
                    required={formData.category === 'professor'}
                  />
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition-all duration-200 ${
                    star <= formData.rating 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300 hover:text-yellow-200'
                  }`}
                  onClick={() => handleRatingClick(star)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Feedback Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="min-h-32"
              placeholder="Please provide your detailed feedback..."
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Submit Feedback
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
