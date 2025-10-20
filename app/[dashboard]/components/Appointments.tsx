import { useState, useEffect } from 'react';
import AppointmentsListPage from './appointmentsComponents/AppointmentsListPage';
import AppointmentDetails from './appointmentsComponents/AppointmentDetails';
import { Appointment } from '../types/case';

interface AppointmentsProps{
  isDarkMode: boolean
}

export default function Appointments({ isDarkMode }: AppointmentsProps) {
  const [currentView, setCurrentView] = useState<'appointments' | 'details'>('appointments');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setCurrentView('details');
  };

  const handleBackToAppointments = () => {
    setCurrentView('appointments');
    setSelectedAppointment(null);
  };

  if(currentView === 'appointments'){
    return (
      <AppointmentsListPage
        isDarkMode={isDarkMode}
        onAppointmentClick={handleAppointmentClick}
      />
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
