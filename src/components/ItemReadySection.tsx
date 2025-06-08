import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface ItemReadySectionProps {
  isReady: boolean | null;
  setIsReady: (value: boolean | null) => void;
  showValidationError: boolean;
}

const ItemReadySection: React.FC<ItemReadySectionProps> = ({
  isReady,
  setIsReady,
  showValidationError,
}) => {
  // Show error if validation fails
  React.useEffect(() => {
    if (showValidationError && isReady === null) {
      toast.error('Selection Required', {
        description: 'Please select either "Item is processing" or "Item is ready"',
        duration: 3000,
      });
    }
  }, [showValidationError, isReady]);

  const handleProcessingChange = (checked: boolean) => {
    if (checked) {
      setIsReady(false);
    } else {
      setIsReady(null);
    }
  };

  const handleReadyChange = (checked: boolean) => {
    if (checked) {
      setIsReady(true);
    } else {
      setIsReady(null);
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

        {/* Checkboxes */}
        <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-emerald-200 hover:bg-white/80 transition-all duration-300">
          {/* Processing Option */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="isProcessing"
              checked={isReady === false}
              onCheckedChange={handleProcessingChange}
              className="border-2 border-orange-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 transition-all duration-300 hover:scale-110 w-6 h-6 rounded-md shadow-md"
            />
            <Label htmlFor="isProcessing" className="text-lg font-semibold text-gray-700 cursor-pointer flex items-center gap-2">
              <span className="text-2xl">⏳</span>
              <span>Item is still processing</span>
            </Label>
          </div>

          {/* Ready Option */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="isReady"
              checked={isReady === true}
              onCheckedChange={handleReadyChange}
              className="border-2 border-emerald-600 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 transition-all duration-300 hover:scale-110 w-6 h-6 rounded-md shadow-md"
            />
            <Label htmlFor="isReady" className="text-lg font-semibold text-gray-700 cursor-pointer flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span>Item is ready for pickup</span>
            </Label>
          </div>
        </div>

        {/* Status Display */}
        <div className="flex justify-center">
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-center">
            <p className="text-sm text-emerald-700 font-medium">
              {isReady === true ? '✅ Ready for pickup' : 
               isReady === false ? '⏳ Still processing' : 
               '⚪ Status not selected'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemReadySection;
