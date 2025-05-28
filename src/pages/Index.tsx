import React, { useState, useEffect } from 'react';
import CustomerForm from '../components/CustomerForm';
import CustomerRecords from '../components/CustomerRecords';
import SearchCustomer from '../components/SearchCustomer';
import AmountSection from '../components/AmountSection';
import { CustomerRecord } from '../types/Customer';
import { saveCustomerRecord, getAllCustomerRecords, getCustomerByName, getTotalRevenue } from '../utils/storage';
import { toast } from 'sonner';

const Index = () => {
  const [records, setRecords] = useState<CustomerRecord[]>([]);
  const [searchResults, setSearchResults] = useState<CustomerRecord[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

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
      toast.success(`Customer record saved with ID: ${savedRecord.customerId}`, {
        description: `${record.customerName}'s record has been successfully created`,
        duration: 3000,
      });
    } catch (error) {
      toast.error('Failed to save customer record', {
        description: 'Please try again or contact support',
        duration: 3000,
      });
    }
  };

  const handleSearchCustomer = (customerName: string) => {
    const customers = getCustomerByName(customerName);
    setSearchResults(customers);
    if (customers.length > 0) {
      toast.success(`Found ${customers.length} customer(s) matching "${customerName}"`, {
        description: `Search completed successfully`,
        duration: 3000,
      });
    } else {
      toast.error('No customers found with that name', {
        description: 'Try checking the spelling or using a different search term',
        duration: 3000,
      });
    }
  };

  const handleUpdateRecords = () => {
    loadRecords();
    // Also refresh search results if there are any
    if (searchResults.length > 0) {
      const lastSearchTerm = searchResults[0]?.customerName.split(' ')[0] || '';
      if (lastSearchTerm) {
        const updatedResults = getCustomerByName(lastSearchTerm);
        setSearchResults(updatedResults);
      }
    }
    toast.success('Records updated successfully!', {
      description: 'All changes have been saved',
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-300 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-300 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-amber-200 rounded-full animate-bounce"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with enhanced animations */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block mb-4">
            <h1 className="text-5xl font-bold text-amber-900 mb-2 hover:scale-105 transition-transform duration-300 cursor-default">
              🌾 Wheat & Flour Store Manager
            </h1>
            <div className="w-full h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 rounded-full"></div>
          </div>
          <p className="text-xl text-amber-700 font-medium animate-fade-in opacity-90">
            Manage your customer records with ease and precision
          </p>
        </div>

        {/* Main Content Grid with staggered animations */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Customer Form with enhanced styling */}
            <div className="bg-white rounded-2xl shadow-2xl border border-amber-200 overflow-hidden transform hover:scale-[1.02] transition-all duration-300 hover:shadow-3xl">
              <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 px-6 py-5 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                <h2 className="text-xl font-semibold text-white relative z-10 flex items-center gap-2">
                  <span className="text-2xl">➕</span>
                  Add New Customer Record
                </h2>
              </div>
              <div className="p-6 bg-gradient-to-br from-white to-amber-50/30">
                <CustomerForm onSave={handleSaveRecord} />
              </div>
            </div>

            {/* Search Customer with enhanced styling */}
            <div className="bg-white rounded-2xl shadow-2xl border border-amber-200 overflow-hidden transform hover:scale-[1.02] transition-all duration-300 hover:shadow-3xl">
              <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 px-6 py-5 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                <h2 className="text-xl font-semibold text-white relative z-10 flex items-center gap-2">
                  <span className="text-2xl">🔍</span>
                  Search Customer
                </h2>
              </div>
              <div className="p-6 bg-gradient-to-br from-white to-orange-50/30">
                <SearchCustomer 
                  onSearch={handleSearchCustomer} 
                  searchResults={searchResults} 
                  onUpdate={handleUpdateRecords}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Records Display */}
          <div className="bg-white rounded-2xl shadow-2xl border border-amber-200 overflow-hidden transform hover:scale-[1.02] transition-all duration-300 hover:shadow-3xl">
            <div className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 px-6 py-5 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              <h2 className="text-xl font-semibold text-white relative z-10 flex items-center gap-2">
                <span className="text-2xl">📋</span>
                Customer Records
              </h2>
            </div>
            <div className="p-6 bg-gradient-to-br from-white to-yellow-50/30">
              <CustomerRecords records={records} onUpdate={handleUpdateRecords} />
            </div>
          </div>
        </div>

        {/* Amount Section with enhanced styling */}
        <div className="bg-white rounded-2xl shadow-2xl border border-amber-200 overflow-hidden transform hover:scale-[1.01] transition-all duration-300 hover:shadow-3xl">
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 px-6 py-5 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            <h2 className="text-xl font-semibold text-white relative z-10 flex items-center gap-2">
              <span className="text-2xl">💰</span>
              Revenue & Transactions
            </h2>
          </div>
          <div className="p-6 bg-gradient-to-br from-white to-green-50/30">
            <AmountSection records={records} totalRevenue={totalRevenue} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
