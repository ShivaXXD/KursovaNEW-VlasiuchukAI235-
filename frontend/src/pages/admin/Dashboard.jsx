import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [ordersRes, messagesRes] = await Promise.all([
                api.get('/orders'),
                api.get('/messages')
            ]);
            setOrders(ordersRes.data);
            setMessages(messagesRes.data);
        } catch (error) {
            console.error("Помилка завантаження даних:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleOrderStatus = async (id) => {
        try {
            await api.patch(`/orders/${id}/toggle`);
            setOrders(prevOrders => prevOrders.map(order =>
                order.id === id ? { ...order, is_processed: !order.is_processed } : order
            ));
        } catch (error) {
            console.error("Помилка зміни статусу:", error);
        }
    };

    const toggleMessageStatus = async (id) => {
        try {
            await api.patch(`/messages/${id}/toggle`);
            setMessages(prevMessages => prevMessages.map(msg =>
                msg.id === id ? { ...msg, is_processed: !msg.is_processed } : msg
            ));
        } catch (error) {
            console.error("Помилка зміни статусу:", error);
        }
    };

    const deleteOrder = async (id) => {
        if (window.confirm('Видалити це замовлення?')) {
            try {
                await api.delete(`/orders/${id}`);
                setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
            } catch (error) {
                console.error("Помилка видалення:", error);
            }
        }
    };

    const deleteMessage = async (id) => {
        if (window.confirm('Видалити це повідомлення?')) {
            try {
                await api.delete(`/messages/${id}`);
                setMessages(prev => prev.filter(msg => msg.id !== id));
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (loading) return <div>Завантаження...</div>;

    return (
        <div>
            {/* Блок Замовлень */}
            <section className="mb-10 bg-white p-6 rounded shadow">
                <h3 className="text-xl font-bold mb-4">Останні замовлення</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-3">ID</th>
                                <th className="p-3">Клієнт</th>
                                <th className="p-3">Послуга</th>
                                <th className="p-3">Сума</th>
                                <th className="p-3">Статус</th>
                                <th className="p-3">Дії</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 && <tr><td colSpan="6" className="p-3 text-center">Замовлень немає</td></tr>}
                            {orders.map(order => (
                                <tr key={order.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">#{order.id}</td>
                                    <td className="p-3">
                                        <div className="font-bold">{order.customer_name}</div>
                                        <div className="text-sm text-gray-500">{order.customer_email}</div>
                                    </td>
                                    <td className="p-3">{order.service_name}</td>
                                    <td className="p-3">${order.service_price}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => toggleOrderStatus(order.id)}
                                            className={`px-3 py-1 rounded text-sm ${order.is_processed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                                        >
                                            {order.is_processed ? 'Виконано' : 'В обробці'}
                                        </button>
                                    </td>
                                    <td className="p-3">
                                        <button onClick={() => deleteOrder(order.id)} className="text-red-500 hover:text-red-700">Видалити</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Блок Повідомлень */}
            <section className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-bold mb-4">Повідомлення</h3>
                <ul>
                    {messages.map(msg => (
                        <li key={msg.id} className="border-b py-4 flex justify-between items-start">
                            <div>
                                <p className="font-bold">{msg.sender_name} <span className="text-gray-400 font-normal text-sm">({msg.sender_email})</span></p>
                                <p className="mt-1 text-gray-700">{msg.message_text}</p>
                            </div>
                            <div className="flex gap-2 items-center">                                <button
                                onClick={() => toggleMessageStatus(msg.id)}
                                className={`text-sm ${msg.is_processed ? 'text-green-600' : 'text-blue-600'}`}
                            >
                                {msg.is_processed ? '✅ Оброблено' : '🔘 Відмітити'}
                            </button>
                                <button
                                    onClick={() => deleteMessage(msg.id)}
                                    className="text-red-500 hover:text-red-700 text-lg px-2"
                                    title="Видалити"
                                >
                                    🗑️
                                </button>
                            </div>
                        </li>
                    ))}
                    {messages.length === 0 && <p className="text-gray-500">Повідомлень немає</p>}
                </ul>
            </section>
        </div>
    );
}