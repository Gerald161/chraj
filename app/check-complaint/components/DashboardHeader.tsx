import React from 'react';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { ClientCaseData } from '../types/clientCaseData';

interface DashboardHeaderProps {
  theme: 'light' | 'dark';
  caseData: ClientCaseData;
  onBackToSearch: () => void;
  onThemeToggle: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  theme,
  caseData,
  onBackToSearch,
  onThemeToggle
}) => {
  return (
    <div className={`sticky top-0 z-10 border-b transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToSearch}
              className={`p-2 cursor-pointer rounded-lg transition-colors duration-200 ${
                theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">Case #{caseData.id}</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onThemeToggle}
              className={`p-2 cursor-pointer rounded-lg transition-colors duration-200 ${
                theme === 'dark' ? 'hover:bg-gray-700 text-yellow-400' : 'hover:bg-gray-100'
              }`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};