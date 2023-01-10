import { useState } from 'react';
import { useClient } from '../hooks/useUser';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Button,
  TextField,
  Typography
} from '@mui/material';
import { validatePassword } from '../validators/client/clientValidators';
import bcrypt from 'bcryptjs';
import { PageLoad } from './PageLoad';
import { DeleteForever } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export function ClientPanel() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const { client, clientRole, changeEmail, changePassword, archiveSelf } =
    useClient();

  async function changeEmailButtonHandle() {
    if (await changeEmail({ email: email })) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }

  async function handleButtonDeleteClient() {
    if (await archiveSelf()) {
      navigate('/sign-up')
    }
  }

  async function changePasswordButtonHandle() {
    if (validatePassword(password, repeatedPassword)) {
      setIsPasswordValid(true);
      const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
      await changePassword({ password: hashedPass });
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
      </Box>
    </Box>
  );
}
