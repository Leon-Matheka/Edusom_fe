import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, FileText, CheckCircle, Clock, ChevronRight } from 'lucide-react';

const CurriculumPanel = ({ curriculum }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'Video': return <PlayCircle size={18} className="text-blue-500" />;
      case 'Quiz': return <CheckCircle size={18} className="text-emerald-500" />;
      case 'Article': return <FileText size={18} className="text-purple-500" />;
      default: return <FileText size={18} className="text-slate-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Personalized Curriculum</h3>
        <button className="text-sm text-primary-600 font-medium hover:text-primary-700 flex items-center">
          View All <ChevronRight size={16} />
        </button>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-100"></div>

        <div className="space-y-6">
          {curriculum.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start space-x-4 pl-2 group"
            >
              <div className="relative z-10 bg-white p-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${item.status === 'In Progress' ? 'border-primary-500 bg-primary-50' : 'border-slate-200 bg-white'
                  }`}>
                  {getIcon(item.type)}
                </div>
              </div>

              <div className="flex-1 bg-slate-50 rounded-xl p-4 hover:bg-white hover:shadow-md transition-all border border-slate-100 cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-slate-800">{item.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-xs text-slate-500">
                  <span className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{item.duration}</span>
                  </span>
                  <span>•</span>
                  <span>{item.type}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurriculumPanel;
