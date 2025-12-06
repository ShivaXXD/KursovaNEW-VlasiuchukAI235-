import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Team() {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/team')
            .then(res => {
                setTeam(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Помилка завантаження команди:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-10">Завантаження...</div>;

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center mb-4">Наші Експерти</h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
                Наша сила – у команді. Кожен з наших консультантів є визнаним фахівцем у своїй галузі.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {team.map(member => (
                    <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col sm:flex-row">
                        {/* Фото */}
                        <div className="sm:w-1/3">
                            <img 
                                src={member.photo_url} 
                                alt={member.name} 
                                className="w-full h-full object-cover min-h-[250px]"
                            />
                        </div>
                        
                        {/* Інформація */}
                        <div className="p-6 sm:w-2/3 flex flex-col">
                            <h2 className="text-2xl font-bold text-gray-800">{member.name}</h2>
                            <p className="text-primary font-medium mb-3">{member.role_full}</p>
                            
                            <p className="text-gray-600 text-sm mb-4 flex-grow">
                                {member.bio_full}
                            </p>

                            <div>
                                <h3 className="font-bold text-gray-700 mb-2 text-sm uppercase">Компетенції:</h3>
                                <ul className="list-disc list-inside text-sm text-gray-600">
                                    {member.competencies && member.competencies.map((skill, i) => (
                                        <li key={i}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}