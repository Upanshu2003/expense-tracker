import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const userData = localStorage.getItem('userData');
  const isAuthenticated = userData ? JSON.parse(userData) : null;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

export default ProtectedRoute;
