import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import ContentContainer from '../ContentContainer';
import { isImageValid } from '../../utils/imageValidator';
import { useNavigate } from 'react-router-dom';
import useApi from '../../hook/useApi';
import { ButtonLoading } from '../ButtonLoading';

function CreateGame() {
    // tag and categories from api
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [imageUrl, setImageUrl] = useState(''); //https://i.imgur.com/asAuCMn.jpg image valid for testing
    const navigate = useNavigate();

    const { get: getCat, error: errorCat, data: dataCat } = useApi();

    const { get: getTags, error: errorTags, data: dataTags } = useApi();

    const {
        post: postGame,
        error: errorGame,
        loading: loadingGame,
        isComplete: isCompleteGame,
    } = useApi();

    const [gameData, setGameData] = useState({
        name: '',
        description: '',
        picture: 'https://i.imgur.com/asAuCMn.jpg',
        external_link: '',
        release_date: '',
        categories: [],
        tags: [],
    });

    /** fetch categories and tags */
    useEffect(() => {
        getCat(`${import.meta.env.VITE_API_URL}/categories`);
        getTags(`${import.meta.env.VITE_API_URL}/tags`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (dataCat && !categories.length) {
            setCategories(dataCat.categories);
        }
        if (errorCat) {
            toast.error('Can\t find categories', { toastId: 'errorGetCat' });
        }
        if (dataTags && !tags.length) {
            setTags(dataTags.tags);
        }
        if (errorTags) {
            toast.error('Can\t find tags', { toastId: 'errorGetTags' });
        }
    }, [
        dataCat,
        errorCat,
        dataTags,
        errorTags,
        categories.length,
        tags.length,
    ]);

    /**
     * Handle when user click on add image cover
     * @param {Event} e
     */
    const handleAddImage = async (e) => {
        e.preventDefault();
        try {
            const validImage = await isImageValid(imageUrl);
            if (!validImage) {
                throw Error('Image is not valid');
            } else {
                setGameData((prev) => {
                    return { ...prev, picture: imageUrl };
                });
                setImageUrl('');
            }
        } catch (error) {
            if (error !== undefined) {
                toast.error(error.message, {
                    toastId: 'errorImage',
                });
            } else {
                toast.error('An unexpected error has occurred', {
                    toastId: 'errorImage',
                });
            }
        }
    };

    /**
     * Handle when an user click on delete image in form
     * @param {Event} e
     */
    const handleDeleteImage = (e) => {
        e.preventDefault();
        setGameData((prev) => {
            return { ...prev, picture: '' };
        });
        setImageUrl('');
    };

    /**
     * Handle react-select for categories
     * @param {Array} options array of categories from react-select component
     */
    const onOptionChangeForCategories = (options) => {
        setSelectedCategories(options);
    };

    /**
     * Handle react-select for tags
     * @param {Array} options array of tags from react-select component
     */
    const onOptionChangeForTags = (options) => {
        setSelectedTags(options);
    };

    /**
     * Format new created tag object
     * @param {string} label
     * @returns {object} formated object for new tags to save in tags array
     */
    const createTag = (label) => ({
        title: label,
    });

    /**
     * Handle when user create a new tag with react-select component
     * @param {string} inputValue
     */
    const handleCreateTag = (inputValue) => {
        const newTag = createTag(inputValue);
        setSelectedTags((prev) => {
            return [...prev, newTag];
        });
    };

    /**
     * Handle input change on form
     * @param {*} e
     */
    const handleChange = (e) => {
        setGameData({
            ...gameData,
            [e.target.name]: e.target.value,
        });
    };

    // format categories for api
    useEffect(() => {
        /**
         * Get categories from state selectedCategories and transfer name into gameData state to match api
         */
        const formatCategoriesForApi = () => {
            let categoriesForAPI = [];
            selectedCategories.map((c) => categoriesForAPI.push(c.name));
            setGameData((prev) => {
                return { ...prev, categories: categoriesForAPI };
            });
        };
        formatCategoriesForApi();
    }, [selectedCategories]);

    // format tags for api
    useEffect(() => {
        /**
         * Get categories from state selectedCategories and transfer name into gameData state to match api
         */
        const formatTagsForApi = () => {
            let tagsForAPI = [];
            selectedTags.map((t) => tagsForAPI.push(t.title));
            setGameData((prev) => {
                return { ...prev, tags: tagsForAPI };
            });
        };
        formatTagsForApi();
    }, [selectedTags]);

    /**
     * Handle form submit and create game with api
     * @param {Event} e
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        postGame(`${import.meta.env.VITE_API_URL}/games/game`, gameData);
    };

    // success while posting game
    useEffect(() => {
        if (isCompleteGame) {
            navigate(`/?toast=gameCreated`);
        }
    }, [isCompleteGame, navigate]);

    // error while posting game
    useEffect(() => {
        if (errorGame) {
            toast.error(errorGame);
        }
    }, [errorGame]);

    return (
        <ContentContainer>
            <div className=" w-full  xl:w-3/5 bg-base-200 p-8 rounded-lg shadow-lg mx-auto">
                <h1 className="text-2xl font-black text-white mb-4">
                    Create a game
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-control w-full  mb-8">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            value={gameData.name}
                            name="name"
                            placeholder="Type here"
                            className="input input-bordered w-full bg-neutral"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">Categories</span>
                        </label>
                        <Select
                            name="categories"
                            options={categories}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            closeMenuOnSelect={false}
                            onChange={onOptionChangeForCategories}
                            value={selectedCategories}
                            getOptionLabel={(option) => `${option.name}`}
                            getOptionValue={(option) => option.name}
                            isMulti
                        />
                    </div>

                    <div className="form-control mb-8">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered h-24 bg-neutral"
                            name="description"
                            placeholder="Your game description"
                            value={gameData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="form-control mb-8">
                        {gameData.picture && (
                            <img
                                src={gameData.picture}
                                alt="selected cover image"
                                className="mb-4"
                            />
                        )}
                        <label className="label">
                            <span className="label-text">
                                Add an image cover from external URL{' '}
                                <span className="text-sm opacity-50">
                                    (1200x600px only, .jpg and .png only)
                                </span>
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your image url"
                            className={`input input-bordered w-full bg-neutral`}
                            disabled={gameData.picture !== ''}
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                        <div className="flex">
                            <button
                                className={`btn  w-1/2 ${
                                    gameData.picture
                                        ? 'btn-warning'
                                        : 'btn-disabled'
                                }`}
                                onClick={(e) => handleDeleteImage(e)}
                            >
                                Change image
                            </button>
                            <button
                                className={`btn  w-1/2 ${
                                    imageUrl || gameData.picture === ''
                                        ? 'btn-success'
                                        : 'btn-disabled'
                                }`}
                                onClick={handleAddImage}
                            >
                                Add image
                            </button>
                        </div>
                    </div>
                    <div className="form-control mb-8">
                        <label className="label">
                            <span className="label-text">
                                Select or create tags
                            </span>
                        </label>
                        <CreatableSelect
                            name="tags"
                            options={tags}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            closeMenuOnSelect={false}
                            onChange={onOptionChangeForTags}
                            value={selectedTags}
                            getOptionLabel={(option) => `${option.title}`}
                            getOptionValue={(option) => option.title}
                            onCreateOption={handleCreateTag}
                            isMulti
                        />
                    </div>
                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">
                                Official website or buy page
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your url"
                            className="input input-bordered w-full bg-neutral"
                            name="external_link"
                            onChange={handleChange}
                            value={gameData.external_link}
                        />
                    </div>
                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">Release date</span>
                        </label>
                        <input
                            type="date"
                            name="release_date"
                            placeholder="Type here"
                            className="input input-bordered w-full bg-neutral"
                            value={gameData.release_date}
                            onChange={handleChange}
                        />
                    </div>
                    {loadingGame ? (
                        <ButtonLoading />
                    ) : (
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            Envoyer
                        </button>
                    )}
                </form>
            </div>
        </ContentContainer>
    );
}

export default CreateGame;
