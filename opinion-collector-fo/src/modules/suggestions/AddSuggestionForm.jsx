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
  origins,
  categories,
  handleFileChange,
  isFilePicked,
  setTitle,
  setCategoryID,
  setOrigin,
  setEAN,
  id,
  product
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
          sx={{ height: 140 }}
          image="D:\Repositories\io_2022_01\opinion-collector-fo\src\common\images\monster.jpg"
          title="current product photo"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category ID: {product.category}
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
          image="D:\Repositories\io_2022_01\opinion-collector-fo\src\common\images\monster.jpg"
          title="Suggested product photo"
        />
        <CardContent>
          <input required type="file" name="file" onChange={handleFileChange} />
          <TextField
            variant="filled"
            margin="none"
            size="small"
            label="Title"
            //value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></TextField>
          <Autocomplete
            options={categories}
            getOptionLabel={(category) => category.categoryName}
            onChange={(_, value) => setCategoryID(value.categoryId)}
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
            onChange={(event) => setEAN(event.target.value)}
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
