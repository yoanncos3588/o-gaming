import { useEffect } from 'react';
import Login from './Login/Login';
import { Route, Routes } from 'react-router-dom';
import Example from './Example';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Games from '../Games/Games';
import SignUp from '../SignUp/SignUp';

function App() {
    /** DaisyUI Theme */
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'business');
    }, []);
    return (
        <>
            <ToastContainer />
            <Games />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/example" element={<Example />} />
            </Routes>
        </>
    );
}

export default App;
