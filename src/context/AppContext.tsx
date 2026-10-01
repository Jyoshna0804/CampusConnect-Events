import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CollegeEvent, 
  Registration, 
  NotificationItem, 
  CertificateItem, 
  User, 
  CategoryInfo,
  RegistrationStatus,
  EventCategory
} from '../types';
import { 
  INITIAL_EVENTS, 
  INITIAL_REGISTRATIONS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_CERTIFICATES, 
  INITIAL_CATEGORIES, 
  INITIAL_STUDENT_USER, 
  INITIAL_ADMIN_USER 
} from '../data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  // Authentication & User
  currentUser: User;
  currentRole: 'student' | 'admin' | 'faculty';
  login: (email: string, role: 'student' | 'admin') => boolean;
  logout: () => void;
  updateProfile: (updated: Partial<User>) => void;
  resetProfileToDefault: () => void;
  switchUserRole: (role: 'student' | 'admin') => void;

  // Events
  events: CollegeEvent[];
  getEventById: (id: string) => CollegeEvent | undefined;
  addEvent: (eventData: Omit<CollegeEvent, 'id' | 'registeredCount'>) => CollegeEvent;
  updateEvent: (id: string, eventData: Partial<CollegeEvent>) => void;
  deleteEvent: (id: string) => void;

  // Registrations
  registrations: Registration[];
  isRegisteredForEvent: (eventId: string) => boolean;
  getRegistrationForEvent: (eventId: string) => Registration | undefined;
  registerForEvent: (eventId: string, formData?: { phone?: string; notes?: string }) => { success: boolean; message: string };
  cancelRegistration: (registrationId: string) => void;
  updateRegistrationStatus: (registrationId: string, status: RegistrationStatus, rejectionReason?: string) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (id: string) => void;

  // Certificates
  certificates: CertificateItem[];
  getCertificateById: (id: string) => CertificateItem | undefined;
  issueCertificate: (cert: Omit<CertificateItem, 'id' | 'certificateNumber'>) => CertificateItem;

  // Categories
  categories: CategoryInfo[];
  addCategory: (category: Omit<CategoryInfo, 'id' | 'eventCount'>) => void;
  updateCategory: (id: string, updated: Partial<CategoryInfo>) => void;
  deleteCategory: (id: string) => void;

  // Toast System
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user & role state
  const [currentRole, setCurrentRole] = useState<'student' | 'admin' | 'faculty'>(() => {
    const saved = localStorage.getItem('campusconnect_role');
    return (saved as 'student' | 'admin' | 'faculty') || 'student';
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('campusconnect_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.studentId === '23951A0588') {
          parsed.studentId = INITIAL_STUDENT_USER.studentId;
          parsed.section = INITIAL_STUDENT_USER.section;
        }
        return parsed;
      } catch (e) {
        console.error('Error parsing saved user', e);
      }
    }
    return currentRole === 'admin' ? INITIAL_ADMIN_USER : INITIAL_STUDENT_USER;
  });

  // Events state
  const [events, setEvents] = useState<CollegeEvent[]>(() => {
    const saved = localStorage.getItem('campusconnect_events');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing events', e);
      }
    }
    return INITIAL_EVENTS;
  });

  // Registrations state
  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem('campusconnect_registrations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing registrations', e);
      }
    }
    return INITIAL_REGISTRATIONS;
  });

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('campusconnect_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing notifications', e);
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Certificates state
  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    const saved = localStorage.getItem('campusconnect_certificates');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing certificates', e);
      }
    }
    return INITIAL_CERTIFICATES;
  });

  // Categories state
  const [categories, setCategories] = useState<CategoryInfo[]>(() => {
    const saved = localStorage.getItem('campusconnect_categories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing categories', e);
      }
    }
    return INITIAL_CATEGORIES;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('campusconnect_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('campusconnect_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('campusconnect_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('campusconnect_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('campusconnect_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('campusconnect_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('campusconnect_categories', JSON.stringify(categories));
  }, [categories]);

  // Auth functions
  const login = (email: string, role: 'student' | 'admin'): boolean => {
    if (role === 'admin') {
      setCurrentRole('admin');
      const adminObj = { ...INITIAL_ADMIN_USER, email: email || INITIAL_ADMIN_USER.email };
      setCurrentUser(adminObj);
      showToast('Welcome Dr. Rao', 'Logged in to Admin Faculty Portal', 'success');
      return true;
    } else {
      setCurrentRole('student');
      const studentObj = { ...INITIAL_STUDENT_USER, email: email || INITIAL_STUDENT_USER.email };
      setCurrentUser(studentObj);
      showToast('Welcome back Jyoshna!', 'Logged in successfully to CampusConnect', 'success');
      return true;
    }
  };

  const logout = () => {
    showToast('Logged Out', 'You have securely signed out', 'info');
  };

  const switchUserRole = (role: 'student' | 'admin') => {
    setCurrentRole(role);
    if (role === 'admin') {
      setCurrentUser(INITIAL_ADMIN_USER);
      showToast('Switched to Admin', 'Viewing Admin and Faculty Management', 'info');
    } else {
      setCurrentUser(INITIAL_STUDENT_USER);
      showToast('Switched to Student', 'Viewing as Jyoshna (CSE 3rd Year)', 'info');
    }
  };

  const updateProfile = (updated: Partial<User>) => {
    setCurrentUser(prev => {
      const nextUser = { ...prev, ...updated };
      // Cascade studentId/name/dept changes to their registrations and certificates
      if (updated.studentId || updated.name || updated.department || updated.phone || updated.email) {
        const oldId = prev.studentId;
        const newId = updated.studentId || prev.studentId;
        setRegistrations(prevRegs =>
          prevRegs.map(r =>
            r.studentId === oldId
              ? {
                  ...r,
                  studentId: newId,
                  studentName: updated.name || r.studentName,
                  studentEmail: updated.email || r.studentEmail,
                  department: updated.department || r.department,
                  year: updated.year || r.year,
                  phone: updated.phone || r.phone,
                }
              : r
          )
        );

        setCertificates(prevCerts =>
          prevCerts.map(c =>
            c.studentId === oldId
              ? {
                  ...c,
                  studentId: newId,
                  studentName: updated.name || c.studentName,
                  department: updated.department || c.department,
                  college: updated.college || c.college,
                }
              : c
          )
        );
      }
      return nextUser;
    });
    showToast('Profile Updated', 'Student profile details updated successfully', 'success');
  };

  const resetProfileToDefault = () => {
    setCurrentUser(INITIAL_STUDENT_USER);
    localStorage.setItem('campusconnect_user', JSON.stringify(INITIAL_STUDENT_USER));
    setRegistrations(prevRegs =>
      prevRegs.map(r =>
        r.studentName === 'Jyoshna'
          ? {
              ...r,
              studentId: INITIAL_STUDENT_USER.studentId,
              department: INITIAL_STUDENT_USER.department,
              year: INITIAL_STUDENT_USER.year,
            }
          : r
      )
    );
    showToast('Profile Reset', 'Reset to official university records', 'info');
  };

  // Event functions
  const getEventById = (id: string) => {
    return events.find(e => e.id === id);
  };

  const addEvent = (eventData: Omit<CollegeEvent, 'id' | 'registeredCount'>): CollegeEvent => {
    const newId = `evt_${Date.now()}`;
    const newEvent: CollegeEvent = {
      ...eventData,
      id: newId,
      registeredCount: 0,
    };
    setEvents(prev => [newEvent, ...prev]);

    // Update category count
    setCategories(prev =>
      prev.map(c => (c.name === newEvent.category ? { ...c, eventCount: c.eventCount + 1 } : c))
    );

    // Create notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'New Event Announced',
      message: `"${newEvent.title}" has been scheduled for ${newEvent.date}. Early registrations are open!`,
      timestamp: 'Just now',
      read: false,
      type: 'general',
      link: `/events/${newId}`,
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast('Event Created', `"${newEvent.title}" is now published on the campus portal`, 'success');
    return newEvent;
  };

  const updateEvent = (id: string, eventData: Partial<CollegeEvent>) => {
    setEvents(prev => prev.map(e => (e.id === id ? { ...e, ...eventData } : e)));
    showToast('Event Updated', 'Event details have been updated successfully', 'success');
  };

  const deleteEvent = (id: string) => {
    const ev = events.find(e => e.id === id);
    if (ev) {
      setEvents(prev => prev.filter(e => e.id !== id));
      // update category count
      setCategories(prev =>
        prev.map(c => (c.name === ev.category ? { ...c, eventCount: Math.max(0, c.eventCount - 1) } : c))
      );
      showToast('Event Deleted', `"${ev.title}" has been removed`, 'warning');
    }
  };

  // Registration functions
  const isRegisteredForEvent = (eventId: string): boolean => {
    return registrations.some(r => r.eventId === eventId && r.studentId === currentUser.studentId && r.status !== 'Rejected');
  };

  const getRegistrationForEvent = (eventId: string): Registration | undefined => {
    return registrations.find(r => r.eventId === eventId && r.studentId === currentUser.studentId);
  };

  const registerForEvent = (eventId: string, formData?: { phone?: string; notes?: string }) => {
    const event = events.find(e => e.id === eventId);
    if (!event) {
      return { success: false, message: 'Event not found' };
    }

    if (isRegisteredForEvent(eventId)) {
      return { success: false, message: 'You are already registered for this event!' };
    }

    if (event.registeredCount >= event.capacity) {
      return { success: false, message: 'Event has reached maximum seat capacity' };
    }

    const newRegId = `reg_${Date.now()}`;
    const newRegistration: Registration = {
      id: newRegId,
      eventId: event.id,
      eventTitle: event.title,
      eventCategory: event.category,
      eventDate: event.date,
      eventTime: event.time,
      eventLocation: event.location,
      eventImage: event.image,
      studentId: currentUser.studentId,
      studentName: currentUser.name,
      studentEmail: currentUser.email,
      department: currentUser.department,
      year: currentUser.year,
      phone: formData?.phone || currentUser.phone,
      registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending',
    };

    setRegistrations(prev => [newRegistration, ...prev]);

    // Increment registeredCount on event
    setEvents(prev =>
      prev.map(e => (e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e))
    );

    // Send confirmation notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Registration Submitted',
      message: `Your registration for "${event.title}" is submitted and pending faculty coordinator review.`,
      timestamp: 'Just now',
      read: false,
      type: 'general',
      link: '/my-registrations',
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast('Registration Submitted!', `Successfully registered for ${event.title}`, 'success');
    return { success: true, message: 'Registration submitted successfully!' };
  };

  const cancelRegistration = (registrationId: string) => {
    const reg = registrations.find(r => r.id === registrationId);
    if (reg) {
      setRegistrations(prev => prev.filter(r => r.id !== registrationId));
      // Decrement event registered count
      setEvents(prev =>
        prev.map(e => (e.id === reg.eventId ? { ...e, registeredCount: Math.max(0, e.registeredCount - 1) } : e))
      );
      showToast('Registration Cancelled', `Cancelled registration for "${reg.eventTitle}"`, 'info');
    }
  };

  const updateRegistrationStatus = (registrationId: string, status: RegistrationStatus, rejectionReason?: string) => {
    setRegistrations(prev =>
      prev.map(r => (r.id === registrationId ? { ...r, status, rejectionReason } : r))
    );

    const reg = registrations.find(r => r.id === registrationId);
    if (reg) {
      // Add notification for the student
      const notifMessage =
        status === 'Approved'
          ? `Your registration for "${reg.eventTitle}" has been approved!`
          : status === 'Rejected'
          ? `Your registration for "${reg.eventTitle}" was not approved${rejectionReason ? `: ${rejectionReason}` : '.'}`
          : `Your registration status for "${reg.eventTitle}" changed to ${status}.`;

      const notifItem: NotificationItem = {
        id: `notif_${Date.now()}`,
        title: `Registration ${status}`,
        message: notifMessage,
        timestamp: 'Just now',
        read: false,
        type: status === 'Approved' ? 'approval' : status === 'Completed' ? 'completion' : 'general',
        link: '/my-registrations',
      };
      setNotifications(prev => [notifItem, ...prev]);

      showToast(`Registration ${status}`, `${reg.studentName} - ${reg.eventTitle}`, status === 'Approved' ? 'success' : 'warning');
    }
  };

  // Notification functions
  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All Caught Up', 'All notifications marked as read', 'info');
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Certificate functions
  const getCertificateById = (id: string) => {
    return certificates.find(c => c.id === id);
  };

  const issueCertificate = (certData: Omit<CertificateItem, 'id' | 'certificateNumber'>): CertificateItem => {
    const certNum = `IARE/CERT/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;
    const newCert: CertificateItem = {
      ...certData,
      id: `cert_${Date.now()}`,
      certificateNumber: certNum,
    };
    setCertificates(prev => [newCert, ...prev]);

    // Send notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'New Certificate Issued',
      message: `Congratulations! Your certificate for "${newCert.eventName}" is now available.`,
      timestamp: 'Just now',
      read: false,
      type: 'certificate',
      link: '/certificates',
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast('Certificate Issued', `Issued to ${newCert.studentName} for ${newCert.eventName}`, 'success');
    return newCert;
  };

  // Category functions
  const addCategory = (catData: Omit<CategoryInfo, 'id' | 'eventCount'>) => {
    const newCat: CategoryInfo = {
      ...catData,
      id: `cat_${Date.now()}`,
      eventCount: 0,
    };
    setCategories(prev => [...prev, newCat]);
    showToast('Category Added', `Added "${newCat.name}" category`, 'success');
  };

  const updateCategory = (id: string, updated: Partial<CategoryInfo>) => {
    setCategories(prev => prev.map(c => (c.id === id ? { ...c, ...updated } : c)));
    showToast('Category Updated', 'Category details saved', 'success');
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    showToast('Category Deleted', 'Category removed', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        login,
        logout,
        updateProfile,
        resetProfileToDefault,
        switchUserRole,
        events,
        getEventById,
        addEvent,
        updateEvent,
        deleteEvent,
        registrations,
        isRegisteredForEvent,
        getRegistrationForEvent,
        registerForEvent,
        cancelRegistration,
        updateRegistrationStatus,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,
        certificates,
        getCertificateById,
        issueCertificate,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
