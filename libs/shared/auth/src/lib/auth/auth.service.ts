import { Injectable, signal } from '@angular/core';

export interface PortalUser { id: string; name: string; permissions: readonly string[]; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUserState = signal<PortalUser | null>(null);
  readonly currentUser = this.currentUserState.asReadonly();
  setUser(user: PortalUser): void { this.currentUserState.set(user); }
  clear(): void { this.currentUserState.set(null); }
  hasPermission(permission: string): boolean { return this.currentUser()?.permissions.includes(permission) ?? false; }
}
