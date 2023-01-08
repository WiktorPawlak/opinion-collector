import { useCategory } from '../hooks/useCategory';
import { useState } from 'react';
import { useProductOrigins } from '../hooks/useProductOrigins';
import { Autocomplete, TextField } from '@mui/material';
import { postProduct } from '../api/productApi';

export function ProductDetails() {
  const { categories, categoryLoading } = useCategory();
  const { origins, originLoading } = useProductOrigins();

  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState('');
  const [origin, setOrigin] = useState('');
  const [ean, setEan] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsFilePicked(true);

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('categoryId', categoryId);
    formData.append('title', title);
    formData.append('origin', origin);
    formData.append('ean', ean);

    await postProduct(formData);
  };

  if (categoryLoading) {
    return <p>Loading categories...</p>;
  } else if (originLoading) {
    return <p>Loading origins...</p>;
  }

  return (
    <div className="container">
      <div className="form-container">
        <form className="sign-up-form">
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
            renderInput={(params) => (
              <TextField {...params} label="Kategoria" />
            )}
          />
          <label>Title</label>
          <TextField
            sx={{ width: '80%' }}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Image</label>
          <input required type="file" name="file" onChange={changeHandler} />
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

          <button onClick={handleSubmit} className="search-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// {
//     "categoryId": 0,
//     "title": "string",
//     "image": [
//     "string"
// ],
//     "origin": "USA",
//     "visibility": true,
//     "ean": "string"
// }
