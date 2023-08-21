import React from 'react';

type Props = {};

const SearchBar = (props: Props) => {
    return (
        <input
            type="text"
            placeholder="Search for games and users"
            className="input input-bordered w-full max-w-xs"
        />
    );
};

export default SearchBar;
