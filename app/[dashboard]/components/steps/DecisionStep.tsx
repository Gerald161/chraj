import React, { useEffect, useState } from 'react';
import { Handshake, CheckCircle, AlertCircle, Trash2, Edit2, Save } from 'lucide-react';
import { CaseData } from '../../types/case';

interface DecisionStepProps {
  caseData: CaseData;
  onAdvance: (newStatus: CaseData['status'], caseID: string) => void;
  isDarkMode: boolean;
}

export const DecisionStep: React.FC<DecisionStepProps> = ({ caseData, onAdvance, isDarkMode }) => {
  const [mediationSuccess, setMediationSuccess] = useState<boolean | null>(null);
  const [agreedTerms, setAgreedTerms] = useState<string[]>(['']);
  const [savedTerms, setSavedTerms] = useState<boolean[]>([false]);
  const [editingTermIndex, setEditingTermIndex] = useState<number | null>(null);
  const [officerNotes, setOfficerNotes] = useState('');

  const [errorMessage, setErrorMessage] = useState("");

  const [saving, setSaving] = useState(false);

  const [saved, setSaved] = useState(false);

  const addTerm = () => {
    // Only add a new term if the last one is saved
    if (savedTerms[savedTerms.length - 1]) {
      setAgreedTerms([...agreedTerms, '']);
      setSavedTerms([...savedTerms, false]);
    }
  };

  const startEditingTerm = (index: number) => {
    setEditingTermIndex(index);
  };

  const saveTerm = (index: number) => {
    if (agreedTerms[index].trim() !== '') {
      const newSavedTerms = [...savedTerms];
      newSavedTerms[index] = true;
      setSavedTerms(newSavedTerms);
      setEditingTermIndex(null);
    }
  };

  const updateTerm = (index: number, value: string) => {
    const newTerms = [...agreedTerms];
    newTerms[index] = value;
    setAgreedTerms(newTerms);
  };

  const removeTerm = (index: number) => {
    if (agreedTerms.length > 1) {
      setAgreedTerms(agreedTerms.filter((_, i) => i !== index));
      setSavedTerms(savedTerms.filter((_, i) => i !== index));
    }
  };

  const handleAdvance = async () => {
    if(caseData.status == "decision"){
      // Get only the saved terms
      const onlySavedTerms = agreedTerms.filter((_, index) => savedTerms[index]);
      
      if(mediationSuccess){
        if(onlySavedTerms.length > 0 && officerNotes.trim().length !== 0){
          setSaving(true);

          setErrorMessage("");

          const myHeaders = new Headers();

          var token = localStorage.getItem("token");

          myHeaders.append("Authorization", `Token ${token}`);

          const formdata = new FormData();

          formdata.append("resolved_positively", "True");

          formdata.append("final_officer_notes", officerNotes);

          onlySavedTerms.forEach((savedTerm)=>{
            formdata.append(savedTerm, savedTerm)
          })

          var req = await fetch(`http://127.0.0.1:8000/complaints/decision/${caseData.id}`, {
            method: "POST",
            headers: myHeaders,
            body: formdata
          })

          var res = await req.json();

          if(res["status"] =="saved"){
            onAdvance('resolved', caseData.id);
          }

          setSaving(false);
        } else {
          setErrorMessage("Please enter your final notes and also at least one term that was agreed upon at the mediation, remember to save term before.");
        }
      }else{
        if(officerNotes.trim().length !== 0){
          setSaving(true);

          setErrorMessage("");

          const myHeaders = new Headers();

          var token = localStorage.getItem("token");

          myHeaders.append("Authorization", `Token ${token}`);

          const formdata = new FormData();

          formdata.append("resolved_positively", "False");

          formdata.append("final_officer_notes", officerNotes);

          var req = await fetch(`http://127.0.0.1:8000/complaints/decision/${caseData.id}`, {
            method: "POST",
            headers: myHeaders,
            body: formdata
          })

          var res = await req.json();

          if(res["status"] =="saved"){
            onAdvance('resolved', caseData.id);
          }

          setSaving(false);
        }else{
          setErrorMessage("Please enter your final notes.");
        }
      }

    }
  };

  useEffect(()=>{
    if(caseData.status == "resolved" && caseData.resolved_positively !== null){
      setSaved(true);
      if(caseData.resolved_positively){
        setAgreedTerms(caseData.terms);
        setMediationSuccess(true);
      }else{
        setMediationSuccess(false);
      }
      setOfficerNotes(caseData.final_notes!);
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Mediation Outcome Summary */}
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white border border-gray-200'} rounded-lg p-6`}>
        <div className='flex items-center mb-4'>
          <Handshake className={`w-6 h-6 mr-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Mediation Outcome
          </h3>
        </div>

        <div className="space-y-3">
          <button
            onClick={() =>{
              if(!saved){
                setMediationSuccess(true)
              }
            }}
            className={`w-full p-4 ${!saved ? "cursor-pointer" : "cursor-not-allowed"} rounded-lg border-2 transition-all flex items-center ${
              mediationSuccess === true
                ? 'border-green-500 bg-green-500/10'
                : isDarkMode
                ? 'border-slate-600 hover:border-slate-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                mediationSuccess === true
                  ? 'border-green-500 bg-green-500'
                  : isDarkMode
                  ? 'border-slate-600'
                  : 'border-gray-300'
              }`}
            >
              {mediationSuccess === true && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Agreement Reached
            </span>
          </button>

          <button
            onClick={() => {
              if(!saved){
                setMediationSuccess(false)
              }
            }}
            className={`w-full ${!saved ? "cursor-pointer" : "cursor-not-allowed"} p-4 rounded-lg border-2 transition-all flex items-center ${
              mediationSuccess === false
                ? 'border-red-500 bg-red-500/10'
                : isDarkMode
                ? 'border-slate-600 hover:border-slate-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                mediationSuccess === false
                  ? 'border-red-500 bg-red-500/10'
                  : isDarkMode
                  ? 'border-slate-600'
                  : 'border-gray-300'
              }`}
            >
              {mediationSuccess === false && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              No Agreement Reached
            </span>
          </button>
        </div>
      </div>

      {/* Terms & Agreement OR Failure Reason */}
      {mediationSuccess === true && (
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white border border-gray-200'} rounded-lg p-6`}>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Terms & Agreement Reached
          </h3>

          <div className="space-y-3">
            {agreedTerms.map((term, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  {editingTermIndex === index || !savedTerms[index] ? (
                    <textarea
                      value={term}
                      disabled={saved}
                      onChange={(e) => updateTerm(index, e.target.value)}
                      className={`w-full ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 border border-gray-300'} rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      rows={2}
                      placeholder={`Term ${index + 1}: Describe what was agreed upon...`}
                      autoFocus
                    />
                  ) : (
                    <p className={`${isDarkMode ? 'bg-slate-700 text-white' : 'bg-gray-50 text-gray-900 border border-gray-300'} rounded-lg p-3 min-h-[60px] break-words`}>
                      {term}
                    </p>
                  )}
                </div>
                {
                  !saved &&
                  <div className="flex gap-2">
                    {editingTermIndex === index || !savedTerms[index] ? (
                      <button
                        onClick={() => saveTerm(index)}
                        className={`p-2 ${isDarkMode ? 'bg-green-900 hover:bg-green-800' : 'bg-green-100 hover:bg-green-200'} ${isDarkMode ? 'text-green-200' : 'text-green-700'} rounded-lg transition-colors flex items-center justify-center`}
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => startEditingTerm(index)}
                        className={`p-2 ${isDarkMode ? 'bg-blue-900 hover:bg-blue-800' : 'bg-blue-100 hover:bg-blue-200'} ${isDarkMode ? 'text-blue-200' : 'text-blue-700'} rounded-lg transition-colors flex items-center justify-center`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                    {agreedTerms.length > 1 && (
                      <button
                        onClick={() => removeTerm(index)}
                        className={`p-2 ${isDarkMode ? 'bg-red-900 hover:bg-red-800' : 'bg-red-100 hover:bg-red-200'} ${isDarkMode ? 'text-red-200' : 'text-red-700'} rounded-lg transition-colors flex items-center justify-center`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                }
              </div>
            ))}

            <button
              onClick={addTerm}
              disabled={!savedTerms[savedTerms.length - 1]}
              className={`w-full py-2 ${
                savedTerms[savedTerms.length - 1]
                  ? isDarkMode 
                    ? 'bg-slate-700 hover:bg-slate-600' 
                    : 'bg-gray-100 hover:bg-gray-200'
                  : isDarkMode
                    ? 'bg-slate-900 cursor-not-allowed opacity-50'
                    : 'bg-gray-50 cursor-not-allowed opacity-50'
              } ${isDarkMode ? 'text-white' : 'text-gray-900'} rounded-lg transition-colors`}
            >
              + Add Another Term
            </button>
          </div>
        </div>
      )}

      {/* Officer Notes - Always Required */}
      {mediationSuccess !== null && (
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white border border-gray-200'} rounded-lg p-6`}>
          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Officer Notes <span className="text-red-500">*</span>
          </h4>

          <textarea
            value={officerNotes}
            disabled={saved}
            onChange={(e) => setOfficerNotes(e.target.value)}
            className={`w-full ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 border border-gray-300'} rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
            rows={3}
            placeholder={mediationSuccess == true ? "Any additional observations or context..." : "Reason for Mediation Failure and additional notes..."}
          />
        </div>
      )}

      {
        errorMessage.trim() !== "" &&
        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          {errorMessage}
        </h3>
      }

      {mediationSuccess !== null && (
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleAdvance}
            className={`px-6 py-2 bg-green-600  ${caseData.status == "decision" ? "cursor-pointer" : "cursor-not-allowed"} text-white rounded-lg hover:bg-green-700 transition-colors flex items-center`}
          >
            {
              saving ? "Saving" : (<><CheckCircle className="w-4 h-4 mr-2" />Mark as Resolved</>)
            }
          </button>
        </div>
      )}
    </div>
  );
};