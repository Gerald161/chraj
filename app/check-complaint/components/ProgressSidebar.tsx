import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
  description: string;
}

interface ProgressSidebarProps {
  theme: 'light' | 'dark';
  steps: Step[];
  selectedStep: number;
  onStepClick: (stepId: number) => void;
}

export const ProgressSidebar: React.FC<ProgressSidebarProps> = ({
  theme,
  steps,
  selectedStep,
  onStepClick
}) => {
  return (
    <div className={`w-80 border-r transition-all duration-300 h-[calc(100vh-80px)] overflow-y-auto ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">Case Progress</h2>
        <div className="space-y-4">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                selectedStep === step.id
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
  );
};