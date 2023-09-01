const Loading = () => {
    return (
        <div className="w-full flex items-center justify-center flex-col mt-12">
            <span className="font-black mb-4 block animate-pulse">LOADING</span>
            <span className="loading loading-ring loading-lg"></span>
        </div>
    );
};

export default Loading;
