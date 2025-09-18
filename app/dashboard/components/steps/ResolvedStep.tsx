import React from 'react';
import { CheckCircle, Calendar, User, FileText, Download, ArrowLeft } from 'lucide-react';
import { CaseData } from '../../types/case';

interface ResolvedStepProps {
  caseData: CaseData;
  onClose: () => void;
}

export const ResolvedStep: React.FC<ResolvedStepProps> = ({ caseData, onClose }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Case Successfully Resolved</h2>
        <p className="text-slate-400 text-lg">
          Case #{caseData.caseNumber} has been completed and closed
        </p>
      </div>

      {/* Case Summary */}
      <div className="bg-slate-800 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-white mb-4">Case Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-3">
              <div>
                <label className="text-slate-400 text-sm">Case Title</label>
                <p className="text-white font-medium">{caseData.title}</p>
              </div>
              <div>
                <label className="text-slate-400 text-sm">Complainant</label>
                <p className="text-white">{caseData.complainant}</p>
              </div>
              <div>
                <label className="text-slate-400 text-sm">Respondent</label>
                <p className="text-white">{caseData.respondent || 'Not specified'}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-3">
              <div>
                <label className="text-slate-400 text-sm">Date Created</label>
                <p className="text-white flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(caseData.dateCreated).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-slate-400 text-sm">Date Resolved</label>
                <p className="text-white flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(caseData.lastUpdated).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-slate-400 text-sm">Assigned Officer</label>
                <p className="text-white flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {caseData.assignedOfficer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Documents */}
      <div className="bg-slate-800 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <FileText className="w-6 h-6 mr-2" />
          Case Documents
        </h3>
        {caseData.documents.length > 0 ? (
          <div className="space-y-2">
            {caseData.documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between bg-slate-700 rounded-lg p-3">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 text-blue-400 mr-3" />
                  <div>
                    <p className="text-white text-sm font-medium">{doc.name}</p>
                    <p className="text-slate-400 text-xs">Uploaded {doc.uploadDate}</p>
                  </div>
                </div>
                <button className="text-blue-400 hover:text-blue-300 flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  <span className="text-sm">Download</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400">No documents were submitted for this case.</p>
        )}
      </div>

      {/* Final Actions */}
      <div className="bg-slate-800 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-white mb-4">Final Actions</h3>
        <div className="flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center">
            <Download className="w-4 h-4 mr-2" />
            Download Case Report
          </button>
        </div>
      </div>

      {/* Back to Cases */}
      <div className="text-center">
        <button
          onClick={onClose}
          className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center mx-auto"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to My Cases
        </button>
      </div>
    </div>
  );
};