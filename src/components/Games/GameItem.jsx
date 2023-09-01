import { Link } from 'react-router-dom';
import Category from '../Category';
import PropTypes from 'prop-types';
import placeholder from '/placeholder.jpg';
import { useEffect, useState } from 'react';
import { isImageValid } from '../../utils/imageValidator';

export const GameItem = ({
    id,
    name,
    image,
    publisher,
    publisherId,
    realeaseDate,
    description,
    categories,
    totalIssues,
    totalSuggestions,
}) => {
    const [showPlaceholder, setshowPlaceholder] = useState(true);

    useEffect(() => {
        const showCover = async () => {
            const validImage = await isImageValid(image);
            if (validImage) {
                setshowPlaceholder(false);
            }
        };
        showCover();
    }, [image]);

    /**
     * Format string to date yyyy-mm-dd
     * @param {string} date
     * @returns {string} date with format yyyy-mm-dd
     */
    const formatDate = (date) => {
        const newDate = new Date(date);
        return newDate.toISOString().split('T')[0];
    };

    return (
        <article className="grid gird-cols-1 lg:grid-cols-2 gap-6 bg-base-200 p-6">
            <div className="">
                <Link to={`/games/${id}`}>
                    <img
                        src={!showPlaceholder ? image : placeholder}
                        alt={`image cover of ${name.toLowerCase()}`}
                        className="w-full"
                    />
                </Link>
                <h2 className=" text-xl font-black my-4">
                    <Link
                        to={`/games/${id}`}
                        className="hover:underline uppercase"
                    >
                        {name}
                    </Link>
                </h2>
                <div className="text-sm my-2">
                    <span className="">Publisher : </span>
                    <span>
                        <Link to={`/user/${publisherId}`} className="underline">
                            {publisher}
                        </Link>
                    </span>
                </div>
                <div className="text-sm my-2">
                    <span>Released : </span>
                    <span>{formatDate(realeaseDate)}</span>
                </div>
            </div>
            <div className="">
                <div className="flex mb-2 text-xs">
                    <span className="p-1 inline-block min-w-[120px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.6)] shadow-warning">
                        <span className="font-bold">{totalIssues}</span> issues
                    </span>
                    <Link
                        to={`/games/${id}/create-issue`}
                        className="btn btn-warning btn-xs"
                    >
                        Add
                    </Link>
                </div>
                <div className="flex mb-4 text-xs">
                    <span className="p-1 inline-block min-w-[120px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.6)] shadow-info">
                        <span className="font-bold">{totalSuggestions}</span>{' '}
                        suggestions
                    </span>
                    <Link
                        to={`/games/${id}/create-suggestion`}
                        className="btn btn-info btn-xs"
                    >
                        Add
                    </Link>
                </div>
                <p className="text-sm">{description}</p>
                <ul className="mt-4 -mx-1">
                    {categories.map((c, index) => (
                        <li className="mx-1 inline-block" key={index}>
                            <Category name={c} />
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
};

GameItem.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
    publisher: PropTypes.string,
    publisherId: PropTypes.number,
    realeaseDate: PropTypes.string,
    description: PropTypes.string,
    categories: PropTypes.array,
    totalIssues: PropTypes.string,
    totalSuggestions: PropTypes.string,
};
