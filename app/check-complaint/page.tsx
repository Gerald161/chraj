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

            if(res["complaint"].view_type == "respondent"){
                if(res["complaint"].status === "initial"){
                    setCurrentStep("investigation");
                }else{
                    setCurrentStep(res["complaint"].status);
                }
            }else{
                setCurrentStep(res["complaint"].status);
            }


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
            return <InvestigationContent theme={theme} caseData={caseData!}/>;
        case 'hearing':
            return <HearingContent theme={theme} caseData={caseData!}/>;
        case 'mediation':
            return <MediationContent theme={theme} caseData={caseData!} />;
        case 'decision':
            return <DecisionContent theme={theme} caseData={caseData!} />;
        case 'resolved':
            return <DecisionContent theme={theme} caseData={caseData!}/>;
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
