import { Link } from 'react-router-dom';
import { ReactComponent as UserCircleIcon } from '../../assets/icons/user.svg';

const LoginButton = () => {
    return (
        <div>
            <UserCircleIcon
                fill="white"
                className="w-4 h-4 hidden lg:inline-block"
            />
            <Link to="#">Login</Link>
        </div>
    );
};

export default LoginButton;
