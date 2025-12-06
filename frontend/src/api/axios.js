import axios from 'axios';

const api = axios.create({
    baseURL: '/api', 
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