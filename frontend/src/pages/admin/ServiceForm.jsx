import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';

export default function ServiceForm() {
    const { id } = useParams(); // Якщо є ID, значить це редагування
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        icon: '📈',
        title: '',
        description_short: '',
        price: '',
        image_url: '',
        page_title: '',
        page_subtitle: '',
        page_description: '',
        page_features: [], // Масив рядків
        performer_name: '',
        performer_role: '',
        performer_photo_url: '',
        performer_bio: ''
    });

    const [featuresText, setFeaturesText] = useState(''); // Для textarea

    useEffect(() => {
        if (id) {
            api.get(`/services/${id}`).then(res => {
                setFormData(res.data);
                // Перетворюємо масив features назад в текст для textarea
                if (res.data.page_features) {
                    setFeaturesText(res.data.page_features.join('\n'));
                }
            });
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Формуємо правильний об'єкт для Laravel
        const payload = {
            ...formData,
            price: parseInt(formData.price), // Гарантуємо, що це число
            // Фільтруємо пусті рядки у features
            page_features: featuresText.split('\n').map(s => s.trim()).filter(line => line !== '')
        };

        try {
            if (id) {
                await api.put(`/services/${id}`, payload);
            } else {
                await api.post('/services', payload);
            }
            navigate('/admin/services');
        } catch (error) {
            console.error("Помилка збереження:", error.response?.data || error);
            // Виводимо деталі помилки, якщо вони є
            alert(`Помилка: ${error.response?.data?.message || 'Перевірте консоль'}`);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">{id ? 'Редагувати послугу' : 'Створити послугу'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Блок 1: Картка */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">Іконка (emoji)</label>
                        <input type="text" name="icon" value={formData.icon} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Назва</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold mb-1">Ціна ($)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-1">Короткий опис</label>
                    <textarea name="description_short" value={formData.description_short} onChange={handleChange} className="w-full border p-2 rounded" rows="2" required></textarea>
                </div>

                <hr className="my-4" />
                <h3 className="font-bold text-lg">Сторінка послуги</h3>

                <div>
                    <label className="block text-sm font-bold mb-1">URL картинки</label>
                    <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">Заголовок (H1)</label>
                        <input type="text" name="page_title" value={formData.page_title} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Підзаголовок</label>
                        <input type="text" name="page_subtitle" value={formData.page_subtitle} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold mb-1">Повний опис</label>
                    <textarea name="page_description" value={formData.page_description} onChange={handleChange} className="w-full border p-2 rounded" rows="4" required></textarea>
                </div>
                <div>
                    <label className="block text-sm font-bold mb-1">Особливості (кожна з нового рядка)</label>
                    <textarea value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} className="w-full border p-2 rounded" rows="5" placeholder="Аналіз ринку&#10;Стратегія&#10;Підтримка"></textarea>
                </div>

                <hr className="my-4" />
                <h3 className="font-bold text-lg">Виконавець</h3>
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">Ім'я</label>
                        <input type="text" name="performer_name" value={formData.performer_name} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Роль</label>
                        <input type="text" name="performer_role" value={formData.performer_role} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold mb-1">URL фото виконавця</label>
                    <input type="text" name="performer_photo_url" value={formData.performer_photo_url} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-bold mb-1">Біографія виконавця</label>
                    <textarea name="performer_bio" value={formData.performer_bio} onChange={handleChange} className="w-full border p-2 rounded" rows="3" required></textarea>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 mt-4">
                    {loading ? 'Збереження...' : 'Зберегти послугу'}
                </button>
            </form>
        </div>
    );
}