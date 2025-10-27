import { ArrowLeft, Calendar, FileText, User, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { Hearing } from '../types/case';

interface CaseDetailsPageProps {
  caseData: {
    id: string;
    title: string;
    description: string;
    complainant: string;
    respondent: string;
    dateSubmitted: string;
    status: string;
    category: string;
    priority: string;
    documents?: string[];
    additionalDetails?: {
      location?: string;
    };
    docRequests: string[];
    hearing: Hearing[];
  };
  onBack: () => void;
  isDarkMode: boolean;
}

export default function CaseDetailsPage({
  caseData,
  onBack,
  isDarkMode=true
}: CaseDetailsPageProps) {
  const [mandateStatus, setMandateStatus] = useState<'within' | 'outside' | null>(null);

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async() => {
    const myHeaders = new Headers();

    var token = localStorage.getItem("token");

    myHeaders.append("Authorization", `Token ${token}`);

    const formdata = new FormData();

    formdata.append("case_id", caseData.id);

    if(mandateStatus == "within"){
      formdata.append("mandate_decision", "True");
    }

    if(mandateStatus == "outside"){
      formdata.append("mandate_decision", "False");
    }

    var req = await fetch("http://127.0.0.1:8000/complaints/mandate-decision", {
      method: "POST",
      headers: myHeaders,
      body: formdata
    })

    var res = await req.json();

    if(res["status"].toLowerCase() === "saved"){
      setIsSaved(true);
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        {/* Header */}
        <div className="mb-8 flex items-center">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 mb-4 transition-colors cursor-pointer mr-2 ${
              isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            <ArrowLeft size={24} />
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{caseData.title}</h1>
              <div className="flex items-center gap-4 text-sm">
                <span className={`flex items-center gap-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  <FileText size={16} />
                  {caseData.id}
                </span>
                <span className={`flex items-center gap-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  <Calendar size={16} />
                  {caseData.dateSubmitted}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="">
          {/* Case Details */}
          <div className="space-y-6">
            {/* Case Overview */}
            <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
              <h2 className="text-xl font-semibold mb-4">Case Overview</h2>

              <div>
                <label className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Description
                </label>
                <p className={`mt-1 leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                  {caseData.description}
                </p>
              </div>
            </div>

            {/* Parties Involved */}
            <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
              <h2 className="text-xl font-semibold mb-4">Parties Involved</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <User size={18} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                    <h3 className="font-semibold">Complainant</h3>
                  </div>
                  <p className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>{caseData.complainant}</p>
                </div>

                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <User size={18} className={isDarkMode ? 'text-purple-400' : 'text-purple-600'} />
                    <h3 className="font-semibold">Respondent</h3>
                  </div>
                  <p className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>{caseData.respondent}</p>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            {caseData.additionalDetails && (
              <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
                <h2 className="text-xl font-semibold mb-4">Additional Information</h2>

                <div className="space-y-4">
                  {caseData.additionalDetails.location && (
                    <div>
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        Location
                      </label>
                      <p className="mt-1">{caseData.additionalDetails.location}</p>
                    </div>
                  )}

                </div>
              </div>
            )}

            {/* Documents */}
            {caseData.documents && caseData.documents.length > 0 && (
              <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
                <h2 className="text-xl font-semibold mb-4">Supporting Documents</h2>

                <div className="space-y-2">
                  {caseData.documents.map((doc, idx) => (
                    <a href={`http://127.0.0.1:8000/media/${doc}`}
                      target='_blank'
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        isDarkMode ? 'bg-slate-900 hover:bg-slate-900/80' : 'bg-gray-50 hover:bg-gray-100'
                      } transition-colors cursor-pointer`}
                    >
                      <FileText size={20} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />
                      <span className="flex-1">{doc}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Panel */}
          <div className="">
            <div className={`rounded-lg p-6 sticky top-8 mt-6 ${isDarkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}>
              <h2 className="text-xl font-semibold mb-6">Mandate Assessment</h2>

              {/* Mandate Options */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => 
                    !isSaved && setMandateStatus('within')
                  }
                  className={`cursor-pointer w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                    mandateStatus === 'within'
                      ? 'border-green-500 bg-green-500/10'
                      : isDarkMode
                      ? 'border-slate-700 hover:border-slate-600 bg-slate-900'
                      : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                  }`}
                >
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                    mandateStatus === 'within'
                      ? 'border-green-500 bg-green-500'
                      : isDarkMode
                      ? 'border-slate-600'
                      : 'border-gray-400'
                  }`}>
                    {mandateStatus === 'within' && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-medium">Case is within CHRAJ mandate</span>
                  </div>
                </button>

                <button
                  onClick={() => 
                    !isSaved && setMandateStatus('outside')
                  }
                  className={`cursor-pointer w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                    mandateStatus === 'outside'
                      ? 'border-red-500 bg-red-500/10'
                      : isDarkMode
                      ? 'border-slate-700 hover:border-slate-600 bg-slate-900'
                      : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                  }`}
                >
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                    mandateStatus === 'outside'
                      ? 'border-red-500 bg-red-500'
                      : isDarkMode
                      ? 'border-slate-600'
                      : 'border-gray-400'
                  }`}>
                    {mandateStatus === 'outside' && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-medium">Case is outside CHRAJ mandate</span>
                  </div>
                </button>
              </div>

              {/* Warning for Outside Mandate */}
              {mandateStatus === 'outside' && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-red-500 mb-1">Case Outside Mandate</p>
                      <p className={isDarkMode ? 'text-slate-300' : 'text-gray-700'}>
                        This case will be closed as it falls outside CHRAJ's jurisdiction.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!mandateStatus}
                className={`w-full ${!isSaved ?"cursor-pointer" : "cursor-not-allowed"} py-3 px-4 rounded-lg font-medium transition-all ${
                  mandateStatus === 'within'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : mandateStatus === 'outside'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : isDarkMode
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {mandateStatus === 'within' ? 'Accept Case' : mandateStatus === 'outside' ? 'Close as Outside Mandate' : 'Select Mandate Status'}
              </button>

              {
                isSaved  &&
                <p className='text-xl mt-3'>Complaint status has been updated!</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
