import React from 'react';
import { ReviewItem } from '@/mocks/handlers';
import { StarRating } from '../ui/StarRating';
import { ShieldCheck } from 'lucide-react';

export interface ReviewCardProps {
  review: ReviewItem;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, className = '' }) => {
  return (
    <div
      className={`w-full bg-[#fafaf9] rounded-3xl p-7 border border-black/[0.06] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow ${className}`}
      data-testid={`review-card-${review.id}`}
    >
      <div>
        {/* Rating Stars & Verified Tag */}
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={review.rating} />

          {review.verified && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-500 bg-white px-2 py-0.5 rounded-full border border-black/[0.06]">
              <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
            </span>
          )}
        </div>

        <p className="text-zinc-700 text-sm font-light leading-relaxed italic">
          &ldquo;{review.comment}&rdquo;
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between">
        <div>
          <span className="block text-xs font-semibold text-zinc-950">{review.author}</span>
          <span className="text-[11px] text-zinc-400 font-light">{review.role}</span>
        </div>
        <span className="text-[10px] font-mono text-zinc-400">{review.date}</span>
      </div>
    </div>
  );
};
