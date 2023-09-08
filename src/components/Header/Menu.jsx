import { Link } from 'react-router-dom';

import { isDeveloper } from '../../utils/userStatus';
import { useSelector } from 'react-redux';

const Menu = () => {
    const userData = useSelector((state) => state.user.userData);
    return (
        <>
            <li className="mb-4 lg:mb-0">
                <Link to="/" className="btn-primary font-bold ">
                    All Games
                </Link>
            </li>
            {isDeveloper(userData) && (
                <li className="lg:ml-4 mb-4 lg:mb-0">
                    <Link to="/create-game" className="btn-success font-bold">
                        Add Game
                    </Link>
                </li>
            )}
        </>
    );
};

export default Menu;
