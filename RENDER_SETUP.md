# 🚀 КІНЦЕВИЙ ГАЙД РОЗГОРТАННЯ НА RENDER

## 🔴 ПРОБЛЕМИ, ЯКІ МИ ВИРІШИЛИ:

| Проблема | Причина | Рішення |
|----------|---------|---------|
| БД порожня на Render | Міграції не запускаються | `docker-init.sh` запускає міграції та seeding |
| Немає даних | Seeding не запускається | Додали `php artisan db:seed --force` |
| .env файл не знайдено | `.env` не копіюється в контейнер | Environment Variables встановлюються на Render Dashboard |
| Конфіг не кешований | На продакшені потрібне кешування | Додали `php artisan config:cache` |
| Маршрути не оптимізовані | Slow routing | Додали `php artisan route:cache` |

---

## ✅ ЧТО ТРЕБА ЗРОБИТИ НА RENDER:

### **1. Перейти в Environment Variables**

На Render Dashboard → ваш сервіс → **Environment**

### **2. Додати ці змінні**

**Замініть значення на ваші!**

```env
# App Configuration
APP_NAME=MyApp
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:NhJ8B6Pl7E1odZlyoTUkkVbZxO6p8gOz/GXlqj0m9aI=
APP_URL=https://YOUR-RENDER-DOMAIN.onrender.com

# Database Configuration (ваші реальні значення)
DB_CONNECTION=mysql
DB_HOST=gateway01.eu-central-1.prod.aws.tidbcloud.com
DB_PORT=4000
DB_DATABASE=test
DB_USERNAME=3N8ZYXhEZNsV49X.root
DB_PASSWORD=oeyui2mbPAiNxsMT

# Cache & Session
SESSION_DRIVER=database
QUEUE_CONNECTION=database
CACHE_STORE=database
BROADCAST_CONNECTION=log

# Logging
LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug
```

### **3. Важливі поля:**

- `APP_KEY` - Залиште з `.env` (вже сгенерований)
- `APP_URL` - **Замініть на URL вашого Render сервісу** (буде щось типу `https://myapp.onrender.com`)
- `DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD` - **Ваші реальні дані**

---

## ✅ ЧТО ТРЕБА ЗРОБИТИ ЛОКАЛЬНО:

### **1. Збудуйте образ локально (для тестування)**

```bash
docker build -t myapp .
```

### **2. Зробіть commit змін**

```bash
git add .
git commit -m "Fix database migrations and seeding for Render deployment"
```

### **3. Push до GitHub**

```bash
git push origin main
```

---

## ✅ ЧТО РОБИТЬ DOCKERFILE ТЕПЕР:

```
┌─────────────────────────────────────┐
│   1. Збирає React (frontend/dist)   │
├─────────────────────────────────────┤
│   2. Встановлює PHP залежності      │
├─────────────────────────────────────┤
│   3. Копіює React у public/          │
├─────────────────────────────────────┤
│   ✨ НОВЕ: docker-init.sh запускає  │
│   ├─ config:cache                   │
│   ├─ migrate --force                │ ← БД таблиці
│   ├─ db:seed --force                │ ← Дані послуг/команди
│   ├─ route:cache                    │
│   └─ view:cache                     │
├─────────────────────────────────────┤
│   4. Запускає Apache                │
└─────────────────────────────────────┘
```

---

## 🔍 КАК ПЕРЕВІРИТИ, ЩО ВСЕ ПРАЦЮЄ:

### **1. На Render Dashboard**

Відкрийте **Logs** після розгортання. Шукайте:

```
✅ "Migrating:" - міграції почалися
✅ "Migrated:" - міграції завершились
✅ "Seeding database" - seeding почалось
✅ "Додаток готовий!" - все готово
```

### **2. Протестуйте API**

```bash
# Отримайте послуги
curl https://YOUR-DOMAIN.onrender.com/api/services

# Мав би повернути JSON з послугами
```

### **3. Перевірте фронтенд**

Перейдіть на `https://YOUR-DOMAIN.onrender.com` - мав би завантажити React додаток

---

## 🚨 ЯКЩО ЩО-ТА НЕ ПРАЦЮЄ:

### **Помилка: "Connection refused"**
- ❌ БД недоступна з Render
- ✅ Перевірте, чи вірні HOST, PORT, USERNAME, PASSWORD
- ✅ Дозволяє ли TiDB/MySQL лист IP від Render?

### **Помилка: "SQLSTATE[HY000]"**
- ❌ SSL проблема або неправильна БД
- ✅ Перевірте наявність `cacert.pem` в проекті
- ✅ Перевірте DB_CONNECTION=mysql в .env

### **Логи показують: "Unknown database 'test'"**
- ❌ БД не існує
- ✅ Створіть БД на TiDB: `CREATE DATABASE test;`
- ✅ Перевірте назву БД в `DB_DATABASE`

### **Фронтенд завантажується, але API не працює**
- ❌ Маршрути не кешовані
- ✅ Перевірте, чи маршрути правильні в `routes/api.php`
- ✅ Перевірте CORS налаштування

---

## 📝 ЧЕК-ЛИСТ ПЕРЕД PUSH:

- [ ] **Оновлено** `.env.example` з новими змінними
- [ ] **Є** файл `docker-init.sh` 
- [ ] **Є** файл `entrypoint.sh`
- [ ] **Є** файл `.dockerignore`
- [ ] **Оновлено** `Dockerfile` з копіюванням скриптів
- [ ] **Git commit** усіх змін
- [ ] **Git push** до main гілки
- [ ] **На Render Dashboard** встановлені Environment Variables
- [ ] **Render Dashboard** вказує на вірний Git repo
- [ ] **Render Dashboard** встановлено `Build Command: docker build`
- [ ] **Render Dashboard** встановлено `Start Command: docker run ...` (або автоматичне)

---

## 🎉 УСПІШНЕ РОЗГОРТАННЯ:

Коли все готово, у вас буде:
- ✅ React фронтенд на `https://YOUR-DOMAIN.onrender.com`
- ✅ PHP/Laravel API на `https://YOUR-DOMAIN.onrender.com/api`
- ✅ БД з таблицями (міграції)
- ✅ БД з даними (seeding)
- ✅ Кешовані конфіги і маршрути

---

## 📧 ЯКЩО ЩОСЬ ЩЕ НЕ ПРАЦЮЄ:

1. **Збережіть** посилання на Render сервіс
2. **Ділиться** логами з Render Dashboard
3. **Перевірте** error.log на сервері
4. **Запустіть** команди вручну на серверу через SSH (якщо доступно)

```bash
# SSH на Render контейнер
docker exec -it CONTAINER_ID /bin/bash

# Запустіть команди
cd /var/www/html
php artisan migrate:status
php artisan db:seed --class=DatabaseSeeder
```
