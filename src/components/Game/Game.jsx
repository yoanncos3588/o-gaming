import { Link, useNavigate, useParams } from 'react-router-dom';

import ContentContainer from '../ContentContainer';
import Category from '../Category';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { isImageValid } from '../../utils/imageValidator';
import imagePlaceHolder from '/placeholder.jpg';
import { formatDate } from '../../utils/date';
import Loading from '../Loading';
import IssuesList from './IssuesList';
import SuggestionsList from './SuggestionsList';

const Game = () => {
    const { gameId } = useParams();
    const [game, setGame] = useState({});
    const [isLoadingGame, setIsLoadingGame] = useState(true);

    const [showSuggestion, setShowSuggestion] = useState(false);

    const navigate = useNavigate();

    const [showImagePlaceholder, setShowImagePlaceholder] = useState(true);

    // fetch game
    useEffect(() => {
        const fetchGame = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/games/game/${gameId}`
                );
                if (res.status !== 200 || res.data.game.length === 0) {
                    navigate('/404');
                }
                setGame(res.data.game[0]);
                setIsLoadingGame(false);
            } catch (error) {
                console.log(error);
                navigate('/404');
            }
        };
        fetchGame();
    }, [gameId, navigate, isLoadingGame]);

    // valid image cover
    useEffect(() => {
        const showCover = async () => {
            const validImage = await isImageValid(game.picture);
            if (validImage) {
                setShowImagePlaceholder(false);
            }
        };
        showCover();
    }, [game.picture, showImagePlaceholder]);

    return (
        <ContentContainer>
            {isLoadingGame ? (
                <Loading />
            ) : (
                <>
                    <div className="grid grid-cols-12 lg:gap-16 gap-0">
                        <div className="lg:col-span-8 col-span-12">
                            <div className="flex flex-col">
                                <img
                                    src={
                                        !showImagePlaceholder
                                            ? game.picture
                                            : imagePlaceHolder
                                    }
                                    alt={`cover for ${game.name}`}
                                    className="mb-8 order-2 lg:order-1"
                                />
                                <h1 className="text-4xl font-black mb-8 order-1 lg:order-2">
                                    {game.name}
                                </h1>
                            </div>
                        </div>
                        <div className="lg:col-span-4 col-span-12">
                            <div className="flex justify-center flex-col items-center ">
                                <Link
                                    to={game.external_link}
                                    className="btn w-full mb-4"
                                    target="_blank"
                                >
                                    Official website
                                </Link>
                                <Link
                                    to={`/game/${gameId}/create-issue`}
                                    className="btn btn-warning w-full mb-4"
                                >
                                    Report an issue
                                </Link>
                                <Link
                                    to={`/game/${gameId}/create-suggestion`}
                                    className="btn btn-info w-full mb-4"
                                >
                                    Send suggestion
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex -m-2 flex-wrap flex-col lg:flex-row my-4 lg:mt-0">
                        <div className="text-sm m-2">
                            <span>Publisher : </span>
                            <Link
                                to={`/user/${game.user_id}`}
                                className="underline"
                            >
                                {game.author}
                            </Link>
                        </div>
                        <div className="text-sm m-2">
                            <span>Released : </span>
                            <span>{formatDate(game.release_date)}</span>
                        </div>
                    </div>
                    <p>{game.description}</p>
                    <ul className="mt-4 -mx-1">
                        {game.categories &&
                            game.categories.map((c, index) => (
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
                        <SuggestionsList gameId={gameId} />
                    ) : (
                        <IssuesList gameId={gameId} />
                    )}
                </>
            )}
        </ContentContainer>
    );
};

export default Game;
