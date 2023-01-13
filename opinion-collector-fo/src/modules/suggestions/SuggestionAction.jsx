import { DeleteOutline, SaveOutlined } from '@mui/icons-material';
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
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  backgroundColor: 'darkGrey'
};

export function SuggestionAction(username) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState('');
  const { clientChangeRole } = useSuggestion();

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleChangeRoleButton() {
    setIsModalOpen(true);
  }

  async function handleSaveRole() {
    if (role !== '') {
      clientChangeRole(username.username, role);
      setIsModalOpen(false)
    }
  }

  return (
    <Box sx={{ display: 'inline' }}>
      <Button
        sx={{ marginRight: '7px' }}
        onClick={handleChangeRoleButton}
        variant="outlined"
      >
        Show changes
      </Button>
      <Button variant="outlined" startIcon={<DeleteOutline />}>
        Delete
      </Button>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

        </Box>
      </Modal>
    </Box>
  );
}
