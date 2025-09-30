import React from 'react';
import { FileText, Calendar, MapPin } from 'lucide-react';

interface InvestigationContentProps {
  theme: 'light' | 'dark';
}

export const InvestigationContent: React.FC<InvestigationContentProps> = ({ theme }) => {
  return (
    <div className="space-y-8">
      {/* Upcoming Appointments */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Upcoming Appointments</h2>
        
        {/* Interview Appointment */}
        <div className={`p-4 rounded-lg mb-4 border-l-4 border-blue-500 ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'
        }`}>
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-lg text-blue-600">Investigation Interview</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              theme === 'dark' ? 'bg-blue-600/20 text-blue-300' : 'bg-blue-100 text-blue-800'
            }`}>
              Scheduled
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 opacity-60" />
              <span>August 20, 2024 at 2:00 PM</span>
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
        </div>
      </div>

      {/* Required Documents */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Required Documents</h2>
        <p className="opacity-75 mb-6">Please bring the following documents to your scheduled appointments:</p>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <h4 className="font-medium">Employment Records</h4>
                <p className="text-sm opacity-75 mt-1">Employment contract, job description, and any relevant HR documents</p>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-medium">Identification Documents</h4>
                <p className="text-sm opacity-75 mt-1">Valid government-issued ID and proof of address</p>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-orange-500 mt-1" />
              <div>
                <h4 className="font-medium">Communication Records</h4>
                <p className="text-sm opacity-75 mt-1">Any emails, letters, or messages related to the incident</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};