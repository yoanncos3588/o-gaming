import { useEffect, useState } from 'react';
import ContentContainer from '../ContentContainer';
import { GameItem } from './GameItem';
import { SidebarGames } from './SidebarGames';
import { toast } from 'react-toastify';

import axios from 'axios';

function Games() {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);

    const [categoryFilter, setCategoryFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');

    // to delete
    const addfakecategorie = (games) => {
        games.forEach((g) => {
            g.categories = [
                {
                    id: 1,
                    name: 'Sport',
                    color: 'red',
                },
            ];
            if (g.id === 2) {
                g.categories = [
                    {
                        id: 1,
                        name: 'RPG',
                        color: 'red',
                    },
                ];
            }
            if (g.id === 1) {
                g.categories = [
                    {
                        id: 1,
                        name: 'Action',
                        color: 'red',
                    },
                    {
                        id: 1,
                        name: 'RPG',
                        color: 'red',
                    },
                ];
            }
            if (g.id === 3) {
                g.categories = [
                    {
                        id: 1,
                        name: 'Action',
                        color: 'red',
                    },
                ];
            }
        });
        return games;
    };

    /** fetch games */
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await axios.get('http://localhost:3000/games');
                if (
                    res.status === 500 ||
                    Object.prototype.hasOwnProperty.call(res.data, 'error')
                ) {
                    toast.error(
                        'An unexpected error has occured, try to refresh',
                        {
                            theme: 'colored',
                        }
                    );
                }
                //TODO ne plus utiliser les fakes data
                // setGames(res.data.games);
                setGames(addfakecategorie(res.data.games));
                return res.data.games;
            } catch (error) {
                console.log(error);
            }
        };
        fetchGames();
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
                        item.name.toLowerCase() === categoryFilter.toLowerCase()
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
        <ContentContainer
            SidebarLeft={
                <SidebarGames
                    setCategoryFilter={setCategoryFilter}
                    setDateFilter={setDateFilter}
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
            <ul>
                {categoryFilter !== 'all' || dateFilter !== 'all' ? (
                    filteredGames.length > 0 ? (
                        filteredGames.map((g) => (
                            <li className="mb-6" key={g.id}>
                                <GameItem
                                    id={g.id}
                                    name={g.name}
                                    image={g.image}
                                    publisher={g.author}
                                    publisherId={g.user_id}
                                    realeaseDate={g.release_date}
                                    description={g.description}
                                    categories={g.categories}
                                    totalIssues={102}
                                    totalSuggestions={44}
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
                                image={g.image}
                                publisher={g.author}
                                publisherId={g.user_id}
                                realeaseDate={g.release_date}
                                description={g.description}
                                categories={g.categories}
                                totalIssues={102}
                                totalSuggestions={44}
                            />
                        </li>
                    ))
                )}
            </ul>
        </ContentContainer>
    );
}

export default Games;
