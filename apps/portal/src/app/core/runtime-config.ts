import { InjectionToken } from '@angular/core';
import { PortalRuntimeConfig } from '@nxseed2/contracts';

export const PORTAL_RUNTIME_CONFIG = new InjectionToken<PortalRuntimeConfig>(
  'PORTAL_RUNTIME_CONFIG',
);

let runtimeConfig: PortalRuntimeConfig | undefined;

export async function loadPortalRuntimeConfig(
  url = '/portal-config.json',
): Promise<PortalRuntimeConfig> {
  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Não foi possível carregar ${url}: HTTP ${response.status}`);
  }

  const config = (await response.json()) as PortalRuntimeConfig;
  validateRuntimeConfig(config);
  runtimeConfig = Object.freeze(config);
  return runtimeConfig;
}

export function getPortalRuntimeConfig(): PortalRuntimeConfig {
  if (!runtimeConfig) {
    throw new Error('A configuração de runtime ainda não foi carregada.');
  }

  return runtimeConfig;
}

function validateRuntimeConfig(config: PortalRuntimeConfig): void {
  const requiredValues: Array<[string, unknown]> = [
    ['environment.name', config?.environment?.name],
    ['environment.label', config?.environment?.label],
    ['federationManifestUrl', config?.federationManifestUrl],
    ['apiUrl', config?.apiUrl],
    ['rootUrl', config?.rootUrl],
    ['systemId', config?.systemId],
    ['apiCore', config?.apiCore],
  ];

  const missing = requiredValues
    .filter(([, value]) => typeof value !== 'string' || value.trim() === '')
    .map(([path]) => path);

  if (missing.length > 0) {
    throw new Error(`Configuração de runtime inválida: ${missing.join(', ')}`);
  }
}
