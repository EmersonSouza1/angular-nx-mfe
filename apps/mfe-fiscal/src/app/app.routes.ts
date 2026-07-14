import { Route } from '@angular/router';
import { FiscalDashboardComponent } from './fiscal-dashboard.component';

export const MFE_FISCAL_ROUTES: Route[] = [
  { path: '', component: FiscalDashboardComponent },
];

export const appRoutes: Route[] = MFE_FISCAL_ROUTES;
