import { useState } from "react";
import { useClient } from "../hooks/useUser";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Client } from "./Client";

export function ClientPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { client, clientRole, clients, changeEmail } = useClient();

  async function changeEmailButtonHandle() {
    const message = await changeEmail({ email: email });
    toast(message);
  }

  return (
    <div>
      <div>
        {client && (
          <div className="form-container">
            <label>
              <b>Username:</b> {client.username.username}
            </label>
            <div>
              {" "}
              <label>
                <b>E-mail:</b> {client.email.email}
              </label>
            </div>
            <div>
              <span>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>{" "}
              <button onClick={changeEmailButtonHandle}>Change email</button>
            </div>

            <label>
              <b>Pssword:</b>
            </label>

            <div>
              <span>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button>Change password</button>
              </span>
            </div>

            <label>
              <b>Role:</b> {clientRole}
            </label>
          </div>
        )}
        <ToastContainer />
      </div>
      <div>
        <ul>
          {clients.map((client) => (
            <li style={{ listStyleType: "none" }} key={client.id.id}>
              <Client client={client} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
