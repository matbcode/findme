## Raichi

Raichi is an innovative web application designed to streamline the management and scheduling of social media content. Tailored for businesses and individual content creators alike, this intuitive platform offers a suite of tools to simplify your social media strategy.

### Key Features
- **Effortless Scheduling:** Plan and arrange your posts across multiple social media platforms with our user-friendly calendar interface. Raichi ensures your content goes live at the most impactful times.
- **Post Preview:** Get a real-time preview of how your posts will appear on various social media channels, enabling you to fine-tune your content for maximum engagement.
- **Approval Workflow:** Collaborative features allow teams to review, comment, and approve posts. This streamlined workflow ensures that every piece of content aligns with your brand's voice and quality standards.
- **Analytics Integration:** Track the performance of your posts with integrated analytics. Understand your audience better and adjust your strategy for enhanced engagement.
- **User-Centric Design:** Raichi boasts a clean, intuitive interface that prioritizes user experience, making social media management a seamless and enjoyable task.

### Technology stack
- **Backend:** Laravel
- **Frontend:** Vue.js
- **Glue layer:** Inertia.js


## Quick Start
Before starting, ensure you have the following prerequisites installed:

- PHP
- Composer
- Node.js and npm
- MySQL


### Clone the Repository
First, clone the repository to your local machine.

``git@github.com:matbcode/raichi.git``


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
