import React, { useState } from 'react';
import CopyrightFooter from '../common/layouts/components/CopyrightFooter/CopyrightFooter';
import './LogIn.css';
import { useClient } from '../hooks/useUser';

function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { logInClient } = useClient();

  function signInButtonHandle() {
    //walidacja
    logInClient({ username, password });
  }

  return (
    <div className="container">
      <div className="sign-up">
        <div className="title">
          Sign in to <span>NAME</span>🍕
        </div>
        <div className="form-container">
          <form className="sign-up-form">
            <label>Username</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
            <label>Password</label>
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
          </form>
          <button className="signInButton" onClick={signInButtonHandle}>
            Sign In
          </button>
        </div>

        <a href="/sign-up">
          <button className="joinUsButton">
            New here? <span>Join us.</span>
          </button>
        </a>
      </div>
      <CopyrightFooter />
    </div>
  );
}

export default LogIn;
