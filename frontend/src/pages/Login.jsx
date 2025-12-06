import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            // 1. Відправляємо дані на Laravel
            const response = await api.post('/login', formData);
            
            // 2. Якщо все ок - зберігаємо токен
            const { token, user } = response.data;
            localStorage.setItem('ACCESS_TOKEN', token);
            localStorage.setItem('ADMIN_USER', JSON.stringify(user));

            // 3. Перенаправляємо в адмінку
            navigate('/admin');
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Невірний логін або пароль');
            } else {
                setError('Сталася помилка. Спробуйте пізніше.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Вхід в Адмін-панель</h1>
                
                {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Логін</label>
                        <input 
                            type="text" 
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:outline-none focus:border-primary"
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Пароль</label>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:outline-none focus:border-primary"
                            required 
                        />
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-blue-600 transition">
                        Увійти
                    </button>
                </form>
            </div>
        </div>
    );
}