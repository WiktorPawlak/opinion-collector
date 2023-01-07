import React, { useState } from "react";
import CopyrightFooter from "../common/layouts/components/CopyrightFooter/CopyrightFooter";
import "./LogIn.css";

function LogIn() {
  return (
    <div className="container">
      <div className="sign-up">
        <div className="title">
          Sign in to <span>NAME</span>🍕
        </div>
        <div className="form-container">
          <form className="sign-up-form">
            <label>Email</label>
            <input type="text" />
            <label>Password</label>
            <input type="text" />

            <button className="signInButton" type="submit">
              Sign In
            </button>
          </form>
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
