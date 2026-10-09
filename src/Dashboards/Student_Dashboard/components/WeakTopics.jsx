import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, BookOpen } from 'lucide-react';

const WeakTopics = ({ topics }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center space-x-2">
          <AlertCircle className="text-orange-500" size={20} />
          <span>Focus Areas</span>
        </h3>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
          {topics.length} Topics
        </span>
      </div>

      <div className="space-y-4">
        {topics.map((topic, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-orange-50 border border-orange-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-slate-800 text-sm">{topic.topic}</h4>
                <p className="text-xs text-slate-500">{topic.subject}</p>
              </div>
              <span className="text-xs font-bold text-orange-600 bg-white px-2 py-1 rounded-lg border border-orange-100">
                {topic.confidence}% Confidence
              </span>
            </div>

            <div className="w-full bg-orange-200 rounded-full h-1.5 mb-3">
              <div
                className="bg-orange-500 h-1.5 rounded-full"
                style={{ width: `${topic.confidence}%` }}
              ></div>
            </div>

            <button className="w-full flex items-center justify-between text-xs font-medium text-orange-700 bg-white p-2 rounded-lg border border-orange-100 hover:bg-orange-50 transition-colors group">
              <span className="flex items-center space-x-2">
                <BookOpen size={14} />
                <span>{topic.recommended_action}</span>
              </span>
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WeakTopics;
