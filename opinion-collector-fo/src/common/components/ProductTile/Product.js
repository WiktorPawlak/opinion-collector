import React from "react";
import css from "./Product.module.scss";

const Product = ({ title, description, image, id }) => {
  return (
    <div className={css.product}>
      <img src={image} alt=""></img>
      <h2>{title}</h2>
      <div className={css.parentDiv}>
        <div className={css.childDiv}>
          <p>Opis: {description}</p>
        </div>
        <div className={css.childDiv}>
          <a href={`/products-view/${id}`}>
            <button className={css.btn}>Rate</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Product;
