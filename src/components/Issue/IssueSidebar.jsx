import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { isDeveloper } from '../../utils/userStatus';

const IssueSidebar = ({ issue, devId, setIssue, handleUpdateIssue }) => {
    const userData = useSelector((state) => state.user.userData);

    return (
        <div className="bg-base-200 p-4 mb-8">
            {setIssue &&
            handleUpdateIssue &&
            isDeveloper(userData) &&
            userData.userId === devId ? (
                <>
                    <form action="" onSubmit={handleUpdateIssue}>
                        <div className="form-control w-full mb-4">
                            <label className="label">
                                <span className="label-text">
                                    Update status
                                </span>
                            </label>
                            <select
                                className="select select-bordered"
                                value={!issue.status ? 'New' : issue.status}
                                onChange={(e) =>
                                    setIssue((prev) => {
                                        return {
                                            ...prev,
                                            status: e.target.value,
                                        };
                                    })
                                }
                            >
                                <option value={'New'}>New</option>
                                <option value={'Read'}>Read</option>
                                <option value={'Accepted'}>Accepted</option>
                                <option value={'Working on it'}>
                                    Working on it
                                </option>
                                <option value={'Closed'}>Refused</option>
                                <option value={'Finished'}>Finished</option>
                            </select>
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">
                                    Assign this issue to
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Name or email of the person"
                                className="input input-bordered w-full mb-4"
                                value={!issue.assign_to ? '' : issue.assign_to}
                                onChange={(e) =>
                                    setIssue((prev) => {
                                        return {
                                            ...prev,
                                            assign_to: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className="form-control w-52 mb-4">
                            <label className="cursor-pointer label">
                                <span className="label-text">
                                    Hide for public ?
                                </span>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-accent"
                                    checked={!issue.is_public}
                                    onChange={() =>
                                        setIssue((prev) => {
                                            return {
                                                ...prev,
                                                is_public: !prev.is_public,
                                            };
                                        })
                                    }
                                />
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            Update issue
                        </button>
                    </form>
                </>
            ) : (
                <>
                    <div className="">
                        <span className="text-sm">Status :</span>
                        <span className="text-accent relative text-xs uppercase ml-2">
                            • {issue.status ? issue.status : 'new'}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
};

IssueSidebar.propTypes = {
    devId: PropTypes.number,
    issue: PropTypes.object,
    handleUpdateIssue: PropTypes.func,
    handleDeleteIssue: PropTypes.func,
    setIssue: PropTypes.func,
};

export default IssueSidebar;
