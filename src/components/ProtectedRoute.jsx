import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isDeveloper, isLoggedIn } from '../utils/userStatus';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ role = '' }) => {
    const userData = useSelector((state) => state.user.userData);

    // only for visitor
    if (role === 'guest' && isLoggedIn()) {
        return <Navigate to="/?toast=loginOk" />;
    }
    // only if connected
    if (role === 'logged' && !isLoggedIn()) {
        return <Navigate to="/login?toast=expired" />;
    }
    // only if dev
    if (role === 'developer') {
        if (!isLoggedIn()) {
            return <Navigate to="/login?toast=expired" />;
        }
        if (!isDeveloper(userData)) {
            return <Navigate to="/?toast=unauthorized" />;
        }
    }

    return <Outlet />;
};

ProtectedRoute.propTypes = {
    role: PropTypes.string,
};

export default ProtectedRoute;
