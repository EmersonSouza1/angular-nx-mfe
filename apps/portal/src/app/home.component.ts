import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <p class="eyebrow">Visão geral</p>
      <h1>Central de módulos corporativos</h1>
      <p>Acesse os sistemas da empresa por uma experiência única e modular.</p>
      <a routerLink="/fiscal">Abrir módulo Fiscal</a>
    </section>
  `,
  styles: [`
    .hero { padding: 3rem; border: 1px solid #dbeafe; border-radius: 1rem; background: linear-gradient(135deg, #eff6ff, #fff); }
    .eyebrow { color: #1d4ed8; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; }
    h1 { color: #172554; font-size: clamp(2rem, 4vw, 3.25rem); margin: .5rem 0 1rem; }
    p { color: #475569; max-width: 650px; }
    a { display: inline-block; margin-top: 1.5rem; padding: .8rem 1rem; color: white; background: #1d4ed8; border-radius: .5rem; text-decoration: none; }
  `],
})
export class HomeComponent {}
