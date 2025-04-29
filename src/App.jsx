import Homepage from './pages/home';
import LoginPage from './components/LoginSection/LoginSection';
import Register from './components/RegisterSection/registerSection';
import Dashboard from './pages/dashboard';
import RecentTransactions from './components/RecentTransections/recentTransection';
import Insights from './components/Insigts/insights';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './contexts/ProtectedRoute';
import PublicRoute from './contexts/PublicRoute';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/footer';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } />
              <Route path="/register" element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/expenses" element={
                <ProtectedRoute>
                  <RecentTransactions />
                </ProtectedRoute>
              } />
              <Route path="/insights" element={
                <ProtectedRoute>
                  <Insights />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;