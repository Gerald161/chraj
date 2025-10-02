"use client"

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { AvailableCases } from './components/AvailableCases';
import { CaseDetail } from './components/CaseDetail';
import { mockCases } from './data/mockCases';
import { CaseData } from './types/case';
import Notifications from './components/Notifications';
import Appointments from './components/Appointments';

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('my-cases');
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [cases, setCases] = useState<CaseData[]>(mockCases);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleCaseSelect = (caseData: CaseData) => {
    setSelectedCase(caseData);
    setActiveSection('case-detail');
  };

  const handleCaseUpdate = (updatedCase: CaseData) => {
    setCases(cases.map(c => c.id === updatedCase.id ? updatedCase : c));
    setSelectedCase(updatedCase);
  };

  const handleCloseDetail = () => {
    setSelectedCase(null);
    setActiveSection('my-cases');
  };


  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getPageTitle = () => {
    switch (activeSection) {
      case 'available-cases':
        return 'Available Cases';
      case 'my-cases':
        return 'My Cases';
      case 'notifications':
        return 'Notifications';
      case 'appointments':
        return 'Appointments';
      case 'case-detail':
        return selectedCase?.title || 'Case Details';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        isDarkMode={isDarkMode}
      />
      
      <div className="flex-1 flex flex-col">
        <Navbar 
          title={getPageTitle()}
          subtitle="Welcome back, John"
          isDarkMode={isDarkMode}
          onToggleTheme={handleToggleTheme}
        />
        
        {activeSection === 'my-cases' && (
          <Dashboard 
            cases={cases} 
            onCaseSelect={handleCaseSelect} 
            isDarkMode={isDarkMode}
          />
        )}
        
        {activeSection === 'available-cases' && (
          <AvailableCases 
            cases={cases} 
            onCaseSelect={handleCaseSelect} 
            isDarkMode={isDarkMode}
          />
        )}

        {activeSection === 'notifications' && (
          <Notifications/>
        )}

        {activeSection === 'appointments' && (
          <Appointments/>
        )}
        
        {activeSection === 'case-detail' && selectedCase && (
          <CaseDetail
            caseData={selectedCase}
            onUpdateCase={handleCaseUpdate}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </div>
  );
}
