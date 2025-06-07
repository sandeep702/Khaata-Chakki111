
import React from 'react';
import { Plus, Search, Database, TrendingUp } from 'lucide-react';
import CustomerForm from './CustomerForm';
import SearchCustomer from './SearchCustomer';
import CustomerRecords from './CustomerRecords';
import AmountSection from './AmountSection';
import { CustomerRecord } from '../types/Customer';

interface TabContentProps {
  activeTab: string;
  onSaveRecord: (record: Omit<CustomerRecord, 'customerId'>) => void;
  onSearchCustomer: (searchTerm: string) => void;
  searchResults: CustomerRecord[];
  onUpdateRecords: () => void;
  records: CustomerRecord[];
  totalRevenue: number;
}

const TabContent = ({
  activeTab,
  onSaveRecord,
  onSearchCustomer,
  searchResults,
  onUpdateRecords,
  records,
  totalRevenue
}: TabContentProps) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'new-customer':
        return (
          <div className="group relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/30 via-purple-500/30 to-fuchsia-500/30 rounded-4xl blur-2xl opacity-50 group-hover:opacity-75 transition-all duration-1000"></div>
            <div className="relative bg-black/10 backdrop-blur-2xl rounded-4xl shadow-2xl border border-white/10 overflow-hidden hover:shadow-[0_40px_80px_rgba(0,0,0,0.25)] transition-all duration-1000">
              <div className="bg-gradient-to-r from-violet-500 via-purple-600 to-fuchsia-700 px-10 py-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
                
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
                <CustomerForm onSave={onSaveRecord} />
              </div>
            </div>
          </div>
        );

      case 'search':
        return (
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
                  onSearch={onSearchCustomer} 
                  searchResults={searchResults} 
                  onUpdate={onUpdateRecords}
                />
              </div>
            </div>
          </div>
        );

      case 'records':
        return (
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
                <CustomerRecords records={records} onUpdate={onUpdateRecords} />
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
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
        );

      default:
        return null;
    }
  };

  return <div className="space-y-8">{renderTabContent()}</div>;
};

export default TabContent;
