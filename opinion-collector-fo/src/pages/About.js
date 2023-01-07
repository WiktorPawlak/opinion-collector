import React from "react";
import CopyrightFooter from "../common/layouts/components/CopyrightFooter/CopyrightFooter";
import css from "./About.module.scss";
export default function About() {
  return (
    <div>
      <div className={css.aboutContainer}>
        <div className={css.aboutText}>
          <h1>
            This is an about section. You can get to know more about
            <span> OpinionCollector</span> project in here!
          </h1>
        </div>
      </div>
      <CopyrightFooter />
    </div>
  );
}
