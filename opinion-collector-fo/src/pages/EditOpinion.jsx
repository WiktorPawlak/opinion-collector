import { useState } from 'react';
import { putOpinion } from "../api/opinionApi";
import { EditOpinionForm } from '../modules/opinions/EditOpinion/EditOpinionForm';
import { useOpinion } from "../hooks/useOpinion";
import { useParams } from "react-router-dom";
import { useClient} from "../hooks/useUser";

export function EditOpinion() {
    const { id } = useParams();
    const { starReviews, starReviewLoading } = useOpinion();

    const [ starReview, setStarReview ] = useState('')
    const [ content, setContent ] = useState('')
    const [ pros, setPros ] = useState('')
    const [ cons, setCons ] = useState('')
    const now = new Date();

    //console.log(useClient().getSelf());

    const handleSubmit = async (event) => {
        //event.preventDefault();
        const formData = new FormData();
        formData.append('starReview', starReview);
        formData.append('opinionContent', encodeURIComponent(content));
        formData.append('opinionPros', encodeURIComponent(pros));
        formData.append('opinionCons', encodeURIComponent(cons));
        formData.append('productId', id);
        formData.append('clientUsername', 'Roman');
        await putOpinion(Object.fromEntries(formData));
        console.log(id);
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
                id={id}
            />
        </div>
    );

}
