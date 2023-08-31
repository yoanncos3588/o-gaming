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
            console.log('guest only');
            return navigate('/', {
                replace: true,
            });
        }
        // only if connected
        if (role === 'logged' && !isLoggedIn()) {
            console.log('logged only');
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
            console.log('dev only');
            return navigate('/login', {
                replace: true,
            });
        }
    }, []);

    return <Outlet />;
};

ProtectedRoute.propTypes = {
    role: PropTypes.string,
};

export default ProtectedRoute;
