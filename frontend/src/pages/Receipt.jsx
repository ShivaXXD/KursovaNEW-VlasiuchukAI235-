import { useLocation, Link, Navigate } from 'react-router-dom';

export default function Receipt() {
    const location = useLocation();
    const order = location.state?.order; // Отримуємо дані, передані при переході

    // Якщо хтось зайшов сюди напряму без замовлення — кидаємо на головну
    if (!order) {
        return <Navigate to="/" />;
    }

    const receiptNumber = `A-${String(order.id).padStart(6, '0')}`;
    const date = new Date().toLocaleString('uk-UA');

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full border-t-8 border-green-500">
                <div className="text-center mb-8">
                    <div className="text-6xl text-green-500 mb-2">✓</div>
                    <h1 className="text-3xl font-bold text-gray-800">Оплату успішно проведено!</h1>
                    <p className="text-gray-500">Дякуємо за довіру Apex Strategies</p>
                </div>

                <div className="border-t border-b border-dashed border-gray-300 py-6 space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Номер квитанції:</span>
                        <span className="font-mono font-bold">{receiptNumber}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Дата:</span>
                        <span className="font-bold">{date}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Платник:</span>
                        <span className="font-bold">{order.customer_name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span>{order.customer_email}</span>
                    </div>
                </div>

                <div className="py-6">
                    <div className="flex justify-between text-lg font-bold">
                        <span>Послуга:</span>
                        <span>{order.service_name}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-green-600 mt-2">
                        <span>Сума:</span>
                        <span>${order.service_price}</span>
                    </div>
                </div>

                <div className="flex gap-4 mt-4 print:hidden">
                    <button onClick={() => window.print()} className="flex-1 bg-gray-200 text-gray-800 py-3 rounded font-bold hover:bg-gray-300 transition">
                        🖨️ Друкувати
                    </button>
                    <Link to="/" className="flex-1 bg-primary text-white py-3 rounded font-bold text-center hover:bg-blue-600 transition">
                        На головну
                    </Link>
                </div>
            </div>
        </div>
    );
}