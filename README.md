## Quick Start
Before starting, ensure you have the following prerequisites installed:

- PHP
- Composer
- Node.js and npm
- MySQL


### Install Dependencies
Navigate to the project folder and install PHP and JavaScript dependencies.

``composer install``
``npm install``


### Environment Setup
Copy the example .env file to create your own environment file.

``cp .env.example .env``

Now, edit .env to set up your database and other environment variables.


### Generate Application Key
Generate a new application key for your Laravel application.

``php artisan key:generate``


### Database Migration
Run the database migrations to set up the database schema.

``php artisan migrate``


### Run the Queue Worker and Scheduler
Run the Queue Worker that will process the jobs.

``php artisan queue:work``
``php artisan schedule:work``


### Compile Assets
Compile the frontend assets for development.

``npm run dev``


### Serve the Application
Now you can serve the application using Laravel's built-in server.

``php artisan serve``
