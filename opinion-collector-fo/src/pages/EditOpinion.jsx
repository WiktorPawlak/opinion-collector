import {useCallback, useEffect, useState} from 'react';
import {putOpinion, getOpinion, postOpinion} from "../api/opinionApi";
import { EditOpinionForm } from '../modules/opinions/EditOpinion/EditOpinionForm';
import { useOpinion } from "../hooks/useOpinion";
import { useParams } from "react-router-dom";
import { useClient } from "../hooks/useUser";
import { useNavigate } from 'react-router-dom';

export function EditOpinion() {
    const { id } = useParams();
    const { opinionId } = useParams();
    const { client } = useClient();
    const { starReviews, starReviewLoading } = useOpinion();
    const navigate = useNavigate();

    const [ opinionById, setOpinionById ] = useState();
    const [ starReview, setStarReview ] = useState('');
    const [ content, setContent ] = useState('');
    const [ pros, setPros ] = useState('');
    const [ cons, setCons ] = useState('');

    const findOpinionById = (async () => {
        let response;
        response = await getOpinion(opinionId);
        if (response[1] === 200) {
            setOpinionById(response[0]);
        } else {
            console.log('Nie ma takiej opinii');
        }
    });

    useEffect(() => {
        findOpinionById();
    }, [findOpinionById]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('opinionId', opinionId);
        formData.append('starReview', starReview);
        formData.append('opinionContent', encodeURIComponent(content));
        formData.append('opinionPros', encodeURIComponent(pros));
        formData.append('opinionCons', encodeURIComponent(cons));
        formData.append('productId', id);
        formData.append('clientUsername', client.username.username);
        navigate(`/products/${id}`);
        await putOpinion(Object.fromEntries(formData));
    };

    if (starReviewLoading) {
        return <p>Loading starReviews...</p>
    }

    return (
        <div className="container flex center-column">
            <EditOpinionForm
                handleSubmit={handleSubmit}
                starReviews={starReviews}
                setStarReview={setStarReview}
                setContent={setContent}
                setPros={setPros}
                setCons={setCons}
                id={opinionId}
            />
        </div>
    );
}
