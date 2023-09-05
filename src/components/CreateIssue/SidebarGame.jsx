import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { isImageValid } from '../../utils/imageValidator';
import placeholder from '/placeholder.jpg';
import PropTypes from 'prop-types';

const SidebarGame = ({ idGame }) => {
    const [game, setGame] = useState([]);
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const showCover = async () => {
            const validImage = await isImageValid(game.picture);
            if (validImage) {
                setShowPlaceholder(false);
            }
        };
        showCover();
    }, [game]);

    /** fetch game */
    useEffect(() => {
        const fetchGame = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/games/game/${idGame}`
                );
                if (res.status !== 200) {
                    throw Error();
                }
                setGame(res.data.game[0]);
                setIsLoading(false);
            } catch (error) {
                toast.error('An unexpected error has occured', {
                    theme: 'colored',
                });
            }
        };
        fetchGame();
    }, [idGame]);
    return (
        <div>
            <Link
                className="text-md underline mb-4 inline-block hover:text-accent"
                to={`/game/${idGame}`}
            >
                Return to game page
            </Link>
            {!isLoading && (
                <>
                    <img
                        className="my-3"
                        src={!showPlaceholder ? game.picture : placeholder}
                        alt={`image cover of ${name.toLowerCase()}`}
                    />
                    <h2 className=" font-bold mb-2">{game.name}</h2>
                    <p className=" opacity-50">{game.description}</p>
                </>
            )}
        </div>
    );
};

SidebarGame.propTypes = {
    idGame: PropTypes.string,
};

export default SidebarGame;
