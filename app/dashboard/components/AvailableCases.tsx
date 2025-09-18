import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { CaseListItem } from './CaseListItem';
import { CaseData } from '../types/case';

interface AvailableCasesProps {
  cases: CaseData[];
  onCaseSelect: (caseData: CaseData) => void;
  isDarkMode: boolean;
}

export const AvailableCases: React.FC<AvailableCasesProps> = ({ cases, onCaseSelect, isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');

  // Filter for unassigned cases only
  const availableCases = cases.filter(caseItem => caseItem.status === 'INITIAL_REVIEW');

  const filteredCases = availableCases.filter(caseItem => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = priorityFilter === 'All Priority' || caseItem.priority === priorityFilter;
    
    return matchesSearch && matchesPriority;
  });

  const priorityOptions = ['All Priority', 'HIGH', 'MEDIUM', 'LOW'];

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* Search and Filters */}
      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'} border-b p-6`}>
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className={`w-5 h-5 absolute left-3 top-3 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Search available cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full rounded-lg pl-10 pr-4 py-2 border focus:outline-none transition-colors ${
                isDarkMode 
                  ? 'bg-slate-800 text-white border-slate-600 focus:border-blue-500' 
                  : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
              }`}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className={`w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`} />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className={`rounded-lg px-4 py-2 border transition-colors ${
                isDarkMode 
                  ? 'bg-slate-800 text-white border-slate-600' 
                  : 'bg-white text-gray-900 border-gray-300'
              }`}
            >
              {priorityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
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
              showAcceptButton={true}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
        
        {filteredCases.length === 0 && (
          <div className="text-center py-12">
            <div className={`text-lg mb-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              No available cases found
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