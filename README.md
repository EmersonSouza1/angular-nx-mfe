# Portal corporativo NX

Portal Angular para centralizar módulos da empresa. O `portal` é o shell e os módulos de negócio são carregados em runtime por Native Federation.

## Arquitetura

- `apps/portal`: host, navegação e composição dos módulos.
- `apps/mfe-fiscal`: primeiro microfrontend, expõe `./routes`.
- `libs/shared/auth`: estado e permissões do usuário.
- `libs/shared/contracts`: contratos estáveis entre aplicações.
- `libs/shared/ui`: componentes visuais reutilizáveis.

## Requisitos

- Node.js 22 LTS
- npm 10 ou superior

## Desenvolvimento

```bash
npm install --legacy-peer-deps
npm run start:all
```

Abra `http://localhost:4200`. O remote fiscal roda em `http://localhost:4201` e publica `remoteEntry.json`.

Comandos individuais:

```bash
npm run start:portal
npm run start:mfe-fiscal
npm run lint
npm run test
npm run build
```

## Configuração de runtime

O portal carrega `/portal-config.json` antes do bootstrap Angular. Esse arquivo contém URLs de APIs, identificação do sistema, dados públicos do Azure AD e o caminho do manifesto de federação. Ele deve ser substituído no deploy sem recompilar a aplicação.

Campos obrigatórios nesta etapa:

- `environment`: nome, rótulo e indicador de produção;
- `federationManifestUrl`: caminho do manifesto dos remotes;
- `apiUrl`, `apiCore` e `apiNotificationUrl`: endpoints externos;
- `rootUrl`, `systemId` e `systemExternalCode`: identificação do portal;
- `auth`: `clientId`, `authority` e `redirectUri` públicos, preparados para a futura integração MSAL.

Nunca coloque client secret, token ou senha nesse arquivo: tudo que ele contém é público no navegador.

## Federação

O host lê de `portal-config.json` qual manifesto deve inicializar. O arquivo local é `assets/federation.manifest.json`. Em homologação e produção, substitua as URLs do manifesto durante o deploy para apontar aos domínios de cada remote, sem recompilar o portal.

Os servidores dos remotes precisam permitir CORS para o domínio do portal. A política CSP do host também deve liberar em `script-src` e `connect-src` os domínios declarados no manifesto. Cada remote deve expor rotas Angular e manter as dependências Angular como singleton com versão estrita.

## Regras de arquitetura

Aplicações podem depender apenas de bibliotecas marcadas como `type:shared`. Bibliotecas compartilhadas não podem importar aplicações. Novos módulos devem receber tags `type:app` e `scope:<dominio>` no `project.json`.
