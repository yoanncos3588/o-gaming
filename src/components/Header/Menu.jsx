import { Link } from 'react-router-dom';

import { isDeveloper } from '../../utils/userAuth';

const Menu = () => {
    return (
        <>
            <li>
                <Link to="/" className="btn-primary font-bold">
                    All Games
                </Link>
            </li>
            {isDeveloper() && (
                <li>
                    <Link to="/create-game" className="btn-primary font-bold">
                        Add Game
                    </Link>
                </li>
            )}
        </>
    );
};

export default Menu;
