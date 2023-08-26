// import axios from 'axios';
import { useEffect, useState } from 'react';
import ContentContainer from '../ContentContainer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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

    return (
        <ContentContainer>
            <main>
                <div className="flex justify-center items-center">
                    <div className=" w-full md:w-1/2 xl:w-3/5 bg-neutral p-8 rounded-lg shadow-lg m-2">
                        <h2 className="text-2xl font-semibold text-white mb-4">
                            Create a game
                        </h2>
                        <form>
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

                            <section className="mb-4 flex flex-wrap ">
                                <div className="form-control w-1/4 mr-3">
                                    <label className="cursor-pointer label ">
                                        <span className="label-text">
                                            action
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
                                            Simulation
                                        </span>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-info"
                                        />
                                    </label>
                                </div>
                                <div className="form-control w-1/4 mr-2">
                                    <label className="cursor-pointer label ">
                                        <span className="label-text">
                                            aventure
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
                                            compte
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

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-white text-sm font-medium mb-2"
                                >
                                    description
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder="add an description"
                                ></textarea>
                            </div>
                            <p className="mb-2 text-md font-medium">
                                add a image for your game
                            </p>
                            <div className="flex">
                                <img
                                    className="w-full h-56 mb-8 "
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
                            <p className="mb-2 text-md font-medium">
                                add tags to reference your issues
                            </p>
                            <Select
                                defaultValue={[]}
                                isMulti
                                name="colors"
                                // options={}
                                className="basic-multi-select mb-5 bg-gray-700"
                                classNamePrefix="select"
                            />
                            <div className="w-full">
                                <label htmlFor="urlInput">
                                    Entrez un lien :
                                </label>
                                <input
                                    type="url"
                                    id="urlInput"
                                    className="w-full py-1.5 bg-gray-700 rounded-md my-2 pl-2"
                                    name="urlInput"
                                    placeholder="add external link"
                                    pattern="https?://.*"
                                ></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="dateInput">
                                    Entrez une date :
                                </label>
                                <input
                                    type="date"
                                    id="dateInput"
                                    className="w-full py-1.5 bg-gray-700 rounded-md mt-2 pl-2 mb-5"
                                    name="dateInput"
                                    required
                                ></input>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                            >
                                Envoyer
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </ContentContainer>
    );
}

export default Issue;
