import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-empty-state',
  standalone: true,
  template: `<section><h2>{{ title() }}</h2><p>{{ description() }}</p></section>`,
  styles: [`section { padding: 2rem; text-align: center; border: 1px dashed #94a3b8; border-radius: .75rem; }`],
})
export class EmptyStateComponent {
  readonly title = input.required<string>();
  readonly description = input('Nenhuma informação disponível.');
}
