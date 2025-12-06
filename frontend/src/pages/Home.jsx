import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white py-24 px-4 overflow-hidden">
                <div className="relative z-10 container mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Професійний Консалтинг для Вашого Бізнесу</h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
                        Допомагаємо вирішувати складні завдання, оптимізувати процеси та досягати нових висот.
                    </p>
                    <Link to="/services" className="bg-secondary text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-600 transition inline-block">
                        Переглянути послуги
                    </Link>
                </div>
                {/* Декоративний фон */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto py-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Чому обирають Apex Strategies?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-6 border rounded-xl hover:shadow-lg transition">
                        <div className="text-4xl mb-4">🚀</div>
                        <h3 className="text-xl font-bold mb-2">Швидке зростання</h3>
                        <p className="text-gray-600">Наші стратегії спрямовані на максимізацію прибутку в найкоротші терміни.</p>
                    </div>
                    <div className="p-6 border rounded-xl hover:shadow-lg transition">
                        <div className="text-4xl mb-4">🛡️</div>
                        <h3 className="text-xl font-bold mb-2">Надійність</h3>
                        <p className="text-gray-600">Ми гарантуємо конфіденційність та якість надання послуг.</p>
                    </div>
                    <div className="p-6 border rounded-xl hover:shadow-lg transition">
                        <div className="text-4xl mb-4">💡</div>
                        <h3 className="text-xl font-bold mb-2">Інновації</h3>
                        <p className="text-gray-600">Використовуємо найсучасніші підходи та інструменти аналізу.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}