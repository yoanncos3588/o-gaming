import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IssuesListItem } from './IssuesListItem';

import axios from 'axios';

const IssuesList = ({ gameId }) => {
    const [issues, setIssues] = useState([]);
    const [tags, setTags] = useState([]);

    const [isLoadingIssue, setIsLoadingIssue] = useState(true);
    const [isLoadingTag, setIsLoadingTag] = useState(true);

    const [selectedSearchTag, setSelectedSearchTag] = useState('all');

    const [textToSearch, setTextToSearch] = useState('');
    const [filteredList, setFilteredList] = useState([]);

    const [isSearchOn, setIsSearchOn] = useState(false);

    const navigate = useNavigate();

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
        <>
            {!isLoadingTag && (
                <form
                    action=""
                    className="w-full mt-4"
                    onSubmit={handleSubmitSearch}
                >
                    <div className="join w-full flex lg:flex-row flex-col">
                        <select
                            className="select select-bordered lg:join-item bg-neutral"
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
    );
};

export default IssuesList;