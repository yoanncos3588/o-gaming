import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isTokenExpired } from '../utils/token';
import { logout } from '../store/reducers/user';

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDev, setIsDev] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    const userData = useSelector((state) => state.user.userData);

    const dispatch = useDispatch();

    useEffect(() => {
        // if userData exist user is logged
        if (userData) {
            if (isTokenExpired()) {
                // if token is expired we disconnect user
                dispatch(logout());
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
                if (userData.role === 'developer') {
                    setIsDev(true);
                } else {
                    setIsDev(false);
                }
            }
        } else {
            setIsLoggedIn(false);
        }
        setIsChecking(false);
    }, [userData, dispatch]);

    return { isLoggedIn, isChecking, isDev };
};
