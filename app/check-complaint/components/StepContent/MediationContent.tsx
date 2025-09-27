import React, { useState, useRef } from 'react';
import { Circle, Calendar } from 'lucide-react';

interface MediationContentProps {
  theme: 'light' | 'dark';
}

export const MediationContent: React.FC<MediationContentProps> = ({ theme }) => {
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [showReschedule, setShowReschedule] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleRescheduleClick = () => {
    dateInputRef.current?.click();
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setRescheduleDate(selectedDate);
    setShowReschedule(true);
  };

  const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Mediation Status */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Mediation Phase</h2>
        <div className="flex items-center space-x-3 mb-4">
          <Circle className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
          <span className="text-lg font-medium opacity-75">Pending</span>
        </div>
        <p className="opacity-75 mb-6">Mediation is an optional step where both parties can work together to reach a mutual agreement.</p>
      </div>

      {/* Mediation Schedule */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-start space-x-3 mb-6">
          <Calendar className="w-6 h-6 text-blue-500 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-xl">Mediation Scheduled</h3>
            <p className="opacity-75 mt-2">Mediation session scheduled for case resolution</p>
          </div>
        </div>
        
        <div className={`p-6 rounded-lg mb-6 ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
            <div><strong>Date:</strong> September 15, 2024</div>
            <div><strong>Time:</strong> 2:00 PM</div>
            <div><strong>Venue:</strong> CHRAJ Mediation Center</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200">
            Confirm Attendance
          </button>
          <button 
            onClick={handleRescheduleClick}
            className={`py-4 rounded-lg font-medium transition-colors duration-200 ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Request Reschedule
          </button>
          <input
            ref={dateInputRef}
            type="datetime-local"
            className="hidden"
            onChange={handleDateChange}
          />
        </div>
        
        {showReschedule && rescheduleDate && (
          <div className={`mt-6 p-4 rounded-lg ${
            theme === 'dark' ? 'bg-blue-600/20 border border-blue-500' : 'bg-blue-50 border border-blue-200'
          }`}>
            <h4 className="font-semibold text-blue-600 mb-2">Reschedule Request</h4>
            <p className="text-sm mb-3">Requested new date and time:</p>
            <p className="font-medium text-lg">{formatDateTime(rescheduleDate)}</p>
            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors duration-200">
                Submit Request
              </button>
              <button 
                onClick={() => setShowReschedule(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};