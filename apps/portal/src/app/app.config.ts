import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  getPortalRuntimeConfig,
  PORTAL_RUNTIME_CONFIG,
} from './core/runtime-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    {
      provide: PORTAL_RUNTIME_CONFIG,
      useFactory: getPortalRuntimeConfig,
    },
  ],
};
