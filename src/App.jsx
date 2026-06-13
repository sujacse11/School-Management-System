import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, NavLink } from 'react-router-dom';
// Note: We swapped BrowserRouter to HashRouter to resolve the GitHub Pages white screen issue.
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import ContactTeacher from './pages/ContactTeacher';
import SettingsPage from './pages/Settings';

// Main application router layout
const AppContent = () => {
  const { user, userType } = useApp();

  // If user is not authenticated, present the login page
  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Brand Header Navbar */}
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Content Panel */}
        <main className="main-content bg-slate-50 dark:bg-slate-950">
          <Routes>
            {/* Dynamic Dashboard route depending on User Type */}
            <Route 
              path="/" 
              element={
                userType === 'student' ? <StudentDashboard /> :
                userType === 'parent' ? <ParentDashboard /> :
                userType === 'teacher' ? <TeacherDashboard /> :
                <Navigate to="/login" replace />
              } 
            />

            {/* Parent contact form (Web3Forms) */}
            {userType === 'parent' && (
              <Route path="/contact" element={<ContactTeacher />} />
            )}

            {/* Settings page */}
            <Route path="/settings" element={<SettingsPage />} />

            {/* Fallback routing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    // Note: We use HashRouter here for seamless hosting on GitHub Pages 
    // (which doesn't support sub-page reloads natively under BrowserRouter).
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
