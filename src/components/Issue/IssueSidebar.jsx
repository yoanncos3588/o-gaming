import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { isDeveloper } from '../../utils/userStatus';

const IssueSidebar = ({ status, authorId, devId, handleDeleteIssue }) => {
    const userData = useSelector((state) => state.user.userData);

    /**
     * Check if user can delete the issue, only author and game of the game can
     * @returns {boolean}
     */
    const canDeleteIssue = () => {
        if (authorId === userData.userId) {
            return true;
        }
        if (isDeveloper(userData) && userData.userId === devId) {
            return true;
        }
        return false;
    };

    return (
        <div className="bg-base-200 p-4">
            <div className="">
                <span className="text-sm">Status :</span>
                <span className="text-accent relative text-xs uppercase ml-2">
                    • {status}
                </span>
            </div>
            {canDeleteIssue() && (
                <button
                    className="btn btn-primary mt-4 w-full"
                    onClick={handleDeleteIssue}
                >
                    Delete issue
                </button>
            )}
        </div>
    );
};

IssueSidebar.propTypes = {
    status: PropTypes.string,
    authorId: PropTypes.number,
    devId: PropTypes.number,
};

export default IssueSidebar;
