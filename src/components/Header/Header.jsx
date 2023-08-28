import Logo from '../Logo';
import SearchBar from './SearchBar';
import Menu from './Menu';
import { ReactComponent as IconBurger } from '../../assets/icons/burger.svg';
import { MenuAuth } from './MenuAuth';

const Header = () => {
    return (
        <header className="w-full navbar border-b-2 border-base-200">
            <div className="mx-2 text-2xl">
                <Logo shortForMobile />
            </div>
            <div className="flex-1 px-2 mx-2">
                <SearchBar />
                <div className="hidden lg:block mx-4">
                    <ul className="menu menu-horizontal">
                        <Menu />
                    </ul>
                </div>
            </div>

            <ul className="menu menu-horizontal hidden lg:flex">
                <MenuAuth />
            </ul>
            <div className="flex-none lg:hidden">
                <label
                    htmlFor="my-drawer-3"
                    className="btn btn-square btn-ghost"
                >
                    <IconBurger stroke={'white'} className="w-6 h-6" />
                </label>
            </div>
        </header>
    );
};

export default Header;
