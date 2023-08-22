import './App.css';
import SignIn from './SignIn/signIn';
import { useEffect } from 'react';

function App() {
    /** DaisyUI Theme */
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'business');
    }, []);
    return (
        <>
            -
            <SignIn />
        </>
    );
}

export default App;
