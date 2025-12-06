import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Checkout() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Автозаповнення з URL
    const serviceName = searchParams.get('service') || '';
    const servicePrice = searchParams.get('price') || '';

    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        card_number: '',
        card_expiry: '',
        card_cvv: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Обробка введення картки
    const handleCardInput = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Тільки цифри
        if (value.length > 16) value = value.slice(0, 16); // Макс 16
        setFormData({ ...formData, card_number: value });
    };

    // Обробка дати (MM/YY)
    const handleExpiryInput = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Тільки цифри
        
        if (value.length >= 2) {
            // Перевірка місяця > 12
            const month = parseInt(value.substring(0, 2));
            if (month > 12) value = '12' + value.substring(2);
            if (month === 0) value = '01' + value.substring(2);
        }

        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        
        setFormData({ ...formData, card_expiry: value });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (formData.card_number.length !== 16) newErrors.card_number = "Номер картки має містити 16 цифр";
        if (formData.card_expiry.length !== 5) newErrors.card_expiry = "Формат ММ/РР";
        if (formData.card_cvv.length < 3) newErrors.card_cvv = "Мінімум 3 цифри";
        if (!formData.customer_name) newErrors.customer_name = "Введіть ім'я";
        if (!formData.customer_email.includes('@')) newErrors.customer_email = "Невірний email";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            // Відправляємо замовлення
            const response = await api.post('/orders', {
                customer_name: formData.customer_name,
                customer_email: formData.customer_email,
                service_name: serviceName,
                service_price: servicePrice
            });

            // Перенаправляємо на чек, передаючи дані замовлення
            navigate('/receipt', { state: { order: response.data } });

        } catch (error) {
            alert('Помилка оплати. Спробуйте ще раз.');
            setIsSubmitting(false);
        }
    };

    // Якщо немає послуги в URL, повертаємо на вибір послуг
    if (!serviceName) {
        return (
            <div className="text-center mt-20">
                <p>Оберіть послугу для замовлення.</p>
                <button onClick={() => navigate('/services')} className="text-blue-500 underline">До послуг</button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-2xl">
            <h1 className="text-3xl font-bold text-center mb-8">Оплата замовлення</h1>
            
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
                {/* Блок Послуги (Read Only) */}
                <div className="bg-gray-50 p-4 rounded mb-6 border">
                    <h2 className="text-lg font-bold text-gray-700">Обрана послуга:</h2>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-xl">{serviceName}</span>
                        <span className="text-2xl font-bold text-green-600">${servicePrice}</span>
                    </div>
                </div>

                {/* Блок Контактів */}
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-bold mb-1">Ваше Ім'я</label>
                        <input type="text" name="customer_name" value={formData.customer_name} onChange={handleChange} 
                            className={`w-full p-3 border rounded ${errors.customer_name ? 'border-red-500' : ''}`} placeholder="Іван Іванов" />
                        {errors.customer_name && <p className="text-red-500 text-sm">{errors.customer_name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Email</label>
                        <input type="email" name="customer_email" value={formData.customer_email} onChange={handleChange} 
                            className={`w-full p-3 border rounded ${errors.customer_email ? 'border-red-500' : ''}`} placeholder="ivan@mail.com" />
                         {errors.customer_email && <p className="text-red-500 text-sm">{errors.customer_email}</p>}
                    </div>
                </div>

                {/* Блок Картки */}
                <div className="bg-gray-50 p-4 rounded border mb-6">
                    <h3 className="font-bold mb-3 text-gray-700">Банківська картка</h3>
                    <div className="mb-4">
                        <label className="block text-xs uppercase text-gray-500 mb-1">Номер картки</label>
                        <input type="text" value={formData.card_number} onChange={handleCardInput} 
                            className={`w-full p-3 border rounded font-mono text-lg ${errors.card_number ? 'border-red-500' : ''}`} 
                            placeholder="0000 0000 0000 0000" />
                        {errors.card_number && <p className="text-red-500 text-sm">{errors.card_number}</p>}
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-xs uppercase text-gray-500 mb-1">Термін (ММ/РР)</label>
                            <input type="text" value={formData.card_expiry} onChange={handleExpiryInput} 
                                className={`w-full p-3 border rounded font-mono text-center ${errors.card_expiry ? 'border-red-500' : ''}`} 
                                placeholder="MM/YY" maxLength="5" />
                             {errors.card_expiry && <p className="text-red-500 text-sm">{errors.card_expiry}</p>}
                        </div>
                        <div className="w-1/2">
                            <label className="block text-xs uppercase text-gray-500 mb-1">CVV</label>
                            <input type="password" name="card_cvv" value={formData.card_cvv} onChange={handleChange} maxLength="3"
                                className={`w-full p-3 border rounded font-mono text-center ${errors.card_cvv ? 'border-red-500' : ''}`} 
                                placeholder="***" />
                             {errors.card_cvv && <p className="text-red-500 text-sm">{errors.card_cvv}</p>}
                        </div>
                    </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-secondary text-white py-4 rounded-lg text-xl font-bold hover:bg-green-700 transition shadow-lg transform active:scale-95">
                    {isSubmitting ? 'Обробка...' : `Сплатити $${servicePrice}`}
                </button>
            </form>
        </div>
    );
}