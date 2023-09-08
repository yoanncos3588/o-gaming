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
            <li className="mb-4 lg:mb-0 lg:flex lg:flex-row lg:items-center">
                {!isLoggedIn() ? (
                    <Link to="/login">
                        <UserCircleIcon
                            fill="white"
                            className="w-4 h-4 hidden lg:inline-block"
                        />
                        Login
                    </Link>
                ) : (
                    <button onClick={handleLogout}>
                        <UserCircleIcon
                            fill="white"
                            className="w-4 h-4 hidden lg:inline-block"
                        />
                        Logout
                    </button>
                )}
            </li>
            {!isLoggedIn() && (
                <li className=" mb-4 lg:mb-0">
                    <Link to="/signup">Sign up</Link>
                </li>
            )}
        </>
    );
};
