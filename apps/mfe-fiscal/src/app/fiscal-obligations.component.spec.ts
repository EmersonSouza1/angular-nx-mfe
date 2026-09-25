import 'zone.js';
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { FiscalObligation } from '@nxseed2/contracts';
import { of } from 'rxjs';
import { FiscalObligationsComponent } from './fiscal-obligations.component';
import { FISCAL_OBLIGATIONS_DATA_SOURCE } from './fiscal-obligations.data-source';

const OBLIGATIONS: readonly FiscalObligation[] = [
  {
    id: 'obl-test',
    reference: 'ICMS 06/2026',
    company: 'Empresa Teste',
    dueDate: '2026-07-20',
    amount: 18450.75,
    status: 'OPEN',
  },
];

describe('FiscalObligationsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiscalObligationsComponent],
      providers: [
        {
          provide: FISCAL_OBLIGATIONS_DATA_SOURCE,
          useValue: { list: () => of(OBLIGATIONS) },
        },
      ],
    }).compileComponents();
  });

  it('should render obligations with pt-BR currency formatting', async () => {
    const fixture = TestBed.createComponent(FiscalObligationsComponent);
    fixture.detectChanges();
    await fixture.whenStable();

    const row = (fixture.nativeElement as HTMLElement).querySelector(
      'tbody tr',
    );
    expect(row?.textContent).toContain('ICMS 06/2026');
    expect(row?.textContent).toContain('20/07/2026');
    expect(row?.textContent).toMatch(/R\$\s18\.450,75/);
  });
});
