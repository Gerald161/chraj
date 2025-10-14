import React from 'react';
import { Circle, CheckCircle2, FileCheck } from 'lucide-react';

interface DecisionContentProps {
  theme: 'light' | 'dark';
}

export const DecisionContent: React.FC<DecisionContentProps> = ({ theme }) => {
  // Sample terms - in real implementation, these would come from props or API
  const agreedTerms = [
    "The respondent shall issue a formal written apology to the complainant within 14 days of this agreement",
    "The respondent agrees to complete mandatory training on professional conduct and human rights protocols within 30 days",
    "A review of internal procedures will be conducted to prevent similar incidents, with findings reported to CHRAJ within 60 days",
    "The respondent shall pay compensation of GH₵5,000 to the complainant for damages and distress caused, payable within 21 days"
  ];

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

      {/* Terms & Agreement Reached */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-center space-x-2 mb-4">
          <FileCheck className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-semibold">Terms & Agreement Reached</h3>
        </div>
        
        <div className="space-y-3 mb-6">
          {agreedTerms.map((term, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="opacity-90">{term}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Status - Automatically Closed */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 border-2 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-green-500/30' 
          : 'bg-white border-green-500/20'
      }`}>
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle2 className="w-7 h-7 text-green-500" />
          <h3 className="text-xl font-semibold text-green-500">Case Closed</h3>
        </div>
        <p className="opacity-75">
          Your case has been resolved and automatically closed following the successful mediation. 
          All agreed terms have been documented and the case is now complete.
        </p>
      </div>
    </div>
  );
};