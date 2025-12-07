# --- Етап 1: Збірка Frontend (React) ---
FROM node:18 as frontend-build

# Переходимо в папку фронтенду
WORKDIR /app/frontend

# Копіюємо package.json та package-lock.json (якщо є)
COPY frontend/package*.json ./

# Встановлюємо залежності JS
RUN npm install

# Копіюємо весь код фронтенду
COPY frontend/ ./

# Збираємо React (створюється папка dist)
RUN npm run build


# --- Етап 2: Налаштування Backend (Laravel) ---
FROM php:8.2-apache

# Встановлюємо системні бібліотеки, необхідні для Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Вмикаємо модуль mod_rewrite для Apache (щоб працювали красиві URL)
RUN a2enmod rewrite

# Встановлюємо Composer (менеджер пакетів PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Встановлюємо робочу директорію
WORKDIR /var/www/html

# Копіюємо файли Laravel (все з кореня, крім того, що в .dockerignore)
COPY . .


COPY --from=frontend-build /app/frontend/dist public/assets

COPY --from=frontend-build /app/frontend/dist public/

# Встановлюємо залежності PHP (без dev-залежностей для економії місця)
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Налаштовуємо права доступу (Laravel потребує прав на запис у storage)
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Налаштування Apache DocumentRoot (вказуємо на папку public)
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Відкриваємо порт 80
EXPOSE 80

# Запускаємо Apache
CMD ["apache2-foreground"]