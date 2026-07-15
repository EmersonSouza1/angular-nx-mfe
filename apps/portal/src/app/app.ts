import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PORTAL_RUNTIME_CONFIG } from './core/runtime-config';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly runtimeConfig = inject(PORTAL_RUNTIME_CONFIG);
  protected readonly title = 'Portal Corporativo';
  protected readonly environmentLabel = this.runtimeConfig.environment.label;
}
