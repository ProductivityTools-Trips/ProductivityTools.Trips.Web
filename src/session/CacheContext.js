import { useEffect, useState, createContext, useContext } from "react";
import service from '../services/apiService';


export const CacheContext = createContext()

export const useCache = () => {
    return useContext()
}

export function CacheProvider({ children }) {

    const [dictionary, setDictionary] = useState({'pawel':'wujczyk'});
    const [currencies, setCurrencies] = useState([]);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCurrencies = async () => {
            const r = await service.getCurrencyDictionary();
            setCurrencies(r);
            setDictionary(prevState => ({
                ...prevState, 'currencies': r
            }))
            console.log("currencies")
            console.log(r);
            console.log("dictionary");
            console.log(dictionary);
        };

        const fetchCategories = async () => {
            const r = await service.getCategoryDictionary();
            setCategories(r);
            setDictionary(prevState => ({
                ...prevState, 'categories': r
            }))
            console.log("categories")
            console.log(r);
            console.log("dictionary");
            console.log(dictionary);
        }
        console.log("CACHE PROVIDER INVOKED")
        fetchCurrencies();
        fetchCategories();
    }, [])

    return (
        <CacheContext.Provider value={dictionary}>{children}</CacheContext.Provider>
    )
}