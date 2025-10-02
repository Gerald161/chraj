import React, { useState } from 'react';
import { FileText, Eye, Search, Users, Gavel, CheckCircle, ChevronRight, Calendar } from 'lucide-react';
import { CaseData } from '../types/case';
import { InitialReviewStep } from './steps/InitialReviewStep';
import { InvestigationStep } from './steps/InvestigationStep';
import { HearingStep } from './steps/HearingStep';
import { MediationStep } from './steps/MediationStep';
import { DecisionStep } from './steps/DecisionStep';
import { ResolvedStep } from './steps/ResolvedStep';

interface CaseDetailProps {
  caseData: CaseData;
  onUpdateCase: (updatedCase: CaseData) => void;
  isDarkMode: boolean;
}

export const CaseDetail: React.FC<CaseDetailProps> = ({ caseData, onUpdateCase, isDarkMode }) => {
  const [activeStep, setActiveStep] = useState(caseData.status);

  const steps = [
    {
      id: 'INITIAL_REVIEW',
      label: 'Initial Review',
      icon: Eye,
      description: 'Determine if case is within CHRAJ mandate'
    },
    {
      id: 'INVESTIGATION',
      label: 'Investigation',
      icon: Search,
      description: 'Conduct thorough investigation and collect evidence'
    },
    {
      id: 'HEARING',
      label: 'Hearing',
      icon: Users,
      description: 'Schedule and conduct hearings with parties'
    },
    {
      id: 'MEDIATION',
      label: 'Mediation',
      icon: Calendar,
      description: 'Schedule appointments and mediate between parties'
    },
    {
      id: 'DECISION',
      label: 'Decision',
      icon: Gavel,
      description: 'Make final decision and publish verdict'
    },
    {
      id: 'RESOLVED',
      label: 'Resolved',
      icon: CheckCircle,
      description: 'Case concluded successfully'
    }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === caseData.status);
  };

  const isStepCompleted = (stepIndex: number) => {
    return stepIndex < getCurrentStepIndex();
  };

  const isStepActive = (stepId: string) => {
    return stepId === caseData.status;
  };

  const handleStepChange = (newStatus: CaseData['status']) => {
    const updatedCase = { 
      ...caseData, 
      status: newStatus,
      lastUpdated: new Date().toISOString().split('T')[0],
      progress: getProgressByStatus(newStatus)
    };
    onUpdateCase(updatedCase);
  };

  const getProgressByStatus = (status: CaseData['status']): number => {
    switch (status) {
      case 'INITIAL_REVIEW': return 25;
      case 'INVESTIGATION': return 40;
      case 'HEARING': return 60;
      case 'MEDIATION': return 75;
      case 'DECISION': return 90;
      case 'RESOLVED': return 100;
      default: return 0;
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 'INITIAL_REVIEW':
        return <InitialReviewStep caseData={caseData} onAdvance={handleStepChange} isDarkMode={isDarkMode}/>;
      case 'INVESTIGATION':
        return <InvestigationStep caseData={caseData} onAdvance={handleStepChange} isDarkMode={isDarkMode}/>;
      case 'HEARING':
        return <HearingStep caseData={caseData} onAdvance={handleStepChange} isDarkMode={isDarkMode}/>;
      case 'MEDIATION':
        return <MediationStep caseData={caseData} onAdvance={handleStepChange} isDarkMode={isDarkMode}/>;
      case 'DECISION':
        return <DecisionStep caseData={caseData} onAdvance={handleStepChange} isDarkMode={isDarkMode}/>;
      case 'RESOLVED':
        return <ResolvedStep caseData={caseData} onClose={() => {}} isDarkMode={isDarkMode}/>;
      default:
        return <ResolvedStep caseData={caseData} onClose={() => {}} isDarkMode={isDarkMode}/>;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Progress Steps */}
      <div className={`${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'} border-b p-6`}>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div 
                className={`flex items-center space-x-2 cursor-pointer p-3 rounded-lg transition-colors ${
                  isStepActive(step.id) 
                    ? 'bg-blue-600 text-white'
                    : isStepCompleted(index)
                    ? 'bg-green-600 text-white'
                    : isDarkMode
                    ? 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                onClick={() => setActiveStep(step.id as CaseData['status'])}
              >
                <step.icon className="w-5 h-5" />
                <div>
                  <div className="font-medium text-sm">{step.label}</div>
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