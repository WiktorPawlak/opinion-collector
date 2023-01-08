import React, { useCallback, useEffect, useState } from 'react';
import CopyrightFooter from '../common/layouts/components/CopyrightFooter/CopyrightFooter';
import css from './SingleProduct.module.scss';
import Monster from '../common/images/monster.jpg';
import BgAsset from '../common/images/bg_asset.png';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/productApi';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProductData = useCallback(async () => {
    const response = await getProductById(id);
    setProduct(response[0]);
  }, [id]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);
  console.log(product);
  return (
    <div>
      {product && (
        <>
          <div className={css.containerImg}>
            <div>{product.category}</div>
            <img src={Monster} alt="Potwór" />

            <div>
              <h2>EAN</h2>
              <p>{product.ean}</p>
            </div>
          </div>
          <div className={css.containerDetails}>
            <h2>{product.title}</h2>
            <h4>
              From <span>{product.origin}</span>
            </h4>
            <p>Super cool description.</p>
            <button className={css.btn}>Rate</button>
            <img src={BgAsset} className={css.bgAsset} alt="Fajne zdjęcie" />
          </div>
        </>
      )}
      <CopyrightFooter className={css.footer} />
    </div>
  );
}

export default SingleProduct;
