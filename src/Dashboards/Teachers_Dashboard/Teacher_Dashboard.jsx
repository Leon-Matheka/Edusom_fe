import { Routes, Route } from 'react-router-dom';
import { LayoutDashboard, User, Upload as UploadIcon, FolderOpen, BarChart3, Users } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import Landing from './Landing.jsx';
import Profile from './Profile.jsx';
import Upload from './Upload.jsx';
import Resources from './Resources.jsx';
import Analytics from './Analytics.jsx';
import Socials from './Socials.jsx';

const nav = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/teacher' },
  { label: 'Profile', icon: User, to: '/teacher/profile' },
  { label: 'Upload', icon: UploadIcon, to: '/teacher/upload' },
  { label: 'Resources', icon: FolderOpen, to: '/teacher/resources' },
  { label: 'Analytics', icon: BarChart3, to: '/teacher/analytics' },
  { label: 'Socials', icon: Users, to: '/teacher/socials' },
];

export default function TeacherDashboard() {
  return (
    <DashboardLayout
      role="Teacher"
      nav={nav}
      user={{ name: 'Leon Otieno', detail: 'Mathematics & Physics' }}
      title="Teacher portal"
      subtitle="Grade 7B · Term 3"
      searchPlaceholder="Search classes, students…"
    >
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="profile" element={<Profile />} />
        <Route path="upload" element={<Upload />} />
        <Route path="resources" element={<Resources />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="socials" element={<Socials />} />
      </Routes>
    </DashboardLayout>
  );
}
