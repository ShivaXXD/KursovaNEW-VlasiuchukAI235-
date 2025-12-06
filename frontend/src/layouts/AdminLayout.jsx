import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function AdminLayout() {
    const token = localStorage.getItem('ACCESS_TOKEN');
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('ADMIN_USER') || '{}'));

    // Якщо токена немає - редірект на логін
    if (!token) {
        return <Navigate to="/login" />;
    }

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } catch (e) {
            console.error(e);
        }
        // Видаляємо токен і на вихід
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('ADMIN_USER');
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
                <div className="p-6 text-2xl font-bold border-b border-gray-700">
                    Apex Admin
                </div>
                <nav className="mt-6">
                    <Link to="/admin" className="block py-3 px-6 hover:bg-gray-700 transition">
                        📊 Дашборд
                    </Link>
                    <Link to="/admin/services" className="block py-3 px-6 hover:bg-gray-700 transition">
                        💼 Послуги
                    </Link>
                    <Link to="/admin/team" className="block py-3 px-6 hover:bg-gray-700 transition">
                        👥 Команда
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left py-3 px-6 hover:bg-red-600 transition mt-10">
                        🚪 Вихід
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Панель керування</h2>
                    <span className="text-gray-600">Привіт, {user.username}</span>
                </header>
                
                <Outlet />
            </main>
        </div>
    );
}