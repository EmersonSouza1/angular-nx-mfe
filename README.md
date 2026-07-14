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
npm install
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

## Federação

O host inicializa `assets/federation.manifest.json`. Em outros ambientes, altere as URLs do manifesto durante o deploy sem recompilar o portal. Cada remote deve expor rotas Angular e manter dependências Angular compartilhadas como singleton.

## Regras de arquitetura

Aplicações podem depender apenas de bibliotecas marcadas como `type:shared`. Bibliotecas compartilhadas não podem importar aplicações. Novos módulos devem receber tags `type:app` e `scope:<dominio>` no `project.json`.
