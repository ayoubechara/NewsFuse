# Base image
FROM php:7.4-apache

# Set working directory
WORKDIR /var/www/html

# Install dependencies
RUN apt-get update && \
    apt-get install -y \
    libpq-dev \
    libzip-dev \
    unzip \
    zip

# Enable required PHP extensions
RUN docker-php-ext-install pdo pdo_mysql zip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy application files
COPY . .

# Set file permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Install application dependencies
RUN composer install --no-plugins --no-scripts

# Generate application key
RUN php artisan key:generate

# Expose container port
EXPOSE 8000

# Start the PHP-FPM server
CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8000"]
