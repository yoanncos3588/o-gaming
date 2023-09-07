import { useState, useEffect } from 'react';
import { IssueSuggestionListItem } from './IssueSuggestionListItem';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { filterPrivateIssues } from '../../utils/userStatus';
import useApi from '../../hook/useApi';
import Loading from '../Loading';

const IssuesList = ({ idGame, idDev }) => {
    const { get: getTags, data: tags } = useApi();
    const { get: getIssues, data: issues } = useApi();

    const [issuesToShow, setIssuesToShow] = useState([]);

    const [selectedSearchTag, setSelectedSearchTag] = useState('all');
    const [textToSearch, setTextToSearch] = useState('');
    const [filteredList, setFilteredList] = useState([]);
    const [isSearchOn, setIsSearchOn] = useState(false);

    const userData = useSelector((state) => state.user.userData);

    /** fetch  tags */
    useEffect(() => {
        getTags(
            `${import.meta.env.VITE_API_URL}/games/game/${idGame}/tags`,
            'tags'
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // fetch issues and filter results
    useEffect(() => {
        getIssues(
            `${import.meta.env.VITE_API_URL}/games/game/${idGame}/issues`,
            'issues'
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idGame]);

    // filter issue to remove private issue if user is not allowed (only author and game creator)
    useEffect(() => {
        if (issues) {
            setIssuesToShow(filterPrivateIssues(issues, userData, idDev));
        }
    }, [issues, userData, idDev]);

    /**
     * Handle when user press search on form above list issues
     * @param {Event} e
     * @returns
     */
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
            result = issuesToShow.filter((issue) => {
                return issue.tags.some(
                    (tag) =>
                        tag.toLowerCase() === selectedSearchTag.toLowerCase()
                );
            });
        } else {
            result = [...issuesToShow];
        }

        // filter by title
        if (textToSearch !== '') {
            result = result.filter((issue) => {
                return issue.title
                    .toLowerCase()
                    .includes(textToSearch.toLowerCase());
            });
        }
        setIsSearchOn(true);
        setFilteredList(result);
    };

    return (
        <>
            <form
                action=""
                className="w-full mt-4"
                onSubmit={handleSubmitSearch}
            >
                <div className="join w-full flex lg:flex-row flex-col">
                    <select
                        className="select select-bordered lg:join-item bg-neutral"
                        onChange={(e) =>
                            setSelectedSearchTag(e.target.value.toLowerCase())
                        }
                        value={selectedSearchTag}
                    >
                        <option value={'all'}>All tags</option>
                        {tags?.map((t) => (
                            <option key={t.id} value={t.title.toLowerCase()}>
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
            {issues && issuesToShow ? (
                <ul className="mt-4">
                    {isSearchOn ? (
                        filteredList.length ? (
                            filteredList.map((i) => (
                                <li className="mb-4" key={i.id}>
                                    <IssueSuggestionListItem
                                        id={i.id}
                                        title={i.title}
                                        author={i.author}
                                        tags={i.tags}
                                        status={i.status}
                                        idGame={idGame}
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
                    ) : issuesToShow.length ? (
                        issuesToShow.map((i) => (
                            <li className="mb-4" key={i.id}>
                                <IssueSuggestionListItem
                                    id={i.id}
                                    title={i.title}
                                    author={i.author}
                                    tags={i.tags}
                                    status={i.status}
                                    idGame={idGame}
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
            ) : (
                <Loading />
            )}
        </>
    );
};

IssuesList.propTypes = {
    idGame: propTypes.string,
    idDev: propTypes.number,
};

export default IssuesList;
