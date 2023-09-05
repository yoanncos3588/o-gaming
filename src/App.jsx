import { useEffect } from 'react';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import CreateIssue from './components/CreateIssue/CreateIssue';

import CreateGame from './components/CreateGame/CreateGame';
import ProtectedRoute from './components/ProtectedRoute';
import Games from './components/Games/Games';
import Error from './components/error/error';
import Game from './components/Game/Game';

function App() {
    /** DaisyUI Theme */
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'business');
    }, []);
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="games/game/:gameId" element={<Game />} />
                {/* {routes for everybody} */}

                <Route path="/" element={<Games />} />
                
                <Route element={<ProtectedRoute role="guest" />}>
                    {/* {routes for guest only here} */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>
                <Route element={<ProtectedRoute role="logged" />}>
                    <Route
                        path="games/:idGame/create-issue"
                        element={<CreateIssue />}
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
