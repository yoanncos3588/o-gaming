import { useEffect, useState } from 'react';
import ContentContainer from '../ContentContainer';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import useApi from '../../hook/useApi';

function SignIn() {
    const [userInfos, setUserInfos] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role_id: '2',
    });
    const { post, error, loading, isComplete } = useApi();
    const navigate = useNavigate();

    // api call is over with success
    useEffect(() => {
        if (isComplete) {
            navigate('/login?toast=accountOk');
        }
    }, [isComplete, navigate]);

    // api call send error
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    /**
     * Handle input change on form
     * @param {*} e
     */
    const handleChange = (e) => {
        setUserInfos({
            ...userInfos,
            [e.target.name]: e.target.value,
        });
    };

    /**
     * Handle user submit signup form
     * @param {*} e
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        post(`${import.meta.env.VITE_API_URL}/signup`, userInfos);
    };

    return (
        <ContentContainer>
            <section className="gradient-form">
                <div className="container py-12 px-6">
                    <div className="flex justify-center items-center flex-col g-6 text-gray-800">
                        <div className="">
                            <div className="block bg-white shadow-lg rounded-lg">
                                <div className="lg:flex lg:flex-wrap g-0">
                                    <div className="px-4 md:px-0">
                                        <div className="md:p-12 md:mx-6">
                                            <div className="text-center">
                                                <h4 className="text-2xl font-semibold mt-1 mb-8 pt-2">
                                                    Sign up
                                                </h4>
                                            </div>
                                            <form
                                                onSubmit={(e) =>
                                                    handleSubmit(e)
                                                }
                                            >
                                                <p className="mb-4">
                                                    Please Sign Up if you do not
                                                    have an account
                                                </p>
                                                <div className="mb-4">
                                                    <input
                                                        value={
                                                            userInfos.username
                                                        }
                                                        onChange={handleChange}
                                                        type="text"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="username"
                                                        name="username"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <input
                                                        value={userInfos.email}
                                                        onChange={handleChange}
                                                        type="email"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="email"
                                                        name="email"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <input
                                                        value={
                                                            userInfos.password
                                                        }
                                                        onChange={handleChange}
                                                        type="password"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="password"
                                                        name="password"
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <input
                                                        value={
                                                            userInfos.confirmPassword
                                                        }
                                                        onChange={handleChange}
                                                        type="password"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="confirm password"
                                                        name="confirmPassword"
                                                    />
                                                </div>
                                                <div className="join w-full flex-wrap">
                                                    <input
                                                        className={`join-item btn btn-accent ${
                                                            userInfos.role_id !==
                                                                '1' &&
                                                            'btn-outline'
                                                        } lg:!w-1/2 !w-full`}
                                                        type="radio"
                                                        name="role_id"
                                                        aria-label="Developpeur"
                                                        value={1}
                                                        onChange={handleChange}
                                                        checked={
                                                            userInfos.role_id ===
                                                            1
                                                        }
                                                    />
                                                    <input
                                                        className={`join-item btn btn-accent ${
                                                            userInfos.role_id !==
                                                                '2' &&
                                                            'btn-outline'
                                                        } lg:!w-1/2 !w-full`}
                                                        type="radio"
                                                        name="role_id"
                                                        aria-label="Gamer"
                                                        value={2}
                                                        onChange={handleChange}
                                                        checked={
                                                            userInfos.role_id ===
                                                            2
                                                        }
                                                    />
                                                </div>
                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    {!loading ? (
                                                        <button
                                                            className="btn btn-primary mt-4 w-full mb-3"
                                                            type="submit"
                                                        >
                                                            Sign Up
                                                        </button>
                                                    ) : (
                                                        <button className="btn btn-primary mt-4 w-full mb-3">
                                                            <span className="loading loading-spinner"></span>
                                                            loading
                                                        </button>
                                                    )}
                                                </div>
                                            </form>
                                            <div className="flex items-center justify-between pb-6 border-t-2 border-gray-300 pt-4">
                                                <p className="mb-0 mr-2">
                                                    Do you have an account?
                                                </p>
                                                <Link
                                                    to={`${
                                                        !loading
                                                            ? '/login'
                                                            : '#'
                                                    }`}
                                                    className={`${
                                                        loading &&
                                                        'btn-disabled'
                                                    } btn btn-success btn-sm btn-outline`}
                                                >
                                                    Log in
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </ContentContainer>
    );
}

export default SignIn;
