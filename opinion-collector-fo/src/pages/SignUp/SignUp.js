import React, { useState } from 'react';
import { postRegister } from '../../api/authApi';
import CopyrightFooter from '../../common/layouts/components/CopyrightFooter/CopyrightFooter';
import { ToastContainer, toast } from 'react-toastify';
import css from './SignUp.module.scss';

import bcrypt from 'bcryptjs';
import { Box, Button, TextField } from '@mui/material';
import {
  validateEmail,
  validatePassword,
  validateUsername
} from '../../validators/client/clientValidators';
import { useNavigate } from 'react-router-dom';

const salt = bcrypt.genSaltSync(12);

function SignUp() {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [isUsernamError, setIsUsernameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const navigate = useNavigate()
  const registerDto = { email, login, password };

  function validateForm() {
    if (!validatePassword(password, repeatPassword)) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }

    if (!validateEmail(email)) {
      setIsEmailError(true);
    } else {
      setIsEmailError(false);
    }

    if (!validateUsername(login)) {
      setIsUsernameError(true);
    } else {
      setIsUsernameError(false);
    }

    return !isEmailError && !isPasswordError && !isUsernamError;
  }

  const handleRegister = async () => {
    if (registerDto && validateForm()) {
      const hashedPass = bcrypt.hashSync(password, salt);
      const response = await postRegister({ email, login, hashedPass });
      if (response[0] === 201) {
        navigate('/log-in');
         toast('Account created!\nPlease log in. :)');
      } else {
        toast('Could not create new accout. :(');
      }
    }
  };

  return (
    <div className={css.container}>
      <div className={css.signUp}>
        <div className={css.title}>
          Join us at <span>NAME</span>🍕
        </div>
        <div className={css.formContainer}>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <TextField
              error={isUsernamError}
              label="Username"
              required
              variant="outlined"
              helperText={isUsernamError ? 'Username is not valid' : ' '}
              onChange={(e) => setLogin(e.target.value)}
            ></TextField>
            <TextField
              error={isEmailError}
              label="Email"
              required
              variant="outlined"
              helperText={isEmailError ? 'E-mail is not valid' : ' '}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <TextField
              type="password"
              label="Password"
              error={isPasswordError}
              required
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
            <TextField
              sx={{ marginTop: '23px', marginBottom: '15px' }}
              type="password"
              label="Repeat password"
              error={isPasswordError}
              required
              variant="outlined"
              helperText={isPasswordError ? 'Password is not valid' : ' '}
              onChange={(e) => setRepeatPassword(e.target.value)}
            ></TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegister}
            >
              Sign up
            </Button>
          </Box>
        </div>
        <a href="/log-in">
          <button className={css.joinUsButton}>
            Already have an account? <span>Log in.</span>
          </button>
        </a>
        <ToastContainer />
      </div>
      <CopyrightFooter />
    </div>
  );
}

export default SignUp;
