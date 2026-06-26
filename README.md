# Laptop Loan Management

A simple web application for managing office laptops and recording laptop loan transactions. This project was built as part of a programmer test case study.

The application allows users to manage laptop assets, create loan records, mark laptops as returned, and monitor laptop availability through a simple dashboard.

## Features

- Dashboard summary
    - Total laptops
    - Available laptops
    - Borrowed laptops

- Laptop Management
    - List laptops
    - Add new laptop
    - Edit laptop data
    - Delete laptop
    - Search laptops by code or name
    - Filter laptops by status

- Loan Management
    - Create laptop loan transaction
    - Select only available laptops for borrowing
    - Automatically update laptop status to `Dipinjam` when borrowed
    - Mark loan as returned
    - Automatically update laptop status back to `Tersedia` when returned
    - View loan history
    - Search loan records by borrower name, laptop code, or laptop name

## Tech Stack

- Laravel
- Laravel Breeze
- Inertia.js
- React
- PostgreSQL
- Tailwind CSS
- Material UI

## Requirements

Before running this project, make sure you have installed:

- PHP
- Composer
- Node.js and npm
- PostgreSQL
- Laravel supported local development environment, such as Laragon, Laravel Herd, or similar

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd peminjaman-item
```

Install PHP dependencies:

```bash
composer install
```

Install JavaScript dependencies:

```bash
npm install
```

Copy the environment file:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

## Database Configuration

Create a PostgreSQL database first, then update the `.env` file.

Example:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=peminjaman_item
DB_USERNAME=postgres
DB_PASSWORD=
```

Run database migration:

```bash
php artisan migrate
```

run seeder:

```bash
php artisan db:seed --class=LaptopLoanSeeder
```

Or if you want to reset the database from scratch:

```bash
php artisan migrate:fresh --seed
```

## Running the Application

Run Laravel development server:

```bash
php artisan serve
```

In another terminal, run Vite:

```bash
npm run dev
```

Open the application in your browser:

```text
http://127.0.0.1:8000
```

## Alternative Development Command

Laravel may provide a combined development command:

```bash
composer run dev
```

However, on Windows, this command may fail if Laravel Pail requires the `pcntl` extension. If that happens, run the application using two separate terminals instead:

```bash
php artisan serve
```

and:

```bash
npm run dev
```

## Main Routes

| Page          | Route Name              | Description                |
| ------------- | ----------------------- | -------------------------- |
| Dashboard     | `dashboard`             | Shows laptop summary       |
| Laptop List   | `laptop.index`          | Shows all laptops          |
| Create Laptop | `laptop.create`         | Form to add a new laptop   |
| Edit Laptop   | `laptop.edit`           | Form to update laptop data |
| Loan List     | `peminjaman.index`      | Shows loan history         |
| Create Loan   | `peminjaman.create`     | Form to create a new loan  |
| Return Laptop | `peminjaman.kembalikan` | Marks a loan as returned   |

## Project Structure

Main frontend files are located in:

```text
resources/js/
├── Components/
├── Enums/
├── Layouts/
└── Pages/
```

Main backend files include:

```text
app/
├── Enums/
├── Http/
│   ├── Controllers/
│   └── Requests/
└── Models/
```

Database migrations are located in:

```text
database/migrations/
```

Routes are located in:

```text
routes/web.php
```

## Database Tables

### Laptop

Stores laptop asset data.

Main fields:

- `id`
- `kode`
- `nama`
- `spesifikasi`
- `status`

Status values:

- `Tersedia`
- `Dipinjam`

### Peminjaman

Stores laptop loan transaction data.

Main fields:

- `id`
- `laptop_id`
- `nama_peminjam`
- `tanggal_pinjam`
- `tanggal_kembali`

The `tanggal_kembali` field is nullable. If it is still empty, the laptop is considered currently borrowed.

## Application Flow

### Borrowing a Laptop

1. User selects an available laptop.
2. User enters borrower name and loan date.
3. System creates a loan record.
4. System updates the selected laptop status to `Dipinjam`.

### Returning a Laptop

1. User clicks the return action on an active loan.
2. System fills `tanggal_kembali` with the current date.
3. System updates the related laptop status back to `Tersedia`.

## Notes

- The project uses Inertia.js, so page navigation is handled through Laravel routes and React pages.
- The application does not use React Router.
- Form submission is handled using Inertia form helpers.
- Frontend validation is kept simple because backend validation is handled by Laravel Form Requests.
- Tailwind CSS is used for layout and spacing.
- Material UI is used for fields, buttons, dropdowns, tables, chips, pagination, and icons.

## Build for Production

To build frontend assets for production:

```bash
npm run build
```

## License

This project is created for assessment and learning purposes.
