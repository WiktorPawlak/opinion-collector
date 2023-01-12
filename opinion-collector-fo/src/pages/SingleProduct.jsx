import React, { useCallback, useEffect, useState } from 'react';
import CopyrightFooter from '../common/layouts/components/CopyrightFooter/CopyrightFooter';
import css from './SingleProduct.module.scss';
import BgAsset from '../common/images/bg_asset.png';
import { useParams } from 'react-router-dom';
import { useClient } from '../hooks/useUser';
import {
  getProductById,
  getProducts,
  getProductsVisivle as getProductsVisible
} from '../api/productApi';

/////////////////////////////
import { apiGetOpinions, getOpinionsById } from '../api/opinionApi';
import Opinion from '../common/components/OpinionTile/OpinionTile';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { clientRole } = useClient();
  /////////////////////////////
  const [opinions, setOpinions] = useState([]);

  const fetchProductData = useCallback(async () => {
    const response = await getProductById(id);
    setProduct(response[0]);
  }, [id]);

  /////////////////////////////
  const findOpinions = useCallback(async () => {
    let response;
    response = await getOpinionsById(id);
    if (response[1] === 200) {
      setOpinions(response[0]);
    } else {
      //toast ?
      console.log('Brak opinii');
    }
  }, []);

  const fetchOpinionData = useCallback(async () => {
    const response = await getOpinionsById(id);
    setOpinions(response[0]);
  }, [id]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  /////////////////////////////
  useEffect(() => {
    findOpinions();
  }, [findOpinions]);

  console.log(opinions);

  return (
    <div>
      {product && (
        <>
          <div className={css.containerImg}>
            <div>{product.category}</div>

            <img src={`${process.env.PUBLIC_URL}` + product.image} />

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
            <br />
            {clientRole == 'ADMIN' && <button className={css.btn}>Edit</button>}
            <img src={BgAsset} className={css.bgAsset} alt="Fajne zdjęcie" />
          </div>

          <div className={css.containerOpinions}>
            {opinions.map((opinion) => (
              <h2>dupa</h2>
            ))}
          </div>
        </>
      )}
      <CopyrightFooter className={css.footer} />
    </div>
  );
}

export default SingleProduct;
