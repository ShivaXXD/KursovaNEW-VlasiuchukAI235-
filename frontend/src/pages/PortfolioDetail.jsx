import { useParams, Link, Navigate } from 'react-router-dom';

export default function PortfolioDetail() {
    const { id } = useParams();

    // Розширена база даних з деталями
    const projectsDB = {
        1: {
            title: 'Аналіз ринку для "TechStart"',
            category: 'Стратегія / Аналітика',
            client: 'TechStart Inc. (SaaS Startup)',
            industry: 'FinTech',
            duration: '3 місяці',

            // Основна історія
            about: 'TechStart розробляли інноваційну платформу для управління особистими фінансами, але не мали чіткого розуміння своєї цільової аудиторії. Вони ризикували витратити весь бюджет на маркетинг "для всіх", не отримавши реальних користувачів.',

            challenge: 'Клієнт мав лише гіпотези. Потрібно було перетворити здогадки на факти: визначити портрет клієнта, проаналізувати 12 прямих конкурентів у США та Європі, а також розрахувати Unit Economics.',

            solution: 'Ми застосували методологію CustDev. Наша команда провела 50 глибинних інтерв\'ю з потенційними користувачами. Ми використали інструменти SimilarWeb та Ahrefs для "розвідки" трафіку конкурентів та побудували фінансову модель на 3 роки.',

            // Інструменти
            technologies: ['SWOT Analysis', 'PESTEL', 'Figma (Prototyping)', 'Excel Modeling', 'SimilarWeb', 'Google Trends'],

            // Команда
            team: ['Анна К. (Lead Strategist)', 'Марк З. (Financial Analyst)', 'Олена В. (UX Researcher)'],

            // Результати
            stats: [
                { label: 'Зекономлено бюджету', value: '40%', desc: 'Завдяки відмові від нерентабельних каналів', color: 'bg-green-500' },
                { label: 'Залучено інвестицій', value: '$200k', desc: 'Pre-seed раунд від ангельських інвесторів', color: 'bg-blue-500' },
                { label: 'CAC (Вартість клієнта)', value: '-15%', desc: 'Зниження прогнозованої вартості залучення', color: 'bg-purple-500' },
            ],

            // Цитата клієнта
            quote: {
                text: "Звіт Apex Strategies став нашою настільною книгою. Інвестори були вражені глибиною пропрацювання ринку. Це найкраща інвестиція на старті.",
                author: "Джон Доу, CEO TechStart"
            },

            timeline: [
                { date: 'Січень 2024', event: 'Кік-офф зустріч та брифінг' },
                { date: 'Лютий 2024', event: 'Проведення 50 інтерв\'ю (CustDev)' },
                { date: 'Березень 2024', event: 'Фінансове моделювання та аналіз конкурентів' },
                { date: 'Квітень 2024', event: 'Фінальна презентація та отримання інвестицій' },
            ],
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'
        },
        2: {
            title: 'SEO-оптимізація "FashionHub"',
            category: 'Digital Marketing / SEO',
            client: 'FashionHub (E-commerce)',
            industry: 'Fashion Retail',
            duration: '6 місяців',

            about: 'Великий інтернет-магазин одягу втрачав позиції у Google після невдалого оновлення сайту. Органічний трафік впав на 40%, продажі залежали виключно від дорогої контекстної реклами.',

            challenge: 'Сайт мав критичні технічні помилки: повільне завантаження, дублі сторінок, відсутність мета-тегів. Конкуренти займали ТОП-3 по всім комерційним запитам.',

            solution: 'Ми провели повний технічний аудит. Виправили помилки Core Web Vitals, оптимізували структуру категорій, впровадили мікророзмітку Schema.org та запустили контент-маркетинг для блогу.',

            technologies: ['Google Search Console', 'Ahrefs', 'Screaming Frog', 'Semrush', 'Google Analytics 4'],

            team: ['Олег П. (Head of SEO)', 'Ірина С. (Content Manager)', 'Дмитро К. (Technical Lead)'],

            stats: [
                { label: 'Ріст трафіку', value: '+65%', desc: 'Органічний трафік за півроку', color: 'bg-green-500' },
                { label: 'ТОП-3 Google', value: '150+', desc: 'Ключових слів у топі', color: 'bg-yellow-500' },
                { label: 'ROI', value: '300%', desc: 'Окупність інвестицій в SEO', color: 'bg-red-500' },
            ],

            quote: {
                text: "Ми не очікували такого швидкого результату. Вже на третій місяць ми почали отримувати стабільні замовлення з пошуку, не витрачаючи ні копійки на кліки.",
                author: "Марія К., Marketing Director FashionHub"
            },

            timeline: [
                { date: 'Травень 2024', event: 'Глибокий технічний аудит' },
                { date: 'Червень 2024', event: 'Виправлення технічних помилок' },
                { date: 'Липень 2024', event: 'Оптимізація контенту та лінкбілдінг' },
                { date: 'Серпень 2024', event: 'Зріст позицій та трафіку' },
            ],
            image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=1200'
        },
        3: {
            title: 'Цифрова трансформація "LogiTrans"',
            category: 'Операційний менеджмент / IT',
            client: 'LogiTrans Logistics Group',
            industry: 'Транспорт та Логістика',
            duration: '8 місяців',

            about: 'LogiTrans — національний логістичний оператор з парком у 500+ вантажівок. Компанія зіткнулася з кризою масштабування: при зростанні кількості замовлень старі методи управління (Excel, дзвінки) призвели до колапсу.',

            challenge: 'Втрата 15% замовлень через "людський фактор". Диспетчери витрачали 4 години на день на ручне складання маршрутів. Відсутність прозорості: клієнти не знали, де їхній вантаж.',

            solution: 'Ми відмовилися від коробкових рішень і розробили кастомну ERP-систему. Впровадили GPS-трекінг для всього автопарку, створили мобільний додаток для водіїв та кабінет клієнта для відстеження вантажів у реальному часі.',

            technologies: ['Odoo ERP', 'IoT (GPS Sensors)', 'React Native (Driver App)', 'PostgreSQL', 'Google Maps API'],

            team: ['Сергій В. (System Architect)', 'Дмитро К. (Backend Lead)', 'Анна К. (Business Process Analyst)'],

            stats: [
                { label: 'Швидкість обробки', value: '+300%', desc: 'Автоматичний розподіл заявок', color: 'bg-blue-600' },
                { label: 'Витрати на пальне', value: '-18%', desc: 'Завдяки оптимізації маршрутів', color: 'bg-green-600' },
                { label: 'Втрачені вантажі', value: '0%', desc: 'Повний контроль геолокації', color: 'bg-purple-600' },
            ],

            quote: {
                text: "Раніше ми тонули в паперах. Тепер я бачу рух кожної машини на екрані планшета. Це не просто програма, це нова нервова система нашої компанії.",
                author: "Віктор Б., Операційний директор LogiTrans"
            },

            timeline: [
                { date: 'Лютий 2024', event: 'Аудит бізнес-процесів та ТЗ' },
                { date: 'Квітень 2024', event: 'Реліз MVP (диспетчерська панель)' },
                { date: 'Червень 2024', event: 'Інтеграція GPS-трекерів' },
                { date: 'Вересень 2024', event: 'Запуск мобільного додатку водія' },
            ],
            // Фото: Склад, логістика, технологічність
            image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200'
        },
        4: {
            title: 'Бренд-стратегія для "EcoLife"',
            category: 'Брендинг / FMCG',
            client: 'EcoLife (Green Innovations)',
            industry: 'Товари для дому / Еко',
            duration: '4 місяці',

            about: 'Виробник органічної побутової хімії планував вихід на висококонкурентні ринки Німеччини та Франції. Продукт був якісним, але упаковка виглядала "дешево" і губилася на полицях поруч з гігантами індустрії.',

            challenge: 'Подолати скептицизм європейців до нових брендів ("greenwashing"). Створити преміальний образ, зберігши доступну ціну. Розробити упаковку, що відповідає суворим еко-стандартам ЄС.',

            solution: 'Ми розробили концепцію "Radical Transparency". Дизайн упаковки став мінімалістичним, з акцентом на складі продукту. Розробили унікальну форму пляшки з переробленого пластику та комунікаційну кампанію "Чесність — це чисто".',

            technologies: ['Adobe Illustrator', 'Cinema 4D (Packaging Render)', 'Focus Groups', 'Market Semiotics'],

            team: ['Катерина Л. (Art Director)', 'Павло О. (Brand Strategist)', 'Ірина С. (Copywriter)'],

            stats: [
                { label: 'Точки продажу', value: '200+', desc: 'Контракти з рітейлерами за 3 міс.', color: 'bg-green-500' },
                { label: 'Instagram', value: '50k', desc: 'Підписників до старту продажів', color: 'bg-pink-500' },
                { label: 'Впізнаваність', value: 'Top-5', desc: 'У категорії "Eco-Friendly" на Amazon', color: 'bg-yellow-500' },
            ],

            quote: {
                text: "Дизайн, який розробила команда Apex, відкрив нам двері до великих європейських мереж. Байєри казали «Так», просто побачивши наш бренд-бук.",
                author: "Ольга М., Засновниця EcoLife"
            },

            timeline: [
                { date: 'Березень 2024', event: 'Дослідження візуальних кодів ринку ЄС' },
                { date: 'Квітень 2024', event: 'Розробка айдентики та логотипу' },
                { date: 'Травень 2024', event: 'Дизайн упаковки та 3D-рендерінг' },
                { date: 'Липень 2024', event: 'Старт продажів у Берліні' },
            ],
            // Фото: Чистота, екологія, естетика
            image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200'
        }
    };

    const project = projectsDB[id];

    if (!project) return <Navigate to="/portfolio" />;

    return (
        <div className="bg-white min-h-screen pb-20 font-sans">
            {/* Hero Image Parallax-like */}
            <div className="h-[50vh] w-full overflow-hidden relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover fixed-img" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 flex flex-col justify-end pb-12 items-center">
                    <span className="text-secondary font-bold tracking-widest uppercase mb-2">{project.category}</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4 max-w-4xl leading-tight">{project.title}</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-10">
                <div className="bg-white rounded-t-3xl shadow-2xl overflow-hidden">

                    {/* Project Info Bar */}
                    <div className="bg-gray-50 border-b p-6 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                        <div>
                            <span className="block text-gray-400 font-bold uppercase mb-1">Клієнт</span>
                            <span className="font-semibold text-gray-800 text-lg">{project.client}</span>
                        </div>
                        <div>
                            <span className="block text-gray-400 font-bold uppercase mb-1">Індустрія</span>
                            <span className="font-semibold text-gray-800 text-lg">{project.industry}</span>
                        </div>
                        <div>
                            <span className="block text-gray-400 font-bold uppercase mb-1">Тривалість</span>
                            <span className="font-semibold text-gray-800 text-lg">{project.duration}</span>
                        </div>
                        <div>
                            <span className="block text-gray-400 font-bold uppercase mb-1">Роль</span>
                            <span className="font-semibold text-gray-800 text-lg">Комплексний консалтинг</span>
                        </div>
                    </div>

                    <div className="p-8 md:p-16 max-w-5xl mx-auto">

                        {/* About Section */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold mb-6 text-gray-900">Про проект</h2>
                            <p className="text-xl text-gray-600 leading-relaxed font-light">
                                {project.about}
                            </p>
                        </div>

                        {/* Challenge & Solution Grid */}
                        <div className="grid md:grid-cols-2 gap-12 mb-16">
                            <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                                <h3 className="font-bold text-2xl mb-4 text-red-600 flex items-center gap-2">
                                    <span>🎯</span> Виклик
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-lg">{project.challenge}</p>
                            </div>
                            <div className="bg-green-50 p-8 rounded-2xl border border-green-100">
                                <h3 className="font-bold text-2xl mb-4 text-green-600 flex items-center gap-2">
                                    <span>💡</span> Рішення
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-lg">{project.solution}</p>
                            </div>
                        </div>

                        {/* Technologies & Team */}
                        <div className="grid md:grid-cols-2 gap-12 mb-16">
                            <div>
                                <h3 className="font-bold text-xl mb-4">🛠️ Технологічний стек</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies?.map((tech, i) => (
                                        <span key={i} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-200">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-4">👥 Команда проекту</h3>
                                <ul className="space-y-2">
                                    {project.team?.map((member, i) => (
                                        <li key={i} className="flex items-center gap-2 text-gray-700">
                                            <div className="w-2 h-2 bg-secondary rounded-full"></div>
                                            {member}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="mb-16">
                            <h3 className="font-bold text-2xl mb-8 text-center">Результати в цифрах</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                {project.stats.map((stat, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center transform hover:-translate-y-2 transition duration-300">
                                        <div className={`w-16 h-16 mx-auto ${stat.color} bg-opacity-10 rounded-full flex items-center justify-center mb-4`}>
                                            <div className={`w-3 h-3 ${stat.color} rounded-full`}></div>
                                        </div>
                                        <div className={`text-4xl font-extrabold ${stat.color.replace('bg-', 'text-')} mb-2`}>
                                            {stat.value}
                                        </div>
                                        <div className="font-bold text-gray-800 text-lg mb-1">{stat.label}</div>
                                        <div className="text-sm text-gray-500">{stat.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Testimonial */}
                        {project.quote && (
                            <div className="mb-16 relative">
                                <div className="absolute -top-6 -left-4 text-6xl text-gray-200 font-serif">"</div>
                                <blockquote className="bg-gray-50 p-8 rounded-r-2xl border-l-4 border-secondary italic text-xl text-gray-700 relative z-10">
                                    {project.quote.text}
                                    <footer className="mt-4 text-base not-italic font-bold text-gray-900">
                                        — {project.quote.author}
                                    </footer>
                                </blockquote>
                            </div>
                        )}

                        {/* Timeline */}
                        <div>
                            <h3 className="font-bold text-2xl mb-8">Хронологія успіху</h3>
                            <div className="space-y-0">
                                {project.timeline.map((item, idx) => (
                                    <div key={idx} className="flex group">
                                        <div className="w-24 flex-shrink-0 text-right pr-6 pt-2">
                                            <span className="font-bold text-sm text-gray-400 group-hover:text-primary transition">{item.date}</span>
                                        </div>
                                        <div className="border-l-2 border-gray-200 pl-8 pb-10 relative">
                                            <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-white border-4 border-gray-300 group-hover:border-primary transition"></div>
                                            <h4 className="font-bold text-lg text-gray-800">{item.event}</h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t text-center">
                            <Link to="/portfolio" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition font-medium text-lg">
                                ← Повернутися до всіх проектів
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}