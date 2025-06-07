
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
import { Plus, Search, Database, TrendingUp, Users, MapPin, Clock, Sparkles, Zap, LogOut, Bell, Settings, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { user, signOut } = useAuth();
  const [records, setRecords] = useState<CustomerRecord[]>([]);
  const [searchResults, setSearchResults] = useState<CustomerRecord[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeTab, setActiveTab] = useState('new-customer');
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    loadRecords();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
    { id: 'new-customer', label: 'New Customer', icon: Plus, color: 'from-violet-500 via-purple-600 to-fuchsia-700', particles: '✨' },
    { id: 'search', label: 'Search', icon: Search, color: 'from-cyan-500 via-blue-600 to-indigo-700', particles: '🔍' },
    { id: 'records', label: 'Records', icon: Database, color: 'from-emerald-500 via-green-600 to-teal-700', particles: '📊' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'from-orange-500 via-red-600 to-pink-700', particles: '📈' }
  ];

  const stats = [
    { 
      title: 'Total Customers', 
      value: records.length.toString(), 
      icon: Users, 
      gradient: 'from-violet-400 via-purple-500 to-indigo-600',
      bgGradient: 'from-violet-50 via-purple-50 to-indigo-100',
      glowColor: 'shadow-[0_0_30px_rgba(139,92,246,0.5)]',
      particle: '👥',
    },
    { 
      title: 'Total Revenue', 
      value: `₹${totalRevenue.toFixed(2)}`, 
      icon: TrendingUp, 
      gradient: 'from-emerald-400 via-green-500 to-teal-600',
      bgGradient: 'from-emerald-50 via-green-50 to-teal-100',
      glowColor: 'shadow-[0_0_30px_rgba(16,185,129,0.5)]',
      particle: '💰',
    },
    { 
      title: 'Ready Orders', 
      value: records.filter(r => r.isReady).length.toString(), 
      icon: Clock, 
      gradient: 'from-amber-400 via-orange-500 to-red-600',
      bgGradient: 'from-amber-50 via-orange-50 to-red-100',
      glowColor: 'shadow-[0_0_30px_rgba(245,158,11,0.5)]',
      particle: '⚡',
    },
    { 
      title: 'Active Mills', 
      value: '1', 
      icon: MapPin, 
      gradient: 'from-pink-400 via-rose-500 to-purple-600',
      bgGradient: 'from-pink-50 via-rose-50 to-purple-100',
      glowColor: 'shadow-[0_0_30px_rgba(236,72,153,0.5)]',
      particle: '🏭',
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div className="w-2 h-2 bg-white rounded-full opacity-20"></div>
            </div>
          ))}
        </div>
        
        <div className="text-center relative z-10">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-32 w-32 border-8 border-purple-300 border-t-white mx-auto shadow-2xl"></div>
            <div className="absolute inset-0 rounded-full h-32 w-32 border-8 border-pink-300 border-r-white animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-2 rounded-full h-28 w-28 border-4 border-blue-300 border-b-white animate-spin mx-auto" style={{ animationDuration: '2s' }}></div>
            <div className="absolute inset-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse flex items-center justify-center">
              <Sparkles className="text-white animate-pulse" size={24} />
            </div>
          </div>
          <h2 className="text-5xl font-black text-white mb-4 animate-pulse bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Loading Khaata Chakki
          </h2>
          <p className="text-purple-200 text-xl animate-bounce">Preparing your magical workspace...</p>
          <div className="flex justify-center space-x-2 mt-6">
            {[0, 150, 300].map((delay, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-gradient-to-r from-white to-purple-200 rounded-full animate-bounce"
                style={{ animationDelay: `${delay}ms` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 3}s`,
            }}
          >
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        ))}
        
        {/* Large gradient blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob-slower"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        
        {/* Mouse follower */}
        <div
          className="fixed w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out z-0"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Ultra Modern Header */}
      <header className="relative z-10 bg-gradient-to-r from-black/20 via-purple-900/30 to-black/20 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Enhanced Brand Section */}
            <div className="flex items-center gap-6 group">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center border-2 border-white/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <img 
                    src="/khaata.png" 
                    alt="Khaata Chakki Logo" 
                    className="w-full h-full rounded-full"
                  />
                </div>
              </div>
              
              <div>
                <h1 className="text-5xl lg:text-6xl font-black mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-pulse">
                  Khaata Chakki
                </h1>
                <p className="text-purple-200 text-xl font-bold flex items-center gap-2">
                  <Sparkles className="animate-spin" style={{ animationDuration: '3s' }} />
                  Next-Gen Flour Mill Management
                  <Heart className="text-red-400 animate-pulse" />
                </p>
              </div>
            </div>
            
            {/* Enhanced Right Section */}
            <div className="flex items-center gap-6">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-50 blur group-hover:opacity-75 transition-all duration-300"></div>
                <div className="relative bg-black/20 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 text-center hover:bg-black/30 transition-all duration-300">
                  <div className="text-3xl font-black text-white mb-2 animate-pulse">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-sm text-purple-200 font-semibold">
                    {new Date().toLocaleDateString('en-US', { year: 'numeric' })}
                  </div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl opacity-50 blur group-hover:opacity-75 transition-all duration-300"></div>
                <div className="relative bg-black/20 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 text-center min-w-[220px] hover:bg-black/30 transition-all duration-300">
                  <p className="text-white font-bold mb-2 text-lg flex items-center justify-center gap-2">
                    <Star className="text-yellow-400 animate-pulse" />
                    Welcome back!
                  </p>
                  <p className="text-purple-200 text-sm mb-4 truncate">{user?.email}</p>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/50 text-white hover:from-red-500/40 hover:to-pink-500/40 transition-all duration-300 text-sm px-6 rounded-2xl group-hover:scale-105"
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

      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        {/* Ultra Interactive Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 -mt-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group cursor-pointer transform transition-all duration-700 hover:scale-110 hover:-translate-y-4"
            >
              <div className={`relative bg-gradient-to-br ${stat.bgGradient} rounded-4xl p-8 shadow-2xl border-2 border-white/30 hover:${stat.glowColor} transition-all duration-700 overflow-hidden backdrop-blur-xl`}>
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute opacity-30 animate-float text-2xl"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    >
                      {stat.particle}
                    </div>
                  ))}
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-pulse`}>
                      <stat.icon className="text-white" size={28} />
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black text-slate-800 group-hover:scale-125 transition-transform duration-500 animate-pulse">
                        {stat.value}
                      </div>
                    </div>
                  </div>
                  <div className="text-slate-700 font-bold text-xl mb-4">{stat.title}</div>
                  <div className="w-full bg-white/60 rounded-full h-4 overflow-hidden">
                    <div className={`bg-gradient-to-r ${stat.gradient} h-4 rounded-full transition-all duration-1500 group-hover:w-full shadow-lg animate-pulse`} 
                         style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ultra Modern Tab Navigation */}
        <div className="relative mb-12">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-4xl blur-xl"></div>
          <div className="relative bg-black/10 backdrop-blur-2xl rounded-4xl shadow-2xl border border-white/10 overflow-hidden">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-4 px-10 py-8 font-bold transition-all duration-500 relative min-w-0 flex-1 group ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {activeTab === tab.id && (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} transition-all duration-500`}></div>
                      <div className="absolute inset-0 bg-black/20"></div>
                      {/* Floating particles for active tab */}
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute animate-float text-xl opacity-20"
                            style={{
                              left: `${10 + Math.random() * 80}%`,
                              top: `${10 + Math.random() * 80}%`,
                              animationDelay: `${i * 0.2}s`,
                            }}
                          >
                            {tab.particles}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  <div className="relative z-10 flex items-center gap-4">
                    <tab.icon 
                      size={28} 
                      className={`${
                        activeTab === tab.id 
                          ? 'animate-spin' 
                          : 'group-hover:scale-125 group-hover:rotate-12'
                      } transition-transform duration-500`} 
                      style={{ animationDuration: activeTab === tab.id ? '3s' : undefined }}
                    />
                    <span className="text-xl font-black">{tab.label}</span>
                  </div>
                  {activeTab !== tab.id && (
                    <div className="absolute bottom-0 left-0 w-0 h-2 bg-gradient-to-r from-white to-purple-300 group-hover:w-full transition-all duration-500 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Tab Content */}
        <div className="space-y-8">
          {activeTab === 'new-customer' && (
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/30 via-purple-500/30 to-fuchsia-500/30 rounded-4xl blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-1000"></div>
              <div className="relative bg-black/10 backdrop-blur-2xl rounded-4xl shadow-2xl border border-white/10 overflow-hidden hover:shadow-[0_40px_80px_rgba(0,0,0,0.25)] transition-all duration-1000">
                <div className="bg-gradient-to-r from-violet-500 via-purple-600 to-fuchsia-700 px-10 py-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
                  
                  {/* Floating elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute animate-float text-4xl opacity-10"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.3}s`,
                        }}
                      >
                        ✨
                      </div>
                    ))}
                  </div>
                  
                  <div className="relative z-10 flex items-center gap-6 text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-4xl flex items-center justify-center backdrop-blur-xl hover:scale-125 hover:rotate-12 transition-all duration-500 shadow-2xl">
                      <Plus size={36} className="animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-5xl font-black mb-3 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                        Add New Customer
                      </h2>
                      <p className="text-purple-100 text-2xl font-bold">Create stunning customer records with magical ease</p>
                    </div>
                  </div>
                </div>
                <div className="p-10 bg-gradient-to-br from-purple-50/5 to-violet-50/5">
                  <CustomerForm onSave={handleSaveRecord} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'search' && (
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-indigo-500/30 rounded-4xl blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-1000"></div>
              <div className="relative bg-black/10 backdrop-blur-2xl rounded-4xl shadow-2xl border border-white/10 overflow-hidden hover:shadow-[0_40px_80px_rgba(0,0,0,0.25)] transition-all duration-1000">
                <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 px-10 py-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="relative z-10 flex items-center gap-6 text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-4xl flex items-center justify-center backdrop-blur-xl hover:scale-125 hover:rotate-12 transition-all duration-500 shadow-2xl">
                      <Search size={36} className="animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-5xl font-black mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        Search Customers
                      </h2>
                      <p className="text-blue-100 text-2xl font-bold">Find and manage customer records instantly</p>
                    </div>
                  </div>
                </div>
                <div className="p-10 bg-gradient-to-br from-blue-50/5 to-cyan-50/5">
                  <SearchCustomer 
                    onSearch={handleSearchCustomer} 
                    searchResults={searchResults} 
                    onUpdate={handleUpdateRecords}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'records' && (
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/30 via-green-500/30 to-teal-500/30 rounded-4xl blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-1000"></div>
              <div className="relative bg-black/10 backdrop-blur-2xl rounded-4xl shadow-2xl border border-white/10 overflow-hidden hover:shadow-[0_40px_80px_rgba(0,0,0,0.25)] transition-all duration-1000">
                <div className="bg-gradient-to-r from-emerald-500 via-green-600 to-teal-700 px-10 py-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="relative z-10 flex items-center gap-6 text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-4xl flex items-center justify-center backdrop-blur-xl hover:scale-125 hover:rotate-12 transition-all duration-500 shadow-2xl">
                      <Database size={36} className="animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-5xl font-black mb-3 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                        Customer Records
                      </h2>
                      <p className="text-green-100 text-2xl font-bold">Complete customer database and insights</p>
                    </div>
                  </div>
                </div>
                <div className="p-10 bg-gradient-to-br from-green-50/5 to-emerald-50/5">
                  <CustomerRecords records={records} onUpdate={handleUpdateRecords} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/30 via-red-500/30 to-pink-500/30 rounded-4xl blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-1000"></div>
              <div className="relative bg-black/10 backdrop-blur-2xl rounded-4xl shadow-2xl border border-white/10 overflow-hidden hover:shadow-[0_40px_80px_rgba(0,0,0,0.25)] transition-all duration-1000">
                <div className="bg-gradient-to-r from-orange-500 via-red-600 to-pink-700 px-10 py-12 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="relative z-10 flex items-center gap-6 text-white">
                    <div className="w-20 h-20 bg-white/20 rounded-4xl flex items-center justify-center backdrop-blur-xl hover:scale-125 hover:rotate-12 transition-all duration-500 shadow-2xl">
                      <TrendingUp size={36} className="animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-5xl font-black mb-3 bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
                        Financial Analytics
                      </h2>
                      <p className="text-orange-100 text-2xl font-bold">Revenue insights and business intelligence</p>
                    </div>
                  </div>
                </div>
                <div className="p-10 bg-gradient-to-br from-orange-50/5 to-red-50/5">
                  <AmountSection records={records} totalRevenue={totalRevenue} />
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
