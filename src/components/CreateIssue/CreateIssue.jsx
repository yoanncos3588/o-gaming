// import axios from 'axios';
import { useEffect, useState } from 'react';
import ContentContainer from '../ContentContainer';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SidebarIssue from './SidebarGame';
import Select from 'react-select';
import { ReactComponent as IconTools } from '../../assets/icons/tools.svg';
import useApi from '../../hook/useApi';
import { ButtonLoading } from '../ButtonLoading';

function CreateIssue() {
    const [tags, setTags] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [issueInfos, setIssueInfos] = useState({
        title: '',
        is_public: true,
        platform_id: 1,
        is_online: true,
        description: '',
        frequency: 'Regular',
        is_minor: true,
        replication: '',
        tags: [],
    });

    const userId = useSelector((state) => state.user.userData.userId);
    const publishedAt = new Date();
    const navigate = useNavigate();
    const { idGame } = useParams();

    const { get: getTags, error: errorTags, data: dataTags } = useApi();
    const {
        get: getPlatforms,
        error: errorPlatforms,
        data: dataPlatforms,
    } = useApi();
    const {
        post: postIssue,
        error: errorIssue,
        loading: loadingIssue,
        isComplete: isCompleteIssue,
    } = useApi();

    /** fetch platforms and tags */
    useEffect(() => {
        getPlatforms(`${import.meta.env.VITE_API_URL}/platforms`);
        getTags(`${import.meta.env.VITE_API_URL}/games/game/${idGame}/tags`);
    }, []);

    useEffect(() => {
        if (dataPlatforms && !platforms.length) {
            setPlatforms(dataPlatforms.platforms);
        }
        if (errorPlatforms) {
            toast.error('Can\t find platforms', {
                toastId: 'errorGetPlatforms',
            });
        }
        if (dataTags && !tags.length) {
            setTags(dataTags.tags);
        }
        if (errorTags) {
            toast.error('Can\t find tags', { toastId: 'errorGetTags' });
        }
    }, [dataPlatforms, errorPlatforms, dataTags, errorTags]);

    /** Handle change on form inputs */
    const handleChange = (e) => {
        if (e.target.value === 'true' || e.target.value === 'false') {
            setIssueInfos({
                ...issueInfos,
                [e.target.name]: convertValueToBoolean(e.target.value),
            });
        } else if (e.target.name === 'platform_id') {
            setIssueInfos({
                ...issueInfos,
                [e.target.name]: Number(e.target.value),
            });
        } else {
            setIssueInfos({
                ...issueInfos,
                [e.target.name]: e.target.value,
            });
        }
    };

    /**
     * Handle react-select for tags
     * @param {Array} options array of tags from react-select component
     */
    const onOptionChangeForTags = (options) => {
        setSelectedTags(options);
    };

    const convertValueToBoolean = (value) => {
        if (value === 'true') {
            return true;
        } else {
            return false;
        }
    };

    // submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        issueInfos.user_id = userId;
        issueInfos.published_at = publishedAt;
        e.preventDefault();
        postIssue(
            `${import.meta.env.VITE_API_URL}/games/game/${idGame}/issues`,
            issueInfos
        );
    };

    // success while posting game
    useEffect(() => {
        if (isCompleteIssue) {
            navigate(`/?toast=issueCreated`);
        }
    }, [isCompleteIssue, navigate]);

    // error while posting game
    useEffect(() => {
        if (errorIssue) {
            toast.error(errorIssue);
        }
    }, [errorIssue]);

    // format tags for api
    useEffect(() => {
        /**
         * Get categories from state selectedCategories and transfer name into gameData state to match api
         */
        const formatTagsForApi = () => {
            let tagsForAPI = [];
            selectedTags.map((t) => tagsForAPI.push(t.title));
            setIssueInfos((prev) => {
                return { ...prev, tags: tagsForAPI };
            });
        };
        formatTagsForApi();
    }, [selectedTags]);

    return (
        <ContentContainer SidebarRight={<SidebarIssue idGame={idGame} />}>
            <div className=" flex flex-wrap ">
                <div className="flex items-center  mb-4">
                    <IconTools />
                    <h2 className="text-2xl font-semibold text-white ml-4">
                        Create an Issue
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
                                value={issueInfos.title}
                            />
                        </div>
                        <div className="flex mb-8">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Visibility
                                    </span>
                                </label>
                                <p className=" text-base-content mb-3 text-sm opacity-50">
                                    <i>
                                        Private issue can only be seen by
                                        developpers, use it if you feel your
                                        issue can break the game for other
                                        players
                                        <strong>
                                            (ex: bug abuse in multiplayers game)
                                        </strong>
                                    </i>
                                </p>
                                <div className="join w-full flex-wrap">
                                    <input
                                        className={`join-item btn btn-primary ${
                                            !issueInfos.is_public &&
                                            'btn-outline'
                                        } lg:!w-1/2 !w-full`}
                                        type="radio"
                                        name="is_public"
                                        aria-label="Public"
                                        value={true}
                                        onChange={handleChange}
                                        checked={issueInfos.is_public}
                                    />
                                    <input
                                        className={`join-item btn btn-primary ${
                                            issueInfos.is_public &&
                                            'btn-outline'
                                        } lg:!w-1/2 !w-full`}
                                        type="radio"
                                        name="is_public"
                                        aria-label="Private"
                                        value={false}
                                        onChange={handleChange}
                                        checked={!issueInfos.is_public}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap place-content-around mb-8">
                            <div className=" w-1/2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Plateform
                                        </span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full bg-neutral"
                                        onChange={handleChange}
                                        name="platform_id"
                                        defaultValue={Number(
                                            issueInfos.platform_id
                                        )}
                                    >
                                        {platforms.map((Plateform) => (
                                            <option
                                                key={Plateform.id}
                                                value={Plateform.id}
                                            >
                                                {Plateform.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="w-1/2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Context
                                        </span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full bg-neutral"
                                        onChange={handleChange}
                                        name="is_online"
                                        defaultValue={true}
                                    >
                                        <option value={true}>Online</option>
                                        <option value={false}>Offline</option>
                                    </select>
                                </div>
                            </div>
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
                                value={issueInfos.description}
                            ></textarea>
                        </div>
                        <label className="label">
                            <span className="label-text">
                                Select tags for your issue
                            </span>
                        </label>
                        <div className="flex flex-wrap mb-8">
                            <Select
                                name="categories"
                                options={tags}
                                className="basic-multi-select w-full"
                                classNamePrefix="select"
                                closeMenuOnSelect={false}
                                onChange={onOptionChangeForTags}
                                value={selectedTags}
                                getOptionLabel={(option) => `${option.title}`}
                                getOptionValue={(option) => option.title}
                                isMulti
                            />
                        </div>
                        <div className="form-control mb-8">
                            <label className="label">
                                <span className="label-text">frequency</span>
                            </label>
                            <select
                                className="select select-bordered w-full lg:max-w-xs bg-neutral"
                                onChange={handleChange}
                                name="frequency"
                                defaultValue={issueInfos.frequency}
                            >
                                <option value={'Regular'}>Regular</option>
                                <option value={'Sometimes'}>Sometimes</option>
                                <option value={'Once'}>Once</option>
                            </select>
                        </div>
                        <div className="form-control mb-8">
                            <label className="label">
                                <span className="label-text">
                                    How to replicate
                                </span>
                            </label>
                            <textarea
                                id="replicate"
                                name="replication"
                                rows="4"
                                className="textarea textarea-bordered w-full bg-neutral"
                                placeholder="Describe how to reproduce your issue"
                                onChange={handleChange}
                                value={issueInfos.replication}
                            ></textarea>
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                            {loadingIssue ? (
                                <ButtonLoading />
                            ) : (
                                <button
                                    className="btn btn-primary mt-4 w-full mb-3"
                                    type="submit"
                                >
                                    create issue
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </ContentContainer>
    );
}

export default CreateIssue;
