import React from "react";
import CopyrightFooter from "../../common/layouts/components/CopyrightFooter/CopyrightFooter";
import css from "./SignUp.module.scss";

function SignUp() {
  return (
    <div className={css.container}>
      <div className={css.signUp}>
        <div className={css.title}>
          Join us at <span>NAME</span>🍕
        </div>
        <div className={css.formContainer}>
          <form className={css.signUpForm}>
            <label>Email</label>
            <input type="text" />
            <label>Username</label>
            <input type="text" />
            <label>Password</label>
            <input type="text" />

            <button className={css.signInButton} type="submit">
              Sign Up
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
