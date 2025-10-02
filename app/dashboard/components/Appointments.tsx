import { useState, useMemo } from 'react';
import { Search, Calendar, Clock, MapPin, User, FileText, X, ChevronDown } from 'lucide-react';

interface AppointmentsProps{
  isDarkMode: Boolean
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

  const mockAppointments: Appointment[] = [
    {
      id: '1',
      title: 'Police Misconduct Investigation',
      type: 'hearing',
      date: '2025-01-15',
      time: '09:30',
      venue: 'CHRAJ Regional Office, Hearing Room A',
      caseNumber: 'PMI/2024/0125',
      parties: {
        complainant: 'John Doe',
        respondent: 'Ghana Police Service'
      },
      description: 'Initial hearing for police misconduct allegations involving excessive force during arrest.',
      officer: 'Officer John Smith'
    },
    {
      id: '2',
      title: 'Employment Discrimination Case',
      type: 'mediation',
      date: '2025-01-14',
      time: '14:00',
      venue: 'CHRAJ Regional Office, Mediation Room B',
      caseNumber: 'EDC/2024/0089',
      parties: {
        complainant: 'Mary Johnson',
        respondent: 'XYZ Corporation'
      },
      description: 'Mediation session for workplace discrimination complaint.',
      officer: 'Officer John Smith'
    },
    {
      id: '3',
      title: 'Land Dispute Resolution',
      type: 'hearing',
      date: '2025-01-12',
      time: '10:00',
      venue: 'CHRAJ Regional Office, Hearing Room C',
      caseNumber: 'LDR/2024/0045',
      parties: {
        complainant: 'Community Leaders',
        respondent: 'Local Authority'
      },
      description: 'Final hearing for community land rights dispute.',
      officer: 'Officer John Smith'
    },
    {
      id: '4',
      title: 'Government Service Complaint',
      type: 'mediation',
      date: '2025-01-18',
      time: '11:15',
      venue: 'CHRAJ Regional Office, Mediation Room A',
      caseNumber: 'GSC/2024/0156',
      parties: {
        complainant: 'Citizens Group',
        respondent: 'Municipal Assembly'
      },
      description: 'Mediation for service delivery complaints against municipal assembly.',
      officer: 'Officer John Smith'
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'hearing' | 'mediation'>('all');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');

  const filteredAndSortedAppointments = useMemo(() => {
    let filtered = mockAppointments;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(appointment =>
        appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.parties.complainant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.parties.respondent.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(appointment => appointment.type === filterType);
    }

    // Sort by date
    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [searchTerm, filterType]);

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

  const handleReschedule = () => {
    if (selectedAppointment && rescheduleDate && rescheduleTime) {
      // Handle reschedule logic here
      console.log('Rescheduling appointment:', {
        id: selectedAppointment.id,
        newDate: rescheduleDate,
        newTime: rescheduleTime
      });
      setSelectedAppointment(null);
      setRescheduleDate('');
      setRescheduleTime('');
    }
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
    modal: isDarkMode
      ? 'bg-slate-800 border-slate-700'
      : 'bg-white border-gray-200'
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
              key={appointment.id}
              className={`rounded-lg border ${themeClasses.card} p-4 cursor-pointer transition-all duration-200`}
              onClick={() => {
                setSelectedAppointment(appointment);
                setRescheduleDate(appointment.date);
                setRescheduleTime(appointment.time);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-lg font-semibold ${themeClasses.text}`}>
                      {appointment.title}
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
                        {appointment.caseNumber}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <User className={`w-4 h-4 ${themeClasses.textMuted}`} />
                    <span className={themeClasses.textSecondary}>
                      {appointment.parties.complainant} vs {appointment.parties.respondent}
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

      {/* Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-lg border ${themeClasses.modal} p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${themeClasses.text}`}>
                Appointment Details
              </h2>
              <button
                onClick={() => setSelectedAppointment(null)}
                className={`p-2 rounded-lg hover:bg-slate-700/50 transition-colors ${themeClasses.textMuted}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Title and Type */}
              <div>
                <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>
                  {selectedAppointment.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedAppointment.type)}`}>
                  {selectedAppointment.type.charAt(0).toUpperCase() + selectedAppointment.type.slice(1)}
                </span>
              </div>

              {/* Case Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`font-medium ${themeClasses.text} mb-3`}>Case Information</h4>
                  <div className="space-y-2 text-sm">
                    <p className={themeClasses.textSecondary}>
                      <span className="font-medium">Case Number:</span> {selectedAppointment.caseNumber}
                    </p>
                    {selectedAppointment.officer && (
                      <p className={themeClasses.textSecondary}>
                        <span className="font-medium">Assigned Officer:</span> {selectedAppointment.officer}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className={`font-medium ${themeClasses.text} mb-3`}>Schedule</h4>
                  <div className="space-y-2 text-sm">
                    <p className={themeClasses.textSecondary}>
                      <span className="font-medium">Date:</span> {formatDate(selectedAppointment.date)}
                    </p>
                    <p className={themeClasses.textSecondary}>
                      <span className="font-medium">Time:</span> {selectedAppointment.time}
                    </p>
                  </div>
                </div>
              </div>

              {/* Venue */}
              <div>
                <h4 className={`font-medium ${themeClasses.text} mb-3`}>Venue</h4>
                <div className="flex items-start gap-2">
                  <MapPin className={`w-4 h-4 ${themeClasses.textMuted} mt-0.5`} />
                  <span className={`text-sm ${themeClasses.textSecondary}`}>
                    {selectedAppointment.venue}
                  </span>
                </div>
              </div>

              {/* Parties */}
              <div>
                <h4 className={`font-medium ${themeClasses.text} mb-3`}>Parties Involved</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/30' : 'bg-gray-100'}`}>
                    <span className={`font-medium ${themeClasses.text} text-sm`}>Complainant</span>
                    <p className={`${themeClasses.textSecondary} text-sm mt-1`}>
                      {selectedAppointment.parties.complainant}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700/30' : 'bg-gray-100'}`}>
                    <span className={`font-medium ${themeClasses.text} text-sm`}>Respondent</span>
                    <p className={`${themeClasses.textSecondary} text-sm mt-1`}>
                      {selectedAppointment.parties.respondent}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {selectedAppointment.description && (
                <div>
                  <h4 className={`font-medium ${themeClasses.text} mb-3`}>Description</h4>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    {selectedAppointment.description}
                  </p>
                </div>
              )}

              {/* Reschedule Section */}
              <div className={`border-t ${isDarkMode ? 'border-slate-600' : 'border-gray-200'} pt-6`}>
                <h4 className={`font-medium ${themeClasses.text} mb-4`}>Reschedule Appointment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.textSecondary} mb-2`}>
                      New Date
                    </label>
                    <input
                      type="date"
                      value={rescheduleDate}
                      onChange={(e) => setRescheduleDate(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${themeClasses.input} focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.textSecondary} mb-2`}>
                      New Time
                    </label>
                    <input
                      type="time"
                      value={rescheduleTime}
                      onChange={(e) => setRescheduleTime(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${themeClasses.input} focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={`flex gap-3 mt-6 pt-4 border-t ${isDarkMode ? 'border-slate-600' : 'border-gray-200'}`}>
              <button
                onClick={handleReschedule}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Reschedule
              </button>
              <button
                onClick={() => setSelectedAppointment(null)}
                className={`px-4 py-2 rounded-lg border transition-colors font-medium ${
                  isDarkMode 
                    ? 'bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
