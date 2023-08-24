import { Link } from 'react-router-dom';

export const SidebarGames = () => {
    const category = [
        { id: 0, name: 'Action' },
        { id: 1, name: 'RPG' },
        { id: 2, name: 'Sports' },
        { id: 3, name: 'Simulation' },
    ];
    const getYearsList = () => {
        const currentYear = new Date().getFullYear();
        console.log(currentYear);
        let startingYear = 2000;
        const years = [];
        while (startingYear <= currentYear) {
            years.push(startingYear++);
        }
        return years.reverse();
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
                        Genres
                    </span>
                    <ul className="mb-6">
                        {category.map((c) => (
                            <li key={c.id} className="lg:mb-2 mb-4">
                                <Link to={'#'} className="hover:underline">
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
