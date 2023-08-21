import './signIn.css';

function signIn() {
    return (
        <main className="main">
            <div className="container">
                <span className="title">
                    <h1 className="text-4xl text-start">Sign up</h1>
                </span>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">username</span>
                    </label>
                    <input
                        type="text"
                        placeholder="enter a username"
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">email</span>
                    </label>
                    <input
                        type="text"
                        placeholder="add an email"
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">password</span>
                    </label>
                    <input
                        type="text"
                        placeholder="enter password"
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">confirm password</span>
                    </label>
                    <input
                        type="text"
                        placeholder="comfirm your password"
                        className="input input-bordered w-full max-w-xs"
                    />
                </div>

                <div className="join">
                    <input
                        className="join-item btn"
                        type="radio"
                        name="options"
                        aria-label="developer"
                    />
                    <input
                        className="join-item btn"
                        type="radio"
                        name="options"
                        aria-label="Gamer"
                    />
                </div>
                <div className="sign-up">
                    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
                        sign up
                    </button>
                </div>

                <span className="footer-title">already have an password</span>

                <a className="link link-hover text-xl">Log in</a>
            </div>
        </main>
    );
}

export default signIn;
