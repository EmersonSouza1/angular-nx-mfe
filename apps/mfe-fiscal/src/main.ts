import { initFederation } from '@angular-architects/native-federation';

initFederation()
  .then(() => import('./bootstrap'))
  .catch((err) => console.error('Falha ao iniciar o módulo fiscal', err));
