// import axios from 'axios';
import { useEffect, useState } from 'react';
import ContentContainer from '../ContentContainer';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Issue() {
    // const [IssueInfos, setIssueInfos] = useState({
    //     title: '',
    //     is_visibilible: true,
    //     plateform: '',
    //     is_online: true,
    //     description: '',
    //     tag: '',
    //     frequency: '',
    //     replication: '',
    // });

    const navigate = useNavigate();
    let { gameId } = useParams();

    useEffect(() => {
        // redirect user on success
        console.log('useeffect');
        toast.onChange((payload) => {
            if (payload.status === 'removed' && payload.id === 'succesToast') {
                navigate('/');
            }
        });
    }, [navigate]);

    // const handleChange = (e) => {
    //     setIssueInfos({
    //         ...IssueInfos,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await axios.post(
    //             'http://localhost:3000//games/game/:id_game/issue',
    //             IssueInfos
    //         );
    //         if (Object.prototype.hasOwnProperty.call(res.data, 'error')) {
    //             toast.error(res.data.error, {
    //                 theme: 'colored',
    //             });
    //         } else {
    //             toast.success('Succes, you will be redirect…', {
    //                 toastId: 'succesToast',
    //                 theme: 'colored',
    //             });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error('An unexpected error occured', {
    //             theme: 'colored',
    //         });
    //     }
    // };
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <ContentContainer className="flex flex-wrap">
            <main className="w-2/3 flex flex-wrap">
                <h2 className="text-2xl font-semibold text-white mb-4">
                    Create a Issue
                </h2>
                <form className="w-full">
                    <div className="w-full">
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-white text-sm font-medium mb-2"
                            >
                                title
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="add a title"
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
                            <div className="form-control w-fit mr-2">
                                <label className="cursor-pointer label ">
                                    <input
                                        type="radio"
                                        name="radio-7"
                                        className="radio radio-info"
                                    />
                                    <span className="label-text pl-2">
                                        is not visible
                                    </span>
                                </label>
                            </div>
                            <div className="form-control w-fit mr-2">
                                <label className="cursor-pointer label ">
                                    <input
                                        type="radio"
                                        name="radio-7"
                                        className="radio radio-info"
                                    />
                                    <span className="label-text pl-2">
                                        is not visible
                                    </span>
                                </label>
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
                                    Systeme
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
                                >
                                    <li>
                                        <a>ps5</a>
                                    </li>
                                    <li>
                                        <a>pc</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="dropdown dropdown-bottom w-1/3 hover:bg-neutral-focus btn m-1 bg-neutral border-neutral flex align-middle ">
                                <label tabIndex={0} className="cursor-pointer">
                                    online
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
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
                                id="message"
                                name="message"
                                rows="4"
                                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="add an description"
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

                        <Link
                            className="mb-2 text-md font-medium"
                            to={`/games/game/:gameid`}
                        >
                            return to game page
                        </Link>
                    </div>
                </form>
            </main>
            <section className="flex justify-end w-1/4">
                <div className="flex">
                    <img
                        className="h-fit mb-8 "
                        src={
                            selectedImage ||
                            'https://img.redbull.com/images/c_crop,w_1920,h_960,x_0,y_103,f_auto,q_auto/c_scale,w_1200/redbullcom/2020/6/5/ctsejxmdtw9inp8zqqqd/red-bull-campus-clutch-valorant-agents'
                        }
                        type="file"
                        accept="image/*"
                        onClick={handleImageUpload}
                        alt="User Avatar"
                    />
                </div>
            </section>
        </ContentContainer>
    );
}

export default Issue;
