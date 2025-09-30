import React from 'react';
import { FileText, Calendar, AlertCircle } from 'lucide-react';

interface DecisionContentProps {
  theme: 'light' | 'dark';
}

export const DecisionContent: React.FC<DecisionContentProps> = ({ theme }) => {
  return (
    <div className="space-y-8">
      {/* Decision Information */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Final Decision</h2>
        
        <div className={`p-4 rounded-lg mb-6 border-l-4 border-yellow-500 ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-yellow-50'
        }`}>
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-yellow-500 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-yellow-600 mb-2">Decision Pending</h3>
              <p className="text-sm opacity-75">The final decision will be communicated to you once all proceedings are complete.</p>
            </div>
          </div>
        </div>
      </div>

      {/* What Happens Next */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className="text-xl font-semibold mb-4">What Happens Next</h3>
        
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-medium">Written Decision</h4>
                <p className="text-sm opacity-75 mt-1">You will receive a written copy of the final decision with detailed findings</p>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
          }`}>
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-green-500 mt-1" />
              <div>
                <h4 className="font-medium">Timeline</h4>
                <p className="text-sm opacity-75 mt-1">Decisions are typically issued within 30 days of the final hearing or mediation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};