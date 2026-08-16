'use client';

import React, { useState } from 'react';
import { useProductStore } from '@/stores/useProductStore';
import { usePreorderMutation } from '@/hooks/queries/useProductData';
import { ColorwaySelector } from './ColorwaySelector';
import { LaserEngravingPreview } from './LaserEngravingPreview';
import { X, ShieldCheck, Truck, Check, Loader2, Sparkles } from 'lucide-react';

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

  const handleClose = () => {
    setDrawerOpen(false);
    setOrderSuccessData(null);
  };

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" data-testid="checkout-drawer">
      {/* Backdrop Blur */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-black/[0.06] transform transition-transform duration-300 ease-in-out">
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
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-light text-zinc-950">
                  Priority Reservation Confirmed
                </h3>
                <p className="text-zinc-600 text-xs font-light max-w-xs mx-auto">
                  Thank you, <strong className="text-zinc-900">{customerName}</strong>. Your custom RoH Sound set is scheduled for precision calibration.
                </p>

                <div className="p-4 bg-[#fafaf9] rounded-2xl border border-black/[0.06] text-left space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Reservation Code:</span>
                    <span className="font-bold text-zinc-950">{orderSuccessData.reservationCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Finish:</span>
                    <span className="capitalize text-zinc-950">{selectedColor}</span>
                  </div>
                  {engravingText && (
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Engraving:</span>
                      <span className="text-[#b8934a] font-bold">&ldquo;{engravingText}&rdquo;</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Est. Dispatch:</span>
                    <span className="text-zinc-950">{orderSuccessData.estimatedShipDate}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-black/[0.06]">
                    <span className="text-zinc-500">Total Billed:</span>
                    <span className="font-bold text-zinc-950">${totalPrice}</span>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full bg-zinc-950 text-white rounded-xl py-3 text-xs font-mono uppercase tracking-wider hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Return to Sound Stage
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitPreorder} className="space-y-6">
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
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                      : 'bg-[#fafaf9] border-black/[0.06] text-zinc-700 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className={`w-5 h-5 ${hasExtendedWarranty ? 'text-[#b8934a]' : 'text-zinc-500'}`} />
                    <div>
                      <div className="text-xs font-semibold">5-Year Extended Audiophile Care</div>
                      <div className={`text-[11px] font-light ${hasExtendedWarranty ? 'text-zinc-300' : 'text-zinc-500'}`}>
                        Accidental transducer drop & liquid coverage
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-semibold shrink-0">+$49</span>
                </div>

                {/* 4. Customer Contact Details */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-mono uppercase text-zinc-500 block mb-1">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full bg-[#fafaf9] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase text-zinc-500 block mb-1">
                      Email for Dispatch Notice
                    </label>
                    <input
                      required
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="jane@studio.com"
                      className="w-full bg-[#fafaf9] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                    />
                  </div>
                </div>

                {/* Error Banner if any */}
                {preorderMutation.isError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                    Unable to submit reservation. Please check your connection and try again.
                  </div>
                )}

                {/* Submit Pre-order Button */}
                <button
                  type="submit"
                  disabled={preorderMutation.isPending}
                  className="w-full bg-zinc-950 hover:bg-zinc-800 disabled:bg-zinc-400 text-white rounded-full py-4 text-xs font-semibold tracking-widest uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {preorderMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                      <span>Reserving Serial Number...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#d4af37]" />
                      <span>Reserve for ${totalPrice}</span>
                    </>
                  )}
                </button>
              </form>
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
