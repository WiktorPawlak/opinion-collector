import { useClient } from '../hooks/useUser';

export function ClientPanel() {
  const { client, clientRole, clients } = useClient();

  return (
    <div>
      <div>
        {client && (
          <div>
            <div>
              <b>E-mail:</b> {client.username.username}
            </div>
            <div>
              <b>Username:</b> {client.email.email}
            </div>
            <div>
              <b>Role:</b> {clientRole}
            </div>
          </div>
        )}
      </div>
      <div>
        {clientRole === 'ADMIN' && (
          <div>
            {clients.map((client) => (
              <p key={client.username.username}>{client.username.username}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
