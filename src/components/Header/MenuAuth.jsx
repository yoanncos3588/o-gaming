import { useDispatch } from 'react-redux';
import { logout } from '../../store/reducers/user';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as UserCircleIcon } from '../../assets/icons/user.svg';
import { isLoggedIn } from '../../utils/userStatus';

export const MenuAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * Disconnect user
     * @param {*} e
     */
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/');
    };

    return (
        <>
            <li>
                <div>
                    <UserCircleIcon
                        fill="white"
                        className="w-4 h-4 hidden lg:inline-block"
                    />
                    {!isLoggedIn() ? (
                        <Link to="/login">Login</Link>
                    ) : (
                        <button onClick={handleLogout}>Logout</button>
                    )}
                </div>
            </li>
            {!isLoggedIn() && (
                <li>
                    <Link to="/signup">Sign up</Link>
                </li>
            )}
        </>
    );
};
