import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, Bell, Search } from 'lucide-react';
import { useState } from 'react';
import Landing from './Landing.jsx';
import Profile from './Profile.jsx';
import Upload from './Upload.jsx';
import Resources from './Resources.jsx';
import Analytics from './Analytics.jsx';
import Socials from './Socials.jsx';

export default function TeacherDashboard() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sidebar menu WITHOUT Landing
  const menu = [
    { label: 'Profile', path: '/teacher/profile' },
    { label: 'Upload', path: '/teacher/upload' },
    { label: 'Resources', path: '/teacher/resources' },
    { label: 'Analytics', path: '/teacher/analytics' },
    { label: 'Socials', path: '/teacher/socials' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:flex-shrink-0 w-64 bg-green-700 text-white transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Teacher Panel</h2>
          <ul className="space-y-4">
            {menu.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-3 py-2 rounded-lg ${
                    location.pathname === item.path
                      ? 'bg-green-800 font-semibold'
                      : 'hover:bg-green-600'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <button
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>

          <h2 className="text-xl font-semibold text-slate-800 hidden md:block">
            Welcome Teacher 👋
          </h2>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search classes, students..."
                className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
              />
            </div>
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full">
              <Bell size={24} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Routes */}
        <main className="p-6 space-y-8">
          <Routes>
            {/* Default landing page after login */}
            <Route path="/" element={<Landing />} />
            <Route path="profile" element={<Profile />} />
            <Route path="upload" element={<Upload />} />
            <Route path="resources" element={<Resources />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="Socials" element={<Socials />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}