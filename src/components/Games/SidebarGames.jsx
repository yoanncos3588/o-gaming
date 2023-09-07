import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useApi from '../../hook/useApi';

export const SidebarGames = ({
    setCategoryFilter,
    setDateFilter,
    categoryFilter,
}) => {
    const { get: getCat, data: categories } = useApi();

    const getYearsList = () => {
        const currentYear = new Date().getFullYear();
        let startingYear = 2000;
        const years = [];
        while (startingYear <= currentYear) {
            years.unshift(startingYear++);
        }
        years.unshift('All');
        return years;
    };

    /** fetch categories */
    useEffect(() => {
        getCat(`${import.meta.env.VITE_API_URL}/categories`, 'categories');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * handle click on filter by category
     * @param {string} categoryName
     */
    const handleChangeCategory = (e, categoryName) => {
        e.preventDefault();
        setCategoryFilter(categoryName);
    };

    /**
     * handle change on filter by year
     * @param {Event} e
     */
    const handleSelectYear = (e) => {
        setDateFilter(e.target.value.toLowerCase());
    };

    return (
        <>
            {categories && (
                <div className="collapse lg:collapse-open lg:bg-base-100 bg-base-200  collapse-arrow">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl relative font-bold">
                        Filter by
                        <div className="bg-base-100 hidden lg:block w-[30px] h-full absolute top-0 right-0 z-10"></div>
                    </div>
                    <div className="collapse-content">
                        <span className="font-bold mb-4 uppercase text-sm inline-block text-secondary">
                            Categories
                        </span>
                        <ul className="mb-6">
                            <li className="lg:mb-2 mb-4">
                                <Link
                                    onClick={(e) =>
                                        handleChangeCategory(e, 'all')
                                    }
                                    className={`hover:underline ${
                                        categoryFilter.toLowerCase() === 'all'
                                            ? 'text-accent'
                                            : ''
                                    }`}
                                >
                                    All
                                </Link>
                            </li>
                            {categories.map((c) => (
                                <li key={c.id} className="lg:mb-2 mb-4">
                                    <Link
                                        onClick={(e) =>
                                            handleChangeCategory(e, c.name)
                                        }
                                        className={`hover:underline ${
                                            categoryFilter.toLowerCase() ===
                                            c.name.toLowerCase()
                                                ? 'text-accent'
                                                : ''
                                        }`}
                                    >
                                        {c.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <span className="font-bold mb-4 inline-block text-secondary">
                            Release date
                        </span>{' '}
                        <form action="">
                            <select
                                className="select select-bordered w-full"
                                onChange={handleSelectYear}
                            >
                                {getYearsList().map((y) => (
                                    <option key={y}>{y}</option>
                                ))}
                            </select>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

SidebarGames.propTypes = {
    setCategoryFilter: PropTypes.func,
    setDateFilter: PropTypes.func,
    categoryFilter: PropTypes.string,
};
