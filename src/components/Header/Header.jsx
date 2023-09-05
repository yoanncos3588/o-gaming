import Logo from '../Logo';
import SearchBar from './SearchBar';
import Menu from './Menu';
import { ReactComponent as IconBurger } from '../../assets/icons/burger.svg';
import { MenuAuth } from './MenuAuth';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Header = () => {
    const [search, setSearch] = useState('');
    const [games, setgames] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/search?search=${search}`
                );
                console.log(res);
                setgames(res.data.games);
            } catch (err) {
                console.log(err);
            }
        };

        if (search !== '') {
            fetchdata();
        }
    }, [search]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/search?search=${search}`
                );
                // SELECT * FROM repos WHERE name = search LIMIT per_page OFFSET per_page * page -1

                console.log(res);
                setgames([...search, ...res.data.games]);
            } catch (err) {
                console.log(err);
            }
        };

        if (search !== '') {
            fetchdata();
        }
    });
    useEffect(() => {
        console.log(search);
        console.log(games);
        console.log();
    });

    return (
        <header className="w-full navbar border-b-2 border-base-200">
            <div className="mx-2 text-2xl">
                <Link to="/">
                    <Logo shortForMobile />
                </Link>
            </div>
            <div className="flex-1 px-2 mx-2">
                <SearchBar setSearch={setSearch} />
                <div className="hidden lg:block mx-4">
                    <ul className="menu menu-horizontal">
                        <Menu />
                    </ul>
                </div>
            </div>

            <ul className="menu menu-horizontal hidden lg:flex">
                <MenuAuth />
            </ul>
            <div className="flex-none lg:hidden">
                <label
                    htmlFor="my-drawer-3"
                    className="btn btn-square btn-ghost"
                >
                    <IconBurger stroke={'white'} className="w-6 h-6" />
                </label>
            </div>
        </header>
    );
};

export default Header;
