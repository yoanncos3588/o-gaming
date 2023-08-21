import Drawer from './Drawer/Drawer';
import Header from './Header/Header';
import LoginButton from './Header/LoginButton';
import Menu from './Header/Menu';
import SearchBar from './Header/SearchBar';
import SignUpButton from './Header/SignUpButton';
import Logo from './Logo';
import { ReactComponent as IconBurger } from './assets/icons/burger.svg';

type Props = {};

const TemplateDrawer = ({ children }) => {
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <Header />
                {/* Page content here */}
                {children}
            </div>
            <Drawer />
        </div>
    );
};

export default TemplateDrawer;
