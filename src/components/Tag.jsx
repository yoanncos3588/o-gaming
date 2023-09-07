import PropTypes from 'prop-types';

const Tag = ({ name }) => {
    return (
        <div className="badge badge-warning badge-outline uppercase">
            {name}
        </div>
    );
};

Tag.propTypes = {
    name: PropTypes.string,
};

export default Tag;
