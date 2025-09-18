import React, { useState } from 'react';
import { Search, Upload, Eye, Plus, Download } from 'lucide-react';
import { CaseData } from '../../types/case';

interface InvestigationStepProps {
  caseData: CaseData;
  onAdvance: (newStatus: CaseData['status']) => void;
}

export const InvestigationStep: React.FC<InvestigationStepProps> = ({ caseData, onAdvance }) => {
  const [investigationNotes, setInvestigationNotes] = useState('');
  const [evidenceRequests, setEvidenceRequests] = useState<string[]>([]);
  const [newEvidenceRequest, setNewEvidenceRequest] = useState('');

  const handleAddEvidenceRequest = () => {
    if (newEvidenceRequest.trim()) {
      setEvidenceRequests([...evidenceRequests, newEvidenceRequest.trim()]);
      setNewEvidenceRequest('');
    }
  };

  const handleAdvance = () => {
    onAdvance('HEARING');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <Search className="w-6 h-6 mr-2" />
          Investigation Phase
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Investigation Notes */}
          <div>
            <h4 className="font-medium text-white mb-3">Investigation Notes</h4>
            <textarea
              value={investigationNotes}
              onChange={(e) => setInvestigationNotes(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-lg p-3 resize-none"
              rows={6}
              placeholder="Record investigation findings, witness statements, and key observations..."
            />
          </div>

          {/* Submitted Documents */}
          <div>
            <h4 className="font-medium text-white mb-3">Submitted Documents</h4>
            <div className="space-y-2">
              {caseData.documents.map((doc) => (
                <div key={doc.id} className="bg-slate-700 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 text-blue-400 mr-2" />
                    <div>
                      <p className="text-white text-sm font-medium">{doc.name}</p>
                      <p className="text-slate-400 text-xs">Uploaded {doc.uploadDate}</p>
                    </div>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {caseData.documents.length === 0 && (
                <div className="bg-slate-700 rounded-lg p-4 text-center">
                  <p className="text-slate-400 text-sm">No documents submitted yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Evidence Requests */}
      <div className="bg-slate-800 rounded-lg p-6">
        <h4 className="font-medium text-white mb-3 flex items-center">
          <Upload className="w-5 h-5 mr-2" />
          Evidence & Document Requests
        </h4>
        
        <div className="space-y-3">
          {evidenceRequests.map((request, index) => (
            <div key={index} className="bg-slate-700 rounded-lg p-3">
              <p className="text-white text-sm">{request}</p>
            </div>
          ))}
        </div>

        <div className="flex space-x-2 mt-4">
          <input
            type="text"
            value={newEvidenceRequest}
            onChange={(e) => setNewEvidenceRequest(e.target.value)}
            className="flex-1 bg-slate-700 text-white rounded-lg px-3 py-2"
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
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
          Save Investigation
        </button>
        <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
          Request Additional Evidence
        </button>
        <button
          onClick={handleAdvance}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Proceed to Hearing
        </button>
      </div>
    </div>
  );
};