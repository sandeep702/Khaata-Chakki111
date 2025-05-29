
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CustomerRecord } from '../types/Customer';
import { Search, Edit, AlertCircle } from 'lucide-react';
import EditCustomerDialog from './EditCustomerDialog';

interface SearchCustomerProps {
  onSearch: (searchTerm: string) => void;
  searchResults: CustomerRecord[];
  onUpdate: () => void;
}

const SearchCustomer: React.FC<SearchCustomerProps> = ({ onSearch, searchResults, onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');
  const [editingCustomer, setEditingCustomer] = useState<CustomerRecord | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const validateSearch = (term: string): boolean => {
    if (!term.trim()) {
      setSearchError('Please enter a customer name or ID to search');
      return false;
    }
    if (term.trim().length < 1) {
      setSearchError('Search term must be at least 1 character long');
      return false;
    }
    setSearchError('');
    return true;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSearch(searchTerm)) {
      onSearch(searchTerm.trim());
    }
  };

  const handleEdit = (customer: CustomerRecord) => {
    setEditingCustomer(customer);
    setIsEditDialogOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditDialogOpen(false);
    setEditingCustomer(null);
  };

  const handleUpdate = () => {
    onUpdate();
    handleCloseEdit();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <Label htmlFor="searchTerm" className="sr-only">Customer Name or ID</Label>
            <Input
              id="searchTerm"
              placeholder="Enter Customer Name or ID (exact match)..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (searchError) validateSearch(e.target.value);
              }}
              className={`border-2 transition-all duration-200 ${
                searchError 
                  ? 'border-red-300 focus:border-red-500 bg-red-50' 
                  : 'border-amber-200 focus:border-amber-500 hover:border-amber-400'
              }`}
            />
          </div>
          <Button
            type="submit"
            className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Search size={16} className="mr-2" />
            Search
          </Button>
        </div>
        
        {searchError && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200 animate-fade-in">
            <AlertCircle size={16} />
            {searchError}
          </div>
        )}
      </form>

      {searchResults.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-amber-800 text-lg flex items-center gap-2">
              <span className="text-xl">🔍</span>
              Search Results ({searchResults.length} found)
            </h3>
            <Badge variant="outline" className="text-amber-700 border-amber-300">
              {searchResults.length} {searchResults.length === 1 ? 'record' : 'records'}
            </Badge>
          </div>
          
          {searchResults.map((customer) => (
            <Card 
              key={`${customer.customerId}-${customer.createdAt}`} 
              className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-amber-300"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                      {customer.customerId}
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-900 text-lg">{customer.customerName}</h4>
                      <p className="text-amber-700 text-sm">Customer ID: {customer.customerId}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleEdit(customer)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <span className="font-semibold text-amber-800 block">Type:</span>
                    <Badge variant={customer.customerType === 'Regular' ? 'default' : 'secondary'} className="mt-1">
                      {customer.customerType === 'Regular' ? '👤' : '⏰'} {customer.customerType}
                    </Badge>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <span className="font-semibold text-amber-800 block">Weight:</span>
                    <p className="font-bold text-lg text-amber-900">{customer.wheatWeight} kg</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <span className="font-semibold text-amber-800 block">Flour:</span>
                    <p className="font-medium">{customer.flourType}</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <span className="font-semibold text-amber-800 block">Rate:</span>
                    <p className="font-bold text-amber-900">₹{customer.ratePerKg}/kg</p>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg shadow-sm border border-green-200">
                    <span className="font-semibold text-green-800 block">Total Price:</span>
                    <p className="font-bold text-xl text-green-700">₹{customer.totalPrice.toFixed(2)}</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <span className="font-semibold text-amber-800 block">Payment:</span>
                    <div className="flex gap-2 mt-1">
                      <Badge variant={customer.paymentMethod === 'Cash' ? 'default' : 'secondary'}>
                        {customer.paymentMethod === 'Cash' ? '💵' : '📋'} {customer.paymentMethod}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <span className="font-semibold text-amber-800 block">Status:</span>
                    <Badge variant={customer.paymentStatus === 'Paid' ? 'default' : 'destructive'} className="mt-1">
                      {customer.paymentStatus === 'Paid' ? '✅' : '⏳'} {customer.paymentStatus}
                    </Badge>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <span className="font-semibold text-amber-800 block">Ready:</span>
                    <Badge 
                      variant={customer.isReady ? 'default' : 'secondary'} 
                      className={`mt-1 ${customer.isReady ? 'bg-green-600' : 'bg-orange-500'}`}
                    >
                      {customer.isReady ? '✅ Ready' : '⏳ Processing'}
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-200">
                  <p className="text-xs text-amber-600">
                    Created: {new Date(customer.createdAt).toLocaleDateString()} at {new Date(customer.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {searchTerm && searchResults.length === 0 && !searchError && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 animate-fade-in">
          <div className="text-4xl mb-2">😕</div>
          <p className="text-gray-600 font-medium">No exact matches found for "{searchTerm}"</p>
          <p className="text-gray-500 text-sm mt-1">Try searching with the exact customer name or ID</p>
        </div>
      )}

      <EditCustomerDialog
        customer={editingCustomer}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEdit}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default SearchCustomer;
