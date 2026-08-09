import { initFederation } from '@angular-architects/native-federation';
import { loadPortalRuntimeConfig } from './app/core/runtime-config.loader';

loadPortalRuntimeConfig()
  .then((config) => initFederation(config.federationManifestUrl))
  .then(() => import('./bootstrap'))
  .catch((err) => console.error('Falha ao iniciar o portal', err));
