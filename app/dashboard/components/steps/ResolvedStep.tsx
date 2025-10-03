import React from 'react';
import { CheckCircle, Calendar, User, FileText, Download, ArrowLeft } from 'lucide-react';
import { CaseData } from '../../types/case';

interface ResolvedStepProps {
  caseData: CaseData;
  onClose: () => void;
  isDarkMode: boolean;
}

export const ResolvedStep: React.FC<ResolvedStepProps> = ({ caseData, onClose, isDarkMode }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Case Successfully Resolved</h2>
        <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-lg`}>
          Case #{caseData.caseNumber} has been completed and closed
        </p>
      </div>

      {/* Case Summary */}
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white border border-gray-200'} rounded-lg p-6 mb-6`}>
        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Case Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-3">
              <div>
                <label className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Case Title</label>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} font-medium`}>{caseData.title}</p>
              </div>
              <div>
                <label className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Complainant</label>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{caseData.complainant}</p>
              </div>
              <div>
                <label className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Respondent</label>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{caseData.respondent || 'Not specified'}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-3">
              <div>
                <label className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Date Created</label>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(caseData.dateCreated).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Date Resolved</label>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(caseData.lastUpdated).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Assigned Officer</label>
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
                  <User className="w-4 h-4 mr-2" />
                  {caseData.assignedOfficer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Cases */}
      <div className="text-center">
        <button
          onClick={onClose}
          className={`${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'} ${isDarkMode ? 'text-white' : 'text-gray-900'} px-6 py-3 rounded-lg transition-colors flex items-center mx-auto`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to My Cases
        </button>
      </div>
    </div>
  );
};