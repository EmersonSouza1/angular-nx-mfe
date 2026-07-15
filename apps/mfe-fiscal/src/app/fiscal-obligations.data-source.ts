import { inject, Injectable, InjectionToken } from '@angular/core';
import { FiscalObligation } from '@nxseed2/contracts';
import { delay, Observable, of } from 'rxjs';

export interface FiscalObligationsDataSource {
  list(): Observable<readonly FiscalObligation[]>;
}

@Injectable({ providedIn: 'root' })
export class DemoFiscalObligationsDataSource
  implements FiscalObligationsDataSource
{
  list(): Observable<readonly FiscalObligation[]> {
    return of(DEMO_OBLIGATIONS).pipe(delay(250));
  }
}

export const FISCAL_OBLIGATIONS_DATA_SOURCE =
  new InjectionToken<FiscalObligationsDataSource>(
    'FISCAL_OBLIGATIONS_DATA_SOURCE',
    {
      providedIn: 'root',
      factory: () => inject(DemoFiscalObligationsDataSource),
    },
  );

const DEMO_OBLIGATIONS: readonly FiscalObligation[] = [
  {
    id: 'obl-001',
    reference: 'ICMS 06/2026',
    company: 'Empresa Matriz',
    dueDate: '2026-07-20',
    amount: 18450.75,
    status: 'OPEN',
  },
  {
    id: 'obl-002',
    reference: 'SPED Fiscal 06/2026',
    company: 'Empresa Matriz',
    dueDate: '2026-07-18',
    amount: 0,
    status: 'PROCESSING',
  },
  {
    id: 'obl-003',
    reference: 'ISS 06/2026',
    company: 'Filial Sul',
    dueDate: '2026-07-10',
    amount: 7240.2,
    status: 'OVERDUE',
  },
  {
    id: 'obl-004',
    reference: 'PIS/COFINS 06/2026',
    company: 'Empresa Matriz',
    dueDate: '2026-07-25',
    amount: 22180,
    status: 'OPEN',
  },
  {
    id: 'obl-005',
    reference: 'DCTFWeb 05/2026',
    company: 'Filial Norte',
    dueDate: '2026-06-20',
    amount: 9800.1,
    status: 'COMPLETED',
  },
];
