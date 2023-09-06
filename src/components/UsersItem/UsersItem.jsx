import { Link } from 'react-router-dom';
import placeholder from '../../../public/placeholderUser.png';
import PropTypes from 'prop-types';
import { isImageValid } from '../../utils/imageValidator';
import { useEffect, useState } from 'react';

function UsersItem({ id, name, avatar, email }) {
    const [showPlaceholder, setshowPlaceholder] = useState(true);

    useEffect(() => {
        const showCover = async () => {
            const validImage = await isImageValid(avatar);
            if (validImage) {
                setshowPlaceholder(false);
            }
        };
        showCover();
    }, [avatar]);
    return (
        <article className="flex bg-base-200 p-5 rounded-xl">
            <div className="">
                <Link to={`/profil/${id}`}>
                    <img
                        src={!showPlaceholder ? avatar : placeholder}
                        alt={`image cover of ${name.toLowerCase()}`}
                        className="w-20"
                    />
                </Link>
                <h2 className=" text-xl font-black my-4">
                    <Link
                        to={`/profil/${id}`}
                        className="hover:underline uppercase"
                    >
                        {name}
                    </Link>
                </h2>
                <div className="text-sm my-2">
                    <span className="">email : </span>
                    <span>{email}</span>
                </div>
            </div>
        </article>
    );
}
UsersItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    avatar: PropTypes.string,
    email: PropTypes.string,
};

export default UsersItem;
