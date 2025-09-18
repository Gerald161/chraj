import React, { useState } from 'react';
import { Gavel, FileText, Send, CheckCircle } from 'lucide-react';
import { CaseData } from '../../types/case';

interface DecisionStepProps {
  caseData: CaseData;
  onAdvance: (newStatus: CaseData['status']) => void;
}

export const DecisionStep: React.FC<DecisionStepProps> = ({ caseData, onAdvance }) => {
  const [decisionType, setDecisionType] = useState('');
  const [findings, setFindings] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [verdict, setVerdict] = useState('');

  const decisionTypes = [
    'Complaint Substantiated',
    'Complaint Not Substantiated',
    'Complaint Resolved through Mediation',
    'Complaint Withdrawn',
    'Administrative Action Required'
  ];

  const handleAdvance = () => {
    onAdvance('RESOLVED');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Gavel className="w-6 h-6 mr-2" />
          Final Decision & Verdict
        </h3>

        <div className="space-y-6">
          {/* Decision Type */}
          <div>
            <label className="block text-slate-300 font-medium mb-3">Decision Type</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {decisionTypes.map((type) => (
                <label key={type} className="flex items-center text-white">
                  <input
                    type="radio"
                    name="decisionType"
                    value={type}
                    checked={decisionType === type}
                    onChange={(e) => setDecisionType(e.target.value)}
                    className="mr-2"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Findings */}
          <div>
            <label className="block text-slate-300 font-medium mb-2">Findings</label>
            <textarea
              value={findings}
              onChange={(e) => setFindings(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg p-3 resize-none"
              rows={5}
              placeholder="Summarize the key findings from the investigation and mediation process..."
            />
          </div>

          {/* Recommendations */}
          <div>
            <label className="block text-slate-300 font-medium mb-2">Recommendations</label>
            <textarea
              value={recommendations}
              onChange={(e) => setRecommendations(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg p-3 resize-none"
              rows={4}
              placeholder="List specific recommendations for resolution or corrective actions..."
            />
          </div>

          {/* Verdict */}
          <div>
            <label className="block text-slate-300 font-medium mb-2">Final Verdict</label>
            <textarea
              value={verdict}
              onChange={(e) => setVerdict(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg p-3 resize-none"
              rows={4}
              placeholder="State the final decision and any actions to be taken by parties..."
            />
          </div>
        </div>
      </div>

      {/* Publication Options */}
      <div className="bg-slate-800 rounded-lg p-6">
        <h4 className="font-medium text-white mb-3 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Publication & Communication
        </h4>
        
        <div className="space-y-3">
          <label className="flex items-center text-white">
            <input type="checkbox" className="mr-2" />
            Send decision letter to complainant
          </label>
          <label className="flex items-center text-white">
            <input type="checkbox" className="mr-2" />
            Send decision letter to respondent
          </label>
          <label className="flex items-center text-white">
            <input type="checkbox" className="mr-2" />
            Publish decision summary (anonymized)
          </label>
          <label className="flex items-center text-white">
            <input type="checkbox" className="mr-2" />
            Submit to annual report compilation
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
          Save Draft
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Send className="w-4 h-4 mr-2" />
          Publish Decision
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