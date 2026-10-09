import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Search, Menu } from "lucide-react";
import useStudentStore from "../../store/studentStore";
import Sidebar from "./components/Sidebar";
import SubjectPerformanceChart from "./components/SubjectPerformanceChart";
import WeakTopics from "./components/WeakTopics";
import AITutorChat from "./components/AITutorChat";
import NotesSection from "./components/NotesSection";
import CurriculumPanel from "./components/CurriculumPanel";
import QuizPlatform from "./components/QuizPlatform";

export default function SD_Homepage() {
  const { studentData, loading, fetchStudentData } = useStudentStore();

  useEffect(() => {
    fetchStudentData();
  }, [fetchStudentData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!studentData) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 md:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center md:hidden">
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                <Menu size={24} />
              </button>
            </div>

            <div className="hidden md:block">
              <h2 className="text-xl font-semibold text-slate-800">
                Welcome back, {studentData.name.split(' ')[0]}! 👋
              </h2>
              <p className="text-sm text-slate-500">Here's what's happening with your learning today.</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search courses, topics..."
                  className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
                />
              </div>
              <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <Bell size={24} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-8">
          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Subject Performance Charts */}
            <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Subject Performance</h3>
                <select className="px-3 py-1 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>This Semester</option>
                  <option>Last Semester</option>
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {studentData.subject_summary.map((subject, i) => (
                  <SubjectPerformanceChart key={i} subject={subject} />
                ))}
              </div>
            </div>

            {/* Weak Topics */}
            <div className="md:col-span-1">
              <WeakTopics topics={studentData.weak_topics} />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Curriculum Suggestions */}
            <div className="lg:col-span-2">
              <CurriculumPanel curriculum={studentData.curriculum_suggestions} />
            </div>

            {/* AI Tutor */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <AITutorChat />
                <NotesSection />
              </div>
            </div>
          </div>

          {/* Quiz Platform Placeholder */}
          <div className="mt-10">
            <QuizPlatform />
          </div>
        </main>
      </div>
    </div>
  );
}

