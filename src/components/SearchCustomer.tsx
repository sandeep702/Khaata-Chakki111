
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CustomerRecord } from '../types/Customer';
import { Search } from 'lucide-react';

interface SearchCustomerProps {
  onSearch: (customerName: string) => void;
  searchResults: CustomerRecord[];
}

const SearchCustomer: React.FC<SearchCustomerProps> = ({ onSearch, searchResults }) => {
  const [searchName, setSearchName] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchName.trim()) {
      onSearch(searchName.trim());
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="searchName" className="sr-only">Customer Name</Label>
          <Input
            id="searchName"
            placeholder="Enter Customer Name to search..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border-amber-200 focus:border-amber-400"
          />
        </div>
        <Button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white px-6"
        >
          <Search size={16} className="mr-2" />
          Search
        </Button>
      </form>

      {searchResults.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-amber-800">Search Results ({searchResults.length} found)</h3>
          {searchResults.map((customer) => (
            <Card key={customer.customerId} className="border-amber-200 bg-amber-50">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-semibold text-amber-800">ID:</span>
                    <p>{customer.customerId}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-800">Customer:</span>
                    <p>{customer.customerName}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-800">Type:</span>
                    <Badge variant={customer.customerType === 'Permanent' ? 'default' : 'secondary'}>
                      {customer.customerType}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-800">Wheat Weight:</span>
                    <p>{customer.wheatWeight} kg</p>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-800">Flour Type:</span>
                    <p>{customer.flourType}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-800">Rate:</span>
                    <p>₹{customer.ratePerKg}/kg</p>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-800">Total Price:</span>
                    <p className="font-bold text-lg">₹{customer.totalPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-800">Payment:</span>
                    <div className="flex gap-2 mt-1">
                      <Badge variant={customer.paymentMethod === 'Cash' ? 'default' : 'secondary'}>
                        {customer.paymentMethod}
                      </Badge>
                      <Badge variant={customer.paymentStatus === 'Paid' ? 'default' : 'destructive'}>
                        {customer.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-800">Status:</span>
                    <Badge variant={customer.isReady ? 'default' : 'secondary'} className="ml-2">
                      {customer.isReady ? '✓ Ready' : '⏳ Processing'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {searchName && searchResults.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          <p>No customers found with the name "{searchName}"</p>
        </div>
      )}
    </div>
  );
};

export default SearchCustomer;
