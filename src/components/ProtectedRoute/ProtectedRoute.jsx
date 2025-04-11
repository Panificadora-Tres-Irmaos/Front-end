import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isRegistered = localStorage.getItem('registered');

  if (!isRegistered) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
