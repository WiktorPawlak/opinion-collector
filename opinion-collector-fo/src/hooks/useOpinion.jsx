import { useState, useEffect, useCallback } from 'react';
import { apiGetOpinions, getOpinionStarReviews, postOpinion } from "../api/opinionApi";

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

    useEffect(() => {
        getStarReviews();
    }, [getStarReviews]);

    return { starReviews, loading };
}
