import { Autocomplete, Button, TextField } from '@mui/material';

export const AddCategoryForm = ({
  handleSubmit,
  setCategoryId,
  setParentId,
  setCategoryName,
  categories
}) => (
  <form className="form-container">
    {/* <label>CategoryId</label>
    <TextField onChange={(e) => setCategoryId(e.target.value)} /> */}
    
    <label>Category Name</label>
    <TextField onChange={(e) => {setCategoryName(e.target.value); console.log(`e.target.value: ${e.target.value}`)}} />   
    <label>ParentId</label>
    {/* <TextField onChange={(e) => setParentId(e.target.value)} /> */}
    <Autocomplete
      isOptionEqualToValue={(option, value) =>
        option.categoryId === value.categoryId
      }
      getOptionLabel={(option) => option.categoryPath}
      options={categories}
      onChange={(_, value) => {
        setParentId(value.categoryId);
      }}
      sx={{ width: '80%' }}
      renderInput={(params) => <TextField {...params} label="Kategoria" />}
    /> 
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
