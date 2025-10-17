import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface NavbarProps {
  title: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ title, isDarkMode, onToggleTheme }) => {
  return (
    <div className={`${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'} border-b p-6`}>
      <div className="flex items-center justify-between">
        <div className='flex items-center gap-3 mb-2'>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};