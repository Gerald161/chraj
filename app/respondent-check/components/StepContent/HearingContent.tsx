import React, { useState, useRef } from 'react';
import { Calendar, MapPin, FileText, Clock, User, Mail, Users, AlertCircle, Car as IdCard, Briefcase } from 'lucide-react';

interface HearingContentProps {
  theme: 'light' | 'dark';
}

export const HearingContent: React.FC<HearingContentProps> = ({ theme }) => {
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

      {/* Required Documents */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className="text-xl font-semibold mb-4">Required Documents</h3>
        <p className="text-sm opacity-75 mb-6">Please bring the following documents to your hearing:</p>
        
        <div className="space-y-4 mb-6">
          <div className={`p-4 rounded-lg border-2 border-transparent hover:border-green-300 transition-all duration-200 ${
            theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <div className="flex items-start space-x-3">
              <Briefcase className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Employment Records</h4>
                <ul className="text-sm opacity-75 space-y-1">
                  <li>• Employment contract</li>
                  <li>• Job description</li>
                  <li>• HR policies and procedures</li>
                  <li>• Performance evaluations</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg border-2 border-transparent hover:border-blue-300 transition-all duration-200 ${
            theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <div className="flex items-start space-x-3">
              <IdCard className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Identification Documents</h4>
                <ul className="text-sm opacity-75 space-y-1">
                  <li>• Government-issued ID</li>
                  <li>• Passport or driver's license</li>
                  <li>• Proof of address</li>
                  <li>• Social security card</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg border-2 border-transparent hover:border-purple-300 transition-all duration-200 ${
            theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <div className="flex items-start space-x-3">
              <Mail className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Communication Records</h4>
                <ul className="text-sm opacity-75 space-y-1">
                  <li>• Emails related to the case</li>
                  <li>• Letters and memos</li>
                  <li>• Text messages (if relevant)</li>
                  <li>• Meeting notes</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg border-2 border-transparent hover:border-orange-300 transition-all duration-200 ${
            theme === 'dark' ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <div className="flex items-start space-x-3">
              <Users className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Witness Information</h4>
                <ul className="text-sm opacity-75 space-y-1">
                  <li>• Witness contact details</li>
                  <li>• Written witness statements</li>
                  <li>• Character references</li>
                  <li>• Expert testimonies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
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