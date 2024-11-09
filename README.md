# To-do App

This is a sample To-do App created to explore using Vue 3 with a Laravel backend. The project includes separate folders for the backend (Laravel) and frontend (Vue 3) to help organize the codebase and simplify setup.

## Requirements

- **Backend**: PHP 8.x, Composer
- **Frontend**: Node.js 16.x or higher, npm

---

## Setup Instructions

### 1. Backend (Laravel)

#### Step 1: Navigate to the Backend Folder

```bash
cd backend
```

#### Step 2: Install Backend Dependencies

```bash
composer install
```

#### Step 3: Configure the Environment

Copy the .env.example file to create a .env file.

```bash
cp .env.example .env
```

Open the .env file and configure the necessary database and application settings, such as DB_DATABASE, DB_USERNAME, and DB_PASSWORD, depending on your local setup.

#### Step 4: Generate the Application Key

```bash
php artisan key:generate
```

#### Step 5: Run Migrations

If the application uses a database, run migrations to set up the tables:

```bash
php artisan migrate --seed
```

Step 6: Start the Backend Server
This command will start the Laravel development server:

```bash
php artisan serve
```

By default, the server will run on http://localhost:8000. You’ll need this URL for configuring the frontend.

### 2. Frontend (Vue 3)

#### Step 1: Navigate to the Frontend Folder

```bash
cd frontend
```

#### Step 2: Install Frontend Dependencies

```bash
npm install
```

#### Step 3: Configure the Environment

Copy the `.env.example` file and rename it to `.env`.
Open the .env file and set the VITE_API_BASE_URL to point to your backend server. For local development, it might look like this:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

#### Step 4: Start the Frontend Server

Run the following command to start the development server:

```bash
npm run dev
```

By default, this will start the frontend server at http://localhost:5173.
