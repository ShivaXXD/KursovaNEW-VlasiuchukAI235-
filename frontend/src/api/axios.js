import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // Адреса вашого Laravel сервера
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Додаємо токен до запитів, якщо він є (для адмінки)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;