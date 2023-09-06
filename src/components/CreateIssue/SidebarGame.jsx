import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isImageValid } from '../../utils/imageValidator';
import placeholder from '/placeholder.jpg';
import PropTypes from 'prop-types';
import useApi from '../../hook/useApi';
import { toast } from 'react-toastify';

const SidebarGame = ({ idGame }) => {
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    const { get: getGame, error: errorGame, data } = useApi();

    useEffect(() => {
        const showCover = async () => {
            const validImage = await isImageValid(data?.game[0]?.picture);
            if (validImage) {
                setShowPlaceholder(false);
            }
        };
        showCover();
    }, [data?.game]);

    /** fetch game */
    useEffect(() => {
        getGame(`http://localhost:3000/games/game/${idGame}`);
        console.log(data);
    }, []);

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
            {data?.game && (
                <>
                    <img
                        className="my-3"
                        src={
                            !showPlaceholder
                                ? data.game[0].picture
                                : placeholder
                        }
                        alt={`image cover of ${data.game[0].name.toLowerCase()}`}
                    />
                    <h2 className=" font-bold mb-2">{data.game[0].name}</h2>
                    <p className=" opacity-50">{data.game[0].description}</p>
                </>
            )}
        </div>
    );
};

SidebarGame.propTypes = {
    idGame: PropTypes.string,
};

export default SidebarGame;
