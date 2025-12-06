import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/services')
            .then(response => {
                setServices(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Помилка завантаження послуг:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center mt-10 text-xl">Завантаження...</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-4">Наші Послуги</h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
                Ми пропонуємо комплексні рішення для вашого бізнесу, розділені за нашими ключовими напрямками експертизи.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.length > 0 ? (
                    services.map(service => (
                        <div key={service.id} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition flex flex-col border border-gray-100">
                            
                            <div className="flex items-center gap-4 mb-6">
                                <div className="text-5xl bg-blue-50 p-3 rounded-lg">{service.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-800 leading-tight">{service.title}</h3>
                            </div>
                            
                            <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                                {service.description_short}
                            </p>
                            
                            <div className="mt-auto border-t pt-4 flex justify-between items-center">
                                <div>
                                    <span className="text-xs text-gray-400 uppercase font-bold">Вартість</span>
                                    <p className="font-bold text-xl text-primary">${service.price}</p>
                                </div>
                                
                                <Link 
                                    to={`/services/${service.id}`} 
                                    className="bg-gray-100 text-gray-700 hover:bg-secondary hover:text-white px-5 py-2 rounded-lg font-medium transition duration-300"
                                >
                                    Деталі
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-3 text-center text-gray-500">Послуг поки що немає.</p>
                )}
            </div>
        </div>
    );
}