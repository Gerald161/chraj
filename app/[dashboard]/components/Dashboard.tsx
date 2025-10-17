import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { CaseListItem } from './CaseListItem';
import { CaseData } from '../types/case';

interface DashboardProps {
  cases: CaseData[];
  onCaseSelect: (caseData: CaseData) => void;
  isDarkMode: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ cases, onCaseSelect, isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          caseItem.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Status' || caseItem.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    'All Status',
    'investigation',
    'hearing',
    'mediation',
    'decision',
    'resolved'
  ];

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Search and Filters */}
      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'} border-b p-6`}>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`rounded-lg px-4 capitalize py-2 border transition-colors ${
              isDarkMode 
                ? 'bg-slate-800 text-white border-slate-600' 
                : 'bg-white text-gray-900 border-gray-300'
            }`}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option} className='capitalize'>
                {option === 'All Status' ? option : option.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cases List */}
      <div className={`flex-1 p-6 overflow-y-auto ${isDarkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>
        <div className="space-y-4">
          {filteredCases.map((caseItem) => (
            <CaseListItem
              key={caseItem.id}
              case={caseItem}
              onClick={onCaseSelect}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
        
        {filteredCases.length === 0 && (
          <div className="text-center py-12">
            <div className={`text-lg mb-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              No cases found
            </div>
            <p className={`${isDarkMode ? 'text-slate-500' : 'text-gray-500'}`}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};