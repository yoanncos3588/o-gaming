import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Example from './Example';
import Games from './Games/Games';

function App() {
    /** DaisyUI Theme */
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'business');
    }, []);
    return (
        <Routes>
            <Route path="/example" element={<Example />} />
            <Route path="/games" element={<Games />} />
        </Routes>
    );
}

export default App;
