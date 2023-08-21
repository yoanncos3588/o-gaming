import React from 'react';
import Logo from '../Logo';
import SearchBar from './SearchBar';
import Menu from './Menu';
import LoginButton from './LoginButton';
import SignUpButton from './SignUpButton';

type Props = {};

const Header = (props: Props) => {
    return (
        <header>
            <Logo />
            <SearchBar />
            <Menu />
            <div>
                <LoginButton />
                <SignUpButton />
            </div>
        </header>
    );
};

export default Header;
