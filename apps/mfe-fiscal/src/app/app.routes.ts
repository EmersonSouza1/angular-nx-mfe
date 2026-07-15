import { Route } from '@angular/router';
import { FiscalDashboardComponent } from './fiscal-dashboard.component';
import { FiscalObligationsComponent } from './fiscal-obligations.component';

export const MFE_FISCAL_ROUTES: Route[] = [
  { path: '', component: FiscalDashboardComponent },
  { path: 'obrigacoes', component: FiscalObligationsComponent },
];

export const appRoutes: Route[] = MFE_FISCAL_ROUTES;
