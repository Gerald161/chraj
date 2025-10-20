import React, { useState } from 'react';
import { Search, Users, Gavel, CheckCircle, ChevronRight, Calendar, ArrowLeft } from 'lucide-react';
import { CaseData } from '../types/case';
import { InvestigationStep } from './steps/InvestigationStep';
import { HearingStep } from './steps/HearingStep';
import { MediationStep } from './steps/MediationStep';
import { DecisionStep } from './steps/DecisionStep';
import { ResolvedStep } from './steps/ResolvedStep';

interface CaseDetailProps {
  caseData: CaseData;
  onUpdateCase: (updatedCase: CaseData) => void;
  onBack: () => void;
  isDarkMode: boolean;
}

export const CaseDetail: React.FC<CaseDetailProps> = ({ caseData, onBack, onUpdateCase, isDarkMode }) => {
  const [activeStep, setActiveStep] = useState(caseData.status);

  const steps = [
    {
      label: 'investigation',
      icon: Search,
      description: 'Conduct thorough investigation and collect evidence'
    },
    {
      label: 'hearing',
      icon: Users,
      description: 'Schedule and conduct hearings with parties'
    },
    {
      label: 'mediation',
      icon: Calendar,
      description: 'Schedule appointments and mediate between parties'
    },
    {
      label: 'decision',
      icon: Gavel,
      description: 'Make final decision and publish verdict'
    },
    {
      label: 'resolved',
      icon: CheckCircle,
      description: 'Case concluded successfully'
    }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.label === caseData.status);
  };

  const isStepCompleted = (stepIndex: number) => {
    const currentIndex = getCurrentStepIndex();
    // If case is resolved, all steps including resolved are completed
    if (caseData.status === 'resolved') {
      return true;
    }
    return stepIndex < currentIndex;
  };

  const isStepActive = (stepLabel: string) => {
    // When case is resolved, no step should show as active (all are completed)
    if (caseData.status === 'resolved') {
      return false;
    }
    return stepLabel === caseData.status;
  };

  const handleStepChange = (newStatus: CaseData['status']) => {
    const updatedCase = { 
      ...caseData, 
      status: newStatus,
    };
    onUpdateCase(updatedCase);
    setActiveStep(newStatus);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 'investigation':
        return <InvestigationStep caseData={caseData} onAdvance={handleStepChange} isDarkMode={isDarkMode}/>;
      case 'hearing':
        return <HearingStep caseData={caseData} onAdvance={handleStepChange} isDarkMode={isDarkMode}/>;
      case 'mediation':
        return <MediationStep caseData={caseData} onAdvance={handleStepChange} isDarkMode={isDarkMode}/>;
      case 'decision':
        return <DecisionStep caseData={caseData} onAdvance={handleStepChange} isDarkMode={isDarkMode}/>;
      case 'resolved':
        return <ResolvedStep caseData={caseData} onClose={onBack} isDarkMode={isDarkMode}/>;
      default:
        return <ResolvedStep caseData={caseData} onClose={onBack} isDarkMode={isDarkMode}/>;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Progress Steps */}
      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'} border-b p-2 pt-6 pb-6`}>
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className={`flex items-center mr-3 transition-colors cursor-pointer ${
              isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            <ArrowLeft size={24} />
          </button>
          {steps.map((step, index) => (
            <div key={step.label} className="flex items-center">
              <div 
                className={`flex items-center space-x-2 cursor-pointer p-3 rounded-lg transition-colors ${
                  isStepActive(step.label) 
                    ? 'bg-blue-600 text-white'
                    : isStepCompleted(index)
                    ? 'bg-green-600 text-white'
                    : isDarkMode
                    ? 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                onClick={() => setActiveStep(step.label as CaseData['status'])}
              >
                <step.icon className="w-5 h-5" />
                <div>
                  <div className="font-medium text-sm capitalize">{step.label}</div>
                  <div className="text-xs opacity-75">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className={`w-4 h-4 mx-2 ${isDarkMode ? 'text-slate-600' : 'text-gray-400'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className={`p-6 ${isDarkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>
        {renderStepContent()}
      </div>
    </div>
  );
};