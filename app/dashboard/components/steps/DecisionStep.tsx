import React, { useState } from 'react';
import { Handshake, Clock, Send, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { CaseData } from '../../types/case';

interface DecisionStepProps {
  caseData: CaseData;
  onAdvance: (newStatus: CaseData['status']) => void;
  isDarkMode: boolean;
}

export const DecisionStep: React.FC<DecisionStepProps> = ({ caseData, onAdvance, isDarkMode }) => {
  const [mediationSuccess, setMediationSuccess] = useState<boolean | null>(null);
  const [agreedTerms, setAgreedTerms] = useState<string[]>(['']);
  const [failureReason, setFailureReason] = useState('');
  const [nextSteps, setNextSteps] = useState('');
  const [officerNotes, setOfficerNotes] = useState('');

  const addTerm = () => {
    setAgreedTerms([...agreedTerms, '']);
  };

  const updateTerm = (index: number, value: string) => {
    const newTerms = [...agreedTerms];
    newTerms[index] = value;
    setAgreedTerms(newTerms);
  };

  const removeTerm = (index: number) => {
    if (agreedTerms.length > 1) {
      setAgreedTerms(agreedTerms.filter((_, i) => i !== index));
    }
  };

  const handleAdvance = () => {
    onAdvance('RESOLVED');
  };

  return (
    <div className="space-y-6">
      {/* Mediation Outcome Summary */}
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white border border-gray-200'} rounded-lg p-6`}>
        <div className='flex items-center mb-4'>
          <Handshake className={`w-6 h-6 mr-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Mediation Outcome
          </h3>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setMediationSuccess(true)}
            className={`w-full p-4 rounded-lg border-2 transition-all flex items-center ${
              mediationSuccess === true
                ? 'border-green-500 bg-green-500/10'
                : isDarkMode
                ? 'border-slate-600 hover:border-slate-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                mediationSuccess === true
                  ? 'border-green-500 bg-green-500'
                  : isDarkMode
                  ? 'border-slate-600'
                  : 'border-gray-300'
              }`}
            >
              {mediationSuccess === true && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Agreement Reached
            </span>
          </button>

          <button
            onClick={() => setMediationSuccess(false)}
            className={`w-full p-4 rounded-lg border-2 transition-all flex items-center ${
              mediationSuccess === false
                ? 'border-red-500 bg-red-500/10'
                : isDarkMode
                ? 'border-slate-600 hover:border-slate-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                mediationSuccess === false
                  ? 'border-red-500 bg-red-500/10'
                  : isDarkMode
                  ? 'border-slate-600'
                  : 'border-gray-300'
              }`}
            >
              {mediationSuccess === false && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              No Agreement Reached
            </span>
          </button>
        </div>
      </div>

      {/* Terms & Agreement OR Failure Reason */}
      {mediationSuccess === true && (
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white border border-gray-200'} rounded-lg p-6`}>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Terms & Agreement Reached
          </h3>

          <div className="space-y-3">
            {agreedTerms.map((term, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <textarea
                    value={term}
                    onChange={(e) => updateTerm(index, e.target.value)}
                    className={`w-full ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 border border-gray-300'} rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    rows={2}
                    placeholder={`Term ${index + 1}: Describe what was agreed upon...`}
                  />
                </div>
                {agreedTerms.length > 1 && (
                  <button
                    onClick={() => removeTerm(index)}
                    className={`p-2 ${isDarkMode ? 'bg-red-900 hover:bg-red-800' : 'bg-red-100 hover:bg-red-200'} ${isDarkMode ? 'text-red-200' : 'text-red-700'} rounded-lg transition-colors flex items-center justify-center`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addTerm}
              className={`w-full py-2 ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-100 hover:bg-gray-200'} ${isDarkMode ? 'text-white' : 'text-gray-900'} rounded-lg transition-colors`}
            >
              + Add Another Term
            </button>
          </div>
        </div>
      )}

      {mediationSuccess === false && (
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white border border-gray-200'} rounded-lg p-6`}>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Reason for Mediation Failure
          </h3>

          <textarea
            value={failureReason}
            onChange={(e) => setFailureReason(e.target.value)}
            className={`w-full ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 border border-gray-300'} rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
            rows={4}
            placeholder="Explain why parties could not reach an agreement..."
          />
        </div>
      )}

      {/* Implementation Timeline / Next Steps */}
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white border border-gray-200'} rounded-lg p-6`}>
        <div className='flex items-center mb-4'>
          <Clock className={`w-6 h-6 mr-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {mediationSuccess ? 'Implementation Timeline' : 'Next Steps'}
        </h3>
        </div>

        <textarea
          value={nextSteps}
          onChange={(e) => setNextSteps(e.target.value)}
          className={`w-full ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 border border-gray-300'} rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
          rows={4}
          placeholder={mediationSuccess 
            ? "Outline actions to be taken, responsible parties, and deadlines..." 
            : "State what happens next (e.g., formal investigation, case closure, etc.)..."
          }
        />
      </div>

      {/* Publication Options */}
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white border border-gray-200'} rounded-lg p-6`}>
        <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          Officer Notes (Optional)
        </h4>

        <textarea
          value={officerNotes}
          onChange={(e) => setOfficerNotes(e.target.value)}
          className={`w-full ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 border border-gray-300'} rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
          rows={3}
          placeholder="Any additional observations or context..."
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button className={`px-6 py-2 ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} ${isDarkMode ? 'text-white' : 'text-gray-900'} rounded-lg transition-colors`}>
          Save Draft
        </button>
        <button
          onClick={handleAdvance}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Mark as Resolved
        </button>
      </div>
    </div>
  );
};