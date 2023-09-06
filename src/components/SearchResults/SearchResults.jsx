import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ContentContainer from '../ContentContainer';
import { GameItem } from '../Games/GameItem';
import UsersItem from '../UsersItem/UsersItem';
import useApi from '../../hook/useApi';

function SearchResults() {
    let [searchParams] = useSearchParams();
    const { get: getSearchResult, data: searchResult, error } = useApi();
    const [searchGames, setSearchGames] = useState([]);
    const [searchUsers, setSearchUsers] = useState([]);
    const navigate = useNavigate();

    // get params in url after search (ex ?search=textToSearch)
    const searchValues = searchParams.get('search');

    useEffect(() => {
        // call api with hook useApi
        getSearchResult(`http://localhost:3000/search?search=${searchValues}`);
        //search values can changed if user make a search from search result page
    }, [searchValues]);

    // when api request is over, we set the state with the results for games and users
    useEffect(() => {
        if (searchResult) {
            // destructuring result from api
            const { Games: games, Users: users } = searchResult;
            setSearchGames(games);
            setSearchUsers(users);
        }
    }, [searchResult]);

    // if there is an error whith the api request we redirect to homepage
    useEffect(() => {
        if (error) {
            navigate('/?toast="searchError"');
        }
    }, [error, navigate]);

    return (
        <ContentContainer
            SidebarRight={
                <div>
                    <h1 className="mb-4 underline">Results for Users :</h1>
                    <div>
                        {searchUsers.length > 0 ? (
                            searchUsers &&
                            searchUsers.map((g) => (
                                <li className="mb-6 list-none" key={g.id}>
                                    <UsersItem
                                        name={g.username}
                                        avatar={g.avatar}
                                        email={g.email}
                                    />
                                </li>
                            ))
                        ) : (
                            <li className="my-5 font-bold text-2xl">no user</li>
                        )}
                    </div>
                </div>
            }
        >
            <h1 className="mb-4 underline">Results for Games :</h1>
            {searchGames.length > 0 ? (
                searchGames &&
                searchGames.map((g) => (
                    <li className="mb-6 list-none" key={g.id}>
                        <GameItem
                            id={g.id}
                            name={g.name}
                            image={g.picture}
                            publisher={g.author}
                            publisherId={g.user_id}
                            realeaseDate={g.release_date}
                            description={g.description}
                            categories={g.categories}
                            totalIssues={g.issue_count}
                            totalSuggestions={g.suggestion_count}
                        />
                    </li>
                ))
            ) : (
                <li className=" my-5 font-bold text-2xl">no game</li>
            )}
        </ContentContainer>
    );
}

export default SearchResults;
