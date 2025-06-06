
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
import { Plus, Search, Database, TrendingUp, Users, MapPin, Clock, LogOut, Activity, Star } from 'lucide-react';
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
    { id: 'new-customer', label: 'New Customer', icon: Plus, color: 'emerald' },
    { id: 'search', label: 'Search', icon: Search, color: 'blue' },
    { id: 'records', label: 'Records', icon: Database, color: 'violet' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'orange' }
  ];

  const stats = [
    { 
      title: 'Total Customers', 
      value: records.length.toString(), 
      icon: Users, 
      color: 'cyan',
      trend: '+12%'
    },
    { 
      title: 'Total Revenue', 
      value: `₹${totalRevenue.toFixed(2)}`, 
      icon: TrendingUp, 
      color: 'green',
      trend: '+8.2%'
    },
    { 
      title: 'Ready Orders', 
      value: records.filter(r => r.isReady).length.toString(), 
      icon: Clock, 
      color: 'amber',
      trend: '+5.4%'
    },
    { 
      title: 'Active Mills', 
      value: '1', 
      icon: MapPin, 
      color: 'rose',
      trend: 'Stable'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-slate-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-24 h-24 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Activity className="w-8 h-8 text-blue-500 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-700">Loading Khaata Chakki</h3>
            <p className="text-slate-500">Please wait while we prepare your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Modern Header */}
      <header className="bg-white shadow-sm border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Brand Section */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                <img 
                  src="/khaata.png" 
                  alt="Khaata Chakki Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Khaata Chakki</h1>
                <p className="text-sm text-slate-500">Premium Flour Mill Management</p>
              </div>
            </div>
            
            {/* User Section */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-slate-700">Welcome back!</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60 hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-400 to-${stat.color}-500 rounded-xl flex items-center justify-center shadow-sm`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <Star size={12} />
                  {stat.trend}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 mb-8 overflow-hidden">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-medium transition-all duration-300 relative ${
                  activeTab === tab.id
                    ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'new-customer' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-6">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Plus size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Add New Customer</h2>
                    <p className="text-emerald-100">Create a new customer record</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <CustomerForm onSave={handleSaveRecord} />
              </div>
            </div>
          )}

          {activeTab === 'search' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Search size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Search Customers</h2>
                    <p className="text-blue-100">Find existing customer records</p>
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
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-8 py-6">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Database size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Customer Records</h2>
                    <p className="text-violet-100">View all customer data</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <CustomerRecords records={records} onUpdate={handleUpdateRecords} />
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 px-8 py-6">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Financial Analytics</h2>
                    <p className="text-orange-100">Revenue insights and metrics</p>
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
