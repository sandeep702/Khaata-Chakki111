
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface ItemReadySectionProps {
  isReady: boolean;
  setIsReady: (value: boolean) => void;
}

const ItemReadySection: React.FC<ItemReadySectionProps> = ({
  isReady,
  setIsReady,
}) => {
  const handleProcessingChange = (checked: boolean) => {
    if (checked && isReady) {
      toast.error('Cannot select both options!', {
        description: 'Please select either "Item is still processing" OR "Item is ready for pickup"',
        duration: 3000,
      });
      return;
    }
    if (checked) {
      setIsReady(false);
    }
  };

  const handleReadyChange = (checked: boolean) => {
    if (checked && !isReady) {
      toast.error('Cannot select both options!', {
        description: 'Please select either "Item is still processing" OR "Item is ready for pickup"',
        duration: 3000,
      });
      return;
    }
    if (checked) {
      setIsReady(true);
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 p-6 rounded-2xl border-2 border-emerald-200 shadow-lg backdrop-blur-sm relative overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
      
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">✓</span>
          </div>
          <h3 className="text-xl font-bold text-emerald-800">Order Status</h3>
        </div>

        {/* Both checkboxes in same row */}
        <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-emerald-200 hover:bg-white/80 transition-all duration-300">
          {/* Processing Option - Left Side */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="isProcessing"
              checked={!isReady}
              onCheckedChange={handleProcessingChange}
              className="border-2 border-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 transition-all duration-300 hover:scale-110 w-6 h-6 rounded-md shadow-md"
            />
            <Label 
              htmlFor="isProcessing" 
              className="text-lg font-semibold text-gray-700 cursor-pointer flex items-center gap-2"
            >
              <span className="text-2xl">⏳</span>
              <span>Item is still processing</span>
            </Label>
          </div>

          {/* Ready Option - Right Side */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="isReady"
              checked={isReady}
              onCheckedChange={handleReadyChange}
              className="border-2 border-emerald-600 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 transition-all duration-300 hover:scale-110 w-6 h-6 rounded-md shadow-md"
            />
            <Label 
              htmlFor="isReady" 
              className="text-lg font-semibold text-gray-700 cursor-pointer flex items-center gap-2"
            >
              <span className="text-2xl">✅</span>
              <span>Item is ready for pickup</span>
            </Label>
          </div>
        </div>

        {/* Status Display - Centered */}
        <div className="flex justify-center">
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-center">
            <p className="text-sm text-emerald-700 font-medium">
              Current Status: {isReady ? '✅ Ready for pickup' : !isReady && isReady !== undefined ? '⏳ Still processing' : '⚪ Please select status'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemReadySection;
