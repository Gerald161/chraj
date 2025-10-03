"use client"

import React, { useState } from 'react';
import { Shield, User, Eye, EyeOff, Sun, Moon, ArrowLeft, Lock } from 'lucide-react';
import Link from 'next/link';

export default function ConfirmPasswordPage() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        rememberMe: false
    });

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleLogin = () => {
        // Handle login logic here
        console.log('Login attempt:', formData);
        alert('Login functionality would be implemented here!');
    };

    const themeClasses = {
        bg: isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-green-50',
        cardBg: isDarkMode ? 'bg-gray-800/50 backdrop-blur border-gray-700/50' : 'bg-white',
        text: isDarkMode ? 'text-white' : 'text-gray-900',
        textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
        border: isDarkMode ? 'border-gray-700/50' : 'border-gray-200',
        input: isDarkMode ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500',
    };

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
        href={"/"}
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
            Reset access to the CHRAJ system
          </p>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
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
                className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.input}`}
                placeholder="Enter your password"
                />
                <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                {showPassword ? (
                    <EyeOff className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`} size={18} />
                ) : (
                    <Eye className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`} size={18} />
                )}
                </button>
            </div>
            </div>

            {/* Password Field */}
          <div>
            <label className={`block text-sm font-semibold ${themeClasses.text} mb-3`}>
              Confirm Password
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
                className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.input}`}
                placeholder="Confirm password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`} size={18} />
                ) : (
                  <Eye className={`${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`} size={18} />
                )}
              </button>
            </div>
          </div>

            {/* Save Button */}
            <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                Save
            </button>
        </div>

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