import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';

export default function TeamForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        role_short: '',
        role_full: '',
        photo_url: '',
        bio_short: '',
        bio_full: '',
        competencies: [] 
    });

    const [competenciesText, setCompetenciesText] = useState('');

    useEffect(() => {
        if (id) {
            api.get(`/team`).then(res => {
                const member = res.data.find(m => m.id === parseInt(id));
                if (member) {
                    setFormData(member);
                    if (member.competencies) {
                        setCompetenciesText(member.competencies.join('\n'));
                    }
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

        const payload = {
            ...formData,
            competencies: competenciesText.split('\n').map(s => s.trim()).filter(Boolean)
        };

        try {
            if (id) {
                await api.put(`/team/${id}`, payload);
            } else {
                await api.post('/team', payload);
            }
            navigate('/admin/team');
        } catch (error) {
            console.error(error);
            alert('Помилка збереження');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">{id ? 'Редагувати співробітника' : 'Додати співробітника'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">Ім'я</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">URL фото</label>
                        <input type="text" name="photo_url" value={formData.photo_url} onChange={handleChange} className="w-full border p-2 rounded" required />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">Коротка роль (для карток)</label>
                        <input type="text" name="role_short" value={formData.role_short} onChange={handleChange} className="w-full border p-2 rounded" placeholder="CEO" required />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Повна роль (для сторінки)</label>
                        <input type="text" name="role_full" value={formData.role_full} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Засновник та CEO" required />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Коротка біографія</label>
                    <textarea name="bio_short" value={formData.bio_short} onChange={handleChange} className="w-full border p-2 rounded" rows="2" required></textarea>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Повна біографія</label>
                    <textarea name="bio_full" value={formData.bio_full} onChange={handleChange} className="w-full border p-2 rounded" rows="5" required></textarea>
                </div>

                <div>
                    <label className="block text-sm font-bold mb-1">Компетенції (кожна з нового рядка)</label>
                    <textarea value={competenciesText} onChange={(e) => setCompetenciesText(e.target.value)} className="w-full border p-2 rounded" rows="4" placeholder="Менеджмент&#10;Маркетинг"></textarea>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 mt-4">
                    {loading ? 'Збереження...' : 'Зберегти'}
                </button>
            </form>
        </div>
    );
}