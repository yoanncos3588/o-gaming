import { useEffect } from 'react';
import Login from './components/Login/Login';
import { Link, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import SignUp from './components/SignUp/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
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
                <Route path="/" element="homepage" />
                <Route element={<ProtectedRoute role="guest" />}>
                    {/* {routes for guest only here} */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>
                <Route element={<ProtectedRoute role="logged" />}>
                    {/* {routes for connected user only here} */}
                    <Route path="/only-online" element={<div>only-dev</div>} />
                </Route>
                <Route element={<ProtectedRoute role="developer" />}>
                    {/* {routes for dev only here} */}
                    <Route path="/only-dev" element={<div>only-dev</div>} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
