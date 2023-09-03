import { Link, useNavigate, useParams } from 'react-router-dom';
import ContentContainer from '../ContentContainer';
import Category from '../Category';
import { IssuesListItem } from './IssuesListItem';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Game = () => {
    const [game, setGame] = useState({});
    const [issue, setIssue] = useState([]);
    // const [gameId, setGameId] = useState();
    const navigate = useNavigate();

    const gameId = useParams();
    const issueId = useParams();
    useEffect(() => {
        const fetchIssue = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/games/game/${gameId}/issue`
                );
                console.log(res.data);
                // verifier si il y a un bien un game res.status === 200
                if (res.status !== 200) {
                    navigate('/404');
                }
                if (res.data.game.length === 0) {
                    navigate('/404');
                }

                setIssue(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchIssue();
    });

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/games/game/${gameId}`
                );
                // console.log(res.data.game.length);
                // verifier si il y a un bien un game res.status === 200
                if (res.status !== 200) {
                    navigate('/404');
                }
                if (res.data.game.length === 0) {
                    navigate('/404');
                }

                setIssue(res.data.game[0]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchGame();
    });

    // const categories = ['FPS', 'Action'];

    return (
        <ContentContainer>
            <div className="grid grid-cols-12 lg:gap-16 gap-0">
                <div className="lg:col-span-8 col-span-12">
                    <div className="flex flex-col">
                        <img
                            src={game.picture}
                            alt=""
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
                        >
                            Official website
                        </Link>
                        <Link to={'#'} className="btn btn-warning w-full mb-4">
                            Report an issue
                        </Link>
                        <Link to={'#'} className="btn btn-info w-full mb-4">
                            Send suggestion
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex -m-2 flex-wrap flex-col lg:flex-row my-4 lg:mt-0">
                <div className="text-sm m-2">
                    <span>Publisher : </span>
                    <Link to={`user/${game.user_Id}`} className="underline">
                        {game.author}
                    </Link>
                </div>
                <div className="text-sm m-2">
                    <span>Released : {game.release_date} </span>
                    <span>2014</span>
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
                <a className="tab tab-active text-lg font-bold">Issues</a>
                <a className="tab  text-lg font-bold">Suggestions</a>
            </div>
            <form action="" className="w-full mt-4">
                <div className="join w-full flex lg:flex-row flex-col">
                    <select
                        className="select select-bordered lg:join-item bg-neutral"
                        defaultValue={1}
                    >
                        <option disabled>Filter</option>
                        <option value={1}>Weapons</option>
                        <option value={2}>Main character</option>
                    </select>
                    <div className="flex-1">
                        <div>
                            <input
                                className="input input-bordered lg:join-item w-full text-sm text-white focus:outline-none focus:bg-white focus:text-secondary-content bg-neutral"
                                placeholder="Search"
                            />
                        </div>
                    </div>
                    <button className="btn-primary btn lg:join-item">
                        Search
                    </button>
                </div>
            </form>

            <ul className="mt-4">
                <li className="mb-4">
                    <IssuesListItem />
                </li>
                <li className="mb-4">
                    <IssuesListItem />
                </li>
                <li className="mb-4">
                    <IssuesListItem />
                </li>
                <li className="mb-4">
                    <IssuesListItem />
                </li>
                <li className="mb-4">
                    <IssuesListItem />
                </li>
            </ul>
        </ContentContainer>
    );
};

export default Game;
