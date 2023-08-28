import { Link } from 'react-router-dom';
import { ReactComponent as UserCircleIcon } from '../../assets/icons/user.svg';
import { isLoggedIn } from '../../utils/userAuth';

const LoginLogOutButton = () => {
    return (
        <div>
            <UserCircleIcon
                fill="white"
                className="w-4 h-4 hidden lg:inline-block"
            />
            {!isLoggedIn() ? (
                <Link to="/login">Login</Link>
            ) : (
                <Link to="/logout">Logout</Link>
            )}
        </div>
    );
};

export default LoginLogOutButton;
