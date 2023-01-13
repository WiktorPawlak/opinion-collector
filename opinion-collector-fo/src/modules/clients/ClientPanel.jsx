import React, {useCallback, useEffect, useState} from 'react';
import { useClient } from '../../hooks/useUser';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Button,
  TextField,
  Typography
} from '@mui/material';
import { validatePassword } from '../../validators/client/clientValidators';
import bcrypt from 'bcryptjs';
import { PageLoad } from '../../pages/PageLoad';
import { DeleteForever } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {getProductOpinions, getVisibleOpinionsForProductId} from "../../api/productApi";
import {getOpinionsForClient, putOpinionHidden} from "../../api/opinionApi";
import Opinion from "../../common/components/OpinionTile/OpinionTile";
import css from "../../pages/SingleProduct.module.scss";
import SingleProduct from "../../pages/SingleProduct";

export function ClientPanel() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  //////////////////////////////////////////////////////
  const [opinions, setOpinions] = useState([]);

  const { client, clientRole, changeEmail, changePassword, archiveSelf, logOut } =
    useClient();

    const findOpinionsForClient = useCallback(async () => {
        let response;
        response = await getOpinionsForClient(client.username.username);
        if (response[1] === 200) {
            setOpinions(response[0]);
        } else {
            //toast ?
            console.log('Nie ma opinii');
        }
    }, [client]);

    useEffect(() => {
        findOpinionsForClient();
    }, [findOpinionsForClient]);

  async function changeEmailButtonHandle() {
    if (await changeEmail({ email: email })) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }

  async function handleButtonDeleteClient() {
    if (await archiveSelf()) {
      await logOut()
      navigate('/log-in')
    }
  }

  async function changePasswordButtonHandle() {
    if (validatePassword(password, repeatedPassword)) {
      setIsPasswordValid(true);
      const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
      await changePassword({ password: hashedPass });
      await logOut()
    } else {
      setIsPasswordValid(false);
    }
  }

  if (!client) {
    return <PageLoad />;
  }

  return (
    <Box sx={{ margin: '50px' }}>
      <Typography variant="h6">
        <b>Username:</b> {client.username.username}
      </Typography>
      <Button
        startIcon={<DeleteForever />}
        variant="contained"
        color="secondary"
        onClick={handleButtonDeleteClient}
      >
        Delete account
      </Button>
      <Typography variant="h6">
        <b>Role:</b> {clientRole}
      </Typography>

      <Typography variant="h6">
        <b>E-mail:</b> {client.email.email}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%' }}>
        <TextField
          sx={{ marginBottom: '15px' }}
          error={!isEmailValid}
          helperText={!isEmailValid ? 'Wrong e-mail' : ' '}
          label="New e-mail"
          required
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={changeEmailButtonHandle}
        >
          Change e-mail
        </Button>
      </Box>

      <Typography variant="h6">
        <b>Password:</b>
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%' }}>
        <TextField
          error={!isPasswordValid}
          type="password"
          label="New password"
          required
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>
        <TextField
          sx={{ marginTop: '15px', marginBottom: '15px' }}
          type="password"
          error={!isPasswordValid}
          helperText={!isPasswordValid ? 'Wrong password' : ' '}
          label="Repeat password"
          required
          variant="outlined"
          onChange={(e) => setRepeatedPassword(e.target.value)}
        ></TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={changePasswordButtonHandle}
        >
          Change password
        </Button>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
              <br /><br /> Twoje opinie:
              <div>
                  {opinions.map((opinion) => (
                      <Opinion
                          key={opinion.id}
                          opinionId={opinion.opinionId}
                          handleOpinionHide={() => SingleProduct.handleOpinionHide(opinion.opinionId)}
                          creationDate={opinion.creationDate}
                          modificationDate={opinion.modificationDate}
                          clientUsername={opinion.clientUsername}
                          starReview={opinion.starReview}
                          opinionContent={opinion.opinionContent}
                          opinionCons={opinion.opinionCons}
                          opinionPros={opinion.opinionPros}
                          hidden={opinion.hidden}
                          productId={opinion.productId}
                      />
                  ))}
              </div>
          </Box>
      </Box>
    </Box>
  );
}
