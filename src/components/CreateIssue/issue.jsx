import axios from 'axios';
import { useEffect, useState } from 'react';
import ContentContainer from '../ContentContainer';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function CreateIssue() {
    const [IssueInfos, setIssueInfos] = useState({
        title: '',
        is_visible: true,
        plateform: '',
        is_online: true,
        description: '',
        category: '',
        frequency: '',
        replication: '',
    });
    const SystemeOptions = [
        { value: 'ps5', label: 'Option 1' },
        { value: 'ps4', label: 'Option 2' },
        { value: 'ps3', label: 'Option 3' },
        { value: 'computer', label: 'Option 4' },
        { value: 'switch', label: 'Option 5' },
    ];
    const contextOptions = [
        { value: 'online', label: 'Option 1' },
        { value: 'offline', label: 'Option 2' },
    ];
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedContextOption, setSelectedContextOption] = useState(
        contextOptions[0].value
    );
    const [selectedSystemeOption, setSelectedSystemeOption] = useState(
        SystemeOptions[0].value
    );

    const handleSystemeOptionChange = (event) => {
        setSelectedSystemeOption(event.target.value);
    };
    const handleContextOptionChange = (event) => {
        setSelectedContextOption(event.target.value);
    };

    useEffect(() => {
        // redirect user on success

        toast.onChange((payload) => {
            if (payload.status === 'removed' && payload.id === 'succesToast') {
                navigate('/games/game/:id_game');
            }
        });
    }, [navigate]);

    const handleChange = (e) => {
        setIssueInfos({
            ...IssueInfos,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://localhost:3000/games/game/:ig_game/issue',
                IssueInfos
            );
            if (Object.prototype.hasOwnProperty.call(res.data, 'error')) {
                toast.error(res.data.error, {
                    theme: 'colored',
                });
            } else {
                setIsLoading(false);
                toast.success('Succes, you will be redirect…', {
                    autoClose: 2000,
                    toastId: 'succesToast',
                    theme: 'colored',
                });
            }
        } catch (error) {
            console.log(error);
            toast.error('An unexpected error occured', {
                theme: 'colored',
            });
        }
    };

    return (
        <ContentContainer
            SidebarRight={
                <div>
                    <Link
                        className="text-md font-medium text-blue-800"
                        to={`/games/game/:gameid`}
                    >
                        Return to game page
                    </Link>
                    <img
                        src="https://img.redbull.com/images/c_crop,w_1920,h_960,x_0,y_103,f_auto,q_auto/c_scale,w_1200/redbullcom/2020/6/5/ctsejxmdtw9inp8zqqqd/red-bull-campus-clutch-valorant-agents"
                        alt="jeu"
                    />
                    <h2 className=" font-bold underline mb-2">
                        Game description
                    </h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facere voluptates veniam ab tempora repellendus ducimus,
                        animi, necessitatibus delectus aperiam quas deserunt
                        repudiandae nulla nesciunt dolor, ea sed et laborum
                        quod?
                    </p>
                </div>
            }
        >
            <main className=" flex flex-wrap justify-center">
                <h2 className="text-2xl font-semibold text-white mb-4">
                    Create a Issue
                </h2>
                <form className="w-full">
                    <div className="w-full">
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-white text-md font-bold mb-2 "
                            >
                                title
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className=" w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="add a title"
                                onChange={handleChange}
                                value={IssueInfos.title}
                            />
                        </div>

                        <h2>
                            <strong>visibility</strong>
                        </h2>
                        <p className=" text-base-content mb-3">
                            <i>
                                Private issue can only be seen by developpers,
                                use it if you feel your issue can break the game
                                for other players
                                <strong>
                                    (ex: bug abuse in multiplayers game)
                                </strong>
                            </i>
                        </p>
                        <div className=" flex ">
                            <div className="join w-full flex-wrap">
                                <input
                                    className={`join-item btn btn-primary ${
                                        IssueInfos.is_visible !== '1' &&
                                        'btn-outline'
                                    } lg:!w-1/2 !w-full`}
                                    type="radio"
                                    name="is_visibilible"
                                    aria-label="is visible"
                                    value={1}
                                    onChange={handleChange}
                                    checked={IssueInfos.is_visible === 1}
                                />
                                <input
                                    className={`join-item btn btn-primary ${
                                        IssueInfos.is_visible !== '2' &&
                                        'btn-outline'
                                    } lg:!w-1/2 !w-full`}
                                    type="radio"
                                    name="is_visibilible"
                                    aria-label="is not visible"
                                    value={2}
                                    onChange={handleChange}
                                    checked={IssueInfos.is_visible === 2}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap place-content-around m-4">
                            <p className="w-1/3 m-1  flex align-middle font-bold">
                                Systeme
                            </p>
                            <p className="w-1/3 m-1  flex align-middle font-bold">
                                Context
                            </p>
                        </div>
                        <div className="flex flex-wrap place-content-around m-4">
                            <div className="dropdown dropdown-bottom w-1/3 hover:bg-neutral-focus btn m-1 bg-neutral border-neutral flex align-middle cursor-pointer">
                                <label tabIndex={0} className="cursor-pointer">
                                    {selectedSystemeOption}
                                </label>
                                <select
                                    className="dropdown-content z-[1] menu  shadow bg-base-100 rounded-box w-full"
                                    onChange={handleSystemeOptionChange}
                                    value={selectedSystemeOption}
                                >
                                    {SystemeOptions.map((Option) => (
                                        <option
                                            key={Option.value}
                                            value={Option.value}
                                        >
                                            {SystemeOptions.value}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="dropdown dropdown-bottom w-1/3 hover:bg-neutral-focus btn m-1 bg-neutral border-neutral flex align-middle ">
                                <label tabIndex={0} className="cursor-pointer">
                                    {selectedContextOption}
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
                                    onChange={handleContextOptionChange}
                                    value={selectedContextOption}
                                >
                                    <li>
                                        <a>online</a>
                                    </li>
                                    <li>
                                        <a>offline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-white text-sm font-medium mb-2"
                            >
                                Description
                            </label>
                            <textarea
                                id="text"
                                name="message"
                                rows="4"
                                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="add an description"
                                onChange={handleChange}
                                value={IssueInfos.description}
                            ></textarea>
                        </div>
                        <section className="mb-4 flex flex-wrap ">
                            <div className="form-control w-1/4 mr-3">
                                <label className="cursor-pointer label ">
                                    <span className="label-text">map</span>
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-info"
                                    />
                                </label>
                            </div>
                            <div className="form-control w-1/4 mr-3">
                                <label className="cursor-pointer label ">
                                    <span className="label-text">Weapon</span>
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-info"
                                    />
                                </label>
                            </div>
                            <div className="form-control w-1/4 mr-2">
                                <label className="cursor-pointer label ">
                                    <span className="label-text">Lobby</span>
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-info"
                                    />
                                </label>
                            </div>
                            <div className="form-control w-1/4 mr-3">
                                <label className="cursor-pointer label ">
                                    <span className="label-text">Points</span>
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-info"
                                    />
                                </label>
                            </div>
                            <div className="form-control w-1/4 mr-3">
                                <label className="cursor-pointer label ">
                                    <span className="label-text">spell</span>
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-info"
                                    />
                                </label>
                            </div>
                            <div className="form-control w-1/4 mr-3">
                                <label className="cursor-pointer label ">
                                    <span className="label-text">
                                        Character
                                    </span>
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-info"
                                    />
                                </label>
                            </div>
                            <div className="form-control w-1/4 mr-3">
                                <label className="cursor-pointer label ">
                                    <span className="label-text">
                                        interface
                                    </span>
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-info"
                                    />
                                </label>
                            </div>
                        </section>
                        <div className="flex flex-wrap place-content-around m-4">
                            <p className=" m-1 font-bold">frequency</p>
                        </div>
                        <div className="flex flex-wrap place-content-around m-4">
                            <div className="dropdown dropdown-bottom w-full hover:bg-neutral-focus btn m-1 bg-neutral border-neutral flex align-middle">
                                <label tabIndex={0} className="cursor-pointer">
                                    frequency
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
                                >
                                    <li>
                                        <a>Regular</a>
                                    </li>
                                    <li>
                                        <a>once</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-white text-sm font-medium mb-2"
                            >
                                How to replicate
                            </label>
                            <textarea
                                id="replicate"
                                name="message"
                                rows="4"
                                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Describe how to reproduce your issue"
                                onChange={handleChange}
                                value={IssueInfos.replication}
                            ></textarea>
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                            {!isLoading ? (
                                <button
                                    className="btn btn-primary mt-4 w-full mb-3"
                                    type="submit"
                                >
                                    create issue
                                </button>
                            ) : (
                                <button className="btn btn-primary mt-4 w-full mb-3">
                                    <span className="loading loading-spinner"></span>
                                    loading
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </main>
        </ContentContainer>
    );
}

export default CreateIssue;
