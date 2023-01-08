import { useCallback } from "react";
import { useState } from "react";
import { apiGetClients, apiGetSelf, postLogin } from "../api/authApi";
import { useEffect } from "react";

export function useClient() {
  const [client, setClient] = useState();
  const [clients, setClients] = useState([]);
  const [clientRole, setClientRole] = useState();

  const logInClient = useCallback(async (credentials) => {
    if (credentials) {
      const response = await postLogin(credentials);

      if (response[1] === 200) {
        response[0].then((user) => setClient(user));
        return true;
      } else {
        console.log("Wrong password or username");
        return false;
      }
    }
  }, []);

  const getSelf = useCallback(async () => {
    const response = await apiGetSelf();

    if (response[1] === 200) {
      response[0].then((user) => setClient(user));
    } else {
      //przenieś na stronę logowania
    }
  }, []);

  const getClients = useCallback(async () => {
    const response = await apiGetClients();

    if (response[1] === 200) {
      response[0].then((user) => setClients(user));
    } else {
      //toast?
    }
  }, []);

  useEffect(() => {
    if (client !== undefined) {
      setClientRole(client.role);
    }
  }, [client]);

  return { client, logInClient, getSelf, clientRole, getClients, clients };
}
