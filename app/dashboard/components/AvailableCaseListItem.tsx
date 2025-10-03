import React from 'react';
import { Eye, Calendar, FileText, User } from 'lucide-react';
import { CaseData } from '../types/case';

interface AvailableCaseListItemProps {
  case: CaseData;
  onClick: (caseData: CaseData) => void;
  showAcceptButton?: boolean;
  isDarkMode?: boolean;
}

export const AvailableCaseListItem: React.FC<AvailableCaseListItemProps> = ({ 
  case: caseData, 
  onClick, 
  showAcceptButton = false,
  isDarkMode = true 
}) => {
  return (
    <div className={`${
      isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' : 'bg-white border-gray-200 hover:bg-gray-50'
    } border rounded-lg p-6 transition-colors cursor-pointer`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {caseData.title}
            </h3>
          </div>
          <p className={`text-sm mb-3 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            {caseData.description}
          </p>
        </div>
      </div>

      <div className={`flex items-center text-sm space-x-6 mb-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
        <div className="flex items-center space-x-1">
          <FileText className="w-4 h-4" />
          <span>{caseData.caseNumber}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>{new Date(caseData.dateCreated).toLocaleDateString()}</span>
        </div>
        {caseData.respondent && (
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{caseData.respondent}</span>
          </div>
        )}
      </div>

      {!showAcceptButton && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Progress</span>
            <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{caseData.progress}%</span>
          </div>
          <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${caseData.progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick(caseData);
          }}
          className={`flex items-center space-x-1 text-sm transition-colors ${
            isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </button>
        {showAcceptButton && (
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
            <span className="mr-1">+</span>
            Accept Case
          </button>
        )}
      </div>
    </div>
  );
};