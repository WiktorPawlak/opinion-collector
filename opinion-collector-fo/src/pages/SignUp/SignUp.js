import React, { useCallback, useState } from "react";
import { postRegister } from "../../api/authApi";
import CopyrightFooter from "../../common/layouts/components/CopyrightFooter/CopyrightFooter";
import css from "./SignUp.module.scss";

function SignUp() {
  const [email, setEmail]=useState("");
  const [login, setLogin]=useState("");
  const [hashedPass, setHashedPass]=useState("");

  const handleRegister = async () => {
    await postRegister({email, login, hashedPass});
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
            <input type="text" id="hashedPass" value={hashedPass} onChange={(event) => setHashedPass(event.target.value)}/>

            <button className={css.signInButton} onClick={handleRegister}>
              SignUp
            </button>

          </form>
        </div>
        <a href="/log-in">
          <button className={css.joinUsButton}>
            Already have an account? <span>Log in.</span>
          </button>
        </a>
      </div>
      <CopyrightFooter />
    </div>
  );
}

export default SignUp;
