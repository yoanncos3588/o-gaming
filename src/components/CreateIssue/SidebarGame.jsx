import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isImageValid } from '../../utils/imageValidator';
import placeholder from '/placeholder.jpg';
import PropTypes from 'prop-types';
import useApi from '../../hook/useApi';
import { toast } from 'react-toastify';

const SidebarGame = ({ idGame }) => {
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    const { get: getGame, error: errorGame, data: dataGame } = useApi();

    useEffect(() => {
        const showCover = async () => {
            if (dataGame) {
                const validImage = await isImageValid(dataGame[0]?.picture);
                if (validImage) {
                    setShowPlaceholder(false);
                }
            }
        };
        showCover();
    }, [dataGame]);

    /** fetch game */
    useEffect(() => {
        getGame(`http://localhost:3000/games/game/${idGame}`, 'game');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idGame]);

    useEffect(() => {
        toast.error(errorGame, { toastId: 'toastErrorGame' });
    }, [errorGame]);

    return (
        <div>
            <Link
                className="text-md underline mb-4 inline-block hover:text-accent"
                to={`/game/${idGame}`}
            >
                Return to game page
            </Link>
            {dataGame && dataGame?.length && (
                <>
                    <img
                        className="my-3"
                        src={
                            !showPlaceholder ? dataGame[0].picture : placeholder
                        }
                        alt={`image cover of ${dataGame[0].name.toLowerCase()}`}
                    />
                    <h2 className=" font-bold mb-2">{dataGame[0].name}</h2>
                    <p className=" opacity-50">{dataGame[0].description}</p>
                </>
            )}
        </div>
    );
};

SidebarGame.propTypes = {
    idGame: PropTypes.string,
};

export default SidebarGame;
