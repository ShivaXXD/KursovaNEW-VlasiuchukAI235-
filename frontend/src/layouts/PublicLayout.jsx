import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function PublicLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
            {/* Outlet - сюди React Router підставлятиме контент конкретної сторінки */}
            <main className="flex-grow py-8">
                <Outlet />
            </main>

            <footer className="bg-gray-800 text-white py-6 mt-auto">
                <div className="container mx-auto text-center px-4">
                    <p>&copy; {new Date().getFullYear()} Apex Strategies. Всі права захищено.</p>
                </div>
            </footer>
        </div>
    );
}