import {Autocomplete, Button, Rating, TextField} from '@mui/material';
import {Link} from "react-router-dom";
import React from "react";

export const EditOpinionForm = ({
                                   handleSubmit,
                                   starReviews,
                                   setStarReview,
                                   setContent,
                                   setPros,
                                   setCons,
                                   id,
                               }) => (
    <form className="form-container">
        Edit Your Opinion:
        <Rating
            name="simple-controlled"
            onChange={(event, newValue) => {
                if(newValue===1) setStarReview('ONE')
                else if(newValue===2) setStarReview('TWO')
                else if(newValue===3) setStarReview('THREE')
                else if(newValue===4) setStarReview('FOUR')
                else if(newValue===5) setStarReview('FIVE')
            }}
            precision={1.0}
        />
        <label>Content</label>
        <TextField
            defaultValue={''}
            onChange={(e) =>
            setContent(e.target.value)} />
        <label>Pros</label>
        <TextField
            defaultValue={''}
            onChange={(e) =>
            setPros(e.target.value)} />
        <label>Cons</label>
        <TextField
            defaultValue={''}
            onChange={(e) =>
            setCons(e.target.value)} />
        <Button
            component = {Link} to={`/products/${id}`}
            sx={{ width: '40' }}
            variant="contained"
            onClick={handleSubmit}
            className="search-btn"
        >
            Submit
        </Button>
    </form>
);
