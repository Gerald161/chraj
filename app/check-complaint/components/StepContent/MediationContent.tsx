import { useEffect, useState } from 'react';
import { Circle, Calendar, CheckCircle, Check } from 'lucide-react';
import { ClientCaseData } from '../../types/clientCaseData';

interface MediationContentProps {
  theme: 'light' | 'dark';
  caseData: ClientCaseData;
}

export const MediationContent: React.FC<MediationContentProps> = ({ theme, caseData }) => {
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);

  const [hasRescheduledDate, setHasRescheduledDate] = useState(false);

  const [isRescheduled, setIsRescheduled] = useState(false);

  // Helper function to determine the step index
  const getStepIndex = (status: string) => {
    const steps = ['initial', 'investigation', 'hearing', 'mediation', 'decision', 'resolved'];
    return steps.indexOf(status.toLowerCase());
  };

  // Helper function to determine view state for mediation phase
  const getPhaseState = () => {
    const currentStepIndex = getStepIndex(caseData.status);
    const mediationIndex = 3; // mediation is at index 3
    
    // If status is 'resolved', phase is complete
    if (caseData.status.toLowerCase() === 'resolved') {
      return 'completed';
    }
    
    // Compare indices to determine state
    if (currentStepIndex > mediationIndex) {
      return 'completed';
    } else if (currentStepIndex === mediationIndex) {
      return 'current';
    } else {
      return 'pending';
    }
  };

  const handleRescheduleClick = () => {
    setShowReschedule(true);
    setIsSubmitted(false);
  };

  const handleConfirmAttendance = () => {
    setIsConfirmed(true);
  };

  const handleCancelAttendance = () => {
    setIsConfirmed(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRescheduleDate(e.target.value);
  };

  const handleSubmitRequest = () => {
    if (rescheduleDate) {
      setIsSubmitted(true);
      setShowReschedule(false);
    }
  };

  const handleCancel = () => {
    setShowReschedule(false);
    setRescheduleDate('');
  };

  const handleSubmit = async () => {
    if (isConfirmed) {
      const formdata = new FormData();
      formdata.append("attendee", caseData.view_type);

      var req = await fetch(`http://127.0.0.1:8000/complaints/confirm_attendace/${caseData.your_mediation_appointment!.id}`, {
        method: "POST",
        body: formdata
      })

      var res = await req.json();

      if(res["status"] == "saved"){
        setIsFinalized(true);
      }

    } else if (isSubmitted && rescheduleDate) {
      const dateObj = new Date(rescheduleDate);
      const date = dateObj.toISOString().split('T')[0];
      const time = dateObj.toTimeString().split(' ')[0].slice(0, 5);

      const formdata = new FormData();
      formdata.append("date", date);
      formdata.append("time", time);

      if(caseData.view_type == "respondent"){
        formdata.append("requester", "respondent");
      }else{
        formdata.append("requester", "complainant");
      }

      var req = await fetch(`http://127.0.0.1:8000/complaints/reschedule-request-notification/${caseData.your_mediation_appointment!.id}`, {
        method: "POST",
        body: formdata
      })

      var res = await req.json();

      if(res["status"] == "saved"){
        setIsRescheduled(true);
        setHasRescheduledDate(true);
      }
    }
  };

  useEffect(()=>{
    if(caseData.view_type == "complainant"){
      if(caseData.your_mediation_appointment?.complainant_attending == true){
        setIsFinalized(true);
      }
    }

    if(caseData.view_type == "respondent"){
      if(caseData.your_mediation_appointment?.respondent_attending == true){
        setIsFinalized(true);
      }
    }
    
  }, [])

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const phaseState = getPhaseState();

  // Render the appropriate status card based on phase state
  const renderStatusCard = () => {
    if (phaseState === 'completed') {
      return (
        <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className="text-2xl font-semibold mb-6">Mediation Phase</h2>
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-6 h-6 rounded-full ${
              theme === 'dark' ? 'bg-green-500' : 'bg-green-500'
            } flex items-center justify-center`}>
              <Check className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-medium text-green-600">Completed</span>
          </div>
          <p className="opacity-75 mb-6">The mediation session has been completed. Both parties have worked towards a mutual agreement.</p>
        </div>
      );
    }

    if (phaseState === 'current') {
      return (
        <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className="text-2xl font-semibold mb-6">Mediation Phase</h2>
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
          <p className="opacity-75 mb-6">Your mediation session is scheduled. This is an opportunity for both parties to work together towards a mutual agreement.</p>
        </div>
      );
    }

    // Pending state
    return (
      <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h2 className="text-2xl font-semibold mb-6">Mediation Phase</h2>
        <div className="flex items-center space-x-3 mb-4">
          <Circle className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
          <span className="text-lg font-medium opacity-75">Pending</span>
        </div>
        <p className="opacity-75 mb-6">Mediation is the step where both parties can work together to reach a mutual agreement. It will be scheduled after the hearing phase.</p>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Mediation Status - Dynamic based on caseData.status */}
      {renderStatusCard()}

      {
        (phaseState === 'current' || phaseState === 'completed') &&
        <>
        {
          caseData.your_mediation_appointment!.date !== "" &&
          <div className={`p-6 rounded-xl shadow-sm transition-all duration-300 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex items-start space-x-3 mb-6">
              <Calendar className="w-6 h-6 text-blue-500 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-xl">Mediation Scheduled</h3>
                <p className="opacity-75 mt-2">Mediation session scheduled for case resolution</p>
              </div>
            </div>
            
            {/* Confirmed Attendance Success Card */}
            {isConfirmed && (
              <div className={`p-6 rounded-lg mb-6 ${
                theme === 'dark' ? 'bg-green-600/30 border-2 border-green-500' : 'bg-green-100 border-2 border-green-400'
              }`}>
                <div className="flex items-center space-x-3 mb-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h4 className="font-semibold text-green-600 text-lg">Attendance Confirmed</h4>
                </div>
                <p className="text-sm opacity-75 ml-9">
                  Your attendance has been successfully confirmed.
                </p>
              </div>
            )}

            {/* Original Schedule */}
            <div className={`p-6 rounded-lg mb-6 ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-lg">
                <div><strong>Date:</strong> {formatDate(caseData.your_mediation_appointment!.date)}</div>
                <div><strong>Time:</strong> {formatTime(caseData.your_mediation_appointment!.time)}</div>
                <div><strong>Venue:</strong> {caseData.your_mediation_appointment!.venue}</div>
              </div>
            </div>

            {caseData.your_mediation_appointment?.purpose && (
              <div className={`p-6 rounded-lg mb-6 ${
                theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <div className="text-lg">
                  <strong>Purpose:</strong> {caseData.your_mediation_appointment.purpose}
                </div>
              </div>
            )}

            {/* Requested Reschedule (Submitted) */}
            {isSubmitted && rescheduleDate && (
              <div className={`p-6 rounded-lg mb-6 ${
                theme === 'dark' ? 'bg-blue-600/20 border-2 border-blue-500' : 'bg-blue-50 border-2 border-blue-300'
              }`}>
                <h4 className="font-semibold text-blue-600 mb-3">Requested New Schedule</h4>
                <div className="text-lg">
                  <p><strong>Requested Date & Time:</strong> {formatDateTime(rescheduleDate)}</p>
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            {
              !isFinalized &&
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <button 
                  onClick={isConfirmed ? handleCancelAttendance : handleConfirmAttendance}
                  disabled={isSubmitted}
                  className={`py-4 rounded-lg font-medium transition-colors duration-200 ${
                    isSubmitted || isConfirmed
                      ? theme === 'dark' 
                        ? 'bg-green-600/30 border-2 border-green-500 text-white hover:bg-green-600/40' 
                        : 'bg-green-100 border-2 border-green-400 text-green-700 hover:bg-green-200'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  } ${isSubmitted ? 'cursor-not-allowed' : ''}`}
                >
                  {isConfirmed ? 'Cancel Attendance' : 'Confirm Attendance'}
                </button>
                {
                  caseData.your_mediation_appointment?.requested_reschedule.date === "" &&
                  <button 
                    onClick={handleRescheduleClick}
                    disabled={isConfirmed || isRescheduled}
                    className={`py-4 rounded-lg font-medium disabled:cursor-not-allowed transition-colors duration-200 ${
                      isConfirmed
                        ? theme === 'dark'
                          ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                          : 'bg-gray-200 cursor-not-allowed text-gray-400'
                        : theme === 'dark' 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {isSubmitted ? 'Change Reschedule Request' : 'Request Reschedule'}
                  </button>
                }
              </div>
            }

            {
              caseData.your_mediation_appointment?.requested_reschedule.date !== "" &&
              <div className={`p-6 mt-4 rounded-lg mb-6 ${
                theme === 'dark' ? 'bg-blue-600/20 border-2 border-blue-500' : 'bg-blue-50 border-2 border-blue-300'
              }`}>
                <h4 className="font-semibold text-blue-600 mb-3">Requested New Schedule</h4>
                <div className="text-lg">
                  <p><strong>Requested Date & Time:</strong> {formatDate(caseData.your_mediation_appointment!.requested_reschedule.date)} {formatTime(caseData.your_mediation_appointment!.requested_reschedule.time)}</p>
                </div>
              </div>
            }

            {/* Submit Button */}
            {
              !isFinalized &&
                <button 
                  onClick={handleSubmit}
                  disabled={(!isConfirmed && !isSubmitted) || isRescheduled}
                  className={`w-full py-4 rounded-lg disabled:cursor-not-allowed font-medium transition-colors duration-200 ${
                    isConfirmed || isSubmitted
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : theme === 'dark'
                        ? 'bg-gray-700 cursor-not-allowed text-gray-500'
                        : 'bg-gray-200 cursor-not-allowed text-gray-400'
                  }`}
                >
                Submit
                </button>
            }

            {
              hasRescheduledDate &&
              <p className="text-xl font-semibold mt-4">Your rescheduled date has been submitted, please check back again to see the updated date and time.</p>
            }

            {
              isFinalized &&
              <p className="text-xl font-semibold mt-4">Appointment for mediation is confirmed</p>
            }
            
            {/* Reschedule Form */}
            {showReschedule && (
              <div className={`mt-6 p-6 rounded-lg border-2 ${
                theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'
              }`}>
                <h4 className="font-semibold text-lg mb-4">Select New Date and Time</h4>
                <input
                  type="datetime-local"
                  value={rescheduleDate}
                  onChange={handleDateChange}
                  className={`w-full px-4 py-3 rounded-lg border mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <div className="flex gap-3">
                  <button 
                    onClick={handleSubmitRequest}
                    disabled={!rescheduleDate}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Submit Request
                  </button>
                  <button 
                    onClick={handleCancel}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                      theme === 'dark' 
                        ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                        : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        }
        </>
      }
    </div>
  );
};