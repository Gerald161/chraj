import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { AvailableCaseListItem } from './AvailableCaseListItem';
import CaseDetailsPage from './CaseDetailsPage';

interface AvailableCasesProps {
  isDarkMode: boolean;
}

export const AvailableCases: React.FC<AvailableCasesProps> = ({ isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const [currentView, setCurrentView] = useState<'list' | 'details'>('list');

  const [selectedCase, setSelectedCase] = useState<any>(null);

  const [availableCases, setAvailableCases] = useState([
    {
      id: 'EDU004',
      title: 'Educational Access Discrimination',
      description: 'Complaint about discriminatory admission practices at public senior high school. The complainant alleges that their child was denied admission based on discriminatory criteria that violate constitutional rights to education. Multiple students from similar backgrounds have reported similar treatment, suggesting a pattern of systematic discrimination in the admission process.',
      complainant: 'Parent Teachers Association',
      respondent: 'Ghana Education Service',
      dateSubmitted: '8/12/2024',
      documents: [
        'Admission_Denial_Letter.pdf',
        'Student_Application_Form.pdf',
        'Witness_Statements.pdf',
        'School_Admission_Policy.pdf'
      ],
      additionalDetails: {
        location: 'Accra Senior High School, Greater Accra Region',
      }
    },
    {
      id: 'EMP012',
      title: 'Workplace Discrimination Case',
      description: 'Employee alleges discrimination based on gender in promotion decisions. The complainant has documented multiple instances where less qualified male colleagues received promotions over more qualified female employees.',
      complainant: 'Ms. Jane Doe',
      respondent: 'ABC Corporation Ltd',
      dateSubmitted: '10/12/2024',
      documents: [
        'Employment_Records.pdf',
        'Performance_Reviews.pdf'
      ],
      additionalDetails: {
        location: 'Kumasi, Ashanti Region',
      }
    },
    {
      id: 'PUB007',
      title: 'Public Service Misconduct',
      description: 'Allegation of abuse of office and corruption by public officials in the procurement process. Documents suggest irregularities in contract awarding procedures.',
      complainant: 'Civil Society Organization',
      respondent: 'Ministry of Local Government',
      dateSubmitted: '12/12/2024',
      documents: [
        'Procurement_Documents.pdf',
        'Audit_Report.pdf',
        'Correspondence.pdf'
      ],
      additionalDetails: {
        location: 'Tamale, Northern Region',
      }
    }
  ]);

  const handleCaseClick = (caseData: any) => {
    setSelectedCase(caseData);
    setCurrentView('details');
  };

  async function getUnassignedCases(){
    const myHeaders = new Headers();

    var token = localStorage.getItem("token");

    myHeaders.append("Authorization", `Token ${token}`);

    var req = await fetch("http://127.0.0.1:8000/complaints/unassigned-cases", {
      headers: myHeaders,
    })

    var response = await req.json();

    setAvailableCases(response["all_complaints"])
  }

  useEffect(()=>{
    getUnassignedCases()
  }, [])

  return (
    <div className="flex-1 overflow-y-auto flex flex-col">
      {/* {currentView === 'list' && (
        <div className={`${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'} border-b p-6`}>
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className={`w-5 h-5 absolute left-3 top-3 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search available cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full rounded-lg pl-10 pr-4 py-2 border focus:outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800 text-white border-slate-600 focus:border-blue-500' 
                    : 'bg-white text-gray-900 border-gray-300 focus:border-blue-500'
                }`}
              />
            </div>
          </div>
        </div>
      )} */}

      {currentView === 'list' && (
        <div className={`flex-1 p-6 overflow-y-auto ${isDarkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>
          <div className="space-y-4">
            {availableCases.map((caseItem) => (
              <AvailableCaseListItem
                key={caseItem.id}
                caseData={caseItem}
                onCaseClick={handleCaseClick}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
          
          {availableCases.length === 0 && (
            <div className="text-center py-12">
              <div className={`text-lg mb-2 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                No available cases found
              </div>
            </div>
          )}
        </div>
      )}

      {currentView === 'details' && selectedCase && (
        <CaseDetailsPage
          caseData={selectedCase}
          onBack={() => setCurrentView('list')}
          isDarkMode={isDarkMode}
        />
      )}
      
    </div>
  );
};