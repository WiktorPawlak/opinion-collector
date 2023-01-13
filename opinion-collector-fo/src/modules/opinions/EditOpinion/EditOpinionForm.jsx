import { Autocomplete, Button, TextField } from '@mui/material';
import {Link} from "react-router-dom";

export const EditOpinionForm = ({
                                   handleSubmit,
                                   starReviews,
                                   setStarReview,
                                   setContent,
                                   setPros,
                                   setCons,
                                   id
                               }) => (
    <form className="form-container">
        Edit Your Opinion:
        <Autocomplete
            options={starReviews}
            onChange={(_, value) => {
                setStarReview(value);
            }}
            sx={{ width: '35%' }}
            renderInput={(params) => (
                <TextField {...params} label="Star rating..." />
            )}
        />
        <label>Content</label>
        <TextField onChange={(e) =>
            setContent(e.target.value)} />
        <label>Pros</label>
        <TextField onChange={(e) =>
            setPros(e.target.value)} />
        <label>Cons</label>
        <TextField onChange={(e) =>
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
