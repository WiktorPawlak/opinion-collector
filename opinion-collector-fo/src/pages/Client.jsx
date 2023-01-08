import React from "react";
import "./Client.css";

export function Client(client) {
  return (
    <div className="client">
      <span>{client.client.username.username}</span>
      <span>{client.client.email.email}</span>
      <span>{client.client.role}</span>
      <button>Change role</button>
      {client.client.enable ? <span>Active</span> : <span>Archived</span>}
    </div>
  );
}
