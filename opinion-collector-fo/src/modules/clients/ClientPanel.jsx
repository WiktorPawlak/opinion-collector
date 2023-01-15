import React, {useCallback, useEffect, useState} from 'react';
import { useClient } from '../../hooks/useUser';
import 'react-toastify/dist/ReactToastify.css';
import {
    Box,
    Button, Paper, Table, TableBody, TableContainer, TableHead, TablePagination,
    TextField,
    Typography
} from '@mui/material';
import { validatePassword } from '../../validators/client/clientValidators';
import bcrypt from 'bcryptjs';
import { PageLoad } from '../../pages/PageLoad';
import { DeleteForever } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {getProductOpinions, getVisibleOpinionsForProductId} from "../../api/productApi";
import {deleteOpinion, getOpinionsForClient, putOpinionHidden} from "../../api/opinionApi";
import Opinion from "../../common/components/OpinionTile/OpinionTile";
import css from "../../pages/SingleProduct.module.scss";
import SingleProduct from "../../pages/SingleProduct";

export function ClientPanel() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
    const [page, setPage] = useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

  //////////////////////////////////////////////////////
  const [opinions, setOpinions] = useState([]);

  const { client, clientRole, changeEmail, changePassword, archiveSelf, logOut } =
    useClient();

    const findOpinionsForClient = useCallback(async () => {
        let response;
        response = await getOpinionsForClient(client.username.username);
        if (response[1] === 200) {
            setOpinions(response[0]);
        } else {
            //toast ?
            console.log('Nie ma opinii');
        }
    }, [client]);

    useEffect(() => {
        findOpinionsForClient();
    }, [findOpinionsForClient]);

  async function changeEmailButtonHandle() {
    if (await changeEmail({ email: email })) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }

  async function handleButtonDeleteClient() {
    if (await archiveSelf()) {
      await logOut()
      navigate('/log-in')
    }
  }

    const handleOpinionDelete = async (id) => {
        console.log(id);
        const opinionToUpdate = [...opinions];
        const indexOfOpinionToDelete =
            opinionToUpdate.findIndex(opinion => opinion.opinionId === id);
        if (indexOfOpinionToDelete !== -1){
            setOpinions(opinionToUpdate);
        }
        if (opinionToUpdate[indexOfOpinionToDelete].clientUsername === client.username.username){
            window.location.reload();
        }
        await deleteOpinion(id);
    }


  async function changePasswordButtonHandle() {
    if (validatePassword(password, repeatedPassword)) {
      setIsPasswordValid(true);
      const hashedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
      await changePassword({ password: hashedPass });
      await logOut()
    } else {
      setIsPasswordValid(false);
    }
  }

  if (!client) {
    return <PageLoad />;
  }

  return (
    <Box sx={{ margin: '50px' }}>
      <Typography variant="h6">
        <b>Username:</b> {client.username.username}
      </Typography>
      <Button
        startIcon={<DeleteForever />}
        variant="contained"
        color="secondary"
        onClick={handleButtonDeleteClient}
      >
        Delete account
      </Button>
      <Typography variant="h6">
        <b>Role:</b> {clientRole}
      </Typography>

      <Typography variant="h6">
        <b>E-mail:</b> {client.email.email}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%' }}>
        <TextField
          sx={{ marginBottom: '15px' }}
          error={!isEmailValid}
          helperText={!isEmailValid ? 'Wrong e-mail' : ' '}
          label="New e-mail"
          required
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={changeEmailButtonHandle}
        >
          Change e-mail
        </Button>
      </Box>

      <Typography variant="h6">
        <b>Password:</b>
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '20%' }}>
        <TextField
          error={!isPasswordValid}
          type="password"
          label="New password"
          required
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>
        <TextField
          sx={{ marginTop: '15px', marginBottom: '15px' }}
          type="password"
          error={!isPasswordValid}
          helperText={!isPasswordValid ? 'Wrong password' : ' '}
          label="Repeat password"
          required
          variant="outlined"
          onChange={(e) => setRepeatedPassword(e.target.value)}
        ></TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={changePasswordButtonHandle}
        >
          Change password
        </Button>
      </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <br /><br /> Twoje opinie:
            <Paper
                sx={{
                    width: '100%',
                    overflow: 'hidden'
                }}
            >
                <TableContainer sx={{ maxHeight: 750 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                        </TableHead>
                        <TableBody>
                            {opinions &&
                            opinions.slice(page * 10, page * 10 + 10).map((opinion) => {
                                return (
                                    <Box>
                                        <Opinion
                                            key={opinion.id}
                                            opinionId={opinion.opinionId}
                                            handleOpinionHide={() => SingleProduct.handleOpinionHide(opinion.opinionId)}
                                            handleOpinionEdit={() => SingleProduct.handleOpinionEdit(opinion.opinionId)}
                                            handleOpinionDelete={() => handleOpinionDelete(opinion.opinionId)}
                                            creationDate={opinion.creationDate}
                                            modificationDate={opinion.modificationDate}
                                            clientUsername={opinion.clientUsername}
                                            starReview={opinion.starReview}
                                            opinionContent={opinion.opinionContent}
                                            opinionCons={opinion.opinionCons}
                                            opinionPros={opinion.opinionPros}
                                            hidden={opinion.hidden}
                                            productId={opinion.productId}
                                        /></Box>
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
        </Box>
    </Box>
  );
}
