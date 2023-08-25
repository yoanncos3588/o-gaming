import { useEffect } from 'react';
import Login from './Login/Login';
import { Route, Routes } from 'react-router-dom';
import Example from './Example';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
    /** DaisyUI Theme */
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'business');
    }, []);
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/example" element={<Example />} />
            </Routes>
        </>
    );
}

export default App;
