import React, { createContext, useContext, useState } from 'react';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'threat' | 'connection' | 'evidence' | 'score' | 'system';
  read: boolean;
  timestamp: string;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (n: Omit<AppNotification, 'id' | 'read' | 'timestamp'>) => void;
  addToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'not-1',
    title: 'High-risk profile detected',
    message: 'Potential customer care impersonation account flagged targeting banking users.',
    type: 'threat',
    read: false,
    timestamp: '10 mins ago'
  },
  {
    id: 'not-2',
    title: 'Genius AI found a possible connection',
    message: 'Lookalike domain hdfc-verify.top linked to SMS Sender ID VM-HDFCBK.',
    type: 'connection',
    read: false,
    timestamp: '25 mins ago'
  },
  {
    id: 'not-3',
    title: 'New evidence added to Case #CAS-2026-0914',
    message: 'Forensic screenshot hashed with SHA-256 integrity signature in Evidence Vault.',
    type: 'evidence',
    read: false,
    timestamp: '1 hour ago'
  },
  {
    id: 'not-4',
    title: 'Potential campaign detected',
    message: 'Campaign CMP-BANK-SUPPORT-01 exhibits 87% coordinated correlation.',
    type: 'threat',
    read: true,
    timestamp: '2 hours ago'
  },
  {
    id: 'not-5',
    title: 'Digital safety score updated',
    message: 'Account security assessment evaluated. Platform safety index: 82/100.',
    type: 'score',
    read: true,
    timestamp: 'Yesterday'
  }
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (n: Omit<AppNotification, 'id' | 'read' | 'timestamp'>) => {
    const item: AppNotification = {
      ...n,
      id: `not-${Date.now()}`,
      read: false,
      timestamp: 'Just now'
    };
    setNotifications(prev => [item, ...prev]);
  };

  const addToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    addNotification({
      title: type.toUpperCase(),
      message,
      type: 'system'
    });
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification,
      addToast
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
