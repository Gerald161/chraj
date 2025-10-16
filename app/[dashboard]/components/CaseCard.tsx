import React from 'react';
import { Eye, Calendar, FileText } from 'lucide-react';
import { CaseData } from '../types/case';

interface CaseCardProps {
  case: CaseData;
  onClick: (caseData: CaseData) => void;
}

export const CaseCard: React.FC<CaseCardProps> = ({ case: caseData, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'INITIAL_REVIEW':
        return 'bg-blue-600';
      case 'INVESTIGATION':
        return 'bg-purple-600';
      case 'HEARING':
        return 'bg-indigo-600';
      case 'MEDIATION':
        return 'bg-orange-600';
      case 'DECISION':
        return 'bg-yellow-600';
      case 'RESOLVED':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
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
    <div className="bg-slate-800 rounded-lg p-6 hover:bg-slate-750 transition-colors cursor-pointer border border-slate-700">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg mb-2">{caseData.title}</h3>
          <p className="text-slate-400 text-sm mb-3 line-clamp-2">{caseData.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white`}>
          {caseData.priority}
        </span>
      </div>

      <div className="flex items-center text-sm text-slate-400 mb-4 space-x-4">
        <div className="flex items-center space-x-1">
          <span className="text-slate-500">📋</span>
          <span>{caseData.caseNumber}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>{new Date(caseData.dateCreated).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400">Progress</span>
          <span className="text-sm text-white">{caseData.progress}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${caseData.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(caseData.status)}`}>
          {getStatusLabel(caseData.status)}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick(caseData);
          }}
          className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm"
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
};