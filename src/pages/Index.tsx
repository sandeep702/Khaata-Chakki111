
import React, { useState, useEffect } from 'react';
import CustomerForm from '../components/CustomerForm';
import CustomerRecords from '../components/CustomerRecords';
import SearchCustomer from '../components/SearchCustomer';
import AmountSection from '../components/AmountSection';
import { CustomerRecord } from '../types/Customer';
import { saveCustomerRecord, getAllCustomerRecords, getCustomerByNameOrId, getTotalRevenue } from '../utils/storage';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 relative">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 left-16 w-48 h-48 bg-rose-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-80 right-24 w-36 h-36 bg-orange-300 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-32 left-1/3 w-32 h-32 bg-pink-300 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-60 right-1/4 w-40 h-40 bg-yellow-300 rounded-full blur-3xl animate-bounce"></div>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-8">
            <h1 className="text-7xl font-extrabold bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-6 hover:scale-105 transition-transform duration-300 cursor-default">
              🌾 Grain & Grind Hub
            </h1>
            <div className="w-40 h-2 bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400 rounded-full mx-auto mb-4"></div>
            <div className="flex justify-center gap-2">
              <div className="w-3 h-3 bg-rose-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-75"></div>
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
          <p className="text-2xl text-rose-700 font-semibold max-w-3xl mx-auto leading-relaxed">
            Your premium flour store management solution with warmth and precision
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-3 space-y-10">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-rose-200 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
              <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 px-8 py-7 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30"></div>
                <h2 className="text-2xl font-bold text-white relative z-10 flex items-center gap-4">
                  <span className="text-4xl">🆕</span>
                  Add New Customer
                </h2>
                <p className="text-rose-100 mt-2 relative z-10">Create a new customer record</p>
              </div>
              <div className="p-8 bg-gradient-to-br from-white to-rose-50">
                <CustomerForm onSave={handleSaveRecord} />
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-orange-200 overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
              <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 px-8 py-7 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30"></div>
                <h2 className="text-2xl font-bold text-white relative z-10 flex items-center gap-4">
                  <span className="text-4xl">🔎</span>
                  Find Customer
                </h2>
                <p className="text-orange-100 mt-2 relative z-10">Search existing records</p>
              </div>
              <div className="p-8 bg-gradient-to-br from-white to-orange-50">
                <SearchCustomer 
                  onSearch={handleSearchCustomer} 
                  searchResults={searchResults} 
                  onUpdate={handleUpdateRecords}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-emerald-200 overflow-hidden transform hover:scale-[1.01] transition-all duration-300 h-fit">
              <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 px-8 py-7 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30"></div>
                <h2 className="text-2xl font-bold text-white relative z-10 flex items-center gap-4">
                  <span className="text-4xl">📋</span>
                  Records
                </h2>
                <p className="text-emerald-100 mt-2 relative z-10">All customer data</p>
              </div>
              <div className="p-8 bg-gradient-to-br from-white to-emerald-50">
                <CustomerRecords records={records} onUpdate={handleUpdateRecords} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-purple-200 overflow-hidden transform hover:scale-[1.005] transition-all duration-300">
          <div className="bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 px-8 py-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30"></div>
            <h2 className="text-2xl font-bold text-white relative z-10 flex items-center gap-4">
              <span className="text-4xl">💎</span>
              Financial Overview
            </h2>
            <p className="text-purple-100 mt-2 relative z-10">Revenue and transaction analytics</p>
          </div>
          <div className="p-8 bg-gradient-to-br from-white to-purple-50">
            <AmountSection records={records} totalRevenue={totalRevenue} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
