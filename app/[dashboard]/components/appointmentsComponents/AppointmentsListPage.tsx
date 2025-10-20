import { useState, useMemo, useEffect } from 'react';
import { Search, Calendar, Clock, User, FileText, ChevronDown } from 'lucide-react';
import { Appointment } from '../../types/case';
import { mockAppointments } from '../../data/mockAppointments';

interface AppointmentsListProps {
  isDarkMode: boolean;
  onAppointmentClick?: (appointment: Appointment) => void;
}

const AppointmentsListPage: React.FC<AppointmentsListProps> = ({ 
  isDarkMode, 
  onAppointmentClick 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'hearing' | 'mediation'>('all');

  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  const filteredAndSortedAppointments = useMemo(() => {
    let filtered = appointments;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(appointment =>
        appointment.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.case_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.complainant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.respondent.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(appointment => appointment.type === filterType);
    }

    // Sort by date
    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [appointments, searchTerm, filterType]);

  const handleAppointmentClick = (appointment: Appointment) => {
    if (onAppointmentClick) {
      onAppointmentClick(appointment);
    }
  };

  useEffect(()=>{
    getAllAppointments();
  }, [])

  async function getAllAppointments(){
    const myHeaders = new Headers();

    var token = localStorage.getItem("token");

    myHeaders.append("Authorization", `Token ${token}`);

    var req = await fetch("http://127.0.0.1:8000/complaints/get-all-appointments", {
      headers: myHeaders,
    })

    var response = await req.json();

    setAppointments(response["appointments"]);
  }

  const getTypeColor = (type: string) => {
    return type === 'hearing'
      ? (isDarkMode ? 'text-orange-400 bg-orange-500/20' : 'text-orange-600 bg-orange-100')
      : (isDarkMode ? 'text-purple-400 bg-purple-500/20' : 'text-purple-600 bg-purple-100');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const themeClasses = {
    container: isDarkMode 
      ? 'bg-slate-800/50 border-slate-700' 
      : 'bg-white border-gray-200',
    card: isDarkMode
      ? 'bg-slate-700/50 border-slate-600 hover:bg-slate-700/70'
      : 'bg-gray-50 border-gray-200 hover:bg-gray-100',
    input: isDarkMode
      ? 'bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500',
    select: isDarkMode
      ? 'bg-slate-800 border-slate-600 text-white focus:border-blue-500'
      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
  };

  return (
    <>
    <div className="overflow-y-auto flex-col">
      {/* Search and Filter Controls */}
      <div className={`border-b ${themeClasses.container} p-6 transition-all duration-200`}>
        <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeClasses.textMuted}`} />
          <input
            type="text"
            placeholder="Search appointments, case numbers, or parties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${themeClasses.input} focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'all' | 'hearing' | 'mediation')}
            className={`appearance-none pl-4 pr-10 py-3 rounded-lg border ${themeClasses.select} focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors cursor-pointer min-w-[140px]`}
            style={{
              colorScheme: isDarkMode ? 'dark' : 'light'
            }}
          >
            <option value="all">All Types</option>
            <option value="hearing">Hearings</option>
            <option value="mediation">Mediations</option>
          </select>
          <ChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeClasses.textMuted} pointer-events-none`} />
        </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4 p-6">
        {filteredAndSortedAppointments.length === 0 ? (
          <div className={`text-center py-12 ${themeClasses.textMuted} rounded-lg border ${themeClasses.card}`}>
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No appointments found matching your criteria.</p>
          </div>
        ) : (
          filteredAndSortedAppointments.map((appointment) => (
            <div
              key={appointment.appointment_id}
              className={`rounded-lg border ${themeClasses.card} p-4 cursor-pointer transition-all duration-200`}
              onClick={() => handleAppointmentClick(appointment)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-lg font-semibold ${themeClasses.text}`}>
                      {appointment.purpose}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className={`w-4 h-4 ${themeClasses.textMuted}`} />
                      <span className={themeClasses.textSecondary}>
                        {formatDate(appointment.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className={`w-4 h-4 ${themeClasses.textMuted}`} />
                      <span className={themeClasses.textSecondary}>
                        {appointment.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className={`w-4 h-4 ${themeClasses.textMuted}`} />
                      <span className={themeClasses.textSecondary}>
                        {appointment.case_id}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <User className={`w-4 h-4 ${themeClasses.textMuted}`} />
                    <span className={themeClasses.textSecondary}>
                      {appointment.complainant} vs {appointment.respondent}
                    </span>
                  </div>
                </div>

                <div className="ml-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(appointment.type)}`}>
                    {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default AppointmentsListPage;