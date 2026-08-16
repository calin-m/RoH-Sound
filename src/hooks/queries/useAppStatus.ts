import { useQuery } from '@tanstack/react-query';
import { type AppStatusResponse } from '@/mocks/handlers';

export async function fetchAppStatus(): Promise<AppStatusResponse> {
  const response = await fetch('/api/status');
  if (!response.ok) {
    throw new Error(`Failed to fetch app status: ${response.statusText}`);
  }
  return response.json();
}

export function useAppStatus(options?: { retry?: boolean | number }) {
  return useQuery({
    queryKey: ['app-status'],
    queryFn: fetchAppStatus,
    staleTime: 1000 * 30, // 30 seconds
    ...(options?.retry !== undefined ? { retry: options.retry } : {}),
  });
}
