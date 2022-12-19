import React, { useEffect, useState } from "react";
import axios from "axios";
import imgEdit from "./images/imgEdit.ico";
import edit from "./images/edit.ico";
import "./Usuarios.css";

export default function Usuarios() {
  const [usarios, setUsuarios] = useState([]);
  const [id, setId] = useState("");
  const [name, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [tipo, setTipo] = useState("");

  const url = "https://apisite-1jic.vercel.app/";

  useEffect(() => {
    fetch(url + "users")
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.log(err));
  }, [url]);

  function novosDados() {
    setTipo("novo");
  }
  function limparDados() {
    setId("");
    setPwd("");
    setEmail("");
    setTipo("");
  }

  function editarDados(cod) {
    let usuario = usarios.find((item) => item.id === cod);
    const { id, name, email } = usuario;
    setTipo("editar");
    setId(id);
    setNome(name);
    setEmail(email);
  }

  function atualizaListaComNovoUsuario(response) {
    let { id, email, password } = response.data;
    let obj = { id: id, email: email, password: password };
    let users = usarios;
    users.push(obj);
    setUsuarios(users);
    limparDados("");
  }

  function atualizaListaUsuarioEditado(response) {
    let { id } = response.data;
    const index = usarios.findIndex((item) => item.id === id);
    let users = usarios;
    users[index].email = email;
    users[index].password = password;
    setUsuarios(users);
    limparDados("");
  }


  function gravaDados() {
    if (email !== "" && password !== "") {
      if (tipo === "novo") {
        console.log("entrou")
        axios.post(url + "users", { email: email, password: password })
          .then((response) => atualizaListaComNovoUsuario(response))
          .catch((err) => console.log(err));
      } else if (tipo === "editar") {
        axios
          .put(url + "users/" + id, {
            id: id,
            name: name,
            email: email,
          })
          .then((response) => atualizaListaUsuarioEditado(response))
          .catch((err) => console.log(err));
      }
    } else {
      console.log("Preencha os campos");
    }
  }

  function apagarDados(cod) {
    axios.delete(url + "users/" + cod).then(() => {
      //atualizar a lista
      setUsuarios(usarios.filter((item) => item.id !== cod));
    });
  }

  return (
    <div className="Flex">
      <div className="Block">
        <button type="button" onClick={novosDados}>
          Novo
        </button>
        {tipo ? (
          <>
            <input
              type="email"
              name="Email"
              autoComplete="off"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Senha"
              name="password"
              value={password}
              onChange={(e) => {
                setPwd(e.target.value);
              }}
            />
            <button type="button" onClick={limparDados}>
              Cancelar
            </button>
            <button type="button" onClick={gravaDados}>
              Gravar
            </button>
          </>
        ) : (
          false
        )}

        {usarios
          ? usarios.map((item) => {
              return (
                <div key={item.id}>
                  {" "}
                  <div className="Usuers">
                    <p>
                    {" "}
                      {item.id}-{item.name}-{item.email}{" "}
                    
                    <img
                      alt="Editar"
                      src={edit}
                      id={item.id}
                      height={20}
                      width={20}
                      onClick={(e) => editarDados(item.id)}
                    />
                    <img
                      alt="Apagar"
                      src={imgEdit}
                      id={item.id}
                      height={20}
                      width={20}
                      onClick={(e) => apagarDados(item.id)}
                    />
                  </p>
                  </div>
                </div>
              );
            })
          : false}
      </div>
    </div>
  );
}
