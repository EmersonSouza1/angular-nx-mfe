import { inject, Injectable } from '@angular/core';
import { FiscalObligation } from '@nxseed2/contracts';
import { Observable } from 'rxjs';
import { FISCAL_OBLIGATIONS_DATA_SOURCE } from './fiscal-obligations.data-source';

@Injectable({ providedIn: 'root' })
export class FiscalObligationsService {
  private readonly dataSource = inject(FISCAL_OBLIGATIONS_DATA_SOURCE);

  list(): Observable<readonly FiscalObligation[]> {
    return this.dataSource.list();
  }
}
