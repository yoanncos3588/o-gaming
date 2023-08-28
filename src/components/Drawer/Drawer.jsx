import Menu from '../Header/Menu';
import LoginLogOutButton from '../Header/LoginLogOutButton';
import SignUpButton from '../Header/SignUpButton';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../../utils/userAuth';

const Drawer = () => {
    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
            <div className="menu p-4 w-80 h-full bg-base-200">
                <div className="mb-4">
                    <Link to={'/'}>
                        <Logo />
                    </Link>
                </div>
                <ul>
                    <Menu />
                    <li>
                        <LoginLogOutButton />
                    </li>
                    {!isLoggedIn && (
                        <li>
                            <SignUpButton />
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Drawer;
