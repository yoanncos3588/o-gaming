import Menu from '../Header/Menu';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import { MenuAuth } from '../Header/MenuAuth';

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
                    <MenuAuth />
                </ul>
            </div>
        </div>
    );
};

export default Drawer;
