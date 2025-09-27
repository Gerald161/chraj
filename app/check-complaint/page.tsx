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
            description: 'Please upload medical records from the incident date'
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
    );
}
