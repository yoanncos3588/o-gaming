import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import 'react-toastify/dist/ReactToastify.min.css';
import CreateIssue from './components/CreateIssue/CreateIssue';
import CreateGame from './components/CreateGame/CreateGame';
import Issue from './components/Issue/Issue';
import Games from './components/Games/Games';
import Game from './components/Game/Game';
import CreateSuggestion from './components/CreateIssue/CreateSuggestion';
import Suggestion from './components/Issue/Suggestion';
import Error from './components/error/error';

function App() {
    /** DaisyUI Theme */
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'business');
    }, []);
    return (
        <>
            <ToastContainer />
            <Routes>
                {/* {routes for everybody} */}
                <Route path="/" element={<Games />} />
                <Route path="/game/:idGame" element={<Game />} />
                <Route
                    path="/game/:idGame/issue/:idIssue"
                    element={<Issue />}
                />
                <Route
                    path="/game/:idGame/suggestion/:idSuggestion"
                    element={<Suggestion />}
                />
                <Route element={<ProtectedRoute role="guest" />}>
                    {/* {routes for guest only here} */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>
                <Route element={<ProtectedRoute role="logged" />}>
                    <Route
                        path="/game/:idGame/create-issue"
                        element={<CreateIssue />}
                    />
                    <Route
                        path="/game/:idGame/create-suggestion"
                        element={<CreateSuggestion />}
                    />

                    {/* {routes for connected user only here} */}
                </Route>
                <Route element={<ProtectedRoute role="developer" />}>
                    {/* {routes for dev only here} */}
                    <Route path="/create-game" element={<CreateGame />} />
                </Route>
                <Route path="*" element={<Error />} />
            </Routes>
        </>
    );
}

export default App;
