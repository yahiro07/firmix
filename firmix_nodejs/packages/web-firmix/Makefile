dev:
	npm run dev

# debug_production_local:
# 	npx dotenv -e .env.production.local npx remix-serve ./build/server/index.js

migration_dev:
	npx dotenv -e .env npx vite-node ./app/central/work/execute_migration.ts

migration_production:
	npx dotenv -e .env.production.local npx vite-node ./app/central/work/execute_migration.ts
