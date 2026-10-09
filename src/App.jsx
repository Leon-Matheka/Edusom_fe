import { Routes, Route, Navigate } from 'react-router-dom';
import TeacherDashboard from './Dashboards/Teachers_Dashboard/Teacher_Dashboard.jsx';
import StudentPage from './Dashboards/Student_Dashboard/SD_Homepage.jsx';
import PD_Landing from './Dashboards/Parents_Dashboard/PD_Landing.jsx';
import PD_Homepage from './Dashboards/Parents_Dashboard/PD_Homepage.jsx';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/student" />} />
      <Route path="/teacher/*" element={<TeacherDashboard />} />
      <Route path="/student/*" element={<StudentPage />} />

      {/* Public marketing page — parents land here before signing in */}
      <Route path="/parent-landing" element={<PD_Landing />} />

      {/* Logged-in parent dashboard — Overview + Messages live inside PD_Homepage's own <Routes> */}
      <Route path="/parent/*" element={<PD_Homepage />} />
    </Routes>
  );
}

export default App;
