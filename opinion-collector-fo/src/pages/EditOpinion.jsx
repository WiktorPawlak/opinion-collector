import {useCallback, useState} from 'react';
import { putOpinion } from "../api/opinionApi";
import { EditOpinionForm } from '../modules/opinions/EditOpinion/EditOpinionForm';
import { useOpinion } from "../hooks/useOpinion";
import { useParams } from "react-router-dom";
import { useClient} from "../hooks/useUser";
import {useLocation} from "react-router-dom";
import {getProductOpinions} from "../api/productApi";
import Opinion from "../common/components/OpinionTile/OpinionTile";
import {apiGetActiveClients} from "../api/authApi";

export function EditOpinion() {
    const { id } = useParams();
    const { client } = useClient();
    const { starReviews, starReviewLoading } = useOpinion();

    const [ starReview, setStarReview ] = useState('')
    const [ content, setContent ] = useState('')
    const [ pros, setPros ] = useState('')
    const [ cons, setCons ] = useState('')
    const now = new Date();

    const handleSubmit = async (event) => {
        //event.preventDefault();
        /*const formData = new FormData();
        formData.append('starReview', starReview);
        formData.append('opinionContent', encodeURIComponent(content));
        formData.append('opinionPros', encodeURIComponent(pros));
        formData.append('opinionCons', encodeURIComponent(cons));
        formData.append('productId', id);
        formData.append('clientUsername', client.username.username);*/
        await putOpinion();
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
                content={content}
                pros={pros}
                cons={cons}
            />
        </div>
    );
}
