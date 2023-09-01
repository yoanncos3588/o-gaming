import { Link, useNavigate, useParams } from 'react-router-dom';
import ContentContainer from '../ContentContainer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Tag from '../Tag';
import Loading from '../Loading';
import { ReactComponent as IconTools } from '../../assets/icons/tools.svg';

const Issue = () => {
    const [issue, setIssue] = useState(null);
    const { idGame, idIssue } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('use');
        const fetchIssue = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/games/game/${idGame}/issue/${idIssue}`
                );
                console.log(res);
                if (res.status !== 200) {
                    throw Error;
                }
                setIssue(res.data.issue);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                toast.error('Can not find what your looking for', {
                    theme: 'colored',
                    toastId: 'errorLogin',
                });
                navigate('/404');
            }
        };
        fetchIssue();
    }, [idGame, idIssue, navigate, setIsLoading]);

    return (
        <ContentContainer SidebarRight={<div>sidebar</div>}>
            {isLoading ? (
                <Loading />
            ) : (
                <section>
                    <Link
                        to={`/game/${idGame}`}
                        className="mb-8 inline-block underline hover:text-accent text-sm"
                    >
                        Return to game page
                    </Link>
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
                            the {issue.published_at}
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
                        <span className="font-bold inline-block">Tags : </span>
                        <ul className="-mx-2">
                            {issue.tags.map((t, index) => (
                                <li className="m-2 inline-block" key={index}>
                                    <Tag name={t} />
                                </li>
                            ))}
                        </ul>
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
            )}
        </ContentContainer>
    );
};

export default Issue;
