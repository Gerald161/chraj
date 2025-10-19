import React, { useEffect, useState } from 'react';
import { Users, Calendar, Clock, MapPin, CheckCircle, Trash2, AlertCircle } from 'lucide-react';
import { CaseData, MediationHearing } from '../../types/case';

interface MediationStepProps {
  caseData: CaseData;
  onAdvance: (newStatus: CaseData['status']) => void;
  isDarkMode: boolean;
}

export const MediationStep: React.FC<MediationStepProps> = ({ caseData, onAdvance, isDarkMode }) => {
  const [mediationDate, setMediationDate] = useState('');
  const [mediationTime, setMediationTime] = useState('');
  const [venue, setVenue] = useState('');
  const [purpose, setPurpose] = useState("");
  const [savedState, setSavedState] = useState(false);

  const [saving, setSaving] = useState(false);

  const [scheduledHearing, setScheduledHearing] = useState<MediationHearing | null>(null);

  const handleAdvance = async () => {
    if (!mediationDate || !mediationTime || !venue || !purpose) {
      alert('Please fill in all fields before submitting');
      return;
    }

    setSaving(true);

    const myHeaders = new Headers();

    var token = localStorage.getItem("token");

    myHeaders.append("Authorization", `Token ${token}`);

    const formdata = new FormData();

    formdata.append("date", mediationDate);
    formdata.append("time", mediationTime);
    formdata.append("venue", venue);
    formdata.append("purpose", purpose);

    var req = await fetch(`http://127.0.0.1:8000/complaints/mediation/${caseData.id}`, {
      method: "POST",
      headers: myHeaders,
      body: formdata
    })

    var res = await req.json();

    if(res["status"].toLowerCase() =="saved"){
      setSavedState(true);
    }

    setSaving(false);
  };

  const handleDelete = () => {
    setScheduledHearing(null);
    setSavedState(false);
  };

  const addMediation = () =>{
    // Validate all fields are filled
    if (!mediationDate || !mediationTime || !venue || !purpose) {
      alert('Please fill in all fields before adding');
      return;
    }

    // Save the scheduled hearing
    setScheduledHearing({
      date: mediationDate,
      time: mediationTime,
      venue: venue,
      purpose: purpose
    });

    setMediationDate('');
      setMediationTime('');
      setVenue('');
      setPurpose('');
  }

  const completeStep = async (stepName: string) => {
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
      onAdvance('decision');
    }
  }

  useEffect(()=>{
    if(caseData.mediation.date !== ""){
      setSavedState(true);

      setScheduledHearing({
        date: caseData.mediation.date,
        time: caseData.mediation.time,
        venue: caseData.mediation.venue,
        purpose: caseData.mediation.purpose
      });
    }
  }, [])

  const isFormValid = mediationDate && mediationTime && venue && purpose;

  return (
    <div className="space-y-6">
      {/* Success Message Card */}
      {scheduledHearing && (
        <div className={`${isDarkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200'} border rounded-lg p-4`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-800'}`}>
                  Mediation Hearing Scheduled Successfully
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-green-300' : 'text-green-700'} mt-1`}>
                  A hearing has been scheduled. You can delete it below to schedule a new one.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scheduled Hearing Details Card */}
      {scheduledHearing && (
        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-lg p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} flex items-center`}>
              <Users className="w-6 h-6 mr-2" />
              Scheduled Hearing Details
            </h3>
            {
              !savedState &&
              <button
                onClick={handleDelete}
                className="space-x-2 px-4 cursor-pointer py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            }
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-start space-x-3">
              <Calendar className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mt-0.5`} />
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {scheduledHearing.date}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mt-0.5`} />
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {scheduledHearing.time}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 md:col-span-2">
              <MapPin className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mt-0.5`} />
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <strong className='text-sm'>Venue:</strong> {scheduledHearing.venue}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 md:col-span-2">
              <AlertCircle className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mt-0.5`} />
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <strong className='text-sm'>Purpose:</strong> {scheduledHearing.purpose}
                </p>
              </div>
            </div>

            {
              caseData.mediation.date !== "" &&
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <strong className='text-sm'>Complainant Attending:</strong> {caseData.mediation.complainant_attending ? "Yes" : "No"}
              </p>
            }

            {
              caseData.mediation.date !== "" &&
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <strong className='text-sm'>Respondent Attending:</strong> {caseData.mediation.respondent_attending ? "Yes" : "No"}
              </p>
            }
          </div>
        </div>
      )}

      {/* Scheduling Form - Only show if no hearing is scheduled */}
      {!scheduledHearing && (
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white border border-gray-200'} rounded-lg p-6`}>
          <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
            <Users className="w-6 h-6 mr-2" />
            Mediation & Hearing Scheduling
          </h3>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Schedule Appointment</h4>
              
              <div>
                <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-gray-700'} text-sm mb-2`}>
                  Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'} absolute left-3 top-3`} />
                  <input
                    type="date"
                    value={mediationDate}
                    onChange={(e) => setMediationDate(e.target.value)}
                    className={`w-full ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 border border-gray-300'} rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    style={{paddingRight: "10px"}}
                  />
                </div>
              </div>

              <div>
                <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-gray-700'} text-sm mb-2`}>
                  Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'} absolute left-3 top-3`} />
                  <input
                    type="time"
                    value={mediationTime}
                    onChange={(e) => setMediationTime(e.target.value)}
                    className={`w-full ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 border border-gray-300'} rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>

              <div>
                <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-gray-700'} text-sm mb-2`}>
                  Venue <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'} absolute left-3 top-3`} />
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className={`w-full ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 border border-gray-300'} rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="CHRAJ Regional Office, Conference Room A"
                  />
                </div>
              </div>

              <div>
                <label className={`block ${isDarkMode ? 'text-slate-300' : 'text-gray-700'} text-sm mb-2`}>
                  Purpose <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className={`w-full ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-white text-gray-900 border border-gray-300'} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Initial hearing, witness testimony, etc."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 gap-2">
            {
              scheduledHearing !== null && <button
                onClick={handleAdvance}
                disabled={!isFormValid}
                className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {
                saving ? "Saving" : "Save"
                }
              </button>
            }

            {
              scheduledHearing == null && <button
                onClick={addMediation}
                disabled={!isFormValid}
                className="px-6 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Mediation
              </button>
            }
          </div>
        </div>
      )}

      {/* Complete Step Button */}
      {savedState && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              if(caseData.status == "mediation"){
                completeStep("decision")
              }
            }}
            className={`px-6 py-2 flex gap-0.5 items-center ${caseData.status == "mediation" ? "cursor-pointer" : "cursor-not-allowed"} bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors`}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete Hearing Step
          </button>
        </div>
      )}
    </div>
  );
};