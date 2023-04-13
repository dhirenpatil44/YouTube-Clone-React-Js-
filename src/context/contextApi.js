import React, { createContext, useEffect, useState } from 'react';
import { fetchDataFromApi } from "../utils/api";

export const Context = createContext();

export const AppContext = (props) => {
    const [loading, setloading] = useState(false);
    const [searchResults, setsearchResults] = useState(false);
    const [selectCategories, setselectCategories] = useState("New");
    const [mobileMenu, setmobileMenu] = useState(false);

    useEffect(() => {
        fecthSelectedCategoryData(selectCategories)
    }, [selectCategories]);

    const fecthSelectedCategoryData = (query) => {
        setloading(true);
        fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
            console.log(contents);
            setsearchResults(contents);
            setloading(false);
        })
    }

    return (
        <Context.Provider value={{
            loading, setloading,
            searchResults, 
            selectCategories, setselectCategories,
            mobileMenu, setmobileMenu
        }}>
            {props.children}
        </Context.Provider>
    )
}