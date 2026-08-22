'use client';

import React, { useState } from 'react';
import { useReviewsData } from '@/hooks/queries/useProductData';
import { SectionHeader } from './SectionHeader';
import { ReviewCard } from './ReviewCard';
import { TrustBadgeBar } from '../ui/TrustBadgeBar';
import { MotionReveal } from '../motion/MotionReveal';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

const INITIAL_LIMIT = 3;

export const ReviewsSection: React.FC = () => {
  const { data: reviews, isLoading } = useReviewsData();
  const [selectedRating, setSelectedRating] = useState<'all' | 5 | 4>('all');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const allReviews = reviews || [];
  const filteredReviews = allReviews.filter((r) => {
    if (selectedRating === 'all') return true;
    return r.rating === selectedRating;
  });

  const displayedReviews = isExpanded ? filteredReviews : filteredReviews.slice(0, INITIAL_LIMIT);
  const hasMore = filteredReviews.length > INITIAL_LIMIT;

  const count5Star = allReviews.filter((r) => r.rating === 5).length;
  const count4Star = allReviews.filter((r) => r.rating === 4).length;

  return (
    <section id="reviews" className="section-anchor py-24 px-4 sm:px-8 bg-white border-y border-hairline" data-testid="reviews-section">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <MotionReveal direction="up">
          <SectionHeader
            step="06"
            eyebrow="Reviews"
            title="Acclaimed by Sound Engineers"
            subtitle="Discover what mastering engineers, audio critics, and music lovers experience with RoH Sound."
            className="mb-8"
          />
        </MotionReveal>

        {/* Rating Filter Pills */}
        {!isLoading && allReviews.length > 0 && (
          <MotionReveal direction="up" delay={100}>
            <div className="flex flex-wrap items-center gap-2 mb-8" data-testid="review-filters">
              <button
                type="button"
                onClick={() => {
                  setSelectedRating('all');
                  setIsExpanded(false);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                  selectedRating === 'all'
                    ? 'bg-zinc-950 text-white font-medium shadow-xs'
                    : 'bg-zinc-100/80 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-950'
                }`}
              >
                All Reviews ({allReviews.length})
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRating(5);
                  setIsExpanded(false);
                }}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                  selectedRating === 5
                    ? 'bg-zinc-950 text-white font-medium shadow-xs'
                    : 'bg-zinc-100/80 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-950'
                }`}
              >
                <Star className="w-3 h-3 fill-brass-light text-brass-light" />
                <span>5 Stars ({count5Star})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRating(4);
                  setIsExpanded(false);
                }}
                className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                  selectedRating === 4
                    ? 'bg-zinc-950 text-white font-medium shadow-xs'
                    : 'bg-zinc-100/80 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-950'
                }`}
              >
                <Star className="w-3 h-3 fill-zinc-400 text-zinc-400" />
                <span>4 Stars ({count4Star})</span>
              </button>
            </div>
          </MotionReveal>
        )}

        {/* Reviews Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-zinc-100/60 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="reviews-grid">
              {displayedReviews.map((review, index) => (
                <MotionReveal key={review.id} direction="up" delay={index * 80} className="flex">
                  <ReviewCard review={review} />
                </MotionReveal>
              ))}
            </div>

            {/* Progressive Disclosure (Show More / Show Less) Button */}
            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  aria-expanded={isExpanded}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-hairline bg-white hover:bg-zinc-50 hover:border-zinc-300 text-xs font-mono text-zinc-800 transition-all duration-200 shadow-2xs cursor-pointer active:scale-95"
                >
                  {isExpanded ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp className="w-3.5 h-3.5 text-zinc-500" />
                    </>
                  ) : (
                    <>
                      <span>Show All Reviews ({filteredReviews.length})</span>
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* Trust Badges Bar */}
        <MotionReveal direction="up" delay={200}>
          <TrustBadgeBar className="mt-14" />
        </MotionReveal>
      </div>
    </section>
  );
};
