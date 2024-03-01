import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'src/sections/user/useAuth';

const ProtectedRoute = ({ element, ...rest }) => {
  const auth = useAuth();
  
  console.log("ProtectedRoute - isAuthenticated:", auth.isAuthenticated());
  console.log("ProtectedRoute - element:", element);

  return auth.isAuthenticated() ? element : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
