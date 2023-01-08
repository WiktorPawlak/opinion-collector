import { useState } from "react";
import { useClient } from "../hooks/useUser";
import { useEffect } from "react";

export function ClientPanel() {
  const { client, getSelf, clientRole, getClients, clients } = useClient();

  useEffect(() => {
    getSelf();
  }, [getSelf]);

    useEffect(() => {
    getClients();
  }, [getClients]);

  return (
    <div>
      {client && (
        <div>
          <p>{client.username.username}</p>
          <p>{client.email.email}</p>
        </div>
      )}

        {client && clientRole === 'ADMIN' && (
        <div>
          {clients.map((client) => (
            <p>{client.username.username}</p>
        ))}
        </div>
      )}
    </div>
  );
}
