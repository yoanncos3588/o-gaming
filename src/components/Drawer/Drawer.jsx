import Menu from '../Header/Menu';
import LoginButton from '../Header/LoginButton';
import SignUpButton from '../Header/SignUpButton';
import Logo from '../Logo';
import { Link } from 'react-router-dom';

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
                    <li>
                        <LoginButton />
                    </li>
                    <li>
                        <SignUpButton />
                    </li>
                    <Menu />
                </ul>
            </div>
        </div>
    );
};

export default Drawer;
