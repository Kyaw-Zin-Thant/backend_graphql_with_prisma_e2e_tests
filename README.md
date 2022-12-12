### Setup

1. Install dependencies `npm i`.
2. Run `docker compose up -d` to start docker containers in background.
3. Run `pnpm db:migrate` to initiate database.
4. Run `pnpm codegen` to generate TypeScript definition for GraphQL and Prisma client.
5. Run `pnpm start` to start the project.
6. Run  `pnpm run test:e2e` to run e2e tests
