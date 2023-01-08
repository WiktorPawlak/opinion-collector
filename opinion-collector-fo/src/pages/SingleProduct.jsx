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

  return (
    <div>
      {product && (
        <>
          <div className={css.containerImg}>
            <h2>{product.title}</h2>
            <div>Home / Products / Drink</div>
            <img src={Monster} alt="Potwór" />
            <div>
              <h2>Ingredients</h2>
              <p>A long list of trashy ingredients</p>
            </div>
            <div>
              <h2>Opinions</h2>
              <p>A long list of trashy ingredients</p>
            </div>
          </div>
          <div className={css.containerDetails}>
            <h2>Monster Energy</h2>
            <h4>
              By <span>Monster Beverage Corporation</span>
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
