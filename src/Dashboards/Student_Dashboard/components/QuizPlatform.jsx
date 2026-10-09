import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Play, CheckCircle } from "lucide-react";

export default function QuizPlatform() {
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(null);

  const startQuiz = () => {
    setStarted(true);
    setScore(null);
  };

  const finishQuiz = () => {
    setScore(Math.floor(Math.random() * 40) + 60); // random 60–100
    setStarted(false);
  };

  return (
    <div className="bg-gradient-to-br from-primary-600 to-secondary-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Brain size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold">Daily Quiz Challenge</h2>
        </div>

        <p className="text-primary-100 mb-8 max-w-lg">
          Test your knowledge with AI-generated questions based on your recent weak topics.
        </p>

        {!started && score === null && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={startQuiz}
            className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold shadow-sm hover:bg-primary-50 transition-colors flex items-center space-x-2"
          >
            <Play size={18} />
            <span>Start Quiz</span>
          </motion.button>
        )}

        {started && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
          >
            <p className="text-lg font-medium mb-4">
              Question 1: What is the efficiency of a Carnot engine operating between 500K and 300K?
            </p>
            <div className="space-y-3 mb-6">
              {['40%', '60%', '25%', '50%'].map((opt, i) => (
                <button key={i} className="block w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                  {opt}
                </button>
              ))}
            </div>
            <button
              onClick={finishQuiz}
              className="bg-white text-primary-600 px-6 py-2 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Submit Answer
            </button>
          </motion.div>
        )}

        {score !== null && !started && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center space-x-4 bg-white/20 backdrop-blur-md p-4 rounded-xl inline-flex"
          >
            <CheckCircle size={32} className="text-emerald-300" />
            <div>
              <p className="font-semibold text-lg">Quiz Complete!</p>
              <p className="text-primary-100">You scored <span className="font-bold text-white">{score}%</span></p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
