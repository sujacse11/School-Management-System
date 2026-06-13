import React, { createContext, useContext, useState, useEffect } from 'react';
import { studentsData as initialStudents } from '../data/students';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('school_students');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Cache invalidation check: if cache contains old formats, clean it up
      if (parsed.length > 0 && (parsed[0].id.startsWith('STU0') || parsed[0].name !== 'Alex Johnson' || parsed[0].class !== 'Grade 5 - A')) {
        localStorage.removeItem('school_students');
        localStorage.removeItem('school_user');
        localStorage.removeItem('school_user_type');
        return initialStudents;
      }
      let updated = false;
      const verified = parsed.map(s => {
        let changed = false;
        let item = { ...s };
        
        if (!item.attendanceDetail) {
          const matching = initialStudents.find(initS => initS.id === s.id);
          item.attendanceDetail = matching ? matching.attendanceDetail : {
            june: { present: 21, workingDays: 22 },
            july: { present: 21, workingDays: 22 }
          };
          changed = true;
        }

        if (item.section === 'B') {
          item.section = 'A';
          changed = true;
        }

        if (changed) {
          updated = true;
        }
        return item;
      });

      if (updated) {
        localStorage.setItem('school_students', JSON.stringify(verified));
      }
      return verified;
    }
    return initialStudents;
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('school_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Format upgrade check: if cached parent user has old childId or old childName, clear session
      if (parsed.childId && (parsed.childId.startsWith('STU0') || parsed.childName === 'Arjun Sharma')) {
        localStorage.removeItem('school_user');
        localStorage.removeItem('school_user_type');
        return null;
      }
      // Format upgrade check: if cached student user has old ID format or old name, clear session
      if (parsed.id && (parsed.id.startsWith('STU0') || parsed.name === 'Arjun Sharma')) {
        localStorage.removeItem('school_user');
        localStorage.removeItem('school_user_type');
        return null;
      }
      return parsed;
    }
    return null;
  });

  const [userType, setUserType] = useState(() => {
    return localStorage.getItem('school_user_type') || null;
  });

  const [web3Key, setWeb3Key] = useState(() => {
    return localStorage.getItem('school_web3_key') || '';
  });

  const [sentMessages, setSentMessages] = useState(() => {
    const saved = localStorage.getItem('school_sent_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('school_dark_mode');
    return saved ? JSON.parse(saved) === true : true; // default dark mode
  });

  // Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem('school_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('school_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('school_user');
    }
  }, [user]);

  useEffect(() => {
    if (userType) {
      localStorage.setItem('school_user_type', userType);
    } else {
      localStorage.removeItem('school_user_type');
    }
  }, [userType]);

  useEffect(() => {
    localStorage.setItem('school_web3_key', web3Key);
  }, [web3Key]);

  useEffect(() => {
    localStorage.setItem('school_sent_messages', JSON.stringify(sentMessages));
  }, [sentMessages]);

  useEffect(() => {
    localStorage.setItem('school_dark_mode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const login = (email, password) => {
    // Check for Teacher/Admin account
    if (email.toLowerCase() === 'teacher@school.com' && password === 'teacher123') {
      const teacherUser = { name: 'Mrs. Sarah Connor (Class Teacher)', email: 'teacher@school.com', role: 'teacher' };
      setUser(teacherUser);
      setUserType('teacher');
      return { success: true, user: teacherUser, type: 'teacher' };
    }

    // Check Students
    const student = students.find(s => s.email.toLowerCase() === email.toLowerCase() && s.password === password);
    if (student) {
      setUser(student);
      setUserType('student');
      return { success: true, user: student, type: 'student' };
    }

    // Check Parents
    const studentWithParent = students.find(s => s.parent.email.toLowerCase() === email.toLowerCase() && s.parent.password === password);
    if (studentWithParent) {
      // For parent, we store both parent details and link to child
      const parentUser = {
        ...studentWithParent.parent,
        childId: studentWithParent.id,
        childName: studentWithParent.name
      };
      setUser(parentUser);
      setUserType('parent');
      return { success: true, user: parentUser, type: 'parent' };
    }

    return { success: false, message: 'Invalid credentials. Please try again.' };
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
  };

  const updateStudentDetails = (studentId, updatedData) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const updated = { ...s, ...updatedData };
        // If logged in user is this student or parent of this student, update session user details dynamically!
        if (userType === 'student' && user.id === studentId) {
          setUser(updated);
        } else if (userType === 'parent' && user.childId === studentId) {
          setUser({
            ...updated.parent,
            childId: updated.id,
            childName: updated.name
          });
        }
        return updated;
      }
      return s;
    }));
  };

  const addSentMessage = (message) => {
    setSentMessages(prev => [message, ...prev]);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <AppContext.Provider value={{
      user,
      userType,
      students,
      web3Key,
      setWeb3Key,
      sentMessages,
      addSentMessage,
      darkMode,
      toggleDarkMode,
      login,
      logout,
      updateStudentDetails
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
