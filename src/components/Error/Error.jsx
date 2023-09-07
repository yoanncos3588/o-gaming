import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center bg-black text-white">
            <div className="text-4xl md:text-7xl font-bold mb-4">Error 404</div>
            <p className="text-xl mb-7 md:text-4xl text-center px-2">
                We can&apos;t find the page you&apos;re looking for
            </p>
            <div className=" h-fit w-1/2">
                <div className="font-black uppercase text-center text-xl md:text-4xl mb-3 ">
                    <span className="text-accent">O&apos;</span>
                    <span className={'sm:inline-block'}>Gaming</span>
                </div>
            </div>
            <Link to="/">
                <button className="btn-primary text-white font-bold py-2 px-4 rounded">
                    Back to homepage
                </button>
            </Link>
        </div>
    );
};

export default Error;
