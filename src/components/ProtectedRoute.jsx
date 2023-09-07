import { Outlet, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isDeveloper, isLoggedIn } from '../utils/userStatus';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { isTokenExpired } from '../utils/token';
import { logout } from '../store/reducers/user';

const ProtectedRoute = ({ role = '' }) => {
    const userData = useSelector((state) => state.user.userData);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isTokenExpired()) {
            dispatch(logout());
        }
    }, [dispatch]);

    // only for visitor
    if (role === 'guest' && isLoggedIn()) {
        return <Navigate to="/?toast=loginOk" />;
    }
    // only if connected
    if (role === 'logged' && !isLoggedIn()) {
        return <Navigate to="/login?toast=tokenExpired" />;
    }
    // only if dev
    if (role === 'developer' && (!isLoggedIn() || !isDeveloper(userData))) {
        if (!isLoggedIn()) {
            return <Navigate to="/login?toast=tokenExpired" />;
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
