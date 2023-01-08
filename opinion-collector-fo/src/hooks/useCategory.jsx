import {useState, useEffect, useCallback} from "react";
import {apiGetCategories} from "../api/categoryApi";

export function useCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = apiGetCategories()
    //         setCategories(response[0])
    //         setLoading(false);
    //     }
    //     fetchData();
    // }, []);

    const getCategories = useCallback(async () => {
        const response = await apiGetCategories();

        if (response[1] === 200) {
            setCategories(response[0]);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getCategories()
    }, [getCategories]);

    return {categories, loading}
}
