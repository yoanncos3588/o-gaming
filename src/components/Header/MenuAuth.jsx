import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/reducers/user';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as UserCircleIcon } from '../../assets/icons/user.svg';

export const MenuAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.userData);

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
                    {!user ? (
                        <Link to="/login">Login</Link>
                    ) : (
                        <button onClick={handleLogout}>Logout</button>
                    )}
                </div>
            </li>
            {!user && (
                <li>
                    <Link to="#">Sign up</Link>
                </li>
            )}
        </>
    );
};
