export interface RuntimeEnvironmentInfo {
  name: string;
  label: string;
  production: boolean;
}

export interface RuntimeAuthConfig {
  clientId: string;
  authority: string;
  redirectUri: string;
}

export interface PortalRuntimeConfig {
  environment: RuntimeEnvironmentInfo;
  federationManifestUrl: string;
  apiUrl: string;
  apiVersion: string;
  rootUrl: string;
  systemId: string;
  apiCore: string;
  apiNotificationUrl: string;
  systemExternalCode: string;
  auth: RuntimeAuthConfig;
}
