// import axios from 'axios';
import { useEffect, useState } from 'react';
import ContentContainer from '../ContentContainer';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../../utils/axios';
import { useSelector } from 'react-redux';
import SidebarGame from './SidebarGame';

function CreateSuggestion() {
    const [isLoading, setIsLoading] = useState(false);
    const [suggestionInfos, setSuggestionInfos] = useState({
        title: '',
        description: '',
    });

    const userId = useSelector((state) => state.user.userData.userId);
    const publishedAt = new Date();
    const navigate = useNavigate();
    const { idGame } = useParams();

    // redirect user on success
    useEffect(() => {
        toast.onChange((payload) => {
            if (payload.status === 'removed' && payload.id === 'succesToast') {
                navigate(`/game/${idGame}`);
            }
        });
    }, [navigate, idGame]);

    /** Handle change on form inputs */
    const handleChange = (e) => {
        setSuggestionInfos({
            ...suggestionInfos,
            [e.target.name]: e.target.value,
        });
    };

    // submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        suggestionInfos.user_id = userId;
        suggestionInfos.published_at = publishedAt;
        try {
            const res = await axiosInstance.post(
                `http://localhost:3000/games/game/${idGame}/suggestions`,
                suggestionInfos
            );
            if (res.status === 201) {
                toast.success('Succes, you will be redirect…', {
                    autoClose: 2000,
                    toastId: 'succesToast',
                    theme: 'colored',
                });
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (error.response.data.error) {
                toast.error(error.response.data.error, {
                    theme: 'colored',
                });
            } else {
                toast.error('An unexpected error has occured', {
                    theme: 'colored',
                });
            }
        }
    };

    return (
        <ContentContainer SidebarRight={<SidebarGame idGame={idGame} />}>
            <div className=" flex flex-wrap ">
                <h2 className="text-2xl font-semibold text-white mb-4">
                    Send suggestion
                </h2>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="w-full">
                        <div className="form-control  mb-8">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="title"
                                className=" input input-bordered w-full bg-neutral"
                                placeholder="Add a title"
                                onChange={handleChange}
                                value={suggestionInfos.title}
                            />
                        </div>
                        <div className="form-control mb-8">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                id="text"
                                name="description"
                                rows="4"
                                className="textarea textarea-bordered w-full bg-neutral"
                                placeholder="add an description"
                                onChange={handleChange}
                                value={suggestionInfos.description}
                            ></textarea>
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                            {!isLoading ? (
                                <button
                                    className="btn btn-primary mt-4 w-full mb-3"
                                    type="submit"
                                >
                                    Send suggestion
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
            </div>
        </ContentContainer>
    );
}

export default CreateSuggestion;
