import { useCallback, useEffect, useState } from 'react';
import {
  apiActiveClient,
  apiArchiveClient,
  apiArchiveSelf,
  apiChangeEmail,
  apiChangePassword,
  apiChangeRole,
  apiGetActiveClients,
  apiGetArchivedClients,
  apiGetSelf,
  apiLogOut,
  postLogin
} from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export function useClient() {
  const [client, setClient] = useState();
  const [clientRole, setClientRole] = useState();
  const navigate = useNavigate();

  const logInClient = useCallback(
    async (credentials) => {
      if (credentials) {
        const response = await postLogin(credentials);

        if (response[1] === 200) {
          setClient(response[0]);
          navigate('/products');
          window.location.reload(false);
          return true;
        } else {
          return false;
        }
      }
    },
    [navigate]
  );

  const getSelf = useCallback(async () => {
    const response = await apiGetSelf();

    if (response[1] === 200) {
      setClient(response[0]);
    } else {
      //przenieś na stronę logowania
    }
  }, []);

  const getActiveClients = useCallback(async () => {
    const response = await apiGetActiveClients();

    if (response[1] === 200) {
      return response[0].map((client) => ({
        username: client.username.username,
        email: client.email.email,
        role: client.role
      }));
    }
  }, []);

  const getArchivedClients = useCallback(async () => {
    const response = await apiGetArchivedClients();

    if (response[1] === 200) {
      return response[0].map((client) => ({
        username: client.username.username,
        email: client.email.email,
        role: client.role
      }));
    }
  }, []);

  const clientChangeRole = useCallback(async (userName, role) => {
    const response = await apiChangeRole({ userName: userName, role: role });

    return response[1] === 200;
  }, []);

  const logOut = useCallback(async () => {
    await apiLogOut();
    navigate('/log-in');
    window.location.reload(true);
  }, [navigate]);

  const archiveClient = useCallback(async (username) => {
    const response = await apiArchiveClient(username);

    return response[1] === 200;
  }, []);

    const activeClient = useCallback(async (username) => {
    const response = await apiActiveClient(username);

    return response[1] === 200;
  }, []);

    const archiveSelf = useCallback(async () => {
    const response = await apiArchiveSelf();

    return response[1] === 200;
  }, []);

  const changeEmail = useCallback(async (email) => {
    const response = await apiChangeEmail(email);

    return response[1] === 200;
  }, []);

  const changePassword = useCallback(async (password) => {
    const response = await apiChangePassword(password);

    return response[1] === 200;
  }, []);

  useEffect(() => {
    getSelf();
  }, [getSelf]);

  useEffect(() => {
    if (client !== undefined) {
      setClientRole(client.role);
    }
  }, [client]);

  return {
    client,
    logInClient,
    getSelf,
    clientRole,
    getActiveClients,
    getArchivedClients,
    changeEmail,
    changePassword,
    clientChangeRole,
    archiveSelf,
    activeClient,
    archiveClient,
    logOut
  };
}
