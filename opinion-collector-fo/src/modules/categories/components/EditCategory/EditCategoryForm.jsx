import { Autocomplete, Button, TextField } from '@mui/material';

export function EditCategoryForm ({
  handleSubmit,
  setParent,
  setCategoryName,
  parent,
  categoryName,
  categories,
  isCategoryNameError
}) {
  return (
  <form className="form-container">

    <label>Category Name</label>
    <TextField
      error={isCategoryNameError}
      helperText={isCategoryNameError ? 'Category name needs to be capital letter word' : ' '}
      defaultValue={categoryName}
      onChange={(e) => {setCategoryName(e.target.value);
        console.log(`e.target.value: ${e.target.value}`)}}
    />
    <label>ParentId</label>
    <Autocomplete
      defaultValue={parent}
      isOptionEqualToValue={(option, value) =>
        option.categoryId === value.categoryId
      }
      getOptionLabel={(option) => option.categoryPath}
      options={categories}
      onChange={(_, value) => {
        setParent(value);
        console.log(value);
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
  )
};
