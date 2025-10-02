import React from 'react';
import { 
  Home, 
  FileText, 
  FolderOpen, 
  Bell, 
  Calendar, 
  // Settings, 
  LogOut,
  Building2
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isDarkMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, isDarkMode }) => {
  const menuItems = [
    // { id: 'overview', label: 'Overview', icon: Home },
    { id: 'available-cases', label: 'Available Cases', icon: FileText },
    { id: 'my-cases', label: 'My Cases', icon: FolderOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 2 },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
  ];

  return (
    <div className={`w-64 flex flex-col h-screen border-r ${
      isDarkMode ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-gray-900 border-gray-200'
    }`}>
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 rounded-lg p-2">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg">CHRAJ</h1>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Officer Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white'
                    : isDarkMode
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`ml-auto bg-red-600 text-xs px-2 py-1 rounded-full text-white`}>
                    {item.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className={`p-4 border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'}`}>
        {/* <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
          isDarkMode 
            ? 'text-slate-300 hover:bg-slate-800 hover:text-white' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}>
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button> */}
        <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors mt-2 ${
          isDarkMode 
            ? 'text-slate-300 hover:bg-slate-800 hover:text-white' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}>
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};