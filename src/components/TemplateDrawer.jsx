import Drawer from './Drawer/Drawer';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import SearchBar from './Header/SearchBar';
import PropTypes from 'prop-types';

const TemplateDrawer = ({ children }) => {
    return (
        <div className="drawer h-full">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}

                <Header />
                {/* Page content here */}
                {children}
                <Footer />
            </div>
            <Drawer />
        </div>
    );
};

TemplateDrawer.propTypes = {
    children: PropTypes.node,
};

export default TemplateDrawer;
