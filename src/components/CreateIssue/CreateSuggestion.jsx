// import axios from 'axios';
import { useEffect, useState } from 'react';
import ContentContainer from '../ContentContainer';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SidebarGame from './SidebarGame';
import { ReactComponent as IconSuggestion } from '../../assets/icons/suggestion.svg';
import useApi from '../../hook/useApi';
import { ButtonLoading } from '../ButtonLoading';

function CreateSuggestion() {
    const [suggestionInfos, setSuggestionInfos] = useState({
        title: '',
        description: '',
    });

    const userId = useSelector((state) => state.user.userData.userId);
    const publishedAt = new Date();
    const navigate = useNavigate();
    const { idGame } = useParams();

    const {
        post: postSuggestion,
        error: errorSuggestion,
        loading: loadingSuggestion,
        isComplete: isCompleteSuggestion,
    } = useApi();

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
        suggestionInfos.user_id = userId;
        suggestionInfos.published_at = publishedAt;
        postSuggestion(
            `${import.meta.env.VITE_API_URL}/games/game/${idGame}/suggestions`,
            suggestionInfos
        );
    };

    // success while posting game
    useEffect(() => {
        if (isCompleteSuggestion) {
            navigate(`/?toast=suggestionCreated`);
        }
    }, [isCompleteSuggestion, navigate]);

    // error while posting game
    useEffect(() => {
        if (errorSuggestion) {
            toast.error(errorSuggestion);
        }
    }, [errorSuggestion]);

    return (
        <ContentContainer SidebarRight={<SidebarGame idGame={idGame} />}>
            <div className=" flex flex-wrap ">
                <div className="flex items-center  mb-4">
                    <IconSuggestion />
                    <h2 className="text-2xl font-semibold text-white ml-4">
                        Send suggestion
                    </h2>
                </div>
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
                            {loadingSuggestion ? (
                                <ButtonLoading />
                            ) : (
                                <button
                                    className="btn btn-primary mt-4 w-full mb-3"
                                    type="submit"
                                >
                                    Send suggestion
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
