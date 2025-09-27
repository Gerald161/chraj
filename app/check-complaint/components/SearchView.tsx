import React from 'react';
import { Search, Sun, Moon } from 'lucide-react';

interface SearchViewProps {
  theme: 'light' | 'dark';
  caseId: string;
  loading: boolean;
  onThemeToggle: () => void;
  onCaseIdChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  theme,
  caseId,
  loading,
  onThemeToggle,
  onCaseIdChange,
  onSearch
}) => {
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-green-50 text-gray-900'
    }`}>
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <button
          onClick={onThemeToggle}
          className={`p-3 rounded-full transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
              : 'bg-white hover:bg-gray-50 text-gray-700 shadow-lg'
          }`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
              theme === 'dark' ? 'bg-blue-600' : 'bg-blue-100'
            }`}>
              <Search className={`w-10 h-10 ${theme === 'dark' ? 'text-white' : 'text-blue-600'}`} />
            </div>
            <h1 className="text-4xl font-bold mb-4">CHRAJ Case Management</h1>
            <p className="text-lg opacity-75">Commission on Human Rights and Administrative Justice</p>
          </div>

          {/* Search Card */}
          <div className={`p-8 rounded-2xl shadow-xl backdrop-blur-sm transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-gray-800/90 border border-gray-700' 
              : 'bg-white/80 border border-white/20'
          }`}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-3">Track Your Case</h2>
              <p className="opacity-75">Enter your case ID to view current status and available actions</p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="caseId" className="block text-sm font-medium mb-3">
                  Case ID
                </label>
                <input
                  type="text"
                  id="caseId"
                  value={caseId}
                  onChange={(e) => onCaseIdChange(e.target.value)}
                  placeholder="Enter Case ID (e.g., CHR001)"
                  className={`w-full px-4 py-4 rounded-lg border transition-all duration-200 text-lg ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 focus:border-blue-500 focus:bg-gray-600'
                      : 'bg-gray-50 border-gray-200 focus:border-blue-500 focus:bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                />
              </div>

              <button
                onClick={onSearch}
                disabled={!caseId.trim() || loading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Searching...
                  </div>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-3" />
                    Search Case
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};