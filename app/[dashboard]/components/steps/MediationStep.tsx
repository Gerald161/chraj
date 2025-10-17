import React, { useState } from 'react';
import { Users, Calendar, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { CaseData } from '../../types/case';

interface MediationStepProps {
  caseData: CaseData;
  onAdvance: (newStatus: CaseData['status']) => void;
  isDarkMode: boolean;
}

export const MediationStep: React.FC<MediationStepProps> = ({ caseData, onAdvance, isDarkMode }) => {
  const [mediationDate, setMediationDate] = useState('');
  const [mediationTime, setMediationTime] = useState('');
  const [venue, setVenue] = useState('');

  const handleAdvance = () => {
    onAdvance('decision');
  };

  return (
    <div className="space-y-6">
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white border border-gray-200'} rounded-lg p-6`}>
        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
          <Users className="w-6 h-6 mr-2" />
          Mediation & Hearing Scheduling
        </h3>

        <div className="grid grid-cols-1 gap-6">
          {/* Scheduling */}
          <div className="space-y-4">
            <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Schedule Appointment</h4>
            
            <div>
              <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-gray-700'} text-sm mb-2`}>Date</label>
              <div className="relative">
                <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'} absolute left-3 top-3`} />
                <input
                  type="date"
                  value={mediationDate}
                  onChange={(e) => setMediationDate(e.target.value)}
                  className={`w-full ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 border border-gray-300'} rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  style={{paddingRight: "10px"}}
                />
              </div>
            </div>

            <div>
              <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-gray-700'} text-sm mb-2`}>Time</label>
              <div className="relative">
                <Clock className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'} absolute left-3 top-3`} />
                <input
                  type="time"
                  value={mediationTime}
                  onChange={(e) => setMediationTime(e.target.value)}
                  className={`w-full ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 border border-gray-300'} rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>

            <div>
              <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-gray-700'} text-sm mb-2`}>Venue</label>
              <div className="relative">
                <MapPin className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'} absolute left-3 top-3`} />
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className={`w-full ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 border border-gray-300'} rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="CHRAJ Regional Office, Conference Room A"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button 
          onClick={handleAdvance}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Submit
        </button>
      </div>
    </div>
  );
};