import { 
    createContext,
    useEffect,
    useReducer
} from "react";

import {
    getCategoriesAndDocuments 
} from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: [],
});

export const CATEGORIES_ACTION_TYPES = {
    SET_CURRENT_CATEGORY: 'SET_CURRENT_CATEGORY',
};

const categoriesReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CATEGORIES_ACTION_TYPES.SET_CURRENT_CATEGORY:
            return {
                ...state,
                categoriesMap: payload,
            }
        default: 
            throw new Error(`Unhandled type ${type} in categoriesReducer`);
    }
};

const INITIAL_STATE = {
    categoriesMap: [],
};

export const CategoriesProvider = ({ children }) => {
    const [{ categoriesMap }, dispatch ]= useReducer(categoriesReducer, INITIAL_STATE);

    const setCategoriesMap = (category) => {
        dispatch({ type: CATEGORIES_ACTION_TYPES.SET_CURRENT_CATEGORY, payload: category }) 
    };

    const value = { categoriesMap, setCategoriesMap }

    useEffect(() => {
            const getCategoriesMap = async () => {
                const categoryMap = await getCategoriesAndDocuments();
                setCategoriesMap(categoryMap);
            }

            getCategoriesMap();
        }, []
    );
    return (
        <CategoriesContext.Provider value={value}>{ children }</CategoriesContext.Provider>
    )
}