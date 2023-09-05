import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ContentContainer from '../ContentContainer';

function SearchResults() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [searchGames, setSearchGames] = useState([]);
    const [searchUsers, setSearchUsers] = useState([]);
    const navigate = useNavigate();

    const searchValues = searchParams.get('search');
    console.log(searchValues);
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

                console.log(games);
                console.log(users);
            } catch (err) {
                console.log(err);
            }
        };

        fetchdata();
    }, []);
    return (
        <ContentContainer>
            <div>SearchResults</div>
            {searchGames.length > 0 ? (
                <div>il y'a des resultats </div>
            ) : (
                <div>il y'a pas des resultats </div>
            )}
        </ContentContainer>
    );
}

export default SearchResults;
