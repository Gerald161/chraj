import React, { useState } from 'react';
import { Calendar, MapPin, FileText, Clock, AlertCircle, CheckCircle, Briefcase, File } from 'lucide-react';

interface HearingContentProps {
  theme: 'light' | 'dark';
}

export const HearingContent: React.FC<HearingContentProps> = ({ theme }) => {
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const requiredItems = [
    'Record investigation findings',
    'Witness statements',
    'Official documents',
    'ID verification'
  ];

  const handleRescheduleClick = () => {
    setShowReschedule(true);
    setIsSubmitted(false);
  };

  const handleConfirmAttendance = () => {
    setIsConfirmed(true);
  };

  const handleCancelAttendance = () => {
    setIsConfirmed(false);
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
      {/* Hearing Information */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Formal Hearing</h2>
        
        <div className={`p-4 rounded-lg mb-6 border-l-4 border-green-500 ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-green-50'
        }`}>
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-lg text-green-600">Hearing Scheduled</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              theme === 'dark' ? 'bg-green-600/20 text-green-300' : 'bg-green-100 text-green-800'
            }`}>
              Confirmed
            </span>
          </div>
          
          {/* Confirmed Attendance Success Card */}
          {isConfirmed && (
            <div className={`p-4 rounded-lg mb-4 ${
              theme === 'dark' ? 'bg-green-600/30 border-2 border-green-500' : 'bg-green-100 border-2 border-green-400'
            }`}>
              <div className="flex items-center space-x-3 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-600">Attendance Confirmed</h4>
              </div>
              <p className="text-sm opacity-75 ml-8">
                Your attendance has been successfully confirmed. You will receive a reminder before the hearing date.
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 opacity-60" />
              <span>September 8, 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 opacity-60" />
              <span>10:00 AM</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 opacity-60" />
              <span>CHRAJ Regional Office</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 opacity-60" />
              <span>Case: CHR001</span>
            </div>
          </div>
          
          <p className="text-sm opacity-75">You are required to attend this formal hearing. Please arrive 15 minutes early and bring all required documents.</p>
          
          {/* Requested Reschedule (Submitted) */}
          {isSubmitted && rescheduleDate && (
            <div className={`mt-4 p-4 rounded-lg border-2 ${
              theme === 'dark' ? 'bg-blue-600/20 border-blue-500' : 'bg-blue-50 border-blue-300'
            }`}>
              <h4 className="font-semibold text-blue-600 mb-2">Requested New Schedule</h4>
              <div className="text-sm">
                <p><strong>Requested Date & Time:</strong> {formatDateTime(rescheduleDate)}</p>
                <p className="mt-2 opacity-75">Status: Pending Approval</p>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button 
              onClick={isConfirmed ? handleCancelAttendance : handleConfirmAttendance}
              disabled={isSubmitted}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isSubmitted || isConfirmed
                  ? theme === 'dark' 
                    ? 'bg-green-600/30 border-2 border-green-500 text-white hover:bg-green-600/40' 
                    : 'bg-green-100 border-2 border-green-400 text-green-700 hover:bg-green-200'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              } ${isSubmitted ? 'cursor-not-allowed' : ''}`}
            >
              {isConfirmed ? 'Cancel Attendance' : 'Confirm Attendance'}
            </button>
            <button 
              onClick={handleRescheduleClick}
              disabled={isConfirmed}
              className={`flex-1 border-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                isConfirmed
                  ? theme === 'dark'
                    ? 'border-gray-600 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-400 cursor-not-allowed'
                  : `border-green-600 text-green-600 ${
                      theme === 'dark' ? 'hover:bg-green-600/10' : 'hover:bg-green-50'
                    }`
              }`}
            >
              {isSubmitted ? 'Change Reschedule Request' : 'Request Reschedule'}
            </button>
          </div>
        </div>
        
        {/* Reschedule Form */}
        {showReschedule && (
          <div className={`p-6 rounded-lg border-2 mb-6 ${
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

      {/* Required Documents */}
      {requiredItems.length > 0 && (
        <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className="text-xl font-semibold mb-4">Required Documents</h3>
          <p className="text-sm opacity-75 mb-4">Please bring the following documents to your hearing:</p>
          
          <div className="space-y-2">
            {requiredItems.map((item, index) => (
              <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <File className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Important Notes */}
      <div className={`p-4 rounded-lg border-l-4 border-yellow-500 ${
        theme === 'dark' ? 'bg-gray-700/50' : 'bg-yellow-50'
      }`}>
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-yellow-600 mb-2">Important Notes</h4>
            <ul className="text-sm opacity-75 space-y-1">
              <li>• Bring original documents and photocopies</li>
              <li>• Arrive 15 minutes before your scheduled time</li>
              <li>• Organize documents in chronological order</li>
              <li>• Contact your case officer if you have questions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* What to Expect */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className="text-xl font-semibold mb-4">What to Expect</h3>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <h4 className="font-medium mb-2">Hearing Process</h4>
            <p className="text-sm opacity-75">You will have the opportunity to present your side of the case and respond to the allegations made against you.</p>
          </div>
          
          <div className={`p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <h4 className="font-medium mb-2">Legal Representation</h4>
            <p className="text-sm opacity-75">You have the right to be represented by a lawyer or bring a support person with you.</p>
          </div>
          
          <div className={`p-4 rounded-lg ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <h4 className="font-medium mb-2">Duration</h4>
            <p className="text-sm opacity-75">The hearing is expected to last approximately 2-3 hours, depending on the complexity of the case.</p>
          </div>
        </div>
      </div>
    </div>
  );
};