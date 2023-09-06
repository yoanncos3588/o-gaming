import { Link, useNavigate, useParams } from 'react-router-dom';
import ContentContainer from '../ContentContainer';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Tag from '../Tag';
import Loading from '../Loading';
import { ReactComponent as IconTools } from '../../assets/icons/tools.svg';
import IssueSidebar from './IssueSidebar';
import { formatDate } from '../../utils/date';
import DeleteItem from './DeleteItem';
import { canUserSeeIssue } from '../../utils/userStatus';
import { useSelector } from 'react-redux';
import useApi from '../../hook/useApi';

const Issue = () => {
    const { idGame, idIssue } = useParams();

    const { get: getGame, data: game } = useApi();
    const { get: getIssue, data: issue, setData: setIssue } = useApi();
    const {
        del: delIssue,
        isComplete: isCompleteDel,
        error: errorDel,
    } = useApi();
    const {
        patch: patchIssue,
        isComplete: isCompletePatch,
        error: errorPatch,
    } = useApi();

    const navigate = useNavigate();
    const userData = useSelector((state) => state.user.userData);

    // fetch game
    useEffect(() => {
        getGame(`http://localhost:3000/games/game/${idGame}`, 'game');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idGame]);

    // fetch issue
    useEffect(() => {
        getIssue(`http://localhost:3000/issue/${idIssue}`, 'issue');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idGame]);

    // if issue private, test if connected user can see it
    useEffect(() => {
        if (issue && game) {
            if (!canUserSeeIssue(issue, userData, game[0].user_id)) {
                navigate(`/game/${game[0].id}?toast=unauthorized`);
            }
        }
    }, [issue, game, userData, navigate]);

    /**
     * Handle click on delete issue
     */
    const handleDeleteIssue = async () => {
        delIssue(`http://localhost:3000/issue/${idIssue}`);
    };

    // check if issue request for delete is complete and redirect
    useEffect(() => {
        if (isCompleteDel) {
            navigate(`/game/${idGame}?toast=issueDeleted`);
        }
    }, [isCompleteDel, idGame, navigate]);

    /**
     * Handle click on update issue
     * @param {Event} e
     */
    const handleUpdateIssue = async (e) => {
        e.preventDefault();
        patchIssue(`http://localhost:3000/issue/${idIssue}`, {
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
        });
    };

    // patch is done
    useEffect(() => {
        if (isCompletePatch) {
            toast.success('Issue updated successfully');
        }
    }, [isCompletePatch]);

    //show error if patch or delete failed
    useEffect(() => {
        if (errorDel) {
            toast.error(errorDel);
        }
        if (errorPatch) {
            toast.error(errorPatch);
        }
    }, [errorDel, errorPatch]);

    return (
        <>
            {!game || !issue ? (
                <Loading />
            ) : (
                <ContentContainer
                    SidebarRight={
                        <>
                            <IssueSidebar
                                devId={game[0].user_id}
                                handleDelete={handleDeleteIssue}
                                handleUpdateIssue={handleUpdateIssue}
                                issue={issue}
                                setIssue={setIssue}
                            />
                            <DeleteItem
                                className={'mt-4'}
                                authorId={issue.user_id}
                                handleDelete={handleDeleteIssue}
                                devId={game[0].user_id}
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
                            {game[0].name}
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
