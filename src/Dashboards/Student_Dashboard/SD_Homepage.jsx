import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, BarChart2, BookOpen, MessageSquare, ClipboardCheck } from "lucide-react";
import useStudentStore from "../../store/studentStore";
import DashboardLayout from "../../components/layout/DashboardLayout";
import SubjectPerformanceChart from "./components/SubjectPerformanceChart";
import WeakTopics from "./components/WeakTopics";
import AITutorChat from "./components/AITutorChat";
import NotesSection from "./components/NotesSection";
import CurriculumPanel from "./components/CurriculumPanel";
import QuizPlatform from "./components/QuizPlatform";

const nav = [
  { label: "Dashboard", icon: Home, to: "/student" },
  { label: "Performance", icon: BarChart2, hash: "#performance" },
  { label: "My courses", icon: BookOpen, hash: "#curriculum" },
  { label: "AI tutor", icon: MessageSquare, hash: "#tutor" },
  { label: "Quizzes", icon: ClipboardCheck, hash: "#quiz" },
];

export default function SD_Homepage() {
  const { studentData, loading, fetchStudentData } = useStudentStore();

  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!studentData) return null;

  return (
    <DashboardLayout
      role="Student"
      nav={nav}
      user={{ name: studentData.name, detail: "Grade 7B" }}
      title={`Welcome back, ${studentData.name.split(" ")[0]}`}
      subtitle="Here's what's happening with your learning today."
      searchPlaceholder="Search courses, topics…"
    >
      <div className="space-y-8">
        <motion.div
          id="performance"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid scroll-mt-24 grid-cols-1 gap-6 md:grid-cols-3"
        >
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Subject performance</h3>
              <select className="rounded-lg border border-border px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>This semester</option>
                <option>Last semester</option>
              </select>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {studentData.subject_summary.map((subject, i) => (
                <SubjectPerformanceChart key={i} subject={subject} />
              ))}
            </div>
          </div>
          <div className="md:col-span-1">
            <WeakTopics topics={studentData.weak_topics} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div id="curriculum" className="scroll-mt-24 lg:col-span-2">
            <CurriculumPanel curriculum={studentData.curriculum_suggestions} />
          </div>
          <div id="tutor" className="scroll-mt-24 lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <AITutorChat />
              <NotesSection />
            </div>
          </div>
        </div>

        <div id="quiz" className="scroll-mt-24">
          <QuizPlatform />
        </div>
      </div>
    </DashboardLayout>
  );
}
