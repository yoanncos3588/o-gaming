import { Link, useNavigate, useParams } from 'react-router-dom';

import ContentContainer from '../ContentContainer';
import Category from '../Category';
import { IssuesListItem } from './IssuesListItem';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { isImageValid } from '../../utils/imageValidator';
import imagePlaceHolder from '/placeholder.jpg';
import { formatDate } from '../../utils/date';
import Loading from '../Loading';

const Game = () => {
    const [game, setGame] = useState({});
    const [issues, setIssues] = useState([]);
    const [tags, setTags] = useState([]);

    const [isLoadingGame, setIsLoadingGame] = useState(true);
    const [isLoadingIssue, setIsLoadingIssue] = useState(true);
    const [isLoadingTag, setIsLoadingTag] = useState(true);

    const navigate = useNavigate();

    const { gameId } = useParams();

    const [showImagePlaceholder, setShowImagePlaceholder] = useState(true);

    const [selectedSearchTag, setSelectedSearchTag] = useState('all');
    const [textToSearch, setTextToSearch] = useState('');
    const [filteredList, setFilteredList] = useState([]);

    const [isSearchOn, setIsSearchOn] = useState(false);

    // fetch issues
    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/games/game/${gameId}/issues`
                );
                if (res.status !== 200) {
                    throw Error;
                }
                setIssues(res.data.issues);
                setIsLoadingIssue(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchIssues();
    }, [gameId]);

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

    // fetch tags
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/games/game/${gameId}/tags`
                );
                if (res.status !== 200) {
                    throw Error('Unable to get tags from API');
                }
                setTags(res.data.tags);
                setIsLoadingTag(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchTags();
    }, [gameId, navigate, isLoadingTag]);

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

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        let result = [];

        // if no search infos show all
        if (selectedSearchTag === 'all' && textToSearch === '') {
            setIsSearchOn(false);
            return;
        }

        // filter by tag
        if (selectedSearchTag !== 'all') {
            console.log('1');
            result = issues.filter((issue) => {
                return issue.tags.some(
                    (tag) =>
                        tag.toLowerCase() === selectedSearchTag.toLowerCase()
                );
            });
        }

        // filter by title
        if (textToSearch !== '') {
            console.log(2);
            result = issues.filter((issue) => {
                console.log(issue.title);
                console.log(textToSearch);
                return issue.title
                    .toLowerCase()
                    .includes(textToSearch.toLowerCase());
            });
        }
        setIsSearchOn(true);
        setFilteredList(result);
    };

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
                                    to={`/games/${gameId}/create-issue`}
                                    className="btn btn-warning w-full mb-4"
                                >
                                    Report an issue
                                </Link>
                                <Link
                                    to={'#'}
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
                        <a className="tab tab-active text-lg font-bold">
                            Issues
                        </a>
                        <a className="tab  text-lg font-bold">Suggestions</a>
                    </div>
                    {!isLoadingTag && (
                        <form
                            action=""
                            className="w-full mt-4"
                            onSubmit={handleSubmitSearch}
                        >
                            <div className="join w-full flex lg:flex-row flex-col">
                                <select
                                    className="select select-bordered lg:join-item bg-neutral"
                                    defaultValue={'all'}
                                    onChange={(e) =>
                                        setSelectedSearchTag(
                                            e.target.value.toLowerCase()
                                        )
                                    }
                                    value={selectedSearchTag}
                                >
                                    <option value={'all'}>All tags</option>
                                    {tags.map((t) => (
                                        <option
                                            key={t.id}
                                            value={t.title.toLowerCase()}
                                        >
                                            {t.title}
                                        </option>
                                    ))}
                                </select>
                                <div className="flex-1">
                                    <div>
                                        <input
                                            className="input input-bordered lg:join-item w-full text-sm text-white focus:outline-none focus:bg-white focus:text-secondary-content bg-neutral"
                                            placeholder="Search"
                                            onChange={(e) =>
                                                setTextToSearch(
                                                    e.target.value.toLowerCase()
                                                )
                                            }
                                            value={textToSearch}
                                        />
                                    </div>
                                </div>
                                <button
                                    className="btn-primary btn lg:join-item"
                                    type="submit"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    )}
                    {!isLoadingIssue && (
                        <ul className="mt-4">
                            {isSearchOn ? (
                                filteredList.length ? (
                                    filteredList.map((i) => (
                                        <li className="mb-4" key={i.id}>
                                            <IssuesListItem
                                                id={i.id}
                                                title={i.title}
                                                author={i.author}
                                                tags={i.tags}
                                                status={i.status}
                                            />
                                        </li>
                                    ))
                                ) : (
                                    <li className=" flex items-center justify-center opacity-50 flex-col">
                                        <p className="block text-2xl font-black mb-2">
                                            No result
                                        </p>
                                        <button
                                            className="underline"
                                            onClick={() => {
                                                setSelectedSearchTag('');
                                                setTextToSearch('');
                                                setIsSearchOn(false);
                                            }}
                                        >
                                            Cancel my search
                                        </button>
                                    </li>
                                )
                            ) : issues.length ? (
                                issues.map((i) => (
                                    <li className="mb-4" key={i.id}>
                                        <IssuesListItem
                                            id={i.id}
                                            title={i.title}
                                            author={i.author}
                                            tags={i.tags}
                                            status={i.status}
                                        />
                                    </li>
                                ))
                            ) : (
                                <li className=" flex items-center justify-center opacity-50 flex-col">
                                    <p className="block text-2xl font-black mb-2">
                                        No issue found for this game
                                    </p>
                                </li>
                            )}
                        </ul>
                    )}
                </>
            )}
        </ContentContainer>
    );
};

export default Game;
