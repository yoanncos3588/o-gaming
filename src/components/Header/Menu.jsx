import { Link } from 'react-router-dom';

import { isDeveloper } from '../../utils/userStatus';
import { useSelector } from 'react-redux';

const Menu = () => {
    const userData = useSelector((state) => state.user.userData);
    return (
        <>
            <li>
                <Link to="/game/1/issue/1" className="btn-primary font-bold">
                    All Games
                </Link>
            </li>
            {isDeveloper(userData) && (
                <li>
                    <Link
                        to="/games/1/create-issue"
                        className="btn-primary font-bold"
                    >
                        Add Game
                    </Link>
                </li>
            )}
        </>
    );
};

export default Menu;
