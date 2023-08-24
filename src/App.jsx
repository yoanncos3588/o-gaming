import { useEffect } from 'react';
import Login from './Login/Login';
import { Route, Routes } from 'react-router-dom';
import Example from './Example';

function App() {
    /** DaisyUI Theme */
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'business');
    }, []);
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/example" element={<Example />} />
        </Routes>
    );
}

export default App;
