import { Outlet, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../hook/useAuth';
import Loading from './Loading';

const ProtectedRoute = ({ role = '' }) => {
    const { isLoggedIn, isChecking, isDev } = useAuth();

    if (isChecking) {
        <Loading />;
    }

    // only for visitor
    if (role === 'guest' && isLoggedIn) {
        return <Navigate to="/?toast=loginOk" />;
    }
    // only if connected
    if (role === 'logged' && !isLoggedIn) {
        return <Navigate to="/login?toast=expired" />;
    }
    // only if dev
    if (role === 'developer') {
        if (!isDev) {
            return <Navigate to="/?toast=unauthorized" />;
        }
    }

    return <Outlet />;
};

ProtectedRoute.propTypes = {
    role: PropTypes.string,
};

export default ProtectedRoute;
