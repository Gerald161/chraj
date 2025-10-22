import { useState } from 'react';
import { NotificationCard, NotificationData } from './notificationsComponents/NotificationCard';
import AppointmentDetails from './appointmentsComponents/AppointmentDetails';
import { Appointment } from '../types/case';

interface NotificationsProps{
  isDarkMode: boolean
}

export default function Notifications({ isDarkMode }: NotificationsProps) {
  const [currentView, setCurrentView] = useState<'notifications' | 'details'>('notifications');

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const sampleNotifications: NotificationData[] = [
    {
      notification_id: '1',
      requester: 'respondent',
      new_date: '2025-10-22',
      new_time: '14:30:00',
      is_read: false,
      type: 'hearing',
      user_name: 'Michael Ansah',
      appointment: {
        appointment_id: 'appt_001',
        type: 'hearing',
        purpose: 'Case hearing for complaint resolution',
        date: '2025-10-15',
        time: '10:00:00',
        venue: 'CHRAJ Office, Conference Room A',
        case_id: 'CHRAJ/2024/0156',
        complainant: 'John Mensah',
        respondent: 'Michael Ansah',
        status: 'pending',
        complainant_attending: true,
        respondent_attending: true,
        attendee: 'Commissioner Owusu'
      }
    },
    {
      notification_id: '2',
      requester: 'complainant',
      new_date: '2025-10-10',
      new_time: '11:00:00',
      is_read: true,
      type: 'mediation',
      user_name: 'Ama Serwaa',
      appointment: {
        appointment_id: 'appt_002',
        type: 'mediation',
        purpose: 'Mediation session for dispute resolution',
        date: '2025-10-08',
        time: '09:00:00',
        venue: 'CHRAJ Office, Mediation Room 2',
        case_id: 'CHRAJ/2024/0142',
        complainant: 'Ama Serwaa',
        respondent: 'Kwame Boateng',
        status: 'in_progress',
        complainant_attending: true,
        respondent_attending: false,
        attendee: 'Mediator Adomako'
      }
    }
  ];

  const handleNotificationClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setCurrentView('details');
  };

  const handleBackToAppointments = () => {
    setCurrentView('notifications');
    setSelectedAppointment(null);
  };

  if(currentView === 'notifications'){
    return (
      <div className="space-y-4 p-6 overflow-y-auto">
        {sampleNotifications.map((notification, index) => (
          <NotificationCard
            key={index}
            notification={notification}
            onClick={handleNotificationClick}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    )
  }else{
    return (
      <AppointmentDetails
        appointment={selectedAppointment!}
        isDarkMode={isDarkMode}
        onBack={handleBackToAppointments}
      />
    )
  }
}