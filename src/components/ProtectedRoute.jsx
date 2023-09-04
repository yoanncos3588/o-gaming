import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isDeveloper, isLoggedIn } from '../utils/userStatus';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ role = '' }) => {
    const userData = useSelector((state) => state.user.userData);

    // only for visitor
    if (role === 'guest' && isLoggedIn()) {
        return <Navigate to="/" />;
    }
    // only if connected
    if (role === 'logged' && !isLoggedIn()) {
        toast.error(
            'You are not connected or your session has expired, please login',
            {
                autoClose: 2000,
                theme: 'colored',
                toastId: 'redirectLogin',
            }
        );
        return <Navigate to="/login" />;
    }
    // only if dev
    if (role === 'developer' && (!isLoggedIn() || !isDeveloper(userData))) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

ProtectedRoute.propTypes = {
    role: PropTypes.string,
};

export default ProtectedRoute;
