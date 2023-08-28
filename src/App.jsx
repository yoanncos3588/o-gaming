import { useEffect } from 'react';
import Games from './Games/Create_game';
import { Route, Routes } from 'react-router-dom';
import Example from './Example';
import Games from './Games/Games';
import Game from './Game/Game';

function App() {
    /** DaisyUI Theme */
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'business');
    }, []);
    return (
        <Routes>
            <Route path="/games" element={<Games />} />
            <Route path="/example" element={<Example />} />
            <Route path="/games" element={<Games />} />
            <Route path="/game/" element={<Game />} />
        </Routes>
    );
}

export default App;
