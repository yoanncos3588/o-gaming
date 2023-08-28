import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
    login,
    updateCredentials,
    updateLoginErrorMessage,
} from '../../store/reducers/user';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentContainer from '../ContentContainer';

function Login() {
    const dispatch = useDispatch();
    const { email, password } = useSelector((state) => state.user.credentials);
    const username = useSelector((state) => state.user.username);
    //TODO remove and use username when available from API
    const userId = useSelector((state) => state.user.userId);
    const loginErrorMessage = useSelector(
        (state) => state.user.loginErrorMessage
    );
    const navigate = useNavigate();

    /** useEffect for success on login */
    useEffect(() => {
        //TODO replace id with username when available
        if (typeof userId !== 'undefined') {
            toast.success(`Welcome back ${userId}, you will be redirected…`, {
                autoClose: 2000,
                theme: 'colored',
                toastId: 'successLogin',
            });
        }
        toast.onChange((payload) => {
            if (payload.status === 'removed' && payload.id === 'successLogin') {
                navigate('/');
            }
        });
    }, [userId, navigate]);

    /** useEffect for error on login */
    useEffect(() => {
        if (loginErrorMessage !== '') {
            toast.error(loginErrorMessage, {
                theme: 'colored',
                toastId: 'errorLogin',
            });
            toast.onChange((payload) => {
                // delete store value for login error message just to be sure
                if (
                    payload.status === 'removed' &&
                    payload.id === 'errorLogin'
                ) {
                    dispatch(updateLoginErrorMessage(''));
                }
            });
        }
    }, [loginErrorMessage, dispatch]);

    /**
     * Handle form fields change and update redux store
     * @param {*} e
     */
    const handleChange = (e) => {
        dispatch(
            updateCredentials({ name: e.target.name, value: e.target.value })
        );
    };

    /**
     * Handle form submit and use login action from reducer
     * @param {*} e : submit event
     */
    const handleLogin = async (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            toast.error('Missing fields', {
                theme: 'colored',
            });
        }
        dispatch(login());
    };

    return (
        <ContentContainer>
            <section className="h-full gradient-form md:h-screen">
                <div className="container py-12 px-6 h-full">
                    <div className=" flex justify-center items-center flex-col h-full g-6 text-gray-800">
                        <div className="">
                            <div className="block bg-white shadow-lg rounded-lg">
                                <div className="lg:flex lg:flex-wrap g-0">
                                    <div className="px-4 md:px-0">
                                        <div className="md:p-12 md:mx-6">
                                            <div className="text-center">
                                                <h4 className="text-2xl font-semibold mt-1 mb-8 pt-2">
                                                    Log in
                                                </h4>
                                            </div>
                                            <form onSubmit={handleLogin}>
                                                <p className="mb-4">
                                                    Please Log in if you have an
                                                    account
                                                </p>

                                                <div className="mb-4">
                                                    <input
                                                        type="email"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="email"
                                                        name="email"
                                                        value={email}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="mb-4">
                                                    <input
                                                        type="password"
                                                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="Password"
                                                        name="password"
                                                        value={password}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    <button
                                                        className=" mt-4 inline-block px-6 py-2.5 text-black font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-primary hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                                                        type="submit"
                                                    >
                                                        Log in
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between pb-6 border-t-2 border-gray-300 pt-4">
                                                    <p className="mb-0 mr-2">
                                                        Dont have an account?
                                                    </p>
                                                    <button
                                                        type="button"
                                                        className="inline-block px-6 py-2 border-2 border-green-600 text-green-600 font-medium text-xs leading-tight uppercase rounded hover:bg-green-700 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                                    >
                                                        sign In
                                                    </button>
                                                </div>
                                            </form>
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

export default Login;
