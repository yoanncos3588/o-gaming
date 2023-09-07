import { Link, useNavigate, useParams } from 'react-router-dom';
import ContentContainer from '../ContentContainer';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import { formatDate } from '../../utils/date';
import DeleteItem from './DeleteItem';
import { ReactComponent as IconSuggestion } from '../../assets/icons/suggestion.svg';
import useApi from '../../hook/useApi';

const Suggestion = () => {
    const { idGame, idSuggestion } = useParams();
    const { get: getGame, data: game, error: errorGame } = useApi();
    const {
        get: getSuggestion,
        data: suggestion,
        error: errorSuggestion,
    } = useApi();
    const {
        del: delSuggestion,
        isComplete: isCompleteDel,
        error: errorDel,
    } = useApi();

    const navigate = useNavigate();

    // fetch game
    useEffect(() => {
        getGame(`${import.meta.env.VITE_API_URL}/games/game/${idGame}`, 'game');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idGame]);

    // fetch suggestion
    useEffect(() => {
        getSuggestion(
            `${import.meta.env.VITE_API_URL}/suggestion/${idSuggestion}`,
            'suggestion'
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idSuggestion]);

    /**
     * Handle click on delete issue
     */
    const handleDeleteSuggestion = async () => {
        delSuggestion(
            `${import.meta.env.VITE_API_URL}/suggestion/${idSuggestion}`
        );
    };

    // check if issue request for delete is complete and redirect
    useEffect(() => {
        if (isCompleteDel) {
            navigate(`/game/${idGame}?toast=suggestionDeleted`);
        }
    }, [isCompleteDel, idGame, navigate]);

    //show error or delete failed
    useEffect(() => {
        if (errorDel) {
            toast.error(errorDel);
        }
    }, [errorDel]);

    // if api request for game or suggestion failed, something is wrong, 404
    useEffect(() => {
        if (errorGame || errorSuggestion) {
            navigate('/404');
        }
    }, [errorGame, errorSuggestion, navigate]);

    return (
        <>
            {!game || !suggestion ? (
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
