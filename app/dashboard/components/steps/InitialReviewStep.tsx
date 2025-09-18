import React, { useState } from 'react';
import { CheckCircle, XCircle, FileText, AlertTriangle } from 'lucide-react';
import { CaseData } from '../../types/case';

interface InitialReviewStepProps {
  caseData: CaseData;
  onAdvance: (newStatus: CaseData['status']) => void;
}

export const InitialReviewStep: React.FC<InitialReviewStepProps> = ({ caseData, onAdvance }) => {
  const [reviewNotes, setReviewNotes] = useState('');
  const [isWithinMandate, setIsWithinMandate] = useState<boolean | null>(null);

  const handleAdvance = () => {
    if (isWithinMandate) {
      onAdvance('INVESTIGATION');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <FileText className="w-6 h-6 mr-2" />
          Initial Review & Mandate Assessment
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-white mb-2">Case Details</h4>
            <div className="bg-slate-700 rounded p-4">
              <p className="text-slate-300 mb-2"><strong>Complainant:</strong> {caseData.complainant}</p>
              <p className="text-slate-300 mb-2"><strong>Respondent:</strong> {caseData.respondent || 'Not specified'}</p>
              <p className="text-slate-300"><strong>Description:</strong> {caseData.description}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white mb-2">Mandate Assessment</h4>
            <div className="space-y-2">
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  name="mandate"
                  checked={isWithinMandate === true}
                  onChange={() => setIsWithinMandate(true)}
                  className="mr-2"
                />
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Case is within CHRAJ mandate
              </label>
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  name="mandate"
                  checked={isWithinMandate === false}
                  onChange={() => setIsWithinMandate(false)}
                  className="mr-2"
                />
                <XCircle className="w-5 h-5 text-red-500 mr-2" />
                Case is outside CHRAJ mandate
              </label>
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Review Notes</label>
            <textarea
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg p-3 resize-none"
              rows={4}
              placeholder="Enter your initial review notes and assessment..."
            />
          </div>

          {isWithinMandate === false && (
            <div className="bg-red-900 border border-red-700 rounded-lg p-4 flex items-start">
              <AlertTriangle className="w-5 h-5 text-red-400 mr-2 mt-0.5" />
              <div>
                <p className="text-red-200 font-medium">Case Outside Mandate</p>
                <p className="text-red-300 text-sm">This case will be closed as it falls outside CHRAJ's jurisdiction. Please provide appropriate referral information in your notes.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
          Save Notes
        </button>
        {isWithinMandate === true && (
          <button
            onClick={handleAdvance}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Proceed to Investigation
          </button>
        )}
        {isWithinMandate === false && (
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Close Case - Outside Mandate
          </button>
        )}
      </div>
    </div>
  );
};