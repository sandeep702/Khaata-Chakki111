
import React, { useState, useEffect } from 'react';
import CustomerForm from '../components/CustomerForm';
import CustomerRecords from '../components/CustomerRecords';
import SearchCustomer from '../components/SearchCustomer';
import AmountSection from '../components/AmountSection';
import { CustomerRecord } from '../types/Customer';
import { saveCustomerRecord, getAllCustomerRecords, getCustomerByNameOrId, getTotalRevenue } from '../utils/storage';
import { toast } from 'sonner';
import { Plus, Search, Database, TrendingUp, Wheat, Users, MapPin, Clock } from 'lucide-react';

const Index = () => {
  const [records, setRecords] = useState<CustomerRecord[]>([]);
  const [searchResults, setSearchResults] = useState<CustomerRecord[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeTab, setActiveTab] = useState('new-customer');

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    const allRecords = getAllCustomerRecords();
    setRecords(allRecords);
    setTotalRevenue(getTotalRevenue());
  };

  const handleSaveRecord = (record: Omit<CustomerRecord, 'customerId'>) => {
    try {
      const savedRecord = saveCustomerRecord(record);
      loadRecords();
      
      const existingCustomers = getAllCustomerRecords().filter(r => 
        r.customerName.toLowerCase() === record.customerName.toLowerCase() && r.customerId === savedRecord.customerId
      );
      
      if (existingCustomers.length > 1) {
        toast.success(`Customer record saved under existing ID: ${savedRecord.customerId}`, {
          description: `${record.customerName} already exists, so using same Customer ID`,
          duration: 3000,
        });
      } else {
        toast.success(`New customer record created with ID: ${savedRecord.customerId}`, {
          description: `${record.customerName}'s record has been successfully created`,
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error('Failed to save customer record', {
        description: 'Please try again or contact support',
        duration: 3000,
      });
    }
  };

  const handleSearchCustomer = (searchTerm: string) => {
    const customers = getCustomerByNameOrId(searchTerm);
    setSearchResults(customers);
    if (customers.length > 0) {
      toast.success(`Found ${customers.length} exact match(es) for "${searchTerm}"`, {
        description: `Search completed successfully`,
        duration: 3000,
      });
    } else {
      toast.error('No exact matches found', {
        description: 'Try searching with the exact customer name or ID',
        duration: 3000,
      });
    }
  };

  const handleUpdateRecords = () => {
    loadRecords();
    if (searchResults.length > 0) {
      const lastSearchTerm = searchResults[0]?.customerName || searchResults[0]?.customerId?.toString() || '';
      if (lastSearchTerm) {
        const updatedResults = getCustomerByNameOrId(lastSearchTerm);
        setSearchResults(updatedResults);
      }
    }
    toast.success('Records updated successfully!', {
      description: 'All changes have been saved',
      duration: 2000,
    });
  };

  const tabs = [
    { id: 'new-customer', label: 'New Customer', icon: Plus },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'records', label: 'Records', icon: Database },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  const stats = [
    { 
      title: 'Total Customers', 
      value: records.length.toString(), 
      icon: Users, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      title: 'Total Revenue', 
      value: `₹${totalRevenue.toFixed(2)}`, 
      icon: TrendingUp, 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      title: 'Ready Orders', 
      value: records.filter(r => r.isReady).length.toString(), 
      icon: Clock, 
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    },
    { 
      title: 'Active Mills', 
      value: '15', 
      icon: MapPin, 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <Wheat className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Grain & Grind Hub
                </h1>
                <p className="text-sm text-slate-500 font-medium">Premium Flour Mill Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg">
              <Clock size={16} />
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-2xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 group cursor-pointer`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="text-white" size={20} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                  <div className="text-sm text-slate-600 font-medium">{stat.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-slate-200/50 shadow-lg mb-8">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 font-semibold transition-all duration-300 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                    : 'border-transparent text-slate-600 hover:text-blue-600 hover:bg-slate-50/50'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'new-customer' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-slate-200/50 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6">
                <div className="flex items-center gap-3 text-white">
                  <Plus size={24} />
                  <div>
                    <h2 className="text-xl font-bold">Add New Customer</h2>
                    <p className="text-blue-100">Create a new customer record</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <CustomerForm onSave={handleSaveRecord} />
              </div>
            </div>
          )}

          {activeTab === 'search' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-slate-200/50 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-6">
                <div className="flex items-center gap-3 text-white">
                  <Search size={24} />
                  <div>
                    <h2 className="text-xl font-bold">Search Customers</h2>
                    <p className="text-emerald-100">Find existing customer records</p>
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
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-slate-200/50 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-violet-600 px-8 py-6">
                <div className="flex items-center gap-3 text-white">
                  <Database size={24} />
                  <div>
                    <h2 className="text-xl font-bold">Customer Records</h2>
                    <p className="text-purple-100">All customer data and history</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <CustomerRecords records={records} onUpdate={handleUpdateRecords} />
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-slate-200/50 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 px-8 py-6">
                <div className="flex items-center gap-3 text-white">
                  <TrendingUp size={24} />
                  <div>
                    <h2 className="text-xl font-bold">Financial Analytics</h2>
                    <p className="text-orange-100">Revenue and business insights</p>
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
