import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, User, FileText, Save, CheckCircle, X } from 'lucide-react';
import { Appointment } from '../../types/case';

interface AppointmentDetailsProps {
  appointment: Appointment;
  isDarkMode: boolean;
  onBack: () => void;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ 
  appointment, 
  isDarkMode, 
  onBack 
}) => {
  const [rescheduleDate, setRescheduleDate] = useState(
    appointment.new_date || appointment.date
  );

  const [rescheduleTime, setRescheduleTime] = useState(
    appointment.new_time || appointment.time
  );
  
  const [showSaveButton, setShowSaveButton] = useState(true);
  const [showSuccessCard, setShowSuccessCard] = useState(false);

  const getTypeColor = (type: string) => {
    return type === 'hearing'
      ? (isDarkMode ? 'text-orange-400 bg-orange-500/20' : 'text-orange-600 bg-orange-100')
      : (isDarkMode ? 'text-purple-400 bg-purple-500/20' : 'text-purple-600 bg-purple-100');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleReschedule = async () => {
    if (rescheduleDate && rescheduleTime) {
      const myHeaders = new Headers();

      var token = localStorage.getItem("token");

      myHeaders.append("Authorization", `Token ${token}`);

      const formdata = new FormData();

      formdata.append("date", rescheduleDate);
      formdata.append("time", rescheduleTime);

      var req = await fetch(`http://127.0.0.1:8000/complaints/reschedule-appointment/${appointment.appointment_id}`, {
        method: 'POST',
        headers: myHeaders,
        body: formdata
      })

      var response = await req.json();

      if(response["status"] == "saved"){
        appointment.date = rescheduleDate;
        appointment.time = rescheduleTime;
        
        setShowSuccessCard(true);
        
        setTimeout(() => {
          setShowSuccessCard(false);
        }, 5000);
      }
    }
  };

  useEffect(()=>{
    if(appointment.status == "resolved" || appointment.status == "decision"){
      setShowSaveButton(false);
    }

    if(appointment.type == "hearing" && appointment.status == "mediation"){
      setShowSaveButton(false);
    }
  }, [])

  const themeClasses = {
    container: isDarkMode 
      ? 'bg-slate-900 text-white' 
      : 'bg-gray-100 text-gray-900',
    card: isDarkMode
      ? 'bg-slate-800/50 border-slate-700'
      : 'bg-white border-gray-200',
    input: isDarkMode
      ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    button: isDarkMode
      ? 'bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700'
      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
  };

  return (
    <div className={`overflow-y-auto transition-colors duration-200 ${themeClasses.container}`}>
      <div className="container mx-auto p-6">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Title and Type */}
          <div className={`rounded-lg border ${themeClasses.card} p-6`}>
            <div className="flex items-start justify-between mb-4">
              <div className='flex gap-2'>
                <button
                  onClick={onBack}
                  className={`p-2 rounded-lg transition-colors ${themeClasses.button} border cursor-pointer`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className={`text-2xl font-bold ${themeClasses.text}`}>
                  {appointment.purpose}
                </h2>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getTypeColor(appointment.type)}`}>
                {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <FileText className={`w-4 h-4 ${themeClasses.textMuted}`} />
              <span className={`font-medium ${themeClasses.textSecondary}`}>
                Case Number: {appointment.case_id}
              </span>
            </div>
          </div>

          {/* Schedule Information */}
          <div className={`rounded-lg border ${themeClasses.card} p-6`}>
            <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>
              Schedule Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className={`w-5 h-5 ${themeClasses.textMuted}`} />
                  <div>
                    <p className={`font-medium ${themeClasses.text}`}>Date</p>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>
                      {formatDate(appointment.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className={`w-5 h-5 ${themeClasses.textMuted}`} />
                  <div>
                    <p className={`font-medium ${themeClasses.text}`}>Time</p>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>
                      {appointment.time}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-3">
                  <MapPin className={`w-5 h-5 ${themeClasses.textMuted} mt-0.5`} />
                  <div>
                    <p className={`font-medium ${themeClasses.text}`}>Venue</p>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>
                      {appointment.venue}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parties Involved */}
          <div className={`rounded-lg border ${themeClasses.card} p-6`}>
            <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>
              { appointment.attendee == "both" ? "Parties Involved" : "Attendee"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {
                (appointment.attendee == "both" || appointment.attendee == "complainant") &&
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/30' : 'bg-gray-100'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <User className={`w-4 h-4 ${themeClasses.textMuted}`} />
                    <span className={`font-medium ${themeClasses.text}`}>Complainant</span>
                  </div>
                  <p className={`${themeClasses.textSecondary}`}>
                    {appointment.complainant}
                  </p>
                </div>
              }
              {
                (appointment.attendee == "both" || appointment.attendee == "respondent") &&
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700/30' : 'bg-gray-100'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <User className={`w-4 h-4 ${themeClasses.textMuted}`} />
                    <span className={`font-medium ${themeClasses.text}`}>Respondent</span>
                  </div>
                  <p className={`${themeClasses.textSecondary}`}>
                    {appointment.respondent}
                  </p>
                </div>
              }
            </div>
          </div>

          {/* Reschedule Section */}
          {showSaveButton && (
            <div className="space-y-4">
              {/* Success Card */}
              {showSuccessCard && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  <div className={`${
                    isDarkMode 
                      ? 'bg-green-900/90 border-green-700' 
                      : 'bg-green-50 border-green-200'
                  } border rounded-lg p-4 flex items-start gap-3`}>
                    <CheckCircle className={`w-5 h-5 ${
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    } flex-shrink-0 mt-0.5`} />
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        isDarkMode ? 'text-green-200' : 'text-green-800'
                      }`}>
                        Appointment Rescheduled
                      </h4>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-green-300' : 'text-green-700'
                      }`}>
                        Your appointment has been successfully rescheduled to {formatDate(rescheduleDate)} at {rescheduleTime}.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowSuccessCard(false)}
                      className={`${
                        isDarkMode ? 'text-green-300 hover:text-green-100' : 'text-green-600 hover:text-green-800'
                      } transition-colors cursor-pointer`}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Reschedule Form */}
              <div className={`rounded-lg border ${themeClasses.card} p-6`}>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>
                  Reschedule Appointment
                </h3>
                <div className="space-y-4">
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
                        style={{
                          colorScheme: isDarkMode ? 'dark' : 'light'
                        }}
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
                        style={{
                          colorScheme: isDarkMode ? 'dark' : 'light'
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleReschedule}
                      className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                    <button
                      onClick={onBack}
                      className={`px-4 cursor-pointer py-2 rounded-lg border transition-colors font-medium ${themeClasses.button}`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;