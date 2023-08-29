import { useEffect } from 'react';
import Login from './components/Login/Login';
import { Route, Routes } from 'react-router-dom';
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
                <Route path="/" element={'homepage'} />
                <Route element={<ProtectedRoute role={'visitor'} />}>
                    {/* {Les routes que pour les visiteurs vont ici} */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    {/* {Les routes que pour les membres connectés vont ici} */}
                </Route>
                <Route element={<ProtectedRoute role={'developer'} />}>
                    {/* {Les routes que pour les dev vont ici} */}
                </Route>
            </Routes>
        </>
    );
}

export default App;
