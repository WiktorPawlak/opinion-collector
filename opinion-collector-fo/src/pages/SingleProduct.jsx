import React, { useCallback, useEffect, useState } from 'react';
import CopyrightFooter from '../common/layouts/components/CopyrightFooter/CopyrightFooter';
import css from './SingleProduct.module.scss';
import BgAsset from '../common/images/bg_asset.png';
import { Link, useParams } from 'react-router-dom';
import { useClient } from '../hooks/useUser';
import {
  getProductOpinions,
  getVisibleOpinionsForProductId,
  getProductById
} from '../api/productApi';
import Opinion from '../common/components/OpinionTile/OpinionTile';
import { deleteOpinion, putOpinionHidden } from '../api/opinionApi';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Rating,
  DialogActions
} from '@mui/material';
import { SuggestionTable } from '../modules/suggestions/SuggestionTable';
import Product from '../common/components/ProductTile/Product';
import { Button } from '../common/components/Button/Button';
import Typography from '@mui/material/Typography';

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [opinions, setOpinions] = useState([]);
  const { clientRole } = useClient();
  const { client } = useClient();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('');
  const [starReview, setStarReview] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const fetchProductData = useCallback(async () => {
    const response = await getProductById(id);
    setProduct(response[0]);
  }, [id]);

  const findOpinionsForProduct = useCallback(async () => {
    let response;
    if (clientRole === 'STANDARD') {
      response = await getVisibleOpinionsForProductId(id);
    } else {
      response = await getProductOpinions(id);
    }
    if (response[1] === 200) {
      setOpinions(response[0]);
    } else {
      //toast ?
      console.log('Nie ma opinii');
    }
  }, [clientRole]);

  useEffect(() => {
    findOpinionsForProduct();
  }, [findOpinionsForProduct]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const handleOpinionHide = async (id) => {
    console.log(id);
    const opinionsToUpdate = [...opinions];
    const indexOfOpinionToHide = opinionsToUpdate.findIndex(
      (opinion) => opinion.opinionId === id
    );
    if (indexOfOpinionToHide !== -1) {
      console.log(indexOfOpinionToHide);
      opinionsToUpdate[indexOfOpinionToHide].hidden =
        !opinionsToUpdate[indexOfOpinionToHide].hidden;
      setOpinions(opinionsToUpdate);
    }
    await putOpinionHidden(id);
  };

  const handleOpinionEdit = async (id) => {
    console.log(id);
    const opinionId = id;
    const opinionToUpdate = [...opinions];
    const indexOfOpinionToEdit = opinionToUpdate.findIndex(
      (opinion) => opinion.opinionId === id
    );
    if (indexOfOpinionToEdit !== -1) {
      setOpinions(opinionToUpdate);
    }
    if (
      opinionToUpdate[indexOfOpinionToEdit].clientUsername ===
      client.username.username
    ) {
      navigate(`/opinions/edit/${opinionId}/${product.id}`);
    }
  };

  const handleOpinionDelete = async (id) => {
    console.log(id);
    const opinionToUpdate = [...opinions];
    const indexOfOpinionToDelete = opinionToUpdate.findIndex(
      (opinion) => opinion.opinionId === id
    );
    if (indexOfOpinionToDelete !== -1) {
      console.log(indexOfOpinionToDelete);
      setOpinions(opinionToUpdate);
    }
    if (
      opinionToUpdate[indexOfOpinionToDelete].clientUsername ===
      client.username.username
    ) {
      window.location.reload();
    }
    await deleteOpinion(id);
  };

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

            <Link style={{ marginRight: '10vw' }} to={`/opinions/add/${id}`}>
              <button className={css.btn}>Rate</button>
            </Link>
            {clientRole === 'STANDARD' && (
              <Link to={`/suggestions/add/${id}`}>
                <button className={css.btn}>Suggest changes</button>
              </Link>
            )}

            <br />
            <img src={BgAsset} className={css.bgAsset} alt="Fajne zdjęcie" />
          </div>

          <Paper
            sx={{
              width: '100%',
              overflow: 'hidden'
            }}
          >
            <TableContainer sx={{ maxHeight: 750 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead></TableHead>
                <TableBody>
                  {opinions &&
                    opinions.slice(page * 10, page * 10 + 10).map((opinion) => {
                      return (
                        <Box>
                          <Opinion
                            key={opinion.id}
                            opinionId={opinion.opinionId}
                            handleOpinionHide={() =>
                              handleOpinionHide(opinion.opinionId)
                            }
                            handleOpinionEdit={() =>
                              handleOpinionEdit(opinion.opinionId)
                            }
                            handleOpinionDelete={() =>
                              handleOpinionDelete(opinion.opinionId)
                            }
                            creationDate={opinion.creationDate}
                            modificationDate={opinion.modificationDate}
                            clientUsername={opinion.clientUsername}
                            starReview={opinion.starReview}
                            opinionContent={opinion.opinionContent}
                            opinionCons={opinion.opinionCons}
                            opinionPros={opinion.opinionPros}
                            hidden={opinion.hidden}
                            productId={opinion.productId}
                          />
                        </Box>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={10}
              component="div"
              count={opinions.length}
              rowsPerPage={10}
              page={page}
              onPageChange={handleChangePage}
            />
          </Paper>
        </>
      )}
      <CopyrightFooter className={css.footer} />
    </div>
  );
}

export default SingleProduct;
