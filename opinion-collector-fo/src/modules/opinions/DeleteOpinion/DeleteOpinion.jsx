import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {putOpinionHidden} from "../../../api/opinionApi";

export function DeleteOpinion() {
    const { id } = useParams();
    const [ opinion, setOpinion ] = useState(null);

    const fetchOpinionData = useCallback(async () => {
        const response = await putOpinionHidden(id);
        setOpinion(response[0]);
    }, [id]);

    useEffect(() => {
        fetchOpinionData();
    }, [fetchOpinionData]);
}
