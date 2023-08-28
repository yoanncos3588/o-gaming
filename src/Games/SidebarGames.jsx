import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';

export const SidebarGames = () => {
    const [categories, setCategories] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

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

    // get categories from api
    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get('http://localhost:3000/categories');
                setCategories(res.data.categories);
            } catch (error) {
                console.log(error);
            }
        };
        getCategories();
    }, []);

    /**
     * handle click on filter by category
     * @param {string} categoryName
     */
    const handleChangeCategory = (e, categoryName) => {
        e.preventDefault();
        setSearchParams((prev) => {
            prev.set('cat', categoryName.toLowerCase());
            return prev;
        });
    };

    /**
     * handle change on filter by year
     * @param {Event} e
     */
    const handleSelectYear = (e) => {
        setSearchParams((prev) => {
            prev.set('year', e.target.value.toLowerCase());
            return prev;
        });
    };

    return (
        <>
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
                                onClick={(e) => handleChangeCategory(e, 'all')}
                                // to={`/games?cat=${'all'}`}
                                className={`hover:underline ${
                                    searchParams.get('cat') === 'all'
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
                                        searchParams.get('cat') ===
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
        </>
    );
};
