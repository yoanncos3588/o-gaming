import { Link, useNavigate, useParams } from 'react-router-dom';
import ContentContainer from '../ContentContainer';
import Category from '../Category';
import { useState, useEffect } from 'react';
import { isImageValid } from '../../utils/imageValidator';
import imagePlaceHolder from '/placeholder.jpg';
import { formatDate } from '../../utils/date';
import Loading from '../Loading';
import IssuesList from './IssuesList';
import SuggestionsList from './SuggestionsList';
import { ReactComponent as IconSuggestion } from '../../assets/icons/suggestion.svg';
import { ReactComponent as IconTools } from '../../assets/icons/tools.svg';
import useApi from '../../hook/useApi';
import isUrl from 'is-url';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Game = () => {
    const { idGame } = useParams();
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [showImagePlaceholder, setShowImagePlaceholder] = useState(true);
    const [canDeleteGame, setCanDeleteGame] = useState(false);
    const { get: getGame, error: errorGame, data: game, isComplete } = useApi();
    const {
        del: delGame,
        error: errorDel,
        isComplete: isCompleteDel,
    } = useApi();
    const userData = useSelector((state) => state.user.userData);

    const navigate = useNavigate();

    // fetch game
    useEffect(() => {
        getGame(`${import.meta.env.VITE_API_URL}/games/game/${idGame}`, 'game');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idGame]);

    // valid image cover
    useEffect(() => {
        const showCover = async () => {
            if (game && game?.length) {
                console.log('here');
                const validImage = await isImageValid(game[0].picture);
                if (validImage) {
                    console.log('here2');
                    setShowImagePlaceholder(false);
                }
            }
        };
        showCover();
    }, [game, showImagePlaceholder]);

    // error with fetch game from api
    useEffect(() => {
        if (isComplete && (errorGame || !game?.length)) {
            navigate('/?toast=missingGame');
        }
    }, [isComplete, errorGame, navigate, game]);

    // test if user is the game creator and show delete button
    useEffect(() => {
        const canUserDeleteGame = () => {
            if (userData && game && userData?.userId === game[0]?.user_id) {
                setCanDeleteGame(true);
            }
        };
        canUserDeleteGame();
    }, [userData, game]);

    /**
     * handle click on delete game
     */
    const handleDelete = () => {
        delGame(`${import.meta.env.VITE_API_URL}/games/game/${game[0].id}`);
    };

    // test if delete is complete without error
    useEffect(() => {
        if (isCompleteDel) {
            navigate('/?toast=gameDeleted');
        }
        if (errorDel) {
            toast.error('An error has occured');
        }
    }, [errorDel, isCompleteDel, navigate]);

    return (
        <ContentContainer>
            {game && game?.length ? (
                <>
                    <div className="grid grid-cols-12 lg:gap-16 gap-0">
                        <div className="lg:col-span-8 col-span-12">
                            <div className="flex flex-col">
                                <img
                                    src={
                                        !showImagePlaceholder
                                            ? game[0].picture
                                            : imagePlaceHolder
                                    }
                                    alt={`cover for ${game[0].name}`}
                                    className="mb-8 order-2 lg:order-1"
                                />
                                <h1 className="text-4xl font-black mb-8 order-1 lg:order-2">
                                    {game[0].name}
                                </h1>
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12">
                            <div className="flex justify-center flex-col items-center ">
                                {isUrl(game[0].external_link) && (
                                    <Link
                                        to={game[0].external_link}
                                        className="btn w-full mb-4"
                                        target="_blank"
                                    >
                                        Official website
                                    </Link>
                                )}
                                <Link
                                    to={`/game/${idGame}/create-issue`}
                                    className="btn btn-warning w-full mb-4"
                                >
                                    <IconTools />
                                    Report an issue
                                </Link>
                                <Link
                                    to={`/game/${idGame}/create-suggestion`}
                                    className="btn btn-info w-full mb-4"
                                >
                                    <IconSuggestion /> Send suggestion
                                </Link>
                                {canDeleteGame && (
                                    <button
                                        className="btn btn-error w-full"
                                        onClick={handleDelete}
                                    >
                                        Delete game
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex -m-2 flex-wrap flex-col lg:flex-row my-4 lg:mt-0">
                        <div className="text-sm m-2">
                            <span>Publisher : </span>
                            <Link
                                to={`/user/${game[0].user_id}`}
                                className="underline"
                            >
                                {game[0].author}
                            </Link>
                        </div>
                        <div className="text-sm m-2">
                            <span>Released : </span>
                            <span>{formatDate(game[0].release_date)}</span>
                        </div>
                    </div>
                    <p>{game[0].description}</p>
                    <ul className="mt-4 -mx-1">
                        {game[0].categories &&
                            game[0].categories.map((c, index) => (
                                <li className="mx-1 inline-block" key={index}>
                                    <Category name={c} />
                                </li>
                            ))}
                    </ul>
                    <div className="tabs tabs-boxed mt-8">
                        <button
                            className={`tab ${
                                !showSuggestion && 'tab-active'
                            } text-lg font-bold`}
                            onClick={(e) => {
                                e.preventDefault();
                                setShowSuggestion(false);
                            }}
                        >
                            Issues
                        </button>
                        <button
                            className={`tab ${
                                showSuggestion && 'tab-active'
                            } text-lg font-bold`}
                            onClick={(e) => {
                                e.preventDefault();
                                setShowSuggestion(true);
                            }}
                        >
                            Suggestions
                        </button>
                    </div>
                    {showSuggestion ? (
                        <SuggestionsList
                            idGame={idGame}
                            idDev={game[0].user_id}
                        />
                    ) : (
                        <IssuesList idGame={idGame} idDev={game[0].user_id} />
                    )}
                </>
            ) : (
                <Loading />
            )}
        </ContentContainer>
    );
};

export default Game;
