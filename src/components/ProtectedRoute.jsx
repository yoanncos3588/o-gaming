import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isDeveloper, isLoggedIn } from '../utils/userStatus';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { isTokenExpired } from '../utils/token';
import { logout } from '../store/reducers/user';

const ProtectedRoute = ({ role = '' }) => {
    const userData = useSelector((state) => state.user.userData);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsTokenValid(isTokenExpired());
    }, [isTokenValid]);

    useEffect(() => {
        if (isTokenExpired()) {
            dispatch(logout());
        }
    }, [dispatch]);

    // only for visitor
    if (role === 'guest' && isLoggedIn()) {
        return <Navigate to="/" />;
    }
    // only if connected
    if (role === 'logged' && !isLoggedIn()) {
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
