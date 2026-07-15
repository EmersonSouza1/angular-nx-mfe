import 'zone.js';
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { FiscalObligationsService } from './fiscal-obligations.service';

describe('FiscalObligationsService', () => {
  it('should list the demonstration obligations', async () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(FiscalObligationsService);

    const obligations = await firstValueFrom(service.list());

    expect(obligations.length).toBeGreaterThan(0);
    expect(obligations.every((item) => item.id && item.reference)).toBe(true);
  });
});
