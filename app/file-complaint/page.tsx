"use client"

import { useState } from 'react';
import { Moon, Sun, Upload, FileText, ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';

export default function FileComplaint() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [complainant_ref_id, setComplainantRefID] = useState("");

    const [isSaved, setIsSaved] = useState(false);

    const [formData, setFormData] = useState<{
        fullName: string;
        emailAddress: string;
        location: string;
        respondentName: string;
        respondentEmail: string;
        subjectTitle: string;
        detailedDescription: string;
        dateOfIncident: string;
        supportingDocuments: File[];
    }>({
        fullName: '',
        emailAddress: '',
        location: '',
        respondentName: '',
        respondentEmail: '',
        subjectTitle: '',
        detailedDescription: '',
        dateOfIncident: '',
        supportingDocuments: []
    });

    const [formDataErrors, setFormDataErrors] = useState<{
        fullName: string;
        emailAddress: string;
        location: string;
        respondentName: string;
        respondentEmail: string;
        subjectTitle: string;
        detailedDescription: string;
    }>({
        fullName: '',
        emailAddress: '',
        location: '',
        respondentName: '',
        respondentEmail: '',
        subjectTitle: '',
        detailedDescription: ''
    });

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setFormData(prev => ({
            ...prev,
            supportingDocuments: [...prev.supportingDocuments, ...files]
        }));
    };

    const removeDocument = (indexToRemove: number) => {
        setFormData(prev => ({
            ...prev,
            supportingDocuments: prev.supportingDocuments.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = async() => {
        if(isSaved){
            return;
        }

        setIsSubmitting(true);

        // Reset errors
        setFormDataErrors({
            fullName: '',
            emailAddress: '',
            location: '',
            respondentName: '',
            respondentEmail: '',
            subjectTitle: '',
            detailedDescription: ''
        });

        // Validate all fields
        const errors = {
            fullName: formData.fullName.trim() === '' ? 'Full name is required' : '',
            emailAddress: formData.emailAddress.trim() === '' ? 'Email address is required' : '',
            location: formData.location.trim() === '' ? 'Location is required' : '',
            respondentName: formData.respondentName.trim() === '' ? 'Respondent name is required' : '',
            respondentEmail: formData.respondentEmail.trim() === '' ? 'Respondent email is required' : '',
            subjectTitle: formData.subjectTitle.trim() === '' ? 'Subject/Title is required' : '',
            detailedDescription: formData.detailedDescription.trim() === '' ? 'Detailed description is required' : ''
        };

        // Check if there are any errors
        const hasErrors = Object.values(errors).some(error => error !== '');

        if (hasErrors) {
            setFormDataErrors(errors);

            setIsSubmitting(false);

            return;
        }else{
            const formdatatosend = new FormData();

            formdatatosend.append("title", formData.subjectTitle);

            formdatatosend.append("description", formData.detailedDescription);
            formdatatosend.append("location", formData.location);
            formdatatosend.append("complainant", formData.fullName);
            formdatatosend.append("respondent", formData.respondentName);
            formdatatosend.append("complainant_email", formData.emailAddress);
            formdatatosend.append("respondent_email", formData.respondentEmail);

            if(formData.supportingDocuments.length !== 0){
                formData.supportingDocuments.forEach((image)=>{
                    formdatatosend.append(`${image.name}`, image)
                })
            }

            const req = await fetch("http://127.0.0.1:8000/complaints/create-complaint", {
                method: "POST",
                body: formdatatosend
            });

            const res = await req.json();

            if(res["status"] == "saved"){
                setIsSaved(true);
                setComplainantRefID(res["complainant_ref_id"]);
            }

            setIsSubmitting(false);
        }
    };

    const themeClasses = {
        container: isDarkMode 
        ? 'min-h-screen bg-gray-900 text-white' 
        : 'min-h-screen bg-gray-50 text-gray-900',
        formContainer: isDarkMode 
        ? 'bg-gray-800 text-white' 
        : 'bg-white text-gray-900',
        input: isDarkMode 
        ? 'w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400' 
        : 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900',
        select: isDarkMode 
        ? 'w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white' 
        : 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900',
        textarea: isDarkMode 
        ? 'w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400 resize-none' 
        : 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 resize-none',
        uploadArea: isDarkMode 
        ? 'border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer' 
        : 'border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer',
        themeButton: isDarkMode 
        ? 'fixed top-6 right-6 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors z-10' 
        : 'fixed top-6 right-6 p-3 bg-white text-gray-900 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10',
        fileIcon: isDarkMode 
        ? 'w-20 h-20 bg-red-500/20 bg-opacity-15 rounded-full flex items-center justify-center mx-auto mb-6'
        : 'w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6',
        uploadText: isDarkMode 
        ? 'text-lg font-medium text-gray-300 mb-2'
        : 'text-lg font-medium text-gray-600 mb-2',
        uploadSubtext: isDarkMode 
        ? 'text-sm text-gray-400 mb-4'
        : 'text-sm text-gray-500 mb-4'
    };

    return (
        <div className={themeClasses.container}>
            <Link href={"/"}>
                <button
                    className={`fixed top-6 cursor-pointer left-6 p-3 rounded-full shadow-lg transition-all duration-300 z-10 ${
                        isDarkMode
                        ? 'bg-gray-800/50 backdrop-blur border border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                    }`}
                >
                    <ArrowLeft size={20} />
                </button>
            </Link>

            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className={themeClasses.themeButton}
                aria-label="Toggle theme"
            >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className={themeClasses.fileIcon}>
                        <FileText className="w-10 h-10 text-red-500" />
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-2">Submit Your Complaint</h2>
                    <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                        Provide detailed information about your complaint for proper investigation
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    handleSubmit();
                }} className={themeClasses.formContainer + " rounded-lg shadow-lg p-8"}>
                    <div className="space-y-8">
                        {/* Personal Information */}
                        <section>
                        <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
                        
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className={themeClasses.input}
                            />
                            {formDataErrors.fullName !== '' && (
                                <p className="text-red-500 text-sm mt-1">{formDataErrors.fullName}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div>
                            <label className="block text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="emailAddress"
                                placeholder="Enter your email"
                                value={formData.emailAddress}
                                onChange={handleInputChange}
                                className={themeClasses.input}
                            />
                            {formDataErrors.emailAddress !== '' && (
                                <p className="text-red-500 text-sm mt-1">{formDataErrors.emailAddress}</p>
                            )}
                            </div>
                            
                            <div>
                            <label className="block text-sm font-medium mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                placeholder="City/Town"
                                value={formData.location}
                                onChange={handleInputChange}
                                className={themeClasses.input}
                            />
                            {formDataErrors.location !== '' && (
                                <p className="text-red-500 text-sm mt-1">{formDataErrors.location}</p>
                            )}
                            </div>
                        </div>
                        </section>

                        {/* Complaint Details */}
                        <section>
                        <h3 className="text-xl font-semibold mb-6">Complaint Details</h3>
                        
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Respondent Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="respondentName"
                                        placeholder="Name of the respondent"
                                        value={formData.respondentName}
                                        onChange={handleInputChange}
                                        className={themeClasses.input}
                                    />
                                    {formDataErrors.respondentName !== '' && (
                                        <p className="text-red-500 text-sm mt-1">{formDataErrors.respondentName}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Respondent Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="respondentEmail"
                                        placeholder="Email of the respondent"
                                        value={formData.respondentEmail}
                                        onChange={handleInputChange}
                                        className={themeClasses.input}
                                    />
                                    {formDataErrors.respondentEmail !== '' && (
                                        <p className="text-red-500 text-sm mt-1">{formDataErrors.respondentEmail}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Subject/Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="subjectTitle"
                                    placeholder="Brief title of your complaint"
                                    value={formData.subjectTitle}
                                    onChange={handleInputChange}
                                    className={themeClasses.input}
                                />

                                {formDataErrors.subjectTitle !== '' && (
                                    <p className="text-red-500 text-sm mt-1">{formDataErrors.subjectTitle}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Detailed Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="detailedDescription"
                                    placeholder="Provide a detailed description of your complaint..."
                                    rows={6}
                                    value={formData.detailedDescription}
                                    onChange={handleInputChange}
                                    className={themeClasses.textarea}
                                />
                                {formDataErrors.detailedDescription !== '' && (
                                    <p className="text-red-500 text-sm mt-1">{formDataErrors.detailedDescription}</p>
                                )}
                            </div>
                        </div>
                        </section>

                        {/* Supporting Documents */}
                        <section>
                        <h3 className="text-xl font-semibold mb-6">Supporting Documents</h3>
                        
                        {formData.supportingDocuments.length === 0 ? (
                            <div className={themeClasses.uploadArea}>
                                <input
                                    type="file"
                                    multiple
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label htmlFor="file-upload" className="cursor-pointer block">
                                    <Upload className={isDarkMode ? "w-12 h-12 text-gray-400 mx-auto mb-4" : "w-12 h-12 text-gray-400 mx-auto mb-4"} />
                                    <p className={themeClasses.uploadText}>
                                        Upload supporting documents
                                    </p>
                                    <p className={themeClasses.uploadSubtext}>
                                        PDF, DOC, JPG, PNG files up to 10MB each
                                    </p>
                                    <div className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block">
                                        Choose Files
                                    </div>
                                </label>
                            </div>
                        ) : (
                            <div>
                                <div className="space-y-3 mb-4">
                                    {formData.supportingDocuments.map((file, index) => (
                                        <div 
                                            key={index} 
                                            className={`flex items-center justify-between p-4 rounded-lg ${
                                                isDarkMode 
                                                ? 'bg-gray-700 border border-gray-600' 
                                                : 'bg-gray-50 border border-gray-200'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <FileText className={isDarkMode ? "w-5 h-5 text-blue-400" : "w-5 h-5 text-blue-600"} />
                                                <div>
                                                    <p className={isDarkMode ? "text-sm font-medium text-white" : "text-sm font-medium text-gray-900"}>
                                                        {file.name}
                                                    </p>
                                                    <p className={isDarkMode ? "text-xs text-gray-400" : "text-xs text-gray-500"}>
                                                        {(file.size / 1024).toFixed(2)} KB
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeDocument(index)}
                                                className={`p-1 rounded-full transition-colors ${
                                                    isDarkMode 
                                                    ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400' 
                                                    : 'hover:bg-gray-200 text-gray-500 hover:text-red-600'
                                                }`}
                                                aria-label="Remove document"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                
                                <input
                                    type="file"
                                    multiple
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="file-upload-more"
                                />
                                <label 
                                    htmlFor="file-upload-more" 
                                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                                >
                                    Add More Files
                                </label>
                            </div>
                        )}
                        </section>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                disabled={isSubmitting || isSaved}
                                className={`bg-red-600 ${isSaved ? "cursor-not-allowed"  : "cursor-pointer"} text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                            >
                                {
                                    isSubmitting ? "Submitting" :
                                    "Submit Complaint"
                                }
                            </button>
                        </div>
                        {
                            isSaved &&
                            <p className='text-xl'>Complaint has been added, you can check the status from the main page with your reference ID "{complainant_ref_id}", refresh the page if you want to lodge another complaint</p>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}