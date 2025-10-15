"use client"

import React, { useEffect, useState } from 'react';
import { Shield, User, Eye, EyeOff, Sun, Moon, ArrowLeft, Lock, Mail, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const [formData, setFormData] = useState({
      staff_id: '',
      password: '',
      full_name: "",
      email: ""
    });

    const [formDataErrors, setFormDataErrors] = useState({
      staff_id: '',
      password: '',
      full_name: "",
      email: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignup = async() => {
      const newErrors: typeof formDataErrors = { ...formDataErrors };
      
      // Validate all fields are not empty
      (Object.keys(formData) as (keyof typeof formData)[]).forEach((key) => {
        if (!formData[key].trim()) {
          const fieldName = key.replace(/_/g, " ");
          const formattedName =
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
          newErrors[key] = `${formattedName} should not be empty`;
        } else {
          newErrors[key] = "";
        }
      });
      
      // Validate email format
      const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a proper email address";
      }
      
      setFormDataErrors(newErrors);
      
      const hasErrors = Object.values(newErrors).some(error => error !== "");

      if (!hasErrors) {
        setIsLoading(true);
        
        try {
          const formdatatosend = new FormData();
          formdatatosend.append("email", formData.email);
          formdatatosend.append("password", formData.password);
          formdatatosend.append("full_name", formData.full_name);
          formdatatosend.append("staff_id", formData.staff_id);

          var request = await fetch("http://127.0.0.1:8000/account/signup", {
            method: "POST",
            body: formdatatosend
          });

          var data = await request.json();

          const updatedErrors = { ...newErrors }

          if(data["email"] !== undefined){
            updatedErrors.email = data.email;
          }

          if(data["staff_id"] !== undefined){
            updatedErrors.staff_id = data.staff_id;
          }

          setFormDataErrors(updatedErrors);

          if(data["email"] === undefined && data["staff_id"] === undefined){
            if(!localStorage.getItem('token')) {
              localStorage.setItem('token', data['token'])
            }

            router.replace("/dashboard");
          }
        } catch (error) {
          console.error("Signup error:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    const themeClasses = {
        bg: isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-green-50',
        cardBg: isDarkMode ? 'bg-gray-800/50 backdrop-blur border-gray-700/50' : 'bg-white',
        text: isDarkMode ? 'text-white' : 'text-gray-900',
        textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
        border: isDarkMode ? 'border-gray-700/50' : 'border-gray-200',
        input: isDarkMode ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500',
    };

    useEffect(()=>{
      if (localStorage.getItem('token')) {
        router.replace("/dashboard");
      }
    }, [])

    return (
        <div className={`min-h-screen ${themeClasses.bg} flex items-center justify-center p-4 transition-colors duration-300`}>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`fixed top-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 z-10 ${
            isDarkMode 
              ? 'bg-gray-800/50 backdrop-blur border border-gray-700/50 text-yellow-400 hover:bg-gray-700/50' 
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
          }`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Back to Home */}
        <Link
          href={"/signin"}
          className={`fixed top-6 left-6 p-3 rounded-full shadow-lg transition-all duration-300 z-10 ${
            isDarkMode 
              ? 'bg-gray-800/50 backdrop-blur border border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
          }`}
        >
          <ArrowLeft size={20} />
        </Link>

        <div className={`${themeClasses.cardBg} p-8 rounded-2xl shadow-2xl w-full max-w-md border ${themeClasses.border} transition-colors duration-300`}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
              isDarkMode ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-blue-600 to-blue-700'
            } shadow-lg`}>
              <Shield className="text-white" size={32} />
            </div>
            <h2 className={`text-3xl font-bold ${themeClasses.text} mb-2`}>Welcome Back</h2>
            <p className={`${themeClasses.textSecondary}`}>
              Sign in to access the CHRAJ system
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={(e)=>{
              e.preventDefault()
              handleSignup()
            }} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className={`block text-sm font-semibold ${themeClasses.text} mb-3`}>
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                </div>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.input} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="Enter your full name"
                />
              </div>

              {
                formDataErrors.full_name !== "" &&
                <p className={`pt-1.5 text-red-500`}>{formDataErrors.full_name}</p>
              }
            </div>

            {/* Email Field */}
            <div>
              <label className={`block text-sm font-semibold ${themeClasses.text} mb-3`}>
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.input} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="Enter your email"
                />
              </div>

              {
                formDataErrors.email !== "" &&
                <p className={`pt-1.5 text-red-500`}>{formDataErrors.email}</p>
              }
            </div>

            {/* User ID Field */}
            <div>
              <label className={`block text-sm font-semibold ${themeClasses.text} mb-3`}>
                Staff ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                </div>
                <input
                  type="text"
                  name="staff_id"
                  value={formData.staff_id}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.input} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="Enter your staff ID"
                />
              </div>

              {
                formDataErrors.staff_id !== "" &&
                <p className={`pt-1.5 text-red-500`}>{formDataErrors.staff_id}</p>
              }
            </div>

            {/* Password Field */}
            <div>
              <label className={`block text-sm font-semibold ${themeClasses.text} mb-3`}>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.input} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'} ${isLoading ? 'opacity-50' : ''}`} size={18} />
                  ) : (
                    <Eye className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'} ${isLoading ? 'opacity-50' : ''}`} size={18} />
                  )}
                </button>
              </div>

              {
                formDataErrors.password !== "" &&
                <p className={`pt-1.5 text-red-500`}>{formDataErrors.password}</p>
              }
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isLoading ? (
                <div className='flex justify-center items-center gap-1'>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Signing Up...
                </div>
              ) : (
                'Sign Up'
              )}
            </button>

            {/* Sign Up Link */}
          <div className="text-center pt-4 border-t border-gray-700/30">
            <p className={`text-sm ${themeClasses.textSecondary}`}>
              Already have an account?{' '}
              <Link
                href="/signin"
                className="text-blue-500 hover:text-blue-400 transition-colors font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className={`text-xs ${themeClasses.textSecondary}`}>
              Commission on Human Rights & Administrative Justice
            </p>
            <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>
              © 2025 CHRAJ Ghana. All rights reserved.
            </p>
          </div>
        </div>
    </div>
    )
}