# Backend Setup and Run

## Environment Variables

Create a `.env` file in the root folder and set the following variables:
DATABASE_URL="postgresql://myuser:mikoSQLpassword_77@localhost:5432/recipes_db"
JWT_SECRET=super_secret_key_123
PORT=3000

Adjust values according to your setup.

## Install dependencies

```bash
npm install
```

## Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

This will apply migrations and generate Prisma client.

## Run in development mode

```bash
npm run start:dev
```

Backend server will start at the configured port (usually 3000).
