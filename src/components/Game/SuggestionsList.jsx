import { useState, useEffect } from 'react';
import { IssueSuggestionListItem } from './IssueSuggestionListItem';
import propTypes from 'prop-types';

import axios from 'axios';

const SuggestionsList = ({ idGame }) => {
    const [suggestions, setSuggestions] = useState([]);

    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true);

    const [textToSearch, setTextToSearch] = useState('');
    const [filteredList, setFilteredList] = useState([]);

    const [isSearchOn, setIsSearchOn] = useState(false);

    // fetch issues
    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/games/game/${idGame}/suggestions`
                );
                if (res.status !== 200) {
                    throw Error;
                }
                setSuggestions(res.data.suggestions);
                setIsLoadingSuggestions(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSuggestions();
    }, [idGame]);

    /**
     * Handle when user press search on form above list issues
     * @param {Event} e
     * @returns
     */
    const handleSubmitSearch = (e) => {
        e.preventDefault();
        let result = [];

        // filter by title
        if (textToSearch !== '') {
            result = suggestions.filter((issue) => {
                return issue.title
                    .toLowerCase()
                    .includes(textToSearch.toLowerCase());
            });
        } else {
            setIsSearchOn(false);
            return;
        }
        setIsSearchOn(true);
        setFilteredList(result);
    };

    return (
        <>
            {!isLoadingSuggestions && (
                <>
                    <form
                        action=""
                        className="w-full mt-4"
                        onSubmit={handleSubmitSearch}
                    >
                        <div className="join w-full flex lg:flex-row flex-col">
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
                    <ul className="mt-4">
                        {isSearchOn ? (
                            filteredList.length ? (
                                filteredList.map((i) => (
                                    <li className="mb-4" key={i.id}>
                                        <IssueSuggestionListItem
                                            id={i.id}
                                            title={i.title}
                                            author={i.author}
                                            idGame={idGame}
                                            isSuggestions
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
                                            setTextToSearch('');
                                            setIsSearchOn(false);
                                        }}
                                    >
                                        Cancel my search
                                    </button>
                                </li>
                            )
                        ) : suggestions.length ? (
                            suggestions.map((i) => (
                                <li className="mb-4" key={i.id}>
                                    <IssueSuggestionListItem
                                        id={i.id}
                                        title={i.title}
                                        author={i.author}
                                        idGame={idGame}
                                        isSuggestions
                                    />
                                </li>
                            ))
                        ) : (
                            <li className=" flex items-center justify-center opacity-50 flex-col">
                                <p className="block text-2xl font-black mb-2">
                                    No suggestion found for this game
                                </p>
                            </li>
                        )}
                    </ul>
                </>
            )}
        </>
    );
};

SuggestionsList.propTypes = {
    idGame: propTypes.string,
};

export default SuggestionsList;
