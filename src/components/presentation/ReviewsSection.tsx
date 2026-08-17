'use client';

import React from 'react';
import { useReviewsData } from '@/hooks/queries/useProductData';
import { SectionHeader } from './SectionHeader';
import { ReviewCard } from './ReviewCard';
import { TrustBadgeBar } from '../ui/TrustBadgeBar';
import { MotionReveal } from '../motion/MotionReveal';

export const ReviewsSection: React.FC = () => {
  const { data: reviews, isLoading } = useReviewsData();

  return (
    <section id="reviews" className="py-24 px-4 sm:px-8 bg-white border-y border-hairline">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <MotionReveal direction="up">
          <SectionHeader
            step="06"
            eyebrow="Reviews"
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
                <ReviewCard review={review} />
              </MotionReveal>
            ))}
          </div>
        )}

        {/* Trust Badges Bar */}
        <MotionReveal direction="up" delay={200}>
          <TrustBadgeBar className="mt-14" />
        </MotionReveal>
      </div>
    </section>
  );
};
