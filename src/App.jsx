import Homepage from './pages/home';
import LoginPage from './components/LoginSection/LoginSection';
import Register from './components/RegisterSection/registerSection';
import Dashboard from './pages/dashboard';
import RecentTransactions from './components/RecentTransections/recentTransection';
import Insights from './components/Insigts/insights';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recent-transactions" element={<RecentTransactions />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;