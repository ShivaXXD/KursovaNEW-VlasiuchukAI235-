<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamSeeder extends Seeder
{
    public function run(): void
    {
        // Очищаємо таблицю перед заповненням, щоб не було дублікатів
        DB::table('team')->truncate();

        $members = [
            [
                'name' => 'Анна Ковальчук',
                'role_short' => 'Lead Strategist',
                'role_full' => 'Провідний стратег / Business Analyst',
                'photo_url' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
                'bio_short' => 'Експерт з дослідження ринків та бізнес-аналізу. Керувала стратегією для TechStart.',
                'bio_full' => 'Анна має 10-річний досвід у консалтингу. Вона спеціалізується на виявленні прихованих можливостей для росту бізнесу. Саме її стратегічне бачення допомогло багатьом стартапам залучити перші інвестиції.',
                'competencies' => json_encode(['SWOT Analysis', 'Market Research', 'CustDev', 'BPMN 2.0', 'Strategic Planning']),
            ],
            [
                'name' => 'Марк Захаренко',
                'role_short' => 'Financial Analyst',
                'role_full' => 'Старший фінансовий аналітик',
                'photo_url' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
                'bio_short' => 'Майстер фінансового моделювання та Unit Economics.',
                'bio_full' => 'Марк відповідає за цифри. Він вміє будувати складні фінансові моделі, які показують реальний стан бізнесу. Його розрахунки стали основою для успішного фандрейзингу клієнта TechStart.',
                'competencies' => json_encode(['Financial Modeling', 'Excel / Google Sheets', 'Unit Economics', 'Risk Management', 'Investing']),
            ],
            [
                'name' => 'Олена Василенко',
                'role_short' => 'UX Researcher',
                'role_full' => 'Керівник відділу UX досліджень',
                'photo_url' => 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
                'bio_short' => 'Розуміє користувачів краще, ніж вони самі себе.',
                'bio_full' => 'Олена провела сотні глибинних інтерв\'ю. Її інсайти допомагають створювати продукти, які дійсно потрібні людям. Працювала над покращенням досвіду користувачів у проекті TechStart.',
                'competencies' => json_encode(['User Interviews', 'Usability Testing', 'Persona Creation', 'CJM', 'Figma']),
            ],
            [
                'name' => 'Олег Петренко',
                'role_short' => 'Head of SEO',
                'role_full' => 'Керівник SEO департаменту',
                'photo_url' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
                'bio_short' => 'Виводить сайти в ТОП Google. Кейс FashionHub — його гордість.',
                'bio_full' => 'Олег знає про алгоритми пошукових систем усе. Він спеціалізується на технічному SEO та роботі з великими e-commerce проектами. Збільшив трафік FashionHub на 65%.',
                'competencies' => json_encode(['Technical SEO', 'Ahrefs / Semrush', 'Google Search Console', 'Link Building', 'SEO Audit']),
            ],
            [
                'name' => 'Ірина Сидоренко',
                'role_short' => 'Content Manager',
                'role_full' => 'Senior Content Manager & Copywriter',
                'photo_url' => 'https://images.unsplash.com/photo-1598550874175-4d7112ee7f64?auto=format&fit=crop&q=80&w=400',
                'bio_short' => 'Створює контент, який продає.',
                'bio_full' => 'Ірина відповідає за tone-of-voice брендів. Вона керувала контент-стратегією для FashionHub, перетворюючи сухі описи товарів на історії, що спонукають до покупки.',
                'competencies' => json_encode(['Copywriting', 'Content Strategy', 'Storytelling', 'Social Media', 'Editing']),
            ],
            [
                'name' => 'Дмитро Кравченко',
                'role_short' => 'Technical Lead',
                'role_full' => 'Full Stack Developer / Tech Lead',
                'photo_url' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
                'bio_short' => 'Відповідає за технічну реалізацію та стабільність.',
                'bio_full' => 'Дмитро керує командою розробки. Він забезпечував технічну оптимізацію для FashionHub, значно прискоривши роботу сайту, що позитивно вплинуло на SEO.',
                'competencies' => json_encode(['PHP / Laravel', 'React.js', 'Server Administration', 'Database Optimization', 'System Architecture']),
            ],
            [
                'name' => 'Сергій Волков',
                'role_short' => 'Integration Specialist',
                'role_full' => 'Спеціаліст з інтеграцій CRM/ERP',
                'photo_url' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
                'bio_short' => 'Автоматизує хаос. Працював над проектом LogiTrans.',
                'bio_full' => 'Сергій — майстер налаштування бізнес-процесів. Він інтегрував складні системи обліку для логістичної компанії, зменшивши кількість помилок персоналу на 90%.',
                'competencies' => json_encode(['Salesforce', 'API Integrations', 'Zapier / Make', 'Automation', 'Python']),
            ],
            [
                'name' => 'Катерина Лисенко',
                'role_short' => 'Art Director',
                'role_full' => 'Арт-директор та Бренд-дизайнер',
                'photo_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
                'bio_short' => 'Візуалізує сенси. Створила стиль для EcoLife.',
                'bio_full' => 'Катерина має винятковий смак. Вона розробила візуальну ідентичність для бренду EcoLife, яка дозволила їм успішно вийти на європейський ринок.',
                'competencies' => json_encode(['Adobe Creative Suite', 'Brand Identity', 'Packaging Design', 'Typography', 'Visual Strategy']),
            ],
            [
                'name' => 'Павло Олійник',
                'role_short' => 'Brand Manager',
                'role_full' => 'Бренд-менеджер',
                'photo_url' => 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
                'bio_short' => 'Будує сильні бренди та комунікацію.',
                'bio_full' => 'Павло знає, як закохати споживача в продукт. Разом з Катериною працював над запуском EcoLife, відповідаючи за стратегію позиціонування.',
                'competencies' => json_encode(['Brand Strategy', 'Marketing Communications', 'PR', 'Market Analysis', 'Events']),
            ],
        ];

        DB::table('team')->insert($members);
    }
}