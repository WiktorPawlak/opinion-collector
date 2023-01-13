import { useState } from 'react';
import { postOpinion } from "../api/opinionApi";
import { AddOpinionForm } from '../modules/categories/components/AddOpinion/AddOpinionForm';
import { useOpinion } from "../hooks/useOpinion";
import { useParams } from "react-router-dom";
import { useClient} from "../hooks/useUser";

export function AddOpinion() {
    const { id } = useParams();
    const { starReviews, starReviewLoading } = useOpinion();

    const [ starReview, setStarReview ] = useState('')
    const [ content, setContent ] = useState('')
    const [ pros, setPros ] = useState('')
    const [ cons, setCons ] = useState('')

    //console.log(useClient().getSelf());

    const handleSubmit = async (event) => {
        //event.preventDefault();
        const formData = new FormData();
        formData.append('starReview', starReview);
        formData.append('opinionContent', content);
        formData.append('opinionPros', encodeURIComponent(pros));
        formData.append('opinionCons', cons);
        formData.append('productId', id);
        formData.append('clientUsername', 'Roman');
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
