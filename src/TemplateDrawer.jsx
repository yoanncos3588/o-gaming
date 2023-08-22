import Drawer from './Drawer/Drawer';
import Header from './Header/Header';
import PropTypes from 'prop-types';

const TemplateDrawer = ({ children }) => {
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <Header />
                {/* Page content here */}
                {children}
            </div>
            <Drawer />
        </div>
    );
};

TemplateDrawer.propTypes = {
    children: PropTypes.node,
};

export default TemplateDrawer;
