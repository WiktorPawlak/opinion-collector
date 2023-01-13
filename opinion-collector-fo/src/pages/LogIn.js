import React, { useState } from 'react';
import CopyrightFooter from '../common/layouts/components/CopyrightFooter/CopyrightFooter';
import './LogIn.css';
import { useClient } from '../hooks/useUser';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { ToastContainer } from 'react-toastify';

function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const { logInClient } = useClient();

  async function signInButtonHandle() {
    if (!await logInClient({ username, password })) {
      setIsError(true);
    }
  }

  return (
    <div className="container">
      <div className="sign-up">
        <div className="title">
          Sign in to <span>NAME</span>🍕
        </div>
        <div className="form-container">
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
            <TextField
              error={isError}
              label="Username"
              required
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
            ></TextField>
            <TextField
              sx={{ marginTop: '15px', marginBottom: '15px' }}
              type="password"
              label="Password"
              error={isError}
              required
              variant="outlined"
              helperText={isError ? 'Wrong username or password' : ' '}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={signInButtonHandle}
            >
              Sign in
            </Button>
          </Box>
        </div>

        <a href="/sign-up">
          <button className="joinUsButton">
            New here? <span>Join us.</span>
          </button>
        </a>
      </div>
      <ToastContainer />
      <CopyrightFooter />
    </div>
  );
}

export default LogIn;
