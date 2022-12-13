import { createContext, useEffect, useState } from 'react';

const SearchContext = createContext();

const SearchContextProvider = function({children}) {
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        console.log('search string in context: ' + searchString);
    }, [searchString]);

    return (
        <SearchContext.Provider value={{
            searchString: searchString,
            setSearchString: setSearchString
        }}>
            {children}
        </SearchContext.Provider>

    );
}

export { SearchContext, SearchContextProvider };