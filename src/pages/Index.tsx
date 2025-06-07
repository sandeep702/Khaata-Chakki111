
import React, { useState, useEffect } from 'react';
import CustomerForm from '../components/CustomerForm';
import CustomerRecords from '../components/CustomerRecords';
import SearchCustomer from '../components/SearchCustomer';
import AmountSection from '../components/AmountSection';
import { CustomerRecord } from '../types/Customer';
import { useAuth } from '../contexts/AuthContext';
import { 
  saveCustomerRecord, 
  getAllCustomerRecords, 
  getCustomerByNameOrId, 
  getTotalRevenue 
} from '../utils/database';
import { toast } from 'sonner';
import { Plus, Search, Database, TrendingUp, Users, MapPin, Clock, Sparkles, Zap, LogOut, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { user, signOut } = useAuth();
  const [records, setRecords] = useState<CustomerRecord[]>([]);
  const [searchResults, setSearchResults] = useState<CustomerRecord[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeTab, setActiveTab] = useState('new-customer');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      setIsLoading(true);
      const allRecords = await getAllCustomerRecords();
      const revenue = await getTotalRevenue();
      setRecords(allRecords);
      setTotalRevenue(revenue);
    } catch (error) {
      console.error('Error loading records:', error);
      toast.error('Failed to load records');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveRecord = async (record: Omit<CustomerRecord, 'customerId'>) => {
    try {
      const savedRecord = await saveCustomerRecord(record);
      await loadRecords();
      
      toast.success(`Customer record saved with ID: ${savedRecord.customerId}`, {
        description: `${record.customerName}'s record has been successfully saved`,
        duration: 3000,
      });
    } catch (error) {
      toast.error('Failed to save customer record', {
        description: 'Please try again or contact support',
        duration: 3000,
      });
    }
  };

  const handleSearchCustomer = async (searchTerm: string) => {
    try {
      const customers = await getCustomerByNameOrId(searchTerm);
      setSearchResults(customers);
      if (customers.length > 0) {
        toast.success(`Found ${customers.length} match(es) for "${searchTerm}"`, {
          description: `Search completed successfully`,
          duration: 3000,
        });
      } else {
        toast.error('No matches found', {
          description: 'Try searching with the exact customer name or ID',
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error('Search failed', {
        description: 'Please try again',
        duration: 3000,
      });
    }
  };

  const handleUpdateRecords = async () => {
    try {
      await loadRecords();
      if (searchResults.length > 0) {
        const lastSearchTerm = searchResults[0]?.customerName || searchResults[0]?.customerId?.toString() || '';
        if (lastSearchTerm) {
          const updatedResults = await getCustomerByNameOrId(lastSearchTerm);
          setSearchResults(updatedResults);
        }
      }
      toast.success('Records updated successfully!', {
        description: 'All changes have been saved',
        duration: 2000,
      });
    } catch (error) {
      toast.error('Failed to update records');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const tabs = [
    { id: 'new-customer', label: 'New Customer', icon: Plus, color: 'from-emerald-400 to-teal-500' },
    { id: 'search', label: 'Search', icon: Search, color: 'from-blue-400 to-indigo-500' },
    { id: 'records', label: 'Records', icon: Database, color: 'from-purple-400 to-violet-500' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'from-orange-400 to-red-500' }
  ];

  const stats = [
    { 
      title: 'Total Customers', 
      value: records.length.toString(), 
      icon: Users, 
      gradient: 'from-cyan-400 to-blue-500',
      bgGradient: 'from-cyan-50 to-blue-100',
      
    },
    { 
      title: 'Total Revenue', 
      value: `₹${totalRevenue.toFixed(2)}`, 
      icon: TrendingUp, 
      gradient: 'from-emerald-400 to-green-500',
      bgGradient: 'from-emerald-50 to-green-100',
    
    },
    { 
      title: 'Ready Orders', 
      value: records.filter(r => r.isReady).length.toString(), 
      icon: Clock, 
      gradient: 'from-amber-400 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-100',
      
    },
    { 
      title: 'Active Mills', 
      value: '1', 
      icon: MapPin, 
      gradient: 'from-pink-400 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-100',
      
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-indigo-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-32 w-32 border-r-4 border-purple-400 animate-ping mx-auto"></div>
          </div>
          <p className="text-2xl font-bold text-slate-700">Loading your workspace...</p>
          <p className="text-slate-500 mt-2">Preparing everything for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Enhanced Modern Header */}
      <header className="relative overflow-hidden bg-white shadow-2xl border-b border-gradient-to-r from-purple-200 to-pink-200">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-95"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20"></div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
          
          {/* Geometric Patterns */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-spin"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white/20 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white/10 rotate-45 animate-pulse"></div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Enhanced Brand Section */}
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-white/30 to-white/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative w-20 h-20 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl flex items-center justify-center border-2 border-white/30 group-hover:scale-110 transition-all duration-500">
                  <img 
                    src="/khaata.png" 
                    alt="Khaata Chakki Logo" 
                    className="w-full h-full rounded-3xl"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-2 tracking-tight">
                  <span className="bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                    Khaata Chakki
                  </span>
                </h1>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-1 bg-gradient-to-r from-white to-purple-200 rounded-full"></div>
                  <p className="text-purple-100 text-lg lg:text-xl font-bold tracking-wide">
                    Premium Flour Mill Management
                  </p>
                </div>
              </div>
            </div>
            
            {/* Enhanced Right Section */}
            <div className="flex items-center gap-6">
              {/* Enhanced Date Display */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-white/20 to-purple-500/20 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div className="relative bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-6 text-center shadow-xl">
                  <div className="text-3xl font-black text-white mb-2">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-sm text-purple-100 font-bold">
                    {new Date().toLocaleDateString('en-US', { year: 'numeric' })}
                  </div>
                </div>
              </div>
              
              {/* Enhanced User Info Card */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-white/20 to-pink-500/20 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <div className="relative bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-6 text-center min-w-[220px] shadow-xl">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">👤</span>
                    </div>
                  </div>
                  <p className="text-white font-bold mb-2 text-sm">Welcome back!</p>
                  <p className="text-purple-100 text-xs mb-4 truncate font-medium">{user?.email}</p>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30 transition-all duration-300 text-sm px-6 py-2 rounded-xl font-bold backdrop-blur-sm"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 -mt-12 relative z-20">
          {stats.map((stat, index) => (
            <div key={index} className="group cursor-pointer transform transition-all duration-500 hover:scale-105">
              <div className={`bg-gradient-to-br ${stat.bgGradient} rounded-3xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-black rounded-full -translate-y-16 translate-x-16"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                      <stat.icon className="text-white" size={20} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-slate-800 group-hover:scale-110 transition-transform">
                        {stat.value}
                      </div>
                     
                    </div>
                  </div>
                  <div className="text-slate-700 font-bold text-base">{stat.title}</div>
                  <div className="w-full bg-white/60 rounded-full h-2 mt-3">
                    <div className={`bg-gradient-to-r ${stat.gradient} h-2 rounded-full transition-all duration-1000 group-hover:w-full`} 
                         style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modern Tab Navigation */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/50 mb-8 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-6 font-bold transition-all duration-300 relative min-w-0 flex-1 ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {activeTab === tab.id && (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} transition-all duration-500`}></div>
                    <div className="absolute inset-0 bg-black/10"></div>
                  </>
                )}
                <div className="relative z-10 flex items-center gap-3">
                  <tab.icon size={22} className={activeTab === tab.id ? 'animate-pulse' : ''} />
                  <span className="text-lg font-bold">{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Tab Content */}
        <div className="space-y-8">
          {activeTab === 'new-customer' && (
            <div className="relative group">
              {/* Ultra Premium Background Effects */}
              <div className="absolute -inset-12 bg-gradient-to-r from-violet-400/30 via-purple-400/30 to-fuchsia-400/30 rounded-[4rem] blur-[5rem] group-hover:blur-[7rem] transition-all duration-1500 opacity-70 animate-pulse"></div>
              <div className="absolute -inset-8 bg-gradient-to-r from-emerald-300/40 via-teal-300/40 to-cyan-300/40 rounded-[3.5rem] blur-[4rem] transition-all duration-1000 opacity-50"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-rose-300/30 via-pink-300/30 to-purple-300/30 rounded-[3rem] blur-3xl transition-all duration-800 opacity-60"></div>
              
              <div className="relative bg-white/95 backdrop-blur-3xl rounded-[3rem] shadow-[0_40px_120px_rgba(0,0,0,0.15)] border-2 border-white/70 overflow-hidden hover:shadow-[0_60px_150px_rgba(0,0,0,0.2)] transition-all duration-1000 group-hover:scale-[1.01]">
                {/* Ultra Enhanced Header */}
                <div className="relative bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-700 px-16 py-20 overflow-hidden">
                  {/* Advanced Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.2),transparent_70%)]"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.1),transparent_60%)]"></div>
                  
                  {/* Animated Grid Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
                  </div>
                  
                  {/* Floating Magic Elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(25)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-white/20 animate-float"
                        style={{
                          left: `${5 + (i % 5) * 20}%`,
                          top: `${10 + Math.floor(i / 5) * 20}%`,
                          animationDelay: `${i * 0.4}s`,
                          animationDuration: `${6 + Math.random() * 4}s`,
                          fontSize: `${1 + Math.random()}rem`
                        }}
                      >
                        {['✨', '⭐', '💫', '🌟', '✊'][Math.floor(Math.random() * 5)]}
                      </div>
                    ))}
                  </div>
                  
                  {/* Orbiting Elements */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-white/30 rounded-full animate-ping"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-white/20 rounded-full animate-bounce delay-1000"></div>
                    <div className="absolute top-2/3 left-3/4 w-5 h-5 bg-white/25 rounded-full animate-pulse delay-500"></div>
                  </div>
                  
                  <div className="relative z-10 flex items-center gap-10 text-white">
                    <div className="relative group/icon">
                      <div className="absolute -inset-6 bg-white/30 rounded-[3rem] blur-3xl group-hover/icon:blur-[4rem] transition-all duration-700"></div>
                      <div className="relative w-28 h-28 bg-white/25 rounded-[2.5rem] flex items-center justify-center backdrop-blur-2xl hover:scale-125 hover:rotate-12 transition-all duration-700 shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white/30 group-hover/icon:shadow-[0_30px_80px_rgba(255,255,255,0.2)]">
                        <Plus size={48} className="animate-pulse" />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[2.5rem]"></div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-100 to-fuchsia-100 bg-clip-text text-transparent tracking-tight leading-tight">
                        Create New Customer
                      </h2>
                      <p className="text-purple-100 text-3xl font-bold leading-relaxed tracking-wide">
                        ✨ Premium customer record creation with magical experience ✨
                      </p>
                      <div className="flex items-center gap-4 mt-6">
                        <div className="flex gap-2">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-3 h-3 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                          ))}
                        </div>
                        <span className="text-purple-200 text-lg font-semibold">Premium Experience</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Ultra Enhanced Form Container */}
                <div className="p-16 bg-gradient-to-br from-purple-50/30 via-white/50 to-fuchsia-50/30 relative overflow-hidden">
                  {/* Advanced Decorative Elements */}
                  <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-r from-purple-200/40 to-fuchsia-200/40 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-r from-violet-200/40 to-purple-200/40 rounded-full blur-2xl animate-bounce"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-[6rem] animate-pulse"></div>
                  
                  {/* Floating Sparkles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-purple-300/60 animate-float"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.6}s`,
                          animationDuration: `${8 + Math.random() * 4}s`,
                          fontSize: '1.5rem'
                        }}
                      >
                        ✨
                      </div>
                    ))}
                  </div>
                  
                  <div className="relative z-10">
                    <CustomerForm onSave={handleSaveRecord} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'search' && (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-400 to-indigo-500 px-8 py-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center gap-4 text-white">
                  <div className="w-14 h-14 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                    <Search size={32} />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black mb-2">Search Customers</h2>
                    <p className="text-blue-100 text-xl font-semibold">Find and manage existing customer records</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
                <SearchCustomer 
                  onSearch={handleSearchCustomer} 
                  searchResults={searchResults} 
                  onUpdate={handleUpdateRecords}
                />
              </div>
            </div>
          )}

          {activeTab === 'records' && (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-400 to-violet-500 px-8 py-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center gap-4 text-white">
                  <div className="w-14 h-14 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                    <Database size={32} />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black mb-2">Customer Records</h2>
                    <p className="text-purple-100 text-xl font-semibold">Complete customer database and history</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-purple-50/50 to-violet-50/50">
                <CustomerRecords records={records} onUpdate={handleUpdateRecords} />
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="relative group">
              {/* Ultra Premium Analytics Background Effects */}
              <div className="absolute -inset-12 bg-gradient-to-r from-orange-400/30 via-red-400/30 to-pink-400/30 rounded-[4rem] blur-[5rem] group-hover:blur-[7rem] transition-all duration-1500 opacity-70 animate-pulse"></div>
              <div className="absolute -inset-8 bg-gradient-to-r from-amber-300/40 via-orange-300/40 to-red-300/40 rounded-[3.5rem] blur-[4rem] transition-all duration-1000 opacity-50"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-300/30 via-orange-300/30 to-pink-300/30 rounded-[3rem] blur-3xl transition-all duration-800 opacity-60"></div>
              
              <div className="relative bg-white/95 backdrop-blur-3xl rounded-[3rem] shadow-[0_40px_120px_rgba(0,0,0,0.15)] border-2 border-white/70 overflow-hidden hover:shadow-[0_60px_150px_rgba(0,0,0,0.2)] transition-all duration-1000 group-hover:scale-[1.01]">
                {/* Ultra Enhanced Analytics Header */}
                <div className="relative bg-gradient-to-br from-orange-500 via-red-600 to-pink-700 px-16 py-20 overflow-hidden">
                  {/* Advanced Background Pattern for Analytics */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(255,255,255,0.2),transparent_70%)]"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_65%,rgba(255,255,255,0.1),transparent_60%)]"></div>
                  
                  {/* Animated Chart-like Background Elements */}
                  <div className="absolute inset-0 opacity-20">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-white/40 rounded-t-xl animate-pulse"
                        style={{
                          left: `${8 + i * 7}%`,
                          bottom: '15%',
                          width: '12px',
                          height: `${25 + Math.random() * 50}%`,
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: `${2 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Floating Analytics Icons */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-white/25 animate-float"
                        style={{
                          left: `${5 + (i % 4) * 22}%`,
                          top: `${10 + Math.floor(i / 4) * 18}%`,
                          animationDelay: `${i * 0.5}s`,
                          animationDuration: `${7 + Math.random() * 3}s`,
                          fontSize: `${1.2 + Math.random() * 0.8}rem`
                        }}
                      >
                        {['📊', '📈', '💰', '⚡', '🎯'][Math.floor(Math.random() * 5)]}
                      </div>
                    ))}
                  </div>
                  
                  {/* Data Flow Animation */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-1/5 w-8 h-8 bg-white/30 rounded-full animate-ping"></div>
                    <div className="absolute bottom-1/4 right-1/5 w-6 h-6 bg-white/20 rounded-full animate-bounce delay-700"></div>
                    <div className="absolute top-3/4 left-2/3 w-7 h-7 bg-white/25 rounded-full animate-pulse delay-300"></div>
                  </div>
                  
                  <div className="relative z-10 flex items-center gap-10 text-white">
                    <div className="relative group/icon">
                      <div className="absolute -inset-6 bg-white/30 rounded-[3rem] blur-3xl group-hover/icon:blur-[4rem] transition-all duration-700"></div>
                      <div className="relative w-28 h-28 bg-white/25 rounded-[2.5rem] flex items-center justify-center backdrop-blur-2xl hover:scale-125 hover:rotate-12 transition-all duration-700 shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white/30 group-hover/icon:shadow-[0_30px_80px_rgba(255,255,255,0.2)]">
                        <TrendingUp size={48} className="animate-pulse" />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[2.5rem]"></div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-7xl font-black mb-6 bg-gradient-to-r from-white via-orange-100 to-pink-100 bg-clip-text text-transparent tracking-tight leading-tight">
                        Financial Analytics
                      </h2>
                      <p className="text-orange-100 text-3xl font-bold leading-relaxed tracking-wide">
                        📊 Advanced revenue insights and business intelligence 📈
                      </p>
                      <div className="flex items-center gap-4 mt-6">
                        <div className="flex gap-2">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-3 h-3 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                          ))}
                        </div>
                        <span className="text-orange-200 text-lg font-semibold">Real-time Data</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Ultra Enhanced Analytics Container */}
                <div className="p-16 bg-gradient-to-br from-orange-50/30 via-white/50 to-red-50/30 relative overflow-hidden">
                  {/* Advanced Decorative Elements for Analytics */}
                  <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-r from-orange-200/40 to-red-200/40 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-r from-amber-200/40 to-orange-200/40 rounded-full blur-2xl animate-bounce"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full blur-[6rem] animate-pulse"></div>
                  
                  {/* Floating Chart Elements */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-orange-300/60 animate-float"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.8}s`,
                          animationDuration: `${10 + Math.random() * 5}s`,
                          fontSize: '2rem'
                        }}
                      >
                        📊
                      </div>
                    ))}
                  </div>
                  
                  <div className="relative z-10">
                    <AmountSection records={records} totalRevenue={totalRevenue} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
