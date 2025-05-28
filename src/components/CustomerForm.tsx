
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CustomerRecord, CustomerFormData } from '../types/Customer';
import { generateCustomerId } from '../utils/idGenerator';

interface CustomerFormProps {
  onSave: (record: CustomerRecord) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    customerId: '',
    customerName: '',
    ownerName: '',
    wheatWeight: '',
    flourType: 'Atta',
    ratePerKg: '',
    paymentMethod: 'Cash',
    isReady: false,
  });

  const [useAutoId, setUseAutoId] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (useAutoId) {
      setFormData(prev => ({ ...prev, customerId: generateCustomerId() }));
    }
  }, [useAutoId]);

  useEffect(() => {
    const weight = parseFloat(formData.wheatWeight) || 0;
    const rate = parseFloat(formData.ratePerKg) || 0;
    setTotalPrice(weight * rate);
  }, [formData.wheatWeight, formData.ratePerKg]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName.trim() || !formData.ownerName.trim() || 
        !formData.wheatWeight || !formData.ratePerKg) {
      alert('Please fill in all required fields');
      return;
    }

    const customerId = useAutoId ? generateCustomerId() : formData.customerId || generateCustomerId();

    const record: CustomerRecord = {
      customerId,
      customerName: formData.customerName.trim(),
      ownerName: formData.ownerName.trim(),
      wheatWeight: parseFloat(formData.wheatWeight),
      flourType: formData.flourType,
      ratePerKg: parseFloat(formData.ratePerKg),
      totalPrice,
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentMethod === 'Cash' ? 'Paid' : 'Pending',
      isReady: formData.isReady,
      createdAt: new Date().toISOString(),
    };

    onSave(record);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      customerId: useAutoId ? generateCustomerId() : '',
      customerName: '',
      ownerName: '',
      wheatWeight: '',
      flourType: 'Atta',
      ratePerKg: '',
      paymentMethod: 'Cash',
      isReady: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Customer ID Section */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="auto-id"
            checked={useAutoId}
            onCheckedChange={(checked) => setUseAutoId(!!checked)}
          />
          <Label htmlFor="auto-id" className="text-sm font-medium">
            Auto-generate Customer ID
          </Label>
        </div>
        
        <div>
          <Label htmlFor="customerId">Customer ID</Label>
          <Input
            id="customerId"
            value={formData.customerId}
            onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
            disabled={useAutoId}
            className="bg-gray-50"
          />
        </div>
      </div>

      {/* Customer Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="customerName">Customer Name *</Label>
          <Input
            id="customerName"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            required
            className="border-amber-200 focus:border-amber-400"
          />
        </div>
        
        <div>
          <Label htmlFor="ownerName">Owner Name *</Label>
          <Input
            id="ownerName"
            value={formData.ownerName}
            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
            required
            className="border-amber-200 focus:border-amber-400"
          />
        </div>
      </div>

      {/* Wheat and Flour Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="wheatWeight">Weight of Wheat (kg) *</Label>
          <Input
            id="wheatWeight"
            type="number"
            step="0.01"
            min="0"
            value={formData.wheatWeight}
            onChange={(e) => setFormData({ ...formData, wheatWeight: e.target.value })}
            required
            className="border-amber-200 focus:border-amber-400"
          />
        </div>
        
        <div>
          <Label htmlFor="flourType">Type of Flour</Label>
          <Select
            value={formData.flourType}
            onValueChange={(value: any) => setFormData({ ...formData, flourType: value })}
          >
            <SelectTrigger className="border-amber-200 focus:border-amber-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Atta">Atta</SelectItem>
              <SelectItem value="Maida">Maida</SelectItem>
              <SelectItem value="Besan">Besan</SelectItem>
              <SelectItem value="Multigrain">Multigrain</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="ratePerKg">Rate per Kg (₹) *</Label>
          <Input
            id="ratePerKg"
            type="number"
            step="0.01"
            min="0"
            value={formData.ratePerKg}
            onChange={(e) => setFormData({ ...formData, ratePerKg: e.target.value })}
            required
            className="border-amber-200 focus:border-amber-400"
          />
        </div>
      </div>

      {/* Total Price Display */}
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
        <Label className="text-lg font-semibold text-amber-800">
          Total Price: ₹{totalPrice.toFixed(2)}
        </Label>
      </div>

      {/* Payment Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Select
            value={formData.paymentMethod}
            onValueChange={(value: any) => setFormData({ ...formData, paymentMethod: value })}
          >
            <SelectTrigger className="border-amber-200 focus:border-amber-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cash">Cash</SelectItem>
              <SelectItem value="Borrow">Borrow</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center space-x-2 pt-6">
          <Checkbox
            id="isReady"
            checked={formData.isReady}
            onCheckedChange={(checked) => setFormData({ ...formData, isReady: !!checked })}
          />
          <Label htmlFor="isReady" className="text-sm font-medium">
            Item is ready for pickup
          </Label>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Save Customer Record
      </Button>
    </form>
  );
};

export default CustomerForm;
