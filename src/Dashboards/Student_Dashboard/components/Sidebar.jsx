import React from 'react';
import { Home, BookOpen, BarChart2, MessageSquare, Settings, LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
    const menuItems = [
        { icon: Home, label: 'Dashboard', active: true },
        { icon: BookOpen, label: 'My Courses', active: false },
        { icon: BarChart2, label: 'Performance', active: false },
        { icon: MessageSquare, label: 'AI Tutor', active: false },
        { icon: Settings, label: 'Settings', active: false },
    ];

    return (
        <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 shadow-sm z-50 hidden md:flex flex-col"
        >
            <div className="p-6 border-b border-slate-100">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    EduSom AI
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${item.active
                                ? 'bg-primary-50 text-primary-600 font-medium'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-slate-50 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                        <User size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">Alex Johnson</p>
                        <p className="text-xs text-slate-500 truncate">Student</p>
                    </div>
                </div>
                <button className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </motion.div>
    );
};

export default Sidebar;
