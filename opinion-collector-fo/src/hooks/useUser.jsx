import {useCallback, useEffect, useState} from "react";
import {apiGetClients, apiGetSelf, postLogin} from "../api/authApi";
import { useCallback } from "react";
import { useState } from "react";
import { apiChangeEmail, apiGetClients, apiGetSelf, postLogin } from "../api/authApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useClient() {
  const [client, setClient] = useState();
  const [clients, setClients] = useState([]);
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
          console.log('Wrong password or username');
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

  const getClients = useCallback(async () => {
    const response = await apiGetClients();

    if (response[1] === 200) {
      setClients(response[0]);
    } else {
      //toast?
    }
  }, []);

    const changeEmail = useCallback(async (email) => {
    const response = await apiChangeEmail(email);

    if (response[1] === 200) {
      return "Email changed"
    } else {
      return response[0]
    }
  }, []);

  useEffect(() => {
    getSelf();
  }, [getSelf]);

  useEffect(() => {
    getClients();
  }, [getClients]);

  useEffect(() => {
    if (client !== undefined) {
      setClientRole(client.role);
    }
  }, [client]);

  return { client, logInClient, getSelf, clientRole, getClients, clients, changeEmail };
}
