import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import ContentContainer from '../ContentContainer';
import axios from 'axios';
function CreateGame() {
    // const [selectedImage, setSelectedImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const onOptionChangeForCategories = (options) => {
        setSelectedCategories(options);
    };

    const onOptionChangeForTags = (options) => {
        setSelectedTags(options);
    };

    /** fetch categories */
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:3000/categories');

                if (res.status !== 200) {
                    toast.error(res.data.error, {
                        theme: 'colored',
                        toastId: 'errorFetchCategories',
                    });
                    return;
                }
                setCategories(res.data.categories);
            } catch (error) {
                toast.error('An unexpected error has occurred', {
                    theme: 'colored',
                    toastId: 'errorFetchCategories',
                });
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await axios.get('http://localhost:3000/tags');
                if (res.status !== 200) {
                    toast.error(res.data.error, {
                        theme: 'colored',
                        toastId: 'errorFetchCategories',
                    });
                    return;
                }
                setTags(res.data.tags);
            } catch (error) {
                toast.error('An unexpected error has occurred', {
                    theme: 'colored',
                    toastId: 'errorFetchCategories',
                });
            }
        };
        fetchTags();
    }, []);

    return (
        <ContentContainer>
            <div className=" w-full md:w-1/2 xl:w-3/5 bg-base-200 p-8 rounded-lg shadow-lg mx-auto">
                <h1 className="text-2xl font-black text-white mb-4">
                    Create a game
                </h1>
                <form>
                    <div className="form-control w-full  mb-8">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full "
                        />
                    </div>

                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">Categories</span>
                        </label>
                        <Select
                            name="colors"
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
                            className="textarea textarea-bordered h-24"
                            placeholder="Your game description"
                        ></textarea>
                    </div>

                    <div className="form-control mb-8">
                        <label className="label">
                            <span className="label-text">
                                Add an image cover from external URL
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your image url"
                            className="input input-bordered w-full"
                        />
                        <div className="flex">
                            <button className="btn btn-warning w-1/2">
                                Delete image
                            </button>
                            <button className="btn btn-success w-1/2">
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
                        <Select
                            name="colors"
                            options={tags}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            closeMenuOnSelect={false}
                            onChange={onOptionChangeForTags}
                            value={selectedTags}
                            getOptionLabel={(option) => `${option.title}`}
                            getOptionValue={(option) => option.title}
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
                            placeholder="Type here"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="form-control w-full mb-8">
                        <label className="label">
                            <span className="label-text">Release date</span>
                        </label>
                        <input
                            type="date"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Envoyer
                    </button>
                </form>
            </div>
        </ContentContainer>
    );
}

export default CreateGame;
