import { Autocomplete, Button, TextField } from '@mui/material';
import './EditProductForm.module.css';
import ImageUploaderWrapper from "../../../../common/components/FileUpload/ImageUploader";

export const EditProductForm = ({
  handleSubmit,
  categories,
  origins,
  isFilePicked,
  selectedFile,
  setEan,
  setCategory,
  setOrigin,
  setTitle,
  ean,
  category,
  origin,
  title,
  handleFileChange,
  handleDropChange,
  isTitleError,
  isOriginError,
  isEanError,
  isCategoryError,
  id
}) => (
  <form className="form-container forms">
    <label>Category</label>
    <Autocomplete
      defaultValue={category}
      isOptionEqualToValue={(option, value) =>
        option.categoryId === value.categoryId
      }
      getOptionLabel={(option) => option.categoryName}
      options={categories}
      onChange={(_, value) => {
        setCategory(value);
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
      defaultValue={title}
      sx={{ width: '80%' }}
      required
      onChange={(e) => setTitle(e.target.value)}
    />
    <label>Image</label>
      <ImageUploaderWrapper onChange={handleFileChange} onDrop={handleDropChange}/>
    <Autocomplete
      defaultValue={origin}
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
      defaultValue={ean}
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
