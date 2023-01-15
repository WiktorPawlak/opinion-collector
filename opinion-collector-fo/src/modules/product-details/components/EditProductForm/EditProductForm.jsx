import { Autocomplete, Button, TextField } from '@mui/material';
import './EditProductForm.module.css';

export const EditProductForm = ({
  handleSubmit,
  categories,
  origins,
  isFilePicked,
  selectedFile,
  setCategoryId,
  setEan,
  setOrigin,
  setTitle,
  handleFileChange,
  id
}) => (
  <form className="form-container forms">
    <label>Category</label>
    <Autocomplete
      isOptionEqualToValue={(option, value) =>
        option.categoryId === value.categoryId
      }
      getOptionLabel={(option) => option.categoryName}
      options={categories}
      onChange={(_, value) => {
        setCategoryId(value.categoryId);
      }}
      sx={{ width: '80%' }}
      renderInput={(params) => <TextField {...params} label="Kategoria" />}
    />
    <label>Title</label>
    <TextField
      sx={{ width: '80%' }}
      required
      onChange={(e) => setTitle(e.target.value)}
    />
    <label>Image</label>
    <input required type="file" name="file" onChange={handleFileChange} />
    {isFilePicked ? (
      <div>
        <p>Filename: {selectedFile.name}</p>
        <p>Filetype: {selectedFile.type}</p>
        <p>Size in bytes: {selectedFile.size}</p>
      </div>
    ) : (
      <p>Select a file to show details</p>
    )}
    <Autocomplete
      options={origins}
      onChange={(_, value) => {
        setOrigin(value);
      }}
      sx={{ width: '80%' }}
      renderInput={(params) => (
        <TextField {...params} label="Kraj pochodzenia" />
      )}
    />

    <label>EAN</label>
    <TextField onChange={(e) => setEan(e.target.value)} />
    <br />
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
