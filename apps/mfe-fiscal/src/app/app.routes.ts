import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  standalone: true,
  template: `<h3>MFE Fiscal</h3><p>Remote carregado via Native Federation.</p>`,
})
export class FiscalEntryComponent {}

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: FiscalEntryComponent,
  },
];

export const appRoutes = APP_ROUTES;
