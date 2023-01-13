import { SaveOutlined } from '@mui/icons-material';
import {
  Button,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup
} from '@mui/material';
import { Box } from '@mui/system';
import { useSuggestion } from '../../hooks/useSuggestion';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 600,
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
  height: 500,
  backgroundColor: 'red',
  marginBottom: 2
};
const product_style_2 = {
  display: 'inline-block',
  width: '50%',
  height: 500,
  backgroundColor: 'green',
  marginBottom: 2
};

export function SuggestionAction(suggestionId) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestionState, setSuggestionState] = useState('');
  const { acceptSuggestion, rejectSuggestion } = useSuggestion();




  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleChangeSuggestionStateButton() {
    setIsModalOpen(true);
  }
  async function handleSaveRole() {
    if (suggestionState === 'REJECTED') {
      rejectSuggestion(suggestionId);
      setIsModalOpen(false)
    }
    else if (suggestionState === 'ACCEPTED') {
      acceptSuggestion(suggestionId);
      setIsModalOpen(false)
    }
  }

  return (
    <Box sx={{ display: 'inline' }}>
      <Button
        sx={{ marginRight: '7px' }}
        onClick={handleChangeSuggestionStateButton}
        variant="outlined"
      >
        Show changes
      </Button>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

            <Box sx={product_style_1}></Box>
            <Box sx={product_style_2}></Box>


          <FormControl>
            <RadioGroup row onChange={(e) => setSuggestionState(e.target.value)}>
              <FormControlLabel
                value="REJECTED"
                control={<Radio />}
                label="REJECT"
              />
              <FormControlLabel
                value="ACCEPTED"
                control={<Radio />}
                label="ACCEPT"
              />
            </RadioGroup>
          </FormControl>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<SaveOutlined />}
            onClick={handleSaveRole}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
