# Use the official PHP-FPM 8.0 base image
FROM php:8.2.0

# Set the working directory inside the container
WORKDIR /app/backend

# Copy the project files to the container
COPY . .

# Install PHP dependencies
RUN docker-php-ext-install pdo pdo_mysql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install project dependencies
RUN composer install --no-interaction --optimize-autoloader

# Expose the application port
EXPOSE 8000

# Start the PHP-FPM server
CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8000"]