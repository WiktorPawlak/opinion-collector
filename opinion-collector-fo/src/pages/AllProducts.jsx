import React, { useCallback, useEffect, useState } from 'react';
import Product from '../common/components/ProductTile/Product';
import Footer from '../common/layouts/components/Footer/Footer';
import { putProductHidden } from '../api/productApi';
import css from './AllProducts.module.scss';
import {
  getProducts,
  getProductsVisivle as getProductsVisible
} from '../api/productApi';
import { useClient } from '../hooks/useUser';
import { Link, useNavigate } from 'react-router-dom';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const { clientRole } = useClient();
  const navigate = useNavigate();

  const findProducts = useCallback(async () => {
    let response;

    if (clientRole == 'ADMIN') {
      response = await getProducts();
    } else {
      response = await getProductsVisible();
    }

    if (response[1] === 200) {
      setProducts(response[0]);
    } else {
      //toast ?
      console.log('Ni ma produktów');
    }
  }, [clientRole]);

  useEffect(() => {
    findProducts();
  }, [findProducts]);

  const handleProductHide = async (id) => {
    const productsToUpdate = [...products];
    const indexOfProductToHide = productsToUpdate.findIndex(
      (product) => product.productId === id
    );
    if (indexOfProductToHide !== -1) {
      console.log(indexOfProductToHide);
      productsToUpdate[indexOfProductToHide].hidden =
        !productsToUpdate[indexOfProductToHide].hidden;
      setProducts(productsToUpdate);
    }
    await putProductHidden(id);
  };

  const handleProductEdit = async (idPr) => {
    const id = idPr;
    const productToUpdate = [...products];
    const indexOfProductToEdit = productToUpdate.findIndex(
      (product) => product.id === idPr
    );
    if (indexOfProductToEdit !== -1) {
      setProducts(productToUpdate);
    }
    navigate(`/products/edit/${id}`);
  };

  const handleSuggestChanges = async (id) => {};

  return (
    <div className="products">
      <div className={css.productsNavs}>
        <form className={css.searchForm}>
          {clientRole === 'ADMIN' && (
            <Link style={{ marginRight: '10vw' }} to="/products/add">
              <button className={css.addProductButton}>Add product</button>
            </Link>
          )}
          <input
            className={css.searchBar}
            type="text"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={css.searchButton}>Search</button>
        </form>
      </div>

      <div className={css.products}>
        {products
          .filter((products) => {
            if (query == '') {
              return products;
            } else if (
              products.title.toLowerCase().includes(query.toLowerCase())
            ) {
              return products;
            }
          })
          .map((product) => (
            <Product
              key={product.id}
              handleProductHide={() => handleProductHide(product.id)}
              handleProductEdit={() => handleProductEdit(product.id)}
              title={product.title}
              image={product.image}
              description={product.title}
              id={product.id}
              visibility={product.visibility}
            />
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default AllProducts;
