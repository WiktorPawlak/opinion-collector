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
import { useEffect, useState } from 'react';
import { apiGetSuggestion } from '../../api/suggestionApi';

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

export function SuggestionAction(suggestionId) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestionState, setSuggestionState] = useState('');
  const { acceptSuggestion, rejectSuggestion } = useSuggestion();
  const [suggestionInfo, setSuggestionInfo] = useState(null);

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

  useEffect(() => {
    apiGetSuggestion(suggestionId)
      .then((data) => {
        setSuggestionInfo(data[0]);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

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

            <Box sx={product_style_1}>
              <p><b>Old product</b></p>
              <table>
                <tbody>
                  <tr>
                    <td>Product category id:</td>
                    <td>{suggestionInfo?.product?.categoryId}</td>
                  </tr>
                  <tr>
                    <td>Product name:</td>
                    <td>{suggestionInfo?.product?.title}</td>
                  </tr>
                  <tr>
                    <td>Image:</td>
                    <td>{suggestionInfo?.product?.image}</td>
                  </tr>
                  <tr>
                    <td>Origin:</td>
                    <td>{suggestionInfo?.product?.origin}</td>
                  </tr>
                  <tr>
                    <td>EAN:</td>
                    <td>{suggestionInfo?.product?.ean}</td>
                  </tr>
                </tbody>
              </table>  
            </Box>
            <Box sx={product_style_2}>
            <p><b>New suggestion</b></p>
            <table>
                <tbody>
                  <tr>
                    <td>Product category id:</td>
                    <td>{suggestionInfo?.suggestionProduct?.categoryId}</td>
                  </tr>
                  <tr>
                    <td>Product name:</td>
                    <td>{suggestionInfo?.suggestionProduct?.title}</td>
                  </tr>
                  <tr>
                    <td>Image:</td>
                    <td>{suggestionInfo?.suggestionProduct?.image}</td>
                  </tr>
                  <tr>
                    <td>Origin:</td>
                    <td>{suggestionInfo?.suggestionProduct?.origin}</td>
                  </tr>
                  <tr>
                    <td>EAN:</td>
                    <td>{suggestionInfo?.suggestionProduct?.ean}</td>
                  </tr>
                </tbody>
              </table>    
            </Box>


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
