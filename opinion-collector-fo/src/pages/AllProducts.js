import React, { useCallback, useEffect, useState } from "react";
import Product from "../common/components/ProductTile/Product";
import Footer from "../common/layouts/components/Footer/Footer";
import css from "./AllProducts.module.scss";
import { getProducts } from "../api/protuctApi";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  const findProducts = useCallback(async () => {
    const response = await getProducts();

      if (response[1] === 200) {
        response[0].then((products) => setProducts(products))
      } else {
        //toast ?
        console.log("Ni ma produktów");
      }
  }, []);

  useEffect(() => {
    findProducts();
  }, [findProducts, query]);



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
            key={product.id}
            title={product.title}
            image={product.image}
            description={product.title}
            id={product.id}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default AllProducts;
