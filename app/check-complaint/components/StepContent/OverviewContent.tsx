import React from 'react';
import { User, Clock, CheckCircle } from 'lucide-react';
import { ClientCaseData } from '../../types/clientCaseData';

interface OverviewContentProps {
  theme: 'light' | 'dark';
  caseData: ClientCaseData;
}

export const OverviewContent: React.FC<OverviewContentProps> = ({ theme, caseData }) => {
  return (
    <div className="space-y-8">
      {/* Case Overview */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Case Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 opacity-60" />
            <div>
              <p className="text-sm opacity-75">Assigned Officer</p>
              <p className="font-medium text-lg">{caseData.case_officer}</p>
            </div>
          </div>
          {/* <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 opacity-60" />
            <div>
              <p className="text-sm opacity-75">Last Updated</p>
              <p className="font-medium text-lg">{caseData.lastUpdated}</p>
            </div>
          </div> */}
        </div>
        <div className={`p-6 rounded-lg ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
        }`}>
          <p className="text-sm opacity-75 mb-3">Case Description</p>
          <p className="text-lg leading-relaxed">{caseData.description}</p>
        </div>
      </div>

      {/* Initial Review Status */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className="text-xl font-semibold mb-4">Initial Review Status</h3>
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <span className="text-lg font-medium text-green-600">Case Accepted</span>
        </div>
        <p className="opacity-75">Your case has been reviewed and falls within CHRAJ's mandate. It has been assigned to an officer for further investigation.</p>
      </div>
    </div>
  );
};