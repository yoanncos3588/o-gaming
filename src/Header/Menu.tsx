import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const Menu = (props: Props) => {
    return (
        <>
            <li>
                <Link to="#">All Games</Link>
            </li>
            <li>
                <Link to="#">Add Game</Link>
            </li>
        </>
    );
};

export default Menu;
