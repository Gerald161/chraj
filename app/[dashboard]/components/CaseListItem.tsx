import React from 'react';
import { Calendar, User, FileText } from 'lucide-react';
import { CaseData } from '../types/case';

interface CaseListItemProps {
  case: CaseData;
  onClick: (caseData: CaseData) => void;
  showAcceptButton?: boolean;
  isDarkMode?: boolean;
}

export const CaseListItem: React.FC<CaseListItemProps> = ({ 
  case: caseData, 
  onClick, 
  showAcceptButton = false,
  isDarkMode = true 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'initial':
        return isDarkMode ? 'bg-blue-600' : 'bg-blue-500';
      case 'investigation':
        return isDarkMode ? 'bg-purple-600' : 'bg-purple-500';
      case 'hearing':
        return isDarkMode ? 'bg-indigo-600' : 'bg-indigo-500';
      case 'mediation':
        return isDarkMode ? 'bg-orange-600' : 'bg-orange-500';
      case 'decision':
        return isDarkMode ? 'bg-yellow-600' : 'bg-yellow-500';
      case 'resolved':
        return isDarkMode ? 'bg-green-600' : 'bg-green-500';
      default:
        return isDarkMode ? 'bg-gray-600' : 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'initial':
        return 'INITIAL REVIEW';
      case 'investigation':
        return 'INVESTIGATION';
      case 'hearing':
        return 'HEARING';
      case 'mediation':
        return 'MEDIATION';
      case 'decision':
        return 'DECISION';
      case 'resolved':
        return 'RESOLVED';
      default:
        return status;
    }
  };

  return (
    <div 
      onClick={(e)=>{
        e.stopPropagation();
        onClick(caseData);
      }}
      className={`${
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
        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(caseData.status)}`}>
          {getStatusLabel(caseData.status)}
        </span>
      </div>

      <div className={`flex items-center text-sm space-x-6 mb-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
        <div className="flex items-center space-x-1">
          <FileText className="w-4 h-4" />
          <span>{caseData.id}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>{caseData.dateSubmitted}</span>
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
            <span className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{caseData.status == "hearing" ? "20" : "50"}%</span>
          </div>
          <div className={`w-full rounded-full h-2 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200'}`}>
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${caseData.status == "hearing" ? "20" : "50"}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};