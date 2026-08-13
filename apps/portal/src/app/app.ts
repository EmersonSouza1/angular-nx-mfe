import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '@nxseed2/ui';
import { PortalModule } from '@nxseed2/contracts';
import { PORTAL_RUNTIME_CONFIG } from './core/runtime-config';

@Component({
  imports: [RouterOutlet, SidenavComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly runtimeConfig = inject(PORTAL_RUNTIME_CONFIG);
  protected readonly title = 'Portal Corporativo';
  protected readonly environmentLabel = this.runtimeConfig.environment.label;
  protected readonly sidebarCollapsed = signal(false);

  protected readonly modules: PortalModule[] = [
    { id: 'home', label: 'Início', route: '/' },
    { id: 'fiscal', label: 'Fiscal', route: '/fiscal' },
  ];
}
