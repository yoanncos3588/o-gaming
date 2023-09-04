import { Link } from 'react-router-dom';

const SidebarIssue = ({ idGame }) => {
    return (
        <div>
            <Link
                className="text-md font-medium text-blue-800"
                to={`/games/game/:${idGame}`}
            >
                ⬅️ ​Return to game page
            </Link>
            <img
                className="my-3"
                src="https://img.redbull.com/images/c_crop,w_1920,h_960,x_0,y_103,f_auto,q_auto/c_scale,w_1200/redbullcom/2020/6/5/ctsejxmdtw9inp8zqqqd/red-bull-campus-clutch-valorant-agents"
                alt="jeu"
            />
            <h2 className=" font-bold underline mb-2">Game description</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
                voluptates veniam ab tempora repellendus ducimus, animi,
                necessitatibus delectus aperiam quas deserunt repudiandae nulla
                nesciunt dolor, ea sed et laborum quod?
            </p>
        </div>
    );
};

export default SidebarIssue;
