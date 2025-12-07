import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export default function TeamIndex() {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        loadTeam();
    }, []);

    const loadTeam = () => {
        api.get('/team').then(res => setTeam(res.data));
    };

    const handleDelete = async (id) => {
        if (window.confirm('Видалити цього співробітника?')) {
            await api.delete(`/team/${id}`);
            setTeam(prev => prev.filter(item => item.id !== id));
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Керування командою</h1>
                <Link to="/admin/team/create" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    + Додати співробітника
                </Link>
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4">Фото</th>
                            <th className="p-4">Ім'я</th>
                            <th className="p-4">Роль</th>
                            <th className="p-4">Дії</th>
                        </tr>
                    </thead>
                    <tbody>
                        {team.map(member => (
                            <tr key={member.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">
                                    <img src={member.photo_url} alt="" className="w-10 h-10 rounded-full object-cover"/>
                                </td>
                                <td className="p-4 font-bold">{member.name}</td>
                                <td className="p-4 text-gray-600">{member.role_short}</td>
                                <td className="p-4 space-x-2">
                                    <Link to={`/admin/team/${member.id}/edit`} className="text-blue-600 hover:underline">Редагувати</Link>
                                    <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:underline">Видалити</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}