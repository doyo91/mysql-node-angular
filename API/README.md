# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Create `ormconfig.json` file,
   `{ "type": "mysql", "host": "XXXX", "port": 3306, "username": "XXXX", "password": "XXXX", "database": "XXXX", "synchronize": true, "logging": false, "entities": ["src/entity/**/*.ts"], "migrations": ["src/migration/**/*.ts"], "subscribers": ["src/subscriber/**/*.ts"], "cli": { "entitiesDir": "src/entity", "migrationsDir": "src/migration", "subscribersDir": "src/subscriber" } }`
3. Setup database settings inside `ormconfig.json` file
4. Run `npm run dev` command
