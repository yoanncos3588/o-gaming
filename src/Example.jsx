import ContentContainer from './ContentContainer';

/**
 * Example of page using template contentcontainer
 * @returns
 */

function Example() {
    return (
        <ContentContainer Sidebar={<div>Side content components or html</div>}>
            <div>Main content components or html</div>
        </ContentContainer>
    );
}

export default Example;
