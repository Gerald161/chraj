"use client"

import { useState } from 'react';
import { SearchView } from './components/SearchView';
import { DashboardHeader } from './components/DashboardHeader';
import { ProgressSidebar } from './components/ProgressSidebar';
import { OverviewContent } from './components/StepContent/OverviewContent';
import { InvestigationContent } from './components/StepContent/InvestigationContent';
import { HearingContent } from './components/StepContent/HearingContent';
import { MediationContent } from './components/StepContent/MediationContent';
import { DecisionContent } from './components/StepContent/DecisionContent';

export default function RespondentCheck() {
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
        type: 'Employment Discrimination',
        status: 'Under Investigation',
        assignedOfficer: 'Officer Sarah Johnson',
        lastUpdated: 'August 15, 2024',
        description: 'Allegation of discriminatory practices in the workplace based on gender and age during promotion process.',
        currentStep: 2,
        selectedStep: 1,
        steps: [
        {
            id: 1,
            name: 'Case Information',
            status: 'completed',
            date: 'August 10, 2024',
            description: 'Basic case information and current status',
            component: 'overview'
        },
        {
            id: 2,
            name: 'Hearing',
            status: 'current',
            date: 'September 8, 2024',
            description: 'Formal hearing information and expectations',
            component: 'hearing'
        },
        {
            id: 3,
            name: 'Mediation',
            status: 'pending',
            date: 'September 15, 2024',
            description: 'Optional mediation session details',
            component: 'mediation'
        },
        {
            id: 4,
            name: 'Decision',
            status: 'pending',
            description: 'Final decision and next steps',
            component: 'decision'
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

    const renderStepContent = () => {
        const selectedStep = caseData?.steps.find(step => step.id === caseData.selectedStep);
        
        if (!selectedStep) return null;

        switch (selectedStep.component) {
        case 'overview':
            return <OverviewContent theme={theme} caseData={caseData!} />;
        case 'investigation':
            return <InvestigationContent theme={theme} />;
        case 'hearing':
            return <HearingContent theme={theme} />;
        case 'mediation':
            return <MediationContent theme={theme} />;
        case 'decision':
            return <DecisionContent theme={theme} />;
        default:
            return <OverviewContent theme={theme} caseData={caseData!} />;
        }
    };

    if (currentView === 'search') {
        return (
            <div className={theme === 'dark' ? 'dark' : ''}>
                <SearchView
                    theme={theme}
                    caseId={caseId}
                    loading={loading}
                    onThemeToggle={toggleTheme}
                    onCaseIdChange={setCaseId}
                    onSearch={handleSearch}
                />
            </div>
        );
    }

    return (
        <div className={theme === 'dark' ? 'dark' : ''}>
            <div className={`min-h-screen transition-colors duration-300 ${
                theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
            }`}>
                <DashboardHeader
                theme={theme}
                caseData={caseData!}
                onBackToSearch={handleBackToSearch}
                onThemeToggle={toggleTheme}
                />

                <div className="flex min-h-[calc(100vh-80px)]">
                <ProgressSidebar
                    theme={theme}
                    steps={caseData!.steps}
                    selectedStep={caseData!.selectedStep}
                    onStepClick={handleStepClick}
                />

                {/* Main Content Area */}
                <div className="flex-1">
                    <div className="p-8">
                    {renderStepContent()}
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}