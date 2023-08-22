import PropTypes from 'prop-types';

const Logo = ({ shortForMobile }) => {
    return (
        <div className="font-black uppercase">
            <span className="text-accent">O&apos;</span>
            <span className={`${shortForMobile && 'hidden sm:inline-block'}`}>
                Gaming
            </span>
        </div>
    );
};

Logo.defaultProps = {
    shortForMobile: false,
};

Logo.propTypes = {
    shortForMobile: PropTypes.bool,
};

export default Logo;
