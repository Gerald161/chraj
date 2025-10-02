import { useState } from 'react';
import { NotificationCard, NotificationData } from './notificationsComponents/NotificationCard';

interface NotificationsProps{
  isDarkMode: boolean
}

export default function Notifications({ isDarkMode }: NotificationsProps) {
  const sampleNotifications: NotificationData[] = [
    {
      id: '1',
      type: 'hearing',
      userRole: 'respondent',
      userName: 'Michael Ansah',
      caseNumber: 'CHRAJ/2024/0156',
      currentDateTime: '2025-10-15T10:00:00',
      proposedDateTime: '2025-10-22T14:30:00',
      reason: 'I have a medical appointment scheduled on the original date and would not be able to attend. I apologize for any inconvenience this may cause.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isRead: false,
    },
    {
      id: '2',
      type: 'mediation',
      userRole: 'complainant',
      userName: 'Ama Serwaa',
      caseNumber: 'CHRAJ/2024/0142',
      currentDateTime: '2025-10-08T09:00:00',
      proposedDateTime: '2025-10-10T11:00:00',
      reason: 'Due to an urgent family matter, I request to reschedule to a later date.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      isRead: true,
    },
  ];

  const handleNotificationClick = (id: string) => {
    console.log('Notification clicked:', id);
  };

  return (
    <div className="space-y-4 p-6 overflow-y-auto">
      {sampleNotifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onClick={handleNotificationClick}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  )
}