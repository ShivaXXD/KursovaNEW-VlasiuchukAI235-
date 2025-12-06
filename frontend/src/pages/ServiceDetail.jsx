import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

export default function ServiceDetail() {
    const { id } = useParams(); // Отримуємо ID з URL
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/services/${id}`)
            .then(res => {
                setService(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Помилка:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center mt-10">Завантаження...</div>;
    if (!service) return <div className="text-center mt-10 text-red-500">Послугу не знайдено.</div>;

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{service.page_title}</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Ліва колонка: Основний контент */}
                <div className="md:w-2/3">
                    <img 
                        src={service.image_url} 
                        alt={service.title} 
                        className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
                    />
                    
                    <h2 className="text-2xl font-semibold mb-3">{service.page_subtitle}</h2>
                    {/* nl2br аналог: CSS whitespace-pre-line зберігає переноси рядків */}
                    <p className="text-gray-700 whitespace-pre-line mb-6 leading-relaxed">
                        {service.page_description}
                    </p>

                    <h3 className="text-xl font-bold mb-3">Що входить у послугу:</h3>
                    <ul className="list-disc list-inside space-y-2 mb-8 text-gray-700">
                        {/* Laravel вже перетворив JSON на масив, тому просто map */}
                        {service.page_features && service.page_features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                    
                    {/* Кнопка замовлення (поки що просто лінк) */}
                    <div className="mt-6">
                        <Link 
                           to={`/checkout?service=${encodeURIComponent(service.title)}&price=${service.price}`} 
                          className="bg-secondary text-white px-8 py-3 rounded font-bold hover:bg-green-700 transition"
                        >           
                           Замовити послугу (${service.price})
                        </Link>
                    </div>
                </div>

                {/* Права колонка: Виконавець (Sidebar) */}
                <aside className="md:w-1/3">
                    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold mb-4 border-b pb-2">Виконує:</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <img 
                                src={service.performer_photo_url} 
                                alt={service.performer_name} 
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-bold text-gray-900">{service.performer_name}</p>
                                <p className="text-sm text-primary font-medium">{service.performer_role}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 italic">
                            {service.performer_bio}
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}