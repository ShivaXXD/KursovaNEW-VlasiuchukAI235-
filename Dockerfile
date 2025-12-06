# Етап 1: Збірка Frontend (React)
FROM node:18 as frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Етап 2: Збірка Backend (Laravel) і фінальний образ
FROM php:8.2-apache

# Встановлюємо системні залежності та розширення PHP
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Вмикаємо модуль rewrite для Apache (щоб працювали красиві URL Laravel)
RUN a2enmod rewrite

# Встановлюємо Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Налаштовуємо робочу папку
WORKDIR /var/www/html

# Копіюємо файли Laravel (папка backend)
COPY backend/ .

# Копіюємо зібраний React (з етапу 1) у папку public Laravel
# Це дозволить Laravel показувати ваш React сайт
COPY --from=frontend-build /app/dist public/

# Встановлюємо залежності PHP
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Налаштовуємо права доступу (важливо для Laravel)
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Налаштовуємо Apache, щоб він дивився в папку public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf \ /etc/apache2/conf-available/*.conf

# Відкриваємо порт 80
EXPOSE 80

# Запускаємо Apache
CMD ["apache2-foreground"]  