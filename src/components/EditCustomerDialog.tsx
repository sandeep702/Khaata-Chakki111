import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { CustomerRecord } from '../types/Customer';
import { updateCustomerRecord } from '../utils/database';
import { toast } from 'sonner';

interface EditCustomerDialogProps {
  customer: CustomerRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const EditCustomerDialog: React.FC<EditCustomerDialogProps> = ({
  customer,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [editData, setEditData] = useState<CustomerRecord | null>(customer);

  React.useEffect(() => {
    setEditData(customer);
  }, [customer]);

  if (!editData) return null;

  const handleSave = async () => {
    const updatedRecord = {
      ...editData,
      ratePerKg: 2,
      totalPrice: editData.wheatWeight * 2
    };
    
    const success = await updateCustomerRecord(editData.customerId, updatedRecord);
    if (success) {
      toast.success('Customer record updated successfully!');
      onUpdate();
      onClose();
    } else {
      toast.error('Failed to update customer record');
    }
  };

  const updatePaymentStatus = () => {
    if (editData.paymentMethod === 'Cash') {
      setEditData({ ...editData, paymentStatus: 'Paid' });
    } else {
      setEditData({ 
        ...editData, 
        paymentStatus: editData.paymentStatus === 'Paid' ? 'Pending' : 'Paid' 
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-amber-50/30">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-amber-900 flex items-center gap-2">
            <span className="text-2xl">✏️</span>
            Edit Customer Record #{editData.customerId}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="group">
            <Label htmlFor="customerName" className="text-amber-800 font-semibold mb-2 block">
              Customer Name *
            </Label>
            <Input
              id="customerName"
              value={editData.customerName}
              onChange={(e) => setEditData({ ...editData, customerName: e.target.value })}
              className="border-2 border-amber-200 focus:border-amber-500 transition-colors"
            />
          </div>

          <div className="group">
            <Label htmlFor="customerType" className="text-amber-800 font-semibold mb-2 block">
              Customer Type
            </Label>
            <Select
              value={editData.customerType}
              onValueChange={(value: 'Regular' | 'Temporary') => 
                setEditData({ ...editData, customerType: value })
              }
            >
              <SelectTrigger className="border-2 border-amber-200 focus:border-amber-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Regular">
                  <span className="flex items-center gap-2">
                    <span className="text-green-600">👤</span>
                    Regular
                  </span>
                </SelectItem>
                <SelectItem value="Temporary">
                  <span className="flex items-center gap-2">
                    <span className="text-blue-600">⏰</span>
                    Temporary
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="group">
            <Label htmlFor="wheatWeight" className="text-amber-800 font-semibold mb-2 block">
              Wheat Weight (kg) *
            </Label>
            <Input
              id="wheatWeight"
              type="number"
              value={editData.wheatWeight}
              onChange={(e) => setEditData({ ...editData, wheatWeight: parseFloat(e.target.value) || 0 })}
              className="border-2 border-amber-200 focus:border-amber-500 transition-colors"
            />
          </div>

          <div className="group">
            <Label htmlFor="flourType" className="text-amber-800 font-semibold mb-2 block">
              Flour Type
            </Label>
            <Select
              value={editData.flourType}
              onValueChange={(value: any) => setEditData({ ...editData, flourType: value })}
            >
              <SelectTrigger className="border-2 border-amber-200 focus:border-amber-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Atta">🌾 Atta</SelectItem>
                <SelectItem value="Besan">🟡 Besan</SelectItem>
                <SelectItem value="Multigrain">🌿 Multigrain</SelectItem>
                <SelectItem value="Other">🔄 Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="group">
            <Label className="text-amber-800 font-semibold mb-2 block">
              Rate per Kg (₹)
            </Label>
            <div className="text-2xl font-bold text-green-600 bg-green-50 p-3 rounded-lg border-2 border-green-200">
              ₹2.00 (Fixed)
            </div>
          </div>

          <div className="group">
            <Label className="text-amber-800 font-semibold mb-2 block">
              Total Price
            </Label>
            <div className="text-2xl font-bold text-green-600 bg-green-50 p-3 rounded-lg border-2 border-green-200">
              ₹{(editData.wheatWeight * 2).toFixed(2)}
            </div>
          </div>

          <div className="group">
            <Label htmlFor="paymentMethod" className="text-amber-800 font-semibold mb-2 block">
              Payment Method
            </Label>
            <Select
              value={editData.paymentMethod}
              onValueChange={(value: 'Cash' | 'Borrow') => {
                const newPaymentStatus = value === 'Cash' ? 'Paid' : 'Pending';
                setEditData({ 
                  ...editData, 
                  paymentMethod: value,
                  paymentStatus: newPaymentStatus
                });
              }}
            >
              <SelectTrigger className="border-2 border-amber-200 focus:border-amber-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cash">
                  <span className="flex items-center gap-2">
                    <span className="text-green-600">💵</span>
                    Cash
                  </span>
                </SelectItem>
                <SelectItem value="Borrow">
                  <span className="flex items-center gap-2">
                    <span className="text-orange-600">📋</span>
                    Borrow
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="group">
            <Label className="text-amber-800 font-semibold mb-2 block">
              Payment Status
            </Label>
            <Button
              type="button"
              onClick={updatePaymentStatus}
              variant={editData.paymentStatus === 'Paid' ? 'default' : 'destructive'}
              className="w-full transition-all duration-300 hover:scale-105"
            >
              {editData.paymentStatus === 'Paid' ? '✅ Paid' : '⏳ Pending'}
              {editData.paymentMethod === 'Borrow' && ' (Click to toggle)'}
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-3 py-4 group">
          <Checkbox
            id="isReady"
            checked={editData.isReady}
            onCheckedChange={(checked) => setEditData({ ...editData, isReady: !!checked })}
            className="border-2 border-amber-300 data-[state=checked]:bg-amber-600 transition-all duration-200"
          />
          <Label 
            htmlFor="isReady" 
            className="text-sm font-medium text-amber-800 group-hover:text-amber-900 transition-colors cursor-pointer flex items-center gap-2"
          >
            <span className="text-lg">{editData.isReady ? '✅' : '⏳'}</span>
            Item is {editData.isReady ? 'ready for pickup' : 'still processing'}
          </Label>
        </div>

        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-2 border-gray-300 hover:border-gray-400 transition-colors"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <span>💾</span>
              Save Changes
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCustomerDialog;
