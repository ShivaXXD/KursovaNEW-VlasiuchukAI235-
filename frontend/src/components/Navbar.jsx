import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Логотип */}
                <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-primary transition">
                    Apex Strategies
                </Link>

                {/* Меню */}
                <ul className="hidden md:flex space-x-6">
                    <li><Link to="/" className="text-gray-600 hover:text-primary font-medium">Головна</Link></li>
                    <li><Link to="/services" className="text-gray-600 hover:text-primary font-medium">Послуги</Link></li>
                    <li><Link to="/portfolio" className="text-gray-600 hover:text-primary font-medium">Портфоліо</Link></li>
                    <li><Link to="/team" className="text-gray-600 hover:text-primary font-medium">Наша Команда</Link></li>
                    <li><Link to="/contact" className="text-gray-600 hover:text-primary font-medium">Контакти</Link></li>
                </ul>
                
                {/* Кнопка входу для мобілок або адміна (опціонально) */}
                <Link to="/login" className="text-sm text-gray-400 hover:text-gray-600">Вхід</Link>
            </nav>
        </header>
    );
}