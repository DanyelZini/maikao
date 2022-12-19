import React from "react";
import "./UsuariosTabela.css";

export default function UsuariosTabela(props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
          </tr>
        </thead>
        <tbody>
          {props.dados.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
