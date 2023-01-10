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
import { useClient } from '../../hooks/useUser';
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

export function ClientActions(username) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState('');
  const { clientChangeRole } = useClient();

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
        Change role
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
          <FormControl>
            <RadioGroup row onChange={(e) => setRole(e.target.value)}>
              <FormControlLabel
                value="ADMIN"
                control={<Radio />}
                label="ADMIN"
              />
              <FormControlLabel
                value="STANDARD"
                control={<Radio />}
                label="STANDARD"
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
