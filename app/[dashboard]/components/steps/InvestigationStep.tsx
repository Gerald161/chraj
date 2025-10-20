import React, { useEffect, useState } from 'react';
import { Search, Upload, Plus, Download, FileText, Trash2, CheckCircle } from 'lucide-react';
import { CaseData } from '../../types/case';

interface InvestigationStepProps {
  caseData: CaseData;
  onAdvance: (newStatus: CaseData['status'], caseID: string) => void;
  isDarkMode: boolean;
}

export const InvestigationStep: React.FC<InvestigationStepProps> = ({ caseData, onAdvance, isDarkMode }) => {
  const [investigationNotes, setInvestigationNotes] = useState(caseData.investigation_notes ?? "");
  const [evidenceRequests, setEvidenceRequests] = useState<string[]>(caseData.docRequests);
  const [newEvidenceRequest, setNewEvidenceRequest] = useState('');

  const [savedState, setSavedState] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAddEvidenceRequest = () => {
    if (newEvidenceRequest.trim()) {
      setEvidenceRequests([...evidenceRequests, newEvidenceRequest.trim()]);
      setNewEvidenceRequest('');
    }
  };

  const handleAdvance = async () => {
    setSaving(true);

    const myHeaders = new Headers();

    var token = localStorage.getItem("token");

    myHeaders.append("Authorization", `Token ${token}`);

    const formdata = new FormData();

    formdata.append("investigation_notes", investigationNotes);

    if(evidenceRequests.length !== 0){
      evidenceRequests.forEach((name)=>{
        formdata.append(name, name)
      })
    }

    var req = await fetch(`http://127.0.0.1:8000/complaints/investigation-findings/${caseData.id}`, {
      method: "POST",
      headers: myHeaders,
      body: formdata
    })

    var res = await req.json();

    if(res["status"] == "complete"){
      setSavedState(true);
    }

    setSaving(false);
  };

  const handleDeleteClick = (index: number) => {
    setEvidenceRequests(evidenceRequests.filter((_, i) => i !== index));
  };

  const completeStep = async (stepName: string) =>{
    const myHeaders = new Headers();

    var token = localStorage.getItem("token");

    myHeaders.append("Authorization", `Token ${token}`);

    const formdata = new FormData();

    formdata.append("status", stepName);

    var req = await fetch(`http://127.0.0.1:8000/complaints/advance-step/${caseData.id}`, {
      method: "POST",
      headers: myHeaders,
      body: formdata
    })

    var res = await req.json();

    if(res["status"] == "saved"){
      onAdvance('hearing', caseData.id);
    }
  }

  useEffect(()=>{
    if(investigationNotes !== ""){
      setSavedState(true);
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white border border-gray-200'} rounded-lg p-6`}>
        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
          <Search className="w-6 h-6 mr-2" />
          Investigation Phase
        </h3>

        {/* Investigation Notes */}
          <div className='pb-3'>
            <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Investigation Notes</h4>
            <textarea
              value={investigationNotes}
              onChange={(e) => setInvestigationNotes(e.target.value)}
              disabled={savedState}
              className={`w-full ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 border border-gray-300'} rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows={6}
              placeholder="Record investigation findings, witness statements, and key observations..."
            />
          </div>

          {/* Submitted Documents */}
          <div>
            <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Submitted Documents</h4>
            <div className="space-y-2">
              {caseData.documents?.map((doc, index) => (
                <a href={`http://127.0.0.1:8000/media/${doc}`} target='_blank' key={index} className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50 border border-gray-200'} rounded-lg p-3 flex items-center justify-between`}>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 text-blue-400 mr-2" />
                    <div>
                      <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-sm font-medium`}>{doc}</p>
                    </div>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300">
                    <Download className="w-4 h-4" />
                  </button>
                </a>
              ))}
              {caseData.documents?.length === 0 && (
                <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50 border border-gray-200'} rounded-lg p-4 text-center`}>
                  <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-500'} text-sm`}>No documents submitted yet</p>
                </div>
              )}
            </div>
          </div>
      </div>

      {/* Evidence Requests */}
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white border border-gray-200'} rounded-lg p-6`}>
        <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3 flex items-center`}>
          <Upload className="w-5 h-5 mr-2" />
          Evidence & Document Requests
        </h4>
        
        <div className="space-y-3">
          {evidenceRequests.map((request, index) => (
            <div key={index} className={`${isDarkMode ? 'bg-slate-700' : 'bg-gray-50 border border-gray-200'} rounded-lg p-3 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <FileText size={18} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
                <p className={`${isDarkMode ? 'text-white' : 'text-gray-900'} text-sm`}>{request}</p>
              </div>
              {
                !savedState && 
                <button onClick={()=>{handleDeleteClick(index)}} className="p-1 hover:bg-opacity-50 rounded cursor-pointer">
                  <Trash2 size={18} className={isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'} />
                </button>
              }
            </div>
          ))}
        </div>

        {
          !savedState &&
          <div className="flex space-x-2 mt-4">
            <input
              type="text"
              value={newEvidenceRequest}
              onChange={(e) => setNewEvidenceRequest(e.target.value)}
              className={`flex-1 ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 border border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Request specific documents or evidence..."
              onKeyPress={(e) => e.key === 'Enter' && handleAddEvidenceRequest()}
            />
            <button
              onClick={handleAddEvidenceRequest}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Request
            </button>
          </div>
        }
      </div>

      <div className="flex justify-end space-x-4">
        {
          !savedState && <button
            onClick={handleAdvance}
            disabled={investigationNotes.trim() === ""}
            className={`px-6 py-2 bg-blue-600 ${
              investigationNotes.trim() !== ""
              ? "cursor-pointer" 
              : "cursor-no-drop"
            } text-white rounded-lg hover:bg-blue-700 transition-colors`}
          >
            { saving ? "Saving" : "Save"}
          </button>
        }

        {
          savedState && <button
            onClick={()=>{
              if(caseData.status == "investigation"){
                  completeStep("hearing")
                }
              }}
            className={`px-6 py-2 flex gap-0.5 items-center ${caseData.status == "investigation" ? "cursor-pointer" : "cursor-not-allowed"} bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors`}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete Investigation
          </button>
        }
      </div>
    </div>
  );
};