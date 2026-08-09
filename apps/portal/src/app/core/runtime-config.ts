import { InjectionToken } from '@angular/core';
import { PortalRuntimeConfig } from '@nxseed2/contracts';

export const PORTAL_RUNTIME_CONFIG = new InjectionToken<PortalRuntimeConfig>(
  'PORTAL_RUNTIME_CONFIG',
);

export { getPortalRuntimeConfig, loadPortalRuntimeConfig } from './runtime-config.loader';
