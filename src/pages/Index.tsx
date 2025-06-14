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

  // Get username from email or user metadata
  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0]; // Extract username from email
    }
    return 'User';
  };

  const tabs = [
    { id: 'new-customer', label: 'New Customer', icon: Plus, color: 'from-blue-500 to-cyan-500' },
    { id: 'search', label: 'Search', icon: Search, color: 'from-purple-500 to-pink-500' },
    { id: 'records', label: 'Records', icon: Database, color: 'from-green-500 to-emerald-500' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'from-orange-500 to-red-500' }
  ];

  const stats = [
    { 
      title: 'Total Customers', 
      value: records.length.toString(), 
      icon: Users, 
      gradient: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    { 
      title: 'Total Revenue', 
      value: `₹${totalRevenue.toFixed(2)}`, 
      icon: TrendingUp, 
      gradient: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    { 
      title: 'Ready Orders', 
      value: records.filter(r => r.isReady).length.toString(), 
      icon: Clock, 
      gradient: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700'
    },
    { 
      title: 'Active Mills', 
      value: '1', 
      icon: MapPin, 
      gradient: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-24 w-24 border-b-4 border-indigo-600 mx-auto mb-4"></div>
            <div className="absolute inset-0 rounded-full h-24 w-24 border-r-4 border-purple-400 animate-ping mx-auto"></div>
          </div>
          <p className="text-xl font-semibold text-slate-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <header className="relative overflow-hidden bg-white shadow-xl border-b border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-90"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Brand Section */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center border-2 border-white/20">
                <img 
                  src="/khaata.png" 
                  alt="Khaata Chakki Logo" 
                  className="w-full h-full rounded-2xl"
                />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-black text-white mb-1">
                  Khaata Chakki
                </h1>
                <p className="text-indigo-100 text-sm lg:text-base font-semibold">
                  Next-Gen Flour Mill Management
                </p>
              </div>
            </div>
            
            {/* Right Section - Date & User Info */}
            <div className="flex items-center gap-4">
              {/* Date Display */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-white mb-1">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="text-xs text-purple-100 font-semibold">
                  {new Date().toLocaleDateString('en-US', { year: 'numeric' })}
                </div>
              </div>
              
              {/* User Info Card */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 text-center min-w-[200px]">
                <p className="text-white font-bold mb-1 text-sm">Welcome back!</p>
                <p className="text-indigo-100 text-xs mb-3 truncate">{getUserDisplayName()}</p>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 transition-all duration-200 text-xs px-4"
                >
                  <LogOut size={14} className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Interactive Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`${stat.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group border border-white/50`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className={`text-3xl font-bold ${stat.textColor} group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
              </div>
              <h3 className={`font-semibold ${stat.textColor} text-lg`}>{stat.title}</h3>
              <div className="mt-3 w-full bg-white/60 rounded-full h-2">
                <div className={`bg-gradient-to-r ${stat.gradient} h-2 rounded-full transition-all duration-1000 group-hover:w-full`} 
                     style={{ width: '65%' }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 mb-8 overflow-hidden">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-6 font-semibold transition-all duration-300 relative min-w-0 flex-1 group ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {activeTab === tab.id && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} transition-all duration-300`}></div>
                )}
                <div className="relative z-10 flex items-center gap-3">
                  <tab.icon size={20} className={activeTab === tab.id ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
                  <span className="font-bold">{tab.label}</span>
                </div>
                {activeTab !== tab.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-slate-400 to-slate-600 group-hover:w-full transition-all duration-300"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Tab Content */}
        <div className="space-y-8">
          {activeTab === 'new-customer' && (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden transform transition-all duration-500 animate-fade-in">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
                </div>
                <div className="relative z-10 flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Plus size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">Add New Customer</h2>
                    <p className="text-blue-100 font-medium">Create a fresh customer record</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-blue-50/50 to-cyan-50/50">
                <CustomerForm onSave={handleSaveRecord} />
              </div>
            </div>
          )}

          {activeTab === 'search' && (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden transform transition-all duration-500 animate-fade-in">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-28 h-28 bg-white rounded-full -translate-y-14 -translate-x-14"></div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-white rounded-full translate-y-10 translate-x-10"></div>
                </div>
                <div className="relative z-10 flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Search size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">Search Customers</h2>
                    <p className="text-purple-100 font-medium">Find and manage existing records</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
                <SearchCustomer 
                  onSearch={handleSearchCustomer} 
                  searchResults={searchResults} 
                  onUpdate={handleUpdateRecords}
                />
              </div>
            </div>
          )}

          {activeTab === 'records' && (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden transform transition-all duration-500 animate-fade-in">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-white rounded-full -translate-y-18 translate-x-18"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
                </div>
                <div className="relative z-10 flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Database size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">Customer Records</h2>
                    <p className="text-green-100 font-medium">Complete database and history</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-green-50/50 to-emerald-50/50">
                <CustomerRecords records={records} onUpdate={handleUpdateRecords} />
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden transform transition-all duration-500 animate-fade-in">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-24 h-24 bg-white rounded-full -translate-y-12 -translate-x-12"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-y-16 translate-x-16"></div>
                </div>
                <div className="relative z-10 flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <TrendingUp size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">Analytics & Transactions</h2>
                    <p className="text-orange-100 font-medium">Revenue insights and business metrics</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-orange-50/50 to-red-50/50">
                <AmountSection records={records} totalRevenue={totalRevenue} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
