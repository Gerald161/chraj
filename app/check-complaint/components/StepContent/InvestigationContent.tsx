import React, { useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface InvestigationContentProps {
  theme: 'light' | 'dark';
}

export const InvestigationContent: React.FC<InvestigationContentProps> = ({ theme }) => {
  const [medicalRecord, setMedicalRecord] = useState<File | null>(null);
  const [witnessStatement, setWitnessStatement] = useState<File | null>(null);

  const handleMedicalRecordUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedicalRecord(file);
    }
  };

  const handleWitnessStatementUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setWitnessStatement(file);
    }
  };

  const removeMedicalRecord = () => {
    setMedicalRecord(null);
  };

  const removeWitnessStatement = () => {
    setWitnessStatement(null);
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log('Medical Record:', medicalRecord);
    console.log('Witness Statement:', witnessStatement);
    alert('Files submitted successfully!');
  };

  return (
    <div className="space-y-8">
      {/* Investigation Status */}
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

      {/* Medical Records Upload */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-start space-x-3 mb-4">
          <Upload className="w-6 h-6 text-blue-500 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-xl">Medical Records Required</h3>
            <p className="opacity-75 mt-2">Please upload medical records from the incident date to support your case.</p>
          </div>
        </div>

        {!medicalRecord ? (
          <>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleMedicalRecordUpload}
              className="hidden"
              id="medical-records-upload"
            />
            <label 
              htmlFor="medical-records-upload"
              className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center cursor-pointer"
            >
              <Upload className="w-5 h-5 mr-3" />
              Upload Document
            </label>
          </>
        ) : (
          <div className={`flex items-center justify-between p-4 rounded-lg ${
            theme === 'dark' 
              ? 'bg-gray-700 border border-gray-600' 
              : 'bg-gray-50 border border-gray-200'
          }`}>
            <div className="flex items-center gap-3">
              <FileText className={theme === 'dark' ? "w-5 h-5 text-blue-400" : "w-5 h-5 text-blue-600"} />
              <div>
                <p className={theme === 'dark' ? "text-sm font-medium text-white" : "text-sm font-medium text-gray-900"}>
                  {medicalRecord.name}
                </p>
                <p className={theme === 'dark' ? "text-xs text-gray-400" : "text-xs text-gray-500"}>
                  {(medicalRecord.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={removeMedicalRecord}
              className={`p-1 rounded-full transition-colors ${
                theme === 'dark' 
                  ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400' 
                  : 'hover:bg-gray-200 text-gray-500 hover:text-red-600'
              }`}
              aria-label="Remove document"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Witness Statements Upload */}
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex items-start space-x-3 mb-4">
          <FileText className="w-6 h-6 text-green-500 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-xl">Witness Statements Required</h3>
            <p className="opacity-75 mt-2">Please provide written statements from any witnesses present during the incident.</p>
          </div>
        </div>

        {!witnessStatement ? (
          <>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleWitnessStatementUpload}
              className="hidden"
              id="witness-statements-upload"
            />
            <label 
              htmlFor="witness-statements-upload"
              className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center cursor-pointer"
            >
              <Upload className="w-5 h-5 mr-3" />
              Upload Witness Statement
            </label>
          </>
        ) : (
          <div className={`flex items-center justify-between p-4 rounded-lg ${
            theme === 'dark' 
              ? 'bg-gray-700 border border-gray-600' 
              : 'bg-gray-50 border border-gray-200'
          }`}>
            <div className="flex items-center gap-3">
              <FileText className={theme === 'dark' ? "w-5 h-5 text-green-400" : "w-5 h-5 text-green-600"} />
              <div>
                <p className={theme === 'dark' ? "text-sm font-medium text-white" : "text-sm font-medium text-gray-900"}>
                  {witnessStatement.name}
                </p>
                <p className={theme === 'dark' ? "text-xs text-gray-400" : "text-xs text-gray-500"}>
                  {(witnessStatement.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={removeWitnessStatement}
              className={`p-1 rounded-full transition-colors ${
                theme === 'dark' 
                  ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400' 
                  : 'hover:bg-gray-200 text-gray-500 hover:text-red-600'
              }`}
              aria-label="Remove document"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!medicalRecord && !witnessStatement}
          className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
            !medicalRecord && !witnessStatement
              ? 'bg-gray-400 cursor-not-allowed opacity-50'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          Submit All Files
        </button>
      </div>
    </div>
  );
};