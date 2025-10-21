import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface ProgressSidebarProps {
  theme: 'light' | 'dark';
  status: string;
  view_type: string;
  onStepClick: (stepName: string) => void;
}

export const ProgressSidebar: React.FC<ProgressSidebarProps> = ({
  theme,
  status,
  view_type,
  onStepClick
}) => {
  const allSteps = [
    {
      "name": "Initial",
      "id": "initial",
      "desc": "Determining if your case falls within our mandate"
    },
    {
      "name": "Investigation",
      "id": "investigation",
      "desc": "Gathering evidence and conducting preliminary inquiry"
    },
    {
      "name": "Hearing",
      "id": "hearing",
      "desc": "Formal hearing and presentation of evidence"
    },
    {
      "name": "Mediation",
      "id": "mediation",
      "desc": "Facilitated negotiation between parties"
    },
    {
      "name": "Decision",
      "id": "decision",
      "desc": "Official ruling and case resolution"
    }
  ]

  // Filter steps based on view_type: skip "initial" for respondent
  const steps = view_type === 'respondent' 
    ? allSteps.filter(step => step.id !== 'initial')
    : allSteps

  // Find the current step index (comparing with lowercase status)
  const currentStepIndex = steps.findIndex(step => step.id === status.toLowerCase())
  
  // Check if case is resolved (all steps completed)
  const isResolved = status.toLowerCase() === 'resolved'
  
  // Function to determine step status
  const getStepStatus = (index: number) => {
    // If resolved, all steps are completed
    if (isResolved) return 'completed'
    
    if (currentStepIndex === -1) return 'pending'
    if (index < currentStepIndex) return 'completed'
    if (index === currentStepIndex) return 'current'
    return 'pending'
  }

  return (
    <div className={`w-80 border-r transition-all duration-300 h-[calc(100vh-80px)] overflow-y-auto ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">Case Progress</h2>
        <div className="space-y-4">
          {steps.map((step, index) => {
            const stepStatus = getStepStatus(index)
            return (
              <button
                key={index}
                onClick={() => onStepClick(step.id)}
                className={`w-full cursor-pointer text-left p-4 rounded-lg transition-all duration-200 ${
                  stepStatus === 'current'
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
                    {stepStatus === 'completed' ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : stepStatus === 'current' ? (
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
                      stepStatus === 'current' ? 'text-blue-600' : ''
                    }`}>
                      {step.name}
                    </h3>
                    <p className="text-xs opacity-75 mt-1 line-clamp-2">{step.desc}</p>
                    {stepStatus === 'current' && (
                      <div className={`mt-2 px-2 py-1 rounded-full text-xs font-medium inline-block ${
                        theme === 'dark' ? 'bg-blue-600/20 text-blue-300' : 'bg-blue-100 text-blue-800'
                      }`}>
                        In Progress
                      </div>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};