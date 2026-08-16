import { useQuery, useMutation, UseQueryOptions } from '@tanstack/react-query';
import { ProductDetails, ReviewItem } from '@/mocks/handlers';

export async function fetchProductData(): Promise<ProductDetails> {
  const res = await fetch('/api/product');
  if (!res.ok) {
    throw new Error(`Failed to fetch RoH Sound product data: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchReviewsData(): Promise<ReviewItem[]> {
  const res = await fetch('/api/reviews');
  if (!res.ok) {
    throw new Error(`Failed to fetch RoH Sound reviews: ${res.statusText}`);
  }
  return res.json();
}

export interface PreorderPayload {
  colorway: string;
  quantity: number;
  engraving?: string;
  hasWarranty?: boolean;
  warranty?: boolean;
}

export interface PreorderResponse {
  success: boolean;
  reservationCode: string;
  message: string;
  details: {
    colorway: string;
    quantity: number;
    engraving: string;
    estimatedDelivery: string;
  };
}

export async function submitPreorder(payload: PreorderPayload): Promise<PreorderResponse> {
  const res = await fetch('/api/order/preorder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Failed to submit preorder: ${res.statusText}`);
  }
  return res.json();
}

export function useProductData(options?: Partial<UseQueryOptions<ProductDetails, Error>>) {
  return useQuery<ProductDetails, Error>({
    queryKey: ['product', 'details'],
    queryFn: fetchProductData,
    ...(options?.retry !== undefined ? { retry: options.retry } : {}),
    staleTime: 1000 * 60 * 5,
  });
}

export function useReviewsData(options?: Partial<UseQueryOptions<ReviewItem[], Error>>) {
  return useQuery<ReviewItem[], Error>({
    queryKey: ['product', 'reviews'],
    queryFn: fetchReviewsData,
    ...(options?.retry !== undefined ? { retry: options.retry } : {}),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePreorderMutation() {
  return useMutation<PreorderResponse, Error, PreorderPayload>({
    mutationFn: submitPreorder,
  });
}
