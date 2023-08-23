import { useEffect } from 'react';
import Profile from "./Profile/Profil"
function App() {
    /** DaisyUI Theme */
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'business');
    }, []);
    return (
        <>
            <Profile/>
        </>
    );
}

export default App;
