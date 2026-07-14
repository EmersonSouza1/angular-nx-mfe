import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { HomeComponent } from './home.component';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'fiscal',
    loadChildren: () =>
      loadRemoteModule('mfe-fiscal', './routes').then(
        (module) => module.MFE_FISCAL_ROUTES,
      ),
  },
  { path: '**', redirectTo: '' },
];
