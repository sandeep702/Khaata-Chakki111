
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
import { Plus, Search, Database, TrendingUp, Users, MapPin, Clock, LogOut } from 'lucide-react';
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
    { id: 'new-customer', label: 'New Customer', icon: Plus, color: 'from-emerald-500 to-teal-600' },
    { id: 'search', label: 'Search', icon: Search, color: 'from-blue-500 to-indigo-600' },
    { id: 'records', label: 'Records', icon: Database, color: 'from-purple-500 to-violet-600' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'from-orange-500 to-red-600' }
  ];

  const stats = [
    { 
      title: 'Total Customers', 
      value: records.length.toString(), 
      icon: Users, 
      gradient: 'from-cyan-500 to-blue-600',
      bgGradient: 'from-cyan-50 to-blue-100',
    },
    { 
      title: 'Total Revenue', 
      value: `₹${totalRevenue.toFixed(2)}`, 
      icon: TrendingUp, 
      gradient: 'from-emerald-500 to-green-600',
      bgGradient: 'from-emerald-50 to-green-100',
    },
    { 
      title: 'Ready Orders', 
      value: records.filter(r => r.isReady).length.toString(), 
      icon: Clock, 
      gradient: 'from-amber-500 to-orange-600',
      bgGradient: 'from-amber-50 to-orange-100',
    },
    { 
      title: 'Active Mills', 
      value: '1', 
      icon: MapPin, 
      gradient: 'from-pink-500 to-rose-600',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <header className="header-gradient shadow-2xl border-b border-white/20 relative">
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl floating-animation"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white/5 rounded-full blur-lg floating-animation" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-10 left-1/3 w-12 h-12 bg-white/15 rounded-full blur-md floating-animation" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Brand Section */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-3xl shadow-2xl flex items-center justify-center glass-effect">
                  <img 
                    src="/khaata.png" 
                    alt="Khaata Chakki Logo" 
                    className="w-14 h-14 rounded-2xl"
                  />
                </div>
                <div className="absolute -inset-1 bg-white/20 rounded-3xl pulse-ring"></div>
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-black text-white mb-2">
                  Khaata Chakki
                </h1>
                <p className="text-white/80 text-lg font-medium">
                  Modern Flour Mill Management
                </p>
              </div>
            </div>
            
            {/* Right Section */}
            <div className="flex items-center gap-6">
              {/* Date Display */}
              <div className="glass-effect rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="text-sm text-white/70 font-medium">
                  {new Date().toLocaleDateString('en-US', { year: 'numeric' })}
                </div>
              </div>
              
              {/* User Info */}
              <div className="glass-effect rounded-2xl p-4 text-center min-w-[180px]">
                <p className="text-white font-semibold mb-1">Welcome back!</p>
                <p className="text-white/70 text-sm mb-3 truncate">{user?.email}</p>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all duration-300"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 -mt-16 relative z-20">
          {stats.map((stat, index) => (
            <div key={index} className="interactive-card">
              <div className={`bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-6 shadow-lg border border-white/50`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-md`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-800">
                      {stat.value}
                    </div>
                  </div>
                </div>
                <div className="text-slate-700 font-semibold">{stat.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-8 overflow-hidden">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-4 font-semibold transition-all duration-300 relative flex-1 ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                {activeTab === tab.id && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} transition-all duration-300`}></div>
                )}
                <div className="relative z-10 flex items-center gap-3">
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'new-customer' && (
            <div className="interactive-card bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-6 relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Plus size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">Add New Customer</h2>
                    <p className="text-emerald-100 font-medium">Create a fresh customer record</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <CustomerForm onSave={handleSaveRecord} />
              </div>
            </div>
          )}

          {activeTab === 'search' && (
            <div className="interactive-card bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6 relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Search size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">Search Customers</h2>
                    <p className="text-blue-100 font-medium">Find existing customer records</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <SearchCustomer 
                  onSearch={handleSearchCustomer} 
                  searchResults={searchResults} 
                  onUpdate={handleUpdateRecords}
                />
              </div>
            </div>
          )}

          {activeTab === 'records' && (
            <div className="interactive-card bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-violet-600 px-8 py-6 relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Database size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">Customer Records</h2>
                    <p className="text-purple-100 font-medium">Complete customer database</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <CustomerRecords records={records} onUpdate={handleUpdateRecords} />
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="interactive-card bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 px-8 py-6 relative">
                {/* Data Flow Animation */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-2 left-10 w-3 h-3 bg-white/30 rounded-full animate-ping"></div>
                  <div className="absolute top-8 right-20 w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 left-1/3 w-4 h-4 bg-white/20 rounded-full animate-bounce"></div>
                </div>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">Financial Analytics</h2>
                    <p className="text-orange-100 font-medium">Revenue insights and business metrics</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
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
