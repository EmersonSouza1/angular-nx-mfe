import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Portal Home',
    loadComponent: () => import('./home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'fiscal',
    loadChildren: () => loadRemoteModule('mfe-fiscal', './routes').then((m) => m.APP_ROUTES),
  },
];
