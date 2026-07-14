import 'zone.js';
import 'zone.js/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { PORTAL_RUNTIME_CONFIG } from './core/runtime-config';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        {
          provide: PORTAL_RUNTIME_CONFIG,
          useValue: {
            environment: { name: 'test', label: 'Ambiente de teste', production: false },
            federationManifestUrl: '/assets/federation.manifest.json',
            apiUrl: 'http://localhost/api',
            apiVersion: 'v1',
            rootUrl: 'http://localhost:4200',
            systemId: 'portal-test',
            apiCore: 'http://localhost/core',
            apiNotificationUrl: 'http://localhost/notifications',
            systemExternalCode: 'PORTAL_TEST',
            auth: { clientId: '', authority: '', redirectUri: 'http://localhost:4200' },
          },
        },
      ],
    }).compileComponents();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand')?.textContent).toContain('Portal Corporativo');
    expect(compiled.querySelector('.environment')?.textContent).toContain('Ambiente de teste');
  });
});
