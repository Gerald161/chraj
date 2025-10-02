import { useState, useMemo } from 'react';
import { Search, Calendar, Clock, MapPin, User, FileText, X, ChevronDown } from 'lucide-react';
import AppointmentsListPage from './appointmentsComponents/AppointmentsListPage';
import AppointmentDetails from './appointmentsComponents/AppointmentDetails';

interface AppointmentsProps{
  isDarkMode: boolean
}

export default function Appointments({ isDarkMode }: AppointmentsProps) {
  interface Appointment {
    id: string;
    title: string;
    type: 'hearing' | 'mediation';
    date: string;
    time: string;
    venue: string;
    caseNumber: string;
    parties: {
      complainant: string;
      respondent: string;
    };
    description?: string;
    officer?: string;
  }

  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentView, setCurrentView] = useState<'appointments' | 'details'>('appointments');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const themeClasses = theme === 'dark' 
    ? 'bg-slate-900 text-white' 
    : 'bg-gray-100 text-gray-900';

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
