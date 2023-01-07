import React, { useEffect, useState } from "react";
import Product from "../common/components/ProductTile/Product";
import Footer from "../common/layouts/components/Footer/Footer";
import css from "./AllProducts.module.scss";

function AllProducts() {
  const APP_ID = "f4a01666";
  const APP_KEY = "568886d03a5002b76e81940321ecf1dd";

  const [products, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className={css.products}>
      <form onSubmit={getSearch} className={css.searchForm}>
        <input
          className={css.searchBar}
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className={css.searchButton} type="submit">
          Search
        </button>
      </form>
      <div className={css.products}>
        {products.map((product) => (
          <Product
            key={product.recipe.label}
            title={product.recipe.label}
            image={product.recipe.image}
            description={product.recipe.cuisineType}
            id={product.recipe.label}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default AllProducts;
