import React, { useState } from 'react';
import { Circle, Calendar } from 'lucide-react';

interface HearingContentProps {
  theme: 'light' | 'dark';
}

export const HearingContent: React.FC<HearingContentProps> = ({ theme }) => {
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRescheduleClick = () => {
    setShowReschedule(true);
    setIsSubmitted(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRescheduleDate(e.target.value);
  };

  const handleSubmitRequest = () => {
    if (rescheduleDate) {
      setIsSubmitted(true);
      setShowReschedule(false);
    }
  };

  const handleCancel = () => {
    setShowReschedule(false);
    setRescheduleDate('');
  };

  const formatDateTime = (dateString: string) => {
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
      {/* Hearing Status */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Hearing Phase</h2>
        <div className="flex items-center space-x-3 mb-4">
          <Circle className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
          <span className="text-lg font-medium opacity-75">Pending</span>
        </div>
        <p className="opacity-75 mb-6">A formal hearing will be scheduled once the investigation phase is complete.</p>
      </div>

      {/* Hearing Schedule */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-start space-x-3 mb-6">
          <Calendar className="w-6 h-6 text-blue-500 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-xl">Hearing Scheduled</h3>
            <p className="opacity-75 mt-2">Initial hearing scheduled for case assessment</p>
          </div>
        </div>
        
        {/* Original Schedule */}
        <div className={`p-6 rounded-lg mb-6 ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
            <div><strong>Date:</strong> September 8, 2024</div>
            <div><strong>Time:</strong> 10:00 AM</div>
            <div><strong>Venue:</strong> CHRAJ Regional Office</div>
          </div>
        </div>

        {/* Requested Reschedule (Submitted) */}
        {isSubmitted && rescheduleDate && (
          <div className={`p-6 rounded-lg mb-6 ${
            theme === 'dark' ? 'bg-blue-600/20 border-2 border-blue-500' : 'bg-blue-50 border-2 border-blue-300'
          }`}>
            <h4 className="font-semibold text-blue-600 mb-3">Requested New Schedule</h4>
            <div className="text-lg">
              <p><strong>Requested Date & Time:</strong> {formatDateTime(rescheduleDate)}</p>
              <p className="text-sm mt-2 opacity-75">Status: Pending Approval</p>
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
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
        </div>
        
        {/* Reschedule Form */}
        {showReschedule && (
          <div className={`mt-6 p-6 rounded-lg border-2 ${
            theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'
          }`}>
            <h4 className="font-semibold text-lg mb-4">Select New Date and Time</h4>
            <input
              type="datetime-local"
              value={rescheduleDate}
              onChange={handleDateChange}
              className={`w-full px-4 py-3 rounded-lg border mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            <div className="flex gap-3">
              <button 
                onClick={handleSubmitRequest}
                disabled={!rescheduleDate}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200"
              >
                Submit Request
              </button>
              <button 
                onClick={handleCancel}
                className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  theme === 'dark' 
                    ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
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