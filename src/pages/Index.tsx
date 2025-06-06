
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
      change: '100%'
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
                  className="w-full h-full"
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
            
            {/* User Section */}
            <div className="flex items-center gap-4">
              {/* Quick Actions */}
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <Bell size={16} className="mr-2" />
                  Notifications
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <Settings size={16} className="mr-2" />
                  Settings
                </Button>
              </div>
              
              {/* User Info Card */}
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-4 text-center min-w-[200px]">
                <p className="text-white font-bold mb-1 text-sm">Welcome back!</p>
                <p className="text-indigo-100 text-xs mb-3 truncate">{user?.email}</p>
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
                      <div className="text-xs text-green-600 font-bold">
                        {stat.change} ↗
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

        {/* Tab Content with Enhanced Cards */}
        <div className="space-y-8">
          {activeTab === 'new-customer' && (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-500 px-8 py-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center gap-4 text-white">
                  <div className="w-14 h-14 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                    <Plus size={32} />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black mb-2">Add New Customer</h2>
                    <p className="text-emerald-100 text-xl font-semibold">Create a fresh customer record with ease</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-emerald-50/50 to-teal-50/50">
                <CustomerForm onSave={handleSaveRecord} />
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
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-400 to-red-500 px-8 py-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center gap-4 text-white">
                  <div className="w-14 h-14 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                    <TrendingUp size={32} />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black mb-2">Financial Analytics</h2>
                    <p className="text-orange-100 text-xl font-semibold">Revenue insights and business metrics</p>
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
