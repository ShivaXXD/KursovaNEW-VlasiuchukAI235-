import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Сторінки публічні
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Team from './pages/Team';
import Contact from './pages/Contact'; // Сторінка замовлення
import Login from './pages/Login';
import Portfolio from './pages/Portfolio';
import Checkout from './pages/Checkout';
import Receipt from './pages/Receipt';
import PortfolioDetail from './pages/PortfolioDetail';

// Сторінки адмінські
import Dashboard from './pages/admin/Dashboard';
import ServiceIndex from './pages/admin/ServiceIndex';
import ServiceForm from './pages/admin/ServiceForm';
import TeamIndex from './pages/admin/TeamIndex';
import TeamForm from './pages/admin/TeamForm';

function App() {
  return (
    <Routes>
      {/* ПУБЛІЧНІ МАРШРУТИ */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:id" element={<ServiceDetail />} />
        <Route path="team" element={<Team />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="receipt" element={<Receipt />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="portfolio/:id" element={<PortfolioDetail />} />
        
        {/* Сторінка замовлення */}
        <Route path="contact" element={<Contact />} />
        
        <Route path="login" element={<Login />} />
      </Route>

      {/* АДМІНСЬКІ МАРШРУТИ */}
      <Route path="/admin" element={<AdminLayout />}>
         <Route index element={<Dashboard />} />
         <Route path="team" element={<TeamIndex />} />
         <Route path="team/create" element={<TeamForm />} />
         <Route path="team/:id/edit" element={<TeamForm />} />
         
         {/* Керування послугами */}
         <Route path="services" element={<ServiceIndex />} />
         <Route path="services/create" element={<ServiceForm />} />
         <Route path="services/:id/edit" element={<ServiceForm />} />
         
         {/* Керування командою (залишаємо як placeholder для самостійної роботи, принцип той самий) */}
         <Route path="team" element={<div className="p-4">Тут керування командою</div>} />
      </Route>
    </Routes>
  );
}

export default App;