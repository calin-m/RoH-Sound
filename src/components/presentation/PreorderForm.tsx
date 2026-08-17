import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

export interface PreorderFormProps {
  customerName: string;
  customerEmail: string;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  error?: string | null;
  totalPrice: number;
  className?: string;
}

export const PreorderForm: React.FC<PreorderFormProps> = ({
  customerName,
  customerEmail,
  onNameChange,
  onEmailChange,
  onSubmit,
  isPending,
  error,
  totalPrice,
  className = '',
}) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${className}`} data-testid="preorder-form">
      <div>
        <label htmlFor="customerName" className="block text-xs font-mono uppercase text-zinc-500 mb-1">
          Full Name
        </label>
        <input
          id="customerName"
          type="text"
          required
          placeholder="Jane Doe"
          value={customerName}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full bg-[#fafaf9] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950"
        />
      </div>

      <div>
        <label htmlFor="customerEmail" className="block text-xs font-mono uppercase text-zinc-500 mb-1">
          Email for Dispatch Notice
        </label>
        <input
          id="customerEmail"
          type="email"
          required
          placeholder="jane@studio.com"
          value={customerEmail}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full bg-[#fafaf9] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending || !customerEmail || !customerName}
        className="w-full bg-zinc-950 hover:bg-zinc-800 disabled:bg-zinc-400 text-white rounded-full py-4 text-xs font-semibold tracking-widest uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
      >
        {isPending ? (
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
  );
};
