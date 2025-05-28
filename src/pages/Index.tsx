
import React, { useState, useEffect } from 'react';
import CustomerForm from '../components/CustomerForm';
import CustomerRecords from '../components/CustomerRecords';
import SearchCustomer from '../components/SearchCustomer';
import { CustomerRecord } from '../types/Customer';
import { saveCustomerRecord, getAllCustomerRecords, getCustomerById } from '../utils/storage';
import { toast } from 'sonner';

const Index = () => {
  const [records, setRecords] = useState<CustomerRecord[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    const allRecords = getAllCustomerRecords();
    setRecords(allRecords);
  };

  const handleSaveRecord = (record: CustomerRecord) => {
    try {
      saveCustomerRecord(record);
      loadRecords();
      toast.success('Customer record saved successfully!');
    } catch (error) {
      toast.error('Failed to save customer record');
    }
  };

  const handleSearchCustomer = (customerId: string) => {
    const customer = getCustomerById(customerId);
    if (customer) {
      setSelectedCustomer(customer);
      toast.success('Customer found!');
    } else {
      setSelectedCustomer(null);
      toast.error('Customer not found');
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
                <SearchCustomer onSearch={handleSearchCustomer} selectedCustomer={selectedCustomer} />
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
      </div>
    </div>
  );
};

export default Index;
