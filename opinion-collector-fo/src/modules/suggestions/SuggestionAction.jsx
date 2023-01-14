import { SaveOutlined, DeleteOutline } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  CardMedia,
  CardContent,
  CardActions,
  TextField
} from '@mui/material';
import { Box } from '@mui/system';
import { useHandleSuggestion } from '../../hooks/useSuggestion';
import { useEffect, useState } from 'react';
import { apiGetSuggestion, apiDeleteSuggestion } from '../../api/suggestionApi';
import Card from '@mui/material/Card';

import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 400,
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  backgroundColor: 'darkGrey',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center'
};
const product_style_1 = {
  display: 'inline-block',
  width: '50%',
  height: 300,
  backgroundColor: '#996576',
  marginBottom: 2
};
const product_style_2 = {
  display: 'inline-block',
  width: '50%',
  height: 300,
  backgroundColor: '#5a935a',
  marginBottom: 2
};

export function SuggestionAction({ suggestionInfo }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { acceptSuggestion, rejectSuggestion } = useHandleSuggestion();


  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleDeleteSuggestionButton() {
    setIsDeleteModalOpen(true);
  }

  function handleDeleteModalClose() {
    setIsDeleteModalOpen(false);
  }

  async function handleConfirmDeleteButton() {
    await apiDeleteSuggestion(suggestionInfo);
    window.location.reload(true);
  }

  function handleChangeSuggestionStateButton() {
    setIsModalOpen(true);
  }
  const [categoryId, setCategoryId] = useState(1);

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
    <Dialog
   open={isDeleteModalOpen}
   onClose={handleDeleteModalClose}
   >
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
              image="D:\Repositories\io_2022_01\opinion-collector-fo\src\common\images\monster.jpg"
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
              image="D:\Repositories\io_2022_01\opinion-collector-fo\src\common\images\monster.jpg"
              title="Suggested product photo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {suggestionInfo?.suggestionProduct?.title}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                Category ID: {suggestionInfo?.suggestionProduct?.categoryId}
              </Typography> */}
              <TextField
                variant="filled"
                margin="none"
                size="small"
                label="Category ID"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
              ></TextField>

              {/* RTK QUERY */}

              <Typography variant="body2" color="text.secondary">
                Origin: {suggestionInfo?.suggestionProduct?.origin}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                EAN: {suggestionInfo?.suggestionProduct?.ean}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <DialogActions>
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
        </DialogActions>
      </Dialog>
    </Box>
  );
}
