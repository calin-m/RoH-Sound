'use client';

import React from 'react';
import { useReviewsData } from '@/hooks/queries/useProductData';
import { SectionHeader } from './SectionHeader';
import { MotionReveal } from '../motion/MotionReveal';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { data: reviews, isLoading } = useReviewsData();

  return (
    <section id="reviews" className="py-24 px-4 sm:px-8 bg-white border-y border-black/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <MotionReveal direction="up">
          <SectionHeader
            step="06"
            eyebrow="Verified Audiophile Feedback"
            title="Acclaimed by Sound Engineers"
            subtitle="Discover what mastering engineers, audio critics, and music lovers experience with RoH Sound."
            className="mb-12"
          />
        </MotionReveal>

        {/* Reviews Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-zinc-100/60 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews?.map((review, index) => (
              <MotionReveal key={review.id} direction="up" delay={index * 100} className="flex">
                <div className="w-full bg-[#fafaf9] rounded-3xl p-7 border border-black/[0.06] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    {/* Rating Stars & Verified Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-[#b8934a]">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#b8934a]" />
                        ))}
                      </div>

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
              </MotionReveal>
            ))}
          </div>
        )}

        {/* Trust Badges Bar */}
        <MotionReveal direction="up" delay={200}>
          <div className="mt-14 p-6 bg-[#fafaf9] rounded-2xl border border-black/[0.06] flex flex-wrap items-center justify-around gap-6 text-xs text-zinc-600 font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>4.9 / 5.0 Global Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-zinc-800" />
              <span>3-Year Extended Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>30-Day Risk-Free Audition</span>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
};
