function Create_game() {
    return (
        <main>
            <div className="flex justify-center items-center">
                <div className=" w-full md:w-1/2 xl:w-3/5 bg-neutral p-8 rounded-lg shadow-lg m-2">
                    <h2 className="text-2xl font-semibold text-white mb-4">
                        Create a game
                    </h2>
                    <form>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-white text-sm font-medium mb-2"
                            >
                                title
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="add a title"
                            />
                        </div>
                        <div className="flex">
                            <button className="btn btn-info justify-end">
                                add
                            </button>
                        </div>

                        <section className="mb-4 flex flex-wrap w-3/6">
                            <div className="form-control w-1/2 mr-3">
                                <label className="cursor-pointer label ">
                                    <span className="label-text">action</span>
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-info"
                                    />
                                </label>
                            </div>
                            <div className="form-control w-1/2 mr-3">
                                <label className="cursor-pointer label ">
                                    <span className="label-text">
                                        Simulation
                                    </span>
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-info"
                                    />
                                </label>
                            </div>
                            <div className="form-control w-1/4 mr-3">
                                <label className="cursor-pointer label ">
                                    <span className="label-text">aventure</span>
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-info"
                                    />
                                </label>
                            </div>
                            <div className="form-control w-1/2 mr-3">
                                <label className="cursor-pointer label ">
                                    <span className="label-text">compte</span>
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-info"
                                    />
                                </label>
                            </div>
                            <div className="form-control w-2/4 mr-3">
                                <label className="cursor-pointer label ">
                                    <span className="label-text">
                                        interface
                                    </span>
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-info"
                                    />
                                </label>
                            </div>
                        </section>

                        <div className="mb-4">
                            <label
                                htmlFor="message"
                                className="block text-white text-sm font-medium mb-2"
                            >
                                description
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="add an description"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Envoyer
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Create_game;
