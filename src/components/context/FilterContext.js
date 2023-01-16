import { createContext, useEffect, useState } from 'react';


const FilterContext = createContext();

const FilterContextProvider = function({children}) {
    const [rating, setRating] = useState(5);
    const [date, setDate] = useState(0);
    const [selectedActivities, setSelectedActivities] = useState(
        new Array()
    );

    useEffect(() => {
        console.log("filter changed from context")
    }, [rating, date, selectedActivities]);
    return (
        <FilterContext.Provider value={{
            rating : rating,
            setRating : setRating,
            date : date,
            setDate : setDate,
            selectedActivities : selectedActivities,
            setSelectedActivities : setSelectedActivities
        }}>
            {children}
        </FilterContext.Provider>
    );


}
export {FilterContext, FilterContextProvider}