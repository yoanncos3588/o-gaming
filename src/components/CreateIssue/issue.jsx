import axios from 'axios';
import { useEffect, useState } from 'react';
import ContentContainer from '../ContentContainer';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function CreateIssue({ idGame, description, imageUrl }) {
    const [issueInfos, setIssueInfos] = useState({
        title: '',
        is_public: true,
        platform_id: 1,
        is_online: true,
        description: '',
        category: '',
        frequency: '',
        replication: '',
        tags: [],
    });

    const systemeOptions = [
        { id: 1, name: 'ps5' },
        { id: 2, name: 'ps4' },
        { id: 3, name: 'Xbox' },
        { id: 4, name: 'PC' },
        { id: 5, name: 'Switch' },
    ];

    const tags = [
        { id: 1, title: 'Weapon' },
        { id: 2, title: 'Lobby' },
        { id: 3, title: 'Character' },
        { id: 4, title: 'Spell' },
    ];

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    // const [selectedContextOption, setSelectedContextOption] = useState(
    //     contextOptions[0].value
    // );
    // const [selectedSystemeOption, setSelectedSystemeOption] = useState(
    //     systemeOptions[0].value
    // );

    // const handleSystemeOptionChange = (event) => {
    //     setSelectedSystemeOption(event.target.value);
    // };
    // const handleContextOptionChange = (event) => {
    //     setSelectedContextOption(event.target.value);
    // };

    useEffect(() => {
        // redirect user on success
        console.log(issueInfos);
        toast.onChange((payload) => {
            if (payload.status === 'removed' && payload.id === 'succesToast') {
                navigate('/games/game/:id_game');
            }
        });
    }, [navigate]);

    const handleChange = (e) => {
        if (e.target.value === 'true' || e.target.value === 'false') {
            setIssueInfos({
                ...issueInfos,
                [e.target.name]: convertValueToBoolean(e.target.value),
            });
        } else {
            console.log(e.target.value);
            setIssueInfos({
                ...issueInfos,
                [e.target.name]: e.target.value,
            });
        }
        console.log(issueInfos);
    };

    /** Handle checkbox for tags */
    const addTag = (e, tag) => {
        console.log(e.target.checked);
        if (e.target.checked) {
            console.log('isChecked');
            setIssueInfos((prev) => {
                const newTags = [...prev.tags, tag];
                return { ...prev, tags: newTags };
            });
        } else {
            console.log('isUnchecked');
            setIssueInfos((prev) => {
                const newTags = prev.tags.filter(
                    (oldTag) => oldTag.id !== tag.id
                );
                return { ...prev, tags: newTags };
            });
        }
    };

    useEffect(() => {
        console.log(issueInfos);
    });

    const convertValueToBoolean = (value) => {
        if (value === 'true') {
            console.log('convert to true');
            return true;
        } else {
            console.log('convert to false');
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://localhost:3000/games/game/:id_game/issue',
                issueInfos
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
                                name="title"
                                className=" w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="add a title"
                                onChange={handleChange}
                                value={issueInfos.title}
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
                                        !issueInfos.is_public && 'btn-outline'
                                    } lg:!w-1/2 !w-full`}
                                    type="radio"
                                    name="is_public"
                                    aria-label="is visible"
                                    value={true}
                                    onChange={handleChange}
                                    checked={issueInfos.is_public}
                                />
                                <input
                                    className={`join-item btn btn-primary ${
                                        issueInfos.is_public && 'btn-outline'
                                    } lg:!w-1/2 !w-full`}
                                    type="radio"
                                    name="is_public"
                                    aria-label="is not visible"
                                    value={false}
                                    onChange={handleChange}
                                    checked={!issueInfos.is_public}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap place-content-around m-4">
                            <p className="w-1/3 m-1  flex align-middle font-bold">
                                Plateform
                            </p>
                            <p className="w-1/3 m-1  flex align-middle font-bold">
                                Context
                            </p>
                        </div>
                        <div className="flex flex-wrap place-content-around m-4">
                            <div className="dropdown dropdown-bottom w-1/3 hover:bg-neutral-focus btn m-1 bg-neutral border-neutral flex align-middle cursor-pointer">
                                <select
                                    className="select select-bordered w-full max-w-xs"
                                    onChange={handleChange}
                                    name="platform_id"
                                    defaultValue={Number(
                                        issueInfos.platform_id
                                    )}
                                >
                                    {systemeOptions.map((option) => (
                                        <option
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.name} {option.id}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="dropdown dropdown-bottom w-1/3 hover:bg-neutral-focus btn m-1 bg-neutral border-neutral flex align-middle ">
                                <select
                                    className="select select-bordered w-full max-w-xs"
                                    onChange={handleChange}
                                    name="is_online"
                                    defaultValue={true}
                                >
                                    <option value={true}>Online</option>
                                    <option value={false}>Offline</option>
                                </select>
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
                                name="description"
                                rows="4"
                                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="add an description"
                                onChange={handleChange}
                                value={issueInfos.description}
                            ></textarea>
                        </div>
                        <section className="mb-4 flex flex-wrap ">
                            {/* TAGGGGGGGG */}
                            {tags.map((tag) => (
                                <div
                                    className="form-control w-1/4 mr-3"
                                    key={tag.id}
                                >
                                    <label className="cursor-pointer label ">
                                        <span className="label-text">
                                            {tag.title}
                                        </span>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-info"
                                            // checked={}
                                            onChange={(e) => addTag(e, tag)}
                                        />
                                    </label>
                                </div>
                            ))}
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
                                name="replication"
                                rows="4"
                                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Describe how to reproduce your issue"
                                onChange={handleChange}
                                value={issueInfos.replication}
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
