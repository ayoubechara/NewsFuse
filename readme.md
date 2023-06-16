# News Aggregator Website Documentation

This documentation provides instructions on setting up and running the News Aggregator website project. The project consists of a backend application built with Laravel and a frontend application developed with React.js. Both applications are Dockerized, allowing for easy deployment and management.

## Prerequisites

Before getting started, ensure that you have the following software installed on your machine:

- Docker: [Installation Guide](https://docs.docker.com/get-docker/)

## Getting Started

Follow the steps below to set up and run the News Aggregator website:

1. Clone the repository:

   ```
   git clone <repository-url>
   cd news-aggregator
   ```

2. Configure the backend:

   - Rename the `.env.example` file in the `backend` directory to `.env` and update the necessary configuration options such as database credentials, API keys, etc.

3. Configure the frontend:

   - Rename the `.env.example` file in the `frontend` directory to `.env` and update the necessary configuration options if required.

4. Build and run the project:

   ```
   docker-compose up --build
   ```

5. Access the application:
   - Backend API: http://localhost:8000
   - Frontend application: http://localhost:3000

## Usage

Once the project is up and running, you can use the News Aggregator website as follows:

1. User Registration and Authentication:

   - Visit the frontend application URL (http://localhost:3000) in your web browser.
   - Create a new account by clicking on the "Register" link and providing the required information.
   - After successful registration, log in using your credentials on the login page.

2. Article Search and Filtering:

   - On the homepage, you can search for articles by entering keywords in the search bar.
   - Use the provided filters (date, category, and source) to narrow down the search results.

3. Personalized News Feed:

   - Customize your news feed by visiting the preferences/settings page.
   - Select your preferred sources, categories, and authors to personalize the articles displayed on your feed.

4. Mobile-Responsive Design:
   - The News Aggregator website is optimized for viewing on mobile devices. You can access and use the website on your smartphone or tablet.

## API Keys

To access the article data from various sources, the project relies on external APIs that may require API keys. Please make sure to obtain the necessary API keys for the chosen data sources and update the corresponding configuration options in the `.env` file of the backend application.

## Testing

To run the automated tests for the backend and frontend applications, follow these steps:

1. Backend Tests:

   ```
   docker-compose exec backend ./vendor/bin/phpunit
   ```

2. Frontend Tests:
   ```
   docker-compose exec frontend npm test
   ```

## Conclusion

Congratulations! You have successfully set up and run the News Aggregator website project. Feel free to explore the various features and functionalities provided by the application. If you encounter any issues or have further questions, please reach out to the project maintainers.

Happy news reading!
