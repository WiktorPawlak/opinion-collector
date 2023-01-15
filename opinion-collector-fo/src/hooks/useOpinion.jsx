import { useState, useEffect, useCallback } from 'react';
import {
    getOpinionStarReviews,
    putOpinion,
    getOpinion
} from "../api/opinionApi";



export function useOpinion() {
    const [loading, setLoading] = useState(true);
    const [starReviews, setStarReviews] = useState([]);

    const getStarReviews = useCallback(async () => {
        const response = await getOpinionStarReviews();
        if (response[1] === 200) {
            setStarReviews(response[0]);
            setLoading(false);
        }
    }, []);

    const editOpinion = useCallback(async () => {
        const response = await putOpinion();
        return response[1] === 200;
    }, []);

    useEffect(() => {
        getStarReviews();
    }, [getStarReviews]);


    return {
        starReviews,
        loading,
        editOpinion,
        getStarReviews
    };
}
