import { useEffect } from 'react';
import Create_game from './Games/Create_game';
import { Route, Routes } from 'react-router-dom';
import Example from './Example';
import Games from './Games/Games';
import Game from './Game/Game';
import { ToastContainer } from 'react-toastify';

function App() {
    /** DaisyUI Theme */
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'business');
    }, []);
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Games />} />
                <Route path="/example" element={<Example />} />
                <Route path="/create-game" element={<Create_game />} />
                <Route path="/game/" element={<Game />} />
            </Routes>
        </>
    );
}

export default App;
