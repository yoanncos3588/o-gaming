import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isDeveloper, isLoggedIn } from '../utils/userStatus';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ role = '' }) => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.userData);

    useEffect(() => {
        // only for visitor
        if (role === 'guest' && isLoggedIn()) {
            return navigate('/', {
                replace: true,
            });
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
            return navigate('/login', {
                replace: true,
            });
        }
        // only if dev
        if (role === 'developer' && (!isLoggedIn() || !isDeveloper(userData))) {
            return navigate('/login', {
                replace: true,
            });
        }
    }, [role, userData, navigate]);

    return <Outlet />;
};

ProtectedRoute.propTypes = {
    role: PropTypes.string,
};

export default ProtectedRoute;
