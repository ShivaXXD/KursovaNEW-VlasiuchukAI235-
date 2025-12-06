import { Link } from 'react-router-dom';

export default function Portfolio() {
    // Статичні дані проектів (оскільки бекенду для портфоліо немає)
    const projects = [
        {
            id: 1,
            title: 'Аналіз ринку для "TechStart"',
            category: 'Стратегія',
            description: 'Провели глибоке дослідження ринку для нового SaaS-продукту. Знайшли вільну нішу, що дозволило клієнту залучити $200k інвестицій.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500',
            result: '+200k інвестицій'
        },
        {
            id: 2,
            title: 'SEO-оптимізація "FashionHub"',
            category: 'Маркетинг',
            description: 'Комплексний аудит та оптимізація інтернет-магазину одягу. Вивели 15 категорій в ТОП-3 Google за 4 місяці.',
            image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=500',
            result: '+65% трафіку'
        },
        {
            id: 3,
            title: 'Реструктуризація "LogiTrans"',
            category: 'Менеджмент',
            description: 'Оптимізація бізнес-процесів логістичної компанії. Впровадили CRM та автоматизували документообіг.',
            image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=500',
            result: '-30% витрат'
        },
        {
            id: 4,
            title: 'Бренд-стратегія для "EcoLife"',
            category: 'Брендинг',
            description: 'Розробка позиціонування та візуального стилю для бренду еко-товарів. Успішний вихід на ринок ЄС.',
            image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=500',
            result: 'Вихід на ринок ЄС'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-4">Наше Портфоліо</h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Ми пишаємося результатами наших клієнтів. Ось кілька прикладів проектів, 
                де наша команда досягла значних успіхів.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
                {projects.map(project => (
                    <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition duration-300">
                        {/* Зображення проекту */}
                        <div className="relative h-64 overflow-hidden group">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                            />
                            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow">
                                {project.category}
                            </div>
                        </div>
                        
                        {/* Контент */}
                        <div className="p-8 flex-1 flex flex-col">
                            <h3 className="text-2xl font-bold mb-3 text-gray-800">{project.title}</h3>
                            <p className="text-gray-600 mb-6 flex-1 leading-relaxed">
                                {project.description}
                            </p>
                            
                            {/* Нижня частина: Результат + Кнопка */}
                            <div className="mt-auto pt-4 border-t flex justify-between items-center">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-500 uppercase font-bold">Результат:</span>
                                    <span className="text-xl font-bold text-green-600">{project.result}</span>
                                </div>
                                
                                {/* --- НОВЕ: Посилання на деталі --- */}
                                <Link 
                                    to={`/portfolio/${project.id}`} 
                                    className="text-primary font-semibold hover:underline flex items-center gap-1"
                                >
                                    Детальний кейс <span>→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}