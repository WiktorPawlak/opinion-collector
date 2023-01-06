import React from "react";
import css from "./PopularProducts.module.scss";

function PopularProducts() {
  return (
    <div className={css.popularContainer}>
      <h2>Popular products</h2>
      <p>
        Here you can check the most popular products. You can try rating them on
        your own as well!
      </p>
    </div>
  );
}

export default PopularProducts;
