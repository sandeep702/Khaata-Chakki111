
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ItemReadySectionProps {
  isReady: boolean;
  setIsReady: (value: boolean) => void;
}

const ItemReadySection: React.FC<ItemReadySectionProps> = ({
  isReady,
  setIsReady,
}) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 shadow-lg">
      <div className="flex items-center justify-center space-x-4 group">
        <Checkbox
          id="isReady"
          checked={isReady}
          onCheckedChange={(checked) => setIsReady(!!checked)}
          className="border-2 border-green-400 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 transition-all duration-200 hover:scale-110"
        />
        <Label 
          htmlFor="isReady" 
          className="text-lg font-semibold text-green-800 group-hover:text-green-900 transition-colors cursor-pointer flex items-center gap-3"
        >
          <span className="text-2xl">{isReady ? '✅' : '⏳'}</span>
          <span>Item is {isReady ? 'ready for pickup' : 'still processing'}</span>
        </Label>
      </div>
    </div>
  );
};

export default ItemReadySection;
