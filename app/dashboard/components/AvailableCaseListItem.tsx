import React from 'react';
import { Calendar, FileText, User } from 'lucide-react';

interface CaseData{
  id: string;
  title: string;
  description: string;
  complainant: string;
  respondent: string;
  dateSubmitted: string;
  status: string;
  documents?: string[];
  additionalDetails?: {
    location?: string;
    incidentDate?: string;
  };
}

interface AvailableCaseListItemProps {
  caseData: CaseData;
  onCaseClick: (caseData: CaseData) => void;
  isDarkMode?: boolean;
}

export const AvailableCaseListItem: React.FC<AvailableCaseListItemProps> = ({ 
  caseData, 
  onCaseClick,
  isDarkMode = true 
}) => {
  return (
    <div className={`${
      isDarkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' : 'bg-white border-gray-200 hover:bg-gray-50'
    } border rounded-lg p-6 transition-colors cursor-pointer`}
    onClick={()=>{
      onCaseClick(caseData)
    }}
    >
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
          <span>{caseData.id}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>{new Date(caseData.dateSubmitted).toLocaleDateString()}</span>
        </div>
        {caseData.respondent && (
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{caseData.respondent}</span>
          </div>
        )}
      </div>
    </div>
  );
};