import { isDeveloper } from '../../utils/userStatus';
import { useSelector } from 'react-redux';
import propTypes from 'prop-types';

const DeleteItem = ({ handleDelete, authorId, devId }) => {
    const userData = useSelector((state) => state.user.userData);

    /**
     * Check if user can delete the issue, only author and game of the game can
     * @returns {boolean}
     */
    const canDeleteItem = () => {
        // if user is the author
        if (authorId === userData.userId) {
            return true;
        }
        // if user is dev and creator of the game
        if (isDeveloper(userData) && userData.userId === devId) {
            return true;
        }
        return false;
    };
    return (
        canDeleteItem() && (
            <>
                <button className="btn btn-error w-full" onClick={handleDelete}>
                    Delete
                </button>
            </>
        )
    );
};

DeleteItem.propTypes = {
    handleDelete: propTypes.func,
    authorId: propTypes.number,
    devId: propTypes.number,
};

export default DeleteItem;