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
import { ClientCaseData } from './types/clientCaseData';


export default function CheckComplaint() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [currentView, setCurrentView] = useState<'search' | 'dashboard'>('search');
    const [caseId, setCaseId] = useState('');
    const [caseData, setCaseData] = useState<ClientCaseData | null>(null);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState<string>('');

    const [searchError, setSearchError] = useState("");

    // Mock case data
    const mockCaseData: ClientCaseData = {
        id: "CASE-0001",
        case_officer: "Kofi Darko",
        status: "hearing",
        title: "The eventual fall of man",
        description: "Yooo Kofi",
        dateSubmitted: "2025-10-16",
        complainant: "Darko",
        respondent: "Maa Luu",
        case_files: [
            "8cb5d6519dca589d364fb4ae5c19179a.jpg",
            "8f20513962e81e14f2408984d84717b5.jpg",
            "09cf2e6b-4e63-4efe-988e-f399c7743de3.jpeg",
            "09e7bef009e37dabe2710a79f8f3cfbb.jpg"
        ],
        requested_documents: [
            "A book",
            "A pen"
        ],
        hearing_appointment_documents: [
            "Complainant Item 1",
            "Complainant Item 2"
        ],
        terms: [
            "First Term",
            "Second Term"
        ],
        your_hearing_appointment: {
            id: 7,
            date: "2025-10-29",
            time: "04:04"
        },
        view_type: "respondent"
    };

    const handleSearch = async () => {
        if (!caseId.trim()) return;

        setSearchError("");
        
        setLoading(true);

        var req = await fetch(`http://127.0.0.1:8000/complaints/get-file-complaint-case/${caseId}`)

        var res = await req.json()

        if(res["error"]){
            setSearchError("Case not found, please try again");
        }

        if(res["complaint"]){
            setCaseData(res["complaint"]);
            setCurrentStep(res["complaint"].status);
            setCurrentView('dashboard');
        }

        setLoading(false);
    };

    const handleBackToSearch = () => {
        setCurrentView('search');
        setCaseData(null);
        setCaseId('');
    };

    const handleStepClick = (stepName: string) => {
        setCurrentStep(stepName);
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const renderStepContent = () => {
        switch (currentStep) {
        case 'initial':
            return <OverviewContent theme={theme} caseData={caseData!} />;
        case 'investigation':
            return <InvestigationContent theme={theme} />;
        case 'hearing':
            return <HearingContent theme={theme} />;
        case 'mediation':
            return <MediationContent theme={theme} />;
        case 'decision':
            return <DecisionContent theme={theme} />;
        case 'resolved':
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
                searchError={searchError}
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
                        status={caseData!.status}
                        onStepClick={handleStepClick}
                        view_type={caseData!.view_type}
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
