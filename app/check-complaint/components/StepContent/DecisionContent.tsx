import React from 'react';
import { Circle } from 'lucide-react';

interface DecisionContentProps {
  theme: 'light' | 'dark';
}

export const DecisionContent: React.FC<DecisionContentProps> = ({ theme }) => {
  return (
    <div className="space-y-8">
      {/* Decision Status */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Final Decision</h2>
        <div className="flex items-center space-x-3 mb-4">
          <Circle className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
          <span className="text-lg font-medium opacity-75">Pending</span>
        </div>
        <p className="opacity-75 mb-6">The final decision will be published here once all proceedings are complete.</p>
      </div>

      {/* Case Closure Option */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className="text-xl font-semibold mb-4">Case Complete</h3>
        <p className="opacity-75 mb-6">Your case has been resolved. You can now close your case to complete the process.</p>
        
        <button className="py-4 px-8 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200">
          Close Case
        </button>
      </div>
    </div>
  );
};