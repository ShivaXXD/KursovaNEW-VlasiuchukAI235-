import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';

export default function ServiceIndex() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = () => {
        api.get('/services').then(res => setServices(res.data));
    };

    const handleDelete = async (id) => {
        if (confirm('Видалити цю послугу?')) {
            await api.delete(`/services/${id}`);
            loadServices();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Керування послугами</h1>
                <Link to="/admin/services/create" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    + Додати послугу
                </Link>
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Назва</th>
                            <th className="p-4">Ціна</th>
                            <th className="p-4">Дії</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map(service => (
                            <tr key={service.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{service.id}</td>
                                <td className="p-4 font-bold">{service.title}</td>
                                <td className="p-4">${service.price}</td>
                                <td className="p-4 space-x-2">
                                    <Link to={`/admin/services/${service.id}/edit`} className="text-blue-600 hover:underline">Редагувати</Link>
                                    <button onClick={() => handleDelete(service.id)} className="text-red-600 hover:underline">Видалити</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}