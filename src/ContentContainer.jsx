import PropTypes from 'prop-types';

const ContentContainer = ({ children, Sidebar = null }) => {
    return (
        <div className="container grid grid-cols-12 gap-4 mx-auto h-full p-4 auto-rows-min">
            <div
                className={`col-span-12 ${
                    Sidebar ? 'lg:col-span-8' : 'lg:col-span-12'
                }`}
            >
                {children}
            </div>
            {Sidebar && (
                <div className="col-span-12 lg:col-span-4">{Sidebar}</div>
            )}
        </div>
    );
};

ContentContainer.propTypes = {
    children: PropTypes.node,
    Sidebar: PropTypes.node,
};

export default ContentContainer;
