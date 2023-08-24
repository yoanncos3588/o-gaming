import PropTypes from 'prop-types';

const ContentContainer = ({
    children,
    SidebarLeft = null,
    SidebarRight = null,
}) => {
    return (
        <div className="container grid grid-cols-12 gap-4 mx-auto h-full p-4 auto-rows-min">
            {SidebarLeft && (
                <div className="col-span-12 lg:col-span-4">{SidebarLeft}</div>
            )}
            <div
                className={`col-span-12 order-2 ${
                    SidebarRight || SidebarLeft
                        ? 'lg:col-span-8'
                        : 'lg:col-span-12'
                }`}
            >
                {children}
            </div>
            {SidebarRight && (
                <div className="col-span-12 lg:col-span-4 lg:order-3 order-1">
                    {SidebarRight}
                </div>
            )}
        </div>
    );
};

ContentContainer.propTypes = {
    children: PropTypes.node,
    SidebarLeft: PropTypes.node,
    SidebarRight: PropTypes.node,
};

export default ContentContainer;
