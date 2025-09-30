import React from 'react';
import { User, Clock, CheckCircle } from 'lucide-react';

interface CaseData {
  assignedOfficer: string;
  lastUpdated: string;
  description: string;
}

interface OverviewContentProps {
  theme: 'light' | 'dark';
  caseData: CaseData;
}

export const OverviewContent: React.FC<OverviewContentProps> = ({ theme, caseData }) => {
  return (
    <div className="space-y-8">
      {/* Case Overview */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Case Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 opacity-60" />
            <div>
              <p className="text-sm opacity-75">Case Officer</p>
              <p className="font-medium text-lg">{caseData.assignedOfficer}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 opacity-60" />
            <div>
              <p className="text-sm opacity-75">Last Updated</p>
              <p className="font-medium text-lg">{caseData.lastUpdated}</p>
            </div>
          </div>
        </div>
        <div className={`p-6 rounded-lg ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
        }`}>
          <p className="text-sm opacity-75 mb-3">Case Summary</p>
          <p className="text-lg leading-relaxed">{caseData.description}</p>
        </div>
      </div>

      {/* Case Status */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className="text-xl font-semibold mb-4">Current Status</h3>
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-6 h-6 rounded-full border-3 ${
            theme === 'dark' ? 'border-blue-400 bg-blue-400/20' : 'border-blue-500 bg-blue-50'
          } flex items-center justify-center`}>
            <div className={`w-2 h-2 rounded-full ${
              theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'
            }`}></div>
          </div>
          <span className="text-lg font-medium text-blue-600">Under Investigation</span>
        </div>
        <p className="opacity-75">You have been named as a respondent in this case. Please review the upcoming appointments and required documents below.</p>
      </div>
    </div>
  );
};