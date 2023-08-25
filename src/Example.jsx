import ContentContainer from './ContentContainer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Example of page using template contentcontainer
 * @returns
 */

function Example() {
    const notify = () => toast('Wow so easy!');
    return (
        <ContentContainer
            SidebarLeft={<div>Side content components or html</div>}
        >
            <div>
                {' '}
                <button onClick={notify}>Notify!</button>
                <ToastContainer />
            </div>
        </ContentContainer>
    );
}

export default Example;
