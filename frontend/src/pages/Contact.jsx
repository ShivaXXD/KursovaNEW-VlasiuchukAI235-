import { useState } from 'react';
import api from '../api/axios';

export default function Contact() {
    const [formData, setFormData] = useState({ sender_name: '', sender_email: '', message_text: '' });
    const [status, setStatus] = useState(''); // 'success', 'error', ''

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/messages', formData);
            setStatus('success');
            setFormData({ sender_name: '', sender_email: '', message_text: '' });
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-12">Зв'яжіться з нами</h1>

            <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Ліва частина: Інформація */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Наші контакти</h2>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 p-3 rounded-full text-2xl">📍</div>
                            <div>
                                <h3 className="font-bold text-gray-700">Офіс</h3>
                                <p className="text-gray-600">м. Київ, вул. Хрещатик, 1 (Бізнес-центр "Apex")</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-full text-2xl">📞</div>
                            <div>
                                <h3 className="font-bold text-gray-700">Телефон</h3>
                                <p className="text-gray-600">+38 (099) 123-45-67</p>
                                <p className="text-sm text-gray-500">Пн-Пт: 9:00 - 18:00</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-yellow-100 p-3 rounded-full text-2xl">✉️</div>
                            <div>
                                <h3 className="font-bold text-gray-700">Email</h3>
                                <p className="text-gray-600">support@apex-strategies.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t pt-6">
                        <h3 className="font-bold mb-2">Ми на мапі:</h3>
                        <div className="rounded-lg overflow-hidden shadow-sm h-64">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.454954728527!2d30.52102831572522!3d50.45013797947541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce507c336b9b%3A0xc3f7336b28490212!2z0JzQsNC50LTQsNC9INCd0LXQt9Cw0LvQtdC20L3QvtGB0YI!5e0!3m2!1suk!2sua!4v1626084532903!5m2!1suk!2sua"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Google Map"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Права частина: Форма зв'язку */}
                <div className="bg-gray-50 p-8 rounded-xl shadow border">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Напишіть нам</h2>
                    <p className="mb-6 text-gray-600">Є запитання? Заповніть форму, і адміністратор отримає ваше повідомлення.</p>

                    {status === 'success' && (
                        <div className="bg-green-100 text-green-700 p-4 rounded mb-4 border border-green-200">
                            ✅ Повідомлення відправлено! Ми відповімо вам на Email.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-bold text-sm mb-1">Ваше ім'я</label>
                            <input
                                type="text"
                                value={formData.sender_name}
                                onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                                required
                                className="w-full p-3 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-sm mb-1">Email для відповіді</label>
                            <input
                                type="email"
                                value={formData.sender_email}
                                onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                                required
                                className="w-full p-3 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block font-bold text-sm mb-1">Повідомлення</label>
                            <textarea
                                rows="5"
                                value={formData.message_text}
                                onChange={(e) => setFormData({ ...formData, message_text: e.target.value })}
                                required
                                className="w-full p-3 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
                            ></textarea>
                        </div>
                        <button type="submit" className="w-full bg-primary text-white py-3 rounded font-bold hover:bg-blue-700 transition">
                            Надіслати повідомлення
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}