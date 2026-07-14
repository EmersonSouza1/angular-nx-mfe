import { Component } from '@angular/core';

@Component({
  selector: 'app-fiscal-dashboard',
  standalone: true,
  template: `
    <section>
      <p class="eyebrow">Microfrontend</p>
      <h1>Módulo Fiscal</h1>
      <p class="lead">Acompanhe as principais rotinas e pendências fiscais.</p>
      <div class="cards">
        @for (item of indicators; track item.label) {
          <article><span>{{ item.label }}</span><strong>{{ item.value }}</strong></article>
        }
      </div>
    </section>
  `,
  styles: [`
    .eyebrow { color: #047857; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; }
    h1 { margin: .5rem 0; color: #064e3b; font-size: 2.25rem; }
    .lead { color: #475569; }
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 1rem; margin-top: 2rem; }
    article { display: grid; gap: .75rem; padding: 1.25rem; border: 1px solid #d1fae5; border-radius: .75rem; background: #f0fdf4; }
    article span { color: #475569; } article strong { color: #065f46; font-size: 1.75rem; }
  `],
})
export class FiscalDashboardComponent {
  protected readonly indicators = [
    { label: 'Obrigações abertas', value: 12 },
    { label: 'Em processamento', value: 4 },
    { label: 'Concluídas no mês', value: 28 },
  ];
}
