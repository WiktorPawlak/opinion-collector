import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  CardMedia,
  CardContent,
  Box,
  Card,
  Typography,
  Autocomplete
} from '@mui/material';

export const AddSuggestionForm = ({
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
  product,
  id
}) => (
  <>
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'stretch',
        gap: 2,
        padding: 2
      }}
    >
      <Card
        variant="outlined"
        sx={{ width: 345, backgroundColor: 'rgb(255,0,0,0.03)' }}
      >
        <CardMedia
          component="img"
          height="194"
          image={product.image}
          alt="Product image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {product.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Origin: {product.origin}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            EAN: {product.ean}
          </Typography>
        </CardContent>
      </Card>
      <Card
        variant="outlined"
        sx={{ width: 345, backgroundColor: 'rgb(0,255,0,0.03)' }}
      >
        <CardMedia
          sx={{ height: 140 }}
          
          title="Suggested product photo"
        />
        <CardContent>
          <input required type="file" name="file" onChange={handleFileChange}  />
          <TextField
            variant="filled"
            margin="none"
            size="small"
            label="Title"
            onChange={(event) => setTitle(event.target.value)}
          ></TextField>
          <Autocomplete
            options={categories}
            getOptionLabel={(category) => category.categoryName}
            onChange={(_, value) => setCategoryId(2)}
            sx={{ width: '50%' }}
            variant="filled"
            renderInput={(params) => (
              <TextField {...params} label="Category" variant="filled" />
            )}
          />

          <Autocomplete
            options={origins}
            onChange={(_, value) => setOrigin(value)}
            sx={{ width: '50%' }}
            variant="filled"
            renderInput={(params) => (
              <TextField {...params} label="Origin" variant="filled" />
            )}
          />
          <TextField
            variant="filled"
            margin="none"
            size="small"
            label="EAN"
            //value={ean}
            onChange={(event) => setEan(event.target.value)}
          ></TextField>
        </CardContent>
      </Card>
    </Box>

    <Button
      component={Link}
      to={`/products/${id}`}
      sx={{ width: '40' }}
      variant="contained"
      onClick={handleSubmit}
      className="search-btn"
    >
      Submit
    </Button>
  </>
);
