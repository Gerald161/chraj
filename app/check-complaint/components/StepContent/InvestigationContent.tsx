import React, { useState } from 'react';
import { Upload, FileText, X, CheckCircle, Circle, Check } from 'lucide-react';
import { ClientCaseData } from '../../types/clientCaseData';

interface InvestigationContentProps {
  theme: 'light' | 'dark';
  caseData: ClientCaseData;
}

export const InvestigationContent: React.FC<InvestigationContentProps> = ({ theme, caseData }) => {
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [savedState, setSavedState] = useState(false);

  // Helper function to determine the step index
  const getStepIndex = (status: string) => {
    const steps = ['initial', 'investigation', 'hearing', 'mediation', 'decision', 'resolved'];
    return steps.indexOf(status.toLowerCase());
  };

  // Helper function to determine view state for investigation phase
  const getPhaseState = () => {
    const currentStepIndex = getStepIndex(caseData.status);
    const investigationIndex = 1; // investigation is at index 1
    
    // If status is 'resolved', phase is complete
    if (caseData.status.toLowerCase() === 'resolved') {
      return 'completed';
    }
    
    // Compare indices to determine state
    if (currentStepIndex > investigationIndex) {
      return 'completed';
    } else if (currentStepIndex === investigationIndex) {
      return 'current';
    } else {
      return 'pending';
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setNewFiles(prev => [...prev, ...fileArray]);
    }
    // Reset input value to allow re-uploading the same file
    e.target.value = '';
  };

  const removeNewFile = (index: number) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (newFiles.length === 0) {
      alert('Please upload at least one document before submitting.');
      return;
    }
    
    const formdata = new FormData();

    newFiles.forEach((file)=>{
      formdata.append(`${file.name}`, file)
    })

    const req = await fetch(`http://127.0.0.1:8000/complaints/upload-investigation-files/${caseData.id}`, {
      method: "POST",
      body: formdata
    });

    const res = await req.json();

    if(res["status"] == "uploaded"){
      setSavedState(true)
    }
  };

  const phaseState = getPhaseState();

  // Render the appropriate status card based on phase state
  const renderStatusCard = () => {
    if (phaseState === 'completed') {
      return (
        <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className="text-2xl font-semibold mb-6">Investigation Phase</h2>
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-6 h-6 rounded-full ${
              theme === 'dark' ? 'bg-green-500' : 'bg-green-500'
            } flex items-center justify-center`}>
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-medium text-green-600">Completed</span>
          </div>
          <p className="opacity-75 mb-6">The investigation phase has been completed. All evidence and witness statements have been gathered.</p>
        </div>
      );
    }

    if (phaseState === 'current') {
      return (
        <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className="text-2xl font-semibold mb-6">Investigation Phase</h2>
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-6 h-6 rounded-full border-3 ${
              theme === 'dark' ? 'border-blue-400 bg-blue-400/20' : 'border-blue-500 bg-blue-50'
            } flex items-center justify-center`}>
              <div className={`w-2 h-2 rounded-full ${
                theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'
              }`}></div>
            </div>
            <span className="text-lg font-medium text-blue-600">Currently in Progress</span>
          </div>
          <p className="opacity-75 mb-6">Our investigation team is gathering evidence and witness statements related to your case.</p>
        </div>
      );
    }

    // Pending state
    return (
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Investigation Phase</h2>
        <div className="flex items-center space-x-3 mb-4">
          <Circle className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
          <span className="text-lg font-medium opacity-75">Pending</span>
        </div>
        <p className="opacity-75 mb-6">The investigation phase will begin once the initial phase is complete.</p>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Investigation Status - Dynamic based on caseData.status */}
      {renderStatusCard()}

      {
        (phaseState === 'current' || phaseState === 'completed') &&
        <>
          {/* Required Documents List */}
          {caseData.requested_documents.length !== 0 &&
            <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className="font-semibold text-xl mb-4">Required Documents</h3>
              <ul className="space-y-2">
                {caseData.requested_documents.map((doc, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'
                    }`}></div>
                    <span className="opacity-75">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          }

          {/* Previously Uploaded Documents */}
          {caseData.case_files.length > 0 && (
            <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h3 className="font-semibold text-xl">Previously Uploaded Documents</h3>
              </div>
              <div className="space-y-3">
                {caseData.case_files.map((doc, index) => (
                  <a href={`http://127.0.0.1:8000/media/${doc}`}
                    target='_blank'
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      theme === 'dark'
                        ? 'bg-gray-700 border border-gray-600'
                        : 'bg-green-50 border border-green-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className={theme === 'dark' ? "w-5 h-5 text-green-400" : "w-5 h-5 text-green-600"} />
                      <div>
                        <p className={theme === 'dark' ? "text-sm font-medium text-white" : "text-sm font-medium text-gray-900"}>
                          {doc}
                        </p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      theme === 'dark'
                        ? 'bg-green-900/30 text-green-400'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      Saved
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {
            phaseState === 'current' &&
            <>
              {/* Upload New Documents */}
              {
                caseData.requested_documents.length !== 0 &&
                <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <div className="flex items-start space-x-3 mb-4">
                    <Upload className="w-6 h-6 text-blue-500 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl">Upload Additional Documents</h3>
                      <p className="opacity-75 mt-2">
                        Upload any additional documents to support your case. You can select multiple files at once.
                      </p>
                    </div>
                  </div>

                  {/* New Files Display */}
                  {newFiles.length > 0 && (
                    <div className="space-y-3 mb-4">
                      {newFiles.map((file, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-4 rounded-lg ${
                            theme === 'dark'
                              ? 'bg-gray-700 border border-gray-600'
                              : 'bg-gray-50 border border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <FileText className={theme === 'dark' ? "w-5 h-5 text-blue-400" : "w-5 h-5 text-blue-600"} />
                            <div>
                              <p className={theme === 'dark' ? "text-sm font-medium text-white" : "text-sm font-medium text-gray-900"}>
                                {file.name}
                              </p>
                              <p className={theme === 'dark' ? "text-xs text-gray-400" : "text-xs text-gray-500"}>
                                {(file.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          </div>
                          {
                            !savedState &&
                            <button
                              onClick={() => removeNewFile(index)}
                              className={`p-1 cursor-pointer rounded-full transition-colors ${
                                theme === 'dark'
                                  ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400'
                                  : 'hover:bg-gray-200 text-gray-500 hover:text-red-600'
                              }`}
                              aria-label="Remove document"
                            >
                              <X size={18} />
                            </button>
                          }
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="documents-upload"
                    multiple
                    disabled={savedState}
                  />
                  <label
                    htmlFor="documents-upload"
                    className={`w-full py-4 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center ${
                      savedState
                        ? 'bg-gray-400 cursor-not-allowed opacity-60'
                        : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                    }`}
                  >
                    <Upload className="w-5 h-5 mr-3" />
                    {newFiles.length > 0 ? 'Add More Documents' : 'Select Documents to Upload'}
                  </label>
                </div>
              }

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  disabled={newFiles.length === 0 || savedState}
                  className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 text-white ${
                    newFiles.length === 0 || savedState
                      ? 'bg-gray-400 cursor-not-allowed opacity-60'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl cursor-pointer'
                  }`}
                >
                  Submit Documents
                </button>
              </div>
            </>
          }

          {/* Success Message */}
          {savedState && (
            <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
              theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'
            }`}>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <h3 className="font-semibold text-lg text-green-600">Documents Uploaded Successfully!</h3>
                  <p className={`mt-1 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>
                    Your documents have been submitted and saved to your case file.
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      }
    </div>
  );
};