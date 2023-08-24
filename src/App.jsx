import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Example from './Example';
import SignIn from "./SignIn/signIn"
function App() {
    /** DaisyUI Theme */
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'business');
    }, []);
    return (
        <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/example" element={<Example />} />
        </Routes>
    );
}

export default App;
