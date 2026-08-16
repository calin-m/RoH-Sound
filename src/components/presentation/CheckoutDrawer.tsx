'use client';

import React, { useState } from 'react';
import { useProductStore, Colorway } from '@/stores/useProductStore';
import { usePreorderMutation } from '@/hooks/queries/useProductData';
import { X, Sparkles, ShieldCheck, Check, ArrowRight, Loader2 } from 'lucide-react';

const colorwaysList: { id: Colorway; label: string; hex: string }[] = [
  { id: 'midnight', label: 'Obsidian Midnight', hex: '#18181b' },
  { id: 'silver', label: 'Alabaster Silver', hex: '#e4e4e7' },
  { id: 'titanium', label: 'Champagne Titanium', hex: '#d8c7a6' },
  { id: 'emerald', label: 'Forest Emerald', hex: '#14382e' },
];

export const CheckoutDrawer: React.FC = () => {
  const {
    isDrawerOpen,
    setDrawerOpen,
    selectedColor,
    setSelectedColor,
    quantity,
    setQuantity,
    engravingText,
    setEngravingText,
    hasExtendedWarranty,
    setHasExtendedWarranty,
  } = useProductStore();

  const preorderMutation = usePreorderMutation();
  const [confirmedReservation, setConfirmedReservation] = useState<string | null>(null);

  if (!isDrawerOpen) return null;

  const basePrice = 399;
  const warrantyPrice = hasExtendedWarranty ? 49 : 0;
  const unitTotal = basePrice + warrantyPrice;
  const orderTotal = unitTotal * quantity;

  const handlePreorderSubmit = async () => {
    try {
      const result = await preorderMutation.mutateAsync({
        colorway: selectedColor,
        quantity,
        engraving: engravingText || 'Standard Edition',
        warranty: hasExtendedWarranty,
      });
      setConfirmedReservation(result.reservationCode);
    } catch {
      // Handled by UI
    }
  };

  const handleClose = () => {
    setConfirmedReservation(null);
    setDrawerOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-black/[0.08] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-zinc-950 flex items-center justify-center text-white font-mono text-xs font-bold">
                  R
                </div>
                <span className="font-semibold text-zinc-950 text-sm tracking-wide">
                  Your RoH Sound Pre-Order
                </span>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Confirmation View */}
            {confirmedReservation ? (
              <div className="mt-8 text-center py-6 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-light text-zinc-950">Reservation Confirmed</h3>
                <p className="text-xs text-zinc-500 font-mono mt-1">
                  Your position in the priority production run is locked.
                </p>

                <div className="my-6 p-4 bg-[#fafaf9] rounded-2xl border border-black/[0.06]">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase block">Reservation Code:</span>
                  <strong className="text-xl font-mono tracking-widest text-zinc-950 block mt-1">
                    {confirmedReservation}
                  </strong>
                </div>

                <div className="text-xs text-zinc-500 font-light leading-relaxed">
                  We will send tracking credentials and dispatch details prior to shipment.
                </div>

                <button
                  onClick={handleClose}
                  className="mt-8 w-full bg-zinc-950 hover:bg-zinc-800 text-white rounded-full py-3.5 text-xs font-medium uppercase tracking-widest transition-all"
                >
                  Return to Overview
                </button>
              </div>
            ) : (
              /* Customizer Drawer Form */
              <div className="mt-6 flex flex-col gap-6">
                {/* Product Summary Card */}
                <div className="flex items-center justify-between p-4 bg-[#fafaf9] rounded-2xl border border-black/[0.06]">
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-950">RoH Sound Flagship</h4>
                    <span className="text-xs font-mono text-zinc-500 capitalize">
                      {selectedColor} Finish • 45mm Titanium-Graphene
                    </span>
                  </div>
                  <div className="font-mono text-sm font-bold text-zinc-950">${basePrice}</div>
                </div>

                {/* Colorway Selection */}
                <div>
                  <label className="text-xs font-mono uppercase text-zinc-500 block mb-2">
                    Select Finish
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {colorwaysList.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedColor(c.id)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                          selectedColor === c.id
                            ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                            : 'bg-white text-zinc-700 border-black/[0.06] hover:bg-zinc-50'
                        }`}
                        aria-label={`Switch to ${c.label}`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="truncate">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Laser Engraving Customizer */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono uppercase text-zinc-500">
                      Laser Engraving (Complimentary)
                    </label>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {engravingText.length}/20 chars
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={20}
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    placeholder="e.g. MASTERING LAB 01"
                    className="w-full bg-[#fafaf9] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-xs font-mono uppercase text-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                  />
                  {engravingText && (
                    <div className="mt-2 p-2 bg-white rounded-lg border border-black/[0.06] text-center">
                      <span className="text-[10px] font-mono text-zinc-400 block">Preview on Gimbal:</span>
                      <span className="text-xs font-mono font-bold tracking-widest text-[#b8934a]">
                        &ldquo;{engravingText.toUpperCase()}&rdquo;
                      </span>
                    </div>
                  )}
                </div>

                {/* Extended Warranty Add-on */}
                <div
                  onClick={() => setHasExtendedWarranty(!hasExtendedWarranty)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    hasExtendedWarranty
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-sm'
                      : 'bg-[#fafaf9] text-zinc-800 border-black/[0.06] hover:bg-zinc-100'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck
                        className={`w-4 h-4 ${
                          hasExtendedWarranty ? 'text-[#d4af37]' : 'text-zinc-600'
                        }`}
                      />
                      <span className="text-xs font-semibold">3-Year RoH Platinum Care</span>
                    </div>
                    <span className="text-xs font-mono font-bold">+$49</span>
                  </div>
                  <p
                    className={`text-[11px] font-light mt-1.5 ${
                      hasExtendedWarranty ? 'text-zinc-300' : 'text-zinc-500'
                    }`}
                  >
                    Zero-deductible coverage for accidental drops, liquid spills, and battery renewal.
                  </p>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono uppercase text-zinc-500">Quantity</span>
                  <div className="flex items-center gap-3 bg-[#fafaf9] border border-black/[0.08] rounded-full px-3 py-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-sm font-bold text-zinc-600 hover:text-zinc-950 px-1"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono font-bold text-zinc-950">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-sm font-bold text-zinc-600 hover:text-zinc-950 px-1"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Actions */}
          {!confirmedReservation && (
            <div className="pt-6 border-t border-black/[0.06] mt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-zinc-500">Estimated Total</span>
                <span className="text-2xl font-mono font-light text-zinc-950">
                  ${orderTotal}
                </span>
              </div>

              <button
                onClick={handlePreorderSubmit}
                disabled={preorderMutation.isPending}
                className="w-full flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 disabled:opacity-50 text-white rounded-full py-4 text-xs font-semibold uppercase tracking-widest transition-all shadow-md hover:shadow-xl active:scale-98"
              >
                {preorderMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                    <span>Reserving Batch...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <span>Confirm Priority Pre-Order</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </button>

              <div className="mt-3 text-center text-[10px] font-mono text-zinc-400">
                No immediate charge • 30-Day Money-Back Guarantee
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
