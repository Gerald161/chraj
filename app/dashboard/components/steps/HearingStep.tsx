import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Plus, Trash2, Users } from 'lucide-react';
import { CaseData } from '../../types/case';

interface Hearing {
  id: string;
  date: string;
  time: string;
  venue: string;
  attendees: string[];
  purpose: string;
}

interface HearingStepProps {
  caseData: CaseData;
  onAdvance: (newStatus: CaseData['status']) => void;
  isDarkMode: boolean;
}

export const HearingStep: React.FC<HearingStepProps> = ({ caseData, onAdvance, isDarkMode }) => {
  const [hearings, setHearings] = useState<Hearing[]>([]);
  const [newHearing, setNewHearing] = useState({
    date: '',
    time: '',
    venue: '',
    attendees: [] as string[],
    purpose: ''
  });

  const attendeeOptions = [
    'Complainant',
    'Respondent',
  ];

  const addHearing = () => {
    if (newHearing.date && newHearing.time && newHearing.venue) {
      const hearing: Hearing = {
        id: Date.now().toString(),
        ...newHearing
      };
      setHearings([...hearings, hearing]);
      setNewHearing({
        date: '',
        time: '',
        venue: '',
        attendees: [],
        purpose: ''
      });
    }
  };

  const removeHearing = (id: string) => {
    setHearings(hearings.filter(h => h.id !== id));
  };

  const toggleAttendee = (attendee: string) => {
    setNewHearing(prev => ({
      ...prev,
      attendees: prev.attendees.includes(attendee)
        ? prev.attendees.filter(a => a !== attendee)
        : [...prev.attendees, attendee]
    }));
  };

  const handleAdvance = () => {
    onAdvance('MEDIATION');
  };

  return (
    <div className="space-y-6">
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white border border-gray-200'} rounded-lg p-6`}>
        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
          <Users className="w-6 h-6 mr-2" />
          Schedule Hearings
        </h3>

        {/* Scheduled Hearings List */}
        {hearings.length > 0 && (
          <div className="mb-6">
            <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Scheduled Hearings</h4>
            <div className="space-y-3">
              {hearings.map((hearing) => (
                <div key={hearing.id} className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50 border border-gray-200'} rounded-lg p-4 flex items-center justify-between`}>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className={`flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        <Calendar className="w-4 h-4 mr-1" />
                        {hearing.date}
                      </div>
                      <div className={`flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        <Clock className="w-4 h-4 mr-1" />
                        {hearing.time}
                      </div>
                      <div className={`flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        <MapPin className="w-4 h-4 mr-1" />
                        {hearing.venue}
                      </div>
                    </div>
                    <div className={`${isDarkMode ? 'text-slate-300' : 'text-gray-700'} text-sm`}>
                      <strong>Attendees:</strong> {hearing.attendees.join(', ') || 'None specified'}
                    </div>
                    {hearing.purpose && (
                      <div className={`${isDarkMode ? 'text-slate-300' : 'text-gray-700'} text-sm`}>
                        <strong>Purpose:</strong> {hearing.purpose}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeHearing(hearing.id)}
                    className="text-red-400 hover:text-red-300 ml-4"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add New Hearing Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Schedule New Hearing</h4>
            
            <div>
              <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-gray-700'} text-sm mb-2`}>Date</label>
              <div className="relative">
                <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'} absolute left-3 top-3`} />
                <input
                  type="date"
                  value={newHearing.date}
                  onChange={(e) => setNewHearing(prev => ({ ...prev, date: e.target.value }))}
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
                  value={newHearing.time}
                  onChange={(e) => setNewHearing(prev => ({ ...prev, time: e.target.value }))}
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
                  value={newHearing.venue}
                  onChange={(e) => setNewHearing(prev => ({ ...prev, venue: e.target.value }))}
                  className={`w-full ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 border border-gray-300'} rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="CHRAJ Regional Office, Hearing Room A"
                />
              </div>
            </div>

            <div>
              <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-gray-700'} text-sm mb-2`}>Purpose (Optional)</label>
              <input
                type="text"
                value={newHearing.purpose}
                onChange={(e) => setNewHearing(prev => ({ ...prev, purpose: e.target.value }))}
                className={`w-full ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 border border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Initial hearing, witness testimony, etc."
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Select Attendees</h4>
            <div className="space-y-2">
              {attendeeOptions.map((attendee) => (
                <label key={attendee} className={`flex items-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <input
                    type="checkbox"
                    checked={newHearing.attendees.includes(attendee)}
                    onChange={() => toggleAttendee(attendee)}
                    className="mr-2"
                  />
                  {attendee}
                </label>
              ))}
            </div>

            <div className={`${isDarkMode ? 'bg-blue-900 border-blue-700' : 'bg-blue-50 border-blue-300'} border rounded-lg p-4`}>
              <p className={`${isDarkMode ? 'text-blue-200' : 'text-blue-800'} text-sm`}>
                <strong>Note:</strong> Selected parties will receive formal hearing invitations with all details.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={addHearing}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Hearing
          </button>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className={`px-6 py-2 ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} ${isDarkMode ? 'text-white' : 'text-gray-900'} rounded-lg transition-colors`}>
          Save Draft
        </button>
        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Send Invitations
        </button>
        {hearings.length > 0 && (
          <button
            onClick={handleAdvance}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Proceed to Mediation
          </button>
        )}
      </div>
    </div>
  );
};