import { Link, useNavigate, useParams } from 'react-router-dom';
import ContentContainer from '../ContentContainer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Tag from '../Tag';
import Loading from '../Loading';
import { ReactComponent as IconTools } from '../../assets/icons/tools.svg';
import IssueSidebar from './IssueSidebar';
import { axiosInstance } from '../../utils/axios';
import { formatDate } from '../../utils/date';
import DeleteItem from './DeleteItem';
import { canUserSeeIssue } from '../../utils/userStatus';
import { useSelector } from 'react-redux';

const Issue = () => {
    const [issue, setIssue] = useState(null);
    const [game, setGame] = useState(null);
    const { idGame, idIssue } = useParams();
    const [isLoadingIssue, setIsLoadingIssue] = useState(true);
    const [isLoadingGame, setIsLoadingGame] = useState(true);
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.userData);

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
                    theme: 'colored',
                    toastId: 'errorLogin',
                });
                // navigate('/404');
            }
        };
        fetchGame();
    }, [idGame, idIssue, navigate, setIsLoadingGame]);

    /** fetch issue */
    useEffect(() => {
        const fetchIssue = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/issue/${idIssue}`
                );
                if (res.status !== 200) {
                    throw Error('Can not find what your looking for');
                }
                setIssue(res.data.issue);
                setTimeout(() => {
                    setIsLoadingIssue(false);
                }, 1000);
            } catch (error) {
                toast.error(error.message, {
                    theme: 'colored',
                    toastId: 'errorLogin',
                });
                // navigate('/404');
            }
        };
        fetchIssue();
    }, [idGame, idIssue, navigate, setIsLoadingIssue]);

    useEffect(() => {
        if (issue && game) {
            if (!canUserSeeIssue(issue, userData, game.user_id)) {
                toast.error('You dont have the right to see this issue', {
                    theme: 'colored',
                    toastId: 'errorLogin',
                });
                navigate(`/game/${game.id}`);
            }
        }
    }, [issue, game, userData, navigate]);

    /**
     * Handle click on delete issue
     */
    const handleDeleteIssue = async () => {
        console.log('delete');
        try {
            const res = await axiosInstance.delete(
                `http://localhost:3000/issue/${idIssue}`
            );
            if (res.status !== 200) {
                throw Error;
            } else {
                toast.success('Issue deleted', {
                    theme: 'colored',
                    toastId: 'successDeleteIssue',
                });
                navigate(`/game/${idGame}`);
            }
        } catch (error) {
            toast.error('You are not allowed to do that', {
                theme: 'colored',
                toastId: 'errorDeleteIssue',
            });
        }
    };

    const handleUpdateIssue = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.patch(
                `http://localhost:3000/issue/${idIssue}`,
                {
                    title: issue.title,
                    description: issue.description,
                    status: issue.status,
                    is_minor: issue.is_minor,
                    assign_to: issue.assign_to,
                    is_public: issue.is_public,
                    is_online: issue.is_online,
                    frequency: issue.frequency,
                    replication: issue.replication,
                    published_at: issue.published_at,
                    platform_id: issue.platform_id,
                }
            );
            if (res.status !== 200) {
                throw Error;
            } else {
                toast.success('Issue updated', {
                    theme: 'colored',
                    toastId: 'successUpdateIssue',
                });
            }
        } catch (error) {
            toast.error('You are not allowed to do that', {
                theme: 'colored',
                toastId: 'errorDeleteIssue',
            });
        }
    };

    return (
        <>
            {isLoadingIssue && isLoadingGame ? (
                <Loading />
            ) : (
                <ContentContainer
                    SidebarRight={
                        <>
                            <IssueSidebar
                                devId={game.user_id}
                                handleDelete={handleDeleteIssue}
                                handleUpdateIssue={handleUpdateIssue}
                                issue={issue}
                                setIssue={setIssue}
                            />
                            <DeleteItem
                                className={'mt-4'}
                                authorId={issue.user_id}
                                handleDelete={handleDeleteIssue}
                                devId={game.user_id}
                            />
                        </>
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
                                    <IconTools className="w-5 h-5" />
                                </span>
                                {issue.title}
                            </h1>
                            <span className=" opacity-50 italic text-xs">
                                Created by{' '}
                                <Link
                                    to={`user/${issue.user_id}`}
                                    className="underline hover:text-accent"
                                >
                                    {issue.author}
                                </Link>{' '}
                                the {formatDate(issue.published_at)}
                            </span>
                        </div>
                        <div className="divider"></div>
                        <div className="text-sm">
                            <div className="mb-2">
                                <span className="font-bold">Visibility : </span>
                                {issue.is_public ? 'Public' : 'Private'}
                            </div>
                            <div className="mb-2">
                                <span className="font-bold">Platform : </span>
                                {issue.platform}
                            </div>
                            <div className="mb-2">
                                <span className="font-bold">Context : </span>
                                {issue.is_online ? 'Online' : 'Offline'}
                            </div>
                            {issue.tags.length > 0 && (
                                <>
                                    <span className="font-bold inline-block">
                                        Tags :{' '}
                                    </span>
                                    <ul className="-mx-2">
                                        {issue.tags.map((t, index) => (
                                            <li
                                                className="m-2 inline-block"
                                                key={index}
                                            >
                                                <Tag name={t} />
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                        <div className="divider"></div>
                        <div className="mb-8">
                            <h2 className="font-bold text-sm mb-4 uppercase  inline-block text-secondary">
                                Description
                            </h2>
                            <p>{issue.description}</p>
                        </div>
                        <div className="mb-8">
                            <h2 className="font-bold text-sm mb-4 uppercase  inline-block text-secondary">
                                Frequency
                            </h2>
                            <p>{issue.frequency}</p>
                        </div>
                        <div className="mb-8">
                            <h2 className="font-bold text-sm mb-4 uppercase  inline-block text-secondary">
                                How to replicate
                            </h2>
                            <p>{issue.replication}</p>
                        </div>
                    </section>
                </ContentContainer>
            )}
        </>
    );
};

export default Issue;
