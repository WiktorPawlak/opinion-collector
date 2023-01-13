import React, { useCallback, useEffect, useState } from 'react';
import CopyrightFooter from '../common/layouts/components/CopyrightFooter/CopyrightFooter';
import css from './SingleProduct.module.scss';
import BgAsset from '../common/images/bg_asset.png';
import {Link, useParams} from 'react-router-dom';
import { useClient } from '../hooks/useUser';
import {
  getProductById, getProductOpinions,
  getProducts,
  getProductsVisivle as getProductsVisible, getVisibleOpinionsForProductId
} from '../api/productApi';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Opinion from '../common/components/OpinionTile/OpinionTile';
import Product from "../common/components/ProductTile/Product";
import {putOpinionHidden} from "../api/opinionApi";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [opinions, setOpinions] = useState([]);
  const { clientRole } = useClient();

  const fetchProductData = useCallback(async () => {
    const response = await getProductById(id);
    setProduct(response[0]);
  }, [id]);

  const findOpinionsForProduct = useCallback(async () => {
    let response;
    /*if (clientRole === 'STANDARD'){
      response = await getVisibleOpinionsForProductId(id);
    } else if (clientRole === 'ADMIN') {
      response = await getProductOpinions(id);
    }*/
    //response = await getVisibleOpinionsForProductId(id);
    response = await getProductOpinions(id);
    if (response[1] === 200) {
      setOpinions(response[0]);
    } else {
      //toast ?
      console.log('Nie ma opinii');
    }
  }, []);

  useEffect(() => {
    findOpinionsForProduct();
  }, [findOpinionsForProduct]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const handleOpinionHide = async (id) => {
    console.log(id);
    const opinionsToUpdate = [...opinions];
    const indexOfOpinionToHide =
        opinionsToUpdate.findIndex(opinion => opinion.opinionId === id);
    if (indexOfOpinionToHide !== -1){
      console.log(indexOfOpinionToHide);
      opinionsToUpdate[indexOfOpinionToHide].hidden = !opinionsToUpdate[indexOfOpinionToHide].hidden;
      setOpinions(opinionsToUpdate);
    }
    await putOpinionHidden(id);
  }

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


            <Link style={{ marginRight: '10vw' }} to={`/opinions/add/${id}`}>
              <button className={css.btn}>Rate</button>
            </Link>


            <br />
            {clientRole == 'ADMIN' && <button className={css.btn}>Edit</button>}
            <img src={BgAsset} className={css.bgAsset} alt="Fajne zdjęcie" />
          </div>

          <div className={css.containerOpinions}>
            {opinions.map((opinion) => (
                <Opinion
                    key={opinion.id}
                    opinionId={opinion.opinionId}
                    handleOpinionHide={() => handleOpinionHide(opinion.opinionId)}
                    creationDate={opinion.creationDate}
                    clientUsername={opinion.clientUsername}
                    starReview={opinion.starReview}
                    opinionContent={opinion.opinionContent}
                    opinionCons={opinion.opinionCons}
                    opinionPros={opinion.opinionPros}
                    hidden={opinion.hidden}
                    productId={opinion.productId}
                />
            ))}
          </div>
        </>
      )}
      <CopyrightFooter className={css.footer} />
    </div>
  );
}

export default SingleProduct;
