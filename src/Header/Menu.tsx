import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const Menu = (props: Props) => {
    return (
        <>
            <li>
                <Link to="#" className="font-bold">
                    All Games
                </Link>
            </li>
            <li>
                <Link to="#" className="font-bold">
                    Add Game
                </Link>
            </li>
        </>
    );
};

export default Menu;
