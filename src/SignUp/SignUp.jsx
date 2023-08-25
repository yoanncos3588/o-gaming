import axios from 'axios';
import { useState } from 'react';
import ContentContainer from '../ContentContainer';

function SignIn() {
    const [userInfos, setUserInfos] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role_id: '2',
    });

    const handleChange = (e) => {
        setUserInfos({
            ...userInfos,
            [e.target.name]: e.target.value,
        });
    };

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [username, setUsername] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    // const [role, setRole] = useState(2);
    // const responseBody = {
    //     username: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: '',
    //     role_id: '',
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // responseBody.username = username;
        // responseBody.email = email;
        // responseBody.password = password;
        // responseBody.confirmPassword = confirmPassword;
        // responseBody.avatar = '';
        // responseBody.role_id = role;
        try {
            const res = await axios.post(
                'http://localhost:3000/signup',
                userInfos
            );
            console.log(res);
            if (Object.prototype.hasOwnProperty.call(res.data, 'error')) {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ContentContainer>
            <div className="toast">
                <div className="alert alert-info">
                    <span>New message arrived.</span>
                </div>
            </div>
            <section className="gradient-form">
                <div className="container py-12 px-6">
                    <div className=" flex justify-center items-center flex-col h-full g-6 text-gray-800">
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
                                                <div className="join w-80 flex justify-center">
                                                    <input
                                                        className="join-horizontal btn bg-white  text-black hover:text-white focus:bg-black border-gray-300"
                                                        type="radio"
                                                        name="role"
                                                        aria-label="Developpeur"
                                                        value={1}
                                                        onChange={handleChange}
                                                        checked={
                                                            userInfos.role === 1
                                                        }
                                                    />
                                                    <input
                                                        className="join-horizontal btn bg-white mb-2 text-black hover:text-white border-gray-300"
                                                        type="radio"
                                                        name="role"
                                                        aria-label="Gamer"
                                                        value={2}
                                                        onChange={handleChange}
                                                        checked={
                                                            userInfos.role === 2
                                                        }
                                                    />
                                                </div>
                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    <button
                                                        className="btn btn-primary mt-4 inline-block px-6 py-2.5 shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                        type="submit"
                                                    >
                                                        Sign Up
                                                    </button>
                                                </div>
                                            </form>
                                            <div className="flex items-center justify-between pb-6 border-t-2 border-gray-300 pt-4">
                                                <p className="mb-0 mr-2">
                                                    Do you have an account?
                                                </p>
                                                <button
                                                    type="button"
                                                    className="inline-block px-6 py-2 border-2 border-success text-success font-medium text-xs leading-tight uppercase rounded hover:bg-success hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                                >
                                                    Log In
                                                </button>
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
