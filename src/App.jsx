import { useEffect } from 'react';
import Login from './Login/Login';

function App() {
    /** DaisyUI Theme */
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'business');
    }, []);
    return (
        <>
            <Login />
        </>
    );
}

export default App;
