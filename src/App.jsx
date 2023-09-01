import { useEffect } from 'react';
import Login from './components/Login/Login';
import { Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import SignUp from './components/SignUp/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import Games from './components/Games/Games';
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
                <Route path="/game/:id" element={<Game />} />
                <Route path="/games" element={<Games />} />
                {/* {routes for everybody} */}
                <Route path="/" element="homepage" />
                <Route element={<ProtectedRoute role="guest" />}>
                    {/* {routes for guest only here} */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>
                <Route element={<ProtectedRoute role="logged" />}>
                    {/* {routes for connected user only here} */}
                </Route>
                <Route element={<ProtectedRoute role="developer" />}>
                    {/* {routes for dev only here} */}
                </Route>
            </Routes>
        </>
    );
}

export default App;
