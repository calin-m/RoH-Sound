'use client';

import React, { useState, useEffect } from 'react';
import { useProductStore } from '@/stores/useProductStore';
import { usePreorderMutation } from '@/hooks/queries/useProductData';
import { ColorwaySelector } from './ColorwaySelector';
import { LaserEngravingPreview } from './LaserEngravingPreview';
import { PreorderForm } from './PreorderForm';
import { OrderSuccessCard } from './OrderSuccessCard';
import { X, ShieldCheck, Truck } from 'lucide-react';

export const CheckoutDrawer: React.FC = () => {
  const {
    isDrawerOpen,
    setDrawerOpen,
    selectedColor,
    setSelectedColor,
    engravingText,
    setEngravingText,
    hasExtendedWarranty,
    setHasExtendedWarranty,
  } = useProductStore();

  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [orderSuccessData, setOrderSuccessData] = useState<{
    reservationCode: string;
    estimatedShipDate: string;
  } | null>(null);

  const preorderMutation = usePreorderMutation();

  const basePrice = 399;
  const warrantyPrice = hasExtendedWarranty ? 49 : 0;
  const totalPrice = basePrice + warrantyPrice;

  const handleClose = React.useCallback(() => {
    setDrawerOpen(false);
    setOrderSuccessData(null);
  }, [setDrawerOpen, setOrderSuccessData]);

  // Body scroll lock & Escape key listener
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isDrawerOpen, handleClose]);

  const handleSubmitPreorder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail || !customerName) return;

    try {
      const res = await preorderMutation.mutateAsync({
        customerName,
        customerEmail,
        colorway: selectedColor,
        quantity: 1,
        engravingText,
        includeWarranty: hasExtendedWarranty,
      });

      if (res.success || res.status === 'confirmed') {
        setOrderSuccessData({
          reservationCode: res.reservationCode,
          estimatedShipDate: res.estimatedShipDate || res.details?.estimatedDelivery || 'October 15, 2026',
        });
      }
    } catch {
      // Error handled by react-query state
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-all duration-400 ${
        isDrawerOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!isDrawerOpen}
      data-testid="checkout-drawer"
    >
      {/* Backdrop Blur & Dismissal */}
      <div
        onClick={handleClose}
        onTouchEnd={handleClose}
        data-testid="drawer-backdrop"
        className={`fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div
          data-testid="drawer-panel"
          className={`w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-black/[0.06] transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="p-6 border-b border-black/[0.06] flex items-center justify-between bg-[#fafaf9]">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                Priority Atelier Batch 01
              </span>
              <h2 className="text-xl font-light text-zinc-950">Pre-Order RoH Sound</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-zinc-200/50 text-zinc-400 hover:text-zinc-950 transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderSuccessData ? (
              <div className="space-y-6">
                <OrderSuccessCard
                  customerName={customerName}
                  reservationCode={orderSuccessData.reservationCode}
                  selectedColor={selectedColor}
                  engravingText={engravingText}
                  hasExtendedWarranty={hasExtendedWarranty}
                  estimatedShipDate={orderSuccessData.estimatedShipDate}
                />
                <button
                  onClick={handleClose}
                  className="w-full bg-zinc-950 text-white rounded-xl py-3 text-xs font-mono uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Return to Sound Stage
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* 1. Colorway Selection Sub-Component */}
                <div>
                  <label className="text-xs font-mono uppercase text-zinc-500 block mb-2">
                    Selected Atelier Finish
                  </label>
                  <ColorwaySelector
                    selectedColor={selectedColor}
                    onSelectColor={setSelectedColor}
                    variant="pill"
                  />
                </div>

                {/* 2. Custom Laser Engraving Sub-Component */}
                <LaserEngravingPreview
                  value={engravingText}
                  onChange={setEngravingText}
                  maxLength={20}
                />

                {/* 3. Extended Warranty Addon */}
                <div
                  onClick={() => setHasExtendedWarranty(!hasExtendedWarranty)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    hasExtendedWarranty
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                      : 'bg-[#fafaf9] border-black/[0.06] text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className={`w-5 h-5 ${hasExtendedWarranty ? 'text-[#b8934a]' : 'text-zinc-500'}`} />
                    <div>
                      <div className="text-xs font-semibold">5-Year Extended Warranty</div>
                      <div className={`text-[11px] font-light ${hasExtendedWarranty ? 'text-zinc-300' : 'text-zinc-500'}`}>
                        Accidental transducer drop & liquid coverage
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-semibold shrink-0">+$49</span>
                </div>

                {/* 4. Modular Preorder Form */}
                <PreorderForm
                  customerName={customerName}
                  customerEmail={customerEmail}
                  onNameChange={setCustomerName}
                  onEmailChange={setCustomerEmail}
                  onSubmit={handleSubmitPreorder}
                  isPending={preorderMutation.isPending}
                  error={preorderMutation.isError ? 'Unable to submit reservation. Please try again.' : null}
                  totalPrice={totalPrice}
                />
              </div>
            )}
          </div>

          {/* Footer Highlights */}
          <div className="p-6 bg-[#fafaf9] border-t border-black/[0.06] space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
              <Truck className="w-3.5 h-3.5 text-zinc-700" />
              <span>Complimentary worldwide express insured courier</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
              <span>30-day audition with 100% money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
