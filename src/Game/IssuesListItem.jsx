import { Link } from 'react-router-dom';
import Category from '../Category';
import { ReactComponent as IconTools } from '../assets/icons/tools.svg';

export const IssuesListItem = () => {
    return (
        <div className="bg-base-300 shadow-xl border-l-2 border-warning">
            <div className="p-8 lg:pl-20 pl-12 lg:pt-12 relative">
                <h2 className="text-2xl font-bold mb-2 flex items-start relative">
                    <span className="mr-4 absolute -left-8 top-2">
                        <IconTools className="w-5 h-5" />
                    </span>
                    <Link to={'#'} className="hover:underline ">
                        Moving item in list resets scroll when item has key
                        propMoving item in list resets scroll when item has key
                        propMoving item in list resets scroll when item has key
                        propMoving item in list resets scroll when item has key
                        prop
                    </Link>
                </h2>
                <ul className="flex flex-wrap -mx-1">
                    <li className="m-1">
                        <Category name={'RPG'} />
                    </li>
                    <li className="m-1">
                        <Category name={'RPG'} />
                    </li>
                    <li className="m-1">
                        <Category name={'RPG'} />
                    </li>
                </ul>
                <div className="text-sm italic mt-2 text-secondary opacity-70">
                    <span>
                        posted by :{' '}
                        <span className="">
                            <Link className="hover:underline font-bold">
                                userName
                            </Link>{' '}
                            the 21/09/2022
                        </span>
                    </span>
                </div>
                <span className="lg:absolute lg:top-4 mt-2 lg:mt-0 lg:right-4 text-accent relative text-xs uppercase block text-right">
                    • Working on it
                </span>
            </div>
        </div>
    );
};
