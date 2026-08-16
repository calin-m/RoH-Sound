'use client';

import React from 'react';
import { useReviewsData } from '@/hooks/queries/useProductData';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { data: reviews, isLoading } = useReviewsData();

  return (
    <section id="reviews" className="py-24 px-4 sm:px-8 bg-white border-y border-black/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Step Index & Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs font-semibold tracking-widest text-[#b8934a]">
            06
          </span>
          <span className="h-3 w-px bg-black/10" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Verified Audiophile Feedback
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-950">
              Mastering Engineers & Critics
            </h2>
            <p className="mt-2 text-zinc-600 font-light text-sm sm:text-base">
              Read how acoustic engineers, audio journalists, and mastering studios evaluate RoH Sound.
            </p>
          </div>

          {/* Rating Summary Pill */}
          <div className="flex items-center gap-4 bg-[#fafaf9] px-5 py-3 rounded-2xl border border-black/[0.06] shadow-sm">
            <div className="flex items-center text-[#b8934a]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <div className="text-xs font-mono">
              <strong className="text-zinc-950 text-sm font-semibold">4.9</strong>
              <span className="text-zinc-400 ml-1">/ 5.0 (1,240+ Verified Reviews)</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-56 rounded-3xl bg-zinc-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews?.map((review) => (
              <div
                key={review.id}
                className="bg-[#fafaf9] rounded-3xl p-7 border border-black/[0.06] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-[#b8934a]">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-zinc-300" />
                  </div>

                  <p className="text-zinc-800 text-sm font-light leading-relaxed italic">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-zinc-950">{review.author}</div>
                    <div className="text-[11px] text-zinc-500 font-mono">{review.role}</div>
                  </div>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
