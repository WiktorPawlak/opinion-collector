import React, { useCallback, useEffect, useState } from 'react';
import Product from '../common/components/ProductTile/Product';
import Footer from '../common/layouts/components/Footer/Footer';
import css from './AllProducts.module.scss';
import { getProducts } from '../api/productApi';
import { useClient } from '../hooks/useUser';
import { Link } from 'react-router-dom';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  const { clientRole } = useClient();

  const findProducts = useCallback(async () => {
    const response = await getProducts();

    if (response[1] === 200) {
      setProducts(response[0]);
    } else {
      //toast ?
      console.log('Ni ma produktów');
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
    setSearch('');
  };

  return (
    <div className="products">
      <div className={css.productsNavs}>
        <form onSubmit={getSearch} className={css.searchForm}>
          {clientRole === 'ADMIN' && (
            <Link style={{ marginRight: '10vw' }} to="/products/add">
              <button className={css.addProductButton}>Add product</button>
            </Link>
          )}
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
      </div>

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
