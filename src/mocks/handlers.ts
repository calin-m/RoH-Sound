import { http, HttpResponse, delay } from 'msw';

export interface AppStatusResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  version: string;
  environment: string;
  timestamp: string;
  uptimeSeconds: number;
  services: {
    database: 'connected' | 'disconnected';
    cache: 'operational' | 'degraded';
    gateway: 'operational' | 'degraded';
  };
}

export interface AppConfigResponse {
  features: {
    analytics: boolean;
    liveMonitoring: boolean;
    experimentalFeatures: boolean;
  };
  limits: {
    maxRequestsPerMinute: number;
    maxUploadSizeMb: number;
  };
}

export const mockStatusData: AppStatusResponse = {
  status: 'healthy',
  version: '1.0.0',
  environment: 'production',
  timestamp: new Date().toISOString(),
  uptimeSeconds: 86400,
  services: {
    database: 'connected',
    cache: 'operational',
    gateway: 'operational',
  },
};

export const mockConfigData: AppConfigResponse = {
  features: {
    analytics: true,
    liveMonitoring: true,
    experimentalFeatures: false,
  },
  limits: {
    maxRequestsPerMinute: 120,
    maxUploadSizeMb: 50,
  },
};

export const handlers = [
  http.get('/api/status', async () => {
    await delay(10);
    return HttpResponse.json(mockStatusData, { status: 200 });
  }),

  http.get('/api/app-config', async () => {
    await delay(10);
    return HttpResponse.json(mockConfigData, { status: 200 });
  }),
];
