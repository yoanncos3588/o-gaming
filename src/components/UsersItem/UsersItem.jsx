import ContentContainer from '../ContentContainer';
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
        <ContentContainer>
            <div className="flex flex-wrap bg-base-200 p-6 align-middle rounded-lg w-fit">
                <div className=" justify-end">
                    <div className="avatar w-fit align-middle mr-3">
                        <div className="w-14 rounded-full">
                            <img
                                src={!showPlaceholder ? avatar : placeholder}
                                alt={`image cover of ${name}`}
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className=" text-xl font-black h-fit w-full">
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
                </div>
            </div>
        </ContentContainer>
    );
}
UsersItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    avatar: PropTypes.string,
    email: PropTypes.string,
};

export default UsersItem;
