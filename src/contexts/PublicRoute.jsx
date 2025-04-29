import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
  const userData = localStorage.getItem('userData');
  const isAuthenticated = userData ? JSON.parse(userData) : null;
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

export default PublicRoute;
