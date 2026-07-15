import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '@nxseed2/ui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, PageHeaderComponent],
  template: `
    <section class="bg-body rounded-4 border shadow-sm p-4 p-lg-5">
      <lib-page-header
        eyebrow="Visão geral"
        title="Central de módulos corporativos"
        description="Acesse os sistemas da empresa por uma experiência única e modular."
      />
      <a class="btn btn-primary" routerLink="/fiscal">Abrir módulo Fiscal</a>
    </section>
  `,
})
export class HomeComponent {}
