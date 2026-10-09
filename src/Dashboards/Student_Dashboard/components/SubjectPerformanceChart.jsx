import React from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const SubjectPerformanceChart = ({ subject }) => {
  const data = [
    {
      name: 'Score',
      uv: subject.score,
      fill: '#0ea5e9',
    },
    {
      name: 'Max',
      uv: 100,
      fill: '#f0f9ff',
    },
  ];

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-emerald-500 bg-emerald-50';
    if (grade.startsWith('B')) return 'text-blue-500 bg-blue-50';
    if (grade.startsWith('C')) return 'text-yellow-500 bg-yellow-50';
    return 'text-red-500 bg-red-50';
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-slate-50 rounded-xl p-4 border border-slate-100"
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-slate-700">{subject.subject}</h4>
        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${getGradeColor(subject.grade)}`}>
          {subject.grade}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="h-24 w-24 relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="60%"
              outerRadius="100%"
              barSize={8}
              data={data}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                background
                clockWise
                dataKey="uv"
                cornerRadius={10}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-xl font-bold text-slate-800">{subject.score}%</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Progress</span>
            <span className="font-medium text-slate-700">{subject.progress}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <div
              className="bg-primary-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${subject.progress}%` }}
            ></div>
          </div>
          <div className="flex items-center space-x-1 text-xs text-slate-400 mt-1">
            <span>Last assessment: {subject.last_assessment}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubjectPerformanceChart;
