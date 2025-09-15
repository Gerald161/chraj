"use client"

import { useState } from 'react';
import Link from 'next/link';

import { 
  Users, 
  FileText, 
  Search, 
  MessageCircle,
  Plus,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Shield,
  Scale,
  Heart,
  Target,
  Award,
  ArrowRight,
  ChevronRight,
  Sun,
  Moon,
  Download,
  BookOpen,
  Gavel,
  Building
} from 'lucide-react';

export default function Homepage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const offices = [
    {
      region: 'Greater Accra',
      address: 'CHRAJ Headquarters, Old Parliament House, High Street, Accra',
      phone: '+233 302 664763',
      email: 'info@chrajghana.com',
      hours: 'Mon-Fri: 8:00AM - 5:00PM',
      districts: [
        { name: 'Tema District Office', email: 'tema@chrajghana.com', phone: '+233 303 202456' },
        { name: 'Madina District Office', email: 'madina@chrajghana.com', phone: '+233 302 547891' },
        { name: 'Kasoa District Office', email: 'kasoa@chrajghana.com', phone: '+233 303 897654' }
      ]
    },
    {
      region: 'Ashanti',
      address: 'CHRAJ Regional Office, Kumasi',
      phone: '+233 322 022847',
      email: 'ashanti@chrajghana.com',
      hours: 'Mon-Fri: 8:00AM - 5:00PM',
      districts: [
        { name: 'Obuasi District Office', email: 'obuasi@chrajghana.com', phone: '+233 322 156789' },
        { name: 'Ejisu District Office', email: 'ejisu@chrajghana.com', phone: '+233 322 234567' },
        { name: 'Mampong District Office', email: 'mampong@chrajghana.com', phone: '+233 322 345678' }
      ]
    },
    {
      region: 'Northern',
      address: 'CHRAJ Regional Office, Tamale',
      phone: '+233 372 022156',
      email: 'northern@chrajghana.com',
      hours: 'Mon-Fri: 8:00AM - 5:00PM',
      districts: [
        { name: 'Yendi District Office', email: 'yendi@chrajghana.com', phone: '+233 372 156789' },
        { name: 'Savelugu District Office', email: 'savelugu@chrajghana.com', phone: '+233 372 234567' }
      ]
    },
    {
      region: 'Western',
      address: 'CHRAJ Regional Office, Sekondi-Takoradi',
      phone: '+233 312 020456',
      email: 'western@chrajghana.com',
      hours: 'Mon-Fri: 8:00AM - 5:00PM',
      districts: [
        { name: 'Tarkwa District Office', email: 'tarkwa@chrajghana.com', phone: '+233 312 156789' },
        { name: 'Prestea District Office', email: 'prestea@chrajghana.com', phone: '+233 312 234567' }
      ]
    },
    {
      region: 'Eastern',
      address: 'CHRAJ Regional Office, Koforidua',
      phone: '+233 342 022789',
      email: 'eastern@chrajghana.com',
      hours: 'Mon-Fri: 8:00AM - 5:00PM',
      districts: [
        { name: 'Akropong District Office', email: 'akropong@chrajghana.com', phone: '+233 342 156789' },
        { name: 'Akim Oda District Office', email: 'akim@chrajghana.com', phone: '+233 342 234567' }
      ]
    },
    {
      region: 'Central',
      address: 'CHRAJ Regional Office, Cape Coast',
      phone: '+233 332 132654',
      email: 'central@chrajghana.com',
      hours: 'Mon-Fri: 8:00AM - 5:00PM',
      districts: [
        { name: 'Winneba District Office', email: 'winneba@chrajghana.com', phone: '+233 332 156789' },
        { name: 'Kasoa Central District Office', email: 'kasoacentral@chrajghana.com', phone: '+233 332 234567' }
      ]
    }
  ];

  const caseSteps = [
    {
      step: 1,
      title: 'File Complaint',
      description: 'Submit your complaint online or visit any CHRAJ office',
      icon: FileText,
      status: 'active'
    },
    {
      step: 2,
      title: 'Initial Review',
      description: 'Case is reviewed and assigned to an investigating officer',
      icon: Eye,
      status: 'pending'
    },
    {
      step: 3,
      title: 'Investigation',
      description: 'Thorough investigation conducted with all parties involved',
      icon: Search,
      status: 'pending'
    },
    {
      step: 4,
      title: 'Mediation/Hearing',
      description: 'Attempt resolution through mediation or formal hearing',
      icon: Users,
      status: 'pending'
    },
    {
      step: 5,
      title: 'Decision & Action',
      description: 'Final decision made and appropriate action taken',
      icon: Gavel,
      status: 'pending'
    },
    {
      step: 6,
      title: 'Follow-up',
      description: 'Implementation monitored and compliance ensured',
      icon: CheckCircle,
      status: 'pending'
    }
  ];

  const stats = [
    { label: 'Cases Resolved', value: '15,647', icon: CheckCircle, color: 'green' },
    { label: 'Citizens Served', value: '52,891', icon: Users, color: 'blue' },
    { label: 'Regional Offices', value: '16', icon: Building, color: 'purple' },
    { label: 'Years of Service', value: '30+', icon: Award, color: 'orange' }
  ];

  const features = [
    { text: 'Free Service', description: 'No charges for filing complaints' },
    { text: 'Confidential Process', description: 'Your privacy is protected' },
    { text: 'Fast Processing', description: 'Efficient case handling' },
    { text: 'Professional Investigation', description: 'Thorough and fair investigations' },
    { text: 'Legal Protection', description: 'Constitutional mandate backing' },
    { text: 'Accessible Nationwide', description: 'Offices across all regions' }
  ];

  const themeClasses = {
    bg: isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-green-50',
    cardBg: isDarkMode ? 'bg-gray-800/50 backdrop-blur border-gray-700/50' : 'bg-white',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    border: isDarkMode ? 'border-gray-700/50' : 'border-gray-200',
    headerBg: isDarkMode ? 'bg-gray-800/80 backdrop-blur border-b border-gray-700/50' : 'bg-white',
    footerBg: isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
  };

  return (
    <div className={`min-h-screen ${themeClasses.bg} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${themeClasses.headerBg} shadow-sm sticky top-0 z-40 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                isDarkMode ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-blue-600'
              }`}>
                <Shield className="text-white" size={24} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${themeClasses.text}`}>CHRAJ</h1>
                <p className={`text-sm ${themeClasses.textSecondary}`}>Commission on Human Rights & Administrative Justice</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg cursor-pointer transition-colors ${isDarkMode ? 'bg-gray-700/50 text-yellow-400 hover:bg-gray-600/50' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <Link href={"/signin"} className={`px-4 py-2 border border-blue-600 rounded-lg transition-colors cursor-pointer ${
                isDarkMode 
                  ? 'text-blue-400 hover:bg-blue-500/10 hover:border-blue-400' 
                  : 'text-blue-600 hover:bg-blue-50'
              }`}>
                Staff Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 ${
            isDarkMode ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-blue-100 text-blue-800'
          }`}>
            <Award className="mr-2" size={16} />
            30+ Years Protecting Ghana's Rights
          </div>
          <h2 className={`text-5xl font-bold ${themeClasses.text} mb-6`}>
            Protecting Your Rights,
            <span className="text-blue-500"> Ensuring Justice</span>
          </h2>
          <p className={`text-xl ${themeClasses.textSecondary} mb-8 max-w-3xl mx-auto`}>
            Ghana's independent constitutional body mandated to investigate complaints of human rights violations, 
            corruption, and administrative injustice. Your voice matters, and we're here to ensure it's heard.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className={`${themeClasses.cardBg} p-6 rounded-xl shadow-lg text-center transition-all duration-300 border ${themeClasses.border}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
                stat.color === 'green' ? (isDarkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600') :
                stat.color === 'blue' ? (isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600') :
                stat.color === 'purple' ? (isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600') :
                (isDarkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-100 text-orange-600')
              }`}>
                <stat.icon size={24} />
              </div>
              <div className={`text-3xl font-bold ${themeClasses.text} mb-2`}>{stat.value}</div>
              <div className={`text-sm ${themeClasses.textSecondary}`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions - Side by Side Layout */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* File a Complaint */}
          <div className={`${themeClasses.cardBg} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border ${themeClasses.border} text-center`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${
              isDarkMode ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-red-100 text-red-600'
            }`}>
              <Plus size={28} />
            </div>
            <h3 className={`text-2xl font-semibold mb-4 ${themeClasses.text}`}>File a Complaint</h3>
            <p className={`${themeClasses.textSecondary} mb-6 leading-relaxed`}>
              Report human rights violations, corruption, or administrative injustices. 
              Free, confidential, and accessible to all Ghanaians.
            </p>
            <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-semibold group-hover:shadow-lg">
              File Complaint Now
              <ArrowRight className="inline ml-2" size={18} />
            </button>
          </div>

          {/* Check Case Status */}
          <div className={`${themeClasses.cardBg} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border ${themeClasses.border} text-center`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${
              isDarkMode ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-100 text-green-600'
            }`}>
              <Search size={28} />
            </div>
            <h3 className={`text-2xl font-semibold mb-4 ${themeClasses.text}`}>Check Case Status</h3>
            <p className={`${themeClasses.textSecondary} mb-6 leading-relaxed`}>
              Track the progress of your complaint using your case ID. 
              Stay informed about every step of your case resolution.
            </p>
            <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-semibold group-hover:shadow-lg">
              Check Status
              <Search className="inline ml-2" size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800/30' : 'bg-white'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className={`text-3xl font-bold ${themeClasses.text} mb-4`}>Why Choose CHRAJ</h3>
            <p className={`text-lg ${themeClasses.textSecondary}`}>Comprehensive features that ensure your rights are protected</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className={`${themeClasses.cardBg} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border ${themeClasses.border} group`}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-green-500/20 border border-green-500/30' : 'bg-green-100'
                  } group-hover:scale-110 transition-transform`}>
                    <CheckCircle className="text-green-500" size={16} />
                  </div>
                  <h4 className={`text-lg font-semibold ${themeClasses.text}`}>{feature.text}</h4>
                </div>
                <p className={`${themeClasses.textSecondary} text-sm`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className={`text-3xl font-bold ${themeClasses.text} mb-4`}>Our Purpose</h3>
          <p className={`text-lg ${themeClasses.textSecondary}`}>Guided by our constitutional mandate to serve Ghana</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className={`${themeClasses.cardBg} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border ${themeClasses.border} group text-center`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${
              isDarkMode ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-blue-100 text-blue-600'
            }`}>
              <Target size={24} />
            </div>
            <h4 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>Our Mission</h4>
            <p className={`${themeClasses.textSecondary} leading-relaxed text-sm`}>
              To promote good governance by investigating and addressing complaints of 
              human rights violations, corruption, and administrative injustice in Ghana.
            </p>
          </div>
          
          <div className={`${themeClasses.cardBg} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border ${themeClasses.border} group text-center`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${
              isDarkMode ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-100 text-green-600'
            }`}>
              <Eye size={24} />
            </div>
            <h4 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>Our Vision</h4>
            <p className={`${themeClasses.textSecondary} leading-relaxed text-sm`}>
              A Ghana where human rights are respected, corruption is eliminated, 
              and administrative justice prevails for all citizens.
            </p>
          </div>

          <div className={`${themeClasses.cardBg} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border ${themeClasses.border} group text-center`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${
              isDarkMode ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-purple-100 text-purple-600'
            }`}>
              <Heart size={24} />
            </div>
            <h4 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>Our Values</h4>
            <p className={`${themeClasses.textSecondary} leading-relaxed text-sm`}>
              Integrity, fairness, transparency, accessibility, and unwavering commitment 
              to justice and human dignity.
            </p>
          </div>
        </div>
      </section>

      {/* Case Resolution Process */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800/30' : 'bg-white'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className={`text-3xl font-bold ${themeClasses.text} mb-4`}>How We Resolve Your Case</h3>
            <p className={`text-lg ${themeClasses.textSecondary}`}>Our systematic approach to ensuring justice</p>
          </div>

          <div className="space-y-8">
            {caseSteps.map((step, index) => (
              <div key={index} className={`flex items-start space-x-6 ${themeClasses.cardBg} p-6 rounded-xl shadow-lg transition-colors duration-300 border ${themeClasses.border}`}>
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <step.icon size={24} />
                  </div>
                  <div className={`w-0.5 h-8 mx-auto mt-4 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Step {step.step}
                    </span>
                    <h4 className={`text-xl font-semibold ${themeClasses.text}`}>{step.title}</h4>
                  </div>
                  <p className={`${themeClasses.textSecondary} leading-relaxed`}>{step.description}</p>
                  <div className="mt-4">
                    <span className="text-sm text-blue-500">⏱️ Typical Duration: 5-30 working days (varies by complexity)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className={`text-3xl font-bold ${themeClasses.text} mb-4`}>Our Services</h3>
          <p className={`text-lg ${themeClasses.textSecondary}`}>Comprehensive protection of your rights</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className={`${themeClasses.cardBg} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border ${themeClasses.border}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${
              isDarkMode ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-blue-100 text-blue-600'
            }`}>
              <Users size={24} />
            </div>
            <h4 className={`text-xl font-semibold ${themeClasses.text} mb-4 text-center`}>Human Rights Protection</h4>
            <p className={`${themeClasses.textSecondary} text-center mb-6`}>
              Investigation of violations of fundamental human rights and freedoms
            </p>
            <ul className={`space-y-2 ${themeClasses.textSecondary} text-sm`}>
              <li>• Right to life and personal liberty</li>
              <li>• Freedom of expression and assembly</li>
              <li>• Right to fair trial and due process</li>
              <li>• Protection from discrimination</li>
            </ul>
          </div>
          
          <div className={`${themeClasses.cardBg} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border ${themeClasses.border}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${
              isDarkMode ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-red-100 text-red-600'
            }`}>
              <AlertTriangle size={24} />
            </div>
            <h4 className={`text-xl font-semibold ${themeClasses.text} mb-4 text-center`}>Anti-Corruption</h4>
            <p className={`${themeClasses.textSecondary} text-center mb-6`}>
              Fighting corruption in public institutions and services
            </p>
            <ul className={`space-y-2 ${themeClasses.textSecondary} text-sm`}>
              <li>• Bribery and extortion</li>
              <li>• Abuse of office</li>
              <li>• Conflict of interest</li>
              <li>• Asset declaration monitoring</li>
            </ul>
          </div>
          
          <div className={`${themeClasses.cardBg} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border ${themeClasses.border}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform ${
              isDarkMode ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-green-100 text-green-600'
            }`}>
              <Scale size={24} />
            </div>
            <h4 className={`text-xl font-semibold ${themeClasses.text} mb-4 text-center`}>Administrative Justice</h4>
            <p className={`${themeClasses.textSecondary} text-center mb-6`}>
              Ensuring fair treatment in administrative decisions and processes
            </p>
            <ul className={`space-y-2 ${themeClasses.textSecondary} text-sm`}>
              <li>• Unfair administrative decisions</li>
              <li>• Delayed service delivery</li>
              <li>• Abuse of administrative power</li>
              <li>• Access to information</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800/30' : 'bg-white'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className={`text-3xl font-bold ${themeClasses.text} mb-4`}>Find Our Offices</h3>
            <p className={`text-lg ${themeClasses.textSecondary} mb-8`}>Visit us at any of our regional or district locations across Ghana</p>
            
            <div className="flex justify-center mb-8">
              <select 
                value={selectedRegion} 
                onChange={(e) => setSelectedRegion(e.target.value)}
                className={`px-6 py-3 rounded-lg border transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-600 text-gray-200 focus:border-blue-400 focus:ring-blue-400/20' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500/20'
                } focus:outline-none focus:ring-2`}
                style={isDarkMode ? {
                  backgroundColor: '#1f2937',
                  color: '#e5e7eb'
                } : {}}
              >
                <option value="all">All Regions</option>
                {offices.map((office, index) => (
                  <option key={index} value={office.region}>{office.region}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices
              .filter(office => selectedRegion === 'all' || office.region === selectedRegion)
              .map((office, index) => (
              <div key={index} className={`${themeClasses.cardBg} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border ${themeClasses.border}`}>
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDarkMode ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Building size={20} />
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold ${themeClasses.text}`}>{office.region} Region</h4>
                    <span className="text-blue-500 text-sm">Regional Office</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className={`text-gray-500 flex-shrink-0 mt-1`} size={16} />
                    <p className={`${themeClasses.textSecondary} text-sm`}>{office.address}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className={`text-gray-500`} size={16} />
                    <p className={`${themeClasses.textSecondary} text-sm`}>{office.phone}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail className={`text-gray-500`} size={16} />
                    <p className={`${themeClasses.textSecondary} text-sm`}>{office.email}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className={`text-gray-500`} size={16} />
                    <p className={`${themeClasses.textSecondary} text-sm`}>{office.hours}</p>
                  </div>
                </div>

                {/* District Offices - Simplified Format */}
                <div className={`border-t pt-4 ${themeClasses.border}`}>
                  <h5 className={`text-sm font-semibold ${themeClasses.text} mb-3`}>District Offices:</h5>
                  <div className="space-y-3">
                    {office.districts.map((district, districtIndex) => (
                      <div key={districtIndex} className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-50'}`}>
                        <p className={`text-sm font-medium ${themeClasses.text} mb-2`}>{district.name}</p>
                        
                        <div className="flex items-center space-x-3 mb-1">
                          <Mail className="text-gray-500" size={14} />
                          <p className={`text-xs ${themeClasses.textSecondary}`}>{district.email}</p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Phone className="text-gray-500" size={14} />
                          <p className={`text-xs ${themeClasses.textSecondary}`}>{district.phone}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className={`text-3xl font-bold ${themeClasses.text} mb-4`}>Resources & Information</h3>
          <p className={`text-lg ${themeClasses.textSecondary}`}>Everything you need to know about your rights</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className={`${themeClasses.cardBg} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border ${themeClasses.border}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
              isDarkMode ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-blue-100 text-blue-600'
            }`}>
              <BookOpen size={20} />
            </div>
            <h4 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>Know Your Rights</h4>
            <p className={`${themeClasses.textSecondary} text-sm mb-4`}>Comprehensive guide to your constitutional rights</p>
            <div className="flex items-center text-blue-500 text-sm font-medium">
              <span>Download Guide</span>
              <Download className="ml-1" size={14} />
            </div>
          </div>
          
          <div className={`${themeClasses.cardBg} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border ${themeClasses.border}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
              isDarkMode ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-purple-100 text-purple-600'
            }`}>
              <Gavel size={20} />
            </div>
            <h4 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>Legal Framework</h4>
            <p className={`${themeClasses.textSecondary} text-sm mb-4`}>Laws and regulations governing our operations</p>
            <div className="flex items-center text-blue-500 text-sm font-medium">
              <span>Learn More</span>
              <ChevronRight className="ml-1" size={14} />
            </div>
          </div>
          
          <div className={`${themeClasses.cardBg} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border ${themeClasses.border}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
              isDarkMode ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-orange-100 text-orange-600'
            }`}>
              <MessageCircle size={20} />
            </div>
            <h4 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>FAQs</h4>
            <p className={`${themeClasses.textSecondary} text-sm mb-4`}>Frequently asked questions and answers</p>
            <div className="flex items-center text-blue-500 text-sm font-medium">
              <span>Browse FAQs</span>
              <ChevronRight className="ml-1" size={14} />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${themeClasses.footerBg} py-16 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Organization Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">CHRAJ</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Commission on Human Rights & Administrative Justice</p>
                </div>
              </div>
              <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Established by the 1992 Constitution of Ghana, CHRAJ is an independent body 
                committed to protecting human rights, fighting corruption, and ensuring 
                administrative justice for all Ghanaians.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-blue-400" size={16} />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Old Parliament House, High Street, Accra</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-blue-400" size={16} />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>+233 302 664763</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-blue-400" size={16} />
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>info@chrajghana.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>About Us</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Our Mandate</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Leadership</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Contact Us</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Procurement</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Careers</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>File Complaint</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Check Status</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Human Rights</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Anti-Corruption</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Administrative Justice</a></li>
                <li><a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Public Education</a></li>
              </ul>
            </div>
          </div>

          {/* Social Media & Bottom */}
          <div className={`border-t pt-8 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex space-x-6 mb-4 md:mb-0">
                <a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <Facebook size={24} />
                </a>
                <a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <Twitter size={24} />
                </a>
                <a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <Instagram size={24} />
                </a>
                <a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <Youtube size={24} />
                </a>
              </div>
              
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <div className="flex space-x-6 text-sm">
                  <a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Privacy Policy</a>
                  <a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Terms of Service</a>
                  <a href="#" className={`transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Accessibility</a>
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  © 2025 Commission on Human Rights & Administrative Justice. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}