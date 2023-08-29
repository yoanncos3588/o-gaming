import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isDeveloper, isLoggedIn } from '../utils/userStatus';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ role = '', id = null }) => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.userData);

    useEffect(() => {
        // only for visitor
        if (role === 'visitor' && isLoggedIn(userData)) {
            return navigate('/', {
                replace: true,
            });
        }
        // only if connected
        if (!userData) {
            return navigate('/login', {
                replace: true,
            });
        }
        // only if dev
        if (role === 'developer' && !isDeveloper(userData)) {
            return navigate('/', {
                replace: true,
            });
        }
        // only if is equal id user
        if (id && Number(id) !== Number(userData.userId)) {
            return navigate('/', {
                replace: true,
            });
        }
    }, []);

    return <Outlet />;
};

ProtectedRoute.propTypes = {
    role: PropTypes.string,
    id: PropTypes.number,
};

export default ProtectedRoute;
