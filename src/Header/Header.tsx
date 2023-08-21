import React from 'react';
import Logo from '../Logo';
import SearchBar from './SearchBar';
import Menu from './Menu';
import LoginButton from './LoginButton';
import SignUpButton from './SignUpButton';
import { ReactComponent as IconBurger } from '../assets/icons/burger.svg';

type Props = {};

const Header = (props: Props) => {
    return (
        <header className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
                <label
                    htmlFor="my-drawer-3"
                    className="btn btn-square btn-ghost"
                >
                    <IconBurger stroke={'white'} className="w-6 h-6" />
                </label>
            </div>
            <div className="px-2 mx-2">
                <Logo />
            </div>
            <div className="flex-1 px-2 mx-2">
                <SearchBar />
                <div className="hidden lg:block">
                    <ul className="menu menu-horizontal">
                        <Menu />
                    </ul>
                </div>
            </div>

            <div className="menu menu-horizontal">
                <li>
                    <LoginButton />
                </li>
                <li>
                    <SignUpButton />
                </li>
            </div>
        </header>
    );
};

export default Header;
