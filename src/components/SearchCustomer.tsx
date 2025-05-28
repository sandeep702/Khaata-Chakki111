
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CustomerRecord } from '../types/Customer';
import { Search } from 'lucide-react';

interface SearchCustomerProps {
  onSearch: (customerId: string) => void;
  selectedCustomer: CustomerRecord | null;
}

const SearchCustomer: React.FC<SearchCustomerProps> = ({ onSearch, selectedCustomer }) => {
  const [searchId, setSearchId] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      onSearch(searchId.trim());
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="searchId" className="sr-only">Customer ID</Label>
          <Input
            id="searchId"
            placeholder="Enter Customer ID to search..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
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

      {selectedCustomer && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-semibold text-amber-800">Customer:</span>
                <p>{selectedCustomer.customerName}</p>
              </div>
              <div>
                <span className="font-semibold text-amber-800">Owner:</span>
                <p>{selectedCustomer.ownerName}</p>
              </div>
              <div>
                <span className="font-semibold text-amber-800">Wheat Weight:</span>
                <p>{selectedCustomer.wheatWeight} kg</p>
              </div>
              <div>
                <span className="font-semibold text-amber-800">Flour Type:</span>
                <p>{selectedCustomer.flourType}</p>
              </div>
              <div>
                <span className="font-semibold text-amber-800">Rate:</span>
                <p>₹{selectedCustomer.ratePerKg}/kg</p>
              </div>
              <div>
                <span className="font-semibold text-amber-800">Total Price:</span>
                <p className="font-bold text-lg">₹{selectedCustomer.totalPrice.toFixed(2)}</p>
              </div>
              <div>
                <span className="font-semibold text-amber-800">Payment:</span>
                <div className="flex gap-2 mt-1">
                  <Badge variant={selectedCustomer.paymentMethod === 'Cash' ? 'default' : 'secondary'}>
                    {selectedCustomer.paymentMethod}
                  </Badge>
                  <Badge variant={selectedCustomer.paymentStatus === 'Paid' ? 'default' : 'destructive'}>
                    {selectedCustomer.paymentStatus}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="font-semibold text-amber-800">Status:</span>
                <Badge variant={selectedCustomer.isReady ? 'default' : 'secondary'} className="ml-2">
                  {selectedCustomer.isReady ? '✓ Ready' : '⏳ Processing'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchCustomer;
