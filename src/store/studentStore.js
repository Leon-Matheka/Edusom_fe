import { create } from 'zustand';

const useStudentStore = create((set) => ({
  studentData: null,
  loading: true,
  error: null,
  
  // Mock Data
  fetchStudentData: async () => {
    set({ loading: true });
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = {
        name: "Alex Johnson",
        id: "ST001",
        overall_progress: 78,
        subject_summary: [
          { subject: "Mathematics", score: 85, progress: 85, grade: "A", last_assessment: "2023-10-15" },
          { subject: "Physics", score: 72, progress: 72, grade: "B", last_assessment: "2023-10-12" },
          { subject: "Chemistry", score: 65, progress: 65, grade: "C+", last_assessment: "2023-10-10" },
          { subject: "Biology", score: 90, progress: 90, grade: "A+", last_assessment: "2023-10-18" },
          { subject: "English", score: 88, progress: 88, grade: "A", last_assessment: "2023-10-20" }
        ],
        weak_topics: [
          { topic: "Thermodynamics", subject: "Physics", confidence: 45, recommended_action: "Review Module 4" },
          { topic: "Organic Chemistry", subject: "Chemistry", confidence: 50, recommended_action: "Practice Quiz 3" },
          { topic: "Calculus - Integration", subject: "Mathematics", confidence: 55, recommended_action: "Watch Video Lesson" }
        ],
        curriculum_suggestions: [
          { title: "Advanced Thermodynamics", type: "Video", duration: "15 min", status: "Pending" },
          { title: "Organic Chemistry Basics", type: "Quiz", duration: "20 min", status: "In Progress" },
          { title: "Integration Techniques", type: "Article", duration: "10 min", status: "Pending" }
        ]
      };
      
      set({ studentData: mockData, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useStudentStore;
