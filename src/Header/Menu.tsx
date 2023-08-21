import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const Menu = (props: Props) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="#">All Games</Link>
                </li>
                <li>
                    <Link to="#">Add Game</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
