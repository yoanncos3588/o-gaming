import { Link } from 'react-router-dom';

const error = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
            <div className="text-4xl md:text-7xl font-bold mb-4">
                Erreur 404
            </div>
            <p className="text-xl mb-7 md:text-4xl text-center px-2">
                La page que vous recherchez est introuvable.
            </p>
            <div className=" h-fit w-1/2">
                <div className="font-black uppercase text-center text-xl md:text-4xl mb-3 ">
                    <span className="text-accent">O&apos;</span>
                    <span className={'sm:inline-block'}>Gaming</span>
                </div>
            </div>
            <Link to="/">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Retour à l&apos;accueil
                </button>
            </Link>
        </div>
    );
};

export default error;
