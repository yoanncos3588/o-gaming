import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ContentContainer from '../ContentContainer';
import { GameItem } from '../Games/GameItem';
import UsersItem from '../UsersItem/UsersItem';

function SearchResults() {
    let [searchParams] = useSearchParams();
    const [searchGames, setSearchGames] = useState([]);
    const [searchUsers, setSearchUsers] = useState([]);
    const navigate = useNavigate();

    const searchValues = searchParams.get('search');

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/search?search=${searchValues}`
                );
                if (res.status !== 200) {
                    navigate('/');
                }

                const { Games: games, Users: users } = res.data;
                setSearchGames(games);
                setSearchUsers(users);
            } catch (err) {
                console.log(err);
            }
        };

        fetchdata();
    }, [searchValues, navigate]);

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
