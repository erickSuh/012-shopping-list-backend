# Shopping List Backend - Database Setup

## Prerequisites

- PostgreSQL 12+ (or AWS RDS PostgreSQL instance)
- Node.js 18+
- Yarn package manager

## Environment Variables

Create a `.env` file in the project root with the following configuration:

```env
# Database Configuration
DB_HOST=your-rds-endpoint.rds.amazonaws.com
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-password
DB_NAME=shopping_list

# Environment
NODE_ENV=development

# Server
PORT=3000
```

### AWS RDS Configuration

For AWS RDS PostgreSQL:

1. Create a PostgreSQL RDS instance
2. Note the endpoint (hostname)
3. Create a database named `shopping_list`
4. Update `.env` with your RDS credentials

## Database Migrations

### Running Migrations

```bash
yarn migration:run
```

### Reverting Migrations

```bash
yarn migration:revert
```

### Creating New Migrations

```bash
yarn migration:create src/migrations/MigrationName
```

### Auto-generating Migrations

```bash
yarn migration:generate src/migrations/MigrationName
```

## Database Schema

### Lists Table

- `id` (serial, primary key)
- `title` (varchar, required)
- `description` (varchar, required)
- `createdAt` (timestamp, auto-generated)
- `updatedAt` (timestamp, auto-updated)

### Items Table

- `id` (serial, primary key)
- `title` (varchar, required)
- `description` (varchar, required)
- `quantity` (int, default: 0)
- `isChecked` (boolean, default: false)
- `listId` (int, foreign key to lists.id with ON DELETE CASCADE)
- `createdAt` (timestamp, auto-generated)
- `updatedAt` (timestamp, auto-updated)

## Starting the Application

### Development Mode

```bash
yarn start:dev
```

### Production Mode

```bash
yarn build
yarn start:prod
```

## TypeORM Configuration

The database configuration is located in `src/config/database.ts` and uses environment variables for connection details. TypeORM will:

- Connect to the specified PostgreSQL instance
- Load entities from `src/entities/`
- Load migrations from `src/migrations/`
- Log queries in development mode
