export interface PortalModule {
  id: string;
  label: string;
  route: string;
  requiredPermission?: string;
}

export interface RuntimeEnvironment {
  production: boolean;
  apiBaseUrl: string;
}
