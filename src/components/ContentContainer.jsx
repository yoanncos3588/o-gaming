import PropTypes from 'prop-types';

const ContentContainer = ({
    children,
    SidebarLeft = null,
    SidebarRight = null,
}) => {
    return (
        <main className="container grid grid-cols-12 lg:gap-16 gap-8 mx-auto h-full px-4 lg:py-16 py-4 auto-rows-min">
            {SidebarLeft && (
                <section className="col-span-12 lg:col-span-4">
                    {SidebarLeft}
                </section>
            )}
            <section
                className={`col-span-12 order-2 ${
                    SidebarRight || SidebarLeft
                        ? 'lg:col-span-8'
                        : 'lg:col-span-12'
                }`}
            >
                {children}
            </section>
            {SidebarRight && (
                <section className="col-span-12 lg:col-span-4 lg:order-3 order-1">
                    {SidebarRight}
                </section>
            )}
        </main>
    );
};

ContentContainer.propTypes = {
    children: PropTypes.node,
    SidebarLeft: PropTypes.node,
    SidebarRight: PropTypes.node,
};

export default ContentContainer;
