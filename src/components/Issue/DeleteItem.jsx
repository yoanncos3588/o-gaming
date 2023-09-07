import { useSelector } from 'react-redux';
import propTypes from 'prop-types';
import { useEffect, useState } from 'react';

const DeleteItem = ({ handleDelete, authorId, devId }) => {
    const userData = useSelector((state) => state.user.userData);
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    useEffect(() => {
        /**
         * Check if user can delete the issue, only author can
         * @returns {boolean}
         */
        const canDeleteItem = () => {
            // if user is the author
            if (userData && authorId === userData.userId) {
                return true;
            }
            return false;
        };
        setShowDeleteButton(canDeleteItem());
    }, [authorId, userData, devId]);

    return (
        showDeleteButton && (
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
