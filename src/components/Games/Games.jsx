import { useEffect, useState } from 'react';
import ContentContainer from '../ContentContainer';
import { GameItem } from './GameItem';
import { SidebarGames } from './SidebarGames';
import { toast } from 'react-toastify';

import axios from 'axios';

function Games() {
    const [games, setGames] = useState([]);

    const authorTestToDelete = {
        id: 0,
        username: 'DevTeam',
    };

    const categoriesTestToDelete = [
        {
            id: 1,
            name: 'FPS',
            color: 'red',
        },
        {
            id: 2,
            name: 'Action',
            color: 'red',
        },
    ];

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
                console.log(res.data.games);
                setGames(res.data.games);
                return res.data.games;
            } catch (error) {
                console.log(error);
            }
        };
        fetchGames();
    }, []);
    return (
        <ContentContainer SidebarLeft={<SidebarGames />}>
            <h1 className="text-3xl font-bold mb-6">
                Games trending right now
            </h1>
            <ul>
                {games.map((g) => (
                    <li className="mb-6" key={g.id}>
                        <GameItem
                            id={g.id}
                            name={g.name}
                            image={g.image}
                            publisher={authorTestToDelete}
                            realeaseDate={g.release_date}
                            description={g.description}
                            categories={categoriesTestToDelete}
                            totalIssues={102}
                            totalSuggestions={44}
                        />
                    </li>
                ))}
            </ul>
        </ContentContainer>
    );
}

export default Games;
