import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import "./Login.css";
import {Link} from 'react-router-dom'

import axios from "./api/axios";
const LOGIN_URL = "/auth/login";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [email, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, pwd);

    try {
      const response = await axios.post(LOGIN_URL, { email, password: pwd });
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      alert(err.response.data.msg);
      errRef.current.focus();
    }
  };

  const [form, setform] = useState({
    email: {
      value: "",
      haschanged: false,
    },
    password: {
      value: "",
      haschanged: false,
    },
  });

  const isEmailValid = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <>
      <div className="block">
        <div className="block1">
          {success ? (
            <section>
              <h1>You are logged in!</h1>
              <br />
              <p>
                <a href="/">Go to Home</a>
              </p>
            </section>
          ) : (
            <section>
              <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <h1>USER LOGIN</h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
              type="email"
              id="email"
              ref={userRef}
              autoComplete="off"
              placeholder="Email"
              onChange={(e) => {
                setform({
                  ...form,
                  email: { haschanged: true, value: e.target.value },
                });
                setUser(e.target.value);
              }}
              value={email}
              required
              data-testid="email"
            />

                {form.email.haschanged && !form.email.value && (
                  <div data-testid="email-required">
                    <span className="span">Email obrigatorio</span>
                  </div>
                )}
                {form.email.haschanged && !isEmailValid(form.email.value) && (
                  <div data-testid="email-invalid">
                    <span className="span">Email e invalido</span>
                  </div>
                )}

                <label htmlFor="password">Password:</label>
                <input
              type="password"
              id="password"
              placeholder="Senha"
              onChange={(e) => {
                setform({
                  ...form,
                  password: { haschanged: true, value: e.target.value },
                });
                setPwd(e.target.value);
              }}
              value={pwd}
              data-test-id="password"
            />
                {form.password.haschanged && !form.password.value && (
                  <div data-testid="password-required">Senha obrigatorio</div>
                )}

                <button
                  type="button"
                  className="clear"
                  data-testid="recover-password-button"
                  disabled={!isEmailValid(form.email.value)}
                >
                  Recuperar Senha
                </button>
                <button
              data-testid="login-button"
              disabled={!isEmailValid(form.email.value) || !form.password.value}
            >
                  Entrar
                </button>
              </form>
              <p>
                Need an Account?
                <br />
                <span className="line">
                  {/*put router link here*/}
                  <p>
                    <Link className="Sing" to="/usuarios">Sign Up</Link>
                  </p>
                </span>
              </p>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
