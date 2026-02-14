# Monorepo Nx + Angular (Host + Module Federation)

Este guia cria um monorepo **Nx + Angular** com:

- `apps/portal` (host)
- `apps/mfe-fiscal` (remote)
- `apps/mfe-cadastro` (remote)
- `libs/shared/ui`
- `libs/shared/auth`
- `libs/shared/contracts`

Tudo com **Angular standalone**, **routing** e configuração moderna (`bootstrapApplication`, `provideRouter`, etc.).

---

## 1) Comandos Nx (exatos) para gerar tudo

> Execute os comandos na ordem abaixo.

```bash
# 1. Criar workspace Nx Angular (integrated monorepo)
npx create-nx-workspace@latest angular-nx-mfe \
  --preset=angular-monorepo \
  --workspaceType=integrated \
  --appName=portal \
  --routing=true \
  --style=scss \
  --standaloneApi=true \
  --bundler=webpack \
  --nxCloud=skip \
  --packageManager=npm

cd angular-nx-mfe

# 2. Adicionar plugin Angular (caso não venha no preset)
npm i -D @nx/angular

# 3. Converter/gerar o portal como host de Module Federation
nx g @nx/angular:host portal \
  --remotes=mfe-fiscal,mfe-cadastro \
  --routing=true \
  --style=scss \
  --standalone=true

# 4. Gerar remote fiscal
nx g @nx/angular:remote mfe-fiscal \
  --host=portal \
  --routing=true \
  --style=scss \
  --standalone=true

# 5. Gerar remote cadastro
nx g @nx/angular:remote mfe-cadastro \
  --host=portal \
  --routing=true \
  --style=scss \
  --standalone=true

# 6. Gerar libs compartilhadas
nx g @nx/angular:library shared-ui \
  --directory=shared/ui \
  --standalone \
  --routing=false \
  --style=scss

nx g @nx/angular:library shared-auth \
  --directory=shared/auth \
  --standalone \
  --routing=false \
  --style=scss

nx g @nx/angular:library shared-contracts \
  --directory=shared/contracts \
  --standalone \
  --routing=false \
  --style=scss

# 7. Bootstrap no projeto (estilos base para shared/ui)
npm i bootstrap
```

---

## 2) Estrutura final esperada do monorepo

```text
angular-nx-mfe/
├─ apps/
│  ├─ portal/
│  │  ├─ src/
│  │  │  ├─ app/
│  │  │  │  ├─ app.routes.ts
│  │  │  │  └─ ...
│  │  │  ├─ main.ts
│  │  │  └─ styles.scss
│  │  ├─ module-federation.config.ts
│  │  └─ project.json
│  ├─ mfe-fiscal/
│  │  ├─ src/
│  │  │  ├─ app/
│  │  │  │  ├─ remote-entry/
│  │  │  │  ├─ app.routes.ts
│  │  │  │  └─ ...
│  │  │  ├─ main.ts
│  │  │  └─ styles.scss
│  │  ├─ module-federation.config.ts
│  │  └─ project.json
│  └─ mfe-cadastro/
│     ├─ src/
│     │  ├─ app/
│     │  │  ├─ remote-entry/
│     │  │  ├─ app.routes.ts
│     │  │  └─ ...
│     │  ├─ main.ts
│     │  └─ styles.scss
│     ├─ module-federation.config.ts
│     └─ project.json
├─ libs/
│  └─ shared/
│     ├─ ui/
│     │  ├─ src/lib/
│     │  │  ├─ components/
│     │  │  └─ styles/
│     │  └─ project.json
│     ├─ auth/
│     │  ├─ src/lib/
│     │  │  ├─ auth.service.ts
│     │  │  ├─ auth.guard.ts
│     │  │  └─ auth.interceptor.ts
│     │  └─ project.json
│     └─ contracts/
│        ├─ src/lib/
│        │  ├─ dto/
│        │  ├─ interfaces/
│        │  └─ events/
│        └─ project.json
├─ nx.json
├─ package.json
└─ tsconfig.base.json
```

---

## 3) Scripts para rodar portal + remotes em paralelo

Adicione no `package.json`:

```json
{
  "scripts": {
    "start": "nx run-many -t serve -p portal,mfe-fiscal,mfe-cadastro --parallel=3",
    "start:portal": "nx serve portal",
    "start:mfe-fiscal": "nx serve mfe-fiscal",
    "start:mfe-cadastro": "nx serve mfe-cadastro",
    "build:all": "nx run-many -t build -p portal,mfe-fiscal,mfe-cadastro --parallel=3",
    "test:all": "nx run-many -t test -p portal,mfe-fiscal,mfe-cadastro --parallel=3"
  }
}
```

---

## 4) Sugestão de implementação das libs shared

- `libs/shared/ui`
  - componentes standalone reutilizáveis (`UiButtonComponent`, `UiCardComponent`)
  - `styles/_variables.scss` e `styles/_mixins.scss`
  - import global de Bootstrap em `styles.scss` do host/remotes

- `libs/shared/auth`
  - `AuthService` para sessão/token
  - `AuthGuard` (`CanActivateFn`) com redirecionamento para login
  - `AuthInterceptor` com `HttpInterceptorFn` para anexar `Authorization`

- `libs/shared/contracts`
  - interfaces de domínio
  - DTOs de request/response
  - eventos de integração entre MFEs (ex.: `UserLoggedInEvent`)

Com esse setup, você já começa com arquitetura pronta para escalar host + remotes em Angular moderno com Nx.
