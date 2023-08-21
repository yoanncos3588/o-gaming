import { ReactComponent as IconSearch } from '../assets/icons/search.svg';

type Props = {};

const SearchBar = (props: Props) => {
    return (
        <form method="GET">
            <div className="relative focus-within:text-secondary-content">
                <span className="absolute inset-y-0 right-0 flex items-center pl-2 ">
                    <button
                        type="submit"
                        className="p-2 focus:outline-none focus:shadow-outline bg-primary rounded-r-lg"
                    >
                        <IconSearch fill="white" className="h-4 w-4" />
                    </button>
                </span>
                <input
                    type="search"
                    name="q"
                    className="text-sm text-white focus:outline-none focus:bg-white focus:text-secondary-content input input-bordered input-sm w-full max-w-xs pr-10"
                    placeholder="Search..."
                />
            </div>
        </form>
    );
};

export default SearchBar;
