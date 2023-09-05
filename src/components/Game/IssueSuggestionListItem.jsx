import { Link } from 'react-router-dom';
import Category from '../Category';
import { ReactComponent as IconTools } from '../../assets/icons/tools.svg';
import { ReactComponent as IconSuggestion } from '../../assets/icons/suggestion.svg';
import propTypes from 'prop-types';

export const IssueSuggestionListItem = ({
    id,
    title,
    status = null,
    author,
    tags = null,
    isSuggestions = false,
    date,
    idGame,
}) => {
    return (
        <div
            className={`bg-base-300 shadow-xl border-l-2 ${
                isSuggestions ? 'border-info' : 'border-warning'
            }`}
        >
            <div className="p-8 lg:pl-20 pl-12 lg:pt-12 relative">
                <h2 className="text-2xl font-bold mb-2 flex items-start relative">
                    <span className="mr-4 absolute -left-8 top-2">
                        {isSuggestions ? (
                            <IconSuggestion className="w-5 h-5" />
                        ) : (
                            <IconTools className="w-5 h-5" />
                        )}
                    </span>
                    <Link
                        to={`/game/${idGame}/${
                            isSuggestions ? 'suggestion' : 'issue'
                        }/${id}`}
                        className="hover:underline "
                    >
                        {title}
                    </Link>
                </h2>

                {tags && !isSuggestions && (
                    <ul className="flex flex-wrap -mx-1">
                        {tags.map((e, index) => (
                            <li className="m-1" key={index}>
                                <Category name={e} />
                            </li>
                        ))}
                    </ul>
                )}

                <div className="text-sm italic mt-2 text-secondary opacity-70">
                    <span>
                        posted by :{' '}
                        <span className="">
                            <Link
                                className="hover:underline font-bold"
                                to={`/user/${author}`}
                            >
                                {author}
                            </Link>{' '}
                            {date}
                        </span>
                    </span>
                </div>
                {!isSuggestions && (
                    <span className="lg:absolute lg:top-4 mt-2 lg:mt-0 lg:right-4 text-accent relative text-xs uppercase block text-right">
                        {status ? status : 'new'}
                    </span>
                )}
            </div>
        </div>
    );
};
IssueSuggestionListItem.propTypes = {
    id: propTypes.number,
    title: propTypes.string,
    author: propTypes.string,
    tags: propTypes.array,
    status: propTypes.string,
    isSuggestions: propTypes.bool,
    date: propTypes.string,
    idGame: propTypes.string,
};
