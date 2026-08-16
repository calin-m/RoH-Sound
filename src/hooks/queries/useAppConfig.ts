import { useQuery } from '@tanstack/react-query';
import { type AppConfigResponse } from '@/mocks/handlers';

export async function fetchAppConfig(): Promise<AppConfigResponse> {
  const response = await fetch('/api/app-config');
  if (!response.ok) {
    throw new Error(`Failed to fetch app config: ${response.statusText}`);
  }
  return response.json();
}

export function useAppConfig(options?: { retry?: boolean | number }) {
  return useQuery({
    queryKey: ['app-config'],
    queryFn: fetchAppConfig,
    staleTime: 1000 * 60, // 60 seconds
    ...(options?.retry !== undefined ? { retry: options.retry } : {}),
  });
}
