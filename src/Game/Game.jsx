import { Link } from 'react-router-dom';
import ContentContainer from '../ContentContainer';
import Category from '../Category';
import { IssuesListItem } from './IssuesListItem';

const Game = () => {
    const categories = ['FPS', 'Action'];
    return (
        <ContentContainer>
            <div className="grid grid-cols-12 lg:gap-16 gap-0">
                <div className="lg:col-span-8 col-span-12">
                    <div className="flex flex-col">
                        <img
                            src="https://placehold.co/600x300"
                            alt=""
                            className="mb-8 order-2 lg:order-1"
                        />
                        <h1 className="text-4xl font-black mb-8 order-1 lg:order-2">
                            The Elder Scrolls V Skyrim Special Edition
                        </h1>
                    </div>
                </div>
                <div className="lg:col-span-4 col-span-12">
                    <div className="flex justify-center flex-col items-center ">
                        <Link to={'#'} className="btn w-full mb-4">
                            Official website
                        </Link>
                        <Link to={'#'} className="btn btn-warning w-full mb-4">
                            Report an issue
                        </Link>
                        <Link to={'#'} className="btn btn-info w-full mb-4">
                            Send suggestion
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex -m-2 flex-wrap flex-col lg:flex-row my-4 lg:mt-0">
                <div className="text-sm m-2">
                    <span>Publisher : </span>
                    <Link to={`#`} className="underline">
                        Bethesda Softworks
                    </Link>
                </div>
                <div className="text-sm m-2">
                    <span>Released : </span>
                    <span>2014</span>
                </div>
            </div>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac
                aliquet mi. Fusce dictum facilisis enim in mollis. Nam eu diam
                eu diam tristique feugiat. Praesent risus orci, accumsan sit
                amet dui at, scelerisque sollicitudin sem. Pellentesque gravida
                ante sed magna sodales, eu feugiat tortor vestibulum. Etiam orci
                felis, rhoncus a libero sit amet, interdum dictum odio. Ut
                sagittis nulla dolor, eget auctor ligula pellentesque vel.
                Maecenas accumsan enim ac neque commodo, sed tincidunt nibh
                fermentum.
            </p>
            <ul className="mt-4 -mx-1">
                {categories.map((c) => (
                    <li className="mx-1 inline-block" key={c.id}>
                        <Category name={c} />
                    </li>
                ))}
            </ul>

            <div className="tabs tabs-boxed mt-8">
                <a className="tab tab-active text-lg font-bold">Issues</a>
                <a className="tab  text-lg font-bold">Suggestions</a>
            </div>
            <form action="" className="w-full mt-4">
                <div className="join w-full flex lg:flex-row flex-col">
                    <select className="select select-bordered lg:join-item">
                        <option disabled selected>
                            Filter
                        </option>
                        <option>Weapons</option>
                        <option>Main character</option>
                    </select>
                    <div className="flex-1">
                        <div>
                            <input
                                className="input input-bordered lg:join-item w-full"
                                placeholder="Search"
                            />
                        </div>
                    </div>
                    <button className="btn-primary btn lg:join-item">
                        Search
                    </button>
                </div>
            </form>

            <ul className="mt-4">
                <li className="mb-4">
                    <IssuesListItem />
                </li>
                <li className="mb-4">
                    <IssuesListItem />
                </li>
                <li className="mb-4">
                    <IssuesListItem />
                </li>
                <li className="mb-4">
                    <IssuesListItem />
                </li>
                <li className="mb-4">
                    <IssuesListItem />
                </li>
            </ul>
        </ContentContainer>
    );
};

export default Game;
