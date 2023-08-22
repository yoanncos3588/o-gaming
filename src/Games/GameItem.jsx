import { Link } from 'react-router-dom';
import Category from '../Category';
import PropTypes from 'prop-types';

export const GameItem = ({
    id,
    name,
    image,
    publisher,
    realeaseDate,
    totalIssues,
    totalSuggestions,
    description,
    categories,
}) => {
    return (
        <article className="grid gird-cols-1 lg:grid-cols-2 gap-6 bg-base-200 p-6">
            <div className="">
                <Link to={`/games/game/${id}`}>
                    <img
                        src={image}
                        alt={`image cover of ${name}`}
                        className="w-full"
                    />
                </Link>
                <h2 className=" text-xl font-black my-4">
                    <Link
                        to={`/games/game/${id}`}
                        className="hover:underline uppercase"
                    >
                        {name}
                    </Link>
                </h2>
                <div className="text-sm my-2">
                    <span className="">Publisher : </span>
                    <span>
                        <Link
                            to={`/user/${publisher.id}`}
                            className="underline"
                        >
                            {publisher.name}
                        </Link>
                    </span>
                </div>
                <div className="text-sm my-2">
                    <span>Released : </span>
                    <span>{realeaseDate}</span>
                </div>
            </div>
            <div className="">
                <div className="flex mb-2 text-xs">
                    <span className="p-1 inline-block min-w-[120px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.6)] shadow-warning">
                        <span className="font-bold">{totalIssues}</span> issues
                    </span>
                    <Link to={'#'} className="btn btn-warning btn-xs">
                        Add
                    </Link>
                </div>
                <div className="flex mb-4 text-xs">
                    <span className="p-1 inline-block min-w-[120px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.6)] shadow-info">
                        <span className="font-bold">{totalSuggestions}</span>{' '}
                        suggestions
                    </span>
                    <Link to={'#'} className="btn btn-info btn-xs">
                        Add
                    </Link>
                </div>
                <p className="text-sm">{description}</p>
                <ul className="mt-4 -mx-1">
                    {categories.map((c) => (
                        <li className="mx-1 inline-block" key={c.id}>
                            <Category name={c.name} />
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
    publisher: PropTypes.object,
    realeaseDate: PropTypes.string,
    totalIssues: PropTypes.number,
    totalSuggestions: PropTypes.number,
    description: PropTypes.string,
    categories: PropTypes.array,
};
