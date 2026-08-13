import { Component, input, model } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PortalModule } from '@nxseed2/contracts';

@Component({
  selector: 'lib-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidenav d-flex flex-column" [class.sidenav-collapsed]="collapsed()">
      <div class="sidenav-header d-flex align-items-center justify-content-between">
        @if (!collapsed()) {
          <span class="sidenav-brand fw-semibold text-truncate">{{ brand() }}</span>
        }
        <button
          type="button"
          class="sidenav-toggle btn btn-sm"
          (click)="collapsed.set(!collapsed())"
          [attr.aria-expanded]="!collapsed()"
          [attr.aria-label]="collapsed() ? 'Expandir menu' : 'Retrair menu'"
        >
          <span class="sidenav-toggle-icon" [class.rotated]="collapsed()">&#8249;</span>
        </button>
      </div>

      <nav class="sidenav-nav flex-grow-1" aria-label="Módulos do portal">
        @for (module of modules(); track module.id) {
          <a
            class="sidenav-link d-flex align-items-center gap-2"
            [routerLink]="module.route"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: module.route === '/' }"
            [title]="module.label"
          >
            <span class="sidenav-link-icon">{{ initial(module.label) }}</span>
            @if (!collapsed()) {
              <span class="sidenav-link-label text-truncate">{{ module.label }}</span>
            }
          </a>
        }
      </nav>
    </aside>
  `,
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  readonly modules = input.required<PortalModule[]>();
  readonly brand = input('Portal');
  readonly collapsed = model(false);

  protected initial(label: string): string {
    return label.trim().charAt(0).toUpperCase();
  }
}
