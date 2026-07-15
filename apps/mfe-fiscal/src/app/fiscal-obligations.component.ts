import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FiscalObligation, FiscalObligationStatus } from '@nxseed2/contracts';
import { EmptyStateComponent, PageHeaderComponent } from '@nxseed2/ui';
import { take } from 'rxjs';
import { FiscalObligationsService } from './fiscal-obligations.service';

@Component({
  selector: 'app-fiscal-obligations',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    EmptyStateComponent,
    FormsModule,
    PageHeaderComponent,
  ],
  template: `
    <section class="container-fluid px-0">
      <lib-page-header
        eyebrow="Fiscal"
        title="Obrigações fiscais"
        description="Consulte vencimentos, valores e o andamento das obrigações da empresa."
      >
        <span actions class="badge text-bg-warning">Dados demonstrativos</span>
      </lib-page-header>

      <div class="row g-3 mb-4">
        @for (indicator of indicators(); track indicator.label) {
          <div class="col-6 col-lg-3">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <span class="text-body-secondary">{{ indicator.label }}</span>
                <strong class="d-block fs-3" [class]="indicator.className">
                  {{ indicator.value }}
                </strong>
              </div>
            </div>
          </div>
        }
      </div>

      <div class="card shadow-sm">
        <div class="card-body border-bottom">
          <div class="row g-3">
            <div class="col-12 col-md-8">
              <label for="obligation-search" class="form-label">Buscar</label>
              <input
                id="obligation-search"
                class="form-control"
                type="search"
                placeholder="Referência ou empresa"
                [ngModel]="search()"
                (ngModelChange)="search.set($event)"
              />
            </div>
            <div class="col-12 col-md-4">
              <label for="obligation-status" class="form-label">Situação</label>
              <select
                id="obligation-status"
                class="form-select"
                [ngModel]="status()"
                (ngModelChange)="status.set($event)"
              >
                <option value="ALL">Todas</option>
                <option value="OPEN">Em aberto</option>
                <option value="PROCESSING">Em processamento</option>
                <option value="COMPLETED">Concluída</option>
                <option value="OVERDUE">Vencida</option>
              </select>
            </div>
          </div>
        </div>

        @if (loading()) {
          <div class="card-body text-center py-5" aria-live="polite">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="text-body-secondary mb-0 mt-3">
              Carregando obrigações...
            </p>
          </div>
        } @else if (error()) {
          <div class="alert alert-danger m-3" role="alert">
            {{ error() }}
            <button
              class="btn btn-sm btn-outline-danger ms-2"
              type="button"
              (click)="load()"
            >
              Tentar novamente
            </button>
          </div>
        } @else if (filteredObligations().length === 0) {
          <div class="card-body">
            <lib-empty-state
              title="Nenhuma obrigação encontrada"
              description="Revise os filtros utilizados e tente novamente."
            />
          </div>
        } @else {
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th scope="col">Referência</th>
                  <th scope="col">Empresa</th>
                  <th scope="col">Vencimento</th>
                  <th scope="col" class="text-end">Valor</th>
                  <th scope="col">Situação</th>
                </tr>
              </thead>
              <tbody>
                @for (
                  obligation of filteredObligations();
                  track obligation.id
                ) {
                  <tr>
                    <td class="fw-semibold">{{ obligation.reference }}</td>
                    <td>{{ obligation.company }}</td>
                    <td>{{ obligation.dueDate | date: 'dd/MM/yyyy' }}</td>
                    <td class="text-end">
                      {{
                        obligation.amount
                          | currency: 'BRL' : 'symbol' : '1.2-2' : 'pt-BR'
                      }}
                    </td>
                    <td>
                      <span
                        class="badge"
                        [class]="statusClass(obligation.status)"
                      >
                        {{ statusLabel(obligation.status) }}
                      </span>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </section>
  `,
})
export class FiscalObligationsComponent {
  private readonly service = inject(FiscalObligationsService);

  protected readonly obligations = signal<readonly FiscalObligation[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal('');
  protected readonly search = signal('');
  protected readonly status = signal<FiscalObligationStatus | 'ALL'>('ALL');

  protected readonly filteredObligations = computed(() => {
    const term = this.search().trim().toLocaleLowerCase('pt-BR');
    const status = this.status();

    return this.obligations().filter((obligation) => {
      const matchesTerm =
        term.length === 0 ||
        obligation.reference.toLocaleLowerCase('pt-BR').includes(term) ||
        obligation.company.toLocaleLowerCase('pt-BR').includes(term);
      const matchesStatus = status === 'ALL' || obligation.status === status;
      return matchesTerm && matchesStatus;
    });
  });

  protected readonly indicators = computed(() => [
    { label: 'Total', value: this.obligations().length, className: '' },
    {
      label: 'Em aberto',
      value: this.countByStatus('OPEN'),
      className: 'text-primary',
    },
    {
      label: 'Em processamento',
      value: this.countByStatus('PROCESSING'),
      className: 'text-info',
    },
    {
      label: 'Vencidas',
      value: this.countByStatus('OVERDUE'),
      className: 'text-danger',
    },
  ]);

  constructor() {
    this.load();
  }

  protected load(): void {
    this.loading.set(true);
    this.error.set('');

    this.service
      .list()
      .pipe(take(1))
      .subscribe({
        next: (obligations) => {
          this.obligations.set(obligations);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Não foi possível carregar as obrigações fiscais.');
          this.loading.set(false);
        },
      });
  }

  private countByStatus(status: FiscalObligationStatus): number {
    return this.obligations().filter((item) => item.status === status).length;
  }

  protected statusLabel(status: FiscalObligationStatus): string {
    return STATUS_PRESENTATION[status].label;
  }

  protected statusClass(status: FiscalObligationStatus): string {
    return STATUS_PRESENTATION[status].className;
  }
}

const STATUS_PRESENTATION: Record<
  FiscalObligationStatus,
  { label: string; className: string }
> = {
  OPEN: { label: 'Em aberto', className: 'text-bg-primary' },
  PROCESSING: { label: 'Em processamento', className: 'text-bg-info' },
  COMPLETED: { label: 'Concluída', className: 'text-bg-success' },
  OVERDUE: { label: 'Vencida', className: 'text-bg-danger' },
};
