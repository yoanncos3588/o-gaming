import { useEffect, useState } from 'react';
import ContentContainer from '../ContentContainer';
import { GameItem } from './GameItem';
import { SidebarGames } from './SidebarGames';
import useApi from '../../hook/useApi';
import Loading from '../Loading';

function Games() {
    // const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');

    const { get: getGames, data: games } = useApi();

    useEffect(() => {
        getGames(`${import.meta.env.VITE_API_URL}/games`, 'games');
    }, []);

    // filter games
    useEffect(() => {
        /**
         * Filter games by category name
         * @param {array} games an array of games object containing categories prop
         * @returns {array} filtered result
         */
        const filterByCategory = (games) => {
            if (categoryFilter === 'all') {
                return games;
            }
            const list = games.filter((game) => {
                return game.categories.some(
                    (item) =>
                        item.toLowerCase() === categoryFilter.toLowerCase()
                );
            });
            return list;
        };

        /**
         * Filter games by release date
         * @@param {array} games an array of games object containing release_date prop
         * @returns filtered result
         */
        const filterByDate = (games) => {
            if (dateFilter === 'all') {
                return games;
            }
            const list = games.filter((game) => {
                const year = new Date(game.release_date).getFullYear();
                return Number(year) === Number(dateFilter);
            });
            return list;
        };
        let result = filterByCategory(games);
        result = filterByDate(result);
        setFilteredGames(result);
    }, [categoryFilter, games, dateFilter]);

    return (
        <>
            {!games ? (
                <Loading />
            ) : (
                <ContentContainer
                    SidebarLeft={
                        <SidebarGames
                            setCategoryFilter={setCategoryFilter}
                            setDateFilter={setDateFilter}
                            categoryFilter={categoryFilter}
                        />
                    }
                >
                    <h1 className="text-3xl font-bold mb-6">
                        {categoryFilter !== 'all'
                            ? `${categoryFilter} games ${
                                  dateFilter !== 'all' ? `in ${dateFilter}` : ''
                              }`
                            : `Games trending ${
                                  dateFilter === 'all'
                                      ? 'right now'
                                      : `in ${dateFilter}`
                              }`}
                    </h1>
                    <ul className="flex flex-col-reverse flex-wrap">
                        {categoryFilter !== 'all' || dateFilter !== 'all' ? (
                            filteredGames.length > 0 ? (
                                filteredGames.map((g) => (
                                    <li className="mb-6" key={g.id}>
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
                                            totalSuggestions={
                                                g.suggestion_count
                                            }
                                        />
                                    </li>
                                ))
                            ) : (
                                <p className=" text-xl font-bold opacity-40">
                                    No result found
                                </p>
                            )
                        ) : (
                            games.map((g) => (
                                <li className="mb-6" key={g.id}>
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
                        )}
                    </ul>
                </ContentContainer>
            )}
        </>
    );
}

export default Games;
