"use client"

import { useState, useEffect } from 'react';
import { User, Eye, EyeOff, Sun, Moon, ArrowLeft, Lock, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image'

export default function SignInPage() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    
    const [showPassword, setShowPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const [formData, setFormData] = useState({
      staff_id: '',
      password: '',
    });

    const [formDataErrors, setFormDataErrors] = useState({
      staff_id: '',
      password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignin = async() => {
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
      
      setFormDataErrors(newErrors);

      setIsLoading(true);

      const formdatatosend = new FormData();
      formdatatosend.append("password", formData.password);
      formdatatosend.append("staff_id", formData.staff_id);

      var request = await fetch("http://127.0.0.1:8000/account/login", {
        method: "POST",
        body: formdatatosend
      });

      var data = await request.json();

      const updatedErrors = { ...newErrors }

      if(data["password"] !== undefined){
        updatedErrors.password = data.password;
      }

      if(data["staff_id"] !== undefined){
        updatedErrors.staff_id = data.staff_id;
      }

      setFormDataErrors(updatedErrors);

      setIsLoading(false);

      if(data["password"] === undefined && data["staff_id"] === undefined){
        if (!localStorage.getItem('token')) {
          localStorage.setItem('token', data['token'])
        }

        router.replace("/dashboard");
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
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
              <Image src={`/chraj_logo.webp`} alt={"Logo"} width="64" height="64" />
            </div>
            <h2 className={`text-3xl font-bold ${themeClasses.text} mb-2`}>Welcome Back</h2>
            <p className={`${themeClasses.textSecondary}`}>
              Sign in to access the CHRAJ system
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={(e)=>{
            e.preventDefault();
            handleSignin()
          }}>
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
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${themeClasses.input}`}
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

              {
                formDataErrors.password !== "" &&
                <p className={`pt-1.5 text-red-500`}>{formDataErrors.password}</p>
              }
            </div>

            {/* Login Button */}
            <button
              onClick={handleSignin}
              className="w-full bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                  <div className='flex justify-center items-center gap-1'>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
            </button>

            {/* Sign In Link */}
            <div className="text-center pt-4 border-t border-gray-700/30">
              <p className={`text-sm ${themeClasses.textSecondary}`}>
                Already have an account?{' '}
                <Link
                  href="/signup"
                  className="text-blue-500 hover:text-blue-400 transition-colors font-semibold"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <div className="flex justify-center">
              <Link
                href={"/forgot-password"}
                className="text-sm text-blue-500 hover:text-blue-400 transition-colors font-medium"
              >
                Forgot password?
              </Link>
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