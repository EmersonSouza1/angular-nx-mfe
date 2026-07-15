import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-page-header',
  standalone: true,
  template: `
    <header class="d-flex flex-column flex-md-row align-items-md-start justify-content-between gap-3 mb-4">
      <div>
        @if (eyebrow()) {
          <p class="text-primary fw-semibold text-uppercase small mb-1">{{ eyebrow() }}</p>
        }
        <h1 class="h2 fw-bold mb-2">{{ title() }}</h1>
        @if (description()) {
          <p class="text-body-secondary mb-0">{{ description() }}</p>
        }
      </div>
      <div class="d-flex gap-2"><ng-content /></div>
    </header>
  `,
})
export class PageHeaderComponent {
  readonly title = input.required<string>();
  readonly description = input('');
  readonly eyebrow = input('');
}
