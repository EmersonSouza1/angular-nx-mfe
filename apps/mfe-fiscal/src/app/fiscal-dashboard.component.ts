import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '@nxseed2/ui';

@Component({
  selector: 'app-fiscal-dashboard',
  standalone: true,
  imports: [PageHeaderComponent, RouterLink],
  template: `
    <section class="container-fluid px-0">
      <lib-page-header
        eyebrow="Microfrontend"
        title="Módulo Fiscal"
        description="Acompanhe as principais rotinas e pendências fiscais."
      >
        <a actions class="btn btn-primary" routerLink="obrigacoes">
          Consultar obrigações
        </a>
      </lib-page-header>
      <div class="row g-3">
        @for (item of indicators; track item.label) {
          <div class="col-12 col-md-4">
            <article class="card h-100 shadow-sm">
              <div class="card-body">
                <span class="text-body-secondary d-block mb-2">{{
                  item.label
                }}</span>
                <strong class="display-6 text-success">{{ item.value }}</strong>
              </div>
            </article>
          </div>
        }
      </div>
    </section>
  `,
})
export class FiscalDashboardComponent {
  protected readonly indicators = [
    { label: 'Obrigações abertas', value: 12 },
    { label: 'Em processamento', value: 4 },
    { label: 'Concluídas no mês', value: 28 },
  ];
}
