import { Link } from 'react-router-dom';

const Menu = () => {
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
