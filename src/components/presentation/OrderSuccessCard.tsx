import React from 'react';
import { Colorway } from '@/stores/useProductStore';
import { Check } from 'lucide-react';

export interface OrderSuccessCardProps {
  customerName: string;
  reservationCode: string;
  selectedColor: Colorway;
  engravingText?: string;
  hasExtendedWarranty: boolean;
  estimatedShipDate: string;
  className?: string;
}

export const OrderSuccessCard: React.FC<OrderSuccessCardProps> = ({
  customerName,
  reservationCode,
  selectedColor,
  engravingText,
  hasExtendedWarranty,
  estimatedShipDate,
  className = '',
}) => {
  return (
    <div className={`py-8 text-center space-y-4 ${className}`} data-testid="order-success-card">
      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
        <Check className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-light text-zinc-950">
        Priority Reservation Confirmed
      </h3>
      <p className="text-zinc-600 text-xs font-light max-w-xs mx-auto">
        Thank you, <strong className="text-zinc-900">{customerName}</strong>. Your custom RoH Sound set is scheduled for precision calibration.
      </p>

      <div className="p-4 bg-canvas rounded-2xl border border-hairline text-left space-y-2 font-mono text-xs">
        <div className="flex justify-between">
          <span className="text-zinc-500">Reservation Code:</span>
          <span className="font-bold text-zinc-950">{reservationCode}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Finish:</span>
          <span className="capitalize text-zinc-950">{selectedColor}</span>
        </div>
        {engravingText && (
          <div className="flex justify-between">
            <span className="text-zinc-500">Engraving:</span>
            <span className="text-brass font-bold">&ldquo;{engravingText}&rdquo;</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-zinc-500">Atelier Warranty:</span>
          <span className="text-zinc-950">
            {hasExtendedWarranty ? '5 Years Extended' : '1 Year Standard'}
          </span>
        </div>
        <div className="flex justify-between pt-2 border-t border-hairline">
          <span className="text-zinc-500">Estimated Dispatch:</span>
          <span className="text-emerald-600 font-semibold">{estimatedShipDate}</span>
        </div>
      </div>
    </div>
  );
};
