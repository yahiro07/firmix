dev:
	npm run dev

check:
	npm run typecheck

build:
	npm run build

docker_build_local:
	docker build -f ./Dockerfile -t firmix_node_remix .

migration_dev:
	npx dotenv -e .env npx vite-node ./app/central/work/execute_migration.ts

migration_production:
	npx dotenv -e .env.production.local npx vite-node ./app/central/work/execute_migration.ts
