import { Autocomplete, Button, TextField } from '@mui/material';
import './AddProductForm.module.css';
import ImageUploaderWrapper from "../../../../common/components/FileUpload/ImageUploader";

export const AddProductForm = ({
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
  handleDropChange,
  isTitleError,
  isOriginError,
  isEanError,
  isImageError,
  isCategoryError
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
      renderInput={(params) =>
        <TextField
          error={isCategoryError}
          helperText={isCategoryError ? 'Category is required' : ' '}
          {...params}
          label="Kategoria" />}
    />
    <label>Title</label>
    <TextField
      error={isTitleError}
      helperText={isTitleError ? 'Title needs to be capital letter word' : ' '}
      sx={{ width: '80%' }}
      required
      onChange={(e) => setTitle(e.target.value)}
    />
    <label>Image</label>
      <ImageUploaderWrapper
        error={isImageError}
        helperText={isImageError ? 'Image is required' : ' '}
        onChange={handleFileChange}
        onDrop={handleDropChange} />
    <Autocomplete
      options={origins}
      onChange={(_, value) => {
        setOrigin(value);
      }}
      sx={{ width: '80%' }}
      renderInput={(params) => (
        <TextField
          error={isOriginError}
          helperText={isOriginError ? 'Origin is required' : ' '}
          {...params}
          label="Kraj pochodzenia" />
      )}
    />

    <label>EAN</label>
    <TextField
      error={isEanError}
      helperText={isEanError ? 'Only digits are allowed' : ' '}
      onChange={(e) => setEan(e.target.value)} />

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
