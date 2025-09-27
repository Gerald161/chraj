import React from 'react';
import { Upload, FileText } from 'lucide-react';

interface InvestigationContentProps {
  theme: 'light' | 'dark';
}

export const InvestigationContent: React.FC<InvestigationContentProps> = ({ theme }) => {
  return (
    <div className="space-y-8">
      {/* Investigation Status */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Investigation Phase</h2>
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-6 h-6 rounded-full border-3 ${
            theme === 'dark' ? 'border-blue-400 bg-blue-400/20' : 'border-blue-500 bg-blue-50'
          } flex items-center justify-center`}>
            <div className={`w-2 h-2 rounded-full ${
              theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'
            }`}></div>
          </div>
          <span className="text-lg font-medium text-blue-600">Currently in Progress</span>
        </div>
        <p className="opacity-75 mb-6">Our investigation team is gathering evidence and witness statements related to your case.</p>
      </div>

      {/* Document Upload */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-start space-x-3 mb-4">
          <Upload className="w-6 h-6 text-blue-500 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-xl">Medical Records Required</h3>
            <p className="opacity-75 mt-2">Please upload medical records from the incident date to support your case.</p>
          </div>
        </div>
        <button className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
          <Upload className="w-5 h-5 mr-3" />
          Upload Documents
        </button>
      </div>

      {/* Additional Document Request */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-start space-x-3 mb-4">
          <FileText className="w-6 h-6 text-green-500 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-xl">Witness Statements Required</h3>
            <p className="opacity-75 mt-2">Please provide written statements from any witnesses present during the incident.</p>
          </div>
        </div>
        <button className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
          <Upload className="w-5 h-5 mr-3" />
          Upload Witness Statements
        </button>
      </div>
    </div>
  );
};