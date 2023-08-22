import React from 'react';
import { Link } from 'react-router-dom';

const Menu = (props) => {
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
