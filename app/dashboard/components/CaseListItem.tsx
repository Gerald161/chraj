import React from 'react';
import { Eye, Calendar, MapPin } from 'lucide-react';
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
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-600';
      case 'MEDIUM':
        return 'bg-orange-600';
      case 'LOW':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'INITIAL_REVIEW':
        return isDarkMode ? 'bg-blue-600' : 'bg-blue-500';
      case 'INVESTIGATION':
        return isDarkMode ? 'bg-purple-600' : 'bg-purple-500';
      case 'HEARING':
        return isDarkMode ? 'bg-indigo-600' : 'bg-indigo-500';
      case 'MEDIATION':
        return isDarkMode ? 'bg-orange-600' : 'bg-orange-500';
      case 'DECISION':
        return isDarkMode ? 'bg-yellow-600' : 'bg-yellow-500';
      case 'RESOLVED':
        return isDarkMode ? 'bg-green-600' : 'bg-green-500';
      default:
        return isDarkMode ? 'bg-gray-600' : 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'INITIAL_REVIEW':
        return 'INITIAL REVIEW';
      case 'INVESTIGATION':
        return 'INVESTIGATING';
      case 'HEARING':
        return 'HEARING';
      case 'MEDIATION':
        return 'MEDIATION';
      case 'DECISION':
        return 'DECISION';
      case 'RESOLVED':
        return 'RESOLVED';
      default:
        return status;
    }
  };

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
            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getPriorityColor(caseData.priority)}`}>
              {caseData.priority}
            </span>
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
          <span className="text-slate-500">📋</span>
          <span>{caseData.caseNumber}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>{new Date(caseData.dateCreated).toLocaleDateString()}</span>
        </div>
        {caseData.respondent && (
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
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