import ContentContainer from '../ContentContainer';
import { Link } from 'react-router-dom';
import placeholder from '../../../public/placeholderUser.png';
import PropTypes from 'prop-types';
import { isImageValid } from '../../utils/imageValidator';
import { useEffect, useState } from 'react';

function UsersItem({ id, name, avatar }) {
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
            <div>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img
                            src={!showPlaceholder ? avatar : placeholder}
                            alt={`image cover of ${name.toLowerCase()}`}
                        />
                    </div>
                </div>
                <h2 className=" text-xl font-black my-4">
                    <Link
                        to={`/profil/${id}`}
                        className="hover:underline uppercase"
                    >
                        {name}
                    </Link>
                </h2>
            </div>
        </ContentContainer>
    );
}
UsersItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    avatar: PropTypes.string,
};

export default UsersItem;
