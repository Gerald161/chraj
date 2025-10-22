import { useEffect, useState } from 'react';
import { NotificationCard, NotificationData } from './notificationsComponents/NotificationCard';
import AppointmentDetails from './appointmentsComponents/AppointmentDetails';
import { Appointment } from '../types/case';

interface NotificationsProps{
  isDarkMode: boolean
}

export default function Notifications({ isDarkMode }: NotificationsProps) {
  const [currentView, setCurrentView] = useState<'notifications' | 'details'>('notifications');

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const [notifications, setNotifications] = useState<NotificationData []>([])

  const handleNotificationClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    readNotification();
    setCurrentView('details');
  };

  const handleBackToAppointments = () => {
    getNotifications();
    setCurrentView('notifications');
  };

  useEffect(()=>{
    getNotifications();
  }, [])

  async function getNotifications(){
    const myHeaders = new Headers();

    var token = localStorage.getItem("token");

    myHeaders.append("Authorization", `Token ${token}`);

    var req = await fetch("http://127.0.0.1:8000/complaints/get-all-notifications", {
      headers: myHeaders,
    })

    var response = await req.json();

    setNotifications(response["notifications"]);
  }

  async function readNotification(){

  }

  if(currentView === 'notifications'){
    return (
      <div className="space-y-4 p-6 overflow-y-auto">
        {notifications.map((notification, index) => (
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