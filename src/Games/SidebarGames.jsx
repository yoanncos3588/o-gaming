import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useSearchParams } from 'react-router-dom';

export const SidebarGames = () => {
    const [categories, setCategories] = useState([]);

    const { search } = useLocation();
    const categoryPath = new URLSearchParams(search).get('cat');

    console.log(categoryPath);

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
                                to={`/games?cat=${'all'}`}
                                className={`hover:underline ${
                                    categoryPath === 'all' ? 'text-accent' : ''
                                }`}
                            >
                                All
                            </Link>
                        </li>
                        {categories.map((c) => (
                            <li key={c.id} className="lg:mb-2 mb-4">
                                <Link
                                    to={`/games?cat=${c.name.toLowerCase()}`}
                                    className={`hover:underline ${
                                        categoryPath === c.name.toLowerCase()
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
                        <select className="select select-bordered w-full">
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
