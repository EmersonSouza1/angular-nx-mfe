import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-empty-state',
  standalone: true,
  template: `
    <section class="bg-body-tertiary border border-2 border-dashed rounded-3 p-5 text-center">
      <h2 class="h5 mb-2">{{ title() }}</h2>
      <p class="text-body-secondary mb-0">{{ description() }}</p>
    </section>
  `,
})
export class EmptyStateComponent {
  readonly title = input.required<string>();
  readonly description = input('Nenhuma informação disponível.');
}
