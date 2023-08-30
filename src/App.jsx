import { useEffect } from 'react';
import Login from './components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Issue from './components/CreateIssue/issue';

import SignUp from './components/SignUp/SignUp';
function App() {
    /** DaisyUI Theme */
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'business');
    }, []);
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" />
                <Route path="/login" element={<Login />} />
                <Route path="/create-issue" element={<Issue />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </>
    );
}

export default App;
