import { useState } from 'react';
import { postOpinion } from "../api/opinionApi";
import { AddOpinionForm } from '../modules/opinions/AddOpinion/AddOpinionForm';
import { useOpinion } from "../hooks/useOpinion";
import { useParams } from "react-router-dom";
import { useClient } from "../hooks/useUser";
import { useNavigate } from 'react-router-dom';

export function AddOpinion() {
    const { id } = useParams();
    const { client } = useClient();
    const { starReviews, starReviewLoading } = useOpinion();
    const navigate = useNavigate();

    const [ starReview, setStarReview ] = useState('')
    const [ content, setContent ] = useState('')
    const [ pros, setPros ] = useState('')
    const [ cons, setCons ] = useState('')
    const now = new Date();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('starReview', starReview);
        formData.append('opinionContent', encodeURIComponent(content));
        formData.append('opinionPros', encodeURIComponent(pros));
        formData.append('opinionCons', encodeURIComponent(cons));
        formData.append('productId', id);
        formData.append('clientUsername', client.username.username);
        navigate(`/products/${id}`);
        await postOpinion(Object.fromEntries(formData));

    };

    if (starReviewLoading) {
        return <p>Loading starReviews...</p>
    }

    return (
        <div className="container flex center-column">
            <AddOpinionForm
                handleSubmit={handleSubmit}
                starReviews={starReviews}
                setStarReview={setStarReview}
                setContent={setContent}
                setPros={setPros}
                setCons={setCons}
                id={id}
            />
        </div>
    );

}
