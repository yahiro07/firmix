dev:
	npm run dev

check:
	npm run typecheck

build:
	npm run build

migration_dev:
	npx dotenv -e .env npx vite-node ./app/central/work/execute_migration.ts

migration_production:
	npx dotenv -e .env.production.local npx vite-node ./app/central/work/execute_migration.ts
