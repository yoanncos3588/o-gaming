import { useEffect } from 'react';

import Header from './Header/Header';
import TemplateDrawer from './TemplateDrawer';

function App() {
    /** DaisyUI Theme */
    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', 'business');
    }, []);
    return (
        <>
            <TemplateDrawer>Hello world</TemplateDrawer>
        </>
    );
}

export default App;
