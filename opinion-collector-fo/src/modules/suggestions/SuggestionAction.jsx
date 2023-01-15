import { SaveOutlined, DeleteOutline } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CardMedia,
  CardContent,
  TextField,
  Autocomplete
} from '@mui/material';
import { Box } from '@mui/system';
import {
  useEditSuggestion,
  useHandleSuggestion
} from '../../hooks/useSuggestion';
import { useEffect, useState } from 'react';
import { apiGetSuggestion, apiDeleteSuggestion } from '../../api/suggestionApi';
import Card from '@mui/material/Card';
import { useClient } from '../../hooks/useUser';
import { useProductOrigins } from '../../hooks/useProductOrigins';
import { useCategory } from '../../hooks/useCategory';
import Typography from '@mui/material/Typography';

export function SuggestionAction({ suggestionInfo }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const { acceptSuggestion, rejectSuggestion } = useHandleSuggestion();
  const editSuggestion = useEditSuggestion();
  const { clientRole } = useClient();
  const { origins, loading } = useProductOrigins();
  const { categories, loadingCat } = useCategory();
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleDeleteSuggestionButton() {
    setIsDeleteModalOpen(true);
  }

  function handleDeleteModalClose() {
    setIsDeleteModalOpen(false);
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  async function handleConfirmDeleteButton() {
    await apiDeleteSuggestion(suggestionInfo);
    window.location.reload(true);
  }

  function handleChangeSuggestionStateButton() {
    console.log(suggestionInfo)
    setIsModalOpen(true);
  }
  const [title, setTitle] = useState(suggestionInfo.suggestionProduct.title);
  const [categoryId, setCategoryId] = useState(
    suggestionInfo.suggestionProduct.categoryId
  );
  const [ean, setEan] = useState(suggestionInfo.suggestionProduct.ean);
  const [origin, setOrigin] = useState(suggestionInfo.suggestionProduct.origin);

  return (
    <Box sx={{ display: 'inline' }}>
      <Button
        sx={{ marginRight: '7px' }}
        onClick={handleChangeSuggestionStateButton}
        variant="outlined"
      >
        Show changes
      </Button>
      <Button
        onClick={handleDeleteSuggestionButton}
        variant="outlined"
        startIcon={<DeleteOutline />}
      >
        Delete
      </Button>
      <Dialog open={isDeleteModalOpen} onClose={handleDeleteModalClose}>
        <DialogContent>
          Are you Sure? Your suggestion will be permanently lost
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteModalClose}>Cancel</Button>
          <Button onClick={handleConfirmDeleteButton}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle id="alert-dialog-title">{'Accept changes?'}</DialogTitle>
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
              image={suggestionInfo.product.image}
              title="current product photo"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {suggestionInfo?.product?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category ID: {suggestionInfo?.product?.categoryId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Origin: {suggestionInfo?.product?.origin}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                EAN: {suggestionInfo?.product?.ean}
              </Typography>
            </CardContent>
          </Card>
          <Card
            variant="outlined"
            sx={{ width: 345, backgroundColor: 'rgb(0,255,0,0.03)' }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image={suggestionInfo.suggestionProduct.image}
              title="Suggested product photo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category ID: {categoryId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Origin: {origin}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                EAN: {ean}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <DialogActions>
          {clientRole == 'STANDARD' && (
            <Button
              onClick={() => {
                setIsModalOpen(false);
                setIsModalEditOpen(true);
                //window.location.reload();
              }}
              size="small"
            >
              Edit
            </Button>
          )}

          <Box sx={{ flex: 1 }} />
          {clientRole == 'ADMIN' && (
            <>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  rejectSuggestion(suggestionInfo.suggestionId);
                  window.location.reload();
                }}
                size="small"
              >
                Reject
              </Button>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  acceptSuggestion(suggestionInfo.suggestionId);
                  window.location.reload();
                }}
                size="small"
                autoFocus
              >
                Accept
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={isModalEditOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle id="alert-dialog-title">{'Edit changes'}</DialogTitle>
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
              image={suggestionInfo.product.image}
              title="current product photo"
            />

            <CardContent>
              
              <Typography gutterBottom variant="h5" component="div">
                {suggestionInfo?.product?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category ID: {suggestionInfo?.product?.categoryId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Origin: {suggestionInfo?.product?.origin}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                EAN: {suggestionInfo?.product?.ean}
              </Typography>
            </CardContent>
          </Card>
          <Card
            variant="outlined"
            sx={{ width: 345, backgroundColor: 'rgb(0,255,0,0.03)' }}
          >
            <CardMedia
              sx={{ height: 140 }}
                            image={suggestionInfo.suggestionProduct.image}

              title="Suggested product photo"
            />
            <CardContent>
            <input required type="file" name="file" onChange={handleFileChange} />

              <TextField
                variant="filled"
                margin="none"
                size="small"
                label="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              ></TextField>

              <TextField
                variant="filled"
                margin="none"
                size="small"
                label="EAN"
                value={ean}
                onChange={(event) => setEan(event.target.value)}
              ></TextField>
              <Autocomplete
                options={categories}
                getOptionLabel={(category) => category.categoryName}
                onChange={(_, value) => setCategoryId(value.categoryId)}
                sx={{ width: '80%' }}
                variant="filled"
                renderInput={(params) => (
                  <TextField {...params} label="Category" variant="filled" />
                )}
              />

              <Autocomplete
                options={origins}
                onChange={(_, value) => setOrigin(value)}
                sx={{ width: '80%' }}
                variant="filled"
                renderInput={(params) => (
                  <TextField {...params} label="Origin" variant="filled" />
                )}
              />
            </CardContent>
          </Card>
        </Box>
        <DialogActions>
          <Button
            onClick={() => {
              setIsModalEditOpen(false);
              setIsModalOpen(true);
              suggestionInfo.client = 1;

              const formData = new FormData();
              formData.append('suggestionId', suggestionInfo.suggestionId);
              formData.append('image', selectedFile);
              formData.append('categoryId', categoryId);
              formData.append('title', title);
              formData.append('origin', origin);
              formData.append('ean', ean);
              
              
              editSuggestion(suggestionInfo.suggestionId, formData);
            }}
            size="small"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
