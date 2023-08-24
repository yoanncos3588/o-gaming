import { useEffect } from 'react';
import Games from "./Games/Create_game"
function App() {
    /** DaisyUI Theme */
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'business');
    }, []);
    return (
        <>
            <Games/>
        </>
    );
}

export default App;
