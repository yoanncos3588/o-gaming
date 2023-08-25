import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Example from './Example';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import SignUp from './SignUp/SignUp';
function App() {
    /** DaisyUI Theme */
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'business');
    }, []);
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/example" element={<Example />} />
            </Routes>
        </>
    );
}

export default App;
