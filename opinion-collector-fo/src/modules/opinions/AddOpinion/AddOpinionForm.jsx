import {Autocomplete, Button, Rating, TextField} from '@mui/material';
import {Link} from "react-router-dom";
import React from "react";

export const AddOpinionForm = ({
                                    handleSubmit,
                                    starReviews,
                                    setStarReview,
                                    setContent,
                                    setPros,
                                    setCons,
                                    id
                                }) => (
    <form className="form-container">
        Add Your Opinion:
        <Rating
            size={"large"}
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
            sx={{
                width: { sm: 500, md: 500 },
                "& .MuiInputBase-root": {
                    height: 300,
                    },
                "& .MuiInputBase-input": {
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }
                }}
                multiline
                rows={10}
                onChange={(e) =>
                setContent(e.target.value)} />
        <label>Pros</label>
        <TextField
            sx={{
                width: { sm: 500, md: 500 },
                "& .MuiInputBase-root": {
                    height: 50}
            }}
            onChange={(e) =>
            setPros(e.target.value)} />
        <label>Cons</label>
        <TextField
            sx={{
                width: { sm: 500, md: 500 },
                "& .MuiInputBase-root": {
                    height: 50}
            }}
            onChange={(e) =>
            setCons(e.target.value)} />
        <br />
        <Button
            color="success"
            sx={{ width: '40' }}
            variant="contained"
            onClick={handleSubmit}
            className="search-btn"
            >
            Submit
        </Button>
    </form>
);
