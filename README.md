This is backend for WUV - web programming assignment 2.

to create migration script, run this
npx ts-node -P ./tsconfig.json -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:create src/db/migrations/UserSeed
