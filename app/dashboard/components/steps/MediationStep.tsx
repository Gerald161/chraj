import React, { useState } from 'react';
import { Users, Calendar, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { CaseData } from '../../types/case';

interface MediationStepProps {
  caseData: CaseData;
  onAdvance: (newStatus: CaseData['status']) => void;
}

export const MediationStep: React.FC<MediationStepProps> = ({ caseData, onAdvance }) => {
  const [mediationDate, setMediationDate] = useState('');
  const [mediationTime, setMediationTime] = useState('');
  const [venue, setVenue] = useState('');
  const [complainantContact, setComplainantContact] = useState('');
  const [respondentContact, setRespondentContact] = useState('');
  const [mediationNotes, setMediationNotes] = useState('');

  const handleAdvance = () => {
    onAdvance('DECISION');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Users className="w-6 h-6 mr-2" />
          Mediation & Hearing Scheduling
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scheduling */}
          <div className="space-y-4">
            <h4 className="font-medium text-white">Schedule Appointment</h4>
            
            <div>
              <label className="block text-slate-300 text-sm mb-2">Date</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={mediationDate}
                  onChange={(e) => setMediationDate(e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-10 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">Time</label>
              <div className="relative">
                <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="time"
                  value={mediationTime}
                  onChange={(e) => setMediationTime(e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-10 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">Venue</label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-10 py-2"
                  placeholder="CHRAJ Regional Office, Conference Room A"
                />
              </div>
            </div>
          </div>

          {/* Party Contacts */}
          <div className="space-y-4">
            <h4 className="font-medium text-white">Party Contacts</h4>
            
            <div>
              <label className="block text-slate-300 text-sm mb-2">Complainant: {caseData.complainant}</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={complainantContact}
                  onChange={(e) => setComplainantContact(e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-10 py-2"
                  placeholder="Phone number or email"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">Respondent: {caseData.respondent}</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={respondentContact}
                  onChange={(e) => setRespondentContact(e.target.value)}
                  className="w-full bg-slate-700 text-white rounded-lg px-10 py-2"
                  placeholder="Official contact person/email"
                />
              </div>
            </div>

            <div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
              <p className="text-blue-200 text-sm">
                <strong>Note:</strong> Both parties will receive formal invitation letters with the mediation details.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mediation Notes */}
      <div className="bg-slate-800 rounded-lg p-6">
        <h4 className="font-medium text-white mb-3">Mediation Preparation Notes</h4>
        <textarea
          value={mediationNotes}
          onChange={(e) => setMediationNotes(e.target.value)}
          className="w-full bg-slate-700 text-white rounded-lg p-3 resize-none"
          rows={4}
          placeholder="Key points for mediation, potential solutions, party expectations..."
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
          Save Draft
        </button>
        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Send Invitations
        </button>
        <button
          onClick={handleAdvance}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Proceed to Decision
        </button>
      </div>
    </div>
  );
};