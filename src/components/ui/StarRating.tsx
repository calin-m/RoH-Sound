import React from 'react';
import { Star } from 'lucide-react';

export interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-3.5 h-3.5',
  lg: 'w-4 h-4',
};

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  className = '',
}) => {
  return (
    <div
      className={`flex items-center gap-1 text-brass ${className}`}
      aria-label={`Rating: ${rating} out of ${maxRating} stars`}
      data-testid="star-rating"
    >
      {Array.from({ length: maxRating }).map((_, i) => {
        const isFilled = i < rating;
        return (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${isFilled ? 'fill-brass' : 'text-zinc-300'}`}
          />
        );
      })}
    </div>
  );
};
