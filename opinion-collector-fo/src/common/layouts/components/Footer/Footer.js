import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/Button/Button";
import css from "./Footer.module.scss";

function Footer() {
  return (
    <div className={css.footerContainer}>
      <hr />
      <div className={css.navbar}>
        <Link to="/" className={css.navbarLogo}>
          <h4>OpinionCollector</h4>
        </Link>
        <ul className={css.navMenu}>
          <li className={css.navItem}>
            <Link to="/" className={css.navLinks}>
              Home
            </Link>
          </li>
          <li className={css.navItem}>
            <Link to="/products" className={css.navLinks}>
              Products
            </Link>
          </li>
          <li className={css.navItem}>
            <Link to="/about" className={css.navLinks}>
              About
            </Link>
          </li>
          <li className={css.navItem}>
            <Button
              className="nav-btn"
              buttonStyle="btn--outline"
              link="/log-in"
            >
              Log in
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
