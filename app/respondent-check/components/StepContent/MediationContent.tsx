import React, { useState, useRef } from 'react';
import { Calendar, MapPin, FileText, Clock, Users } from 'lucide-react';

interface MediationContentProps {
  theme: 'light' | 'dark';
}

export const MediationContent: React.FC<MediationContentProps> = ({ theme }) => {
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleRescheduleClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.click();
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setRescheduleDate(selectedDate);
    setShowReschedule(true);
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-8">
      {/* Mediation Information */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Mediation Session</h2>
        
        <div className={`p-4 rounded-lg mb-6 border-l-4 border-green-500 ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-green-50'
        }`}>
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-lg text-green-600">Mediation Scheduled</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              theme === 'dark' ? 'bg-green-600/20 text-green-300' : 'bg-green-100 text-green-800'
            }`}>
              Optional
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 opacity-60" />
              <span>September 15, 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 opacity-60" />
              <span>2:00 PM</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 opacity-60" />
              <span>CHRAJ Mediation Center</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 opacity-60" />
              <span>Case: CHR001</span>
            </div>
          </div>
          
          <p className="text-sm opacity-75">Mediation is a voluntary process where both parties work together to reach a mutual agreement with the help of a neutral mediator.</p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              Confirm Attendance
            </button>
            <button 
              onClick={handleRescheduleClick}
              className={`flex-1 border-2 border-green-600 text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                theme === 'dark' ? 'hover:bg-green-600/10' : 'hover:bg-green-50'
              }`}
            >
              Request Reschedule
            </button>
          </div>
        </div>
        
        {/* Hidden datetime input */}
        <input
          ref={dateInputRef}
          type="datetime-local"
          className="hidden"
          onChange={handleDateChange}
        />
        
        {/* Reschedule confirmation */}
        {showReschedule && (
          <div className={`p-4 rounded-lg mb-6 border-l-4 border-blue-500 ${
            theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'
          }`}>
            <h3 className="font-semibold text-lg text-blue-600 mb-3">Reschedule Request</h3>
            <p className="text-sm opacity-75 mb-4">
              You have selected: <strong>{formatDateTime(rescheduleDate)}</strong>
            </p>
            <div className="flex gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                Submit Request
              </button>
              <button 
                onClick={() => setShowReschedule(false)}
                className={`border-2 border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Benefits of Mediation */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className="text-xl font-semibold mb-4">Benefits of Mediation</h3>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-medium">Collaborative Resolution</h4>
                <p className="text-sm opacity-75 mt-1">Work together to find a solution that works for both parties</p>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <h4 className="font-medium">Faster Resolution</h4>
                <p className="text-sm opacity-75 mt-1">Mediation can resolve cases more quickly than formal hearings</p>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-purple-500 mt-1" />
              <div>
                <h4 className="font-medium">Confidential Process</h4>
                <p className="text-sm opacity-75 mt-1">Discussions during mediation remain confidential</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};