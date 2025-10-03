"use client"

import { useState } from 'react';
import { Moon, Sun, Upload, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FileComplaint() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
        location: '',
        complaintCategory: '',
        subjectTitle: '',
        detailedDescription: '',
        dateOfIncident: '',
        supportingDocuments: []
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
        
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        alert('Complaint submitted successfully!');
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
            <Link
                href={"/"}
                className={`fixed top-6 left-6 p-3 rounded-full shadow-lg transition-all duration-300 z-10 ${
                    isDarkMode
                    ? 'bg-gray-800/50 backdrop-blur border border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
            >
                <ArrowLeft size={20} />
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
                <div className={themeClasses.formContainer + " rounded-lg shadow-lg p-8"}>
                <div className="space-y-8">
                    {/* Personal Information */}
                    <section>
                    <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        </div>
                        
                        <div>
                        <label className="block text-sm font-medium mb-2">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Enter your phone number"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className={themeClasses.input}
                        />
                        </div>
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
                        </div>
                    </div>
                    </section>

                    {/* Complaint Details */}
                    <section>
                    <h3 className="text-xl font-semibold mb-6">Complaint Details</h3>
                    
                    <div className="space-y-6">
                        <div>
                        <label className="block text-sm font-medium mb-2">
                            Complaint Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="complaintCategory"
                            value={formData.complaintCategory}
                            onChange={handleInputChange}
                            className={themeClasses.select}
                        >
                            <option value="">Select category</option>
                            <option value="human-rights">Human Rights Violation</option>
                            <option value="administrative">Administrative Injustice</option>
                            <option value="corruption">Corruption</option>
                            <option value="discrimination">Discrimination</option>
                            <option value="other">Other</option>
                        </select>
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
                        </div>

                        <div>
                        <label className="block text-sm font-medium mb-2">
                            Date of Incident
                        </label>
                        <div className="relative">
                            <input
                            type="date"
                            name="dateOfIncident"
                            value={formData.dateOfIncident}
                            onChange={handleInputChange}
                            className={themeClasses.input}
                            />
                        </div>
                        </div>
                    </div>
                    </section>

                    {/* Supporting Documents */}
                    <section>
                    <h3 className="text-xl font-semibold mb-6">Supporting Documents</h3>
                    
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
                    
                    {formData.supportingDocuments.length > 0 && (
                        <div className="mt-4">
                        <p className={isDarkMode ? "text-sm font-medium mb-2 text-white" : "text-sm font-medium mb-2"}>Selected files:</p>
                        <ul className={isDarkMode ? "text-sm text-gray-300" : "text-sm text-gray-600"}>
                            {formData.supportingDocuments.map((file, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                {/* {file.name} ({Math.round(file.size / 1024)}KB) */}
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}
                    </section>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Submit Complaint
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}