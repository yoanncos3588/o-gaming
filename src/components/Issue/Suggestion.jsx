import { Link, useNavigate, useParams } from 'react-router-dom';
import ContentContainer from '../ContentContainer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import { axiosInstance } from '../../utils/axios';
import { formatDate } from '../../utils/date';
import DeleteItem from './DeleteItem';
import { ReactComponent as IconSuggestion } from '../../assets/icons/suggestion.svg';

const Suggestion = () => {
    const [suggestion, setSuggestion] = useState(null);
    const [game, setGame] = useState(null);
    const { idGame, idSuggestion } = useParams();
    const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(true);
    const [isLoadingGame, setIsLoadingGame] = useState(true);
    const navigate = useNavigate();

    /** fetch issue */
    useEffect(() => {
        const fetchSuggestion = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/suggestion/${idSuggestion}`
                );
                console.log(res);
                if (res.status !== 200) {
                    throw Error;
                }
                setSuggestion(res.data.suggestion);
                setTimeout(() => {
                    setIsLoadingSuggestion(false);
                }, 1000);
            } catch (error) {
                toast.error('Can not find what your looking for', {
                    toastId: 'errorLogin',
                });
                navigate('/404');
            }
        };
        fetchSuggestion();
    }, [idGame, idSuggestion, navigate, setIsLoadingSuggestion]);

    /** fetch game */
    useEffect(() => {
        const fetchGame = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/games/game/${idGame}`
                );
                if (res.status !== 200) {
                    throw Error;
                }
                setGame(res.data.game[0]);
                setTimeout(() => {
                    setIsLoadingGame(false);
                }, 1000);
            } catch (error) {
                toast.error('Can not find what your looking for', {
                    toastId: 'errorLogin',
                });
                navigate('/404');
            }
        };
        fetchGame();
    }, [idGame, navigate, setIsLoadingGame]);

    /**
     * Handle click on delete suggestion
     */
    const handleDeleteSuggestion = async () => {
        try {
            const res = await axiosInstance.delete(
                `http://localhost:3000/suggestion/${idSuggestion}`
            );
            if (res.status !== 200) {
                throw Error;
            } else {
                toast.success('Suggestion deleted', {
                    toastId: 'successDeleteSuggestion',
                });
                navigate(`/game/${idGame}`);
            }
        } catch (error) {
            toast.error('You are not allowed to do that', {
                toastId: 'errorDeleteSuggestion',
            });
        }
    };

    return (
        <>
            {isLoadingSuggestion && isLoadingGame ? (
                <Loading />
            ) : (
                <ContentContainer
                    SidebarRight={
                        <DeleteItem
                            handleDelete={handleDeleteSuggestion}
                            authorId={suggestion.user_id}
                            devId={game.user_id}
                        />
                    }
                >
                    <section>
                        <Link
                            to={`/game/${idGame}`}
                            className="mb-8 inline-block underline hover:text-accent text-sm"
                        >
                            Return to game page
                        </Link>
                        <p className="font-bold text-sm mb-4 uppercase  text-secondary block">
                            {game.name}
                        </p>
                        <div className="mb-8 pl-8">
                            <h1 className="text-2xl font-bold mb-2 flex items-start relative">
                                <span className="mr-4 absolute -left-8 top-2">
                                    <IconSuggestion className="w-5 h-5" />
                                </span>
                                {suggestion.title}
                            </h1>
                            <span className=" opacity-50 italic text-xs">
                                Created by{' '}
                                <Link
                                    to={`user/${suggestion.user_id}`}
                                    className="underline hover:text-accent"
                                >
                                    {suggestion.author}
                                </Link>{' '}
                                the {formatDate(suggestion.published_at)}
                            </span>
                        </div>
                        <div className="divider"></div>
                        <div className="mb-8">
                            <h2 className="font-bold text-sm mb-4 uppercase  inline-block text-secondary">
                                Description
                            </h2>
                            <p>{suggestion.description}</p>
                        </div>
                    </section>
                </ContentContainer>
            )}
        </>
    );
};

export default Suggestion;
