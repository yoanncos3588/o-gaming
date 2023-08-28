import ContentContainer from './ContentContainer';
import { toast } from 'react-toastify';

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
            </div>
        </ContentContainer>
    );
}

export default Example;
