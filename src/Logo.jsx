const Logo = ({ shortForMobile }) => {
    return (
        <div className="font-black uppercase">
            <span className="text-accent">O'</span>
            <span className={`${shortForMobile && 'hidden sm:inline-block'}`}>
                Gaming
            </span>
        </div>
    );
};

Logo.defaultProps = {
    shortForMobile: false,
};

export default Logo;
