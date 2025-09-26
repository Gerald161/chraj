"use client"

import { useState, useEffect } from 'react';
import { Search, ArrowLeft, Clock, User, Calendar, FileText, CheckCircle, Circle, Upload, Eye, Moon, Sun } from 'lucide-react';

export default function CheckComplaint() {
    interface CaseData {
        id: string;
        type: string;
        status: string;
        assignedOfficer: string;
        lastUpdated: string;
        description: string;
        currentStep: number;
        selectedStep: number;
        steps: {
            id: number;
            name: string;
            status: 'completed' | 'current' | 'pending';
            date?: string;
            description: string;
            component?: 'overview' | 'investigation' | 'hearing' | 'mediation' | 'decision';
        }[];
        actions?: {
            type: 'document_upload' | 'hearing_response' | 'mediation_response' | 'case_closure';
            title: string;
            description: string;
            deadline?: string;
            data?: any;
        }[];
    }

    const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentView, setCurrentView] = useState<'search' | 'dashboard'>('search');
  const [caseId, setCaseId] = useState('');
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock case data
  const mockCaseData: CaseData = {
    id: 'CHR001',
    type: 'Human Rights Violation',
    status: 'Under Investigation',
    assignedOfficer: 'Officer John Doe',
    lastUpdated: 'August 15, 2024',
    description: 'Complaint regarding excessive force used during arrest at Tema Station. Multiple witnesses present.',
    currentStep: 2,
    selectedStep: 1,
    steps: [
      {
        id: 1,
        name: 'Initial Review',
        status: 'completed',
        date: 'August 10, 2024',
        description: 'Case reviewed and accepted within CHRAJ mandate',
        component: 'overview'
      },
      {
        id: 2,
        name: 'Investigation',
        status: 'current',
        date: 'August 15, 2024',
        description: 'Gathering evidence and witness statements',
        component: 'investigation'
      },
      {
        id: 3,
        name: 'Hearing',
        status: 'pending',
        description: 'Formal hearing scheduled with all parties',
        component: 'hearing'
      },
      {
        id: 4,
        name: 'Mediation',
        status: 'pending',
        description: 'Optional mediation between parties',
        component: 'mediation'
      },
      {
        id: 5,
        name: 'Decision',
        status: 'pending',
        description: 'Final verdict and resolution',
        component: 'decision'
      }
    ],
    actions: [
      {
        type: 'document_upload',
        title: 'Medical Records Required',
        description: 'Please upload medical records from the incident date',
        deadline: 'September 5, 2024'
      },
      {
        type: 'hearing_response',
        title: 'Hearing Scheduled',
        description: 'Initial hearing scheduled for case assessment',
        data: {
          date: 'September 8, 2024',
          time: '10:00 AM',
          venue: 'CHRAJ Regional Office'
        }
      }
    ]
  };

  const handleSearch = async () => {
    if (!caseId.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCaseData(mockCaseData);
      setCurrentView('dashboard');
      setLoading(false);
    }, 1000);
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
    setCaseData(null);
    setCaseId('');
  };

  const handleStepClick = (stepId: number) => {
    if (caseData) {
      setCaseData({
        ...caseData,
        selectedStep: stepId
      });
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const renderStepContent = () => {
    const selectedStep = caseData?.steps.find(step => step.id === caseData.selectedStep);
    
    if (!selectedStep) return null;

    switch (selectedStep.component) {
      case 'overview':
        return renderOverviewContent();
      case 'investigation':
        return renderInvestigationContent();
      case 'hearing':
        return renderHearingContent();
      case 'mediation':
        return renderMediationContent();
      case 'decision':
        return renderDecisionContent();
      default:
        return renderOverviewContent();
    }
  };

  const renderOverviewContent = () => (
    <div className="space-y-8">
      {/* Case Overview */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Case Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 opacity-60" />
            <div>
              <p className="text-sm opacity-75">Assigned Officer</p>
              <p className="font-medium text-lg">{caseData?.assignedOfficer}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 opacity-60" />
            <div>
              <p className="text-sm opacity-75">Last Updated</p>
              <p className="font-medium text-lg">{caseData?.lastUpdated}</p>
            </div>
          </div>
        </div>
        <div className={`p-6 rounded-lg ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
        }`}>
          <p className="text-sm opacity-75 mb-3">Case Description</p>
          <p className="text-lg leading-relaxed">{caseData?.description}</p>
        </div>
      </div>

      {/* Initial Review Status */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className="text-xl font-semibold mb-4">Initial Review Status</h3>
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <span className="text-lg font-medium text-green-600">Case Accepted</span>
        </div>
        <p className="opacity-75">Your case has been reviewed and falls within CHRAJ's mandate. It has been assigned to an officer for further investigation.</p>
      </div>
    </div>
  );

  const renderInvestigationContent = () => (
    <div className="space-y-8">
      {/* Investigation Status */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Investigation Phase</h2>
        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-6 h-6 rounded-full border-3 ${
            theme === 'dark' ? 'border-blue-400 bg-blue-400/20' : 'border-blue-500 bg-blue-50'
          } flex items-center justify-center`}>
            <div className={`w-2 h-2 rounded-full ${
              theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'
            }`}></div>
          </div>
          <span className="text-lg font-medium text-blue-600">Currently in Progress</span>
        </div>
        <p className="opacity-75 mb-6">Our investigation team is gathering evidence and witness statements related to your case.</p>
      </div>

      {/* Document Upload */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-start space-x-3 mb-4">
          <Upload className="w-6 h-6 text-blue-500 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-xl">Medical Records Required</h3>
            <p className="opacity-75 mt-2">Please upload medical records from the incident date to support your case.</p>
          </div>
        </div>
        <button className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
          <Upload className="w-5 h-5 mr-3" />
          Upload Documents
        </button>
      </div>

      {/* Additional Document Request */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-start space-x-3 mb-4">
          <FileText className="w-6 h-6 text-green-500 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-xl">Witness Statements Required</h3>
            <p className="opacity-75 mt-2">Please provide written statements from any witnesses present during the incident.</p>
          </div>
        </div>
        <button className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
          <Upload className="w-5 h-5 mr-3" />
          Upload Witness Statements
        </button>
      </div>
    </div>
  );

  const renderHearingContent = () => (
    <div className="space-y-8">
      {/* Hearing Status */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Hearing Phase</h2>
        <div className="flex items-center space-x-3 mb-4">
          <Circle className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
          <span className="text-lg font-medium opacity-75">Pending</span>
        </div>
        <p className="opacity-75 mb-6">A formal hearing will be scheduled once the investigation phase is complete.</p>
      </div>

      {/* Hearing Schedule */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-start space-x-3 mb-6">
          <Calendar className="w-6 h-6 text-blue-500 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-xl">Hearing Scheduled</h3>
            <p className="opacity-75 mt-2">Initial hearing scheduled for case assessment</p>
          </div>
        </div>
        
        <div className={`p-6 rounded-lg mb-6 ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
            <div><strong>Date:</strong> September 8, 2024</div>
            <div><strong>Time:</strong> 10:00 AM</div>
            <div><strong>Venue:</strong> CHRAJ Regional Office</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200">
            Confirm Attendance
          </button>
          <button className={`py-4 rounded-lg font-medium transition-colors duration-200 ${
            theme === 'dark' 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}>
            Request Reschedule
          </button>
        </div>
      </div>
    </div>
  );

  const renderMediationContent = () => (
    <div className="space-y-8">
      {/* Mediation Status */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Mediation Phase</h2>
        <div className="flex items-center space-x-3 mb-4">
          <Circle className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
          <span className="text-lg font-medium opacity-75">Pending</span>
        </div>
        <p className="opacity-75 mb-6">Mediation is an optional step where both parties can work together to reach a mutual agreement.</p>
      </div>

      {/* Mediation Schedule */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-start space-x-3 mb-6">
          <Calendar className="w-6 h-6 text-blue-500 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-xl">Mediation Scheduled</h3>
            <p className="opacity-75 mt-2">Mediation session scheduled for case resolution</p>
          </div>
        </div>
        
        <div className={`p-6 rounded-lg mb-6 ${
          theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
            <div><strong>Date:</strong> September 15, 2024</div>
            <div><strong>Time:</strong> 2:00 PM</div>
            <div><strong>Venue:</strong> CHRAJ Mediation Center</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200">
            Confirm Attendance
          </button>
          <button className={`py-4 rounded-lg font-medium transition-colors duration-200 ${
            theme === 'dark' 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}>
            Request Reschedule
          </button>
        </div>
      </div>
    </div>
  );

  const renderDecisionContent = () => (
    <div className="space-y-8">
      {/* Decision Status */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Final Decision</h2>
        <div className="flex items-center space-x-3 mb-4">
          <Circle className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
          <span className="text-lg font-medium opacity-75">Pending</span>
        </div>
        <p className="opacity-75 mb-6">The final decision will be published here once all proceedings are complete.</p>
      </div>

      {/* Case Closure Option */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className="text-xl font-semibold mb-4">Case Complete</h3>
        <p className="opacity-75 mb-6">Your case has been resolved. You can now close your case to complete the process.</p>
        
        <button className="py-4 px-8 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200">
          Close Case
        </button>
      </div>
    </div>
  );

  if (currentView === 'search') {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900 text-white' 
          : 'bg-gradient-to-br from-blue-50 via-white to-green-50 text-gray-900'
      }`}>
        {/* Theme Toggle */}
        <div className="absolute top-6 right-6">
          <button
            onClick={toggleTheme}
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
                    onChange={(e) => setCaseId(e.target.value)}
                    placeholder="Enter Case ID (e.g., CHR001)"
                    className={`w-full px-4 py-4 rounded-lg border transition-all duration-200 text-lg ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 focus:border-blue-500 focus:bg-gray-600'
                        : 'bg-gray-50 border-gray-200 focus:border-blue-500 focus:bg-white'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>

                <button
                  onClick={handleSearch}
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
  }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
            }`}>
            {/* Header */}
            <div className={`sticky top-0 z-10 border-b transition-colors duration-300 ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
                <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                    <button
                        onClick={handleBackToSearch}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                        theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        }`}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-semibold">Case #{caseData?.id}</h1>
                        <p className="text-sm opacity-75">{caseData?.type}</p>
                    </div>
                    </div>
                    <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        theme === 'dark' 
                        ? 'bg-blue-600/20 text-blue-300' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                        {caseData?.status}
                    </span>
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                        theme === 'dark' ? 'hover:bg-gray-700 text-yellow-400' : 'hover:bg-gray-100'
                        }`}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    </div>
                </div>
                </div>
            </div>

            <div className="flex min-h-[calc(100vh-80px)]">

                {/* Left Sidebar - Progress Steps */}
                <div className={`w-80 border-r transition-all duration-300 h-[calc(100vh-80px)] overflow-y-auto ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-6">Case Progress</h2>
                    <div className="space-y-4">
                    {caseData?.steps.map((step, index) => (
                        <button
                        key={step.id}
                        onClick={() => handleStepClick(step.id)}
                        className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                            caseData.selectedStep === step.id
                            ? theme === 'dark'
                                ? 'bg-blue-600/20 border-2 border-blue-500'
                                : 'bg-blue-50 border-2 border-blue-500'
                            : theme === 'dark'
                                ? 'bg-gray-700/50 hover:bg-gray-700 border-2 border-transparent'
                                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                        }`}
                        >
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                            {step.status === 'completed' ? (
                                <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : step.status === 'current' ? (
                                <div className={`w-6 h-6 rounded-full border-3 ${
                                theme === 'dark' ? 'border-blue-400 bg-blue-400/20' : 'border-blue-500 bg-blue-50'
                                } flex items-center justify-center`}>
                                <div className={`w-2 h-2 rounded-full ${
                                    theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'
                                }`}></div>
                                </div>
                            ) : (
                                <Circle className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                            )}
                            </div>
                            <div className="flex-1 min-w-0">
                            <h3 className={`font-semibold text-sm ${
                                step.status === 'current' ? 'text-blue-600' : ''
                            }`}>
                                {step.name}
                            </h3>
                            <p className="text-xs opacity-75 mt-1 line-clamp-2">{step.description}</p>
                            {step.date && (
                                <span className={`text-xs mt-2 inline-block ${
                                step.status === 'completed' ? 'text-green-600' : 
                                step.status === 'current' ? 'text-blue-600' : 'opacity-60'
                                }`}>
                                {step.date}
                                </span>
                            )}
                            {step.status === 'current' && (
                                <div className={`mt-2 px-2 py-1 rounded-full text-xs font-medium inline-block ${
                                theme === 'dark' ? 'bg-blue-600/20 text-blue-300' : 'bg-blue-100 text-blue-800'
                                }`}>
                                In Progress
                                </div>
                            )}
                            </div>
                        </div>
                        </button>
                    ))}
                    </div>
                </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                <div className="p-8">
                    {renderStepContent()}
                </div>
                </div>
            </div>
        </div>
    )
}
