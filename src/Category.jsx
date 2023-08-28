import PropTypes from 'prop-types';

const Category = ({ name }) => {
    return (
        <span className=" shadow-[inset_0_0_0_1px_rgba(0,0,0,0.6)] shadow-secondary p-1 text-xs inline-block">
            {name}
        </span>
    );
};

Category.propTypes = {
    name: PropTypes.string,
};

export default Category;
