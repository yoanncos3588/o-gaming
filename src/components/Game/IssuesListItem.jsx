import { Link } from 'react-router-dom';
import Category from '../Category';
import { ReactComponent as IconTools } from '../../assets/icons/tools.svg';
import propTypes from 'prop-types';

export const IssuesListItem = ({ title, status, author, tags }) => {
    return (
        <div className="bg-base-300 shadow-xl border-l-2 border-warning">
            <div className="p-8 lg:pl-20 pl-12 lg:pt-12 relative">
                <h2 className="text-2xl font-bold mb-2 flex items-start relative">
                    <span className="mr-4 absolute -left-8 top-2">
                        <IconTools className="w-5 h-5" />
                    </span>
                    <Link to={'issue/:id-issue'} className="hover:underline ">
                        {title}
                    </Link>
                </h2>

                <ul className="flex flex-wrap -mx-1">
                    {tags.map((e, index) => (
                        <li className="m-1" key={index.id}>
                            <Category name={e} />
                        </li>
                    ))}
                </ul>

                <div className="text-sm italic mt-2 text-secondary opacity-70">
                    <span>
                        posted by :{' '}
                        <span className="">
                            <Link className="hover:underline font-bold">
                                {author}
                            </Link>{' '}
                            the 21/09/2022
                        </span>
                    </span>
                </div>
                <span className="lg:absolute lg:top-4 mt-2 lg:mt-0 lg:right-4 text-accent relative text-xs uppercase block text-right">
                    {status}
                </span>
            </div>
        </div>
    );
};
IssuesListItem.propTypes = {
    title: propTypes.string,
    author: propTypes.string,
    tags: propTypes.array,
    status: propTypes.string,
};
