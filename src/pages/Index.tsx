
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
      toast.success(`Customer record saved with ID: ${savedRecord.customerId}`);
    } catch (error) {
      toast.error('Failed to save customer record');
    }
  };

  const handleSearchCustomer = (customerName: string) => {
    const customers = getCustomerByName(customerName);
    setSearchResults(customers);
    if (customers.length > 0) {
      toast.success(`Found ${customers.length} customer(s) matching "${customerName}"`);
    } else {
      toast.error('No customers found with that name');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">
            🌾 Wheat & Flour Store Manager
          </h1>
          <p className="text-lg text-amber-700">
            Manage your customer records with ease and precision
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Customer Form */}
            <div className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Add New Customer Record</h2>
              </div>
              <div className="p-6">
                <CustomerForm onSave={handleSaveRecord} />
              </div>
            </div>

            {/* Search Customer */}
            <div className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Search Customer</h2>
              </div>
              <div className="p-6">
                <SearchCustomer onSearch={handleSearchCustomer} searchResults={searchResults} />
              </div>
            </div>
          </div>

          {/* Right Column - Records Display */}
          <div className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Customer Records</h2>
            </div>
            <div className="p-6">
              <CustomerRecords records={records} />
            </div>
          </div>
        </div>

        {/* Amount Section */}
        <div className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Revenue & Transactions</h2>
          </div>
          <div className="p-6">
            <AmountSection records={records} totalRevenue={totalRevenue} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
