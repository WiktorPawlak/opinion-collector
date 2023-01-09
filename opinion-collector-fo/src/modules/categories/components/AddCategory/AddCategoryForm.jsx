import { Autocomplete, Button, TextField } from '@mui/material';

export const AddCategoryForm = ({
  handleSubmit,
  setCategoryId,
  setParentId,
  setCategoryName
}) => (
  <form className="form-container">
    <label>CategoryId</label>
    <TextField onChange={(e) => setCategoryId(e.target.value)} />
    <label>ParentId</label>
    <TextField onChange={(e) => setParentId(e.target.value)} />
    <label>Category Name</label>
    <TextField onChange={(e) => {setCategoryName(e.target.value); console.log(`e.target.value: ${e.target.value}`)}} />    
    <Button
      sx={{ width: '40' }}
      variant="contained"
      onClick={handleSubmit}
      className="search-btn"
    >
      Submit
    </Button>
  </form>
);
