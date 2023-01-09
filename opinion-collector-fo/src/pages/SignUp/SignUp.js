import React, { useState } from "react";
import { postRegister } from "../../api/authApi";
import CopyrightFooter from "../../common/layouts/components/CopyrightFooter/CopyrightFooter";
import { ToastContainer, toast } from 'react-toastify';
import css from "./SignUp.module.scss";

import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(12);

function SignUp() {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const registerDto = {email, login, password};

  const handleRegister = async () => {
    if(registerDto) {
      const hashedPass = bcrypt.hashSync(password, salt);
      const response = await postRegister({email, login, hashedPass});
      if (response[0] === 201) {
        toast("Account created!\nPlease log in. :)");
      } else {
        toast("Could not create new accout. :(",);
        console.log('Could not create new accout: ', response[0]);
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
          <form className={css.signUpForm}>
            <label>Email</label>
            <input type="text" id="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
            <label>Username</label>
            <input type="text" id="username" value={login} onChange={(event) => setLogin(event.target.value)}/>
            <label>Password</label>
            <input type="text" id="hashedPass" value={password} onChange={(event) => setPassword(event.target.value)}/>
          </form>
            <button className={css.signInButton} onClick={handleRegister}>
              SignUp
            </button>
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
